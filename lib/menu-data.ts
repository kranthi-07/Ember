import { MenuItem } from "@/types";

export const menuData: MenuItem[] = [
  // Starters
  {
    id: "s1",
    name: "Samosa Chaat",
    description: "Crispy vegetable samosas crushed and topped with yogurt, tamarind chutney, and spices.",
    price: 180,
    category: "Starters",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 1,
    tags: ["Street Food", "Tangy"],
    ingredients: ["Potatoes", "Peas", "Pastry", "Yogurt", "Tamarind", "Mint"]
  },
  {
    id: "s2",
    name: "Chicken Tikka",
    description: "Boneless chicken chunks marinated in spiced yogurt and roasted in a tandoor.",
    price: 320,
    category: "Starters",
    vegetarian: false,
    spicy: true,
    cuisine: "North Indian",
    servingSize: 2,
    tags: ["High Protein", "Tandoori"],
    ingredients: ["Chicken breast", "Yogurt", "Ginger", "Garlic", "Chili powder"]
  },
  {
    id: "s3",
    name: "Paneer 65",
    description: "Spicy and crispy fried paneer cubes tossed in curry leaves and green chilies.",
    price: 280,
    category: "Starters",
    vegetarian: true,
    spicy: true,
    cuisine: "South Indian",
    servingSize: 2,
    tags: ["Crispy", "Spicy"],
    ingredients: ["Paneer", "Rice flour", "Curry leaves", "Green chilies", "Spices"]
  },
  
  // Main Course
  {
    id: "m1",
    name: "Butter Chicken",
    description: "Tender chicken pieces cooked in a rich, creamy tomato and butter gravy.",
    price: 450,
    category: "Main Course",
    vegetarian: false,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 2,
    tags: ["Creamy", "Popular"],
    ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Kasuri Methi"]
  },
  {
    id: "m2",
    name: "Palak Paneer",
    description: "Fresh spinach puree cooked with soft paneer cubes and mild spices.",
    price: 380,
    category: "Main Course",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 2,
    tags: ["Healthy", "Greens"],
    ingredients: ["Paneer", "Spinach", "Garlic", "Cream", "Garam Masala"]
  },
  {
    id: "m3",
    name: "Lamb Rogan Josh",
    description: "Classic Kashmiri dish of tender lamb cooked in a vibrant, aromatic red curry.",
    price: 550,
    category: "Main Course",
    vegetarian: false,
    spicy: true,
    cuisine: "Kashmiri",
    servingSize: 2,
    tags: ["Rich", "Slow-cooked"],
    ingredients: ["Lamb", "Kashmiri Chili", "Fennel", "Yogurt", "Ginger"]
  },
  {
    id: "m4",
    name: "Dal Makhani",
    description: "Whole black lentils slow-cooked overnight with butter and cream.",
    price: 320,
    category: "Main Course",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 2,
    tags: ["Comfort Food", "Creamy"],
    ingredients: ["Black Lentils", "Kidney Beans", "Butter", "Cream", "Tomatoes"]
  },
  {
    id: "m5",
    name: "Chicken Chettinad",
    description: "Fiery and highly aromatic chicken curry from Tamil Nadu.",
    price: 420,
    category: "Main Course",
    vegetarian: false,
    spicy: true,
    cuisine: "South Indian",
    servingSize: 2,
    tags: ["Fiery", "Aromatic"],
    ingredients: ["Chicken", "Coconut", "Black Pepper", "Star Anise", "Curry Leaves"]
  },

  // Rice
  {
    id: "r1",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice layered with marinated chicken and cooked on dum.",
    price: 480,
    category: "Rice",
    vegetarian: false,
    spicy: true,
    cuisine: "Hyderabadi",
    servingSize: 2,
    tags: ["Aromatic", "Popular"],
    ingredients: ["Basmati Rice", "Chicken", "Saffron", "Fried Onions", "Mint"]
  },
  {
    id: "r2",
    name: "Jeera Rice",
    description: "Steamed basmati rice tempered with cumin seeds and ghee.",
    price: 180,
    category: "Rice",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 2,
    tags: ["Mild", "Accompaniment"],
    ingredients: ["Basmati Rice", "Cumin seeds", "Ghee"]
  },
  {
    id: "r3",
    name: "Vegetable Pulao",
    description: "Lightly spiced basmati rice cooked with mixed vegetables.",
    price: 240,
    category: "Rice",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 2,
    tags: ["Light", "Healthy"],
    ingredients: ["Basmati Rice", "Carrots", "Peas", "Beans", "Spices"]
  },

  // Breads
  {
    id: "b1",
    name: "Garlic Naan",
    description: "Soft leavened bread baked in a tandoor and brushed with garlic butter.",
    price: 90,
    category: "Breads",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 1,
    tags: ["Popular", "Buttery"],
    ingredients: ["Refined flour", "Garlic", "Butter", "Yeast"]
  },
  {
    id: "b2",
    name: "Tandoori Roti",
    description: "Whole wheat bread baked in a clay oven.",
    price: 40,
    category: "Breads",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 1,
    tags: ["Healthy", "Staple"],
    ingredients: ["Whole wheat flour", "Water"]
  },
  {
    id: "b3",
    name: "Lachha Paratha",
    description: "Flaky, multi-layered whole wheat flatbread.",
    price: 70,
    category: "Breads",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 1,
    tags: ["Flaky"],
    ingredients: ["Whole wheat flour", "Ghee"]
  },

  // Desserts
  {
    id: "d1",
    name: "Gulab Jamun",
    description: "Deep-fried milk dough balls soaked in a cardamom-scented sugar syrup.",
    price: 150,
    category: "Desserts",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 1,
    tags: ["Sweet", "Warm"],
    ingredients: ["Milk solids", "Sugar", "Cardamom", "Rose water"]
  },
  {
    id: "d2",
    name: "Rasmalai",
    description: "Soft paneer patties immersed in thickened, sweetened, and saffron-flavored milk.",
    price: 180,
    category: "Desserts",
    vegetarian: true,
    spicy: false,
    cuisine: "East Indian",
    servingSize: 1,
    tags: ["Sweet", "Chilled"],
    ingredients: ["Paneer", "Milk", "Sugar", "Saffron", "Pistachios"]
  },

  // Drinks
  {
    id: "dr1",
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink blended with sweet mango pulp.",
    price: 120,
    category: "Drinks",
    vegetarian: true,
    spicy: false,
    cuisine: "North Indian",
    servingSize: 1,
    tags: ["Refreshing", "Sweet"],
    ingredients: ["Yogurt", "Mango pulp", "Sugar", "Cardamom"]
  },
  {
    id: "dr2",
    name: "Masala Chai",
    description: "Traditional Indian tea brewed with milk and aromatic spices.",
    price: 60,
    category: "Drinks",
    vegetarian: true,
    spicy: false,
    cuisine: "Indian",
    servingSize: 1,
    tags: ["Hot", "Spiced"],
    ingredients: ["Black Tea", "Milk", "Ginger", "Cardamom", "Sugar"]
  }
];
