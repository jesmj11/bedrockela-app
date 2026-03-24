#!/usr/bin/env node
/**
 * Create Secret Garden Unit Card
 * Days 91-120 (Weeks 19-24)
 */

const fs = require('fs');

const unitCard = {
  "title": "The Secret Garden by Frances Hodgson Burnett",
  "grade": "4th",
  "days": "91-120",
  "totalDays": 30,
  "regularDays": 24,
  "assessmentDays": 6,
  "assessmentSchedule": [95, 100, 105, 110, 115, 120],
  
  "informationalTexts": [
    {
      "day": 91,
      "title": "Victorian England: Life in the Early 1900s",
      "text": "The Secret Garden is set in Yorkshire, England, around 1910—during the final years of the Victorian era. This was a time of great change. The Industrial Revolution had transformed Britain into the world's most powerful nation, but it also created huge differences between the rich and the poor. Wealthy families like the Cravens lived in enormous manor houses with dozens of servants. Children of wealthy families were often raised by governesses and nannies rather than their parents. Discipline was strict, and children were expected to be \"seen and not heard.\" This was also a time before modern medicine—many children died from diseases we can easily cure today. Understanding this world helps us see why Mary begins the story so lonely and unhappy, and how the garden becomes her path to healing.",
      "questions": [
        "When and where is The Secret Garden set?",
        "How were wealthy children typically raised in Victorian England?",
        "Why did many children die in this era compared to today?"
      ]
    },
    {
      "day": 92,
      "title": "Frances Hodgson Burnett: From Poor to Famous",
      "text": "Frances Hodgson Burnett was born in England in 1849. When she was a teenager, her family became poor after her father died. They moved to America to start over. Frances began writing stories to help support her family, selling her first story when she was just 17. She eventually became one of the most successful authors of her time. The Secret Garden, published in 1911, is now considered her masterpiece, though her earlier book Little Lord Fauntleroy was more popular during her lifetime. Burnett loved gardens—she had beautiful gardens at her homes in England and America. Much of The Secret Garden was inspired by her own experiences with gardening and her belief that nature could heal people's hearts and minds. She died in 1924, but her stories continue to inspire readers more than a century later.",
      "questions": [
        "How old was Frances when she sold her first story?",
        "What year was The Secret Garden published?",
        "What inspired Burnett to write about a garden?"
      ]
    },
    {
      "day": 93,
      "title": "The British Raj: England's Rule of India",
      "text": "Mary Lennox begins her story in India, where her parents lived as part of the British Raj—Britain's colonial rule over India that lasted from 1858 to 1947. British families went to India for business, government work, or military service. They lived privileged lives with many servants, often staying separate from Indian communities. The climate was very different from England—hot, humid, with monsoon rains and tropical diseases like cholera (the disease that kills Mary's parents). British children in India were often sent back to England for school, separating them from their families for years. This colonial system was deeply unfair—Britain took India's resources while treating Indian people as inferior. Understanding this historical context helps explain why Mary was so spoiled and why she knew so little about taking care of herself.",
      "questions": [
        "What was the British Raj?",
        "Why did British families go to India?",
        "What disease kills Mary's parents in the story?"
      ]
    },
    {
      "day": 94,
      "title": "Yorkshire Moors: England's Wild Landscape",
      "text": "Misselthwaite Manor sits on the Yorkshire moors—vast, open landscapes covered in heather, grass, and rocky hills. The moors can be beautiful but also harsh and lonely. In winter, they're cold, windy, and gray. In spring and summer, purple heather blooms and birds sing. The weather changes quickly—sunshine can turn to rain in minutes. Few people live on the moors, making them feel isolated and wild. This landscape shapes the story: Mary arrives in winter when everything is dead and gray, matching her own lonely, sour mood. As spring comes and the garden awakens, Mary begins to change too. The moors teach important lessons about resilience—plants and animals survive harsh conditions by being tough and adaptable. The story asks: can Mary learn to bloom like the flowers after a long, cold winter?",
      "questions": [
        "What are the Yorkshire moors?",
        "How does the landscape change from winter to spring?",
        "How does the moor landscape reflect Mary's emotional journey?"
      ]
    },
    {
      "day": 96,
      "title": "Victorian Manor Houses and Servants",
      "text": "Misselthwaite Manor represents the grand country estates of wealthy Victorian families. These houses had dozens of rooms—ballrooms, libraries, drawing rooms, dining halls—and employed many servants to maintain them. There was a strict hierarchy among servants: the butler and housekeeper were at the top, then came lady's maids and valets, then footmen and housemaids, then kitchen staff. Servants had specific duties and rarely spoke to the family unless spoken to first. Children of the house might not even know all the servants' names. The \"upstairs\" family lived separate lives from the \"downstairs\" servants. By the early 1900s, this system was beginning to fade as more people moved to cities for factory jobs and fewer wanted to be servants. The Secret Garden captures this changing world—the huge manor is mostly empty, with many rooms locked and unused.",
      "questions": [
        "What was the hierarchy among Victorian servants?",
        "How did the \"upstairs\" and \"downstairs\" worlds differ?",
        "Why was the servant system beginning to fade by the 1910s?"
      ]
    },
    {
      "day": 97,
      "title": "Gardens in Victorian England",
      "text": "Victorians loved gardens. Wealthy estates competed to have the most impressive gardens with exotic plants from around the British Empire. Garden design was considered an art form. Victorian gardens often had different sections: formal flower beds near the house, vegetable and herb gardens for the kitchens, orchards for fruit, and wilder areas with natural landscaping. Garden walls provided shelter from wind and created microclimates where delicate plants could grow. Roses were especially prized—hundreds of varieties were developed during the Victorian era. Gardening was seen as good for both physical and mental health. Doctors sometimes prescribed \"garden therapy\" for patients with depression or anxiety. This Victorian belief in the healing power of gardens is central to Burnett's story—the secret garden heals Mary, Colin, and even Mr. Craven.",
      "questions": [
        "What different sections did Victorian gardens typically have?",
        "Why were garden walls important?",
        "What did Victorian doctors believe about gardens and health?"
      ]
    },
    {
      "day": 98,
      "title": "Robins: Britain's Beloved Bird",
      "text": "The robin in The Secret Garden is a European robin, different from American robins. European robins are small, round birds with bright orange-red breasts. They're bold and curious, often following gardeners around hoping for worms and insects turned up by digging. In British folklore, robins are symbols of good luck and new beginnings. They're also associated with winter and Christmas. The robin in the story becomes Mary's first friend and guide—he shows her where the garden key is buried and leads her to the hidden door. This reflects old English beliefs that robins are magical helpers. Robins are territorial birds that sing beautiful songs to defend their space. The robin's fearless, independent nature mirrors Mary's own growing confidence and strength. By befriending the robin, Mary begins to connect with the natural world and open her heart to others.",
      "questions": [
        "How are European robins different from American robins?",
        "What do robins symbolize in British folklore?",
        "How does the robin's character mirror Mary's growth?"
      ]
    },
    {
      "day": 99,
      "title": "The Language of Flowers",
      "text": "Victorians believed that different flowers had specific meanings—a system called \"floriography\" or the \"language of flowers.\" People sent secret messages through bouquets: red roses meant passionate love, forget-me-nots meant remembrance, yellow roses could mean jealousy or friendship. Entire books were published explaining flower meanings, and people studied them carefully. This tradition appears throughout The Secret Garden. Roses, which dominate the secret garden, symbolized love and beauty but also secrecy (\"sub rosa\" means \"under the rose\"—telling secrets in confidence). Crocuses and snowdrops, the first flowers Mary sees pushing through the earth, symbolize hope and new beginnings. The garden's transformation from dead vines to blooming flowers represents the characters' emotional and physical healing. Understanding flower symbolism adds deeper meaning to the story's most important symbol.",
      "questions": [
        "What is floriography?",
        "What do roses symbolize in Victorian flower language?",
        "What do the first spring flowers in the story represent?"
      ]
    },
    {
      "day": 101,
      "title": "Health and Medicine in 1910",
      "text": "Colin Craven's illness reflects early 1900s medical understanding—and misunderstanding. Doctors knew less than they do today, and many treatments were ineffective or even harmful. \"Hysteria\" and psychosomatic illness (physical symptoms caused by emotional distress) were common diagnoses, especially for wealthy children. Many Victorian children were kept indoors because parents feared fresh air and exercise would make them sick—exactly the opposite of what we know today! Colin's doctor father has convinced himself that Colin has a curved spine and will die young, just as Colin's mother did in childbirth. This is likely a psychological projection—Mr. Craven's grief and guilt have been transferred onto his son. The novel suggests that Colin's real illness is emotional neglect and lack of fresh air, exercise, and hope. When he goes outside, eats well, and has friends, he gets stronger. This was revolutionary thinking in 1911—the idea that emotional health affects physical health.",
      "questions": [
        "Why did Victorian parents often keep children indoors?",
        "What is psychosomatic illness?",
        "What revolutionary idea does the novel suggest about health?"
      ]
    },
    {
      "day": 102,
      "title": "Disability and Society in Victorian Times",
      "text": "Colin's fear of becoming a \"hunchback\" reflects Victorian attitudes toward disability. People with physical disabilities were often hidden away, either in institutions or kept in private rooms at home. Wealthy families felt ashamed if they had a disabled child. The term \"invalid\" (meaning sick or disabled person) literally means \"not valid\"—suggesting the person wasn't fully human. Many disabled people were capable of living full lives but weren't given the chance because society assumed they couldn't. Colin has internalized these beliefs—he thinks that if he becomes disabled, his life will be worthless. Dickon and Mary's acceptance of Colin, combined with the garden's healing effects, help Colin realize that his worth isn't determined by his body. The novel challenges Victorian prejudices by showing Colin becoming healthy not through medical treatment but through friendship, nature, and believing in himself. This was a radical message in its time.",
      "questions": [
        "How were people with disabilities typically treated in Victorian times?",
        "What does the word \"invalid\" literally mean?",
        "How does the novel challenge Victorian prejudices about disability?"
      ]
    },
    {
      "day": 103,
      "title": "Yorkshire Dialect and Social Class",
      "text": "Dickon, Martha, and Ben Weatherstaff speak in Yorkshire dialect—a regional way of speaking English with different vocabulary, grammar, and pronunciation than \"standard\" English. In the novel, Burnett writes their dialogue phonetically: \"th'\" for \"the,\" \"tha's\" for \"you are,\" \"mun\" for \"must,\" etc. In Victorian England, how you spoke revealed your social class. Upper-class people spoke \"properly\" with educated accents. Working-class people spoke in regional dialects. Mary, from an upper-class background, initially finds the Yorkshire dialect strange and hard to understand. But she comes to love it because it's warm and genuine, unlike the formal speech of adults in her life. The dialect also connects to nature and the moors—it's the language of people who work the land. When Mary starts understanding and even using Yorkshire words, it shows she's connecting with a more authentic, earthy way of living. Language becomes a bridge between social classes in the story.",
      "questions": [
        "What is a dialect?",
        "What did a person's way of speaking reveal in Victorian England?",
        "What does Mary's acceptance of Yorkshire dialect show about her growth?"
      ]
    },
    {
      "day": 104,
      "title": "Orphans in Literature and Society",
      "text": "Mary Lennox joins a long tradition of orphan protagonists in children's literature: Oliver Twist, Anne of Green Gables, Harry Potter, and many others. Why are orphans such popular main characters? First, orphans face challenges that test their character—they must be resourceful, brave, and independent. Second, orphans can go on adventures without parents saying \"no, it's too dangerous.\" Third, orphans search for belonging, which is a universal human need. In Victorian times, many real children were orphaned—diseases like cholera, tuberculosis, and complications from childbirth killed many parents. Some orphans went to orphanages (often grim places), some to workhouses (even worse), and lucky ones went to relatives. Mary is fortunate that her uncle takes her in, even though he largely ignores her. Her orphan status forces her to learn self-reliance and to create her own family through friendship with Dickon, Colin, Martha, and Ben.",
      "questions": [
        "Why are orphans common protagonists in children's stories?",
        "What happened to orphaned children in Victorian times?",
        "How does being an orphan shape Mary's character development?"
      ]
    },
    {
      "day": 106,
      "title": "Grief and How People Cope",
      "text": "Mr. Craven's ten-year grief over his wife's death drives much of the story's conflict. When she died giving birth to Colin, he locked her garden, traveled constantly to avoid home, and emotionally abandoned his son because Colin reminded him of his loss. Different characters show different responses to grief: Mr. Craven escapes, Colin becomes an invalid, the servants whisper and worry, and Ben Weatherstaff tends the dead garden in secret. The novel suggests that avoiding grief makes it worse—Mr. Craven's travels don't heal him, they just delay healing. Healthy grief involves feeling the pain, remembering the lost person with love rather than agony, and eventually opening your heart to new life and relationships. The garden becomes a metaphor for grief: locked and abandoned, it seems dead, but life persists underneath. When the garden is reopened and tended, it blooms again—just as hearts can heal when people face their grief with courage and support from others.",
      "questions": [
        "How does Mr. Craven cope with his wife's death?",
        "What does the novel suggest about avoiding grief?",
        "How is the garden a metaphor for grief and healing?"
      ]
    },
    {
      "day": 107,
      "title": "The Power of Positive Thinking",
      "text": "Colin's transformation involves a philosophy popular in the early 1900s called \"New Thought\" or \"positive thinking.\" This movement taught that thoughts shape reality—if you believe you'll be sick, you'll be sick; if you believe you'll be healthy, you'll become healthy. Colin's \"Magic\" is essentially positive thinking applied to healing. He chants affirmations: \"I am going to live forever and ever and ever!\" Modern psychology recognizes some truth in this—optimism and belief do affect health outcomes, though they can't cure everything by thought alone. The novel walks a careful line: Colin gets better through a combination of fresh air, exercise, good food, friendship, and believing in himself. It's not just one thing—it's everything together. Critics sometimes say the novel oversimplifies healing, but it also offers a powerful message: hope, determination, and connection to others and nature can genuinely improve our lives.",
      "questions": [
        "What was the \"New Thought\" movement?",
        "What is Colin's \"Magic\" really about?",
        "What combination of factors helps Colin recover?"
      ]
    },
    {
      "day": 108,
      "title": "Animal Characters in The Secret Garden",
      "text": "Dickon's connection with animals is central to his character. He talks to the robin, raises a fox cub and crow, and understands the moorland creatures. This reflects old English and Celtic beliefs about people who have a special gift with animals—sometimes called \"animal whisperers\" or \"beast speakers.\" In folk tales, such people are pure of heart and in harmony with nature. Dickon represents an idealized version of rural, working-class life—healthy, happy, connected to the earth, and uncorrupted by wealth or social climbing. His animals are symbols: the robin represents guidance and secrets revealed, the lamb represents innocence and spring, the fox represents wildness tamed by gentleness, the crow represents intelligence. When the animals accept Mary and Colin, it shows that they're becoming worthy—learning gentleness, patience, and respect for life. Nature becomes both teacher and judge in the story.",
      "questions": [
        "What special gift does Dickon have?",
        "What does Dickon's character represent in the story?",
        "What do Dickon's animals symbolize?"
      ]
    },
    {
      "day": 109,
      "title": "Secrets: Harmful and Healing",
      "text": "The Secret Garden explores different kinds of secrets. Some secrets in the story are harmful: Mr. Craven locking the garden and refusing to speak of his wife keeps everyone trapped in grief. Colin being hidden away like a shameful secret makes him believe he's defective. These secrets come from fear, shame, and avoiding pain. But other secrets are healing: Mary, Dickon, and Colin keeping the garden work secret creates excitement and shared purpose. The secret gives them agency—it's something they control in lives where adults make all the decisions. This positive secret builds friendship and confidence. The novel suggests that secrets become harmful when they isolate people, but they can be positive when they create connection and purpose. Eventually, the good secret (the restored garden) breaks open the bad secrets (the locked garden, Colin's isolation), allowing truth and healing to emerge. This is one of the story's key messages: some things must be kept private for a time, but truth ultimately needs to come into the light.",
      "questions": [
        "What are examples of harmful secrets in the story?",
        "What are examples of healing secrets?",
        "What does the novel teach about when secrets should be kept or revealed?"
      ]
    },
    {
      "day": 111,
      "title": "Transformation: The Heart of the Story",
      "text": "The Secret Garden is fundamentally about transformation—change from one state to another. Mary transforms from a sour, spoiled, sickly child into a healthy, kind, curious girl. Colin transforms from a hysterical invalid into a strong, hopeful boy. The garden transforms from a locked, overgrown tangle into a blooming paradise. Mr. Craven transforms from a grief-haunted wanderer into a father ready to love his son. Even minor characters transform: Ben Weatherstaff softens his gruff exterior, Martha becomes more than a servant to Mary, Mrs. Medlock's strict control loosens. What causes these transformations? Nature, friendship, physical activity, purpose, hope, and love. The novel suggests that transformation requires several elements: a catalyst (Mary arriving, Colin meeting Mary), sustained effort (gardening work, exercises), belief (Colin's \"Magic\"), and community (the children supporting each other). Transformation isn't instant or easy—it happens gradually through daily choices and the influence of others who believe in you.",
      "questions": [
        "Name three major transformations in the story.",
        "What elements does the novel suggest are needed for transformation?",
        "Why does transformation happen gradually rather than instantly?"
      ]
    },
    {
      "day": 112,
      "title": "Nature as Healer and Teacher",
      "text": "The Secret Garden presents nature as the ultimate healer and teacher. The garden teaches patience—plants grow in their own time, not on human schedules. It teaches resilience—flowers bloom after harsh winters. It teaches renewal—dead-looking branches sprout new life. It teaches care—living things need tending and love to thrive. It teaches wonder—miracles happen when seeds sprout and buds open. This wasn't just Victorian romanticism—modern science confirms that exposure to nature improves mental and physical health. Being outdoors reduces stress, boosts immune function, improves mood, and increases physical fitness. The Japanese practice \"forest bathing\" (spending time in nature for health) has been studied extensively. Gardening therapy is used to help people with depression, PTSD, and physical rehabilitation. Burnett was ahead of her time in recognizing nature's healing power. The novel asks: in our modern world of screens and indoor living, are we missing something essential that the garden provides?",
      "questions": [
        "What lessons does the garden teach the characters?",
        "What does modern science say about nature and health?",
        "What question does the novel raise about modern life?"
      ]
    },
    {
      "day": 113,
      "title": "Social Class in The Secret Garden",
      "text": "The Secret Garden depicts a society divided by social class. Mary and Colin are upper-class—they have servants, don't work, and expect to be obeyed. Martha, Dickon, and Ben Weatherstaff are working-class—they have manual jobs, large families in small cottages, and must earn their living. Burnett doesn't ignore these differences, but she challenges class prejudices. The working-class characters are portrayed as more genuine, healthy, and wise than the upper-class ones. Dickon, though poor, is the happiest and healthiest character. Martha's kindness and common sense help Mary more than any upper-class governess did. The garden becomes a space where class distinctions fade—everyone gets dirty, everyone works, everyone shares the secret. This was mildly radical for 1911. Burnett suggests that happiness and worth don't come from wealth or status but from connection to nature, meaningful work, and loving relationships. The upper-class children must learn from the working-class characters to become whole, healthy people.",
      "questions": [
        "What class divisions exist in the story?",
        "How does Burnett challenge class prejudices?",
        "What does the garden teach about class and worth?"
      ]
    },
    {
      "day": 114,
      "title": "Magic and Miracles in the Garden",
      "text": "Colin names the garden's power \"Magic,\" but what does he mean? The novel uses \"Magic\" to describe several overlapping ideas: the natural growth cycle (seeds sprouting, flowers blooming), the power of positive belief, the healing effect of nature, the strength of friendship, and spiritual forces beyond human understanding. Burnett was influenced by Christian Science, New Thought, and Eastern philosophies that emphasized the mind's power over the body and a life force connecting all living things. The \"Magic\" isn't supernatural in the fantasy sense—it's the wonder and power of life itself. When Colin conducts his \"scientific experiments\" with Magic, he's trying to understand and harness natural laws. Modern readers might call it a combination of psychology (positive thinking), biology (fresh air and exercise), and ecology (connection to living systems). The novel suggests there's something sacred about growth, healing, and transformation—something that deserves reverence even if we don't fully understand it.",
      "questions": [
        "What does Colin's \"Magic\" encompass?",
        "What philosophical influences shaped Burnett's concept of Magic?",
        "How might modern readers interpret the Magic?"
      ]
    },
    {
      "day": 116,
      "title": "Fathers and Sons: The Craven Relationship",
      "text": "The relationship between Mr. Craven and Colin is central to the story's resolution. Mr. Craven failed his son completely—abandoning him emotionally because Colin reminded him of his dead wife, believing the doctors who said Colin would die young, never visiting or bonding with his own child. Colin grew up fatherless despite having a living father. This is a profound emotional neglect. Yet the novel offers hope for repair: when Mr. Craven finally returns and sees Colin healthy and running, they begin again. The story suggests that it's never too late to become the parent your child needs, even after years of failure. This was a powerful message in an era when fathers were often distant authority figures rather than nurturing presences. The garden's revival parallels the father-son relationship's revival—both seemed dead but were only dormant, waiting for the right conditions to bloom again. Love, when finally expressed, can resurrect relationships that seemed beyond saving.",
      "questions": [
        "How did Mr. Craven fail Colin as a father?",
        "What hope does the novel offer about damaged parent-child relationships?",
        "How does the garden's revival parallel the father-son relationship?"
      ]
    },
    {
      "day": 117,
      "title": "The Power of Friendship",
      "text": "Friendship is the engine of transformation in The Secret Garden. Mary arrives friendless and believes she doesn't need friends. Her first friendship with the robin opens her heart to connection. Martha's sisterly warmth gives Mary her first experience of affection. Dickon's genuine kindness and shared love of nature creates Mary's first real friendship with a peer. Colin and Mary's friendship is the most complex—they bond over being lonely, angry, and misunderstood, then help each other grow beyond those limitations. The friends give each other what adults couldn't provide: acceptance, shared purpose, encouragement, and belief in each other's potential. They also hold each other accountable—Mary calls Colin on his tantrums, Colin challenges Mary's bossiness. This is healthy friendship: supporting each other's best selves while refusing to enable each other's worst behaviors. The novel suggests that peer relationships can be as important as family relationships in shaping who we become.",
      "questions": [
        "How does Mary's capacity for friendship develop?",
        "What makes Mary and Colin's friendship particularly powerful?",
        "What does the novel suggest about the importance of peer relationships?"
      ]
    },
    {
      "day": 118,
      "title": "Symbolism: What the Garden Represents",
      "text": "The secret garden is the story's central symbol, representing multiple layered meanings. On one level, it's Mrs. Craven's memory—locking it was Mr. Craven's attempt to freeze time and avoid grief. On another level, it represents the children's inner lives—locked, neglected, seemingly dead but actually dormant and waiting to bloom. It represents healing—the process of recovery from emotional and physical wounds. It represents the natural world's power to restore and renew life. It represents secrets that can be either harmful (when locked) or healing (when opened and shared). It represents childhood itself—a magical time that adults lock away when they grow up but that can be recovered. The garden's transformation from dead to living mirrors every character's personal transformation. By the end, different readers might emphasize different meanings, which is the mark of a powerful symbol—it contains multiple truths simultaneously.",
      "questions": [
        "List at least three things the secret garden symbolizes.",
        "How does the garden's transformation mirror the characters' transformations?",
        "Why is a symbol more powerful when it has multiple meanings?"
      ]
    },
    {
      "day": 119,
      "title": "The Role of Servants in the Story",
      "text": "The servants in The Secret Garden play crucial roles despite being lower-status characters. Martha is Mary's first friend and teaches her basic self-care skills. Mrs. Medlock, though strict, protects the household routines. Ben Weatherstaff, though gruff, secretly tended Mrs. Craven's roses and eventually helps the children. The servants know about Colin's existence (an open secret) and about the garden's importance. They enable the children's secret work by choosing not to report it to Mr. Craven. This reflects a complex reality: servants in great houses knew family secrets and had significant power through their knowledge and discretion. They could expose or protect, report or remain silent. The novel treats working-class characters with respect and agency. Martha's wisdom often surpasses that of her social superiors. Ben's gruff tenderness reveals depth of feeling. The story suggests that character and worth aren't determined by social position—a revolutionary idea for its time.",
      "questions": [
        "What important roles do servants play in the story?",
        "What power did servants have despite their lower social status?",
        "How does the novel challenge social hierarchies of its time?"
      ]
    },
    {
      "day": 121,
      "title": "Legacy: Why The Secret Garden Endures",
      "text": "The Secret Garden, published in 1911, has never gone out of print and has been adapted countless times for stage, film, and television. Why does this story continue to resonate over a century later? First, its themes are universal: transformation, healing, the power of nature, and the importance of friendship and hope. Second, it addresses timeless challenges: grief, loneliness, physical and emotional illness, and family dysfunction. Third, it offers genuine wisdom: nature heals, community matters, children are resilient, and damaged relationships can be repaired. Fourth, it captures something magical about childhood—the discovery of secret places, the importance of having something that's just yours, and the intensity of childhood friendships. In an increasingly urbanized, screen-focused world, the novel's message about nature's healing power feels more relevant than ever. It reminds us that we're part of the natural world, that growth and renewal are always possible, and that tending to living things—gardens, relationships, our own souls—is essential work.",
      "questions": [
        "What universal themes help The Secret Garden remain popular?",
        "What wisdom does the novel offer that still applies today?",
        "Why might the novel's message be even more relevant now than in 1911?"
      ]
    }
  ],

  "grammar": [
    {"day": 91, "topic": "Descriptive Language", "skill": "Use adjectives and adverbs to create vivid descriptions of settings and characters"},
    {"day": 93, "topic": "Dialogue and Quotations", "skill": "Punctuate dialogue correctly with quotation marks, commas, and end marks"},
    {"day": 96, "topic": "Sentence Variety", "skill": "Combine simple sentences into compound and complex sentences for better flow"},
    {"day": 98, "topic": "Show Don't Tell", "skill": "Use specific details and actions to show emotions instead of stating them"},
    {"day": 101, "topic": "Paragraph Structure", "skill": "Write paragraphs with clear topic sentences, supporting details, and conclusions"},
    {"day": 103, "topic": "Transitions", "skill": "Use transition words to connect ideas (however, therefore, meanwhile, etc.)"},
    {"day": 106, "topic": "Point of View", "skill": "Identify and maintain consistent point of view in writing (first person, third person)"},
    {"day": 108, "topic": "Setting Description", "skill": "Use sensory details to describe places (sight, sound, smell, touch, taste)"},
    {"day": 111, "topic": "Character Development", "skill": "Show how characters change over time through actions, thoughts, and dialogue"},
    {"day": 113, "topic": "Conflict and Resolution", "skill": "Identify problems in stories and how they get resolved"},
    {"day": 116, "topic": "Symbolism", "skill": "Understand how objects in stories can represent bigger ideas"},
    {"day": 118, "topic": "Theme", "skill": "Identify the central message or lesson of a story"}
  ],

  "language": [
    {"day": 92, "topic": "British vs. American English", "skill": "Recognize spelling and vocabulary differences (colour/color, garden/yard, lorry/truck)"},
    {"day": 94, "topic": "Mood and Tone", "skill": "Identify the feeling created by an author's word choices"},
    {"day": 97, "topic": "Prefixes: un-, dis-, mis-", "skill": "Understand how prefixes change word meanings (happy/unhappy, like/dislike)"},
    {"day": 99, "topic": "Similes", "skill": "Identify comparisons using 'like' or 'as' ('as sour as a lemon')"},
    {"day": 102, "topic": "Word Relationships", "skill": "Understand synonyms, antonyms, and related words"},
    {"day": 104, "topic": "Latin Roots: vita, mort, nat", "skill": "Build vocabulary from roots meaning life, death, nature"},
    {"day": 107, "topic": "Metaphors", "skill": "Identify comparisons that say one thing IS another ('the garden is a treasure')"},
    {"day": 109, "topic": "Multiple Meaning Words", "skill": "Recognize when words have different meanings in different contexts"},
    {"day": 112, "topic": "Personification", "skill": "Identify when non-human things are given human qualities"},
    {"day": 114, "topic": "Idioms", "skill": "Understand phrases that mean something different than their literal words"},
    {"day": 117, "topic": "Suffixes: -ness, -ful, -less", "skill": "How suffixes change meaning (happy/happiness, care/careful/careless)"},
    {"day": 119, "topic": "Context Clues", "skill": "Use surrounding text to figure out unfamiliar words"}
  ],

  "writing": [
    {"day": 91, "prompt": "Mary arrives at Misselthwaite Manor after losing everyone she knew. Write about a time you had to start over in a new place or situation. How did you feel? (1-2 paragraphs)"},
    {"day": 93, "prompt": "The moors are described as harsh but beautiful. Describe a place in nature that you find interesting or meaningful. Use sensory details. (1-2 paragraphs)"},
    {"day": 96, "prompt": "Martha teaches Mary to dress herself because Mary's servants always did it for her. Write about a skill you had to learn that others thought you already knew. (1-2 paragraphs)"},
    {"day": 98, "prompt": "The robin becomes Mary's first friend. Write about an animal (pet or wild) that was important to you or taught you something. (1-2 paragraphs)"},
    {"day": 101, "prompt": "Colin believes he's going to die because everyone told him he was sick. Write about a time someone's expectations of you (positive or negative) affected how you acted. (1-2 paragraphs)"},
    {"day": 103, "prompt": "Dickon speaks in Yorkshire dialect. Write about a time you encountered a different way of speaking (accent, slang, another language). How did it affect communication? (1-2 paragraphs)"},
    {"day": 106, "prompt": "Mr. Craven locked the garden to avoid his grief. Write about why avoiding painful feelings usually makes things worse in the long run. (1-2 paragraphs)"},
    {"day": 108, "prompt": "Dickon has a special connection with animals. If you could have one animal ability (flying like a bird, swimming like a fish, etc.), what would you choose and why? (1-2 paragraphs)"},
    {"day": 111, "prompt": "The characters transform throughout the story. Write about a time you changed in an important way. What caused the change? (1-2 paragraphs)"},
    {"day": 113, "prompt": "The garden becomes a place where class differences don't matter. Describe a place or activity where everyone is equal regardless of background. Why is that important? (1-2 paragraphs)"},
    {"day": 116, "prompt": "Mr. Craven failed Colin but eventually comes back to be a father. Write about why it's important to give people second chances (or when second chances shouldn't be given). (1-2 paragraphs)"},
    {"day": 118, "prompt": "The garden symbolizes many things in the story. Write about an object or place that has special meaning to you. What does it represent? (1-2 paragraphs)"}
  ],

  "journal": [
    {"day": 92, "prompt": "Frances Hodgson Burnett wrote stories to help her family. Have you ever used a talent or skill to help someone? How did it feel?"},
    {"day": 94, "prompt": "The moors reflect Mary's mood—gray in winter, blooming in spring. Does the weather or seasons affect your mood? How?"},
    {"day": 97, "prompt": "Victorian doctors believed gardens could heal depression and anxiety. Do you find being in nature calming or energizing? Why?"},
    {"day": 99, "prompt": "Victorians sent secret messages through flower bouquets. If you could send someone a message through symbols or objects instead of words, what would you send and to whom?"},
    {"day": 102, "prompt": "Colin feared being disabled because society treated disabled people as worthless. How has society's treatment of people with disabilities improved? What still needs to change?"},
    {"day": 104, "prompt": "Mary is an orphan who must create her own 'found family.' Who are the people you've chosen to be family, beyond blood relatives?"},
    {"day": 107, "prompt": "Colin uses positive thinking (\"Magic\") to help himself heal. Do you think your thoughts and beliefs affect your physical health? Why or why not?"},
    {"day": 109, "prompt": "The story has harmful secrets and healing secrets. Write about a secret you kept—was it the right choice? Why or why not?"},
    {"day": 112, "prompt": "The novel says nature is the ultimate healer and teacher. What's the most important lesson you've learned from being outdoors or observing nature?"},
    {"day": 114, "prompt": "Colin calls the garden's power 'Magic.' What feels magical to you—not supernatural, but wonderful and powerful in a way that's hard to explain?"},
    {"day": 117, "prompt": "The friends hold each other accountable while supporting each other. Describe what you think makes a healthy, strong friendship."},
    {"day": 119, "prompt": "The servants knew family secrets but chose when to reveal them or stay silent. When is it right to keep someone else's secret, and when should you tell?"}
  ],

  "assessmentWords": [
    [95, ["cholera", "contrary", "tyrannical", "wretched", "desolate", "vast", "moor", "manor", "servant", "passage", "housekeeper", "cottage", "dialect", "fresh", "hearty", "springy", "skip", "robin", "curious", "flutter"]],
    [100, ["vine", "tangle", "overgrown", "dormant", "tendril", "crocus", "bloom", "spade", "trowel", "cultivate", "prune", "weed", "soil", "sprout", "bud", "petal", "fragrant", "root", "stem", "leaf"]],
    [105, ["invalid", "hysterical", "tantrum", "nurse", "physician", "diagnosis", "symptom", "treatment", "recover", "strengthen", "exercise", "nourishment", "appetite", "complexion", "vigor", "robust", "energy", "fatigue", "remedy", "cure"]],
    [110, ["transformation", "gradual", "progress", "improvement", "development", "growth", "thrive", "flourish", "renew", "revive", "restore", "rejuvenate", "vitality", "resilience", "perseverance", "determination", "confidence", "courage", "triumph", "success"]],
    [115, ["secret", "mystery", "conceal", "reveal", "discover", "unlock", "forbidden", "permission", "investigate", "explore", "adventure", "excitement", "wonder", "amazement", "magical", "miracle", "extraordinary", "splendid", "magnificent", "glorious"]],
    [120, ["friendship", "companionship", "loyalty", "trust", "kindness", "compassion", "empathy", "understanding", "support", "encourage", "inspire", "believe", "hope", "optimism", "positive", "joyful", "grateful", "contentment", "happiness", "fulfillment"]]
  ]
};

// Write the unit card
fs.writeFileSync('./book-data/secret-garden-unit-card.json', JSON.stringify(unitCard, null, 2), 'utf-8');

console.log('✅ Secret Garden unit card created!');
console.log('   - Days 91-120 (Weeks 19-24)');
console.log('   - 24 informational texts');
console.log('   - 12 grammar + 12 language lessons');
console.log('   - 12 writing + 12 journal prompts');
console.log('   - 120 assessment words');
console.log('   - Next: Add vocabulary and comprehension data');
