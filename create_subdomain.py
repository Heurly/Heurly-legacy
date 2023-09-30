import ovh
import os

# Initialize the OVH client
client = ovh.Client(
    endpoint=os.environ['OVH_ENDPOINT'],
    application_key=os.environ['OVH_APP_KEY'],
    application_secret=os.environ['OVH_APP_SECRET'],
    consumer_key=os.environ['OVH_CONSUMER_KEY']
)

client.post('/domain/zone/{0}/record'.format(os.environ['OVH_DOMAIN']),
                fieldType='A',
                subDomain=os.environ['OVH_SUBDOMAIN'],
                target='82.64.216.184',
                ttl=3600)
