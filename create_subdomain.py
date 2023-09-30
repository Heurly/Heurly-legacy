import ovh
import os

client = ovh.Client()

domain = os.environ['OVH_DOMAIN']
subdomain = os.environ['OVH_SUBDOMAIN']

client.post('/domain/zone/{0}/record'.format(domain),
    fieldType='A',
    subDomain=subdomain,
    target='82.64.216.184',
    ttl=3600)