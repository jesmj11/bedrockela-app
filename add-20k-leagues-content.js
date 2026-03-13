const fs = require('fs');

const unitCard = JSON.parse(fs.readFileSync('book-data/twenty-thousand-leagues-complete-unit-card.json', 'utf8'));

// Informational texts for each chapter (24 topics related to the story)
const informationalTexts = {
  1: {
    title: "The Deep Ocean: Earth's Final Frontier",
    text: `In 1866, when Jules Verne wrote this novel, the ocean depths were more mysterious than outer space is today. No one had ever been deeper than a few hundred feet. Scientists didn't know what lived in the deep sea, how deep the ocean really was, or what the ocean floor looked like.

Today we know the ocean covers 71% of Earth's surface and reaches depths of nearly 7 miles in the Mariana Trench. We've discovered entire ecosystems in the deep ocean that survive without sunlight, using chemicals from underwater volcanoes for energy. Creatures like giant squid, anglerfish, and tube worms live in conditions that would kill most surface animals—crushing pressure, freezing temperatures, and total darkness.

Yet even now, we've explored less than 5% of the ocean. More people have walked on the moon than have visited the deepest point in the ocean. The deep sea remains one of Earth's great mysteries—just as it was in Professor Aronnax's time.`,
    questions: [
      { question: "Why was the deep ocean more mysterious in 1866 than it is today?", answer: "" },
      { question: "What percentage of the ocean have we explored so far?", answer: "" },
      { question: "How do deep-sea creatures survive without sunlight?", answer: "" }
    ]
  },
  2: {
    title: "Naval Warfare in the 1860s",
    text: `The Abraham Lincoln was a frigate—a fast, medium-sized warship designed for speed and maneuverability. In the 1860s, the world's navies were going through a revolution. For thousands of years, warships had been made of wood and powered by wind. But during the American Civil War (1861-1865), both sides built ironclad warships with steam engines and armor plating.

The first battle between ironclads happened in 1862 at Hampton Roads, Virginia, when the USS Monitor fought the CSS Virginia. Neither ship could sink the other—cannonballs just bounced off their iron armor. This battle changed naval warfare forever. Within a decade, every major navy had switched to steam-powered iron ships.

Captain Farragut, who commands the Abraham Lincoln in this story, was a real Union Navy admiral during the Civil War. He was famous for saying "Damn the torpedoes! Full speed ahead!" during the Battle of Mobile Bay. Verne named his fictional captain after this real American hero.`,
    questions: [
      { question: "How were ironclad ships different from traditional wooden warships?", answer: "" },
      { question: "What happened during the first battle between ironclads?", answer: "" },
      { question: "Who was the real Captain Farragut, and why was he famous?", answer: "" }
    ]
  },
  3: {
    title: "Bioluminescence: Living Light",
    text: `The creature's "phosphorescent glow" isn't just Verne's imagination—many real ocean animals produce light through a chemical reaction called bioluminescence. Fireflies do it on land, but in the deep ocean, it's everywhere. Scientists estimate that 90% of deep-sea creatures can produce their own light.

Why glow in the dark? Different species use bioluminescence for different purposes. Anglerfish dangle a glowing lure to attract prey. Lanternfish flash patterns to communicate with each other. Squid spray glowing "ink" to confuse predators. Some jellyfish glow to startle attackers, like an alarm system.

The chemical reaction is surprisingly simple: a molecule called luciferin reacts with oxygen in the presence of an enzyme called luciferase, producing light with almost no heat. Scientists have learned to use this same chemistry in medical research—when you see glowing cells in a microscope image, they're using the same luciferin that makes fireflies glow.`,
    questions: [
      { question: "What is bioluminescence, and what causes it?", answer: "" },
      { question: "Name three different ways ocean animals use bioluminescence.", answer: "" },
      { question: "How do scientists use bioluminescence in medical research today?", answer: "" }
    ]
  },
  4: {
    title: "Early Submarines: The Dream of Underwater Travel",
    text: `When Verne wrote this book in 1870, submarines were still experimental. The first military submarine, the Turtle, was built in 1775 during the American Revolution, but it was a one-person wooden vessel that had to be cranked by hand. During the Civil War, the Confederate submarine H.L. Hunley became the first sub to sink an enemy ship—but the Hunley itself sank, killing all eight crew members.

The problem was simple: without electricity or engines, submarines couldn't stay underwater long or move very fast. They relied on hand cranks and limited air supplies. Most were death traps.

Verne's Nautilus was pure science fiction in 1870—powered by electricity, equipped with air recycling systems, and capable of traveling thousands of miles underwater. But within 30 years, his fiction became reality. In 1898, John Philip Holland built the first practical submarine with electric motors and batteries. By World War I, submarines were deadly weapons. Verne had predicted the future with stunning accuracy.`,
    questions: [
      { question: "Why were early submarines dangerous and impractical?", answer: "" },
      { question: "What made Verne's Nautilus different from real submarines in 1870?", answer: "" },
      { question: "When did Verne's predictions about submarines come true?", answer: "" }
    ]
  },
  5: {
    title: "Captain Nemo: The Mysterious Anti-Hero",
    text: `Captain Nemo is one of literature's most complex characters—neither hero nor villain, but something in between. His name gives us a clue: "Nemo" is Latin for "no one" or "nobody." He has erased his identity and rejected the world above the waves.

But why? Verne gives us hints throughout the story. Nemo has been wronged by a colonial empire—his family killed, his homeland destroyed. Instead of seeking justice through law, he chose revenge and isolation. The Nautilus is both his weapon and his refuge.

This makes Nemo an "anti-hero"—a protagonist who lacks traditional heroic qualities like mercy or selflessness. He's brilliant, brave, and charismatic, but also ruthless and unforgiving. Readers are never quite sure whether to admire or fear him.

Verne wrote Nemo during a time of imperial expansion, when European powers were colonizing Africa, Asia, and the Pacific. Many real people, like Nemo, saw their lands taken and their families destroyed. Verne's readers understood that Nemo's rage had real-world origins—even if they didn't agree with his methods.`,
    questions: [
      { question: "What does the name 'Nemo' mean, and what does it tell us about the character?", answer: "" },
      { question: "What is an anti-hero, and why is Nemo a good example?", answer: "" },
      { question: "How does Nemo's story reflect real historical events of Verne's time?", answer: "" }
    ]
  },
  6: {
    title: "Underwater Breathing: The Science of Scuba",
    text: `In Verne's story, Nemo's crew can walk on the ocean floor using special diving suits and air tanks—technology that didn't exist in 1870. Verne was predicting the invention of SCUBA (Self-Contained Underwater Breathing Apparatus), which wouldn't be invented for another 73 years.

The problem with breathing underwater is pressure. At sea level, air pressure is 14.7 pounds per square inch. For every 33 feet you descend, the pressure increases by another 14.7 PSI. At 100 feet deep, you're experiencing four times the pressure of the surface. This compresses your lungs and changes how gases dissolve in your blood.

In 1943, Jacques Cousteau and Émile Gagnan invented the Aqua-Lung, the first practical SCUBA system. It automatically delivered air at the same pressure as the surrounding water, making it safe to breathe. Before that, divers used heavy suits with air pumped from the surface—exactly like Nemo's crew uses in this chapter.

Modern scuba divers can safely go about 130 feet deep. Beyond that, the nitrogen in regular air becomes toxic, causing "nitrogen narcosis"—a drunk-like feeling that can lead to fatal mistakes. For deeper dives, divers use special gas mixtures.`,
    questions: [
      { question: "Why is pressure a problem for underwater breathing?", answer: "" },
      { question: "Who invented the first practical SCUBA system, and when?", answer: "" },
      { question: "What happens if a diver goes too deep while breathing regular air?", answer: "" }
    ]
  },
  7: {
    title: "The Ocean as a Resource: Then and Now",
    text: `Nemo claims the ocean provides everything his crew needs—food, minerals, electricity, even clothing. In 1870, this seemed like fantasy. Today, we know he was right.

The ocean is Earth's greatest resource. It produces more than half our oxygen through phytoplankton (microscopic plants). It regulates our climate by absorbing heat and carbon dioxide. It provides protein for billions of people—fish, shellfish, seaweed, and more.

But we're also learning the ocean has limits. Overfishing has collapsed major fish populations. Plastic pollution has created garbage patches the size of Texas. Climate change is warming and acidifying ocean water, killing coral reefs and disrupting marine ecosystems.

Nemo saw the ocean as infinite and untouchable. We now know it's fragile. In Verne's time, humans couldn't harm the ocean even if they tried. Today, we're learning we can—and that protecting the ocean is essential to our own survival.`,
    questions: [
      { question: "Name three ways the ocean acts as a resource for humanity.", answer: "" },
      { question: "What are two major threats facing the ocean today?", answer: "" },
      { question: "How has our understanding of the ocean changed since Verne's time?", answer: "" }
    ]
  },
  8: {
    title: "Coral Reefs: The Rainforests of the Sea",
    text: `Coral reefs cover less than 1% of the ocean floor, but they're home to 25% of all marine species. They're built by tiny animals called coral polyps—related to jellyfish—that secrete limestone skeletons. Over thousands of years, these skeletons accumulate into massive reef structures.

Reefs are incredibly productive ecosystems. The Great Barrier Reef off Australia is the largest living structure on Earth—so big it's visible from space. It's home to 1,500 species of fish, 400 species of coral, and thousands of other organisms.

But coral reefs are dying. They need clear, warm (but not too warm) water and lots of sunlight. Pollution blocks sunlight. Climate change raises water temperatures, causing "coral bleaching"—when stressed corals expel their symbiotic algae and turn white. Without the algae, corals starve.

Scientists estimate that 50% of the world's coral reefs have died in the last 30 years. Some predict 90% will be gone by 2050 unless we reduce carbon emissions. Verne's characters marvel at the beauty and abundance of coral forests—our generation may be the last to see them in their full glory.`,
    questions: [
      { question: "What are coral polyps, and how do they build reefs?", answer: "" },
      { question: "What is coral bleaching, and what causes it?", answer: "" },
      { question: "Why are coral reefs so important despite covering only 1% of the ocean floor?", answer: "" }
    ]
  },
  9: {
    title: "Ocean Zones: Life at Different Depths",
    text: `The ocean is divided into zones based on depth and light penetration. The Sunlight Zone (0-200 meters) is where most ocean life exists—enough light for photosynthesis means plants and algae can grow, feeding everything else.

The Twilight Zone (200-1,000 meters) gets some light but not enough for photosynthesis. Animals here are often bioluminescent, and many migrate up to the Sunlight Zone at night to feed.

The Midnight Zone (1,000-4,000 meters) is pitch black, freezing cold, and under immense pressure. Life here is sparse but bizarre—anglerfish, vampire squid, and gulper eels with huge mouths and stomachs to catch rare meals.

The Abyssal Zone (4,000-6,000 meters) and Hadal Zone (6,000+ meters) are Earth's deepest realms. The pressure here is crushing—enough to collapse a human skull instantly. Yet life persists: sea cucumbers, amphipods, and tube worms thrive around hydrothermal vents.

The Nautilus can travel through all these zones, giving its crew access to creatures no surface ship could ever see—a technological miracle even today.`,
    questions: [
      { question: "Which ocean zone contains most of the ocean's life, and why?", answer: "" },
      { question: "How do animals survive in the Midnight Zone without sunlight?", answer: "" },
      { question: "What makes the Nautilus special in terms of ocean exploration?", answer: "" }
    ]
  },
  10: {
    title: "Jules Verne: Prophet of Technology",
    text: `Jules Verne wasn't just a storyteller—he was a prophet. Writing in the 1860s-1870s, he predicted submarines, scuba gear, electric power, video conferencing, helicopters, guided missiles, and space travel. His novel *From the Earth to the Moon* (1865) described a moon mission that eerily resembled Apollo 11—launched from Florida, crew of three, splashdown in the Pacific Ocean.

How did he do it? Verne studied science obsessively. He read every scientific journal he could find and corresponded with engineers and inventors. He understood the principles behind technologies that didn't exist yet and imagined how they might work.

But Verne didn't just predict gadgets—he predicted how technology would change society. He understood that submarines would revolutionize warfare, that electricity would transform daily life, and that exploration would expand human knowledge. He also warned about technology's dangers: Nemo uses his advanced submarine for revenge, not progress.

Many scientists and engineers credit Verne with inspiring their careers. The first nuclear submarine was named USS Nautilus in his honor. Verne proved that science fiction isn't just entertainment—it's a way of thinking about the future.`,
    questions: [
      { question: "Name three technologies Jules Verne predicted accurately.", answer: "" },
      { question: "How did Verne make such accurate predictions about future technology?", answer: "" },
      { question: "What warning does Verne give about technology through Nemo's story?", answer: "" }
    ]
  },
  11: {
    title: "Ocean Currents: Rivers in the Sea",
    text: `Ocean currents are like rivers flowing through the sea, moving water, heat, and nutrients around the globe. The Gulf Stream carries warm water from the Gulf of Mexico to Western Europe, making Britain's climate much milder than Canada's, even though they're at the same latitude.

Currents are driven by several forces: wind pushes surface water, the Earth's rotation bends the flow (the Coriolis effect), and differences in water temperature and salinity create density gradients. Deep ocean currents, called thermohaline circulation, move cold, salty water from the poles toward the equator along the ocean floor.

The Nautilus uses ocean currents like highways, riding them to travel faster and conserve power—a technique modern submarines still use. Nemo understands oceanography better than any scientist of his time.

These currents are crucial for Earth's climate. They distribute heat from the equator to the poles and bring nutrients from the deep to the surface, feeding marine ecosystems. But climate change is altering current patterns. Scientists worry that warming could shut down the Gulf Stream, drastically cooling Europe.`,
    questions: [
      { question: "What forces drive ocean currents?", answer: "" },
      { question: "How does the Gulf Stream affect Europe's climate?", answer: "" },
      { question: "How might climate change affect ocean currents?", answer: "" }
    ]
  },
  12: {
    title: "The History of Ocean Exploration",
    text: `For most of human history, we couldn't explore the deep ocean. Ancient sailors stuck to coastlines. Pacific Islanders mastered open-ocean navigation by reading stars, waves, and birds, but they couldn't see what lived beneath the surface.

The first scientific oceanography expedition was the HMS Challenger voyage (1872-1876)—just two years after Verne published this novel. The Challenger sailed 70,000 miles, taking depth soundings and collecting specimens. They discovered thousands of new species and proved that life existed even in the deepest ocean.

In 1960, Jacques Piccard and Don Walsh piloted the bathyscaphe Trieste to the bottom of the Mariana Trench—nearly 7 miles down. They were the first humans to visit Earth's deepest point. Even there, they saw life: a flatfish and several shrimp-like amphipods.

Today, robotic submarines explore where humans can't survive. ROVs (Remotely Operated Vehicles) have discovered hydrothermal vents, underwater volcanoes, and bizarre creatures. But vast areas remain unexplored—we have better maps of Mars than of our own ocean floor.`,
    questions: [
      { question: "What did the HMS Challenger expedition discover?", answer: "" },
      { question: "Who were the first humans to reach the deepest point in the ocean?", answer: "" },
      { question: "Why is much of the ocean still unexplored even today?", answer: "" }
    ]
  },
  13: {
    title: "Giant Squids: Monsters of the Deep",
    text: `For centuries, sailors told stories of kraken—enormous tentacled monsters that could drag ships to the bottom. Scientists dismissed these as myths until dead giant squid began washing ashore in the 1870s—right when Verne was writing.

Giant squids (*Architeuthis*) can grow up to 43 feet long with eyes the size of dinner plates—the largest eyes in the animal kingdom. They live in the deep ocean (1,000-3,000 feet) and hunt fish and smaller squids. Their only predator is the sperm whale, which bears scars from epic battles.

Despite their size, giant squids were rarely seen alive until 2004, when Japanese researchers photographed one in the wild. In 2012, they filmed one in its natural habitat for the first time. These creatures remain deeply mysterious.

Even larger is the colossal squid (*Mesonychoteuthis hamiltoni*), found in Antarctic waters. It can weigh up to 1,500 pounds and has rotating hooks on its tentacles. We've never filmed one alive.

Verne's descriptions of giant squid attacks in this novel were based on real sailor reports—but the reality is even stranger than his fiction.`,
    questions: [
      { question: "How big can giant squids grow, and what makes their eyes special?", answer: "" },
      { question: "Why were giant squids so hard to observe until recently?", answer: "" },
      { question: "What's the difference between a giant squid and a colossal squid?", answer: "" }
    ]
  },
  14: {
    title: "Underwater Archaeology: Shipwrecks and Lost Cities",
    text: `The ocean floor is a museum of human history. Thousands of shipwrecks rest in the deep, from ancient Greek triremes to World War II battleships. Each one is a time capsule, preserving artifacts that would decay on land.

The RMS Titanic, discovered in 1985 at a depth of 12,500 feet, is the most famous shipwreck. Its debris field contains thousands of objects—shoes, dishes, luggage—frozen in time. The ship itself is slowly being consumed by metal-eating bacteria and will eventually collapse.

But there are older, stranger discoveries. Divers have found 3,000-year-old Phoenician cargo ships with intact wine jars. The Antikythera mechanism, discovered in a Roman shipwreck, turned out to be an ancient computer used to predict astronomical positions.

Some archaeologists search for legendary lost cities like Atlantis. While Atlantis is myth, real submerged cities exist: Heracleion in Egypt, swallowed by the Mediterranean 1,200 years ago, was rediscovered in 2000 with temples, statues, and ships intact.

The ocean preserves history that land destroys—but it also hides it. Most shipwrecks will never be found.`,
    questions: [
      { question: "Why does the ocean preserve artifacts better than land does?", answer: "" },
      { question: "What is the Antikythera mechanism, and why is it significant?", answer: "" },
      { question: "Name one real underwater city that has been discovered.", answer: "" }
    ]
  },
  15: {
    title: "Ocean Predators: Sharks and Their Role",
    text: `Sharks have existed for 450 million years—longer than trees. They survived four mass extinctions that wiped out most life on Earth. Today there are over 500 species, from the tiny dwarf lanternshark (6 inches long) to the whale shark (40 feet).

Despite their reputation, sharks aren't mindless killers. They're apex predators that keep ocean ecosystems healthy by removing sick and weak animals. Without sharks, prey fish populations explode, overgraze their food sources, and collapse.

But sharks are in trouble. Humans kill about 100 million sharks per year for their fins (used in shark fin soup), meat, and liver oil. Many species are endangered. Because sharks reproduce slowly—some species only have 1-2 pups every 2-3 years—populations can't recover quickly.

The most dangerous shark to humans is the great white, responsible for about 10 deaths per year worldwide. But you're more likely to be killed by a cow (22 deaths/year), a falling coconut (150 deaths/year), or your own toaster (700 deaths/year). The ocean isn't as dangerous as Verne's Victorian readers believed—but it's more fragile.`,
    questions: [
      { question: "Why are sharks important to ocean ecosystems?", answer: "" },
      { question: "Why are shark populations struggling to recover from overfishing?", answer: "" },
      { question: "How do shark attack statistics compare to other dangers?", answer: "" }
    ]
  },
  16: {
    title: "The Deep Sea Food Chain: Life Without Sunlight",
    text: `On land and in shallow water, all food chains start with photosynthesis—plants use sunlight to make energy. But in the deep ocean, where no sunlight reaches, how does anything survive?

Most deep-sea creatures rely on "marine snow"—a constant rain of dead organisms, feces, and other organic matter drifting down from the sunlit zone above. Scavengers eat this debris, and predators eat the scavengers.

But in 1977, scientists discovered something revolutionary: hydrothermal vents. These underwater volcanoes spew superheated, mineral-rich water from cracks in the ocean floor. Bacteria use the chemicals (especially hydrogen sulfide) as an energy source through chemosynthesis—essentially "eating" minerals instead of light.

These vent bacteria form the base of a unique food chain. Giant tube worms, yeti crabs, and ghostly white fish cluster around vents in the permanent darkness, living off bacterial energy. Some tube worms have no mouth or digestive system—they house bacteria in their bodies and absorb nutrients directly.

This discovery changed biology. If life can exist without sunlight on Earth, maybe it can exist in the ice-covered oceans of Jupiter's moon Europa, or Saturn's moon Enceladus.`,
    questions: [
      { question: "What is 'marine snow,' and why is it important to deep-sea life?", answer: "" },
      { question: "What is chemosynthesis, and how is it different from photosynthesis?", answer: "" },
      { question: "Why did the discovery of hydrothermal vent ecosystems change our understanding of where life can exist?", answer: "" }
    ]
  },
  17: {
    title: "Whales: The Ocean's Giants",
    text: `The blue whale is the largest animal that has ever lived—bigger than any dinosaur. It can grow to 100 feet long and weigh 200 tons. Its heart is the size of a small car, and a human could swim through its major arteries. Yet it feeds on krill—tiny shrimp-like creatures barely an inch long.

Whales are mammals that returned to the ocean about 50 million years ago. Their ancestors were land animals that looked like small deer. Over millions of years, they adapted to aquatic life: their front legs became flippers, their hind legs disappeared, and they developed blowholes for breathing.

Whales use echolocation to navigate and hunt in dark or murky water. They emit clicks and listen for echoes, building a "sound picture" of their surroundings. Sperm whales can echolocate prey at distances over a mile away.

In Verne's time, whales were hunted nearly to extinction for oil (used in lamps), baleen (used in corsets), and ambergris (used in perfume). The whaling industry killed hundreds of thousands of whales per year. Today, most whale species are protected, but many remain endangered. The Nautilus encounters whales peacefully—a vision of coexistence that's only recently become reality.`,
    questions: [
      { question: "How do whales use echolocation, and why is it useful?", answer: "" },
      { question: "What were whales hunted for in the 1800s?", answer: "" },
      { question: "How did whales evolve from land animals to ocean mammals?", answer: "" }
    ]
  },
  18: {
    title: "The Dangers of Decompression: The Bends",
    text: `When divers breathe compressed air underwater, nitrogen dissolves into their blood and tissues. The deeper you go, the more nitrogen dissolves. This is fine—until you ascend.

If a diver rises too quickly, the pressure drops rapidly and the dissolved nitrogen forms bubbles in the blood and tissues, like opening a shaken soda bottle. This is called decompression sickness or "the bends." Symptoms range from joint pain and skin rashes to paralysis, brain damage, and death.

The bends was a major mystery in the 1800s. Workers building underwater foundations for bridges would emerge from pressurized caissons (chambers) and suddenly collapse, screaming in pain. No one understood why until scientists realized the connection to gas pressure.

Modern divers avoid the bends by ascending slowly, pausing at specific depths to let nitrogen safely diffuse out of their tissues. Deep-sea divers sometimes spend hours in decompression, breathing special gas mixtures. The deepest scuba dive on record is 1,090 feet, but the diver needed 15 hours to safely return to the surface.

Nemo's crew never seems to worry about decompression—another piece of advanced technology Verne doesn't explain.`,
    questions: [
      { question: "What causes decompression sickness (the bends)?", answer: "" },
      { question: "How do modern divers avoid getting the bends?", answer: "" },
      { question: "Why did workers building bridges in the 1800s mysteriously get sick?", answer: "" }
    ]
  },
  19: {
    title: "Antarctica: The Frozen Continent",
    text: `Antarctica is Earth's southernmost continent, buried under ice up to 3 miles thick. It's the coldest, driest, windiest place on the planet. The lowest temperature ever recorded was -128.6°F at Antarctica's Vostok Station.

Despite the harsh conditions, Antarctica teems with life at its edges. Penguins, seals, and seabirds nest on the coast and islands. The Southern Ocean surrounding Antarctica is one of the world's richest marine ecosystems, home to krill, whales, and colossal squids.

Humans didn't set foot on Antarctica until 1821, and no one reached the South Pole until 1911, when Norwegian explorer Roald Amundsen won a deadly race against Britain's Robert Scott (who died on the return journey). The continent wasn't fully mapped until the 1950s.

Today, Antarctica is governed by the Antarctic Treaty (1959), which bans military activity and mining, dedicating the continent to scientific research. Climate change is now melting Antarctic ice at alarming rates. If the West Antarctic Ice Sheet collapses, sea levels could rise by 10 feet, flooding coastal cities worldwide.

When the Nautilus travels beneath the Antarctic ice, Verne imagined a frontier that was truly unexplored—it still largely is.`,
    questions: [
      { question: "Why is Antarctica one of the harshest environments on Earth?", answer: "" },
      { question: "When did humans first reach the South Pole, and who got there first?", answer: "" },
      { question: "What would happen if the West Antarctic Ice Sheet melted completely?", answer: "" }
    ]
  },
  20: {
    title: "Ocean Pollution: Plastic and Chemicals",
    text: `Every year, humans dump about 8 million tons of plastic into the ocean—the equivalent of one garbage truck per minute. This plastic doesn't biodegrade; it breaks into smaller and smaller pieces called microplastics, but never truly disappears.

Ocean currents collect this debris into massive "garbage patches." The Great Pacific Garbage Patch is twice the size of Texas—a floating island of trash. Sea turtles mistake plastic bags for jellyfish and starve with stomachs full of indigestible waste. Seabirds feed plastic to their chicks. Fish ingest microplastics, which then enter the food chain and end up on our dinner plates.

Chemical pollution is equally serious. Agricultural runoff carries fertilizers into rivers and ultimately the ocean, causing algae blooms that suck oxygen from the water, creating "dead zones" where nothing can survive. Heavy metals, oil spills, and industrial waste poison marine life.

In Verne's time, the ocean seemed infinite—a dumping ground that could absorb anything. We now know this was an illusion. The ocean is vast but not invincible. Nemo saw the sea as a refuge from human corruption. Today, there's no part of the ocean untouched by human impact.`,
    questions: [
      { question: "What are microplastics, and why are they a problem?", answer: "" },
      { question: "What is a dead zone, and what causes it?", answer: "" },
      { question: "How has our view of the ocean's ability to absorb pollution changed since Verne's time?", answer: "" }
    ]
  },
  21: {
    title: "Ocean Acidification: The Other CO₂ Problem",
    text: `Everyone knows carbon dioxide (CO₂) causes global warming, but fewer people know about its effect on the ocean. The ocean absorbs about 25% of the CO₂ humans emit. This might seem helpful—less CO₂ in the atmosphere means less warming—but it comes at a terrible cost.

When CO₂ dissolves in seawater, it forms carbonic acid, lowering the ocean's pH. The ocean is now 30% more acidic than it was before the Industrial Revolution, and acidity is increasing faster than any time in the last 300 million years.

This matters because many marine organisms build shells and skeletons from calcium carbonate—corals, mollusks, sea urchins, and many plankton species. Acidic water dissolves calcium carbonate, making it harder (sometimes impossible) for these creatures to grow and survive.

If ocean acidification continues, coral reefs will dissolve, shellfish populations will collapse, and the entire marine food web could unravel. Pteropods—tiny swimming snails that are a crucial food source for fish, whales, and seabirds—are already showing shell damage in some regions.

Verne's characters marvel at the ocean's abundance. Our challenge is ensuring that abundance survives for future generations.`,
    questions: [
      { question: "What causes ocean acidification?", answer: "" },
      { question: "Why is ocean acidification particularly dangerous for creatures with shells?", answer: "" },
      { question: "What could happen to ocean ecosystems if acidification continues?", answer: "" }
    ]
  },
  22: {
    title: "The Future of Ocean Exploration",
    text: `Today's ocean explorers use technology Verne could barely imagine: autonomous underwater vehicles (AUVs), remotely operated vehicles (ROVs), sonar mapping, satellite tracking, and deep-diving submersibles. Yet we've still explored less than 5% of the ocean floor.

Why so little? The ocean is vast—covering 140 million square miles—and deep. The average ocean depth is 12,100 feet, where pressure crushes most equipment. It's pitch black below 3,000 feet. Radio waves don't travel through water, so communication is difficult. And it's expensive—ocean exploration receives far less funding than space exploration.

But new technologies are changing this. AI-powered robots can map the seafloor autonomously. Environmental DNA (eDNA) lets scientists detect what species live in an area just by sampling the water. Deep-sea drones can stay underwater for months, sending data to satellites.

Scientists hope to map the entire ocean floor by 2030—a goal that seemed impossible a decade ago. What will we find? New species, mineral deposits, underwater volcanoes, shipwrecks, and mysteries we can't yet imagine.

Verne understood that exploration changes us. The more we explore the ocean, the more we realize how much we depend on it—and how urgently we need to protect it.`,
    questions: [
      { question: "Why is ocean exploration so difficult and expensive?", answer: "" },
      { question: "What new technologies are helping us explore the ocean faster?", answer: "" },
      { question: "When do scientists hope to complete mapping the entire ocean floor?", answer: "" }
    ]
  },
  23: {
    title: "Marine Protected Areas: Ocean Conservation",
    text: `In the 1800s, the ocean was seen as an inexhaustible resource—infinite fish, unlimited space, invincible to human impact. We now know this is dangerously wrong. Overfishing has collapsed fish populations worldwide. Pollution poisons coastal waters. Climate change is warming and acidifying the ocean.

One solution is Marine Protected Areas (MPAs)—ocean regions where fishing, mining, and development are restricted or banned. These "ocean parks" allow ecosystems to recover. Studies show that fish populations inside MPAs can increase by 400% within a decade, and the benefits spill over into surrounding waters as populations grow.

The largest MPA is the Ross Sea Region in Antarctica—600,000 square miles of protected ocean. Other major MPAs include the Papahānaumokuākea Marine National Monument in Hawaii and the Galápagos Marine Reserve.

But MPAs currently protect only 7% of the ocean. Conservation groups are pushing for 30% protection by 2030. This would preserve critical habitats, protect endangered species, and ensure future generations can enjoy ocean abundance.

Captain Nemo lived outside all laws, taking what he needed from the ocean. Today, we're learning that protecting the ocean requires cooperation, rules, and sacrifice—the opposite of Nemo's radical independence.`,
    questions: [
      { question: "What are Marine Protected Areas (MPAs), and how do they work?", answer: "" },
      { question: "What happens to fish populations inside well-enforced MPAs?", answer: "" },
      { question: "What percentage of the ocean is currently protected, and what's the goal for 2030?", answer: "" }
    ]
  },
  24: {
    title: "Science Fiction as Prophecy: Looking Back, Looking Forward",
    text: `Jules Verne wrote Twenty Thousand Leagues Under the Sea in 1870. At the time, submarines could barely stay underwater for an hour. Scuba gear didn't exist. Electric motors were experimental. The deep ocean was completely unexplored.

Yet nearly everything Verne imagined came true: nuclear-powered submarines, scuba diving, underwater research stations, marine biology, oceanography, and even international treaties governing the ocean. The USS Nautilus, the world's first nuclear submarine (1954), was named after Verne's fictional ship—proof that his vision inspired real technology.

But Verne got some things wrong. He imagined the ocean as pristine and infinite—a refuge from human civilization. We now know no such refuge exists. Humans have touched every part of the ocean, from trash in the Mariana Trench to microplastics in Arctic ice.

Science fiction's job isn't just predicting technology—it's helping us imagine different futures so we can choose which one we want. Verne showed us a world where science unlocked the ocean's mysteries. Now we must decide: will we use that knowledge to protect the ocean, or exploit it until nothing remains?

The choice—like Aronnax's choice whether to stay aboard the Nautilus or return to the surface—is ours to make.`,
    questions: [
      { question: "Name three technologies Verne accurately predicted in this novel.", answer: "" },
      { question: "What did Verne get wrong about the ocean's future?", answer: "" },
      { question: "According to the text, what is science fiction's real purpose beyond predicting technology?", answer: "" }
    ]
  }
};

// Writing prompts (odd days - more formal, analytical)
const writingPrompts = {
  1: "Professor Aronnax makes a choice to join the expedition even though it's dangerous. Write about a time you chose to do something difficult or scary because you believed it was important. What helped you make that decision?",
  2: "Ned Land is skeptical while Aronnax believes in the sea monster. Write a persuasive paragraph arguing for one side: either that people should be skeptical of extraordinary claims, or that we should remain open to possibilities we don't yet understand.",
  3: "The crew chases the creature for hours but can never quite catch it. Write about the difference between a goal that's difficult to achieve and one that's impossible. How can you tell the difference, and when should you keep trying vs. give up?",
  4: "Aronnax, Ned, and Conseil find themselves prisoners on a mysterious submarine. If you were in their situation, what would be your priority: escape, cooperation, or learning about your captor? Explain your reasoning in a well-developed paragraph.",
  6: "Captain Nemo shows his prisoners luxury and hospitality, but they're still prisoners. Write about the difference between kindness and freedom. Can someone treat you well but still be wrong to hold you captive?",
  7: "Nemo claims he has rejected the world above and found everything he needs in the ocean. Write about whether you think complete self-sufficiency is desirable or even possible. What do we gain and lose by depending on others?",
  8: "The characters witness incredible beauty in the underwater world. Write about a natural place or phenomenon that has amazed you. What made it special, and how did experiencing it change your perspective?",
  9: "Aronnax is torn between his scientific curiosity and his desire for freedom. Write about a time when two things you wanted conflicted with each other. How did you resolve the conflict, and do you have any regrets?",
  11: "Nemo uses advanced technology in ways the world has never seen. Write about whether technological progress is always positive, or whether some knowledge is better left undiscovered. Use examples to support your position.",
  12: "The novel shows us layers of discovery—each revelation leads to new mysteries. Write about something you learned that changed how you understood something else. How does new knowledge transform what we thought we knew?",
  13: "The crew encounters a dangerous giant squid. Write about fear: what makes something truly frightening versus just startling? How do people behave differently when they're genuinely afraid versus just surprised?",
  14: "Aronnax discovers evidence of lost civilizations underwater. Write about what we can learn from the past. Why do historians and archaeologists study ancient cultures, and what can these lost worlds teach us?",
  16: "The Nautilus travels through ecosystems that seem alien and impossible. Write about how understanding science can make the world seem more wonderful rather than less mysterious. Give specific examples.",
  17: "Nemo shows compassion toward whales while being ruthless toward humans. Write about this contradiction: can someone love nature but hate humanity? Is this hypocritical, or is it understandable?",
  18: "The characters face life-threatening dangers from pressure, cold, and oxygen deprivation. Write about the difference between bravery and recklessness. When is taking a risk courageous, and when is it just foolish?",
  19: "The Nautilus ventures into Antarctica, one of Earth's most extreme environments. Write about why humans explore dangerous places even when there's no obvious benefit. What drives exploration?",
  21: "Aronnax realizes the ocean is both beautiful and dangerous, nurturing and deadly. Write about complexity in nature: why do we tend to see nature as either friendly or hostile, when it's actually both? How should this affect how we treat the environment?",
  22: "As the journey continues, Aronnax must decide whether to try to escape or accept his new life. Write about adaptation: when should we accept circumstances we can't change, and when should we keep fighting to change them?",
  23: "Nemo reveals more about his past and his pain. Write about whether understanding someone's reasons for doing wrong makes their actions more forgivable. Can we condemn the action while sympathizing with the person?",
  24: "The story ends with Aronnax returning to the surface world. Write a reflection: if you could choose between a comfortable prison with wonders to explore, or a difficult freedom with ordinary life, which would you choose and why?"
};

// Journal prompts (even days - personal, reflective)
const journalPrompts = {
  2: "Ned Land has been a harpooner his whole life—he's defined by his profession. Write about what defines you. Is it something you do, something you believe, or something else? How would you describe yourself to a stranger?",
  4: "Imagine waking up and discovering you've been pulled inside a submarine and can't leave. What would be your first emotion: anger, fear, curiosity, or something else? Why?",
  6: "Nemo gives his prisoners beautiful rooms and gourmet food. Would luxury make captivity easier to bear, or would it make it worse? How important is physical comfort compared to freedom?",
  8: "Aronnax sees creatures and landscapes no human has ever witnessed. Write about the most beautiful or amazing natural thing you've ever seen. What made it special? Would you want to see it again, or was once enough?",
  10: "Conseil follows Aronnax into danger without hesitation out of loyalty. Write about someone you would follow into danger—or someone who would follow you. What creates that kind of trust?",
  12: "The characters discover ancient ruins underwater, reminding them that entire civilizations can be forgotten. What would you want people in the future to remember about our time? What are we in danger of forgetting?",
  14: "Nemo has cut himself off from all family and friends to pursue his mission. Could you ever do that? What would be important enough to make you give up the people you love?",
  16: "Deep-sea creatures survive in conditions that would instantly kill humans—crushing pressure, freezing cold, no light. Write about a time you survived something difficult. What helped you get through it?",  
  18: "The characters face the constant danger of drowning, running out of air, or being crushed by pressure. If you knew you might not survive a journey, would you still take it if the discoveries were important enough? What would make the risk worth it?",
  20: "Aronnax sees pollution and human damage even in the middle of the ocean. Write about an environmental problem you've witnessed personally. How did it make you feel, and did it change your behavior?",
  22: "The more Aronnax learns about Nemo, the more complicated his feelings become. Write about a time you discovered someone you admired had done something wrong. How did you handle those mixed feelings?",
  24: "If you had the chance to explore the ocean depths in a submarine like the Nautilus, would you go? What would you most want to see or discover? What would you be most afraid of?"
};

// Apply informational texts, writing prompts, and journal prompts
console.log('Adding informational texts, writing prompts, and journal prompts...\n');

unitCard.chapters.forEach(chapter => {
  const num = chapter.number;
  
  // Add informational text if available
  if (informationalTexts[num]) {
    chapter.informationalText = informationalTexts[num];
  }
  
  // Add writing prompt (odd days, not assessments)
  if (writingPrompts[num]) {
    chapter.writingPrompt = writingPrompts[num];
  }
  
  // Add journal prompt (even days, not assessments)
  if (journalPrompts[num]) {
    chapter.journalPrompt = journalPrompts[num];
  }
  
  console.log(`✅ Chapter ${num}: ${chapter.title}`);
  console.log(`   Info: ${chapter.informationalText.title}`);
  console.log(`   Writing: ${writingPrompts[num] ? 'Added' : 'Default'}`);
  console.log(`   Journal: ${journalPrompts[num] ? 'Added' : 'Default'}`);
});

// Write updated file
fs.writeFileSync(
  'book-data/twenty-thousand-leagues-complete-unit-card.json',
  JSON.stringify(unitCard, null, 2)
);

console.log('\n✅ Twenty Thousand Leagues complete with all content!');
console.log('📚 24 informational texts (with questions)');
console.log('✍️ 12 writing prompts (odd days)');
console.log('📓 12 journal prompts (even days)');
