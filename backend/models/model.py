#! /usr/bin/env python3
#-*- coding: utf-8 -*-

import os, time, keras, fsutils
from keras.applications import xception, mobilenet_v2
from PIL import Image
import numpy as np
import tensorflow as tf


config = tf.ConfigProto(
    device_count={'GPU': 0}, # do not use GPU
    intra_op_parallelism_threads=1,
    allow_soft_placement=True
)
session = tf.Session(config=config)
keras.backend.set_session(session)


class Model(object):

    data_dir = '{}/data'.format(os.path.dirname(__file__))
    log_dir  = '{}/log'.format(os.path.dirname(__file__))
    config_path = '{}/config.yml'.format(data_dir)
    preprocess_funcs = {
        'mobilenet_v2': mobilenet_v2.preprocess_input,
        'xception': xception.preprocess_input
    }
    num_return_candidate = 40

    def __init__(self):
        conf = fsutils.read_yaml(self.config_path)
        self.weight_path = os.path.join(self.data_dir, conf['weight_file'])
        self.label_path  = os.path.join(self.data_dir, conf['label_info_file'])
        self.model_name = conf['model_name']

    def setup(self):
        # label_info has 2 columns 'label_idx' and 'label_name'
        labels = fsutils.read_csv(self.label_path)
        self.label_info = {}
        for label in labels:
            self.label_info[int(label['label_idx'])] = label['label_name']

        if self.model_name in self.preprocess_funcs:
            self.preprocess_func = self.preprocess_funcs[self.model_name]
        else:
            # FIXME: add valid model name from preprocess_func.keys()
            message = 'Model name "{}" is invalid'.format(self.model_name)
            raise Exception(message)

        # prebuild and precompile the model so that 'predict()' makes faster
        # without doing this, every call of predcit() will be very time consuming
        self.loaded_model = keras.models.load_model(self.weight_path)
        self.loaded_model._make_predict_function()

        self.input_shape = self.loaded_model.input_shape[1:] # (h, w, c)

    def predict(self, blob):

        # FIXME: uploaded image should be a gray scale
        img = Image.open(blob).convert("L")
        img = img.resize((self.input_shape[1], self.input_shape[0]))

        ''' debug '''
        img.save(os.path.join(self.log_dir, "./resized.png"))

        np_img = np.array(img)
        np_img = np_img.reshape((1,) + self.input_shape)
        np_img = self.preprocess_func(np_img)

        start = time.time()
        results = self._predict(np_img)
        print("prediction took : {} ms".format((time.time() - start) * 1000.0))

        ret = []
        sorted_idx = np.argsort(results[0])[::-1]
        for idx in sorted_idx[:self.num_return_candidate]:
            label_name = self.label_info[idx]
            prob = float(results[0][idx])
            ret.append((label_name, prob)) # (label, probability)

        return ret

    def _predict(self, np_img):
        with session.as_default():
            with session.graph.as_default():
                results = self.loaded_model.predict(np_img, verbose=1)
                return results
