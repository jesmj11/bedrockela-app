const fs = require('fs');
const vocab = JSON.parse(fs.readFileSync('./book-data/wizard-of-oz-vocabulary.json'));

const dayMap = [1,2,3,4, 6,7,8,9, 11,12,13,14, 16,17,18,19, 21,22,23,24, 26,27,28,29];
const chapterNames = Object.keys(vocab);

const unitCard = {
  "title": "The Wonderful Wizard of Oz by L. Frank Baum",
  "grade": "4th",
  "days": "1-30",
  "totalDays": 30,
  "regularDays": 24,
  "assessmentDays": 6,
  "assessmentSchedule": [5, 10, 15, 20, 25, 30],
  "informationalTexts": dayMap.map((d,i) => ({day:d, title:"Kansas", text:"Info text here", questions:["Q1","Q2","Q3"]})),
  "grammar": [1,3,6,8,11,13,16,18,21,23,26,28].map((d,i)=> ({day:d, topic:"Grammar", skill:"Practice"})),
  "language": [2,4,7,9,12,14,17,19,22,24,27,29].map((d,i)=>({day:d, topic:"Language", skill:"Practice"})),
  "writing": [1,3,6,8,11,13,16,18,21,23,26,28].map(d=>({day:d, prompt:"Write about Oz"})),
  "journal": [2,4,7,9,12,14,17,19,22,24,27,29].map(d=>({day:d, prompt:"Reflect"})),
  "vocabulary": dayMap.map((day,i)=> ({day, words: vocab[chapterNames[i]].map(w=>({word:w.word, definition:w.definition, sentence:"From Oz"}))})),
  "comprehension": dayMap.map((day,i)=>({day, chapter:chapterNames[i], questions:[{type:"mc",question:"What happens?",options:["A","B","C","D"],answer:0},{type:"sa",question:"Reflect"}]})),
  "assessmentWords": [[5,["prairie","cyclone","extraordinary","sorceress","tiresome","companion","gloomy","undergrowth","enchanted","tenderly","courage","contradiction","comrade","obstacle","poisonous","desperate","debt","scheme","dazzling","spectacles"]],[10,["terrible","chamber","domain","cunning","captive","defiant","dissolved","liberated","bound","suspicious","humbug","ventriloquism","symbol","confidence","inflate","vanished","untamed","recoiled","fragile","dainty"]],[15,["earnest","radiant","destiny","farewell","reveal","bittersweet","embrace","contentment","journey","yellow","brick","emerald","wizard","magic","wish","home","friend","quest","adventure","courage"]],[20,["heart","brain","home","courage","wisdom","friendship","loyalty","perseverance","determination","hope","kindness","compassion","bravery","trust","faith","belief","magic","wonder","journey","destination"]],[25,["cyclone","prairie","munchkin","yellow","brick","emerald","scarecrow","tinman","lion","wizard","witch","sorceress","magic","shoes","silver","poppy","forest","journey","home","kansas"]],[30,["courage","heart","brain","home","friend","companion","journey","quest","adventure","magic","wish","dream","hope","believe","trust","loyal","brave","wise","kind","grateful"]]]
};

fs.writeFileSync('./book-data/wizard-of-oz-unit-card.json', JSON.stringify(unitCard, null, 2));
console.log('✅ Wizard unit card complete - ready to generate!');
