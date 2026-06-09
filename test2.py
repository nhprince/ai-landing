import urllib.request, re

req = urllib.request.Request(
    'https://ai-landing.nurulhudaprince18.workers.dev',
    headers={'User-Agent': 'Mozilla/5.0'}
)
resp = urllib.request.urlopen(req, timeout=15)
body = resp.read().decode('utf-8')

# Check for OG tags
og_title = re.search(r'og:title', body)
og_desc = re.search(r'og:description', body)
og_type = re.search(r'og:type', body)
twitter = re.search(r'twitter:card', body)
theme_color = re.search(r'theme-color', body)
preconnect = re.preconnect = re.search(r'preconnect', body)
csp = re.search(r'Content-Security-Policy', body)
nosniff = re.search(r'X-Content-Type-Options', body)

print(f"Status: {resp.status}, Size: {len(body):,} bytes")
print(f"OG title: {'YES' if og_title else 'NO'}")
print(f"OG desc: {'YES' if og_desc else 'NO'}")
print(f"OG type: {'YES' if og_type else 'NO'}")
print(f"Twitter card: {'YES' if twitter else 'NO'}")
print(f"Theme color: {'YES' if theme_color else 'NO'}")
print(f"Preconnect: {'YES' if preconnect else 'NO'}")

# Check security headers from response
print(f"\nResponse headers:")
for k, v in resp.getheaders():
    if k.lower() in ['x-content-type-options', 'x-frame-options', 'referrer-policy', 'content-security-policy', 'x-robots-tag']:
        print(f"  {k}: {v[:80]}")
