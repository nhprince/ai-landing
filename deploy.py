import json, urllib.request, urllib.error, os, glob

with open(os.path.expanduser('~/.cloudflare_global_key')) as f:
    global_key = f.read().strip()
with open(os.path.expanduser('~/.cloudflare_email')) as f:
    email = f.read().strip()

account_id = "89f7e2d36d8ec57f55770ee400685f53"

files = {}
for f in glob.glob(os.path.expanduser('~/ai-landing/src/*.js')):
    name = os.path.basename(f)
    with open(f) as fh:
        files[name] = fh.read()

boundary = '----FormBoundary7MA4YWxkTrZu0gW'

def part(name, filename, content, mime='application/javascript+module'):
    return (
        f'--{boundary}\r\n'.encode() +
        f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'.encode() +
        f'Content-Type: {mime}\r\n\r\n'.encode() +
        content.encode() + b'\r\n'
    )

body = b''
for name, content in files.items():
    body += part('modules', name, content)

metadata = json.dumps({
    "main_module": "index.js",
    "compatibility_date": "2026-06-09",
    "bindings": [
        {"type": "ai", "name": "AI"},
        {"type": "kv_namespace", "name": "VISITORS", "namespace_id": "cd1ef0aa272344309363f1ea909e16ee"}
    ]
})
body += part('metadata', 'metadata.json', metadata, 'application/json')
body += f'--{boundary}--\r\n'.encode()

print(f"Deploying {len(body):,} bytes...")

req = urllib.request.Request(
    f'https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/ai-landing',
    data=body,
    headers={
        'X-Auth-Email': email,
        'X-Auth-Key': global_key,
        'Content-Type': f'multipart/form-data; boundary={boundary}'
    },
    method='PUT'
)

try:
    resp = urllib.request.urlopen(req, timeout=120)
    result = json.loads(resp.read())
    if result.get('success'):
        print("DEPLOYED_OK")
    else:
        print(f"ERROR: {json.dumps(result.get('errors', []), indent=2)}")
except urllib.error.HTTPError as e:
    print(f"HTTP_ERROR {e.code}: {e.read().decode()[:500]}")
except Exception as e:
    print(f"ERROR: {e}")
