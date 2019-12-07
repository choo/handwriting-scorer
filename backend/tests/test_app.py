#! /usr/bin/env python3
#-*- coding: utf-8 -*-

import sys, os, json
from unittest import TestCase

from app import app

# generate a test client
app = app.test_client()

class TestApp(TestCase):

    def test_api_data(self):
        res = app.get('/api/sample').get_data(as_text=True)
        data = json.loads(res)
        self.assertEqual(data, [])

        res = app.get('/api/sample?query=a').get_data(as_text=True)
        data = json.loads(res)
        self.assertEqual(data[0], 'a')
        self.assertEqual(data[1], 'aa')

    def test_api_param(self):
        PAGE = 1
        res = app.get('/api/sample?page={0}'.format(PAGE)).get_data(as_text=True)
        data = json.loads(res)
        self.assertEqual(data, [])

    def test_index_response(self):
        response = app.get('/')
        self.assertEqual(response.status_code, 200)
