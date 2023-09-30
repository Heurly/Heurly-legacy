import ovh
import os

application_key = os.environ['OVH_APP_KEY']
application_secret = os.environ['OVH_APP_SECRET']
consumer_key = os.environ['OVH_CONSUMER_KEY']

domain = os.environ['OVH_DOMAIN']
subdomain = os.environ['OVH_SUBDOMAIN']


print(application_key)
print(application_secret)
print(consumer_key)
print(domain)
print(subdomain)


# Initialize the OVH client
# client = ovh.Client(
#     endpoint=os.environ['OVH_ENDPOINT'],
#     application_key=os.environ['OVH_APP_KEY'],
#     application_secret=os.environ['OVH_APP_SECRET'],
#     consumer_key=os.environ['OVH_CONSUMER_KEY']
# )

# client.post('/domain/zone/{0}/record'.format(domain),
#                 fieldType='A',
#                 subDomain=subdomain,
#                 target='82.64.216.184',
#                 ttl=3600)
