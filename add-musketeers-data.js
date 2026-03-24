#!/usr/bin/env node
/**
 * Add vocabulary and comprehension data to Three Musketeers unit card
 */

const fs = require('fs');

// Load existing unit card
const unitCard = JSON.parse(fs.readFileSync('./book-data/three-musketeers-unit-card.json', 'utf-8'));

// Vocabulary data (2 words per chapter, 24 chapters, Days 31-54)
const vocabulary = [
  { day: 31, words: [
    { word: "province", definition: "A region or area of a country, often far from the capital city.", sentence: "D'Artagnan came from Gascony, a rough, wild province in the south of France where the people were known for their pride and their tempers." },
    { word: "scabbard", definition: "A cover or sheath for a sword blade, usually made of leather.", sentence: "D'Artagnan's father handed him a sword in a worn leather scabbard — old and plain, but the steel was good." }
  ]},
  { day: 32, words: [
    { word: "humiliated", definition: "Made to feel deeply ashamed or embarrassed, especially in front of others.", sentence: "D'Artagnan was humiliated — beaten by the stranger's companions while the man with the scar did not even bother to draw his sword." },
    { word: "dignity", definition: "A sense of pride and self-respect. The quality of being worthy of honor.", sentence: "D'Artagnan had lost his letter, his dignity, and very nearly his sword — but he refused to give up." }
  ]},
  { day: 33, words: [
    { word: "barracks", definition: "A building or group of buildings where soldiers live and train.", sentence: "The headquarters of the King's Musketeers was a grand building near the palace, with a courtyard full of soldiers practicing swordplay." },
    { word: "flustered", definition: "Nervous, confused, and unable to think clearly because of pressure or embarrassment.", sentence: "D'Artagnan was so flustered after accidentally challenging two musketeers that he walked directly into a third one." }
  ]},
  { day: 34, words: [
    { word: "rivalry", definition: "An ongoing competition between two groups who consider each other enemies.", sentence: "The Cardinal's Guards and the King's Musketeers hated each other. It was the rivalry of the age." },
    { word: "flurry", definition: "A sudden burst of activity, movement, or action happening all at once.", sentence: "D'Artagnan drove the guard backward with a flurry of strikes that surprised even himself." }
  ]},
  { day: 36, words: [
    { word: "extravagant", definition: "Spending more than necessary. Over-the-top, showy, and excessive.", sentence: "Porthos wore the biggest hats, the shiniest boots, and the most extravagant sword belts in all of Paris." },
    { word: "legendary", definition: "Famous and admired, often because of remarkable achievements that become the stuff of stories.", sentence: "Together, the three musketeers were legendary — the best swordsmen in the king's service and the biggest headache the Cardinal's Guards had ever known." }
  ]},
  { day: 37, words: [
    { word: "modesty", definition: "The quality of not bragging about yourself or your achievements. Being humble.", sentence: "The king appreciated D'Artagnan's modesty — it was rare in Paris, where everyone tried to seem more important than they were." },
    { word: "commission", definition: "An official document giving someone a military rank or position.", sentence: "The king told Tréville to enroll D'Artagnan and, when he had earned it, give him the blue cloak — the commission of a musketeer." }
  ]},
  { day: 38, words: [
    { word: "intrigue", definition: "Secret plotting and scheming, especially in politics. Plans made behind closed doors.", sentence: "D'Artagnan stumbled into a world of intrigue — secret plots between queens, cardinals, and dukes that could change the fate of France." },
    { word: "consequences", definition: "The results of an action, especially negative results that follow a mistake.", sentence: "If the king discovered his gift was now in England, the consequences for the queen would be terrible." }
  ]},
  { day: 39, words: [
    { word: "intercepted", definition: "Stopped or caught something or someone before they reached their destination.", sentence: "The Cardinal's agents would try to intercept anyone riding for England — blocking roads, setting ambushes, stopping the studs from reaching the queen." },
    { word: "sacrifice", definition: "Giving up something valuable for the sake of someone or something more important.", sentence: "'If we are attacked, whoever is still free must keep riding. The mission comes first.' It was a sacrifice they all agreed to make." }
  ]},
  { day: 41, words: [
    { word: "ambush", definition: "A surprise attack by people lying in wait in a hidden position.", sentence: "Eight men on horseback burst from the trees — a perfectly planned ambush by the Cardinal's agents." },
    { word: "desperate", definition: "Having almost no hope left; willing to try anything because the situation is so bad.", sentence: "D'Artagnan rode through the night, desperate and alone, his friends left behind one by one." }
  ]},
  { day: 42, words: [
    { word: "diplomacy", definition: "The skill of dealing with people in a sensitive, careful way, especially in politics or between nations.", sentence: "Buckingham understood diplomacy — he knew that the diamond studs were not just jewelry but symbols of trust between a queen and a friend." },
    { word: "replica", definition: "An exact copy of something, made to look identical to the original.", sentence: "Buckingham's jeweler made two replica diamond studs so perfect that even the queen could not tell them from the originals." }
  ]},
  { day: 43, words: [
    { word: "endurance", definition: "The ability to keep going through pain, exhaustion, or difficulty without giving up.", sentence: "D'Artagnan rode for days without rest, running on nothing but endurance and the knowledge that the queen was counting on him." },
    { word: "intercepted", definition: "Stopped or caught something or someone before they reached their destination. (revisited)", sentence: "At Boulogne, two men tried to block the road. At Abbeville, a man tried to start a fight. Every attempt to intercept D'Artagnan failed." }
  ]},
  { day: 44, words: [
    { word: "radiant", definition: "Glowing with beauty, confidence, or happiness. Shining brightly.", sentence: "The queen entered the ball radiant — her gown was silver and white, and twelve diamond studs blazed around her neck like stars." },
    { word: "foiled", definition: "Prevented a plan from succeeding. Defeated someone's scheme.", sentence: "The Cardinal counted the studs three times. His plan had been foiled — all twelve were there." }
  ]},
  { day: 46, words: [
    { word: "ruthless", definition: "Showing no mercy or pity. Willing to do anything to achieve a goal, regardless of who gets hurt.", sentence: "Milady was ruthless — she used charm the way others used swords, to get close enough to strike." },
    { word: "deception", definition: "The act of making someone believe something that is not true. Tricking people deliberately.", sentence: "Everything about Milady was deception — the beauty, the gentle voice, the kind smile. All of it was a weapon." }
  ]},
  { day: 47, words: [
    { word: "branded", definition: "Marked permanently as punishment for a crime, usually with a hot iron.", sentence: "Athos discovered his wife had been branded on the shoulder — a mark that revealed her criminal past." },
    { word: "confession", definition: "The act of telling someone a secret or admitting something painful and private.", sentence: "Athos's confession about his past was the deepest secret of a man who kept everything locked inside." }
  ]},
  { day: 48, words: [
    { word: "siege", definition: "A military operation where an army surrounds a city or fort and waits for the people inside to surrender.", sentence: "The siege of La Rochelle would be long and bloody — thousands of soldiers camped outside the walls, waiting." },
    { word: "endure", definition: "To suffer through something difficult without giving up. To bear hardship with strength.", sentence: "The four friends endured the siege together — the mud, the cold, the danger — and that made all the difference." }
  ]},
  { day: 49, words: [
    { word: "bastion", definition: "A fortified position or stronghold, especially one that projects outward from a wall or defensive line.", sentence: "The ruined bastion sat in no-man's-land, exposed to cannon fire from both sides — the most dangerous place to eat breakfast in France." },
    { word: "audacity", definition: "Bold, daring behavior that surprises people, sometimes bordering on recklessness.", sentence: "The audacity of eating a casual meal under enemy fire made the breakfast in the bastion the most famous meal of the siege." }
  ]},
  { day: 51, words: [
    { word: "cunning", definition: "Clever in a sneaky, deceptive way. The ability to achieve goals through tricks rather than force.", sentence: "Milady was not simply the Cardinal's agent — her cunning meant she always had plans of her own." },
    { word: "patron", definition: "A powerful person who supports and protects someone, often in exchange for service.", sentence: "The Cardinal was Milady's patron — he gave her power and protection, and she carried out his schemes." }
  ]},
  { day: 52, words: [
    { word: "manipulate", definition: "To control or influence someone cleverly and often unfairly, making them do what you want without realizing it.", sentence: "Milady manipulated her young guard with invented tears and false stories of innocence." },
    { word: "calculated", definition: "Done deliberately and carefully planned, especially in a cold or strategic way.", sentence: "Every word, every tear, every trembling hand was calculated. Milady was performing the role of her life." }
  ]},
  { day: 53, words: [
    { word: "frantic", definition: "Wild with worry, fear, or urgency. Desperate and panicked.", sentence: "D'Artagnan was frantic — Milady was free, heading for France, and Constance was in danger." },
    { word: "intercepted", definition: "Stopped or caught something or someone before they reached their destination. (revisited again)", sentence: "Aramis's network intercepted messages revealing Milady's location and direction of travel." }
  ]},
  { day: 54, words: [
    { word: "tragedy", definition: "A very sad event, especially one involving death or suffering. In literature, a story where things end badly despite the hero's best efforts.", sentence: "They arrived to find tragedy — Milady had struck, and no amount of riding could undo what had been done." },
    { word: "vengeance", definition: "The desire to punish someone who has hurt you or someone you love. Revenge.", sentence: "Something harder and more determined appeared in D'Artagnan's eyes — vengeance, cold and clear." }
  ]},
  { day: 56, words: [
    { word: "exile", definition: "Being forced to leave your country permanently as punishment. Banishment.", sentence: "The sentence was exile — Milady would leave France forever, never to return." },
    { word: "reckoning", definition: "A time when someone must face the consequences of their actions. A moment of judgment.", sentence: "Athos had been running from a reckoning for years and had finally decided to face it." }
  ]},
  { day: 57, words: [
    { word: "adversary", definition: "An opponent or enemy, especially one you respect.", sentence: "The Cardinal recognized D'Artagnan as a worthy adversary — someone who had beaten him fairly." },
    { word: "diplomacy", definition: "The skill of dealing with people in a sensitive, careful way, especially in politics or between nations. (revisited)", sentence: "D'Artagnan said carefully: 'I believe that you and I disagree about how France should be served.' It was the most diplomatic sentence of his life." }
  ]},
  { day: 58, words: [
    { word: "commission", definition: "An official document giving someone a military rank or position. (revisited)", sentence: "The blank commission sat on the table — a piece of paper that represented everything D'Artagnan had fought for." },
    { word: "ceremony", definition: "A formal event marking an important occasion, often with rituals and traditions.", sentence: "The commissioning ceremony was held in the courtyard, with Monsieur de Tréville himself placing the blue cloak on D'Artagnan's shoulders." }
  ]},
  { day: 59, words: [
    { word: "contentment", definition: "A deep, quiet feeling of satisfaction and happiness. The feeling that you have everything you need.", sentence: "D'Artagnan felt contentment as the four swords met in the fading light — he belonged, and that was enough." },
    { word: "legacy", definition: "Something passed down from the past. The lasting impact of a person's actions and character.", sentence: "D'Artagnan drew his father's old sword and raised it to meet the other three — the legacy of a Gascon farmer now carried by a musketeer." }
  ]}
];

// Comprehension data (2 questions per chapter: 1 MC + 1 SA)
const comprehension = [
  { day: 31, chapter: "The Boy from Gascony", questions: [
    { type: "mc", question: "What three gifts does D'Artagnan's father give him before he leaves for Paris?", options: ["A new suit, a bag of gold, and a fine horse", "The yellow horse, fifteen gold coins, and his old sword", "A letter, a map, and a compass", "A blue cloak, silver boots, and a hat"], answer: 1 },
    { type: "sa", question: "D'Artagnan's father gives him three pieces of advice: never run from a fight, never tolerate an insult, and never betray a friend. Which piece of advice do you think will be the most important? Why?" }
  ]},
  { day: 32, chapter: "Trouble in Meung", questions: [
    { type: "mc", question: "What does D'Artagnan lose during the fight at the inn?", options: ["His sword and his horse", "His father's letter of introduction to Monsieur de Tréville", "His fifteen gold coins", "His hat and his boots"], answer: 1 },
    { type: "sa", question: "D'Artagnan memorizes everything about the man who humiliated him — the scar, the cold eyes, the black horse. Why do you think D'Artagnan does this? What does it tell you about his character?" }
  ]},
  { day: 33, chapter: "Three Duels Before Noon", questions: [
    { type: "mc", question: "How does D'Artagnan end up with three duels scheduled in one morning?", options: ["He insults all three musketeers on purpose", "He accidentally crashes into Athos, breaks Porthos's belt, and steps on Aramis's foot while chasing the man with the scar", "The three musketeers challenge him as a test", "The Cardinal orders the duels"], answer: 1 },
    { type: "sa", question: "D'Artagnan is terrified — he thinks he is going to die on his first day in Paris. But he shows up for the duels anyway. What does this tell you about his character? Is showing up when you are scared the same as being brave?" }
  ]},
  { day: 34, chapter: "All for One", questions: [
    { type: "mc", question: "Instead of dueling D'Artagnan, what do the three musketeers end up doing?", options: ["They arrest him", "They laugh at him and send him away", "They fight alongside him against the Cardinal's Guards", "They report him to the captain"], answer: 2 },
    { type: "sa", question: "D'Artagnan says 'I may not be a musketeer, but I am on your side.' Why is this moment so important? How does choosing a side — even when you don't have to — change everything for D'Artagnan?" }
  ]},
  { day: 36, chapter: "The Three Musketeers", questions: [
    { type: "mc", question: "Which description best matches each musketeer?", options: ["Athos: loud and vain; Porthos: quiet and sad; Aramis: brave and strong", "Athos: noble and mysterious; Porthos: large and generous; Aramis: gentle and clever", "Athos: young and reckless; Porthos: old and wise; Aramis: angry and violent", "They are all exactly the same"], answer: 1 },
    { type: "sa", question: "The motto 'All for one, and one for all' means that if one friend is in trouble, all of them come. Why is this code so powerful? What would happen to the group if even one of them broke it?" }
  ]},
  { day: 37, chapter: "The Captain's Blessing", questions: [
    { type: "mc", question: "What does the king offer D'Artagnan?", options: ["Immediate rank as a musketeer", "A place in the guards as a cadet, with the chance to earn the blue cloak", "A large sum of gold", "Command of the entire army"], answer: 1 },
    { type: "sa", question: "D'Artagnan tells the king: 'I may have nothing, but I will give everything.' Why does this impress the king? What does this statement reveal about D'Artagnan's values?" }
  ]},
  { day: 38, chapter: "The Queen's Secret", questions: [
    { type: "mc", question: "What is the Cardinal's plan to expose the queen?", options: ["He will search her rooms", "He will convince the king to hold a ball and insist the queen wear the diamond studs she gave away", "He will send soldiers to arrest her", "He will write a letter to the king"], answer: 1 },
    { type: "sa", question: "D'Artagnan hears about a dangerous mission and immediately says 'I'll go.' He doesn't hesitate, doesn't weigh the risks, doesn't ask what's in it for him. What drives D'Artagnan to volunteer for danger?" }
  ]},
  { day: 39, chapter: "The Cardinal's Plot", questions: [
    { type: "mc", question: "What rule do the four friends agree to before riding for England?", options: ["They will all stay together no matter what", "Whoever is still free must keep riding — the mission comes first", "They will surrender if outnumbered", "They will turn back if it gets too dangerous"], answer: 1 },
    { type: "sa", question: "The rule 'the mission comes first' seems to contradict 'all for one, one for all.' How can both be true at the same time? When is completing a mission more important than staying together?" }
  ]},
  { day: 41, chapter: "The Mission", questions: [
    { type: "mc", question: "In what order do the three musketeers fall behind?", options: ["Athos, Porthos, Aramis", "Aramis, Athos, Porthos", "Porthos, Aramis, Athos", "They all fall at once"], answer: 2 },
    { type: "sa", question: "Each musketeer sacrifices himself in a different way: Porthos stays to fight a duel, Aramis is wounded holding off attackers, Athos is poisoned. What does each sacrifice tell you about that character's personality?" }
  ]},
  { day: 42, chapter: "D'Artagnan Alone", questions: [
    { type: "mc", question: "What problem does D'Artagnan discover when Buckingham opens the case of diamond studs?", options: ["The studs have been destroyed", "Two studs are missing — stolen by Milady de Winter", "The case is empty", "The studs are the wrong color"], answer: 1 },
    { type: "sa", question: "D'Artagnan is alone in a foreign country with no money, no friends, and no plan. Yet he succeeds. What personal qualities allow D'Artagnan to keep going when everything seems impossible?" }
  ]},
  { day: 43, chapter: "The Race to Paris", questions: [
    { type: "mc", question: "What does D'Artagnan discover when he finds Athos at the inn in Amiens?", options: ["Athos has been killed", "Athos is alive — he locked the innkeeper in the cellar and all three musketeers survived their ordeals", "Athos has joined the Cardinal's side", "Athos has already gone to Paris"], answer: 1 },
    { type: "sa", question: "When D'Artagnan learns all three of his friends survived, he nearly cries with relief. Why is this moment so emotional? What does it reveal about what D'Artagnan values most?" }
  ]},
  { day: 44, chapter: "The Ball", questions: [
    { type: "mc", question: "How does the Cardinal react when he sees the queen wearing all twelve diamond studs?", options: ["He congratulates her", "He shows cold, calculating respect — someone has foiled his plan perfectly", "He storms out of the ball", "He accuses the queen publicly"], answer: 1 },
    { type: "sa", question: "D'Artagnan saved the queen, but he can never be thanked publicly. The queen sends him a ring through Constance instead. Why must heroes sometimes work in secret? Is an unseen act of bravery worth less than a public one?" }
  ]},
  { day: 46, chapter: "The Woman in the Shadows", questions: [
    { type: "mc", question: "Why does Athos warn D'Artagnan to stay away from Milady?", options: ["She is physically stronger than them", "She is the most dangerous person in France — she uses charm as a weapon and destroys anyone in her way", "She is a friend of the king", "She is actually harmless"], answer: 1 },
    { type: "sa", question: "Athos says Milady 'has destroyed better men than you.' What makes Milady more dangerous than the Cardinal's Guards or the enemies they fought on the road to England?" }
  ]},
  { day: 47, chapter: "Athos's Secret", questions: [
    { type: "mc", question: "What is Athos's connection to Milady?", options: ["She is his sister", "She was his wife — he married her before discovering her criminal past", "She is his enemy from childhood", "He has never met her before"], answer: 1 },
    { type: "sa", question: "Athos carries his secret about Milady for years without telling anyone. When he finally tells D'Artagnan, something shifts between them. Why does sharing a painful secret strengthen a friendship rather than weaken it?" }
  ]},
  { day: 48, chapter: "The Siege of La Rochelle", questions: [
    { type: "mc", question: "How does each musketeer contribute during the siege?", options: ["They all fight the same way", "Athos leads calmly, Porthos provides strength and humor, Aramis tends the wounded, D'Artagnan volunteers for dangerous missions", "They hide in their tents", "Only D'Artagnan fights; the others stay behind"], answer: 1 },
    { type: "sa", question: "Athos tells D'Artagnan: 'You will earn the blue cloak not because of what you do in battle, but because of who you are.' What does he mean? What is the difference between earning something through actions versus earning it through character?" }
  ]},
  { day: 49, chapter: "The Breakfast in the Bastion", questions: [
    { type: "mc", question: "Why do the four friends choose to eat breakfast in a bombed-out bastion?", options: ["They are hungry and it's the only place with food", "They need a private place to talk where no spies can listen, and no one goes near the dangerous bastion", "The Cardinal orders them to go there", "They are trying to surrender to the enemy"], answer: 1 },
    { type: "sa", question: "The breakfast in the bastion is both terrifying and hilarious — cannonballs flying while they calmly eat cheese and pour wine. Why do you think Dumas wrote this scene as comedy in the middle of a war story? What does humor do for the characters and for the reader?" }
  ]},
  { day: 51, chapter: "Milady's Mission", questions: [
    { type: "mc", question: "What does Athos say about Milady's nature as the Cardinal's agent?", options: ["She always follows orders exactly", "She never simply does what she is told — she makes things darker and more extreme", "She is secretly working against the Cardinal", "She only follows orders she agrees with"], answer: 1 },
    { type: "sa", question: "Athos teaches D'Artagnan that 'patience is not weakness — it is the hardest kind of strength.' D'Artagnan hates waiting while Milady is in England. Is Athos right? When is patience stronger than action?" }
  ]},
  { day: 52, chapter: "The Prisoner", questions: [
    { type: "mc", question: "How does Milady escape from her English captors?", options: ["She fights her way out", "She manipulates a young, lonely guard into believing she is an innocent prisoner and he helps her escape", "The Cardinal sends soldiers to free her", "She picks the lock"], answer: 1 },
    { type: "sa", question: "Milady uses kindness as a weapon — she pretends to be gentle and innocent to trick the guard. How does this connect to the larger theme that things are not always what they seem? Where else in the story have appearances been deceiving?" }
  ]},
  { day: 53, chapter: "The Warning", questions: [
    { type: "mc", question: "Where has Constance been hidden for safety?", options: ["In the palace with the queen", "In a convent near the town of Béthune", "In England with Buckingham", "In Athos's country house"], answer: 1 },
    { type: "sa", question: "D'Artagnan says: 'The siege can wait. Constance cannot.' He puts a person above a military mission. Is this the right choice? When should personal loyalty override duty?" }
  ]},
  { day: 54, chapter: "Too Late", questions: [
    { type: "mc", question: "How does Milady harm Constance?", options: ["She captures her and locks her away", "She comes disguised as a friend and poisons her wine", "She has soldiers attack the convent", "She tricks Constance into leaving with her"], answer: 1 },
    { type: "sa", question: "This is the darkest chapter in the book. D'Artagnan arrives too late despite doing everything right — riding as fast as possible, never giving up. What does this moment teach about the limits of even the greatest effort? How does D'Artagnan respond to failure?" }
  ]},
  { day: 56, chapter: "The Trial of Milady", questions: [
    { type: "mc", question: "What sentence do the four friends give Milady?", options: ["Imprisonment in the Bastille", "Permanent exile from France", "Death", "They forgive her"], answer: 2 },
    { type: "sa", question: "Milady says she did what she had to do to survive in a world that gave her nothing. Does this explanation make her more sympathetic, or does it not excuse her crimes? Can understanding why someone became who they are change how you judge their actions?" }
  ]},
  { day: 57, chapter: "The Cardinal's Offer", questions: [
    { type: "mc", question: "What does the Cardinal give D'Artagnan?", options: ["A bag of gold", "A blank lieutenant's commission in the musketeers — D'Artagnan can fill in any name", "A threat and a warning", "A position in the Cardinal's own guard"], answer: 1 },
    { type: "sa", question: "The Cardinal could have D'Artagnan arrested, but instead he gives him a commission and calls him a 'worthy opponent.' What does this tell you about the Cardinal? Is Richelieu purely a villain, or is he something more complicated?" }
  ]},
  { day: 58, chapter: "One for All", questions: [
    { type: "mc", question: "Why does each musketeer refuse the commission for himself?", options: ["They don't want to be musketeers anymore", "Each one believes someone else deserves it more: Athos doesn't want rank, Porthos says he's too vain for command, Aramis plans to enter the church", "They are angry at D'Artagnan", "The commission is worthless"], answer: 1 },
    { type: "sa", question: "D'Artagnan says: 'I accept this not for myself, but for us.' How is this different from the boy who arrived in Paris wanting glory for himself? What has the journey from Gascony to musketeer taught D'Artagnan about the difference between personal glory and shared honor?" }
  ]},
  { day: 59, chapter: "All for One", questions: [
    { type: "mc", question: "What does D'Artagnan realize his father forgot to tell him?", options: ["How to use a sword properly", "That the friends you find along the way are worth more than anything you set out to find", "That Paris is a dangerous city", "That the Cardinal is powerful"], answer: 1 },
    { type: "sa", question: "The book begins and ends with 'All for one, and one for all.' But the meaning has changed. At the beginning, it was a motto. By the end, it is something the characters have lived, fought for, and sacrificed for. How does living a motto change its meaning? What is the difference between saying words and embodying them?" }
  ]}
];

// Insert vocabulary and comprehension after assessmentSchedule
unitCard.vocabulary = vocabulary;
unitCard.comprehension = comprehension;

// Write updated unit card
fs.writeFileSync('./book-data/three-musketeers-unit-card.json', JSON.stringify(unitCard, null, 2), 'utf-8');

console.log('✅ Added vocabulary and comprehension data to Three Musketeers unit card!');
console.log(`   - Vocabulary: ${vocabulary.length} days`);
console.log(`   - Comprehension: ${comprehension.length} days`);
console.log('   - Unit card ready for lesson generation!');
