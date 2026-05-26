import os, re

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    # Violet (compare selection)
    content = re.sub(r'bg-violet-\d+/\d+', 'bg-[#1f1f1f]', content)
    content = re.sub(r'text-violet-\d+', 'text-[#a0a0a0]', content)
    content = re.sub(r'border-violet-\d+/\d+', 'border-[#333333]', content)

    # Emerald borders only (keep rose/amber for status indicators which is acceptable)
    content = re.sub(r'border-emerald-\d+/\d+', 'border-[#2a2a2a]', content)
    content = re.sub(r'bg-emerald-\d+/\d+', 'bg-[#1a1a1a]', content)
    content = re.sub(r'text-emerald-\d+', 'text-[#a0a0a0]', content)

    # Amber for UI elements (NOT status indicators - those stay for semantic meaning)
    # hover:text-amber -> hover:text-white
    content = re.sub(r'hover:text-amber-\d+', 'hover:text-white', content)
    content = re.sub(r'hover:bg-amber-\d+/\d+', 'hover:bg-[#1f1f1f]', content)

    # Amber in BranchTree fork origin labels
    content = re.sub(r'text-amber-\d+/\d+', 'text-[#555555]', content)
    content = re.sub(r'border-amber-\d+/\d+', 'border-[#2a2a2a]', content)

    # Explicit amber class replacements for UI elements (not status indicators)
    content = content.replace('text-amber-400 mb-2', 'text-[#888888] mb-2')
    content = content.replace('"text-amber-400"', '"text-[#888888]"')
    content = content.replace("'text-amber-400'", "'text-[#888888]'")

    # Cyan in OpsLayout
    content = re.sub(r'border-cyan-\d+/\d+', 'border-[#2a2a2a]', content)

    # Rose in diagnostics - keep for error states (these ARE semantic)
    # But fix the MessageBubble pin hover
    content = content.replace('hover:text-amber-400 hover:bg-amber-500/10', 'hover:text-[#c0c0c0] hover:bg-[#1f1f1f]')

    # Slate references
    content = re.sub(r'border-slate-\d+', 'border-[#2a2a2a]', content)
    content = re.sub(r'bg-slate-\d+', 'bg-[#1a1a1a]', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {filepath}')

src = r'd:\conversation branch backend\web\src'
for root, dirs, files in os.walk(src):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            fix(os.path.join(root, file))
print('Done.')
