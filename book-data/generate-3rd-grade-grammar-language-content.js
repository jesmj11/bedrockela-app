#!/usr/bin/env node

/**
 * Generate 3rd Grade Grammar & Language Lesson Content
 * 
 * Creates complete, CCSS-aligned grammar and language lessons
 * for all 12 books (144 total lessons) following spiral curriculum
 */

const fs = require('fs');
const path = require('path');

// Load the spiral curriculum
const curriculum = JSON.parse(
  fs.readFileSync('3rd-grade-grammar-language-spiral-curriculum.json', 'utf8')
);

/**
 * Grammar Lesson Templates (3rd Grade Level)
 */
const grammarLessons = {
  "Nouns (Common & Proper)": {
    introduction: `**Nouns** are words that name people, places, things, or ideas.

**Common nouns** name general things: girl, city, book, happiness
**Proper nouns** name specific things: Cinderella, Paris, Harry Potter
- Proper nouns always start with a capital letter!

**Examples from the story:**
• Common: girl, stepmother, palace, ball
• Proper: Cinderella, Prince Charming

**Practice:** Find 3 proper nouns and 3 common nouns in today's chapter!`,
    building: `**Remember:** Nouns name people, places, things, or ideas.

**Abstract nouns** name things you cannot see or touch:
• love, courage, kindness, freedom, happiness

**Concrete nouns** name things you CAN see or touch:
• table, flower, castle, crown

**From the story:** Can you find abstract nouns like "bravery" or "hope"?

**Practice:** Write 2 concrete nouns and 2 abstract nouns from the chapter.`,
    deepening: `**Possessive Nouns** show ownership by adding 's

**Singular possessive:**
• The princess's dress (one princess owns the dress)
• Jack's beanstalk (Jack owns the beanstalk)

**Rules:**
1. If the noun is singular, add 's
2. If the noun is plural and ends in s, add ' only
3. If plural doesn't end in s, add 's

**Practice:** Rewrite these phrases using possessive nouns:
• the crown that belongs to the queen → the queen's crown`,
    mastery: `**Collective Nouns** name groups:
• family, team, flock, herd, class, group

**Key concept:** A collective noun is ONE group made of many members.

**Examples:**
• The family went to the ball. (one family, many people)
• A flock of birds flew overhead. (one flock, many birds)

**Practice:** Find collective nouns in today's chapter and explain what group they name.`
  },

  "Verbs (Action & Linking)": {
    introduction: `**Verbs** are words that show action or state of being.

**Action verbs** show what someone DOES:
• run, jump, dance, sing, laugh, cry
• "Cinderella swept the floor."

**Past tense** verbs show action that already happened:
• Add -ed to most verbs: walk → walked
• Some verbs change completely: run → ran, go → went

**Practice:** Find 5 action verbs in today's chapter. Which ones are past tense?`,
    building: `**Present tense** verbs show action happening NOW:
• I walk, you talk, she dances
• Add -s or -es for he/she/it

**Helping verbs** work with action verbs:
• is, am, are, was, were, will, can, could, would

**Examples:**
• She is dancing. (helping verb + action verb)
• They will arrive tomorrow.

**Practice:** Find sentences with helping verbs in today's story.`,
    deepening: `**Irregular verbs** don't follow the normal -ed pattern:

**Common irregular verbs:**
• go → went (not goed)
• eat → ate (not eated)
• see → saw (not seed)
• come → came
• take → took

**Practice:** Find 3 irregular verbs in today's chapter. Write the present and past tense.`,
    mastery: `**Linking verbs** connect the subject to more information:

**Common linking verbs:**
• am, is, are, was, were
• seem, become, appear, feel, look, taste, smell

**Test:** Can you replace it with "="?
• The prince IS handsome. (The prince = handsome) ✓

**Action or Linking?**
• She looked happy. (linking - she = happy)
• She looked out the window. (action - she did something)

**Practice:** Identify linking vs. action verbs in today's chapter.`
  },

  "Adjectives": {
    introduction: `**Adjectives** describe nouns. They tell us MORE about people, places, or things.

**What adjectives describe:**
• Size: big, tiny, huge
• Color: red, blue, golden
• Shape: round, square
• Feeling: happy, sad, angry
• Number: three, many, few

**Examples:** beautiful princess, dark forest, glass slipper

**Practice:** Find 5 adjectives in today's chapter. What noun does each describe?`,
    building: `**Comparative & Superlative Adjectives:**

**Comparative** compares TWO things (add -er):
• tall → taller (The giant is taller than Jack)
• big → bigger (double the consonant!)

**Superlative** compares THREE or more (add -est):
• tall → tallest (The giant is the tallest of all)
• big → biggest

**Long adjectives use more/most:**
• beautiful → more beautiful → most beautiful

**Practice:** Write 3 sentences using comparative or superlative adjectives.`,
    deepening: `**Adjective Order** matters when using multiple adjectives:

**Correct order:**
1. Number (three)
2. Opinion (beautiful)
3. Size (large)
4. Age (old)
5. Shape (round)
6. Color (golden)
7. Origin (French)
8. Material (silk)
9. Purpose (ball)

**Example:** three beautiful large golden silk ball gowns

**Practice:** Arrange these adjectives in the correct order.`,
    mastery: `**Precise Adjectives** make writing more interesting:

**Instead of "good":**
• excellent, wonderful, fantastic, superb, marvelous

**Instead of "bad":**
• terrible, awful, dreadful, horrible, unpleasant

**Sensory adjectives** describe the 5 senses:
• Sight: sparkling, shimmering, gleaming
• Sound: melodious, thunderous, whispering
• Touch: silky, rough, smooth
• Taste: sweet, sour, bitter
• Smell: fragrant, musty, fresh

**Practice:** Replace weak adjectives in your writing with precise ones.`
  },

  "Pronouns": {
    introduction: `**Pronouns** take the place of nouns.

**Subject pronouns** do the action:
• I, you, he, she, it, we, they
• "She went to the ball." (She = Cinderella)

**Rules:**
• Use I (not me) as the subject
• I always comes last: "Jack and I" not "I and Jack"

**Practice:** Replace the nouns with pronouns:
• Cinderella danced → She danced
• The mice helped → They helped`,
    building: `**Object pronouns** receive the action:
• me, you, him, her, it, us, them
• "The prince found her." (her = Cinderella)

**When to use:**
• After action verbs: helped me, saw them
• After words like to, for, with: for us, with him

**Possessive pronouns** show ownership:
• my, your, his, her, its, our, their
• "That is my glass slipper."

**Practice:** Choose the correct pronoun: (I/me), (they/them), (he/him)`,
    deepening: `**Pronoun-Antecedent Agreement**

**Antecedent** = the noun the pronoun replaces

**Rules:**
1. Singular noun → singular pronoun
   • The princess lost HER slipper.
2. Plural noun → plural pronoun
   • The stepsisters lost THEIR chance.
3. Pronoun must match gender
   • The prince → he/him (not she/her)

**Practice:** Find the pronoun and its antecedent in each sentence.`,
    mastery: `**All Pronouns Review:**

**Subject:** I, you, he, she, it, we, they
**Object:** me, you, him, her, it, us, them
**Possessive:** my, your, his, her, its, our, their
**Reflexive:** myself, yourself, himself, herself, itself, ourselves, themselves

**Common mistakes:**
• ❌ Me and Jack went → ✓ Jack and I went
• ❌ The gift is for I → ✓ The gift is for me
• ❌ The dog wagged it's tail → ✓ The dog wagged its tail

**Practice:** Correct pronoun errors in these sentences.`
  },

  "Sentence Types": {
    introduction: `**4 Types of Sentences:**

**Statement (.)** - tells something
• Cinderella went to the ball.

**Question (?)** - asks something
• Will she arrive on time?

**Command (.)** - tells someone to do something
• Clean your room.
• Please help me.

**Exclamation (!)** - shows strong feeling
• What a beautiful dress!
• I can't believe it!

**Practice:** Identify the sentence type in today's chapter.`,
    building: `**Commands & Exclamations**

**Commands (Imperative Sentences):**
• Subject (you) is understood
• "Go to the ball." = "(You) go to the ball."
• Can be polite: "Please bring me the broom."

**Exclamations:**
• Show excitement, surprise, or strong emotion
• "How wonderful!"
• "What a magical night!"
• "I'm so happy!"

**Practice:** Write 2 commands and 2 exclamations about today's story.`,
    deepening: `**Sentence Types Review**

**Every sentence needs:**
1. A subject (who/what)
2. A predicate (action/information)
3. Correct end mark (. ? !)

**Practice identifying:**
• Statement: The prince searched the kingdom.
• Question: Where is the glass slipper?
• Command: Try on this slipper.
• Exclamation: It fits perfectly!

**Practice:** Write one of each type about today's chapter.`,
    mastery: `**Choosing the Right Sentence Type**

**Good writing uses variety:**
• Statements give information
• Questions engage readers
• Commands create action
• Exclamations add emotion

**Avoid:**
• Too many exclamations!!!
• All statements (boring)
• Questions without answers

**Practice:** Rewrite this paragraph using all 4 sentence types:
"The ball was beautiful. There was music. There was dancing. Cinderella was happy."`
  },

  "Subject & Predicate": {
    introduction: `**Every sentence has 2 parts:**

**SUBJECT** - who or what the sentence is about
• Cinderella / The fairy godmother / The glass slipper

**PREDICATE** - what the subject does or is
• danced all night / waved her wand / sparkled in the moonlight

**Complete sentence:**
• Cinderella (subject) danced all night (predicate).

**Practice:** Draw a line between subject and predicate:
• The prince | searched the entire kingdom.`,
    building: `**Complete Subject & Predicate:**

**Simple subject** - main noun/pronoun
• The beautiful princess (complete) → princess (simple)

**Simple predicate** - main verb
• ran quickly home (complete) → ran (simple)

**Complete subject/predicate** - includes all describing words

**Examples:**
• The wicked stepmother (complete subject) ordered Cinderella around (complete predicate).

**Practice:** Identify simple and complete subject and predicate.`,
    deepening: `**Compound Subjects & Predicates:**

**Compound subject** - two or more subjects:
• Jack and the giant lived in the land.
• The prince, the king, and the queen attended.

**Compound predicate** - two or more verbs:
• Cinderella cleaned and cooked all day.
• The mice ran, hid, and watched.

**Joined by:** and, or

**Practice:** Combine sentences using compound subjects or predicates.`,
    mastery: `**Subject & Predicate Mastery:**

**Finding the subject:**
1. Find the verb first
2. Ask "Who/what (verb)?"
3. That's your subject!

**Special cases:**
• Questions: "Did Cinderella go?" → Cinderella did go
• Commands: "(You) Clean the kitchen."
• Here/There: "There are three wishes." → wishes are

**Practice:** Diagram these sentences:
• The fairy godmother granted three wishes.
• Did the slipper fit Cinderella?`
  },

  "Capitalization": {
    introduction: `**Capitalization Rules:**

**Always capitalize:**
1. First word of a sentence
   • The ball was magical.
2. The word "I"
   • Jack and I climbed.
3. Names of people
   • Cinderella, Prince Charming
4. Names of places
   • France, Paris, Elm Street

**Practice:** Fix capitalization errors in these sentences.`,
    building: `**More Capitalization Rules:**

**Capitalize titles:**
• Before names: King Henry, Dr. Smith, Princess Aurora
• Don't capitalize after: the king, my doctor, a princess

**Capitalize months, days, holidays:**
• January, Monday, Christmas, Thanksgiving
• Don't capitalize seasons: spring, summer, fall, winter

**Practice:** Which words need capital letters?`,
    deepening: `**Advanced Capitalization:**

**Geographic names:**
• Cities: London, New York
• Countries: Germany, Japan
• Rivers: Mississippi River
• Mountains: Rocky Mountains

**Proper adjectives** (from proper nouns):
• France → French bread
• America → American flag

**Practice:** Capitalize correctly: "we visited the eiffel tower in paris, france."`,
    mastery: `**All Capitalization Rules:**

**Capitalize:**
• Sentence beginnings & "I"
• Names & titles (before names)
• Places (cities, states, countries)
• Months, days, holidays
• Book/movie titles (main words)
• First word in a quote

**DON'T capitalize:**
• seasons, school subjects (except languages)
• titles after names
• small words in titles (a, the, of, and)

**Practice:** Edit this paragraph for capitalization.`
  },

  "Punctuation (End Marks)": {
    introduction: `**End Marks:**

**Period (.)** - ends a statement or command
• The clock struck midnight.
• Go to the ball.

**Question Mark (?)** - ends a question
• Where is the glass slipper?
• Did Cinderella dance with the prince?

**Exclamation Point (!)** - shows strong feeling
• The slipper fits!
• What a beautiful gown!

**Practice:** Add the correct end mark to each sentence.`,
    building: `**Choosing End Marks:**

**Use periods for:**
• Statements: The carriage arrived.
• Mild commands: Please try on the slipper.
• Abbreviations: Mr., Mrs., Dr.

**Use question marks for:**
• Direct questions: Is this your slipper?
• Not for indirect: She asked if it fit. (period)

**Use exclamation points:**
• Sparingly! Too many is annoying!
• For real excitement: It's a perfect match!

**Practice:** Add end marks and explain your choices.`,
    deepening: `**End Marks in Different Sentences:**

**Questions can start with:**
• Who, What, When, Where, Why, How
• Do, Does, Did, Can, Could, Will, Would
• Is, Are, Was, Were

**Exclamations can be:**
• Full sentences: That dress is gorgeous!
• Just a word: Wow!
• Interjections: Oh no!

**Practice:** Write 3 questions and 3 exclamations about the story.`,
    mastery: `**All End Marks - Mastery:**

**Periods:**
• Statements, commands, abbreviations
• After initials: J.K. Rowling

**Question Marks:**
• Direct questions only
• Never double punctuation: ?!

**Exclamation Points:**
• Strong emotion
• Use sparingly in formal writing
• Never multiple: !!! (looks childish)

**Practice:** Edit this dialogue for correct end marks.`
  },

  "Commas": {
    introduction: `**Commas in Addresses & Dates:**

**Addresses:**
• Between city and state: Paris, France
• In sentences: I live in Boston, Massachusetts, in a small house.

**Dates:**
• Between day and year: December 25, 2024
• In sentences: On June 1, 2023, school ended.

**NOT between:**
• Month and day: June 1 (no comma)
• Just month and year: June 2023 (no comma)

**Practice:** Add commas to addresses and dates in these sentences.`,
    building: `**Commas in a Series:**

**Use commas to separate 3 or more items:**
• Cinderella cleaned, cooked, and sewed.
• The dress was blue, sparkly, and elegant.

**Oxford comma** - comma before "and":
• With: red, white, and blue ✓
• Without: red, white and blue (still ok)

**Not needed with just 2:**
• bread and butter (no comma)

**Practice:** Add commas to lists in today's chapter.`,
    deepening: `**Commas in Dialogue:**

**Rules:**
1. After speaker tag at start:
   • The prince said, "Dance with me."
2. Before speaker tag at end:
   • "I must go," said Cinderella.
3. When tag interrupts:
   • "The clock," she cried, "is striking twelve!"

**Practice:** Add commas to this dialogue:
"Will you marry me" the prince asked.
"Yes" Cinderella replied "I will."`,
    mastery: `**All Comma Uses:**

**Use commas for:**
• Items in series (red, white, and blue)
• City, state (Paris, France)
• Date (June 1, 2023)
• After greeting/closing in letter (Dear Mom,)
• After yes/no at start (Yes, I'll go.)
• With dialogue ("Come in," she said.)
• After introductory words (However, she stayed.)

**Practice:** Add commas where needed in this paragraph.`
  },

  "Quotation Marks": {
    introduction: `**Quotation Marks show someone's exact words:**

**Basic rules:**
• Put " " around the exact words
• "I will find her," said the prince.
• The fairy godmother said, "You shall go to the ball."

**Parts:**
• Quotation: the exact words
• Speaker tag: who said it

**Practice:** Add quotation marks to show exact words.`,
    building: `**Punctuation with Quotations:**

**Rules:**
1. Comma before quote: She said, "Hello."
2. Comma after quote: "Hello," she said.
3. End mark inside quotes: "Where are you?"
4. Capitalize first word: "The ball is tonight."

**Examples:**
• "Help me," Cinderella cried.
• The prince asked, "What is your name?"
• "I must leave!" she shouted.

**Practice:** Punctuate these quotations correctly.`,
    deepening: `**Advanced Quotation Marks:**

**When speaker tag interrupts:**
• "The magic," she explained, "will end at midnight."

**New speaker = new paragraph:**
"Where did she go?" asked the prince.
"I don't know," the guard replied.

**Quote within a quote uses single marks:**
• The king said, "The prince said, 'I will find her.'"

**Practice:** Write a dialogue between two characters.`,
    mastery: `**Writing Dialogue:**

**Good dialogue:**
• Sounds natural (how people really talk)
• Shows character personality
• Moves the story forward
• Uses varied speaker tags (said, asked, whispered, cried)

**Format:**
• New speaker = new line
• Indent each new speaker
• Punctuation inside quotes
• Tag separated by comma

**Practice:** Write a 6-line conversation between fairy tale characters.`
  },

  "Possessives": {
    introduction: `**Possessives show ownership:**

**Singular nouns - add 's:**
• Cinderella's dress
• the prince's palace
• James's book

**Rules:**
• Always use 's for singular
• Even if name ends in s: James's

**Practice:** Rewrite using possessives:
• the shoes that belong to Cinderella → Cinderella's shoes`,
    deepening: `**Plural Possessives:**

**If plural ends in -s, add ' only:**
• the stepsisters' room (more than one stepsister)
• the girls' dresses
• the princes' horses

**If plural doesn't end in -s, add 's:**
• the children's toys
• the mice's cheese
• the women's gowns

**Practice:** Write the possessive form:
• the wishes of the children → the children's wishes`,
    mastery: `**Its vs. It's:**

**It's = it is (contraction)**
• It's a beautiful day. (It is a beautiful day.)

**Its = possessive (NO apostrophe)**
• The bird built its nest.
• The kingdom had its own rules.

**Trick:** If you can say "it is," use it's!

**Other confusing possessives:**
• whose vs. who's (who is)
• your vs. you're (you are)
• their vs. they're (they are)

**Practice:** Choose its or it's in these sentences.`
  },

  "Adverbs": {
    introduction: `**Adverbs describe verbs:**

**Tell HOW (manner):**
• She danced gracefully.
• The clock struck loudly.
• They ran quickly.

**Often end in -ly:**
• slow → slowly
• quiet → quietly
• happy → happily

**Not all -ly words are adverbs:**
• friendly, lovely, silly are adjectives

**Practice:** Find 5 adverbs in today's chapter. What verb does each describe?`,
    building: `**Adverbs tell WHEN and WHERE:**

**WHEN (time):**
• yesterday, today, tomorrow
• now, later, soon, always, never
• Example: She arrived early.

**WHERE (place):**
• here, there, everywhere, inside, outside
• Example: The prince looked everywhere.

**HOW (manner):**
• carefully, beautifully, sadly

**Practice:** Add adverbs to make these sentences more interesting.`,
    mastery: `**Adverb Mastery:**

**Comparative & Superlative:**
• fast → faster → fastest
• carefully → more carefully → most carefully

**Good vs. Well:**
• Good = adjective (describes nouns)
  • She is a good dancer.
• Well = adverb (describes verbs)
  • She dances well.

**Placement:**
• Usually after verb: ran quickly
• Can start sentence: Yesterday, I went home.
• Never between verb and object: ❌ She ate quickly the apple

**Practice:** Use good/well correctly in sentences.`
  },

  "Compound Sentences": {
    introduction: `**Compound Sentences join 2 simple sentences:**

**Simple sentences:**
• Cinderella went to the ball.
• The prince danced with her.

**Compound sentence (joined with AND):**
• Cinderella went to the ball, and the prince danced with her.

**Formula:** Sentence 1, **and** Sentence 2.

**Practice:** Join these simple sentences with "and".`,
    building: `**Conjunctions: AND, BUT, OR**

**AND** - adds information
• The clock struck midnight, and Cinderella ran away.

**BUT** - shows contrast
• She wanted to stay, but she had to leave.

**OR** - shows choice
• Would the prince find her, or would she remain hidden?

**Don't forget the COMMA before the conjunction!**

**Practice:** Join sentences using and, but, or or.`,
    mastery: `**Writing with Compound Sentences:**

**Use compound sentences to:**
• Show relationships between ideas
• Add variety to writing
• Connect related thoughts

**Remember:**
• Each part must be a complete sentence
• Always use comma + conjunction
• Don't overuse (vary sentence types!)

**Practice:** Combine these sentences. Choose the best conjunction:
• The fairy appeared. She granted three wishes.
• They could dance. They could talk.
• Cinderella was tired. She kept working.`
  },

  "Complex Sentences": {
    introduction: `**Complex Sentences** have an independent clause and a dependent clause:

**Independent clause** - complete thought:
• Cinderella went to the ball.

**Dependent clause** - incomplete (starts with because, when, if, although):
• because the fairy godmother helped her
• when the clock struck midnight

**Complex sentence:**
• Cinderella went to the ball because the fairy godmother helped her.

**Practice:** Identify the independent and dependent clauses.`,
    deepening: `**Common subordinating words:**
• Time: when, while, before, after, until
• Reason: because, since
• Condition: if, unless
• Contrast: although, though, even though

**Two patterns:**
1. Independent, dependent:
   • She fled when the clock struck twelve.
2. Dependent, independent (use comma):
   • When the clock struck twelve, she fled.

**Practice:** Write complex sentences using because, when, although.`
  },

  "Sentence Variety": {
    mastery: `**Good writing uses VARIETY:**

**Sentence types:**
• Simple: The prince searched.
• Compound: He searched the kingdom, and he found her.
• Complex: He found her because she tried the slipper.

**Sentence lengths:**
• Short sentences add impact: She ran.
• Longer sentences add details: She ran down the palace steps as the clock struck midnight.

**Sentence beginnings:**
• Don't always start with "The" or subject
• Use adverbs: Quickly, she fled.
• Use dependent clauses: When midnight came, she left.

**Practice:** Rewrite this paragraph to add variety.`
  },

  "Editing & Proofreading": {
    mastery: `**Edit & Proofread Like a Pro:**

**Steps:**
1. **Read for meaning** - Does it make sense?
2. **Check sentences** - Complete? Varied?
3. **Check capitalization** - Proper nouns, sentence starts?
4. **Check punctuation** - End marks, commas, quotes?
5. **Check spelling** - Use dictionary!

**Proofreader's marks:**
• ≡ capitalize
• / lowercase
• ^ add something
• ⌀ delete

**Practice:** Edit this paragraph using proofreader's marks.`
  },

  "Parts of Speech (All 8)": {
    introduction: `**The 8 Parts of Speech:**

**1. Noun** - person, place, thing, idea
   • Cinderella, palace, kindness

**2. Pronoun** - replaces noun
   • she, he, they, it

**3. Verb** - action or state of being
   • danced, is, were

**4. Adjective** - describes noun
   • beautiful, golden, three

**5. Adverb** - describes verb
   • quickly, very, yesterday

**6. Preposition** - shows position
   • in, on, under, to, from

**7. Conjunction** - joins words
   • and, but, or

**8. Interjection** - shows emotion
   • Wow! Oh! Hooray!

**Practice:** Identify the part of speech for each underlined word.`,
    mastery: `**Using Parts of Speech Correctly:**

**Make your writing better:**
• Strong verbs: dashed (not went fast)
• Precise nouns: mansion (not big house)
• Vivid adjectives: shimmering (not pretty)
• Exact adverbs: cautiously (not carefully)

**Avoid:**
• Too many adjectives (purple, sparkly, beautiful, elegant dress)
• Weak verbs (is, was, are, were)
• Starting every sentence the same way

**Practice:** Improve this sentence using better parts of speech:
"The girl was very happy and walked to the big house."`
  },

  "Writing Complete Sentences": {
    mastery: `**Complete Sentences have:**
1. **Subject** (who/what)
2. **Predicate** (action/information)
3. **Complete thought**
4. **Correct punctuation**

**Sentence fragments** - incomplete:
• ❌ Running to the ball. (no subject)
• ❌ Cinderella and her stepsisters. (no predicate)

**Run-on sentences** - too much:
• ❌ Cinderella went to the ball she danced with the prince. (needs punctuation)
• ✓ Cinderella went to the ball, and she danced with the prince.

**Practice:** Fix these fragments and run-ons.`
  }
};

/**
 * Language Lesson Templates (3rd Grade Level)
 */
const languageLessons = {
  "ABC Order (First Letter)": {
    introduction: `**ABC Order** (Alphabetical Order) helps us organize and find words!

**Steps:**
1. Look at the FIRST letter of each word
2. Put them in A-B-C order

**Example:**
• cat, ball, apple → apple, ball, cat

**From today's story:**
Put these words in ABC order:
• Cinderella, ball, prince, fairy → ?

**Practice:** Put the vocabulary words in ABC order!`
  },

  "ABC Order (Second Letter)": {
    introduction: `**When first letters are the same, use the SECOND letter:**

**Example:**
• cat, car, cap (all start with C)
• Look at second letter: cat, car, cap
• a comes before r (alphabetically)
• cap, car, cat ✓

**Steps:**
1. Group words with same first letter
2. Look at second letter
3. Put in ABC order

**Practice:** Put these in ABC order: magic, moon, mice, mirror`
  },

  "ABC Order (Third Letter)": {
    building: `**When first AND second letters match, use the THIRD letter:**

**Example:**
• princess, pretty, price
• All start with pr
• Look at third letter: i, i, e
• e comes before i
• pretty, price, princess ✓

**Sometimes you need to check:**
• 1st letter? No, all same
• 2nd letter? No, all same  
• 3rd letter? Yes! Different

**Practice:** ABC order: slipper, sleeping, slippery, slice`
  },

  "ABC Order (Guide Words)": {
    building: `**Guide Words** at the top of dictionary pages help you find words fast!

**How they work:**
• First guide word = first word on page
• Second guide word = last word on page
• Your word must fall alphabetically between them

**Example:** Guide words: dance - dark
• Words on page: dancer, danger, daring, darkness
• NOT on page: crown (comes before dance), daisy (comes before dance), desk (comes after dark)

**Practice:** Which words would be on this page? Guide words: magic - marble`
  },

  "ABC Order (Mastery)": {
    deepening: `**ABC Order Mastery:**

**Use ABC order when:**
• Looking up words in dictionary
• Finding books in library
• Organizing lists
• Using index in textbook

**Speed tips:**
1. Scan first letters quickly
2. Check second letter only if needed
3. Practice makes faster!

**Challenge:** Put these 10 words in ABC order as fast as you can!`,
    mastery: `**ABC Order in Real Life:**

**Where you see ABC order:**
• Dictionary entries
• Phone books (contacts)
• Class rosters
• Library card catalog
• Index in back of books
• Encyclopedia
• Filing systems

**Practice:** Create an ABC order list of all the characters in today's story.`
  },

  "Rhyming Words": {
    introduction: `**Rhyming words** have the same ending sound:

**Examples:**
• cat, hat, bat, mat (all end with -at)
• ball, call, fall, tall (all end with -all)
• light, night, sight, right (all end with -ight)

**Word families** are rhyming words that share a spelling pattern!

**From fairy tales:**
• spell, well, bell
• gown, town, crown, down

**Practice:** Find 3 pairs of rhyming words in today's chapter!`
  },

  "Rhyming Words (Word Families)": {
    introduction: `**Word Families** - groups of rhyming words:

**-ight family:**
night, light, bright, sight, might, fight

**-ance family:**
dance, prance, glance, chance

**-ell family:**
spell, well, bell, tell, fell

**How to make rhyming words:**
1. Keep the ending the same
2. Change the beginning sound
3. -ight: night, fight, sight, bright!

**Practice:** Create a word family with -own: town, crown, ___?`
  },

  "Rhyming Words (Poetry)": {
    building: `**Rhymes in Poetry:**

**Rhyme scheme** - pattern of rhymes:
• AABB: lines 1-2 rhyme, lines 3-4 rhyme
• ABAB: lines 1-3 rhyme, lines 2-4 rhyme

**Example (AABB):**
The prince looked high (A)
The prince looked low (B)  
He searched the sky (A)
To find his love so (B)

**Types of poems:**
• Couplet: 2 rhyming lines
• Limerick: 5 lines (AABBA pattern)

**Practice:** Write a 4-line rhyming poem about today's story!`
  },

  "Synonyms (Same Meaning)": {
    introduction: `**Synonyms** are words that mean the same thing (or nearly the same):

**Examples:**
• big = large, huge, enormous
• happy = glad, joyful, cheerful
• said = replied, answered, stated

**Why use synonyms?**
• Make writing more interesting
• Avoid repeating same word
• Express exact meaning

**From the story:**
• beautiful = lovely, gorgeous, pretty
• ran = dashed, raced, sprinted

**Practice:** Find synonyms for: walk, look, good`
  },

  "Synonyms (Word Choice)": {
    introduction: `**Choosing the BEST Synonym:**

**Not all synonyms are exactly the same!**

**Shades of meaning:**
• thin vs. slender vs. scrawny
• old vs. ancient vs. elderly
• walk vs. stroll vs. march

**Choose based on:**
• Positive or negative feeling
• Strength of meaning
• Formality level

**Practice:** Which synonym fits best?
• The \_\_\_\_ stepmother (mean/wicked/unkind)
• The \_\_\_\_ princess (pretty/beautiful/gorgeous)`
  },

  "Synonyms (Shades of Meaning)": {
    building: `**Shades of Meaning** - subtle differences between synonyms:

**Temperature words:**
• cool → cold → freezing → arctic
• Gets colder as you go right!

**Size words:**
• small → tiny → microscopic
• big → huge → gigantic → enormous

**Speed words:**
• slow → quick → fast → rapid

**Practice:** Arrange these from weakest to strongest:
• terrified, scared, frightened, nervous`
  },

  "Synonyms (Using Thesaurus)": {
    building: `**Thesaurus** - book of synonyms!

**How to use a thesaurus:**
1. Look up the word (alphabetical order)
2. Read the synonyms
3. Choose the one that fits best
4. Check the dictionary if unsure

**Parts of thesaurus entry:**
• Entry word (word you looked up)
• Part of speech (noun, verb, etc.)
• Definition
• Synonyms (sometimes grouped by meaning)
• Antonyms (opposites)

**Practice:** Use a thesaurus to find 3 synonyms for "walk"`
  },

  "Synonyms (Precise Word Choice)": {
    deepening: `**Precise synonyms make writing stronger:**

**Instead of "walked":**
• strolled (leisurely)
• marched (with purpose)
• tiptoed (quietly)
• stomped (heavily)
• wandered (aimlessly)

**Instead of "said":**
• whispered, shouted, exclaimed
• muttered, announced, declared

**Practice:** Replace the weak words with precise synonyms:
• The princess went to the ball.
• "Stop!" she said.`
  },

  "Synonyms (Mastery)": {
    mastery: `**Synonym Mastery:**

**When to use synonyms:**
• ✓ When repeating same word
• ✓ To add variety to writing
• ✓ To express exact meaning
• ✓ In poetry for rhyme options

**When NOT to use:**
• ❌ Just to sound fancy
• ❌ If meaning isn't quite right
• ❌ If simpler word is clearer

**Practice:** Improve this by using synonyms:
"The nice fairy gave her a nice dress for the nice ball."`,
    mastery2: `**Advanced Synonym Skills:**

**Context matters:**
• The story was long. (lengthy? tedious? endless?)
• She was happy. (glad? delighted? overjoyed?)

**Connotation** (feeling):
• Positive: slender, unique, confident
• Negative: skinny, weird, arrogant
• Neutral: thin, different, sure

**Practice:** Rewrite using synonyms with the right connotation.`
  },

  "Antonyms (Opposites)": {
    introduction: `**Antonyms** are words with opposite meanings:

**Examples:**
• happy ↔ sad
• big ↔ small
• hot ↔ cold
• day ↔ night

**From fairy tales:**
• beautiful ↔ ugly
• kind ↔ cruel
• rich ↔ poor
• brave ↔ cowardly

**Practice:** Find the antonym:
• good ↔ ?
• clean ↔ ?
• early ↔ ?`
  },

  "Antonyms (Using Context)": {
    introduction: `**Finding Antonyms in Context:**

**Clue words signal antonyms:**
• but, however, unlike, instead
• "Cinderella was kind, but her stepmother was \_\_\_."

**Context helps you find opposites:**
• "She felt happy in the morning but \_\_\_ at night."

**Some words have multiple antonyms:**
• hot ↔ cold, cool, freezing, chilly

**Practice:** Use context to find the antonym:
"The palace was bright inside but \_\_\_ outside."`
  },

  "Antonyms (Using Prefixes)": {
    building: `**Prefixes make antonyms:**

**un- (not):**
• happy → unhappy
• kind → unkind
• lucky → unlucky

**dis- (opposite):**
• agree → disagree
• appear → disappear
• like → dislike

**in-, im- (not):**
• complete → incomplete
• possible → impossible
• patient → impatient

**Practice:** Make antonyms with prefixes: able, honest, approve`
  },

  "Antonyms (Word Relationships)": {
    building: `**Antonym Word Relationships:**

**Analogies with antonyms:**
• hot is to cold as day is to night
• up is to down as happy is to sad

**Pattern:** word : antonym :: word : antonym

**Types of opposites:**
• Gradable: hot/cold (can be degrees)
• Complementary: alive/dead (no in-between)
• Relational: give/take (action pairs)

**Practice:** Complete the analogy:
clean is to dirty as full is to ___?`
  },

  "Antonyms (Advanced)": {
    deepening: `**Advanced Antonyms:**

**Some words have no perfect antonym:**
• What's the opposite of "yellow"?
• What's the opposite of "chair"?

**Multiple antonyms:**
• loud: quiet, soft, silent, hushed
• Choose based on degree

**Creating antonyms:**
1. Use prefixes: un-, dis-, in-
2. Find opposite concept: fast/slow
3. Check context for best fit

**Practice:** Find the best antonym for each sentence.`
  },

  "Antonyms (Mastery)": {
    mastery: `**Antonym Mastery:**

**Using antonyms well:**
• Show contrast: "She was rich, but he was poor."
• Emphasize change: "The happy girl became sad."
• Create balance: "Work hard, play harder."

**Antonyms in literature:**
• Themes (good vs. evil)
• Character development (weak → strong)
• Setting contrast (light vs. dark)

**Practice:** Write a paragraph using 5 antonym pairs to show contrast.`
  },

  "Homophones (to/too/two)": {
    introduction: `**Homophones** sound the same but have different meanings and spellings:

**to** - direction
• Go to the ball.
• Give it to me.

**too** - also, or very
• I want to go too. (also)
• That dress is too big. (very)

**two** - the number 2
• Two glass slippers

**Trick:** Too has an extra "o" because it means extra/also!

**Practice:** Choose to, too, or two:
• She had ___ sisters.
• They were ___ mean.
• She wanted to go ___ the ball.`
  },

  "Homophones (there/their/they're)": {
    introduction: `**Three confusing homophones:**

**there** - place
• The ball is over there.
• There are three wishes.

**their** - belonging to them
• Their carriage arrived.
• The mice lost their cheese.

**they're** - they are (contraction)
• They're going to the ball.
• They're very kind.

**Trick:** If you can say "they are," use they're!

**Practice:** Choose there, their, or they're in these sentences.`
  },

  "Homophones (your/you're)": {
    building: `**Your vs. You're:**

**your** - belonging to you
• your dress
• your carriage
• Is this your slipper?

**you're** - you are (contraction)
• You're going to the ball.
• You're very kind.

**Trick:** If you can say "you are," use you're!

**Common mistake:**
• ❌ Your going to love this!
• ✓ You're going to love this! (You are going...)

**Practice:** Choose your or you're in these sentences.`
  },

  "Homophones (it's/its)": {
    building: `**It's vs. Its:**

**it's** - it is (contraction)
• It's time for the ball. (It is time...)
• It's a beautiful night.

**its** - belonging to it (possessive - NO APOSTROPHE!)
• The clock struck its final chime.
• The pumpkin lost its magic.

**Why confusing?**
• Most possessives use ' (Cinderella's)
• But "its" doesn't!

**Trick:** If you can say "it is," use it's!

**Practice:** Choose it's or its in these sentences.`
  },

  "Homophones (Review)": {
    deepening: `**Common Homophones Review:**

**to/too/two** - direction / also / number
**there/their/they're** - place / possessive / they are
**your/you're** - possessive / you are
**its/it's** - possessive / it is

**More homophones:**
• hear/here
• write/right
• no/know
• by/buy

**Practice:** Identify and correct homophone errors in this paragraph.`
  },

  "Homophones (Advanced)": {
    deepening: `**Challenging Homophones:**

**who's vs. whose**
• who's = who is
• whose = possessive (Whose slipper is this?)

**past vs. passed**
• past = time before now
• passed = went by

**stationary vs. stationery**
• stationary = not moving
• stationery = paper/writing supplies

**Practice:** Choose the correct homophone in each sentence.`
  },

  "Homophones (Mastery)": {
    mastery: `**Homophone Mastery:**

**Spelling matters!**
• Homophones sound identical
• Must use correct spelling for meaning
• Check context!

**Common errors to avoid:**
• ❌ Your welcome (you're)
• ❌ Its a nice day (it's)
• ❌ They're house (their)
• ❌ To hot (too)

**Strategy:** 
1. Sound out the word
2. Think about meaning
3. Choose correct spelling

**Practice:** Proofread and correct all homophone errors.`
  },

  "Homophones (Application)": {
    mastery: `**Using Homophones Correctly in Writing:**

**Common sets to master:**
• to/too/two
• there/their/they're
• your/you're
• its/it's
• whose/who's

**Editing tip:**
• Read your writing out loud
• Homophones sound right but may be spelled wrong
• Check each one carefully!

**Practice:** Write 5 sentences using homophone pairs correctly. Exchange with a partner to check!`
  },

  "Context Clues (Picture Clues)": {
    introduction: `**Context Clues** help you figure out unknown words!

**Picture clues:**
• Look at illustrations
• Pictures show meaning
• Help understand the story

**Example:**
• Text: "The pumpkin transformed into a carriage."
• Picture: Shows pumpkin changing into fancy coach
• Clue: Transformed means "changed into"

**Practice:** Use pictures in today's story to figure out word meanings!`
  },

  "Context Clues (Definition Clues)": {
    introduction: `**Definition clues** explain the word right in the sentence:

**Signal words:** is, means, or
• A **godmother** is a special helper who uses magic.
• **Midnight** means 12 o'clock at night.

**Look for:**
• Commas around definition
• Words like "which is" or "that means"

**Example:**
• "She wore **slippers**, which are soft shoes."

**Practice:** Find definition clues in today's chapter!`
  },

  "Context Clues (Example Clues)": {
    building: `**Example clues** give examples to show meaning:

**Signal words:** such as, like, including, for example
• "She did **chores** such as sweeping, cooking, and cleaning."
• Examples help us know chores = tasks/work

**Pattern:**
• Unknown word
• Signal word (like, such as)
• Examples

**From stories:**
• "The palace had **luxuries** like gold, jewels, and silk."
• Examples show luxuries = expensive, fancy things

**Practice:** Use example clues to figure out word meanings.`
  },

  "Context Clues (Inference Clues)": {
    building: `**Inference clues** - figure it out from what's happening:

**No direct definition!**
• Must use story clues
• Think about what makes sense

**Example:**
• "She felt **dejected** as she watched them leave for the ball."
• Clue: Watched them go without her
• Makes sense: dejected = sad, disappointed

**Strategy:**
1. Read the whole sentence
2. Look for feeling or action clues
3. Think: What would make sense?

**Practice:** Use inference to determine word meanings.`
  },

  "Context Clues (All Types)": {
    deepening: `**All 4 Types of Context Clues:**

**1. Picture clues** - use illustrations
**2. Definition clues** - word is explained
**3. Example clues** - examples given
**4. Inference clues** - figure it out

**Strategy:**
1. Read sentence carefully
2. Look for clue type
3. Make a guess
4. Reread - does it make sense?
5. Check dictionary if needed

**Practice:** Identify which type of context clue helps you figure out each word.`
  },

  "Context Clues (Review)": {
    building: `**Context Clues Review:**

**When you find an unknown word:**
1. Don't skip it!
2. Look for context clues
3. Types: definition, example, inference, picture
4. Make an educated guess
5. Check if it makes sense
6. Confirm with dictionary

**Practice:** Use context clues throughout today's reading!`
  },

  "Context Clues (Mastery)": {
    deepening: `**Context Clue Mastery:**

**Multiple clues often work together:**
• Definition + examples
• Inference + pictures
• All clues combined

**Beyond single words:**
• Use context for phrases
• Use context for figurative language
• Use context for idioms

**Active reading:**
• Always look for clues
• Builds vocabulary naturally
• Better comprehension

**Practice:** Find 5 challenging words and use context clues to determine meaning.`
  },

  "Context Clues (Application)": {
    mastery: `**Applying Context Clues:**

**Real-life use:**
• Reading new books
• Tests and assignments
• Everyday reading
• Learning subject vocabulary

**When context isn't enough:**
• Use dictionary
• Ask someone
• Look for root word/prefix/suffix
• Keep reading - might become clear

**Vocabulary building:**
• Notice context clues
• Write down new words
• Use them in your writing

**Practice:** Read a new passage and use context clues for all unknown words.`
  },

  "Prefixes (un-, re-)": {
    introduction: `**Prefix** - letters added to the BEGINNING of a word:

**un- means "not" or "opposite":**
• happy → unhappy (not happy)
• lock → unlock (opposite of lock)
• kind → unkind (not kind)

**re- means "again":**
• tell → retell (tell again)
• read → reread (read again)
• do → redo (do again)

**Pattern:** prefix + base word = new word

**Practice:** Add un- or re- to these words: fair, write, wrap, make`
  },

  "Prefixes (pre-, mis-)": {
    introduction: `**More useful prefixes:**

**pre- means "before":**
• view → preview (view before)
• heat → preheat (heat before)
• test → pretest (test before)

**mis- means "wrong" or "bad":**
• spell → misspell (spell wrong)
• behave → misbehave (behave badly)
• understand → misunderstand (understand wrong)

**Practice:** What do these mean?
• prepay, preschool, misplace, mistreat`
  },

  "Prefixes (dis-, non-)": {
    deepening: `**Advanced prefixes:**

**dis- means "not" or "opposite":**
• agree → disagree (not agree)
• appear → disappear (opposite of appear)
• like → dislike (not like)
• honest → dishonest (not honest)

**non- means "not":**
• sense → nonsense (not sense)
• fiction → nonfiction (not fiction)
• stop → nonstop (not stopping)

**Practice:** Add dis- or non- to create opposites: connect, living, obey, toxic`
  },

  "Prefixes (over-, under-)": {
    deepening: `**Prefixes showing amount:**

**over- means "too much":**
• sleep → oversleep (sleep too much)
• heat → overheat (too hot)
• cook → overcook (cook too long)
• do → overdo (do too much)

**under- means "too little":**
• cook → undercook (cook too little)
• ground → underground (below ground)
• water → underwater (beneath water)

**Practice:** Use over- or under- to complete: _____estimate, _____night, _____grown, _____paid`
  },

  "Prefixes (All Types)": {
    mastery: `**Common Prefixes:**

**Negative (not/opposite):**
• un-, dis-, in-, im-, non-

**Again:**
• re-

**Before:**
• pre-

**Amount:**
• over-, under-

**Strategy:**
1. Spot the prefix
2. Know its meaning
3. Find the base word
4. Combine meanings

**Practice:** Identify prefixes and define: unhappy, disagree, preview, overflow, nonstop`
  },

  "Suffixes (-s, -es)": {
    introduction: `**Suffix** - letters added to the END of a word:

**-s or -es makes plurals (more than one):**
• cat → cats
• dress → dresses
• wish → wishes

**When to use -es:**
• After s, x, z, ch, sh
• class → classes
• box → boxes
• wish → wishes
• church → churches

**Practice:** Add -s or -es: ball, dress, prince, fox, dish`
  },

  "Suffixes (-ed, -ing)": {
    introduction: `**Verb suffixes:**

**-ed = past tense (already happened):**
• walk → walked
• dance → danced
• clean → cleaned

**-ing = happening now:**
• walk → walking
• dance → dancing
• clean → cleaning

**Spelling rules:**
• Drop silent e: dance → dancing
• Double final consonant: hop → hopping

**Practice:** Add -ed and -ing to: help, save, skip, bake`
  },

  "Suffixes (-er, -est)": {
    deepening: `**Comparison suffixes:**

**-er = comparing 2 things:**
• tall → taller
• kind → kinder
• fast → faster
• "Cinderella is kinder than her stepsisters."

**-est = comparing 3+ things:**
• tall → tallest
• kind → kindest
• fast → fastest
• "Cinderella is the kindest of all."

**Spelling rules:**
• Drop e: nice → nicer, nicest
• Change y to i: happy → happier, happiest
• Double consonant: big → bigger, biggest

**Practice:** Add -er and -est to: small, pretty, hot, brave`
  },

  "Suffixes (-ful, -less, -ly)": {
    mastery: `**Meaning-changing suffixes:**

**-ful = "full of":**
• care → careful (full of care)
• hope → hopeful (full of hope)
• beauty → beautiful

**-less = "without":**
• care → careless (without care)
• hope → hopeless (without hope)
• fear → fearless

**-ly = "in a ___ way" (makes adverbs):**
• quick → quickly (in a quick way)
• gentle → gently
• happy → happily

**Practice:** Add -ful, -less, or -ly to: joy, pain, slow, thought`
  },

  "Compound Words (Identifying)": {
    introduction: `**Compound words** = two words joined together!

**Examples:**
• cup + cake = cupcake
• butter + fly = butterfly
• some + thing = something
• rain + bow = rainbow

**Both parts are real words:**
• fairy + tale = fairy tale (or fairytale)
• step + mother = stepmother

**From fairy tales:**
• godmother, midnight, sunshine, everywhere

**Practice:** Find 5 compound words in today's chapter!`
  },

  "Compound Words (Creating)": {
    introduction: `**Creating Compound Words:**

**Two words that make sense together:**
• tooth + brush = toothbrush ✓
• foot + ball = football ✓
• car + dog = cardog ✗ (doesn't make sense!)

**Types:**
• Closed: cupcake, notebook
• Hyphenated: merry-go-round, mother-in-law
• Open: ice cream, high school

**Practice:** Make compound words by matching:
• sun + light, flower, set
• bed + room, time, side`
  },

  "Compound Words (Meaning)": {
    deepening: `**Understanding Compound Words:**

**Meaning comes from both parts:**
• rainbow = bow (arch) of rain
• starlight = light from stars
• godmother = mother figure who is like a god/fairy

**Sometimes meaning isn't obvious:**
• butterfly ≠ butter + fly
• pineapple ≠ pine + apple

**Strategy:**
1. Break into two words
2. Think about each meaning
3. How do they combine?

**Practice:** Explain the meaning: moonlight, ballroom, stepsister, heartbroken`
  },

  "Compound Words (Hyphenated)": {
    building: `**Hyphenated Compound Words:**

**Use hyphens (-) when:**
• Two adjectives before a noun
  • well-known author
  • old-fashioned dress
• With self-
  • self-care, self-control
• Family relations
  • sister-in-law, great-grandmother

**No hyphen when:**
• Adjective comes after noun
  • The author is well known (no hyphen)

**Practice:** Add hyphens where needed: twenty one, ice cold water, mother in law, sugar coated`
  },

  "Multiple Meaning Words": {
    introduction: `**Multiple Meaning Words** have more than one definition:

**Example: "bat"**
1. A flying animal
2. Equipment for baseball

**Example: "ball"**
1. A round toy
2. A fancy dance party (like Cinderella's ball!)

**Context tells you which meaning:**
• "She went to the ball." (dance, not toy)
• "She threw the ball." (toy, not dance)

**Practice:** What does "spell" mean in each sentence?
• The witch cast a magic spell.
• Can you spell your name?`
  },

  "Multiple Meaning Words (Context)": {
    introduction: `**Using Context to Determine Meaning:**

**Steps:**
1. Read the whole sentence
2. Look for context clues
3. Think: Which meaning makes sense?
4. Check by replacing with definition

**Example: "ring"**
• "She wore a gold ring." (jewelry)
• "Did you hear the phone ring?" (sound)

**From stories:**
• "The prince gave her a ring." (jewelry)
• "They danced in a ring." (circle)

**Practice:** Determine the meaning of the underlined word using context.`
  },

  "Multiple Meaning Words (Dictionary)": {
    building: `**Using the Dictionary:**

**Dictionary entries show all meanings:**

**run** (verb)
1. to move fast on foot
2. to operate (run a business)
3. to flow (water runs)
4. to seek office (run for president)

**How to use:**
1. Find the word
2. Read all definitions
3. Choose one that fits context
4. Check part of speech

**Practice:** Look up "light" in dictionary. How many meanings? Which fits each sentence?`
  },

  "Multiple Meaning Words (Homographs)": {
    deepening: `**Homographs** - spelled the same, different meanings AND sometimes different sounds:

**lead**
• lead (leed) - to guide someone
• lead (led) - a heavy metal

**bow**
• bow (like "go") - ribbon, archer's bow
• bow (like "cow") - to bend forward

**tear**
• tear (teer) - water from crying
• tear (tare) - to rip

**Practice:** Write two sentences for each homograph showing different meanings.`
  },

  "Multiple Meaning Words (Advanced)": {
    deepening: `**Advanced Multiple Meanings:**

**Some words have MANY meanings:**
• "set" has over 400 definitions!
• "run" has over 600!

**Technical meanings:**
• "volume" - loudness OR book
• "scale" - measurement OR fish covering OR climb

**Context is KEY:**
• Read surrounding sentences
• Look at topic/subject
• Consider part of speech

**Practice:** How many meanings can you find for "court"? Use each in a sentence.`
  },

  "Figurative Language (Similes)": {
    introduction: `**Similes** compare two things using "like" or "as":

**Pattern:** _____ is like _____
           _____ is as _____ as _____

**Examples:**
• Her dress sparkled like diamonds.
• The prince was as brave as a lion.
• She ran like the wind.

**Why use similes?**
• Make writing more interesting
• Help readers visualize
• Create vivid images

**From fairy tales:**
• "Hair as black as night"
• "Skin as white as snow"

**Practice:** Create 3 similes about today's story!`
  },

  "Figurative Language (Like & As)": {
    introduction: `**Simile Patterns:**

**Using LIKE:**
• She danced like a princess.
• The dress shimmered like starlight.
• He searched like a detective.

**Using AS...AS:**
• Her heart was as pure as gold.
• The slipper was as delicate as glass.
• She was as kind as she was beautiful.

**Not every "like" is a simile:**
• "She looks like her mother." (literal comparison, not simile)
• "She sings like a bird." (simile - not literally a bird!)

**Practice:** Write similes using both patterns.`
  },

  "Figurative Language (Metaphors)": {
    deepening: `**Metaphors** compare WITHOUT using "like" or "as":

**Pattern:** _____ IS _____

**Examples:**
• The moon was a silver coin.
• Her stepmother was a dragon.
• Time was a thief.

**Simile vs. Metaphor:**
• Simile: She is like a princess. (uses like)
• Metaphor: She is a princess. (no like/as)

**Why use metaphors?**
• Stronger than similes
• More direct comparison
• Powerful imagery

**Practice:** Turn these similes into metaphors:
• The castle was like a fairy tale come to life.`
  },

  "Figurative Language (Idioms)": {
    deepening: `**Idioms** - phrases that mean something different from the literal words:

**Examples:**
• "It's raining cats and dogs" = raining hard (not actual cats/dogs!)
• "Break a leg" = good luck (don't actually break your leg!)
• "Cost an arm and a leg" = very expensive

**From fairy tales:**
• "Once upon a time" = long ago
• "Happily ever after" = forever happy
• "In the blink of an eye" = very quickly

**You can't figure out idioms from the words alone - you have to know what they mean!**

**Practice:** What do these idioms mean? "Time flies" "Don't cry over spilled milk"`
  },

  "Figurative Language (Personification)": {
    mastery: `**Personification** - giving human qualities to non-human things:

**Examples:**
• The wind whispered through the trees.
• The clock shouted twelve chimes.
• The moon smiled down on the ball.
• Time ran out.

**What can be personified:**
• Nature: wind, sun, rain
• Objects: clock, dress, carriage
• Abstract ideas: time, hope, love

**Why use personification:**
• Makes writing come alive
• Creates vivid imagery
• Helps readers connect

**Practice:** Write 3 examples of personification from today's story!`
  },

  "Figurative Language (All Types)": {
    mastery: `**All Types of Figurative Language:**

**Simile** - like/as comparison
• "She was as happy as a lark."

**Metaphor** - direct comparison
• "She was a ray of sunshine."

**Personification** - human qualities
• "The dress danced in the breeze."

**Idiom** - phrase with special meaning
• "She was over the moon with joy."

**Why use figurative language:**
• Makes writing interesting
• Creates pictures in mind
• Shows don't tell

**Practice:** Find all 4 types in today's chapter!`
  },

  "Root Words (Base Words)": {
    introduction: `**Root/Base Word** - the main word before adding prefixes or suffixes:

**Finding the root:**
• helpful → help (root) + ful (suffix)
• unhappy → un (prefix) + happy (root)
• retelling → re (prefix) + tell (root) + ing (suffix)

**Why it matters:**
• If you know the root, you can figure out new words
• help → helpful, helper, helpless, unhelpful

**Practice:** Find the root word:
• kindness, unkind, kinder → kind
• magical, magician → magic`
  },

  "Root Words (Word Families)": {
    introduction: `**Word Family** - words that share the same root:

**Example: PLAY**
• play, plays, played, playing
• player, playful, replay
• playground, playmate

**Example: KIND**
• kind, kindly, kindness
• unkind, unkindly, unkindness
• kindest, kinder

**All related because they share the root!**

**Practice:** Create word families for: help, friend, care`
  },

  "Root Words (Greek/Latin)": {
    mastery: `**Greek & Latin Roots** in English:

**Common roots:**
• **port** (carry) - transport, portable, export
• **graph** (write) - autograph, photograph, biography
• **phon** (sound) - telephone, microphone, phonics
• **scope** (see) - microscope, telescope

**Why learn roots:**
• Many English words come from Greek/Latin
• Knowing roots helps you figure out meanings
• Builds vocabulary quickly

**Practice:** What do these mean based on roots?
• biography (bio=life, graph=write)
• telescope (tele=far, scope=see)`
  },

  "Root Words (Building Vocabulary)": {
    mastery: `**Use Roots to Build Vocabulary:**

**Strategy:**
1. Learn common roots
2. Recognize them in new words
3. Combine root meaning + prefix/suffix
4. Figure out word meaning!

**Example:**
• **dict** = say/speak
• predict = pre (before) + dict (say) = say before
• dictate = say what to write
• dictionary = book of words/sayings

**More useful roots:**
• **struct** (build) - construct, destroy, structure
• **scrib/script** (write) - scribble, script, describe
• **vis** (see) - vision, visible, television

**Practice:** Use roots to define: submarine, transport, manuscript`
  },

  "Plural Nouns": {
    introduction: `**Plural = more than one**

**Regular plurals - add -s:**
• cat → cats
• ball → balls
• prince → princes

**Add -es after s, x, z, ch, sh:**
• dress → dresses
• box → boxes
• wish → wishes
• church → churches

**Practice:** Make these plural: glass, fox, dish, carriage`
  },

  "Parts of Speech (Identifying)": {
    mastery: `**Identifying Parts of Speech:**

**In the sentence: "The beautiful princess danced happily."**
• The - article (special adjective)
• beautiful - adjective (describes princess)
• princess - noun (person)
• danced - verb (action)
• happily - adverb (describes how she danced)

**Strategy:**
1. Find the verb (action/being)
2. Find the noun (subject)
3. Find words describing noun (adjectives)
4. Find words describing verb (adverbs)
5. Look for joining words (conjunctions)
6. Look for position words (prepositions)

**Practice:** Identify part of speech for each word in these sentences.`
  },

  "Parts of Speech (Using Correctly)": {
    mastery: `**Using Parts of Speech Correctly:**

**Common errors:**
• Adjective vs. Adverb
  • ❌ She danced beautiful
  • ✓ She danced beautifully (adverb describes verb)
  
• Subject vs. Object pronouns
  • ❌ Me and Jack went
  • ✓ Jack and I went

• Good vs. Well
  • ❌ She dances good
  • ✓ She dances well

**Editing tip:**
• Identify part of speech needed
• Choose correct form

**Practice:** Correct the errors in these sentences.`
  },

  "Word Choice (Precise Language)": {
    mastery: `**Precise Language** makes writing stronger:

**Weak → Precise:**
• went → strolled, raced, wandered, marched
• said → whispered, shouted, announced, muttered
• nice → kind, generous, thoughtful, pleasant
• thing → object, item (be specific!)

**Too general → Specific:**
• She went somewhere. → She rushed to the palace.
• He got something. → He received a golden crown.

**Active vs. Passive:**
• Passive: The slipper was left by Cinderella.
• Active: Cinderella left her slipper.

**Practice:** Improve this with precise language:
"The person went to the place and got the thing."`
  },

  "Vocabulary Review (All Strategies)": {
    mastery: `**All Vocabulary Strategies:**

**1. Context Clues** - use surrounding words
**2. Prefixes/Suffixes** - word parts
**3. Root Words** - base meaning
**4. Synonyms/Antonyms** - similar/opposite
**5. Multiple Meanings** - check context
**6. Compound Words** - break apart
**7. Dictionary** - look it up!

**Building vocabulary:**
• Read widely
• Notice new words
• Use new words in writing
• Make connections
• Review regularly

**Practice:** Use ALL strategies to figure out these challenging words from the story!`
  }
};

/**
 * Get lesson content based on topic and level
 */
function getLessonContent(topic, level, type) {
  const lessons = type === 'grammar' ? grammarLessons : languageLessons;
  
  if (lessons[topic]) {
    if (typeof lessons[topic] === 'string') {
      return lessons[topic];
    }
    if (lessons[topic][level.toLowerCase()]) {
      return lessons[topic][level.toLowerCase()];
    }
    // Fallback to introduction if specific level not found
    return lessons[topic].introduction || lessons[topic];
  }
  
  // Fallback template
  return `**${topic}**\n\nThis lesson teaches about ${topic}. Look for examples in today's story.\n\n**Practice:** Apply what you learned!`;
}

/**
 * Generate all lesson content for all 12 books
 */
function generateAllLessons() {
  const bookAssignments = curriculum.bookAssignments;
  
  console.log('🎯 Generating 3rd Grade Grammar & Language Content...\n');
  console.log(`📚 Total: 12 books × 12 lessons = 144 total lessons\n`);
  
  let totalGenerated = 0;
  
  for (const book of bookAssignments) {
    console.log(`\n📖 Book ${book.book}: ${book.title}`);
    console.log('─'.repeat(60));
    
    const grammarContent = [];
    const languageContent = [];
    
    // Grammar lessons (odd days)
    for (const lesson of book.grammarOddDays) {
      const content = getLessonContent(lesson.topic, lesson.level, 'grammar');
      grammarContent.push({
        day: lesson.day,
        topic: lesson.topic,
        level: lesson.level,
        content: content
      });
      console.log(`  Day ${String(lesson.day).padStart(2)}: ${lesson.topic} (${lesson.level})`);
      totalGenerated++;
    }
    
    // Language lessons (even days)
    for (const lesson of book.languageEvenDays) {
      const content = getLessonContent(lesson.topic, lesson.level, 'language');
      languageContent.push({
        day: lesson.day,
        topic: lesson.topic,
        level: lesson.level,
        content: content
      });
      console.log(`  Day ${String(lesson.day).padStart(2)}: ${lesson.topic} (${lesson.level})`);
      totalGenerated++;
    }
    
    // Write to file
    const outputData = {
      book: book.book,
      title: book.title,
      grammarLessons: grammarContent,
      languageLessons: languageContent
    };
    
    const filename = `3rd-grade-book-${String(book.book).padStart(2, '0')}-grammar-language.json`;
    fs.writeFileSync(filename, JSON.stringify(outputData, null, 2));
    console.log(`  ✅ Saved to ${filename}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ COMPLETE! Generated ${totalGenerated} lessons`);
  console.log('='.repeat(60));
}

// Run if called directly
if (require.main === module) {
  generateAllLessons();
}

module.exports = { getLessonContent, generateAllLessons };
