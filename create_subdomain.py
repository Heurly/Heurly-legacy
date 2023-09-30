import ovh
import os

application_key = os.environ['OVH_APP_KEY']
application_secret = os.environ['OVH_APP_SECRET']


# client = ovh.Client(
#     endpoint='ovh-eu',
#     application_key=application_key,
#     application_secret=application_secret,
#     consumer_key=os.environ['OVH_CONSUMER_KEY']
# )

domain = os.environ['OVH_DOMAIN']
subdomain = os.environ['OVH_SUBDOMAIN']

print("OVH_APP_KEY:", application_key)
print("OVH_APP_SECRET:", application_secret)
print("OVH_CONSUMER_KEY:", os.environ['OVH_CONSUMER_KEY'])
print("OVH_DOMAIN:", domain)
print("OVH_SUBDOMAIN:", subdomain)


# client.post('/domain/zone/{0}/record'.format(domain),
#     fieldType='A',
#     subDomain=subdomain,
#     target='82.64.216.184',
#     ttl=3600)