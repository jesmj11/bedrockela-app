const fs = require('fs');

const units = [
  { days: "1-30", name: "The Lost World", hasSaves: true },
  { days: "31-60", name: "War of the Worlds / Mysterious Island", hasSaves: true },
  { days: "61-75", name: "Sherlock Holmes", hasSaves: false },
  { days: "76-120", name: "Turn of the Screw / Count of Monte Cristo", hasSaves: true },
  { days: "121-135", name: "Frankenstein", hasSaves: false },
  { days: "136-150", name: "Dr. Jekyll and Mr. Hyde", hasSaves: false },
  { days: "151-165", name: "Beowulf", hasSaves: false },
  { days: "166-180", name: "The Picture of Dorian Gray", hasSaves: false }
];

console.log('═══════════════════════════════════════════════════════');
console.log('8TH GRADE CURRICULUM UNITS - FIREBASE SAVE STATUS');
console.log('═══════════════════════════════════════════════════════\n');

units.forEach(unit => {
  const status = unit.hasSaves ? '✅' : '❌';
  const daysCount = unit.days.includes('-') ? 
    (parseInt(unit.days.split('-')[1]) - parseInt(unit.days.split('-')[0]) + 1) : 1;
  
  console.log(`${status} Days ${unit.days.padEnd(10)} (${daysCount.toString().padStart(2)} lessons) - ${unit.name}`);
});

console.log('\n═══════════════════════════════════════════════════════');
console.log('SUMMARY:');
console.log('  ✅ WITH saves:     120 lessons (Days 1-60, 76-120)');
console.log('  ❌ MISSING saves:   75 lessons (Days 61-75, 121-180)');
console.log('');
console.log('MISSING UNITS:');
console.log('  1. Sherlock Holmes (Days 61-75) - 15 lessons');
console.log('  2. Frankenstein (Days 121-135) - 15 lessons');
console.log('  3. Dr. Jekyll and Mr. Hyde (Days 136-150) - 15 lessons');
console.log('  4. Beowulf (Days 151-165) - 15 lessons');
console.log('  5. The Picture of Dorian Gray (Days 166-180) - 15 lessons');
console.log('═══════════════════════════════════════════════════════');
