import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    # Replacements
    new_content = new_content.replace(
        'className="flex flex-col min-h-screen items-center justify-center bg-background p-4"',
        'className="flex flex-col min-h-screen items-center justify-center bg-transparent relative z-10 p-4"'
    )
    new_content = new_content.replace(
        'className="flex flex-col min-h-screen bg-background text-foreground"',
        'className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground"'
    )
    new_content = new_content.replace(
        'className="flex h-screen bg-background"',
        'className="flex h-screen bg-transparent relative z-10"'
    )
    new_content = new_content.replace(
        'className="flex flex-col min-h-screen bg-background"',
        'className="flex flex-col min-h-screen bg-transparent relative z-10"'
    )

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('./src/pages'):
    for file in files:
        if file.endswith('.tsx') and file != 'Index.tsx':
            replace_in_file(os.path.join(root, file))
