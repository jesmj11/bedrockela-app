const fs = require('fs');
const unit = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-unit-card.json'));
unit.comprehension[22].chapter = "Glinda The Good Witch Grants Dorothy's Wish";
fs.writeFileSync('./book-data/wizard-of-oz-unit-card.json', JSON.stringify(unit, null, 2));
console.log('Fixed Chapter 23 title with correct apostrophe');
