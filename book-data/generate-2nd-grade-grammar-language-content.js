#!/usr/bin/env node

/**
 * Generate Complete 2nd Grade Grammar & Language Content
 * Based on CCSS and spiral learning approach
 * 24 books × 6 lessons = 144 lessons total
 */

const fs = require('fs');
const path = require('path');

// CCSS-Aligned Grammar Topics (72 lessons - 3 per book × 24 books)
const grammarTopics = [
  // Quarter 1 (Books 1-6): Foundations
  { book: 1, day: 1, topic: "Nouns - Naming Words", ccss: "L.2.1" },
  { book: 1, day: 3, topic: "Verbs - Action Words", ccss: "L.2.1" },
  { book: 1, day: 5, topic: "Adjectives - Describing Words", ccss: "L.2.1.E" },
  
  { book: 2, day: 1, topic: "Proper Nouns - Names & Titles", ccss: "L.2.2.A" },
  { book: 2, day: 3, topic: "Sentence or Fragment?", ccss: "L.2.1.F" },
  { book: 2, day: 5, topic: "Capitalization - Beginning of Sentences", ccss: "L.2.2.A" },
  
  { book: 3, day: 1, topic: "Nouns Review - Common vs Proper", ccss: "L.2.1" },
  { book: 3, day: 3, topic: "Verbs Review - Past & Present", ccss: "L.2.1.D" },
  { book: 3, day: 5, topic: "Complete Sentences", ccss: "L.2.1.F" },
  
  { book: 4, day: 1, topic: "Naming & Telling Parts of Sentences", ccss: "L.2.1.F" },
  { book: 4, day: 3, topic: "Adjectives - Size & Number", ccss: "L.2.1.E" },
  { book: 4, day: 5, topic: "End Punctuation (. ? !)", ccss: "L.2.2.B" },
  
  { book: 5, day: 1, topic: "Nouns in Sentences", ccss: "L.2.1" },
  { book: 5, day: 3, topic: "Verbs - Helping Verbs (is, are)", ccss: "L.2.1.D" },
  { book: 5, day: 5, topic: "Capitalization - Proper Nouns", ccss: "L.2.2.A" },
  
  { book: 6, day: 1, topic: "Review - Nouns, Verbs, Adjectives", ccss: "L.2.1" },
  { book: 6, day: 3, topic: "Review - Sentences & Capitalization", ccss: "L.2.2.A" },
  { book: 6, day: 5, topic: "Review - End Punctuation", ccss: "L.2.2.B" },
  
  // Quarter 2 (Books 7-12): Plural Nouns & Past Tense
  { book: 7, day: 1, topic: "Plural Nouns - Add -s", ccss: "L.2.1.B" },
  { book: 7, day: 3, topic: "Plural Nouns - Add -es", ccss: "L.2.1.B" },
  { book: 7, day: 5, topic: "Irregular Plural Nouns", ccss: "L.2.1.B" },
  
  { book: 8, day: 1, topic: "Past Tense Verbs - Add -ed", ccss: "L.2.1.D" },
  { book: 8, day: 3, topic: "Irregular Past Tense Verbs", ccss: "L.2.1.D" },
  { book: 8, day: 5, topic: "Past Tense Review", ccss: "L.2.1.D" },
  
  { book: 9, day: 1, topic: "Pronouns - I, me, we, us", ccss: "L.2.1.C" },
  { book: 9, day: 3, topic: "Pronouns - he, she, it, they", ccss: "L.2.1.C" },
  { book: 9, day: 5, topic: "Using Pronouns Correctly", ccss: "L.2.1.C" },
  
  { book: 10, day: 1, topic: "Plural Nouns Review", ccss: "L.2.1.B" },
  { book: 10, day: 3, topic: "Verbs - Present & Past", ccss: "L.2.1.D" },
  { book: 10, day: 5, topic: "Pronouns Review", ccss: "L.2.1.C" },
  
  { book: 11, day: 1, topic: "Adjectives - Color, Shape, Feeling", ccss: "L.2.1.E" },
  { book: 11, day: 3, topic: "Adverbs - How & When", ccss: "L.2.1.E" },
  { book: 11, day: 5, topic: "Adjectives & Adverbs Together", ccss: "L.2.1.E" },
  
  { book: 12, day: 1, topic: "Quarter 2 Review - Plurals", ccss: "L.2.1.B" },
  { book: 12, day: 3, topic: "Quarter 2 Review - Past Tense", ccss: "L.2.1.D" },
  { book: 12, day: 5, topic: "Quarter 2 Review - Pronouns", ccss: "L.2.1.C" },
  
  // Quarter 3 (Books 13-18): Sentence Types & Punctuation
  { book: 13, day: 1, topic: "Statements (Telling Sentences)", ccss: "L.2.1.F" },
  { book: 13, day: 3, topic: "Questions (Asking Sentences)", ccss: "L.2.1.F" },
  { book: 13, day: 5, topic: "Statements & Questions Review", ccss: "L.2.1.F" },
  
  { book: 14, day: 1, topic: "Exclamations (Exciting Sentences)", ccss: "L.2.1.F" },
  { book: 14, day: 3, topic: "Commands (Telling Someone to Do)", ccss: "L.2.1.F" },
  { book: 14, day: 5, topic: "Four Sentence Types", ccss: "L.2.1.F" },
  
  { book: 15, day: 1, topic: "Commas in a Series", ccss: "L.2.2.B" },
  { book: 15, day: 3, topic: "Commas in Lists", ccss: "L.2.2.B" },
  { book: 15, day: 5, topic: "Using Commas Correctly", ccss: "L.2.2.B" },
  
  { book: 16, day: 1, topic: "Contractions with not", ccss: "L.2.2.C" },
  { book: 16, day: 3, topic: "Contractions with is, are", ccss: "L.2.2.C" },
  { book: 16, day: 5, topic: "Apostrophes in Contractions", ccss: "L.2.2.C" },
  
  { book: 17, day: 1, topic: "Possessive Nouns - Add 's", ccss: "L.2.2.C" },
  { book: 17, day: 3, topic: "Possessive Nouns - Plural", ccss: "L.2.2.C" },
  { book: 17, day: 5, topic: "Contractions vs Possessives", ccss: "L.2.2.C" },
  
  { book: 18, day: 1, topic: "Collective Nouns (team, family, class)", ccss: "L.2.1.A" },
  { book: 18, day: 3, topic: "Using Collective Nouns", ccss: "L.2.1.A" },
  { book: 18, day: 5, topic: "Quarter 3 Review", ccss: "L.2.1" },
  
  // Quarter 4 (Books 19-24): Sentence Combining & Advanced
  { book: 19, day: 1, topic: "Simple Sentences", ccss: "L.2.1.F" },
  { book: 19, day: 3, topic: "Joining Sentences with 'and'", ccss: "L.2.1.F" },
  { book: 19, day: 5, topic: "Compound Sentences with 'and'", ccss: "L.2.1.F" },
  
  { book: 20, day: 1, topic: "Joining Sentences with 'but'", ccss: "L.2.1.F" },
  { book: 20, day: 3, topic: "Joining Sentences with 'or'", ccss: "L.2.1.F" },
  { book: 20, day: 5, topic: "Compound Sentences Review", ccss: "L.2.1.F" },
  
  { book: 21, day: 1, topic: "Adjectives & Adverbs Review", ccss: "L.2.1.E" },
  { book: 21, day: 3, topic: "Comparing with -er & -est", ccss: "L.2.1.E" },
  { book: 21, day: 5, topic: "Using Describing Words", ccss: "L.2.1.E" },
  
  { book: 22, day: 1, topic: "Reflexive Pronouns (myself, yourself)", ccss: "L.2.1.C" },
  { book: 22, day: 3, topic: "Using Reflexive Pronouns", ccss: "L.2.1.C" },
  { book: 22, day: 5, topic: "All Pronouns Review", ccss: "L.2.1.C" },
  
  { book: 23, day: 1, topic: "Capitalization - Days & Months", ccss: "L.2.2.A" },
  { book: 23, day: 3, topic: "Capitalization - Holidays & Titles", ccss: "L.2.2.A" },
  { book: 23, day: 5, topic: "Capitalization Review", ccss: "L.2.2.A" },
  
  { book: 24, day: 1, topic: "Commas in Greetings", ccss: "L.2.2.B" },
  { book: 24, day: 3, topic: "Commas in Closings", ccss: "L.2.2.B" },
  { book: 24, day: 5, topic: "Year-End Grammar Review", ccss: "L.2.1" }
];

// CCSS-Aligned Language Topics (72 lessons - 3 per book × 24 books)
const languageTopics = [
  // Quarter 1 (Books 1-6): Foundations
  { book: 1, day: 2, topic: "ABC Order - First Letter", ccss: "L.2.2.E" },
  { book: 1, day: 4, topic: "Rhyming Words", ccss: "L.2.4" },
  { book: 1, day: 6, topic: "Opposites (Antonyms)", ccss: "L.2.5.B" },
  
  { book: 2, day: 2, topic: "Word Families (-at, -an, -ap)", ccss: "RF.2.3" },
  { book: 2, day: 4, topic: "Syllables - Clapping Words", ccss: "RF.2.3.C" },
  { book: 2, day: 6, topic: "Compound Words (snowman, cupcake)", ccss: "L.2.4.D" },
  
  { book: 3, day: 2, topic: "ABC Order - Practice", ccss: "L.2.2.E" },
  { book: 3, day: 4, topic: "Rhyming Patterns", ccss: "L.2.4" },
  { book: 3, day: 6, topic: "Same & Different (Compare)", ccss: "L.2.5" },
  
  { book: 4, day: 2, topic: "Beginning Sounds", ccss: "RF.2.3.A" },
  { book: 4, day: 4, topic: "Ending Sounds", ccss: "RF.2.3.A" },
  { book: 4, day: 6, topic: "Middle Sounds", ccss: "RF.2.3.A" },
  
  { book: 5, day: 2, topic: "Short Vowels Review", ccss: "RF.2.3.A" },
  { book: 5, day: 4, topic: "Long Vowels Introduction", ccss: "RF.2.3.B" },
  { book: 5, day: 6, topic: "Compound Words Review", ccss: "L.2.4.D" },
  
  { book: 6, day: 2, topic: "Quarter 1 Review - ABC Order", ccss: "L.2.2.E" },
  { book: 6, day: 4, topic: "Quarter 1 Review - Rhyming", ccss: "L.2.4" },
  { book: 6, day: 6, topic: "Quarter 1 Review - Word Families", ccss: "RF.2.3" },
  
  // Quarter 2 (Books 7-12): Context & Word Parts
  { book: 7, day: 2, topic: "Context Clues - Pictures", ccss: "L.2.4.A" },
  { book: 7, day: 4, topic: "Context Clues - Sentences", ccss: "L.2.4.A" },
  { book: 7, day: 6, topic: "Using Context Clues", ccss: "L.2.4.A" },
  
  { book: 8, day: 2, topic: "Prefix: un- (not)", ccss: "L.2.4.B" },
  { book: 8, day: 4, topic: "Prefix: re- (again)", ccss: "L.2.4.B" },
  { book: 8, day: 6, topic: "Using Prefixes un- & re-", ccss: "L.2.4.B" },
  
  { book: 9, day: 2, topic: "Suffix: -ful (full of)", ccss: "L.2.4.B" },
  { book: 9, day: 4, topic: "Suffix: -less (without)", ccss: "L.2.4.B" },
  { book: 9, day: 6, topic: "Using Suffixes -ful & -less", ccss: "L.2.4.B" },
  
  { book: 10, day: 2, topic: "Multiple Meaning Words", ccss: "L.2.4" },
  { book: 10, day: 4, topic: "Words with Two Meanings", ccss: "L.2.4" },
  { book: 10, day: 6, topic: "Using Multiple Meanings", ccss: "L.2.4" },
  
  { book: 11, day: 2, topic: "Homophones (to, two, too)", ccss: "L.2.4" },
  { book: 11, day: 4, topic: "Homophones (there, their)", ccss: "L.2.4" },
  { book: 11, day: 6, topic: "Using Homophones Correctly", ccss: "L.2.4" },
  
  { book: 12, day: 2, topic: "Quarter 2 Review - Context Clues", ccss: "L.2.4.A" },
  { book: 12, day: 4, topic: "Quarter 2 Review - Prefixes & Suffixes", ccss: "L.2.4.B" },
  { book: 12, day: 6, topic: "Quarter 2 Review - Multiple Meanings", ccss: "L.2.4" },
  
  // Quarter 3 (Books 13-18): Word Relationships
  { book: 13, day: 2, topic: "Synonyms - Same Meaning", ccss: "L.2.5.B" },
  { book: 13, day: 4, topic: "Synonyms Practice", ccss: "L.2.5.B" },
  { book: 13, day: 6, topic: "Using Synonyms", ccss: "L.2.5.B" },
  
  { book: 14, day: 2, topic: "Antonyms - Opposite Meaning", ccss: "L.2.5.B" },
  { book: 14, day: 4, topic: "Antonyms Practice", ccss: "L.2.5.B" },
  { book: 14, day: 6, topic: "Synonyms & Antonyms Together", ccss: "L.2.5.B" },
  
  { book: 15, day: 2, topic: "Categories & Sorting Words", ccss: "L.2.5.A" },
  { book: 15, day: 4, topic: "Word Categories (animals, food, etc.)", ccss: "L.2.5.A" },
  { book: 15, day: 6, topic: "Creating Categories", ccss: "L.2.5.A" },
  
  { book: 16, day: 2, topic: "Shades of Meaning - Size (big, huge, enormous)", ccss: "L.2.5.B" },
  { book: 16, day: 4, topic: "Shades of Meaning - Feelings (happy, joyful, ecstatic)", ccss: "L.2.5.B" },
  { book: 16, day: 6, topic: "Shades of Meaning - Actions (walk, run, sprint)", ccss: "L.2.5.B" },
  
  { book: 17, day: 2, topic: "Root Words (base words)", ccss: "L.2.4.C" },
  { book: 17, day: 4, topic: "Finding Root Words", ccss: "L.2.4.C" },
  { book: 17, day: 6, topic: "Root Words with Endings", ccss: "L.2.4.C" },
  
  { book: 18, day: 2, topic: "ABC Order - Second Letter", ccss: "L.2.2.E" },
  { book: 18, day: 4, topic: "ABC Order - Second & Third Letters", ccss: "L.2.2.E" },
  { book: 18, day: 6, topic: "Quarter 3 Review", ccss: "L.2.5" },
  
  // Quarter 4 (Books 19-24): Advanced & Application
  { book: 19, day: 2, topic: "Compound Words Review", ccss: "L.2.4.D" },
  { book: 19, day: 4, topic: "Making Compound Words", ccss: "L.2.4.D" },
  { book: 19, day: 6, topic: "Breaking Apart Compound Words", ccss: "L.2.4.D" },
  
  { book: 20, day: 2, topic: "Prefix: pre- (before)", ccss: "L.2.4.B" },
  { book: 20, day: 4, topic: "Prefix: mis- (wrong)", ccss: "L.2.4.B" },
  { book: 20, day: 6, topic: "Prefix: dis- (not, opposite)", ccss: "L.2.4.B" },
  
  { book: 21, day: 2, topic: "Suffix: -er (more)", ccss: "L.2.4.B" },
  { book: 21, day: 4, topic: "Suffix: -est (most)", ccss: "L.2.4.B" },
  { book: 21, day: 6, topic: "Suffix: -ly (how)", ccss: "L.2.4.B" },
  
  { book: 22, day: 2, topic: "Real-Life Connections", ccss: "L.2.5.A" },
  { book: 22, day: 4, topic: "Using Words in Context", ccss: "L.2.4" },
  { book: 22, day: 6, topic: "Word Choice Matters", ccss: "L.2.3" },
  
  { book: 23, day: 2, topic: "Formal vs Informal Language", ccss: "L.2.3.A" },
  { book: 23, day: 4, topic: "When to Use Formal Language", ccss: "L.2.3.A" },
  { book: 23, day: 6, topic: "When to Use Informal Language", ccss: "L.2.3.A" },
  
  { book: 24, day: 2, topic: "Dictionary Skills - Finding Words", ccss: "L.2.2.E" },
  { book: 24, day: 4, topic: "Dictionary Skills - Using Guide Words", ccss: "L.2.2.E" },
  { book: 24, day: 6, topic: "Year-End Language Review", ccss: "L.2.4" }
];

console.log('✅ 2nd Grade Grammar & Language Spiral Curriculum Created!');
console.log(`\n📊 Total Lessons:`);
console.log(`   - Grammar: ${grammarTopics.length} lessons`);
console.log(`   - Language: ${languageTopics.length} lessons`);
console.log(`   - Total: ${grammarTopics.length + languageTopics.length} lessons`);
console.log(`\n📚 Coverage:`);
console.log(`   - 24 books × 6 lessons = 144 lessons`);
console.log(`   - Spiral learning: concepts revisited with increasing complexity`);
console.log(`   - CCSS-aligned throughout`);
console.log(`\n🎯 Ready to integrate into unit cards!`);

// Export for use in other scripts
module.exports = { grammarTopics, languageTopics };
