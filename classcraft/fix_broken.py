import os, json, urllib.request, time, sys, re

UA = 'ClassCraftBot/1.0 (educational website; jrm88888888@gmail.com)'

with open('/tmp/broken.json') as f:
    broken = json.load(f)

start = int(sys.argv[1])
end = int(sys.argv[2])
batch = broken[start:end]

results = {}

for i, (path, species) in enumerate(batch):
    # Search Commons with generator to get imageinfo in one call
    # Try species name, then add "wildlife" or "plant" 
    found = False
    for query in [species, f'{species} wildlife photo', f'{species} plant nature']:
        try:
            api = (
                'https://commons.wikimedia.org/w/api.php?action=query'
                '&generator=search'
                f'&gsrsearch={urllib.request.quote(query)}+filetype:bitmap'
                '&gsrnamespace=6&gsrlimit=5'
                '&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=960'
                '&format=json'
            )
            req = urllib.request.Request(api, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=12) as resp:
                d = json.loads(resp.read())
            
            pages = d.get('query', {}).get('pages', {})
            best = None
            best_score = 0
            for pid, page in pages.items():
                if 'imageinfo' not in page:
                    continue
                ii = page['imageinfo'][0]
                mime = ii.get('mime', '')
                if 'svg' in mime or 'gif' in mime:
                    continue
                url = ii.get('thumburl') or ii.get('url', '')
                if not url or '?' not in url and not url.endswith(('.jpg','.jpeg','.png','.JPG','.JPEG','.PNG')):
                    # Check URL more carefully
                    pass
                w = ii.get('width', 0)
                if w > best_score:
                    best_score = w
                    best = (page.get('title',''), url)
            
            if best:
                results[path] = {'title': best[0], 'url': best[1]}
                print(f'[{start+i+1}] OK: {species} -> {best[0][:50]}')
                found = True
                break
            time.sleep(0.3)
        except Exception as e:
            time.sleep(1)
    
    if not found:
        print(f'[{start+i+1}] MISS: {species}')
    time.sleep(0.3)

outfile = f'/tmp/fix_{start}_{end}.json'
with open(outfile, 'w') as f:
    json.dump(results, f)
print(f'\nFound {len(results)}/{len(batch)}')
