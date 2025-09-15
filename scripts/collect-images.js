// Image collection script for training dataset
const fs = require('fs');
const path = require('path');

const categories = ['plastic', 'metal', 'paper', 'glass', 'organic'];

// Sample images to collect for each category
const sampleImages = {
  plastic: [
    'water_bottle_001.jpg', 'plastic_bag_001.jpg', 'food_container_001.jpg',
    'soda_bottle_001.jpg', 'yogurt_cup_001.jpg', 'plastic_utensils_001.jpg'
  ],
  metal: [
    'soda_can_001.jpg', 'food_can_001.jpg', 'aluminum_foil_001.jpg',
    'beer_can_001.jpg', 'metal_spoon_001.jpg', 'bottle_cap_001.jpg'
  ],
  paper: [
    'newspaper_001.jpg', 'cardboard_box_001.jpg', 'magazine_001.jpg',
    'paper_towel_001.jpg', 'receipt_001.jpg', 'notebook_001.jpg'
  ],
  glass: [
    'wine_bottle_001.jpg', 'glass_jar_001.jpg', 'beer_bottle_001.jpg',
    'juice_bottle_001.jpg', 'mason_jar_001.jpg', 'drinking_glass_001.jpg'
  ],
  organic: [
    'banana_peel_001.jpg', 'apple_core_001.jpg', 'orange_peel_001.jpg',
    'bread_crumb_001.jpg', 'vegetable_scraps_001.jpg', 'coffee_grounds_001.jpg'
  ]
};

// Create placeholder files for image collection
categories.forEach(category => {
  const categoryPath = path.join(__dirname, '..', 'training-dataset', category);
  
  sampleImages[category].forEach(filename => {
    const filePath = path.join(categoryPath, filename);
    fs.writeFileSync(filePath, `# Placeholder for ${filename}\n# Replace with actual image`);
  });
  
  console.log(`Created ${sampleImages[category].length} placeholders for ${category}`);
});

console.log('\nNext steps:');
console.log('1. Replace placeholder files with actual images');
console.log('2. Collect 200+ images per category');
console.log('3. Use Teachable Machine to train model');
console.log('4. Export and integrate trained model');