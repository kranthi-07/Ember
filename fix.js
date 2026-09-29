const fs = require('fs');
let content = fs.readFileSync('components/3d/premium-scene.tsx', 'utf8');
content = content.replace(/\{\/\* eslint-disable-next-line @next\/next\/no-img-element \*\/\}\r?\n\s*<img/g, '<img');
content = content.replace(/[^\w>\"'{\s]*\{item\.price\}/g, '₹{item.price}');
fs.writeFileSync('components/3d/premium-scene.tsx', content, 'utf8');
