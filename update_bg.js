const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') && !file.includes('Index.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src/pages');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Specific replacements
  newContent = newContent.replace(
    /className="flex flex-col min-h-screen items-center justify-center bg-background p-4"/g, 
    'className="flex flex-col min-h-screen items-center justify-center bg-transparent relative z-10 p-4"'
  );
  newContent = newContent.replace(
    /className="flex flex-col min-h-screen bg-background text-foreground"/g, 
    'className="flex flex-col min-h-screen bg-transparent relative z-10 text-foreground"'
  );
  newContent = newContent.replace(
    /className="flex h-screen bg-background"/g, 
    'className="flex h-screen bg-transparent relative z-10"'
  );
  newContent = newContent.replace(
    /className="flex flex-col min-h-screen bg-background"/g, 
    'className="flex flex-col min-h-screen bg-transparent relative z-10"'
  );

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
