from unittest import TestCase
from gcsutils import GCSUtils


TEST_BUCKET_NAME = 'handwriting-test-00'
SAMPLE_INPUT_IMAGE = './tests/sample.png'

class TestGCSUtils(TestCase):

    def test_list_buckets(self):
        gcs_utils = GCSUtils()
        buckets = gcs_utils.list_buckets()
        for bucket in buckets:
            print(bucket.name)

    #def test_create_bucket(self):
    #    gcs_utils = GCSUtils()
    #    gcs_utils.create_bucket()

    def test_upload_filepath(self):
        gcs_utils = GCSUtils()
        gcs_utils.upload_by_path(TEST_BUCKET_NAME,
                SAMPLE_INPUT_IMAGE, 'sample_test_01.png')

    def test_upload_file(self):
        gcs_utils = GCSUtils()
        with open(SAMPLE_INPUT_IMAGE, 'rb') as f:
            gcs_utils.upload_by_file(TEST_BUCKET_NAME, f,
                    'sample_test_stream_01.png', {'hoge': 'fuga'})

