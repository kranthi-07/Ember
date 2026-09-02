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
    "Paneer 65": "Paneer 65",
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

  let results = {};
  for (const [key, search] of Object.entries(items)) {
    let url = await getWikiImage(search);
    if (!url) url = await getWikiImage(search + " (food)");
    console.log(`"${key}": "${url}",`);
  }
}

run();
