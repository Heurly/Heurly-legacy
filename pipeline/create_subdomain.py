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

client.post('/domain/zone/{0}/record'.format(domain),
                fieldType='A',
                subDomain=subdomain,
                target='82.64.216.184',
                ttl=0) 
