import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Specific tailwind classes mentioned
    content = re.sub(r'bg-blue-600', 'bg-white', content)
    content = re.sub(r'text-blue-400', 'text-gray-300', content)
    content = re.sub(r'border-blue-500', 'border-gray-600', content)
    content = re.sub(r'ring-blue-500', 'ring-gray-400', content)
    content = re.sub(r'from-blue-[0-9]+', 'from-gray-300', content)
    content = re.sub(r'to-blue-[0-9]+', 'to-gray-300', content)
    content = re.sub(r'via-blue-[0-9]+', 'via-gray-100', content)
    content = re.sub(r'text-blue-[0-9]+', 'text-white', content)
    content = re.sub(r'bg-blue-[0-9]+/?([0-9]+)?', 'bg-white', content)
    content = re.sub(r'border-blue-[0-9]+', 'border-gray-600', content)

    # General blue replacements
    content = re.sub(r'blue-500', 'gray-200', content)
    content = re.sub(r'blue-600', 'white', content)
    content = re.sub(r'blue-400', 'gray-300', content)

    # Hex codes
    content = re.sub(r'#3b82f6', '#e0e0e0', content, flags=re.IGNORECASE)
    content = re.sub(r'#2563eb', '#ffffff', content, flags=re.IGNORECASE)
    content = re.sub(r'#60a5fa', '#e0e0e0', content, flags=re.IGNORECASE)

    # index.css specific replacements
    content = content.replace('background-color: #020617;', 'background-color: #0a0a0a;')
    content = content.replace('color: #e2e8f0;', 'color: #ffffff;')
    content = content.replace('background: #334155;', 'background: #222222;')
    content = content.replace('background: #475569;', 'background: #1e1e1e;')
    content = content.replace('rgba(51, 133, 255', 'rgba(255, 255, 255')
    content = content.replace('#3385ff, #06b6d4, #8b5cf6', '#666666, #e0e0e0, #ffffff')
    content = content.replace('from-brand-400 via-blue-400 to-cyan-400', 'from-gray-300 via-gray-100 to-white')
    content = content.replace('bg-surface-800/80', 'bg-surface-850')
    content = content.replace('bg-surface-800/60', 'bg-surface-800')
    
    # "Cognition Active dot: #ffffff (was green)"
    content = re.sub(r'bg-emerald-[0-9]+', 'bg-white', content)
    content = re.sub(r'bg-green-[0-9]+', 'bg-white', content)
    content = re.sub(r'text-green-[0-9]+', 'text-white', content)
    content = re.sub(r'text-emerald-[0-9]+', 'text-white', content)

    # "Send button: #ffffff background, #000000 icon"
    # Wait, need to check where the send button is in components.

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    src_dir = os.path.join('d:\\', 'conversation branch backend', 'web', 'src')
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.css') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                replace_in_file(filepath)

if __name__ == "__main__":
    main()
