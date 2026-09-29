const fs = require('fs');
const files = ['components/3d/premium-scene.tsx', 'app/page.tsx', 'components/cart/cart-panel.tsx'];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/[^\w>\"'{\s]*\{item\.price\}/g, '₹{item.price}');
  content = content.replace(/[^\w>\"'{\s]*\{cartItem\.item\.price\}/g, '₹{cartItem.item.price}');
  content = content.replace(/[^\w>\"'{\s]*\{total\}/g, '₹{total}');
  content = content.replace(/[^\w>\"'{\s]*\$\{preferences\.maxPrice\}/g, '₹${preferences.maxPrice}');
  fs.writeFileSync(f, content, 'utf8');
});
