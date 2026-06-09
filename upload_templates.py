import json, urllib.request, urllib.error, os

with open(os.path.expanduser('~/.cloudflare_global_key')) as f:
    global_key = f.read().strip()
with open(os.path.expanduser('~/.cloudflare_email')) as f:
    email = f.read().strip()

account_id = "89f7e2d36d8ec57f55770ee400685f53"
kv_namespace_id = "cd1ef0aa272344309363f1ea909e16ee"

# Read templates.js and extract the TEMPLATE_VARIATIONS object
with open(os.path.expanduser('~/ai-landing/src/templates.js'), 'r') as f:
    content = f.read()

# Extract just the JSON-like object
start = content.index('export const TEMPLATE_VARIATIONS = ') + len('export const TEMPLATE_VARIATIONS = ')
end = content.rindex(';', start)
json_str = content[start:end].strip()

# Parse it as JS (it's valid JS object literal, not quite JSON)
# We'll use Node.js to parse it
import subprocess
result = subprocess.run(['node', '-e', f'console.log(JSON.stringify({json_str}));'], capture_output=True, text=True, cwd=os.path.expanduser('~/ai-landing/src'))
if result.returncode != 0:
    print(f"Error parsing templates: {result.stderr}")
    exit(1)

templates_json = result.stdout.strip()
data = json.loads(templates_json)
print(f"Parsed {len(data)} style templates")
for k, v in data.items():
    print(f"  {k}: {len(v)} variations")

# Upload to KV
url = f'https://api.cloudflare.com/client/v4/accounts/{account_id}/storage/kv/namespaces/{kv_namespace_id}/values/templates:v1'
req = urllib.request.Request(
    url,
    data=templates_json.encode('utf-8'),
    headers={
        'X-Auth-Email': email,
        'X-Auth-Key': global_key,
        'Content-Type': 'application/json'
    },
    method='PUT'
)
try:
    resp = urllib.request.urlopen(req, timeout=30)
    result = json.loads(resp.read())
    if result.get('success'):
        print(f"\nUploaded {len(templates_json):,} bytes to KV as 'templates:v1'")
    else:
        print(f"ERROR: {json.dumps(result.get('errors', []), indent=2)}")
except Exception as e:
    print(f"ERROR: {e}")
