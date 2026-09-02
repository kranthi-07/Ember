const fs = require('fs');

async function fixUrls() {
  const goodUrls = [
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  ];
  
  let file = fs.readFileSync('lib/menu-data.ts', 'utf8');
  const urls = [...file.matchAll(/image: "(https:\/\/[^"]+)"/g)].map(m => m[1]);
  
  let goodIdx = 0;
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        console.log(`Replacing BROKEN: ${url}`);
        // Replace this exact URL in the file with a good one
        file = file.replace(url, goodUrls[goodIdx % goodUrls.length]);
        goodIdx++;
      }
    } catch (e) {
      console.log(`Replacing ERROR: ${url}`);
      file = file.replace(url, goodUrls[goodIdx % goodUrls.length]);
      goodIdx++;
    }
  }
  
  fs.writeFileSync('lib/menu-data.ts', file);
  console.log("Done fixing images!");
}

fixUrls();
