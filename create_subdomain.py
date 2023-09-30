import ovh
import os

application_key = os.environ['OVH_APP_KEY']
application_secret = os.environ['OVH_APP_SECRET']
consumer_key = os.environ['OVH_CONSUMER_KEY']

domain = os.environ['OVH_DOMAIN']
subdomain = os.environ['OVH_SUBDOMAIN']

print("OVH_APP_KEY:", application_key)
print("OVH_APP_SECRET:", application_secret)
print("OVH_CONSUMER_KEY:", consumer_key)
print("OVH_DOMAIN:", domain)
print("OVH_SUBDOMAIN:", subdomain)

# Ensure the application_secret is not empty
if not application_secret:
    raise ValueError("OVH_APP_SECRET is empty or not set")

# Initialize the OVH client
client = ovh.Client(
    endpoint='ovh-eu',
    application_key=application_key,
    application_secret=application_secret,
    consumer_key=consumer_key
)

# Create the subdomain record
try:
    client.post('/domain/zone/{0}/record'.format(domain),
                fieldType='A',
                subDomain=subdomain,
                target='82.64.216.184',
                ttl=3600)
    print("Subdomain created successfully.")
except ovh.exceptions.InvalidKey as e:
    print("Failed to create subdomain. Error:", str(e))
