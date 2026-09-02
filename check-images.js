const fs = require('fs');

async function checkUrls() {
  const file = fs.readFileSync('lib/menu-data.ts', 'utf8');
  const urls = [...file.matchAll(/image: "(https:\/\/[^"]+)"/g)].map(m => m[1]);
  
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        console.log(`BROKEN: ${url} (${res.status})`);
      } else {
        console.log(`OK: ${url}`);
      }
    } catch (e) {
      console.log(`ERROR: ${url}`);
    }
  }
}

checkUrls();
