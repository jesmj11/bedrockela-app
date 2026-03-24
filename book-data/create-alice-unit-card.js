#!/usr/bin/env node
/**
 * Create Alice in Wonderland Unit Card
 * Days 151-180 (Weeks 31-36) - FINAL 4TH GRADE UNIT!
 */

const fs = require('fs');

const unitCard = {
  "title": "Alice's Adventures in Wonderland by Lewis Carroll",
  "grade": "4th",
  "days": "151-180",
  "totalDays": 30,
  "regularDays": 24,
  "assessmentDays": 6,
  "assessmentSchedule": [155, 160, 165, 170, 175, 180],
  
  "informationalTexts": [
    {
      "day": 151,
      "title": "Victorian England: Alice's World",
      "text": "Alice's Adventures in Wonderland was published in 1865, during the Victorian era in England. This was a time of great change—the Industrial Revolution was transforming society, science was advancing rapidly, and the British Empire was at its height. Victorian England valued strict rules, proper behavior, and logic. Children, especially girls from wealthy families like Alice, were expected to be polite, obedient, and well-mannered at all times. They wore uncomfortable formal clothes, studied lessons about manners and etiquette, and spent much of their time indoors. Adults controlled every aspect of children's lives, from what they ate to how they sat. Understanding this strict, rule-bound world helps us see why Wonderland—where nothing makes sense and rules are constantly broken—would be so appealing to a Victorian child. Alice's adventures represent freedom from all those rigid expectations.",
      "questions": [
        "When was Alice's Adventures in Wonderland published?",
        "What were Victorian children expected to be like?",
        "Why would Wonderland appeal to a Victorian child?"
      ]
    },
    {
      "day": 152,
      "title": "Lewis Carroll: The Math Professor Who Loved Nonsense",
      "text": "Lewis Carroll was a pen name for Charles Lutwidge Dodgson, born in 1832. He was a mathematics professor at Oxford University who loved logic puzzles, wordplay, and photography. Carroll was shy around adults but loved entertaining children with fantastic stories. He became friends with the Liddell family and often took their three daughters—Lorina, Alice, and Edith—on boat trips. On July 4, 1862, during one of these river excursions, ten-year-old Alice Liddell asked Carroll to tell them a story. He made up a tale about a girl named Alice who fell down a rabbit hole into a strange world. Alice loved it so much she begged him to write it down. Carroll spent months expanding and illustrating the story, finally publishing it in 1865. It became an instant bestseller. Carroll wrote many other books, but Alice remains his masterpiece—a perfect blend of his mathematical mind and playful imagination.",
      "questions": [
        "What was Lewis Carroll's real name?",
        "What was his day job besides writing?",
        "How did the story of Alice begin?"
      ]
    },
    {
      "day": 153,
      "title": "The Golden Age of Children's Literature",
      "text": "Before the Victorian era, most books for children were educational and moralistic—they taught lessons about obedience and proper behavior. But in the mid-1800s, a revolution began. Authors started writing books meant purely to entertain children and spark their imaginations. Alice's Adventures in Wonderland was a groundbreaking part of this movement. Carroll didn't try to teach moral lessons—he created a world of pure fun, nonsense, and imagination. Other authors of this 'Golden Age' included Robert Louis Stevenson (Treasure Island), Louisa May Alcott (Little Women), Mark Twain (Tom Sawyer), and Rudyard Kipling (The Jungle Book). These writers changed how society viewed childhood—no longer just a time for strict discipline and preparation for adulthood, but a unique and precious period deserving of wonder, play, and magic. Alice helped lead this transformation by showing that children's books could be wild, funny, and delightfully absurd.",
      "questions": [
        "What were children's books like before the Victorian era?",
        "How was Alice's Adventures in Wonderland revolutionary?",
        "Name two other authors from the Golden Age of children's literature."
      ]
    },
    {
      "day": 154,
      "title": "Logic and Nonsense: Two Sides of Lewis Carroll",
      "text": "Lewis Carroll was a brilliant mathematician who loved logic puzzles, precise thinking, and rules. Yet he also created Wonderland, a place where logic breaks down and rules make no sense. How can someone love both? Carroll understood that playing with logic requires understanding it deeply. Many jokes in Alice work by taking logical rules and pushing them to absurd extremes. When Alice grows and shrinks, Carroll is exploring mathematical concepts of proportion and size. When the Cheshire Cat disappears leaving only its grin, he's questioning what makes something real. The Mad Hatter's tea party parodies the strict rules of Victorian social behavior. Carroll wasn't rejecting logic—he was having fun with it, showing that imagination and reason aren't opposites but can work together. This combination makes Alice unique: it's simultaneously silly and smart, playful and profound. Readers can enjoy it purely for fun, or dig deeper into its clever wordplay and logical puzzles.",
      "questions": [
        "What was Carroll's profession that involved logic?",
        "How does the Mad Hatter's tea party relate to Victorian society?",
        "Can logic and nonsense work together? How does Carroll show this?"
      ]
    },
    {
      "day": 156,
      "title": "Down the Rabbit Hole: The Journey Begins",
      "text": "The rabbit hole is one of literature's most famous portals between worlds. Alice's decision to follow the White Rabbit down the hole represents a choice to leave the ordinary world and enter the realm of imagination. In fairy tales and myths, heroes often pass through doorways, mirrors, wardrobes, or tunnels to reach magical lands. The rabbit hole serves this purpose, but Carroll makes the journey itself memorable—Alice falls for what seems like a very long time, passing cupboards and bookshelves, wondering what will happen when she finally lands. This long fall gives her (and readers) time to shift mentally from the logical real world to the nonsensical dream world of Wonderland. The hole is also a one-way journey—Alice can't climb back up the way she came. She must continue forward, face whatever challenges Wonderland presents, and find another way home. This makes her adventure a true quest.",
      "questions": [
        "What does the rabbit hole represent in the story?",
        "Name another famous portal between worlds from literature or movies.",
        "Why can't Alice simply climb back up the rabbit hole?"
      ]
    },
    {
      "day": 157,
      "title": "Growing and Shrinking: Alice's Identity Crisis",
      "text": "Throughout Wonderland, Alice constantly changes size—growing tall enough to touch the ceiling, shrinking small enough to swim in her own tears. These changes aren't just physical; they represent Alice's confusion about who she is. When she grows huge, she feels powerful but awkward and out of place. When she shrinks, she feels small and helpless. Victorian children, especially girls, often felt this way—expected to be both mature and childlike, seen but not heard, important but powerless. Alice's size changes mirror the confusing experience of growing up: some days you feel big and capable, other days small and lost. The story asks important questions: If your body changes, are you still you? What makes you who you are—your appearance, your memories, your name? When Alice can't remember her lessons or who she is, she's experiencing what all children feel during growth—that scary, exciting feeling of becoming someone new.",
      "questions": [
        "What do Alice's size changes represent beyond just physical changes?",
        "How might Victorian children relate to Alice's feelings?",
        "What questions does the story ask about identity?"
      ]
    },
    {
      "day": 158,
      "title": "The Pool of Tears: Emotions in Wonderland",
      "text": "When Alice grows huge and cries, her tears create a pool so large that when she shrinks, she nearly drowns in it. This absurd image has a deeper meaning: sometimes our emotions can overwhelm us, especially when we're young and experiencing big feelings for the first time. Alice is lonely, confused, and frightened—natural responses to finding herself in a strange place where nothing makes sense. But she also keeps trying to solve problems and move forward. Victorian children were taught to suppress emotions and maintain composure at all times. Crying in public was considered shameful, especially for girls who were expected to be cheerful and pleasant. By showing Alice crying enough to create an ocean, Carroll acknowledges that children have real, powerful emotions that can't always be controlled. The pool of tears becomes both a problem (Alice almost drowns) and a solution (it carries her to new adventures). Emotions can be difficult, but they're also part of being human.",
      "questions": [
        "What does the pool of tears represent symbolically?",
        "How were Victorian children taught to handle emotions?",
        "How does Alice's crying become both a problem and a solution?"
      ]
    },
    {
      "day": 159,
      "title": "The Caterpillar: Wisdom from Unexpected Sources",
      "text": "The Caterpillar sitting on a mushroom smoking a hookah is one of Wonderland's strangest characters. He speaks in short, cryptic questions that frustrate Alice but also make her think. When he asks 'Who are YOU?', Alice realizes she doesn't know how to answer. The Caterpillar is going through his own transformation—eventually he'll become a butterfly. This makes him the perfect character to help Alice understand change. He's not warm or comforting like a traditional wise mentor, but he does give Alice practical help: the mushroom that lets her control her size. In life, wisdom doesn't always come from expected sources or in comfortable ways. Sometimes the most important lessons come from strange, difficult encounters that challenge us. The Caterpillar teaches Alice (and readers) that asking the right questions is often more valuable than giving easy answers. His final words—'Keep your temper'—remind Alice to stay calm even when things are confusing.",
      "questions": [
        "What is the Caterpillar going through that relates to Alice's situation?",
        "What important question does he ask Alice?",
        "What practical help does the Caterpillar provide?"
      ]
    },
    {
      "day": 161,
      "title": "The Cheshire Cat: Grinning Madness",
      "text": "The Cheshire Cat is perhaps Wonderland's most iconic character—famous for his enormous grin and his ability to vanish and reappear at will, sometimes leaving only his smile behind. He represents the idea that in a mad world, perhaps being mad is the most sensible approach. When Alice asks for directions, the Cat points out that where you go doesn't matter if you don't know where you want to end up. This sounds like nonsense but is actually profound wisdom: if you have no destination in mind, any path will do. The Cat is also the only character who seems genuinely friendly to Alice without being threatening or rude. He explains things patiently, unlike most Wonderland creatures. His disappearing act—especially leaving just the grin—plays with philosophy: can a smile exist without a face? This relates to bigger questions about what things really are versus what we perceive. The Cheshire Cat shows that madness and wisdom aren't always opposites.",
      "questions": [
        "What is the Cheshire Cat most famous for?",
        "What wisdom does the Cat offer about choosing a path?",
        "What philosophical question does the grin raise?"
      ]
    },
    {
      "day": 162,
      "title": "The Mad Tea Party: Breaking Social Rules",
      "text": "The Mad Hatter's tea party is Wonderland's most chaotic scene—a perfect parody of Victorian tea parties, which were highly formal social events with strict rules about proper behavior. At the Mad Tea Party, every rule is broken: participants are rude, they ask riddles with no answers, time has stopped at six o'clock (always tea time), they constantly switch seats, and the Dormouse falls asleep in the teapot. Victorian readers would have found this both shocking and hilarious. Tea parties represented civilization, order, and proper manners—everything Wonderland rejects. The phrase 'mad as a hatter' was already common in Carroll's time (hatters really did go mad from mercury poisoning used in hat-making), so readers expected the Hatter to be strange. But Carroll made him a specific kind of mad—obsessed with time and trapped in an eternal tea party. The scene satirizes how silly and arbitrary social rules can be when you really think about them.",
      "questions": [
        "What were Victorian tea parties like?",
        "What rules get broken at the Mad Tea Party?",
        "Where did the phrase 'mad as a hatter' come from?"
      ]
    },
    {
      "day": 163,
      "title": "The Queen of Hearts: Tyranny and Terror",
      "text": "The Queen of Hearts is Wonderland's villain—a tyrant who shouts 'Off with their heads!' at anyone who displeases her. She represents arbitrary authority: power without justice, rules without reason, and punishment without mercy. Victorian children knew authority figures like this—adults whose word was law, who punished for tiny infractions, and who never had to explain themselves. The Queen's croquet game uses living flamingos as mallets and hedgehogs as balls—a perfect example of trying to impose order on chaos (the game is impossible to play). What's interesting is that the Queen's threats are mostly empty—the King pardons everyone she sentences to death. She's all bluster and rage without real power. This deflates the terror: beneath her fury, she's just a playing card. Alice's growing courage throughout the story builds to her final confrontation with the Queen, where Alice declares 'You're nothing but a pack of cards!' This is the climax of Alice's journey—she's learned to stand up to unfair authority.",
      "questions": [
        "What does the Queen of Hearts represent?",
        "Why is the croquet game impossible to play?",
        "What important realization does Alice have about the Queen?"
      ]
    },
    {
      "day": 164,
      "title": "The Trial: Justice Without Sense",
      "text": "The trial scene is Carroll's sharpest satire of the British legal system. Everything about the trial is absurd: the evidence makes no sense, witnesses contradict themselves, the jury writes down random things, and the King and Queen make up rules as they go along. 'Sentence first—verdict afterwards!' the Queen declares, reversing the entire purpose of a trial. Yet beneath the absurdity is a serious point: legal systems can be confusing, unfair, and intimidating, especially to children who have no power within them. Victorian trials were often theatrical performances where lawyers showed off their cleverness more than seeking truth or justice. Carroll, who studied law, knew this well. By making the trial completely nonsensical, he exposes how real trials can also fail to make sense or deliver justice. Alice's growing frustration mirrors how anyone feels when facing a system that claims to be logical but operates arbitrarily. Her final act of defiance—standing up to the court despite their threats—shows she's ready to wake up and return home.",
      "questions": [
        "What is wrong with the Wonderland trial?",
        "What serious point is Carroll making beneath the absurdity?",
        "How does Alice's behavior at the trial show her growth?"
      ]
    },
    {
      "day": 166,
      "title": "Dreams vs. Reality in Alice",
      "text": "The entire adventure is a dream—Alice wakes up on the riverbank at the end, and everything returns to normal. But was it 'just' a dream? Dreams can teach us real things about ourselves and the world. Alice's dream allows her to explore fears, practice courage, question authority, and think about identity—all important work for a growing child. Carroll never tells us whether dreams are less real than waking life. In fact, he suggests they might be equally important. The Red King in Through the Looking-Glass (Carroll's sequel) asks: what if Alice is the dream character in someone else's dream? This mind-bending question challenges our assumptions about reality. Many cultures throughout history have seen dreams as meaningful messages or alternate realities, not just random brain activity. Alice's dream is certainly meaningful: it's a journey of self-discovery disguised as nonsense. The story asks readers: when you wake from a powerful dream, are you the same person you were before you fell asleep?",
      "questions": [
        "Is the Wonderland adventure 'just' a dream? Why or why not?",
        "What does Alice learn during her dream?",
        "What mind-bending question does Carroll raise about dreams and reality?"
      ]
    },
    {
      "day": 167,
      "title": "Wordplay and Language Games",
      "text": "Carroll was obsessed with language and filled Alice with puns, riddles, and verbal tricks. The Mock Turtle's 'lessons' include Reeling and Writhing (Reading and Writing) and Ambition, Distraction, Uglification, and Derision (Ambition, Distraction, Multiplication, and Division). These jokes work by changing sounds slightly to create new, absurd meanings. Carroll also plays with idioms and literal interpretations: the Cheshire Cat's grin exists without a cat, Alice swims in her own tears, and the Queen wants to remove everyone's heads (literally!). This wordplay serves multiple purposes: it's funny, it shows how arbitrary language rules can be, and it makes readers think about how words work. Children learning language often make similar mistakes—taking idioms literally or mishearing words. By celebrating these 'errors,' Carroll validates children's experiences with language. He also challenges readers to stay alert and think carefully about meaning. In Wonderland, you can't take anything at face value—words are as slippery and changeable as everything else.",
      "questions": [
        "Give an example of wordplay from Alice in Wonderland.",
        "Why does Carroll play with language so much?",
        "How does wordplay make readers think about meaning?"
      ]
    },
    {
      "day": 168,
      "title": "Alice in Pop Culture: An Enduring Legacy",
      "text": "Alice's Adventures in Wonderland has never been out of print since 1865—over 150 years of continuous publication. It's been translated into over 170 languages and adapted countless times for stage, film, television, and other media. Disney's 1951 animated film introduced Alice to millions of children. Tim Burton's 2010 film reimagined her as a teenager facing adult challenges. The story has inspired music, fashion, art, and even scientific theories (the 'Alice in Wonderland syndrome' is a real neurological condition affecting perception of size). Why does Alice endure? First, it works on multiple levels—children enjoy the fantasy and humor, while adults appreciate the satire and philosophical questions. Second, its themes are timeless: growing up, questioning authority, finding your identity, and navigating a confusing world. Third, Carroll's imaginative characters and scenes are so vivid they've become part of our shared cultural vocabulary. When someone says they've 'fallen down the rabbit hole,' everyone knows they mean they've entered a strange new world.",
      "questions": [
        "How long has Alice been in continuous print?",
        "Name two film adaptations of Alice.",
        "Why does the story continue to be popular?"
      ]
    },
    {
      "day": 169,
      "title": "Victorian Childhood: Reality vs. Fantasy",
      "text": "Alice's Wonderland adventures are the complete opposite of a Victorian girl's actual life. Real Victorian children, especially from wealthy families, lived highly structured, controlled lives. Girls wore restrictive dresses with corsets, tight shoes, and lots of uncomfortable layers. They studied needlework, music, French, and manners rather than subjects like math or science. They were expected to be quiet, obedient, and decorative. Outdoor play was limited and supervised. Many children saw their parents only briefly each day—nannies and governesses raised them. Rules governed everything from how to sit to how to speak to which emotions could be shown. Wonderland inverts all this: Alice runs free, argues with adults, experiences intense emotions, and encounters a world where rules are nonsensical or nonexistent. For Victorian readers, especially girls, Alice represented a fantasy of freedom. Modern readers might not relate to all the specific Victorian restrictions, but the desire to escape rules and adult control is universal to childhood.",
      "questions": [
        "What restrictions did Victorian girls face in daily life?",
        "How is Wonderland the opposite of Victorian life?",
        "Why would Alice represent freedom to Victorian readers?"
      ]
    },
    {
      "day": 171,
      "title": "Photography: Carroll's Other Art",
      "text": "Besides writing, Lewis Carroll was a pioneering photographer. Photography was brand new in the Victorian era—the first permanent photograph was taken just 27 years before Carroll was born. Carroll became one of the most accomplished Victorian photographers, specializing in portraits of children. He photographed his friend Alice Liddell many times, creating images that show a serious, thoughtful child quite different from the wide-eyed adventurer in his stories. Carroll's photography influenced his writing: both arts require careful attention to composition, framing, and perspective. His detailed visual descriptions in Alice help readers 'see' Wonderland clearly. Some scholars believe Carroll's interest in visual tricks and optical illusions (like the Cheshire Cat's grin) came from his photographic experiments. Photography also connected to his mathematical work—the camera obscura and early cameras used geometric principles of light and proportion. Carroll's multi-talented mind—mathematical, literary, and visual—all came together in creating Alice's Adventures in Wonderland.",
      "questions": [
        "What was Lewis Carroll's hobby besides writing?",
        "How might photography have influenced his writing?",
        "What made photography special in Victorian times?"
      ]
    },
    {
      "day": 172,
      "title": "Alice as a Feminist Hero",
      "text": "Although written in 1865, Alice can be read as a surprisingly feminist text. Alice is curious, brave, independent, and willing to challenge authority—qualities Victorian girls were actively discouraged from displaying. She doesn't wait to be rescued; she solves her own problems. She argues with powerful figures like the Queen and Caterpillar. She questions nonsensical rules rather than blindly obeying. She trusts her own judgment even when everyone tells her she's wrong. At the end, she literally shouts down the entire court and wakes herself up—she escapes through her own power. This was radical for a children's book in 1865, when most female characters were passive, obedient, and waiting to be saved by men. Carroll's real-life friend Alice Liddell was bright and spirited, and he captured those qualities in his fictional Alice. The book suggests that girls can be smart, brave, questioning, and strong. This message resonated with early feminists and continues to inspire readers today who see Alice as a girl who refuses to be controlled.",
      "questions": [
        "What qualities does Alice show that were unusual for Victorian girl characters?",
        "How does Alice escape Wonderland at the end?",
        "Why might early feminists have appreciated Alice?"
      ]
    },
    {
      "day": 173,
      "title": "The Real Alice: Alice Liddell",
      "text": "Alice Pleasance Liddell was born in 1852 to a wealthy, prominent family. Her father was dean of Christ Church College at Oxford, where Lewis Carroll taught. Alice had two sisters—Lorina (older) and Edith (younger)—who also appear in the story as the Lory and the Eaglet. The real Alice was known for being spirited, curious, and strong-willed. Carroll's friendship with the Liddell family ended mysteriously when Alice was about 11—historians still debate why, but it may have involved Carroll's growing attachment to Alice being seen as inappropriate. Alice grew up to marry a cricket player named Reginald Hargreaves and had three sons. She lived a long life—dying in 1934 at age 82—long enough to see her childhood immortalized in one of the world's most famous books. In 1928, she sold Carroll's original handwritten manuscript of Alice to pay bills. She was reportedly somewhat ambivalent about her fame, noting that being 'Alice' overshadowed her real identity.",
      "questions": [
        "Who was the real Alice that inspired the story?",
        "What were the real Alice's sisters' names?",
        "How did the real Alice feel about her literary fame?"
      ]
    },
    {
      "day": 174,
      "title": "Mathematical Concepts Hidden in Wonderland",
      "text": "As a mathematician, Carroll embedded mathematical ideas throughout Alice. Alice's size changes explore proportion and scale—if you double in size, do you double in strength? In mass? The concept of negative numbers (controversial in Carroll's time) appears when Alice tries to subtract from zero. The Mock Turtle's lessons parody Victorian education but also reference real mathematical terms. The Caucus Race (where everyone wins and all must have prizes) satirizes certain voting systems and game theories. The Hatter's riddle 'Why is a raven like a writing desk?' has no answer—it's a mathematical proof by contradiction, showing that some questions have no solutions. Time stopping at six o'clock plays with the idea of infinity and eternal loops. The Cheshire Cat's gradual disappearance explores set theory—what's the smallest part of something that can still represent the whole? Carroll wasn't trying to teach math directly; he was playing with mathematical concepts in imaginative ways that make readers think.",
      "questions": [
        "What mathematical concept do Alice's size changes explore?",
        "What does the Caucus Race satirize?",
        "What mathematical concept does the Mad Hatter's unsolvable riddle represent?"
      ]
    },
    {
      "day": 176,
      "title": "Adaptations: Alice Across Media",
      "text": "Alice has been adapted more than almost any other literary work. Stage adaptations began during Carroll's lifetime. Silent films appeared in the early 1900s. Disney's 1951 version remains the most recognizable, combining characters and scenes from both Alice books. Tim Burton's 2010 film aged up Alice and added a hero's journey structure. The Syfy miniseries reimagined Alice in a dystopian Wonderland. Video games, ballets, operas, and even a theme park ride have featured Alice. Each adaptation reflects its era: 1950s Disney emphasized whimsy and musical numbers; 2010 Burton emphasized girl power and visual spectacle; modern versions often explore darker, psychological interpretations. Some adaptations are faithful to Carroll's text; others use his characters as starting points for entirely new stories. The best adaptations capture what makes Alice special: the blend of humor and philosophy, the memorable characters, and the sense that beneath the nonsense lie important truths about growing up and finding yourself.",
      "questions": [
        "When did Alice adaptations begin?",
        "Name three different types of media Alice has been adapted into.",
        "How do different eras' adaptations reflect their times?"
      ]
    },
    {
      "day": 177,
      "title": "The Illustrators: Bringing Wonderland to Life",
      "text": "Carroll himself illustrated the original handwritten manuscript he gave to Alice Liddell, but when he published the book, he hired professional illustrator John Tenniel. Tenniel's illustrations became iconic—most people picture his Alice (with long blonde hair, blue dress, and white apron) when they think of the character. Tenniel's detailed engravings set the visual standard for Wonderland for decades. Later illustrators brought different styles: Arthur Rackham's dreamy watercolors, Salvador Dalí's surrealist interpretations, and Ralph Steadman's grotesque, energetic drawings each showed Wonderland through different artistic lenses. Disney's simplified, animated characters introduced Alice to audiences who never read the book. Modern illustrators continue reimagining Wonderland in graphic novels, picture books, and digital art. The text is so open to interpretation that each illustrator can create their own version of what Wonderland looks like. This visual flexibility is part of why Alice endures—it can be cute, creepy, psychedelic, elegant, or absurd depending on the artist.",
      "questions": [
        "Who created the original published illustrations for Alice?",
        "What does Tenniel's Alice look like?",
        "Why can illustrators interpret Wonderland so differently?"
      ]
    },
    {
      "day": 178,
      "title": "Coming of Age: Alice's Journey",
      "text": "Though Alice doesn't age during her adventure, the story is fundamentally about growing up. At the start, Alice is passive—things happen to her and she reacts. By the end, she's taking action—defying the Queen, making her own decisions, and waking herself up. She begins confused about who she is and ends with clearer self-knowledge. She starts polite even to rude characters and ends standing up for herself. She begins wanting adults to tell her what to do and ends trusting her own judgment. This character arc mirrors real coming-of-age experiences: leaving childhood's certainties, navigating confusing social rules, questioning authority, and ultimately finding your own voice. The size changes represent the awkwardness of growing—sometimes feeling too big for your life, sometimes too small. The strange creatures represent the confusing adults you encounter. Wonderland itself represents the transition between childhood and adulthood—neither one nor the other, but a confusing space between. Alice's journey teaches that growing up requires courage, curiosity, and the willingness to question things that don't make sense.",
      "questions": [
        "How does Alice change from the beginning to end of the story?",
        "What do the size changes represent symbolically?",
        "What does Wonderland itself represent in terms of growing up?"
      ]
    },
    {
      "day": 179,
      "title": "Why Nonsense Matters",
      "text": "Alice is a nonsense story—events don't follow logical cause and effect, rules change randomly, and conversations often make no sense. But nonsense isn't the same as meaningless. Nonsense literature serves important purposes: it questions assumptions about how the world should work, it celebrates imagination and creativity, it provides relief from strict rules and logic, and it gives readers permission to think differently. For Victorian children living in a rigid, rule-bound society, nonsense was liberating—a space where anything could happen. For modern readers, nonsense offers similar freedom from expectations and conventional thinking. Nonsense also develops important cognitive skills: following absurd logic requires mental flexibility, understanding wordplay builds linguistic intelligence, and recognizing satire develops critical thinking. By showing a world where normal rules don't apply, nonsense helps us see our own world's rules more clearly—some are necessary, but some are arbitrary and could be changed. Alice teaches that taking nonsense seriously can reveal profound truths about sense.",
      "questions": [
        "Is nonsense the same as meaningless? Why or why not?",
        "What purposes does nonsense literature serve?",
        "What skills can readers develop by engaging with nonsense?"
      ]
    }
  ],

  "grammar": [
    {"day": 151, "topic": "Creative Dialogue", "skill": "Write dialogue that reveals character personality and moves the story forward"},
    {"day": 153, "topic": "Vivid Verbs", "skill": "Replace boring verbs with specific, energetic verbs (ran → sprinted, said → exclaimed)"},
    {"day": 156, "topic": "Absurd Comparisons", "skill": "Use similes and metaphors to create impossible, fantastical descriptions"},
    {"day": 158, "topic": "Nonsense Logic", "skill": "Write sentences that sound logical but lead to silly conclusions"},
    {"day": 161, "topic": "Character Voice", "skill": "Give each character a distinct way of speaking"},
    {"day": 163, "topic": "Exclamations and Questions", "skill": "Use punctuation to show emotion and create dramatic effect"},
    {"day": 166, "topic": "Dream Sequences", "skill": "Write descriptions that feel dream-like and surreal"},
    {"day": 168, "topic": "Riddles and Wordplay", "skill": "Create puns, riddles, and jokes using words in clever ways"},
    {"day": 171, "topic": "Visual Description", "skill": "Use specific details to help readers 'see' unusual characters and settings"},
    {"day": 173, "topic": "Inner Thoughts", "skill": "Show what a character is thinking without saying 'she thought'"},
    {"day": 176, "topic": "Fantastic Scenes", "skill": "Describe impossible events as if they're perfectly normal"},
    {"day": 178, "topic": "Character Transformation", "skill": "Show how a character changes through their actions and dialogue"}
  ],

  "language": [
    {"day": 152, "topic": "British vs. American English", "skill": "Recognize differences in spelling and vocabulary (favourite/favorite, lift/elevator)"},
    {"day": 154, "topic": "Portmanteau Words", "skill": "Understand words made by blending two words together (Carroll invented many!)"},
    {"day": 157, "topic": "Idioms Taken Literally", "skill": "Recognize when phrases are used literally vs. figuratively"},
    {"day": 159, "topic": "Homonyms and Homophones", "skill": "Words that sound the same but mean different things (tale/tail, right/write)"},
    {"day": 162, "topic": "Paradoxes", "skill": "Understand statements that seem contradictory but reveal truth"},
    {"day": 164, "topic": "Formal vs. Informal Language", "skill": "Recognize different levels of formality in speech"},
    {"day": 167, "topic": "Puns and Double Meanings", "skill": "Identify when words are used in multiple ways for humor"},
    {"day": 169, "topic": "Archaic Language", "skill": "Understand old-fashioned words and phrases from Victorian times"},
    {"day": 172, "topic": "Satire", "skill": "Recognize when authors make fun of something by exaggerating it"},
    {"day": 174, "topic": "Coined Words", "skill": "Understand invented words created for specific purposes"},
    {"day": 177, "topic": "Alliteration and Sound Patterns", "skill": "Notice how repeating sounds create rhythm and emphasis"},
    {"day": 179, "topic": "Context Clues in Nonsense", "skill": "Figure out meaning even when words don't make literal sense"}
  ],

  "writing": [
    {"day": 151, "prompt": "Alice follows the White Rabbit without knowing where it leads. Write about a time you followed your curiosity somewhere unexpected. What did you discover? (1-2 paragraphs)"},
    {"day": 153, "prompt": "In Wonderland, normal rules don't apply. Describe a place (real or imaginary) where different rules exist. What's allowed? What's forbidden? (1-2 paragraphs)"},
    {"day": 156, "prompt": "Alice falls down a very long rabbit hole. If you could fall into a portal to anywhere, where would it lead? Describe the journey. (1-2 paragraphs)"},
    {"day": 158, "prompt": "Alice's tears create a pool she almost drowns in. Write about a time when your emotions felt bigger than you could handle. How did you cope? (1-2 paragraphs)"},
    {"day": 161, "prompt": "The Cheshire Cat says it doesn't matter which path you take if you don't know where you're going. Do you agree? Is having a destination important? (1-2 paragraphs)"},
    {"day": 163, "prompt": "The Queen of Hearts shouts 'Off with their heads!' at everyone. Write about a time you dealt with someone who was unfair or unreasonable. How did you respond? (1-2 paragraphs)"},
    {"day": 166, "prompt": "Alice's adventure is a dream. Write about a memorable dream you've had. What do you think it meant? (1-2 paragraphs)"},
    {"day": 168, "prompt": "Carroll loved wordplay and puns. Create your own riddle, pun, or word joke. Explain how it works. (1-2 paragraphs)"},
    {"day": 171, "prompt": "If you could photograph one moment from your life to preserve forever, what would it be? Why is it important? (1-2 paragraphs)"},
    {"day": 173, "prompt": "The real Alice had a famous book written about her childhood. Would you want someone to write a book about you? Why or why not? (1-2 paragraphs)"},
    {"day": 176, "prompt": "Alice has been adapted into many different versions. If you could adapt one book into a movie, play, or game, which would you choose? How would you change it? (1-2 paragraphs)"},
    {"day": 178, "prompt": "Alice grows braver and more confident during her adventure. Write about a challenge that helped you become stronger or more confident. (1-2 paragraphs)"}
  ],

  "journal": [
    {"day": 152, "prompt": "Lewis Carroll made up the Alice story to entertain children on a boat trip. Have you ever made up a story for someone? What was it about?"},
    {"day": 154, "prompt": "Carroll loved both logic and nonsense. Do you prefer things that make perfect sense, or do you enjoy some silliness and randomness? Why?"},
    {"day": 157, "prompt": "Alice's size keeps changing and she feels confused about who she is. Have you ever felt like you didn't know who you were or where you fit in?"},
    {"day": 159, "prompt": "The Caterpillar asks Alice 'Who are YOU?' How would you answer that question? What makes you who you are?"},
    {"day": 162, "prompt": "The Mad Tea Party breaks all the rules of polite behavior. If you could break one social rule for a day, which would it be and why?"},
    {"day": 164, "prompt": "The Wonderland trial is completely unfair. Have you ever been in a situation where the rules seemed unfair or the process didn't make sense?"},
    {"day": 167, "prompt": "Carroll fills the story with puns and word jokes. Do you like puns? What's your favorite joke or pun you've heard?"},
    {"day": 169, "prompt": "Victorian children had very strict rules and limited freedom. What rule (at home or school) do you think is too strict? Why?"},
    {"day": 172, "prompt": "Alice challenges authority and stands up for herself. When is it right to question or challenge someone in charge?"},
    {"day": 174, "prompt": "Carroll hid mathematical concepts in his story. If you could hide a lesson or message in a fun story, what would it be?"},
    {"day": 177, "prompt": "Different illustrators draw Wonderland in completely different ways. How do you picture Wonderland? Describe what you see in your mind."},
    {"day": 179, "prompt": "Nonsense stories let imaginations run wild. If you could create your own nonsense world, what would be one impossible thing that happens there?"}
  ],

  "assessmentWords": [
    [155, ["curious", "peculiar", "tumbling", "descended", "remarkable", "proper", "venture", "trembling", "vanished", "alarmed", "hastily", "elegant", "dreadfully", "impertinent", "anxiously", "indignant", "sternly", "melancholy", "queer", "reasonable"]],
    [160, ["procession", "curious", "interrupted", "offended", "dignified", "hookah", "contemptuous", "languid", "evidently", "morsel", "contradict", "suppressed", "proceeded", "violent", "interrupted", "consultation", "gradually", "agony", "fragment", "ridiculous"]],
    [165, ["grinning", "vanished", "altogether", "invisible", "philosophical", "ridiculous", "interrupted", "indignantly", "earnestly", "tarts", "treacle", "verdict", "suppressed", "furiously", "anxiously", "testimony", "interrupted", "triumphantly", "contempt", "absurd"]],
    [170, ["humbug", "venture", "trembling", "anxiously", "spectacles", "dazzling", "emerald", "solemn", "timid", "extraordinary", "enchanted", "dignified", "melancholy", "earnestly", "remarkable", "procession", "magnificent", "triumphant", "peculiar", "contemptuous"]],
    [175, ["verdict", "testimony", "evidence", "sentence", "suppressed", "interrupted", "anxiously", "indignantly", "contempt", "ridiculous", "absurd", "triumphant", "agony", "fragment", "hastily", "alarmed", "dreadfully", "furiously", "philosophical", "reasonable"]],
    [180, ["venture", "curiosity", "imagination", "peculiar", "remarkable", "extraordinary", "magnificent", "dazzling", "enchanted", "vanished", "invisible", "philosophical", "ridiculous", "absurd", "triumphant", "melancholy", "dignified", "elegant", "earnest", "contentment"]]
  ]
};

// Write the unit card
fs.writeFileSync('./book-data/alice-unit-card.json', JSON.stringify(unitCard, null, 2), 'utf-8');

console.log('✅ Alice in Wonderland unit card created!');
console.log('   - Days 151-180 (Weeks 31-36) - FINAL UNIT!');
console.log('   - 24 informational texts');
console.log('   - 12 grammar + 12 language lessons');
console.log('   - 12 writing + 12 journal prompts');
console.log('   - 120 assessment words');
console.log('   - Awaiting vocab and comprehension data from Classic Start adaptation');
console.log('\n🎯 This completes the 4th grade curriculum framework!');
