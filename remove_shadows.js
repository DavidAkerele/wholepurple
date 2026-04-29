const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  const shadowRegex = /\b(?:[a-z0-9-]+:)*(?:drop-)?shadow(?:-[a-z0-9/-]+)?\b/g;

  content = content.replace(/className=(["'`])([\s\S]*?)\1/g, (match, quote, classes) => {
    const newClasses = classes.replace(shadowRegex, '').replace(/\s+/g, ' ').trim();
    return `className=${quote}${newClasses}${quote}`;
  });

  content = content.replace(/className=\{`([\s\S]*?)`\}/g, (match, classes) => {
    const newClasses = classes.replace(shadowRegex, '').replace(/\s+/g, ' ').trim();
    return `className={\`${newClasses}\`}`;
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
  }
});

console.log(`Removed shadows from ${changedCount} files.`);
