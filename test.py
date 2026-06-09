import urllib.request, re

for i in range(3):
    ua = f'Mozilla/5.0 (Test {i})'
    req = urllib.request.Request(
        'https://ai-landing.nurulhudaprince18.workers.dev',
        headers={'User-Agent': ua}
    )
    try:
        resp = urllib.request.urlopen(req, timeout=15)
        body = resp.read().decode('utf-8')
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', body, re.DOTALL)
        text = re.sub(r'<[^>]+>', '', h1.group(1)).strip() if h1 else 'N/A'
        print(f"OK {resp.status} {len(body):,}B | {text[:60]}")
    except Exception as e:
        print(f"ERR: {e}")
