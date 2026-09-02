const fs = require('fs');

async function getWikiImage(query) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=800`);
    const data = await res.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (page && page.thumbnail) {
      return page.thumbnail.source;
    }
  } catch (e) { }
  return null;
}

async function run() {
  const items = {
    "Samosa Chaat": "Samosa",
    "Chicken Tikka": "Chicken tikka",
    "Paneer 65": "Paneer",
    "Butter Chicken": "Butter chicken",
    "Palak Paneer": "Palak paneer",
    "Lamb Rogan Josh": "Rogan josh",
    "Dal Makhani": "Dal makhani",
    "Chicken Chettinad": "Chicken Chettinad",
    "Chicken Biryani": "Biryani",
    "Jeera Rice": "Jeera rice",
    "Vegetable Pulao": "Pilaf",
    "Garlic Naan": "Naan",
    "Tandoori Roti": "Roti",
    "Lachha Paratha": "Paratha",
    "Gulab Jamun": "Gulab jamun",
    "Rasmalai": "Ras malai",
    "Mango Lassi": "Lassi",
    "Masala Chai": "Masala chai"
  };

  let file = fs.readFileSync('lib/menu-data.ts', 'utf8');

  for (const [key, search] of Object.entries(items)) {
    let url = await getWikiImage(search);
    if (!url) url = await getWikiImage(search + " (food)");
    
    if (url) {
      // Find the object with name: "key" and replace its image
      const regex = new RegExp(`(name:\\s*"${key}"[\\s\\S]*?image:\\s*")[^"]+(")`);
      if (file.match(regex)) {
        file = file.replace(regex, `$1${url}$2`);
      }
    }
  }

  fs.writeFileSync('lib/menu-data.ts', file);
  console.log("Updated images with accurate Wikipedia photos.");
}

run();
