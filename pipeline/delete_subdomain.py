import CloudFlare
import os

# Using API token
cf = CloudFlare.CloudFlare(token=os.environ['DNS_TOKEN'])

subdomain = os.environ['DNS_SUBDOMAIN']
domain = os.environ['DNS_DOMAIN']

# Getting the zone ID
zone_info = cf.zones.get(params={'name': domain})
zone_id = zone_info[0]['id']

# Getting the DNS record ID
dns_records = cf.zones.dns_records.get(zone_id, params={'name': subdomain+"."+domain})
for record in dns_records:
    if record['name'] == subdomain+"."+domain:
        dns_record_id = record['id']
        print("Found" ,record['name'] )
        break

# # If the DNS record ID is found, delete the DNS record
if 'dns_record_id' in locals():
    response = cf.zones.dns_records.delete(zone_id, dns_record_id)
else:
    print("DNS record not found")