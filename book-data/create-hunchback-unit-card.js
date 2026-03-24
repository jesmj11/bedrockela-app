#!/usr/bin/env node
/**
 * Create Hunchback of Notre Dame Unit Card
 * Days 61-90 (Weeks 13-18)
 */

const fs = require('fs');

const unitCard = {
  "title": "The Hunchback of Notre-Dame by Victor Hugo",
  "grade": "4th",
  "days": "61-90",
  "totalDays": 30,
  "regularDays": 24,
  "assessmentDays": 6,
  "assessmentSchedule": [65, 70, 75, 80, 85, 90],
  
  "informationalTexts": [
    {
      "day": 61,
      "title": "Medieval Paris: The City of Notre-Dame",
      "text": "In the Middle Ages, Paris was very different from the modern city we know today. The streets were narrow and dirty. People threw their garbage and waste right into the streets! There were no cars — instead, people walked or rode horses. Notre-Dame Cathedral stood at the center of the city on an island in the Seine River. The cathedral took nearly 200 years to build, from 1163 to 1345. It was the tallest building in Paris and could be seen from miles away. On Sunday mornings, the bells would ring so loudly that everyone in the city could hear them. The cathedral was not just a church — it was a gathering place, a shelter, and a symbol of the city itself.",
      "questions": [
        "How long did it take to build Notre-Dame Cathedral?",
        "What river is Notre-Dame built on?",
        "Why was Notre-Dame important to medieval Paris beyond being a church?"
      ]
    },
    {
      "day": 62,
      "title": "Victor Hugo: The Writer Who Saved Notre-Dame",
      "text": "Victor Hugo was born in France in 1802. He grew up to become one of France's most famous writers. When Hugo was young, Notre-Dame Cathedral was falling apart. The French Revolution had damaged it, and people didn't care about fixing old buildings. Hugo loved Notre-Dame and was heartbroken to see it crumbling. So in 1831, he wrote The Hunchback of Notre-Dame to make people fall in love with the cathedral again. His plan worked! After the novel became popular, France spent millions of francs restoring Notre-Dame. Hugo's book literally saved the cathedral. He died in 1885, and over 2 million people attended his funeral — one of the largest funerals in history.",
      "questions": [
        "What year did Victor Hugo publish The Hunchback of Notre-Dame?",
        "Why did Hugo write this story?",
        "How many people attended Hugo's funeral in 1885?"
      ]
    },
    {
      "day": 63,
      "title": "Gothic Architecture: Building to the Sky",
      "text": "Notre-Dame is built in a style called Gothic architecture. Gothic cathedrals have several special features: pointed arches, tall towers, huge stained-glass windows, and flying buttresses (stone supports on the outside that keep the walls from collapsing). Medieval builders wanted their churches to reach toward heaven, so they built them as tall as possible. The inside of a Gothic cathedral is designed to make you feel small and amazed. Light streams through colorful windows, creating patterns on the floor. The ceilings soar so high above you that your voice echoes. Building a Gothic cathedral required hundreds of workers and took decades — sometimes over a century — to complete.",
      "questions": [
        "What are flying buttresses and what do they do?",
        "Why did medieval builders make cathedrals so tall?",
        "How long did Gothic cathedrals typically take to build?"
      ]
    },
    {
      "day": 64,
      "title": "Bells and Bell Ringers",
      "text": "Before clocks, radios, or phones, church bells told people the time and warned them of danger. Bell ringers had one of the most important jobs in the city. They rang the bells for morning prayers, noon, evening, and midnight. They also rang bells to warn of fires, floods, or attacks. The largest bell in Notre-Dame is called Emmanuel. It weighs over 13 tons — as much as nine cars! Ringing such heavy bells was exhausting work. Bell ringers pulled on thick ropes with all their strength. The vibrations were so loud that many bell ringers lost their hearing over time. In Hugo's story, Quasimodo loves the bells because they are the only 'voices' he can still hear.",
      "questions": [
        "What did church bells tell people before modern technology?",
        "How much does Notre-Dame's largest bell, Emmanuel, weigh?",
        "Why did many bell ringers lose their hearing?"
      ]
    },
    {
      "day": 66,
      "title": "The Festival of Fools",
      "text": "The Festival of Fools was a real medieval tradition held every January. For one day, the rules of society were turned upside down. Poor people dressed as nobles. Servants gave orders to their masters. The festival often included electing a 'Pope of Fools' or 'King of Fools' — usually the ugliest or silliest person in the crowd. The festival allowed common people to make fun of the church and powerful leaders without getting in trouble. It was chaotic, loud, and wild. Many church officials hated the Festival of Fools and tried to ban it, but the tradition was so popular that it continued for centuries. Hugo uses this festival in his novel to show how quickly a crowd's love can turn to cruelty.",
      "questions": [
        "When was the Festival of Fools traditionally held?",
        "What happened to social rules during the festival?",
        "Why did church officials dislike the Festival of Fools?"
      ]
    },
    {
      "day": 67,
      "title": "Medieval Justice: Cruel and Public",
      "text": "In medieval times, punishments were harsh and public. If you stole bread, you might lose a hand. If you lied in court, your tongue could be cut out. The pillory was a common punishment: a wooden frame that locked a person's head and hands in place while crowds threw rotten food and rocks at them. Public punishment served two purposes: it punished the criminal and warned others not to break the law. Trials were often unfair. Poor people had no lawyers. Torture was used to force confessions. If a judge believed you were guilty, you were guilty — there was no appeal. The system was based on fear, not fairness.",
      "questions": [
        "What was the pillory and how was it used?",
        "What were two purposes of public punishment?",
        "How were trials different in medieval times compared to today?"
      ]
    },
    {
      "day": 68,
      "title": "Sanctuary: The Law of the Church",
      "text": "In medieval Europe, churches offered sanctuary — a safe place where criminals could hide from arrest. If someone being chased by guards ran into a church and grabbed the altar, they were protected by church law. Even the king's soldiers could not drag them out. Sanctuary could last for weeks or even months while the church negotiated with authorities. This law existed because the church believed forgiveness was more important than revenge. However, sanctuary had limits. If you left the church grounds, you could be arrested immediately. Some criminals lived in churches for years, afraid to step outside. Notre-Dame's sanctuary plays a crucial role in Hugo's story.",
      "questions": [
        "What does sanctuary mean in medieval church law?",
        "How long could sanctuary last?",
        "What happened if someone left the church grounds during sanctuary?"
      ]
    },
    {
      "day": 69,
      "title": "The Roma People: Europe's Outcasts",
      "text": "The Roma (sometimes called Gypsies, though many consider this term offensive) have lived in Europe for over 600 years. They originally came from India and traveled in caravans, working as musicians, dancers, metalworkers, and traders. Because they moved from place to place and had different customs, many Europeans feared and mistrusted them. Laws banned Roma from entering cities. They were accused of witchcraft and theft, often unfairly. In Hugo's novel, Esmeralda is Roma. Hugo shows how prejudice treats an entire group of people as criminals just because they are different. Understanding this history helps us see why the Roma characters in the story face such cruelty.",
      "questions": [
        "Where did the Roma people originally come from?",
        "What kinds of work did Roma people traditionally do?",
        "Why were Roma people mistrusted in medieval Europe?"
      ]
    },
    {
      "day": 71,
      "title": "Gargoyles: Monsters with a Purpose",
      "text": "Gargoyles are strange, often frightening stone creatures that stick out from the sides of Gothic buildings. They look like dragons, demons, or twisted animals. But gargoyles weren't just decoration — they were actually waterspouts. Rain would flow through the gargoyle's mouth and shoot away from the building, protecting the walls from water damage. Medieval people also believed gargoyles scared away evil spirits. The word 'gargoyle' comes from an old French word meaning 'throat' or 'to gargle,' because of the gurgling sound water makes as it flows through them. In Hugo's story, gargoyles are Quasimodo's companions — silent, misunderstood, and serving a purpose most people don't appreciate.",
      "questions": [
        "What practical purpose did gargoyles serve?",
        "Where does the word 'gargoyle' come from?",
        "What did medieval people believe about gargoyles and evil spirits?"
      ]
    },
    {
      "day": 72,
      "title": "Deformity and Disability in the Middle Ages",
      "text": "In medieval times, people with physical disabilities or deformities were often treated cruelly. Many believed that a twisted body meant a twisted soul, or that disability was punishment from God. People with deformities were sometimes abandoned as babies, locked away, or displayed as curiosities in traveling shows. Medical knowledge was limited — doctors didn't understand conditions like scoliosis (curved spine) or dwarfism. However, not everyone was cruel. Some monasteries and churches cared for people society rejected. A few disabled people became successful artists, scholars, or craftspeople. Hugo wrote Quasimodo to challenge the idea that physical appearance reflects inner worth. The novel asks: who is truly monstrous — the person who looks different, or the people who treat them cruelly?",
      "questions": [
        "How were people with deformities often treated in medieval times?",
        "What did many medieval people wrongly believe about disability?",
        "What question does Hugo's novel ask about true monstrosity?"
      ]
    },
    {
      "day": 73,
      "title": "The Court of Miracles: Paris's Hidden City",
      "text": "The Court of Miracles was a real place in medieval Paris — a neighborhood where outcasts, criminals, and the poor lived together outside the law. It was called the 'Court of Miracles' because beggars who pretended to be blind, lame, or sick during the day would miraculously 'heal' when they returned home at night. The area was a maze of narrow alleys where city guards rarely dared to enter. It had its own rules, its own king, and its own sense of justice. Thieves and con artists mixed with genuinely poor families who had nowhere else to go. Hugo's novel shows the Court of Miracles as both dangerous and compassionate — a community of people rejected by the world above.",
      "questions": [
        "Why was it called the 'Court of Miracles'?",
        "Why didn't city guards often enter this area?",
        "What kinds of people lived in the Court of Miracles?"
      ]
    },
    {
      "day": 74,
      "title": "Medieval Dance and Music",
      "text": "Music and dance were everywhere in medieval life. Traveling musicians called minstrels went from town to town playing lutes, drums, and flutes. Dances were performed at festivals, weddings, and markets. The tambourine was especially popular with Roma dancers. Dancing was a way for common people to celebrate and forget their hard lives for a while. However, the church often disapproved of dancing, seeing it as sinful and distracting people from prayer. Women who danced professionally, like Esmeralda in the story, were often viewed with suspicion. People thought dancers were wild and immoral. This prejudice made dancers vulnerable to accusations and arrest.",
      "questions": [
        "What were traveling musicians called in medieval times?",
        "Why did common people love music and dance?",
        "Why were professional dancers often viewed with suspicion?"
      ]
    },
    {
      "day": 76,
      "title": "The Power of the Church in Medieval Times",
      "text": "In the Middle Ages, the Catholic Church was one of the most powerful institutions in Europe. It owned vast amounts of land, collected taxes called tithes, and had its own courts and laws. Church leaders like bishops and archdeacons were as powerful as nobles. A corrupt church official could destroy lives without fear of punishment. The church controlled education — almost all schools were run by priests. It also controlled what people read: books had to be copied by hand by monks, and the church decided which books were acceptable. People who questioned the church could be arrested for heresy (disagreeing with church teachings). This power is important in Hugo's story, where Frollo uses his church position to harm innocent people.",
      "questions": [
        "What kinds of power did the medieval church have?",
        "What was heresy?",
        "Who controlled education and books in medieval times?"
      ]
    },
    {
      "day": 77,
      "title": "Obsession: When Love Becomes Dangerous",
      "text": "The word 'obsession' comes from a Latin word meaning 'to besiege' — like an army surrounding a castle. When someone is obsessed, their mind is under siege by a single thought or desire they cannot escape. Obsession is different from love. Love wants the other person to be happy. Obsession wants to possess and control. In Hugo's novel, Frollo is obsessed with Esmeralda. He doesn't love her — he wants to own her. When he can't have her, he wants to destroy her. Hugo shows how obsession can turn a person into a monster, regardless of how respectable they seem on the outside. Understanding obsession helps us see why Frollo is the story's true villain.",
      "questions": [
        "What does the word 'obsession' originally mean in Latin?",
        "How is obsession different from love?",
        "Who is obsessed in Hugo's story, and with whom?"
      ]
    },
    {
      "day": 78,
      "title": "Loyalty: Choosing Who You Serve",
      "text": "Loyalty means staying faithful to a person, cause, or institution even when it's difficult. In medieval times, loyalty was everything. Knights swore loyalty to their lords. Servants were loyal to their masters. Breaking an oath of loyalty was one of the worst things a person could do. But Hugo's novel asks a harder question: what do you do when the person you're loyal to is wrong? Quasimodo has been loyal to Frollo his entire life. Frollo raised him, protected him, and gave him a home. But when Frollo commands Quasimodo to do something evil, Quasimodo faces an impossible choice. Sometimes true loyalty means disobeying orders when those orders are cruel.",
      "questions": [
        "Why was loyalty so important in medieval times?",
        "What difficult choice does Quasimodo face in the story?",
        "Can disobeying an order sometimes be the loyal thing to do?"
      ]
    },
    {
      "day": 79,
      "title": "Beauty and Ugliness: Who Decides?",
      "text": "Every culture has ideas about what is beautiful and what is ugly. But these ideas are not universal — they change over time and place. In medieval Europe, pale skin was considered beautiful because it meant you didn't work in the fields. Plumpness was attractive because it meant you had enough to eat. Today's beauty standards are completely different! Hugo's novel challenges the idea that outer beauty reflects inner goodness. Quasimodo is physically deformed, but he is gentle, loyal, and brave. Frollo is handsome and respected, but his soul is twisted by obsession and cruelty. Esmeralda is beautiful, but her beauty makes her a target. The story forces readers to think about what true beauty really means.",
      "questions": [
        "How have beauty standards changed over time?",
        "What point is Hugo making about outer and inner beauty?",
        "Give examples from the story of characters whose appearances don't match their souls."
      ]
    },
    {
      "day": 81,
      "title": "Mobs: When Crowds Turn Dangerous",
      "text": "A mob is a large crowd of people who lose their individual judgment and act emotionally as a group. Mobs can form quickly and do terrible things that individuals would never do alone. In a mob, people feel anonymous and powerful. They stop thinking rationally. They feed off each other's emotions — anger, fear, or excitement — until the feeling becomes overwhelming. Mobs can be swayed by a single passionate speaker. Once a mob forms, it's extremely difficult to stop. Hugo shows this multiple times in his novel: the crowd that crowns Quasimodo and then mocks him, the mob that storms the cathedral, the people who cheer for executions. Understanding mob psychology helps explain how good people can participate in terrible acts.",
      "questions": [
        "What is a mob?",
        "Why do people in mobs do things they wouldn't do alone?",
        "Give an example of mob behavior from Hugo's story."
      ]
    },
    {
      "day": 82,
      "title": "Redemption: Can People Change?",
      "text": "Redemption means being saved from evil or error. It's about transformation — becoming a better person than you were before. Many stories explore whether people can truly change. Can someone who has done terrible things become good? In Christian theology (important in medieval times), redemption was central: anyone could be forgiven if they truly repented. But Hugo's novel asks whether redemption is possible for everyone. Quasimodo redeems himself through his protection of Esmeralda — he becomes more than the frightened, obedient creature Frollo raised. But can Frollo be redeemed? Or has he gone too far? The story suggests that redemption requires recognizing you were wrong — and some people are too proud or too far gone to do that.",
      "questions": [
        "What does redemption mean?",
        "How does Quasimodo redeem himself in the story?",
        "Why might some people be unable to achieve redemption?"
      ]
    },
    {
      "day": 83,
      "title": "Fate vs. Free Will",
      "text": "Fate is the idea that everything is predetermined — that your life is already written and you can't change it. Free will is the belief that you make your own choices and control your own destiny. Medieval people often believed in fate. They thought God had a plan for everyone and trying to fight it was useless. Hugo explores this question throughout his novel. Is Quasimodo's life predetermined by his deformity and Frollo's control? Or does he have the power to choose his own path? When Quasimodo defies Frollo and chooses to protect Esmeralda, he asserts his free will. The novel suggests that even when life seems predetermined, moments of choice — moments of courage — can change everything.",
      "questions": [
        "What is the difference between fate and free will?",
        "What did medieval people tend to believe about fate?",
        "When does Quasimodo assert his free will in the story?"
      ]
    },
    {
      "day": 84,
      "title": "The Symbolism of the Cathedral",
      "text": "In literature, a symbol is something that represents something else. Notre-Dame Cathedral is the central symbol in Hugo's novel. On one level, it's just a building — stone, wood, glass, and metal. But symbolically, it represents many things: permanence in a changing world, sanctuary and safety, beauty created by human hands, the soul of Paris itself. The cathedral shelters Quasimodo and later Esmeralda. It stands while people come and go, live and die. Hugo wrote the novel partly to save the real Notre-Dame from being destroyed. By making it the heart of his story, he reminded readers that some things — beauty, history, compassion — are worth preserving.",
      "questions": [
        "What is a symbol in literature?",
        "What does Notre-Dame Cathedral symbolize in the novel?",
        "Why did Hugo make the cathedral so central to his story?"
      ]
    },
    {
      "day": 86,
      "title": "Medieval Torture and Interrogation",
      "text": "In medieval times, torture was a legal part of interrogation. Authorities believed that pain would force people to tell the truth. Common torture methods included the rack (stretching the body), the wheel (breaking bones), and the strappado (hanging by bound arms). Accused criminals were tortured until they confessed — even if they were innocent. Many people confessed to crimes they didn't commit just to make the pain stop. Medieval society believed torture was necessary for justice, but we now know it produces false confessions and is morally wrong. Hugo includes torture in his novel to show the cruelty of medieval justice and how power can be abused when one group has total control over another.",
      "questions": [
        "Why did medieval authorities use torture?",
        "What problem occurs when torture is used to get confessions?",
        "What point is Hugo making by including torture in his story?"
      ]
    },
    {
      "day": 87,
      "title": "The Seine River: Paris's Lifeline",
      "text": "The Seine River flows through the center of Paris, dividing the city into the Left Bank and Right Bank. In medieval times, the river was essential for transportation, trade, and daily life. Boats carried goods up and down the river. Fishermen caught fish to sell in the markets. People drew water from the river for drinking, cooking, and washing (though this often made them sick). Notre-Dame sits on an island in the Seine, called Île de la Cité. This island was the original center of Paris. The river features prominently in Hugo's novel — it's where characters travel, hide, and sometimes meet their fate. Understanding the river's importance helps us see why the cathedral's location was so significant.",
      "questions": [
        "What are the two banks of the Seine River called?",
        "What was the river used for in medieval times?",
        "On what island does Notre-Dame stand?"
      ]
    },
    {
      "day": 88,
      "title": "Heroism: Courage in Impossible Situations",
      "text": "A hero is someone who shows great courage, especially in the face of danger. But heroism isn't just about fighting dragons or winning battles. Sometimes heroism is protecting someone weaker than yourself. Sometimes it's standing up to authority when authority is wrong. Sometimes it's choosing compassion when everyone else chooses cruelty. Quasimodo is an unlikely hero. He's been taught to hide, to obey, to believe he's worthless. But when the moment comes, he acts with extraordinary courage. He defies Frollo, claims sanctuary for Esmeralda, and defends the cathedral against an army. His heroism is powerful because he had to overcome so much fear and self-doubt to find it. True heroes aren't fearless — they're afraid and act anyway.",
      "questions": [
        "What makes someone a hero?",
        "How is Quasimodo an unlikely hero?",
        "What makes Quasimodo's heroism especially powerful?"
      ]
    },
    {
      "day": 89,
      "title": "Tragedy: When Stories Don't End Happily",
      "text": "A tragedy is a story where the hero suffers or dies, often because of forces beyond their control or their own flaws. Tragedies are different from stories with happy endings — they leave us sad, thoughtful, and asking hard questions. Why do tragedies exist? Because life doesn't always end happily. Sometimes good people suffer. Sometimes courage isn't enough. Tragedies teach us about the costs of pride, cruelty, and injustice. They make us think about what matters most. Hugo's novel is a tragedy — not everyone survives, and those who do are forever changed. But tragedies aren't pointless. They help us understand the world and make us want to create a better one.",
      "questions": [
        "What is a tragedy in literature?",
        "Why do authors write tragedies instead of happy endings?",
        "What does Hugo's tragic ending make readers think about?"
      ]
    }
  ],

  "grammar": [
    {"day": 61, "topic": "Complex Sentences", "skill": "Identify and write sentences with independent and dependent clauses"},
    {"day": 63, "topic": "Prepositional Phrases", "skill": "Use prepositional phrases to add detail (on the tower, under the cathedral, through the streets)"},
    {"day": 66, "topic": "Appositives", "skill": "Use appositives to add information (Quasimodo, the bell ringer, lived alone)"},
    {"day": 68, "topic": "Relative Clauses", "skill": "Use who, which, that to connect ideas (The cathedral, which stood for 200 years, was beautiful)"},
    {"day": 71, "topic": "Participles", "skill": "Use -ing and -ed words to describe (The ringing bells, the frightened crowd)"},
    {"day": 73, "topic": "Compound-Complex Sentences", "skill": "Combine multiple clauses for sophisticated writing"},
    {"day": 76, "topic": "Semicolons", "skill": "Use semicolons to join related independent clauses"},
    {"day": 78, "topic": "Colons", "skill": "Use colons to introduce lists or explanations"},
    {"day": 81, "topic": "Parallel Structure", "skill": "Keep items in a series grammatically consistent"},
    {"day": 83, "topic": "Active vs. Passive Voice", "skill": "Identify and choose between active and passive constructions"},
    {"day": 86, "topic": "Subjunctive Mood", "skill": "Use subjunctive for wishes, suggestions, demands (If I were... I wish he were...)"},
    {"day": 88, "topic": "Emphasis with Inversion", "skill": "Rearrange sentence order for dramatic effect (Never had he seen... Only then did she...)"}
  ],

  "language": [
    {"day": 62, "topic": "Latin Roots: struct, form", "skill": "Cathedral structure, deformity, transform — build vocabulary from roots"},
    {"day": 64, "topic": "Figurative Language: Metaphor", "skill": "Identify metaphors (The cathedral is the heart of Paris)"},
    {"day": 67, "topic": "Connotation vs. Denotation", "skill": "Understand word feelings (monster, creature, outcast have different emotional weights)"},
    {"day": 69, "topic": "Multiple Meaning Words", "skill": "Words that change meaning by context (court: royal vs. courtyard)"},
    {"day": 72, "topic": "Prefixes: de-, dis-, mis-", "skill": "Deformed, disfigured, misjudged — understand negative prefixes"},
    {"day": 74, "topic": "Figurative Language: Simile", "skill": "Use like/as comparisons (as agile as a cat, like a gargoyle)"},
    {"day": 77, "topic": "Tone", "skill": "Identify author's attitude through word choice"},
    {"day": 79, "topic": "Idioms", "skill": "Understand phrases that mean something different (turn a blind eye, heart of stone)"},
    {"day": 82, "topic": "Word Relationships: Antonyms", "skill": "Beauty/ugliness, cruelty/compassion, obedience/defiance"},
    {"day": 84, "topic": "Symbolism in Language", "skill": "Understand when objects represent ideas (bells = voice, cathedral = permanence)"},
    {"day": 87, "topic": "Latin Roots: sanct, dict", "skill": "Sanctuary, benediction, dictate — holy and speaking words"},
    {"day": 89, "topic": "Context Clues", "skill": "Use surrounding text to figure out unfamiliar words"}
  ],

  "writing": [
    {"day": 61, "prompt": "Notre-Dame Cathedral took 200 years to build. Describe something in your life that took a long time to create or achieve. What made it worth the effort? (1-2 paragraphs)"},
    {"day": 63, "prompt": "Quasimodo is called a 'foundling' — a child abandoned and found by others. Write about a time you felt like you didn't belong somewhere. How did you handle those feelings? (1-2 paragraphs)"},
    {"day": 66, "prompt": "The Festival of Fools turns everything upside down for one day. If you could reverse one rule for a day, what would it be and what would happen? (1-2 paragraphs)"},
    {"day": 68, "prompt": "Esmeralda shows Quasimodo compassion when no one else does. Write about a time someone showed you unexpected kindness. How did it change things? (1-2 paragraphs)"},
    {"day": 71, "prompt": "Gargoyles are ugly but serve an important purpose. Write about something that doesn't look appealing but is actually very useful or valuable. (1-2 paragraphs)"},
    {"day": 73, "prompt": "The Court of Miracles is a community of outcasts who help each other. Why do people who have been rejected sometimes form the strongest communities? (1-2 paragraphs)"},
    {"day": 76, "prompt": "Frollo has power and uses it to hurt people. Write about why it's important to hold powerful people accountable for their actions. (1-2 paragraphs)"},
    {"day": 78, "prompt": "Quasimodo must choose between loyalty to Frollo and doing what's right. Have you ever had to choose between following orders and following your conscience? (1-2 paragraphs)"},
    {"day": 81, "prompt": "Mobs can make good people do bad things. Write about a time you saw (or experienced) peer pressure to do something wrong. What should people do in those situations? (1-2 paragraphs)"},
    {"day": 83, "prompt": "The novel asks whether we control our own fate. Write about a moment when you made a choice that changed something important. (1-2 paragraphs)"},
    {"day": 86, "prompt": "Medieval justice was cruel and unfair. Why is it important to have fair trials and treat accused people humanely, even if we think they're guilty? (1-2 paragraphs)"},
    {"day": 88, "prompt": "Quasimodo becomes a hero by protecting someone weaker than himself. Write about what heroism means to you. Does someone have to do something dramatic to be a hero? (1-2 paragraphs)"}
  ],

  "journal": [
    {"day": 62, "prompt": "Victor Hugo's book literally saved Notre-Dame Cathedral from destruction. Have you ever created something (art, writing, a project) that changed someone's mind or helped solve a problem?"},
    {"day": 64, "prompt": "Bell ringers lost their hearing from loud bells, but Quasimodo loved the bells anyway. Write about something you love even though it has difficult or painful parts."},
    {"day": 67, "prompt": "Public punishments in medieval times were meant to shame people. Do you think shaming is an effective way to change behavior? Why or why not?"},
    {"day": 69, "prompt": "The Roma people were mistrusted because they were different. Write about a time when someone judged you unfairly based on how you looked or where you came from."},
    {"day": 72, "prompt": "Medieval people wrongly believed that physical deformity meant a bad soul. What modern-day prejudices do you think future generations will look back on and find shocking?"},
    {"day": 74, "prompt": "Dancing and music helped people escape their hard lives. What activity helps you feel free or forget your worries for a while?"},
    {"day": 77, "prompt": "Obsession is different from love because it wants to control, not support. How can you tell if someone's feelings for you (friendship or more) are healthy or unhealthy?"},
    {"day": 79, "prompt": "Beauty standards change over time and culture. What do you think makes a person truly beautiful, beyond physical appearance?"},
    {"day": 82, "prompt": "Redemption means becoming better than you were. Write about a time you made a mistake and worked to become better. What did you learn?"},
    {"day": 84, "prompt": "Notre-Dame Cathedral symbolizes permanence — it stands while people come and go. What building, place, or object feels permanent and meaningful in your life?"},
    {"day": 87, "prompt": "The Seine River was essential to medieval Paris. What natural feature (river, mountain, lake, forest) is important to your community or region?"},
    {"day": 89, "prompt": "Tragedies don't have happy endings, but they teach important lessons. What's a book, movie, or real-life story with a sad ending that made you think differently about the world?"}
  ],

  "assessmentWords": [
    [65, ["cathedral", "gargoyle", "foundling", "deformity", "solitude", "agile", "spectacle", "jeering", "compassion", "dignity", "outcast", "vouch", "authority", "manipulation", "obedience", "conscience", "sanctuary", "pillory", "minstrel", "tambourine"]],
    [70, ["prejudice", "persecution", "nomad", "caravan", "alchemist", "archdeacon", "hermit", "recluse", "obsession", "infatuation", "torment", "anguish", "captive", "prisoner", "execution", "gallows", "reprieve", "pardon", "refuge", "asylum"]],
    [75, ["siege", "assault", "barricade", "rampart", "defender", "invader", "chaos", "turmoil", "loyalty", "betrayal", "defiance", "rebellion", "valor", "courage", "cowardice", "terror", "desperation", "determination", "sacrifice", "selflessness"]],
    [80, ["justice", "injustice", "accusation", "verdict", "condemned", "innocent", "guilty", "testimony", "witness", "evidence", "trial", "judgment", "mercy", "cruelty", "vengeance", "forgiveness", "redemption", "transformation", "fate", "destiny"]],
    [85, ["cathedral", "architecture", "Gothic", "buttress", "spire", "vault", "nave", "transept", "symbol", "permanence", "beauty", "ugliness", "deformity", "appearance", "soul", "character", "monster", "humanity", "compassion", "cruelty"]],
    [90, ["hero", "villain", "protagonist", "antagonist", "tragedy", "triumph", "sorrow", "grief", "loss", "death", "memory", "legacy", "lesson", "moral", "theme", "symbolism", "metaphor", "irony", "justice", "redemption"]]
  ]
};

// Write the unit card
fs.writeFileSync('./book-data/hunchback-unit-card.json', JSON.stringify(unitCard, null, 2), 'utf-8');

console.log('✅ Hunchback of Notre-Dame unit card created!');
console.log('   - Days 61-90 (Weeks 13-18)');
console.log('   - 24 informational texts');
console.log('   - 12 grammar + 12 language lessons');
console.log('   - 12 writing + 12 journal prompts');
console.log('   - 120 assessment words');
console.log('   - Next: Add vocabulary and comprehension data');
