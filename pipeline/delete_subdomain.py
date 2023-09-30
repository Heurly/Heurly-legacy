import ovh
import os

application_key = os.environ['OVH_APP_KEY']
application_secret = os.environ['OVH_APP_SECRET']
consumer_key = os.environ['OVH_CONSUMER_KEY']

domain = os.environ['OVH_DOMAIN']
subdomain = os.environ['OVH_SUBDOMAIN']
endpoint = os.environ['OVH_ENDPOINT']

# Initialize the OVH client
client = ovh.Client(
    endpoint=endpoint,
    application_key=application_key,
    application_secret=application_secret,
    consumer_key=consumer_key
)

# Find the record ID of the existing DNS record
records = client.get('/domain/zone/{0}/record'.format(domain), fieldType='A', subDomain=subdomain)
if records:
    for record in records:
        client.delete('/domain/zone/{0}/record/{1}'.format(domain, record))
        print('DNS record deleted successfully.')
else:
    print('No DNS record found for the specified subdomain.')
