from google.cloud import storage

'''
cf.) [API Doucument](https://googleapis.dev/python/storage/latest/blobs.html)
'''

class GCSUtils(object):

    def __init__(self):
        self.storage_client = storage.Client()

    def create_bucket(self, bucket_name):
        bucket = self.storage_client.create_bucket(bucket_name)
        print('Bucket {} created'.format(bucket.name))

    def list_buckets(self):
        return self.storage_client.list_buckets()

    ''' uploading '''
    def upload_by_path(self, bucket_name, source_file_name, dst_name):
        bucket = self.storage_client.get_bucket(bucket_name)
        blob = bucket.blob(dst_name)
        blob.upload_from_filename(source_file_name)
        #blob.upload_from_string(file)
        print(f'File {source_file_name} uploaded to {dst_name}.')

    def upload_by_file(self, bucket_name, file_handler, dst_name, metadata={}):
        bucket = self.storage_client.get_bucket(bucket_name)
        blob = bucket.blob(dst_name)
        blob.metadata = metadata
        blob.upload_from_file(file_handler, content_type='image/png')
        print(f'File was uploaded to {dst_name}.')

    ''' getting info '''
    def list_all_blobs(self, bucket_name, prefix=None, delimiter=None):
        ''' returned value is iterator  '''
        ''' can be wildcard used ?? wildcard can be used in CUI tool gsutils.
            https://cloud.google.com/storage/docs/gsutil/addlhelp/WildcardNames '''
        blobs = self.storage_client.list_blobs(bucket_name, prefix=prefix, delimiter=delimiter)
        #for blob in blobs:
        #    print(blob.name)
        return blobs


    def get_blob_info(self, bucket_name, blob_name):
        """Prints out a blob's metadata."""
        bucket = self.storage_client.get_bucket(bucket_name)
        blob = bucket.get_blob(blob_name)
        return blob

    def print_metadata(self, bucket_name, blob_name):
        blob = self.get_blob_info(bucket_namem, blob_name)
        print('Blob: {}'.format(blob.name))
        print('Bucket: {}'.format(blob.bucket.name))
        print('Storage class: {}'.format(blob.storage_class))
        print('ID: {}'.format(blob.id))
        print('Size: {} bytes'.format(blob.size))
        print('Updated: {}'.format(blob.updated))
        print('Generation: {}'.format(blob.generation))
        print('Metageneration: {}'.format(blob.metageneration))
        print('Etag: {}'.format(blob.etag))
        print('Owner: {}'.format(blob.owner))
        print('Component count: {}'.format(blob.component_count))
        print('Crc32c: {}'.format(blob.crc32c))
        print('md5_hash: {}'.format(blob.md5_hash))
        print('Cache-control: {}'.format(blob.cache_control))
        print('Content-type: {}'.format(blob.content_type))
        print('Content-disposition: {}'.format(blob.content_disposition))
        print('Content-encoding: {}'.format(blob.content_encoding))
        print('Content-language: {}'.format(blob.content_language))
        print('Metadata: {}'.format(blob.metadata))
        print("Temporary hold: ",
              'enabled' if blob.temporary_hold else 'disabled')
        print("Event based hold: ",
              'enabled' if blob.event_based_hold else 'disabled')
        if blob.retention_expiration_time:
            print("retentionExpirationTime: {}"
                  .format(blob.retention_expiration_time))

