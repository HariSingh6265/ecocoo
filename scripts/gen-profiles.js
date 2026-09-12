const fs = require('fs');
const path = require('path');

// 1. Generate Profiles
const femaleNames = [
  Elena Rostova, Maya Lin, Aria Thorne, Chloe Dupont, Zoe Cole,
  Sofia Rossi, Amara Diallo, Isla Sterling, Nadia Al-Mansoor, Clara Johansson,
  Yuki Tanaka, Sienna Miller, Camila Fernandez, Harper Davis, Leila Mirzakhani,
  Talia Ben-David, Mila Kunisova, Roxanne Dubois, Priya Sharma, Celeste Moreau,
  Aurora Vance, Scarlett Zhang, Valentina Cruz, Giselle Laurent, Freja Lindqvist
];

const maleNames = [
  Marcus Vance, Julian Rivera, Liam O'Connor, Dr. Ethan Park, Lucas Bennett,
  Gabriel Santos, Kai Takahashi, Mateo Cruz, Oliver Wright, Darius King,
  Tristan Vance, Sebastian Blake, Noah Sterling, Zackary Taylor, Elijah Scott,
  Finnian Gallagher, Harrison Wong, Kasper Lind, Alex Mercer, Owen Montgomery,
  Theo Beaumont, Caleb Hayes, Dante Moretti, Julian Thorne, Leo Bennett
];

const femalePhotos = [
  https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80
];

const malePhotos = [
  https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=80,
  https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80
];

const femaleJobs = [
  UI/UX Designer & Ceramist, Software Engineer & DJ, Environmental Journalist,
  Fashion Stylist & Baker, Astrophysics Researcher, Pastry Chef & Food Blogger,
  Fashion Model & Yoga Teacher, Botanist & Floral Stylist, Human Rights Lawyer,
  Interior Stylist, Audio Engineer & Producer, Fashion Illustrator & Ballerina,
  Choreographer & Salsa Dancer, Book Editor & Podcast Host, Architectural Lighting Designer,
  Sommelier & Travel Writer, Creative Copywriter & Comic, VR Artist & Sculptor,
  AI Ethics Researcher, Perfumer & Botanical Chemist
];

const maleJobs = [
  Architect & Trail Runner, Head Sommelier & Chef, Creative Director & Musician,
  Pediatric Resident & Surfer, Landscape Photographer, Product Manager & Diver,
  Game Developer & 3D Artist, Pilot & Adventure Guide, Craft Brewer & Dog Foster,
  Fintech Founder & Boxer, Astrophysicist & Boulderer, Marine Biologist & Diver,
  Documentary Filmmaker, Personal Trainer & Coach, Venture Partner & Triathlete,
  Woodworker & Artisan, Neurologist & Violinist, Sailboat Captain,
  Game UX Director, Restaurateur & Chef
];

const bios = [
  Obsessed with mid-century modern furniture, matcha lattes, and golden hour film photography. Will trade secret ramen spots for your best playlist.,
  Building skylines by day, running bridges at sunrise. Looking for someone who enjoys rooftop dinners and spontaneous weekend getaways.,
  Writing code in Python, mixing house sets on vinyl. Big believer in 2 AM conversations, spicy tacos, and dogs with silly names.,
  Passionate about natural wines, sourdough starters, and finding the crunchiest pastry in town. I will definitely cook you dinner on date two.,
  Chasing stories and bouldering problems across the globe. Plant parent to 23 succulents. Tell me what book changed your worldview.,
  Singer-songwriter, indie film fanatic, espresso aficionado. I can teach you guitar chords or play you a song under the starlight.,
  French expat living the NYC dream. Obsessed with vintage jackets, strawberry tarts, and gallery openings. Don't be shy, say hi!,
  Healing kids by week, chasing ocean waves on weekends. Seeking someone with a big heart, infectious laugh, and passion for life.,
  Star gazer, marathon runner, and board game geek. I can explain dark matter while beating you at Settlers of Catan.,
  Always got dirt on my hiking boots and a camera around my neck. Let's chase sunrises, camp under the stars, and make memories.
];

const interestPool = [
  Travel, Music, Foodie, Design, Art, Coffee, Photography, Fitness,
  Running, Yoga, Tech, Cooking, Wine Tasting, Cinema, Reading,
  Hiking, Dogs, Gaming, Dancing, Baking, Concerts, Thrifting
];

const promptQuestions = [
  My ideal Sunday looks like...,
  I'll brag about you if...,
  Best travel story...,
  Two truths and a lie...,
  Dating me is like...,
  A life goal of mine...,
  The key to my heart...,
  Green flags I look for...
];

const promptAnswers = [
  Farmer's market run, brewing pour-over coffee, and reading at the park with a cozy blanket.,
  You know how to make homemade pasta or have a favorite secret speakeasy.,
  Got lost on a scooter in Tuscany and stumbled upon an 80-year-old nonna's vineyard feast.,
  I speak three languages, I've designed a skyscraper, and I dislike pizza (guess the lie!).,
  Having VIP access to secret warehouse parties and free tech support forever.,
  Play a sunset set in Ibiza and adopt two golden retrievers.,
  Appreciating a slow-cooked risotto and never saying no to dessert.,
  Being kind to waitstaff and knowing how to make someone feel truly heard.
];

const anthems = [
  { song: Say Yes, artist: Elliott Smith },
  { song: Redbone, artist: Childish Gambino },
  { song: Glue, artist: Bicep },
  { song: La Vie En Rose, artist: Louis Armstrong },
  { song: Dreams, artist: Fleetwood Mac },
  { song: Yellow, artist: Coldplay },
  { song: Midnight City, artist: M83 },
  { song: Golden Hour, artist: JVKE }
];

const zodiacs = [Aries ♈, Taurus ♉, Gemini ♊, Cancer ♋, Leo ♌, Virgo ♍, Libra ♎, Scorpio ♏, Sagittarius ♐, Capricorn ♑, Aquarius ♒, Pisces ♓];
const heights = [5'4", 5'5", 5'6", 5'7", 5'8", 5'9", 5'10", 5'11", 6'0", 6'1", 6'2", 6'3"];
const locations = [Brooklyn, NY, Manhattan, NY, SoHo, NY, West Village, NY, Williamsburg, NY, Chelsea, NY, East Village, NY, Greenpoint, NY, DUMBO, NY, Flatiron, NY];

const profiles = [];
for (let i = 0; i < 48; i++) {
  const isFemale = i % 2 === 0;
  const nameIndex = Math.floor(i / 2) % 25;
  const name = isFemale ? femaleNames[nameIndex] : maleNames[nameIndex];
  const age = 22 + ((i * 3) % 11);
  const photoBase = isFemale ? femalePhotos : malePhotos;
  const p1 = photoBase[i % photoBase.length];
  const p2 = photoBase[(i + 2) % photoBase.length];
  const p3 = photoBase[(i + 4) % photoBase.length];
  const occupation = isFemale ? femaleJobs[i % femaleJobs.length] : maleJobs[i % maleJobs.length];
  const bio = bios[i % bios.length];
  const distanceMiles = ((i * 2 + 1) % 14) + 1;
  const compatibilityScore = 86 + ((i * 7) % 14);
  const zodiac = zodiacs[i % zodiacs.length];
  const height = heights[i % heights.length];
  const anthem = anthems[i % anthems.length];

  const interests = [];
  for (let j = 0; j < 5; j++) {
    const item = interestPool[(i * 3 + j * 2) % interestPool.length];
    if (!interests.includes(item)) interests.push(item);
  }

  const prompt1 = {
    question: promptQuestions[i % promptQuestions.length],
    answer: promptAnswers[i % promptAnswers.length]
  };
  const prompt2 = {
    question: promptQuestions[(i + 3) % promptQuestions.length],
    answer: promptAnswers[(i + 3) % promptAnswers.length]
  };

  profiles.push({
    id: profile-,
    name,
    age,
    gender: isFemale ? female : male,
    occupation,
    companyOrSchool: i % 3 === 0 ? Columbia University : i % 3 === 1 ? Studio Design : Freelance,
    distanceMiles,
    location: locations[i % locations.length],
    bio,
    photos: [p1, p2, p3],
    interests,
    compatibilityScore,
    verified: i % 4 !== 0,
    zodiac,
    height,
    lookingFor: i % 2 === 0 ? Long-term relationship : Dating & fun vibes,
    drinking: i % 3 === 0 ? Socially : Wine enthusiast,
    workout: Active 3-5x week,
    prompts: [prompt1, prompt2],
    anthem,
    activeNow: i % 3 !== 2
  });
}

fs.writeFileSync(
  path.join(__dirname, '../src/data/mockProfiles.ts'),
  import { Profile } from @/types/sparkmatch;\n\nexport const initialProfiles: Profile[] = ;\n,
  'utf8'
);

console.log('mockProfiles.ts generated successfully');
