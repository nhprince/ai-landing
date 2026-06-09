# Fix all renderers to use shared head() helper
import re

with open('src/renderer.js') as f:
    content = f.read()

# The old head pattern that each renderer starts with
old_head = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title>'
new_head_prefix = '${head(c.headline, '

# For each renderer, we need to replace the old head with the new head call
# The pattern is: OLD_HEAD followed by style-specific content
# We need to inject the style ID into the head() call

renderers = {
    'brutalist': 'brutalist',
    'glassmorphism': 'glassmorphism',
    'retro-pixel': 'retro-pixel',
    'editorial': 'editorial',
    'minimal-jp': 'minimal-jp',
    'vaporwave': 'vaporwave',
    'organic': 'organic',
    'space': 'space',
    'pop-art': 'pop-art',
    'terminal': 'terminal',
    'watercolor': 'watercolor',
}

# Special case: retro-pixel has ★ in title
# Special case: minimal-jp has lang="ja"

for rid, rid_val in renderers.items():
    # Find the old pattern
    if rid == 'retro-pixel':
        old = '`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>\\u2605 ${c.headline} \\u2605</title>'
    elif rid == 'minimal-jp':
        old = '`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title>'
    else:
        old = '`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title>'

    if rid == 'minimal-jp':
        new = '`${head(c.headline, \'' + rid_val + '\', p)}<html lang="ja">'
    else:
        new = '`${head(c.headline, \'' + rid_val + '\', p)}'

    if old in content:
        content = content.replace(old, new, 1)
        print(f"OK {rid}")
    else:
        print(f"WARN {rid} - not found")

with open('src/renderer.js', 'w') as f:
    f.write(content)
print("Done")
