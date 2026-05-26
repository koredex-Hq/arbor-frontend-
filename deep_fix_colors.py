import os, re

def fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    # All remaining brand-* color classes (from tailwind)
    # brand-300 brand-400 brand-500 brand-600 -> white or grey equivalents
    content = re.sub(r'text-brand-\d+', 'text-[#a0a0a0]', content)
    content = re.sub(r'bg-brand-\d+/\d+', 'bg-[#1a1a1a]', content)
    content = re.sub(r'bg-brand-\d+', 'bg-white', content)
    content = re.sub(r'border-brand-\d+/\d+', 'border-[#2a2a2a]', content)
    content = re.sub(r'border-brand-\d+', 'border-[#444444]', content)
    content = re.sub(r'ring-brand-\d+', 'ring-[#555555]', content)
    content = re.sub(r'shadow-brand-\d+/\d+', 'shadow-none', content)
    content = re.sub(r'shadow-brand-\d+', 'shadow-none', content)
    content = re.sub(r'hover:bg-brand-\d+/\d+', 'hover:bg-[#222222]', content)
    content = re.sub(r'hover:bg-brand-\d+', 'hover:bg-[#e0e0e0]', content)
    content = re.sub(r'hover:text-brand-\d+', 'hover:text-white', content)
    content = re.sub(r'from-brand-\d+', 'from-[#666666]', content)
    content = re.sub(r'to-brand-\d+', 'to-white', content)
    content = re.sub(r'via-brand-\d+', 'via-[#a0a0a0]', content)

    # sky/teal colors
    content = re.sub(r'text-sky-\d+', 'text-[#888888]', content)
    content = re.sub(r'bg-sky-\d+/\d+', 'bg-[#1a1a1a]', content)
    content = re.sub(r'border-sky-\d+/\d+', 'border-[#333333]', content)

    # purple
    content = re.sub(r'text-purple-\d+', 'text-[#a0a0a0]', content)
    content = re.sub(r'bg-purple-\d+/\d+', 'bg-[#1a1a1a]', content)
    content = re.sub(r'border-purple-\d+/\d+', 'border-[#333333]', content)
    content = re.sub(r'hover:bg-purple-\d+/\d+', 'hover:bg-[#222222]', content)

    # cyan - only replace if still present
    content = re.sub(r'to-cyan-\d+', 'to-white', content)
    content = re.sub(r'from-cyan-\d+', 'from-[#a0a0a0]', content)
    content = re.sub(r'via-cyan-\d+', 'via-white', content)
    content = re.sub(r'text-cyan-\d+', 'text-white', content)
    content = re.sub(r'bg-cyan-\d+', 'bg-[#1a1a1a]', content)

    # surface colors → hex
    content = content.replace('bg-surface-950', 'bg-[#0a0a0a]')
    content = content.replace('bg-surface-900', 'bg-[#111111]')
    content = content.replace('bg-surface-850', 'bg-[#141414]')
    content = content.replace('bg-surface-800', 'bg-[#1f1f1f]')
    content = content.replace('bg-surface-700', 'bg-[#222222]')
    content = content.replace('text-surface-200', 'text-[#e0e0e0]')
    content = content.replace('text-surface-300', 'text-[#c0c0c0]')
    content = content.replace('text-surface-400', 'text-[#888888]')
    content = content.replace('text-surface-500', 'text-[#555555]')
    content = content.replace('text-surface-600', 'text-[#444444]')
    content = content.replace('border-surface-700/50', 'border-[#1e1e1e]')
    content = content.replace('border-surface-700/30', 'border-[#1a1a1a]')
    content = content.replace('border-surface-700', 'border-[#222222]')
    content = content.replace('border-surface-800', 'border-[#1f1f1f]')
    content = content.replace('hover:bg-surface-700', 'hover:bg-[#222222]')
    content = content.replace('hover:bg-surface-800', 'hover:bg-[#1f1f1f]')
    content = content.replace('hover:text-surface-300', 'hover:text-[#c0c0c0]')
    content = content.replace('hover:text-surface-200', 'hover:text-[#e0e0e0]')
    content = content.replace('hover:border-surface-600', 'hover:border-[#333333]')
    content = content.replace('hover:border-surface-400', 'hover:border-[#555555]')

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
