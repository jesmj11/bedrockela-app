const fs = require('fs');

const unitCard = JSON.parse(fs.readFileSync('book-data/frankenstein-complete-unit-card.json', 'utf8'));

// Grammar lessons (6 for 15-day unit)
const grammarLessons = {
  1: {
    topic: "Compound-Complex Sentences in Gothic Literature",
    explanation: "Gothic writers use long, complex sentences to build atmosphere and suspense. Shelley combines multiple independent and dependent clauses to mirror the complexity of moral questions.",
    example: "Although Victor feared what he had created, he could not destroy it, and the creature fled into the darkness.",
    prompt: "Write four compound-complex sentences about today's chapter, combining multiple ideas with subordinating and coordinating conjunctions."
  },
  3: {
    topic: "Subjunctive Mood for Hypothetical Situations",
    explanation: "The subjunctive mood expresses wishes, hypotheticals, and contrary-to-fact situations—perfect for Frankenstein's 'what if' premise. 'If Victor were wiser, he would have considered the consequences.'",
    example: "If I were in Victor's position, I would have destroyed my research.",
    prompt: "Write six sentences using subjunctive mood to explore different choices characters could have made. What if Victor had acted differently?"
  },
  6: {
    topic: "Parallel Structure in Philosophical Arguments",
    explanation: "Shelley uses parallel structure to emphasize moral parallels and contrasts: 'Victor creates life, abandons responsibility, and suffers consequences.'",
    example: "The creature seeks love, desires companionship, and demands justice (parallel verbs + objects).",
    prompt: "Write five sentences using parallel structure to compare Victor and the creature, or to list the consequences of Victor's actions."
  },
  8: {
    topic: "Rhetorical Questions for Dramatic Effect",
    explanation: "Both Victor and the creature use rhetorical questions to express anguish and challenge assumptions. 'Why did you form a monster so hideous that even YOU turned from me in disgust?'",
    example: "Who is the real monster—the creature or its creator?",
    prompt: "Write four rhetorical questions that capture the moral dilemmas in today's chapter. Make readers think about responsibility, creation, and humanity."
  },
  11: {
    topic: "Appositives for Emotional Weight",
    explanation: "Shelley uses appositives to add emotional layers: 'Victor Frankenstein, a man consumed by ambition, destroyed his own life through his creation.'",
    example: "The creature, a being seeking only love and acceptance, was rejected by all who saw him.",
    prompt: "Write five sentences using appositives to add emotional depth to descriptions of Victor, the creature, or other characters."
  },
  13: {
    topic: "Active vs. Passive Voice in Assigning Responsibility",
    explanation: "Voice choice affects who we blame. Active: 'Victor created the monster.' Passive: 'The monster was created.' Shelley carefully chooses voice to raise questions about responsibility.",
    example: "Active emphasizes actor: 'The creature killed William.' Passive emphasizes victim: 'William was killed.'",
    prompt: "Find three key events from the story. Write each in both active and passive voice. Explain how voice change affects our understanding of who's responsible."
  }
};

// Language lessons (7 for 15-day unit)
const languageLessons = {
  2: {
    topic: "Context Clues in 19th Century Literature",
    explanation: "Shelley uses elevated, formal language with many Latin-derived words. Context helps decode unfamiliar vocabulary.",
    example: "From context: 'countenance' clearly means 'face' based on descriptions of features and expressions.",
    prompt: "Find five unfamiliar words in today's chapter. Use context clues to predict meanings before checking a dictionary. Explain what clues helped you."
  },
  4: {
    topic: "Latin and Greek Roots in Scientific Language",
    explanation: "Frankenstein uses scientific terminology based on Latin/Greek. 'Animate' (anima=soul/life), 'galvanism' (named for Galvani), 'physiology' (physis=nature, logos=study).",
    example: "'Inanimate' = in (not) + animate (alive) = not alive",
    prompt: "Find eight words with Latin or Greek roots in the scientific passages. Break down each word's parts and explain how they create meaning."
  },
  7: {
    topic: "Connotation vs. Denotation in Describing the Creature",
    explanation: "Words for the creature carry emotional weight. 'Monster' connotes evil; 'creature' sounds more neutral; 'daemon' suggests demonic evil. Denotation might be same, but connotation shapes our judgment.",
    example: "'Wretch' denotes a miserable person but connotes deserved suffering and low worth.",
    prompt: "List ten words used to describe the creature. For each, explain both denotation and connotation. How do word choices influence our sympathy?"
  },
  9: {
    topic: "Romantic Era Language and Nature Imagery",
    explanation: "Shelley was part of the Romantic movement, which emphasized nature, emotion, and individual experience. Her language uses nature metaphors and sublime imagery.",
    example: "Nature as refuge: 'sublime Alps,' 'serene sky,' 'gentle rain'—nature offers peace while human society brings pain.",
    prompt: "Find five nature descriptions in today's reading. Explain what each symbolizes and how it relates to the emotional state of characters."
  },
  12: {
    topic: "Figurative Language: Metaphors of Creation and Destruction",
    explanation: "Shelley uses metaphors comparing Victor's creation to childbirth, god-like creation, and unholy resurrection—each with different implications.",
    example: "Victor as 'creator' mirrors God. The creature as 'Adam' (innocent creation) or 'Satan' (fallen rebel).",
    prompt: "Find four metaphors or similes related to creation, life, or death. Explain what comparison is being made and what it reveals about the theme."
  },
  14: {
    topic: "Precise Diction: Word Choice for Moral Complexity",
    explanation: "Shelley chooses words carefully to avoid simple moral judgments. The creature 'demands' vs. 'begs,' Victor 'abandons' vs. 'flees,' the creature 'murders' vs. 'avenges.'",
    example: "Consider: 'The creature destroyed' vs. 'The creature retaliated' vs. 'The creature took revenge'—each word frames morality differently.",
    prompt: "Choose five key actions from the story. For each, write three versions using different verbs that change the moral judgment of the action."
  }
};

// Informational texts (15 topics about Frankenstein, Romantic era, science, ethics)
const informationalTexts = {
  1: {
    title: "Mary Shelley: Writing Frankenstein at Age 18",
    text: `Mary Shelley created one of literature's most enduring works when she was just 18 years old, during a summer vacation in Switzerland in 1816. She was traveling with her lover Percy Shelley (they married later), her stepsister Claire, and the famous poet Lord Byron.

The summer was unusually dark and stormy—volcanic ash from the 1815 eruption of Mount Tambora had created "the year without a summer." Trapped indoors at Byron's villa by constant rain, the group entertained themselves by reading German ghost stories.

Byron proposed a challenge: each person would write a ghost story. The men produced forgettable fragments. Mary Shelley created Frankenstein.

The idea came to her in a waking dream after a conversation about galvanism (using electricity to stimulate dead tissue) and whether life could be created artificially. She imagined a scientist kneeling beside the "hideous phantasm" he had assembled, horrified as it opened its eyes.

Mary had experienced profound trauma by age 18. Her mother (pioneering feminist Mary Wollstonecraft) died eleven days after giving birth to her. Mary's own first baby died at two weeks old. Two more of her children would die young. This intimate knowledge of death and creation infuses Frankenstein.

The novel explores questions that haunted Mary personally: What responsibilities come with creating life? What happens when creators abandon their creations? What makes something human?

Published anonymously in 1818 (many assumed Percy wrote it), Frankenstein became the first science fiction novel and remains endlessly relevant.`,
    questions: [
      { question: "What personal experiences influenced Mary Shelley's creation of Frankenstein?", answer: "" },
      { question: "How did the 'year without a summer' contribute to the novel's creation?", answer: "" },
      { question: "Why is Frankenstein considered the first science fiction novel?", answer: "" }
    ]
  },
  2: {
    title: "The Romantic Movement: Emotion, Nature, and Individual Experience",
    text: `Frankenstein is a Romantic novel, part of a cultural movement that revolutionized literature, art, music, and philosophy in the late 1700s and early 1800s. Romanticism rejected the Enlightenment's emphasis on pure reason and instead celebrated:

**Emotion and Intuition**: Feelings were seen as valid sources of truth, not obstacles to it. The creature's emotional pain is as important as Victor's scientific knowledge.

**Nature as Sublime and Healing**: Romantics saw nature as spiritually powerful, beautiful, and terrifying (sublime). Both Victor and the creature seek refuge in mountains and forests when society fails them.

**Individual Experience**: Personal perspective and individual rights mattered more than social conformity. The creature's suffering matters even though society rejects him.

**Criticism of Industrialization**: As factories transformed England, Romantics worried about dehumanization and loss of natural connection. Victor's laboratory represents dangerous disconnection from nature.

**The Gothic Tradition**: Romantic literature included gothic elements: isolated settings, supernatural events, psychological horror, moral ambiguity. Frankenstein combines all these.

Key Romantic writers included William Wordsworth and Samuel Coleridge (poets who praised nature), Lord Byron (who appears in Frankenstein's origin story), and Percy Shelley (Mary's husband, also a major poet).

Frankenstein is perfectly Romantic: it questions scientific progress, explores intense emotions, celebrates nature, critiques society's treatment of outsiders, and focuses on individual moral responsibility. Yet it also complicates Romantic ideals—nature can't fully heal these characters, and emotion without wisdom leads to tragedy.`,
    questions: [
      { question: "What were three main characteristics of the Romantic movement?", answer: "" },
      { question: "How does nature function in Frankenstein as a Romantic element?", answer: "" },
      { question: "How does Frankenstein both embrace and complicate Romantic ideals?", answer: "" }
    ]
  },
  3: {
    title: "The Science of Life: Galvanism and Electricity in the 1800s",
    text: `In Mary Shelley's time, scientists were discovering electricity's power over life and death. These discoveries directly inspired Frankenstein's creation scene.

**Luigi Galvani's Experiments (1780s)**: Italian scientist Luigi Galvani discovered that electrical current could make dead frogs' legs twitch. He theorized that electricity was the life force itself. "Galvanism" became synonymous with using electricity to animate dead tissue.

**Giovanni Aldini's Public Demonstrations (1803)**: Galvani's nephew performed horrifying public experiments on executed criminals' corpses. When electrical current was applied to a hanged murderer's body in London, "the jaws began to quiver, the adjoining muscles were horribly contorted, and one eye actually opened." Witnesses thought he might come back to life.

**The Vitalism Debate**: Scientists argued whether life required a special "vital force" or was purely mechanical/chemical. Could chemistry and electricity alone create life, or was something mystical required?

**Real Scientific Limitations**: Despite sensational demonstrations, scientists couldn't actually revive the dead or create life. But they were discovering that electricity controlled muscles and nerves—suggesting life was partly electrical.

Shelley's genius was recognizing that even if science could create life, moral questions remained: Should we? What responsibility comes with creation? What if the created being suffers?

She set her novel in the near future (1790s) when galvanism was new and seemed to promise god-like powers. Victor Frankenstein represents the scientist who achieves the impossible but never considers whether he should.`,
    questions: [
      { question: "What was galvanism, and why did it seem to suggest life could be created?", answer: "" },
      { question: "How did Aldini's experiments influence Frankenstein's creation scene?", answer: "" },
      { question: "What question does Shelley argue is more important than 'Can we create life?'", answer: "" }
    ]
  },
  4: {
    title: "The Ethics of Scientific Creation: Playing God",
    text: `Victor Frankenstein's central sin isn't creating life—it's creating life irresponsibly and then abandoning it. Shelley raises questions about scientific ethics that remain urgent today.

**The Promethean Theme**: The novel's subtitle is "The Modern Prometheus." In Greek myth, Prometheus stole fire from the gods to help humanity and was eternally punished. Victor steals the secret of life—but unlike Prometheus, he doesn't use it to help anyone. His motivation is purely ego: "A new species would bless me as its creator."

**Responsibility to Creations**: Victor's greatest crime isn't creating the creature—it's abandoning it. He doesn't teach it, protect it, or accept responsibility. The creature's murderous revenge stems from this abandonment. Parents who neglect children create damaged people. Creators bear responsibility.

**Unintended Consequences**: Victor never imagines his creation might suffer, might be rejected, might develop emotions and needs. He sees his goal but ignores potential outcomes. Modern examples: nuclear weapons, genetic engineering, artificial intelligence—powerful technologies with unforeseen consequences.

**Science Without Ethics**: Victor pursues knowledge without asking ethical questions. Should I? What happens after? Who might be harmed? Pure ambition without moral consideration leads to tragedy.

**The Question of Humanity**: Is the creature human? Does it deserve rights? It thinks, feels, reasons, and suffers—but society rejects it based on appearance. Shelley forces readers to define humanity and question prejudice.

These questions apply to modern science: cloning, genetic modification, AI, synthetic life. Who decides what research is ethical? What responsibilities come with creating new life or intelligence?`,
    questions: [
      { question: "Why is Frankenstein called 'The Modern Prometheus'?", answer: "" },
      { question: "What does Shelley argue is Victor's greatest sin?", answer: "" },
      { question: "How do Frankenstein's ethical questions apply to modern science and technology?", answer: "" }
    ]
  },
  5: {
    title: "Isolation and the Need for Connection",
    text: `Both Victor and the creature suffer from isolation—self-imposed for Victor, forced upon the creature. Shelley explores how isolation destroys mental health and moral judgment.

**Victor's Self-Isolation**: Victor locks himself away for years to pursue his creation, cutting off family and friends. This isolation enables his obsessive, unhealthy project. No one questions his ethics or urges caution. When we isolate, we lose perspective and moral guardrails.

**The Creature's Forced Isolation**: The creature desperately seeks human connection but is violently rejected because of appearance. Each rejection increases his pain and rage. Shelley argues that society creates monsters by refusing compassion and connection.

**The Psychology of Loneliness**: Modern psychology confirms Shelley's insights. Prolonged isolation causes:
- Depression and anxiety
- Distorted thinking and paranoia
- Loss of empathy
- Increased aggression
- Physical health problems

**The Power of Companionship**: The creature explicitly tells Victor: "I am malicious because I am miserable. Make me happy, and I shall again be virtuous." He doesn't excuse his murders, but he explains them: rejection and loneliness drove him to revenge. When he finds companionship (with the De Lacey family, even briefly), he becomes gentle and helpful.

**Connection as Salvation**: The creature's plea for a companion shows that connection is a fundamental human need. His request is reasonable: "I demand a creature of another sex... This you alone can do." When Victor destroys the female creature, he guarantees continued violence.

Shelley's message: Isolation—whether chosen or imposed—breeds misery and moral collapse. Connection, compassion, and community keep us human.`,
    questions: [
      { question: "How does Victor's self-imposed isolation enable his dangerous project?", answer: "" },
      { question: "What does the creature's experience teach about the effects of forced isolation?", answer: "" },
      { question: "How does modern psychology support Shelley's insights about isolation?", answer: "" }
    ]
  },
  6: {
    title: "Nature vs. Nurture: Are We Born or Made?",
    text: `The creature's development directly addresses the nature vs. nurture debate: Are personalities inborn or shaped by environment and treatment?

**The Creature Born Innocent**: Initially, the creature is innocent, curious, gentle—learning about the world like a child. He helps the De Lacey family secretly, saves a drowning girl, seeks friendship. His nature isn't evil.

**Society's Cruel Nurture**: Every human he encounters attacks, rejects, or flees from him. The blind De Lacey accepts him until his family sees the creature and beats him. The girl's father shoots him after he saves her. Society teaches him that kindness brings violence.

**Learned Evil**: The creature's murders stem from learned responses to cruelty. He tells Victor: "I was benevolent and good; misery made me a fiend." His violence is learned behavior—a response to trauma and rejection.

**The Tragedy of Lost Potential**: The creature is intelligent, articulate, capable of deep emotion and moral reasoning. Given love and acceptance, he could have been admirable. Environment destroyed his potential.

**Modern Parallels**: Studies of children raised in isolation or abuse show similar patterns—early trauma shapes behavior profoundly. Yet the debate continues: Are violent criminals born with brain differences, or does environment create them? Most scientists now say "both"—biology provides tendencies, but environment determines whether they manifest.

**Moral Responsibility**: Does understanding the creature's suffering excuse his murders? Shelley says no—the creature himself admits he's wrong. But understanding helps prevent future tragedies. Society shares responsibility for creating the conditions that shaped him.`,
    questions: [
      { question: "What evidence suggests the creature was born innocent rather than evil?", answer: "" },
      { question: "How does society's treatment transform the creature's character?", answer: "" },
      { question: "Does understanding the creature's suffering excuse his crimes? Why or why not?", answer: "" }
    ]
  },
  7: {
    title: "The Double: Victor and the Creature as Mirror Images",
    text: `Shelley structures the novel to show that Victor and the creature are doubles—mirror images who share characteristics while appearing opposite.

**Parallel Isolation**: Both are profoundly alone. Victor isolates himself by choice (his obsessive secrecy); the creature by society's rejection. Both suffer mentally and physically from loneliness.

**Parallel Obsessions**: Victor obsesses over creating life; the creature obsesses over revenge. Both sacrifices everything (family, happiness, health) for their singular goal.

**Mutual Destruction**: They become locked in a cycle where each destroys what the other loves. The creature kills Victor's family; Victor destroys the creature's hope for companionship. Neither can escape the other.

**Creator and Created Reversed**: Victor gives the creature life but then becomes haunted and controlled by his creation. Who controls whom? The creature dictates Victor's actions through threats. The created becomes the creator's master.

**Shared Guilt**: Both commit unforgivable acts. Victor's abandonment enables murders; the creature commits them. Victor destroys the female creature, guaranteeing more deaths. Both bear responsibility for the tragedy.

**The Frame Story**: The novel's structure emphasizes doubling. Victor tells his story to Captain Walton, who sees himself in Victor—another ambitious man pursuing dangerous knowledge in isolation. The pattern repeats across generations.

**Gothic Doubling**: The "doppelgänger" (double) was a common gothic device representing the dark side of human nature. Frankenstein literalizes this: the creature IS Victor's dark side made flesh—his ambition, obsession, and capacity for cruelty externalized.

Understanding them as doubles reveals Shelley's point: the line between creator and monster is thin. We all contain both.`,
    questions: [
      { question: "In what ways are Victor and the creature mirror images of each other?", answer: "" },
      { question: "How does the creator-created relationship reverse over the course of the novel?", answer: "" },
      { question: "What does the doubling reveal about human nature?", answer: "" }
    ]
  },
  8: {
    title: "Women in Frankenstein: Passive Victims or Moral Centers?",
    text: `Frankenstein contains relatively few female characters, and most die violently. Feminist critics debate whether this reflects Shelley's critique of patriarchy or reinforces it.

**The Passive Female Characters**: Elizabeth, Justine, and Caroline Beaufort are gentle, selfless, nurturing—traditional "feminine" virtues. They care for others and accept suffering without rebellion. All die because of men's actions (Victor's creation, the creature's revenge, William's murder).

**Critique or Reinforcement?**: Some argue Shelley critiques a society where women have no power and become collateral damage in men's conflicts. Others say she reinforces stereotypes by making women purely victims without agency.

**The Destroyed Female Creature**: Victor's destruction of the female creature is particularly significant. He imagines she might have her own will, might refuse to comply, might be more "malignant" than the male. His real fear: an autonomous female who can't be controlled. He destroys her to prevent female independence.

**Caroline's Death**: Victor's mother dies from scarlet fever caught while nursing Elizabeth. Her final words are about arranging Elizabeth's marriage to Victor—she exists to serve others, even in death.

**Elizabeth's Agency**: Elizabeth shows some independence—she defends Justine, expresses her own thoughts—but the narrative marginalizes her. Victor makes all major decisions without consulting her.

**Mary Shelley's Position**: As a woman writer in 1818, Shelley had limited power herself. Her mother (Mary Wollstonecraft) wrote "A Vindication of the Rights of Woman." Mary lived with Percy before marriage (scandalous), wrote this novel, and pursued intellectual life—all rebellious for the time.

The novel can be read as Shelley's horror at how patriarchal society treats women as objects to be created (the female creature), used (Elizabeth as reward/wife), or sacrificed (Justine executed, Caroline dying in service).`,
    questions: [
      { question: "Why does Victor destroy the female creature before she's even alive?", answer: "" },
      { question: "How do female characters function in the novel's plot?", answer: "" },
      { question: "Can Frankenstein be read as a feminist critique? Why or why not?", answer: "" }
    ]
  },
  9: {
    title: "The Arctic Setting: Symbolism and Exploration",
    text: `Frankenstein begins and ends in the Arctic—not coincidental geography but deliberate symbolism and reference to actual exploration.

**The Frame Narrative**: Captain Walton is leading an Arctic expedition seeking the North Pole and a potential passage through the ice. His letters frame Victor's story, creating parallel ambitious quests for knowledge in dangerous, isolated places.

**Arctic Exploration in 1816**: When Shelley wrote Frankenstein, Arctic exploration was a hot topic. British expeditions sought the Northwest Passage (sea route through Arctic connecting Atlantic and Pacific). Explorers faced ice, cold, starvation, and isolation. Some expeditions vanished completely.

**Symbolism of the Arctic**:
- **Blank Slate**: Unexplored, unmapped—like Victor's unexplored science
- **Extreme Isolation**: The ultimate lonely place—reflecting the emotional isolation of Victor and creature
- **Beautiful but Deadly**: Sublime and terrifying—like Victor's creation
- **No Return**: Once trapped in ice, you can't escape—like Victor trapped by his creation
- **Pursuit to the End**: Victor chases the creature across the ice until death—obsession taken to the literal end of the earth

**The Creature's Final Scene**: The creature's last appearance, standing over Victor's corpse in the Arctic, shows him in his element—isolated, in a harsh landscape that mirrors his inner state. His declaration that he'll build a funeral pyre and die suggests the Arctic as a place of endings.

**Walton's Choice**: Unlike Victor, Walton turns back when his crew demands it. He chooses life and responsibility over glory. This is Shelley's point: knowing when to stop, when ambition becomes destructive, when to listen to others' warnings.

The Arctic isn't just setting—it's a mirror for the soul-destroying isolation and dangerous ambition at the story's heart.`,
    questions: [
      { question: "Why does Shelley frame the entire story in the Arctic?", answer: "" },
      { question: "What does the Arctic symbolize in relation to Victor and the creature?", answer: "" },
      { question: "How does Walton's decision to turn back contrast with Victor's choices?", answer: "" }
    ]
  },
  10: {
    title: "The Monster's Education: Paradise Lost and Social Learning",
    text: `The creature's self-education reveals Shelley's ideas about how we become who we are—through observation, reading, and social interaction (or lack thereof).

**Learning by Observation**: The creature watches the De Lacey family for months, learning language, social behavior, family love, and human emotions. He learns virtue by watching virtuous people—proving nurture shapes us.

**Three Books**: The creature finds three books that form his intellectual foundation:

**1. Paradise Lost** by John Milton: The creature identifies with both Adam (God's creation) and Satan (the rebel cast out). He asks Victor: "I ought to be thy Adam, but I am rather the fallen angel." This shapes his self-understanding as both innocent creation and rejected outcast.

**2. Plutarch's Lives**: Biographies of noble Greeks and Romans. The creature learns about human greatness, virtue, politics, and history. These give him moral ideals and social understanding.

**3. The Sorrows of Young Werther** by Goethe: A romantic novel about intense emotion, unrequited love, and suicide. The creature learns about romantic feeling and the dangers of isolation.

**Victor's Papers**: The creature finds Victor's journals describing his creation with disgust. Reading his creator's horror at him shapes the creature's self-hatred and rage.

**The Tragedy of Education**: The creature's education makes his suffering worse. If he remained ignorant, rejection wouldn't hurt so deeply. Knowledge increases his pain: "Of what a strange nature is knowledge! It clings to the mind when it has once seized on it like a lichen on the rock."

**Shelley's Point**: Education and culture make us human, but without love and acceptance, knowledge brings only pain. The creature is intellectually and emotionally sophisticated—which makes his isolation unbearable.`,
    questions: [
      { question: "How does the creature educate himself, and what does this prove about nature vs. nurture?", answer: "" },
      { question: "Why does the creature identify with both Adam and Satan from Paradise Lost?", answer: "" },
      { question: "How does the creature's education increase rather than decrease his suffering?", answer: "" }
    ]
  },
  11: {
    title: "Gothic Horror: Fear, Suspense, and the Uncanny",
    text: `Frankenstein is a foundational text of Gothic horror—a genre that explores psychological terror, moral ambiguity, and the uncanny (familiar things made strange and frightening).

**Gothic Elements in Frankenstein**:
- **Isolated Settings**: Mountains, forests, the Arctic—remote places where characters face their demons alone
- **The Sublime**: Nature so beautiful and powerful it inspires terror
- **The Uncanny**: The creature is almost human but not quite—familiar enough to relate to but different enough to horrify
- **Forbidden Knowledge**: Victor's research into secrets that should remain hidden
- **Moral Ambiguity**: No clear hero or villain—both Victor and creature are sympathetic and monstrous
- **Psychological Horror**: The real terror is guilt, responsibility, and facing what we've created
- **The Past Haunting the Present**: Victor cannot escape his creation—it follows him everywhere
- **Atmosphere of Dread**: Constant sense of approaching doom

**The Uncanny**: Freud defined "the uncanny" as the familiar made strange—like a corpse that moves or a doll that seems alive. The creature is uncanny: assembled from human parts, intelligent and articulate, yet horrifying. He's close enough to human to trigger empathy but different enough to trigger revulsion.

**Psychological vs. Physical Horror**: Gothic horror emphasizes mental anguish over gore. Victor's real torture is guilt and fear, not physical danger. The creature's real pain is rejection and loneliness, not physical suffering.

**Influence on Horror**: Frankenstein established patterns for horror literature and film:
- Mad scientist character
- Creation that turns against creator
- Sympathy for the monster
- Science gone wrong
- Moral complexity

Modern horror from Dracula to Alien to AI-gone-rogue stories all owe debt to Frankenstein's Gothic template.`,
    questions: [
      { question: "What is 'the uncanny,' and how does the creature embody this concept?", answer: "" },
      { question: "Why is psychological horror more effective than physical horror in Frankenstein?", answer: "" },
      { question: "How did Frankenstein influence later horror literature and film?", answer: "" }
    ]
  },
  12: {
    title: "Revenge and Justice: The Cycle of Violence",
    text: `Frankenstein explores how revenge perpetuates violence in an unbreakable cycle—each act of vengeance justifying the next until both parties are destroyed.

**The Creature's Motivation**: The creature doesn't kill for pleasure or evil nature—he kills to hurt Victor as he's been hurt. "I am malicious because I am miserable." Each murder is revenge: William (Victor's family), Clerval (Victor's friend), Elizabeth (Victor's bride). He takes what Victor denied him.

**Victor's Response**: Victor could have stopped the cycle by creating a companion, but instead he destroys her—perpetuating the creature's suffering and guaranteeing more murders. His revenge is denying the creature's plea.

**The Escalation**: Each act escalates:
1. Creature's initial murders → Victor's refusal to create companion
2. Elizabeth's murder → Victor's pursuit of creature
3. Mutual pursuit to death in Arctic

**Justice vs. Revenge**:
- **Justice** seeks to right wrongs through fair process and proportional punishment
- **Revenge** seeks to inflict pain matching the pain suffered, regardless of process or proportion

The creature calls for justice: "You created me, you abandoned me, you owe me." But his methods are revenge: murder of innocents. Victor seeks revenge, not justice—he wants the creature dead, not reformed or held accountable.

**The Tragedy**: Both have legitimate grievances. Victor shouldn't have created and abandoned the creature. The creature shouldn't have murdered innocents. But instead of seeking resolution, they destroy each other.

**Breaking the Cycle**: The only way to stop revenge cycles is for someone to refuse retaliation. Neither Victor nor the creature can do this—pride, anger, and pain prevent mercy.

**Modern Parallels**: Revenge cycles plague conflicts from family feuds to international wars. Each side justifies violence by pointing to the other's previous violence, perpetuating endless retaliation.`,
    questions: [
      { question: "How does the revenge cycle escalate throughout the novel?", answer: "" },
      { question: "What's the difference between revenge and justice, and which does each character seek?", answer: "" },
      { question: "How could the revenge cycle have been broken, and why wasn't it?", answer: "" }
    ]
  },
  13: {
    title: "The Dangers of Obsession and Monomania",
    text: `Both Victor and the creature exhibit monomania—single-minded obsession that destroys perspective, relationships, and ultimately the obsessed person.

**Victor's Scientific Obsession**: Victor becomes so fixated on creating life that he ignores:
- His health (barely eats or sleeps for months)
- His family (doesn't write home for years)
- Ethics (never questions if he should)
- Consequences (doesn't imagine what happens after)
- Warning signs (continues despite disgust at his work)

**The Psychology of Obsession**: Psychologists identify characteristics of unhealthy obsession:
- Single focus excluding all else
- Inability to stop despite negative consequences
- Loss of perspective
- Rationalization ("I'm close to breakthrough")
- Isolation from others who might provide reality check
- Physical and mental health deterioration

Victor exhibits all of these. His obsession is addiction-like—he knows it's wrong but can't stop.

**The Creature's Revenge Obsession**: After rejection, the creature becomes equally obsessed with revenge. His entire existence narrows to hurting Victor. This obsession destroys any chance of finding happiness elsewhere.

**The Shared Fate**: Both characters become so obsessed they lose everything else. Victor loses family, health, peace. The creature loses any chance at connection or happiness. Their obsessions literally kill them.

**Walton's Escape**: Captain Walton also shows obsessive tendencies—risking his crew for Arctic glory. But he listens to Victor's warning and his crew's pleas, choosing to turn back. He escapes the fate of monomania by maintaining perspective and valuing others' input.

**The Warning**: Shelley warns that single-minded pursuit of any goal—scientific discovery, revenge, glory—destroys the pursuer. Balance, perspective, and connection to others keep us human and sane.`,
    questions: [
      { question: "What characteristics of unhealthy obsession does Victor exhibit?", answer: "" },
      { question: "How does obsession with revenge destroy the creature just as scientific obsession destroyed Victor?", answer: "" },
      { question: "How does Walton avoid the same fate, and what does this teach about preventing obsession?", answer: "" }
    ]
  },
  14: {
    title: "Science and Ethics: Modern Applications of Frankenstein's Warning",
    text: `Frankenstein's central question—"Just because we can, should we?"—remains urgent as science and technology advance beyond what Shelley could imagine.

**Genetic Engineering**: Scientists can now edit DNA using CRISPR technology. We can eliminate genetic diseases—but also potentially create "designer babies" with chosen traits. Questions:
- Should we edit human embryos?
- Who decides what traits are "desirable"?
- What happens to people with "undesirable" genes?
- Could we create new forms of discrimination?

**Artificial Intelligence**: As AI becomes more sophisticated, questions arise:
- If we create conscious AI, what responsibility do we have to it?
- Should AI have rights?
- What happens if AI becomes more intelligent than humans?
- Who's responsible when AI makes harmful decisions?

**Cloning**: We can clone animals (Dolly the sheep, 1996). Human cloning is theoretically possible but banned in most countries. Should it be? Would a clone be its own person or a copy? What psychological effects would knowing you're a clone have?

**Synthetic Biology**: Scientists can create new organisms. In 2010, researchers created first synthetic life—bacteria with artificial DNA. Benefits: medicine, cleaning pollution, biofuels. Risks: accidental release, weaponization, unforeseen consequences.

**The Frankenstein Pattern**:
1. Scientific breakthrough enables new power
2. Scientists pursue it without fully considering consequences
3. Creation escapes control or has unintended effects
4. Society must deal with results it's not prepared for

**The Ethical Framework**: Shelley doesn't say "don't do science." She says:
- Consider consequences before, not after
- Accept responsibility for creations
- Consult others, don't work in isolation
- Ask if you should, not just if you can
- Recognize that created things (even "monsters") have rights and feelings

These principles apply to every technological advance. Frankenstein remains the foundational text for bioethics and technological ethics.`,
    questions: [
      { question: "How do modern technologies like CRISPR and AI raise similar questions to Frankenstein?", answer: "" },
      { question: "What ethical principles does Frankenstein suggest we should follow with new technology?", answer: "" },
      { question: "Why is it important to consider consequences before creating new technology, not after?", answer: "" }
    ]
  },
  15: {
    title: "The Legacy of Frankenstein in Literature and Popular Culture",
    text: `Frankenstein has shaped our culture so profoundly that many "facts" about the story actually come from later adaptations, not Shelley's novel.

**Common Misconceptions**:
- "Frankenstein is the monster": No, Victor Frankenstein is the creator. The creature has no name (though calling the creator the real monster is thematically appropriate).
- Green skin and bolts in neck: Never in the novel—invented for 1931 film.
- "It's alive!": Not in the book—from the 1931 movie.
- Laboratory with electrical equipment: Shelley never details the creation process.
- Mindless, grunting monster: The creature is eloquent and intelligent in the novel.

**Why These Errors Persist**: The 1931 film with Boris Karloff was so influential that most people's image of Frankenstein comes from it, not the book. Pop culture reinforces these images.

**Cultural Impact**:
- **Language**: "Frankenstein" means any creation that escapes control. "Frankenfoods" for GMO crops, "Frankenstein's monster" for badly assembled things.
- **Science**: "Frankenstein fear" describes public anxiety about new technology. The novel influences bioethics debates.
- **Film/TV**: Hundreds of adaptations, from serious (Branagh's 1994 version) to comedy (Young Frankenstein) to retellings (Penny Dreadful).
- **Literature**: Countless books explore the creator-creation theme, from R.U.R. (introducing "robot") to Blade Runner to Ex Machina.

**Why It Endures**: Frankenstein addresses timeless questions:
- What makes us human?
- What responsibilities come with creating life?
- How do we respond to those different from us?
- When does ambition become destructive?
- Can we control what we create?

As technology advances, these questions become more urgent, not less. AI, genetic engineering, and synthetic biology make Frankenstein more relevant in the 21st century than the 19th.

The novel's power lies in having no easy answers—forcing each generation to wrestle with these questions anew.`,
    questions: [
      { question: "What are three common misconceptions about Frankenstein that come from film adaptations?", answer: "" },
      { question: "How has 'Frankenstein' become part of our language and culture?", answer: "" },
      { question: "Why does Frankenstein remain relevant and even more urgent in the 21st century?", answer: "" }
    ]
  }
};

// Writing prompts (6)
const writingPrompts = {
  1: "Victor Frankenstein pursues his goal of creating life without considering the ethics or consequences. Write about the difference between pursuing knowledge for knowledge's sake versus considering ethical implications. Use examples from science, technology, or history.",
  3: "The creature is rejected by everyone based solely on his appearance. Write about how society judges people by appearance and the consequences of this prejudice. What can we learn from the creature's experience?",
  6: "Victor abandons his creation immediately after bringing it to life. Write about parental or creator responsibility. What obligations do we have to things or people we bring into the world? Support your argument with examples.",
  8: "The creature says 'I was benevolent and good; misery made me a fiend.' Write about whether environment and treatment can justify harmful actions. Does understanding someone's suffering excuse their crimes?",
  11: "Both Victor and the creature become consumed by obsession—scientific ambition and revenge. Write about how obsession destroys perspective and relationships. How can people recognize and avoid unhealthy obsession?",
  13: "Frankenstein ends with both Victor and the creature dead, having destroyed each other. Was this ending inevitable, or could it have been prevented? Write about what choices could have broken the cycle of revenge and destruction."
};

// Journal prompts (7)
const journalPrompts = {
  2: "Victor becomes so focused on his goal that he isolates himself completely for years. Have you ever become so focused on a goal or project that you neglected other important things? What happened, and what did you learn?",
  4: "The creature learns about human society by observing the De Lacey family. Write about a time you learned something important by observation rather than direct instruction. What did you observe, and what did it teach you?",
  7: "The creature desperately wants connection and acceptance but is rejected by everyone who sees him. Have you ever felt like an outsider or been judged unfairly based on appearance or first impressions? How did it feel, and how did you handle it?",
  9: "The creature says that knowledge increased his suffering because it made him aware of what he lacked. Is ignorance sometimes better than knowledge? Write about a time when learning something made your life harder rather than easier.",
  12: "Victor and the creature are locked in a cycle of revenge where each justifies their actions by the other's previous harm. Have you ever been in a conflict where both sides kept retaliating? How was it resolved (or not resolved)?",
  14: "If you had the power to create life—whether through advanced science or magic—would you do it? What would you create, and what responsibilities would you accept? What could go wrong?"
};

// Apply enhancements
console.log('Enhancing Frankenstein unit card...\n');

unitCard.chapters.forEach(chapter => {
  const num = chapter.number;
  
  if (grammarLessons[num]) {
    chapter.grammar = grammarLessons[num];
    console.log(`✅ Ch ${num}: Grammar - ${grammarLessons[num].topic}`);
  }
  if (languageLessons[num]) {
    chapter.language = languageLessons[num];
    console.log(`✅ Ch ${num}: Language - ${languageLessons[num].topic}`);
  }
  if (informationalTexts[num]) {
    chapter.informationalText = informationalTexts[num];
    console.log(`✅ Ch ${num}: Info - ${informationalTexts[num].title}`);
  }
  if (writingPrompts[num]) {
    chapter.writingPrompt = writingPrompts[num];
  }
  if (journalPrompts[num]) {
    chapter.journalPrompt = journalPrompts[num];
  }
});

fs.writeFileSync(
  'book-data/frankenstein-complete-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log('\n✅ Frankenstein enhanced!');
console.log('📚 6 grammar + 7 language lessons');
console.log('📄 15 informational texts (science, ethics, Romanticism)');
console.log('✍️ 6 writing + 7 journal prompts');
