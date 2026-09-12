import { Profile } from "@/types/sparkmatch";

export const initialProfiles: Profile[] = [
  {
    id: "p1",
    name: "Elena Rostova",
    age: 25,
    gender: "female",
    occupation: "UI/UX Designer & Ceramist",
    companyOrSchool: "Studio Forma",
    distanceMiles: 2,
    location: "Brooklyn, NY",
    bio: "Obsessed with mid-century modern furniture, matcha lattes, and golden hour film photography. Will trade secret ramen spots for your best playlist.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Design", "Art", "Coffee", "Photography", "Pottery", "Indie Music"],
    compatibilityScore: 98,
    verified: true,
    zodiac: "Taurus ♉",
    height: "5'7\"",
    lookingFor: "Long-term relationship",
    drinking: "Socially",
    workout: "Pilates 3x a week",
    prompts: [
      { question: "My ideal Sunday looks like...", answer: "Farmer's market run, brewing pour-over coffee, and reading at Prospect Park with a blanket." },
      { question: "I'll brag about you if...", answer: "You know how to make homemade pasta or have a favorite hidden cocktail speakeasy." }
    ],
    anthem: { song: "Say Yes", artist: "Elliott Smith" },
    activeNow: true
  },
  {
    id: "p2",
    name: "Marcus Vance",
    age: 28,
    gender: "male",
    occupation: "Architect & Trail Runner",
    companyOrSchool: "Foster + Partners",
    distanceMiles: 4,
    location: "Manhattan, NY",
    bio: "Building skylines by day, running bridges at sunrise. Looking for someone who enjoys rooftop dinners, museum wanders, and spontaneous road trips.",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Architecture", "Running", "Travel", "Wine Tasting", "Jazz", "Cooking"],
    compatibilityScore: 94,
    verified: true,
    zodiac: "Libra ♎",
    height: "6'1\"",
    lookingFor: "Something meaningful",
    drinking: "Wine enthusiast",
    workout: "Daily runner",
    prompts: [
      { question: "Best travel story...", answer: "Got lost on a scooter in the hills of Tuscany and stumbled upon an 80-year-old nonna's vineyard feast." },
      { question: "Two truths and a lie...", answer: "I speak French, I've designed a skyscraper, I hate pizza." }
    ],
    anthem: { song: "Redbone", artist: "Childish Gambino" },
    activeNow: true
  },
  {
    id: "p3",
    name: "Maya Lin",
    age: 24,
    gender: "female",
    occupation: "Software Engineer & DJ",
    companyOrSchool: "Spotify",
    distanceMiles: 1,
    location: "SoHo, NY",
    bio: "Writing code in Python, mixing house sets on vinyl. Big believer in 2 AM conversations, spicy tacos, and dogs with silly names.",
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Tech", "Electronic Music", "Tacos", "Vinyl", "Gaming", "Yoga"],
    compatibilityScore: 96,
    verified: true,
    zodiac: "Scorpio ♏",
    height: "5'5\"",
    lookingFor: "Dating & fun vibes",
    drinking: "Only tequila & seltzers",
    workout: "Clubbing & Pilates",
    prompts: [
      { question: "Dating me is like...", answer: "Having VIP access to secret underground warehouse parties and free tech support forever." },
      { question: "A life goal of mine...", answer: "Play a sunset set in Ibiza and adopt two golden retrievers." }
    ],
    anthem: { song: "Glue", artist: "Bicep" },
    activeNow: true
  },
  {
    id: "p4",
    name: "Julian Rivera",
    age: 27,
    gender: "male",
    occupation: "Head Sommelier & Chef",
    companyOrSchool: "L'Ami Jean",
    distanceMiles: 3,
    location: "West Village, NY",
    bio: "Passionate about natural wines, sourdough starters, and finding the crunchiest pastry in town. I will definitely cook you dinner on date two.",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Foodie", "Cooking", "Wine", "Baking", "Travel", "Cinema"],
    compatibilityScore: 91,
    verified: true,
    zodiac: "Leo ♌",
    height: "5'11\"",
    lookingFor: "Long-term love",
    drinking: "Natural wine only",
    workout: "Kitchen cardio",
    prompts: [
      { question: "The key to my heart...", answer: "Appreciating a slow-cooked risotto and never saying no to dessert." }
    ],
    anthem: { song: "La Vie En Rose", artist: "Louis Armstrong" },
    activeNow: false
  },
  {
    id: "p5",
    name: "Aria Thorne",
    age: 26,
    gender: "female",
    occupation: "Environmental Journalist & Climber",
    companyOrSchool: "National Geographic",
    distanceMiles: 5,
    location: "Williamsburg, NY",
    bio: "Chasing stories and bouldering problems across the globe. Plant mom to 23 succulents. Tell me what book changed your worldview.",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Hiking", "Climbing", "Reading", "Sustainability", "Documentaries", "Plants"],
    compatibilityScore: 92,
    verified: true,
    zodiac: "Aquarius ♒",
    height: "5'8\"",
    lookingFor: "Adventure partner",
    drinking: "Occasionally",
    workout: "Bouldering & trail runs",
    prompts: [
      { question: "Teach me something about...", answer: "The cosmos, obscure history, or how you make your secret comfort meal." }
    ],
    anthem: { song: "Dreams", artist: "Fleetwood Mac" },
    activeNow: true
  },
  {
    id: "p6",
    name: "Liam O'Connor",
    age: 29,
    gender: "male",
    occupation: "Creative Director & Musician",
    companyOrSchool: "Vanguard Studios",
    distanceMiles: 3,
    location: "Chelsea, NY",
    bio: "Singer-songwriter, indie film fanatic, espresso aficionado. I can teach you guitar chords or play you a song under starlight.",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Music", "Guitar", "Cinema", "Coffee", "Writing", "Concerts"],
    compatibilityScore: 95,
    verified: true,
    zodiac: "Pisces ♓",
    height: "6'0\"",
    lookingFor: "Long-term relationship",
    drinking: "Socially",
    workout: "Boxing & Cycling",
    prompts: [
      { question: "First date idea...", answer: "Late night jazz bar in Greenwich Village followed by warm insomnia cookies." }
    ],
    anthem: { song: "Yellow", artist: "Coldplay" },
    activeNow: true
  },
  {
    id: "p7",
    name: "Chloe Dupont",
    age: 23,
    gender: "female",
    occupation: "Fashion Stylist & Baker",
    companyOrSchool: "Vogue Paris (Alum)",
    distanceMiles: 2,
    location: "East Village, NY",
    bio: "French expat living her NYC dream. Obsessed with vintage jackets, strawberry tarts, and gallery openings. Don't be shy, say hi!",
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Fashion", "Baking", "Art", "Travel", "Museums", "Thrifting"],
    compatibilityScore: 89,
    verified: false,
    zodiac: "Gemini ♊",
    height: "5'6\"",
    lookingFor: "Someone romantic",
    drinking: "Champagne & Rosé",
    workout: "Ballet Barre",
    prompts: [
      { question: "My most controversial opinion...", answer: "Croissants outside Paris are actually decent if you know where to look." }
    ],
    anthem: { song: "Midnight City", artist: "M83" },
    activeNow: true
  },
  {
    id: "p8",
    name: "Dr. Ethan Park",
    age: 30,
    gender: "male",
    occupation: "Pediatric Resident & Surfer",
    companyOrSchool: "NYU Langone Health",
    distanceMiles: 6,
    location: "Gramercy, NY",
    bio: "Healing kids by week, chasing ocean waves on weekends. Seeking someone with big heart, infectious laugh, and passion for life.",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Medicine", "Surfing", "Dogs", "Volunteering", "Fitness", "Reading"],
    compatibilityScore: 97,
    verified: true,
    zodiac: "Virgo ♍",
    height: "6'2\"",
    lookingFor: "Life partner",
    drinking: "Moderation",
    workout: "Surfing & Gym",
    prompts: [
      { question: "Green flags I look for...", answer: "Being kind to waitstaff and knowing how to make someone feel truly heard." }
    ],
    anthem: { song: "Golden Hour", artist: "JVKE" },
    activeNow: false
  },
  {
    id: "p9",
    name: "Zoe Cole",
    age: 26,
    gender: "female",
    occupation: "Astrophysics Researcher & Triathlete",
    companyOrSchool: "Columbia University",
    distanceMiles: 4,
    location: "Upper West Side, NY",
    bio: "Star gazer, marathon runner, and board game geek. I can explain dark matter while beating you in Catan.",
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Astronomy", "Board Games", "Running", "Science", "Anime", "Boba"],
    compatibilityScore: 93,
    verified: true,
    zodiac: "Sagittarius ♐",
    height: "5'9\"",
    lookingFor: "A deep connection",
    drinking: "Socially",
    workout: "Marathon training",
    prompts: [
      { question: "I get irrationally excited about...", answer: "New James Webb Space Telescope discoveries and late night drive-thru boba." }
    ],
    anthem: { song: "Starman", artist: "David Bowie" },
    activeNow: true
  },
  {
    id: "p10",
    name: "Lucas Bennett",
    age: 28,
    gender: "male",
    occupation: "Landscape Photographer",
    companyOrSchool: "Freelance / Patagonia",
    distanceMiles: 7,
    location: "DUMBO, Brooklyn",
    bio: "Always got dirt on my hiking boots and a camera around my neck. Let's chase sunrises, camp under the stars, and make memories.",
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Photography", "Camping", "Hiking", "Vanlife", "Dogs", "Acoustic"],
    compatibilityScore: 90,
    verified: true,
    zodiac: "Aries ♈",
    height: "6'1\"",
    lookingFor: "Long-term relationship",
    drinking: "Craft Beer & Whiskey",
    workout: "Outdoor hiking",
    prompts: [
      { question: "My favorite place in the world...", answer: "Yosemite Valley at first snowfall or Norway's Lofoten Islands." }
    ],
    anthem: { song: "Ophelia", artist: "The Lumineers" },
    activeNow: true
  },
  {
    id: "p11",
    name: "Sofia Rossi",
    age: 25,
    gender: "female",
    occupation: "Pastry Chef & Food Blogger",
    companyOrSchool: "Dulce Bakery",
    distanceMiles: 1,
    location: "Little Italy, NY",
    bio: "I express love through freshly baked pain au chocolat and tiramisu. Swipe right if you love food tours and dog cuddles.",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Foodie", "Baking", "Italian Cuisine", "Dogs", "Travel", "Dance"],
    compatibilityScore: 95,
    verified: true,
    zodiac: "Cancer ♋",
    height: "5'4\"",
    lookingFor: "Relationship",
    drinking: "Aperol Spritz always",
    workout: "Salsa & Barre",
    prompts: [
      { question: "Never have I ever...", answer: "Turned down pasta, even at 3 AM." }
    ],
    anthem: { song: "As It Was", artist: "Harry Styles" },
    activeNow: true
  },
  {
    id: "p12",
    name: "Gabriel Santos",
    age: 29,
    gender: "male",
    occupation: "Product Manager & Scuba Diver",
    companyOrSchool: "Fintech Startup",
    distanceMiles: 5,
    location: "Tribeca, NY",
    bio: "Tech strategist by day, ocean explorer whenever I can get away. Looking for a partner in crime for weekend brunches and international flights.",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Tech", "Scuba Diving", "Startups", "Brunch", "Fitness", "Sailing"],
    compatibilityScore: 88,
    verified: true,
    zodiac: "Capricorn ♑",
    height: "6'0\"",
    lookingFor: "Long-term relationship",
    drinking: "Socially",
    workout: "CrossFit 4x week",
    prompts: [
      { question: "My simple pleasures...", answer: "Fresh espresso, cold ocean plunges, and perfectly organized calendar invites." }
    ],
    anthem: { song: "Levitating", artist: "Dua Lipa" },
    activeNow: true
  },
  {
    id: "p13",
    name: "Amara Diallo",
    age: 27,
    gender: "female",
    occupation: "Fashion Model & Yoga Instructor",
    companyOrSchool: "Elite Models",
    distanceMiles: 2,
    location: "SoHo, NY",
    bio: "Spreading good energy and mindfulness. Passionate about plant-based food, sound baths, Afrobeat music, and sunset rooftops.",
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Yoga", "Fashion", "Afrobeat", "Meditation", "Travel", "Art"],
    compatibilityScore: 97,
    verified: true,
    zodiac: "Libra ♎",
    height: "5'11\"",
    lookingFor: "Something genuine",
    drinking: "Kombucha & Mocktails",
    workout: "Daily Vinyasa Yoga",
    prompts: [
      { question: "The hallmark of a great match...", answer: "Effortless conversation where 4 hours feels like 15 minutes." }
    ],
    anthem: { song: "Essence", artist: "Wizkid ft. Tems" },
    activeNow: true
  },
  {
    id: "p14",
    name: "Kai Takahashi",
    age: 26,
    gender: "male",
    occupation: "Game Developer & Anime Artist",
    companyOrSchool: "Riot Games",
    distanceMiles: 3,
    location: "Astoria, Queens",
    bio: "Building magical virtual worlds. When not at my desk, you will find me scouring vintage arcades, cooking tonkotsu broth, or playing bass.",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Gaming", "Anime", "Bass Guitar", "Cooking", "VR/AR", "Sci-Fi"],
    compatibilityScore: 91,
    verified: true,
    zodiac: "Taurus ♉",
    height: "5'10\"",
    lookingFor: "Dating / Relationship",
    drinking: "Japanese Whiskey & Sake",
    workout: "Rock Climbing",
    prompts: [
      { question: "Together, we could...", answer: "Co-op through Elden Ring or explore Tokyo's hidden retro alleys." }
    ],
    anthem: { song: "Gurenge", artist: "LiSA" },
    activeNow: false
  },
  {
    id: "p15",
    name: "Isla Sterling",
    age: 24,
    gender: "female",
    occupation: "Botanist & Floral Stylist",
    companyOrSchool: "Botanica Blooms",
    distanceMiles: 3,
    location: "Greenpoint, NY",
    bio: "Flowers are my love language. I love vintage thrift finds, flea markets, 80s synth-pop, and making homemade strawberry jam.",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Gardening", "Plants", "Thrifting", "Vintage", "Cooking", "Indie Pop"],
    compatibilityScore: 93,
    verified: true,
    zodiac: "Pisces ♓",
    height: "5'6\"",
    lookingFor: "Long term",
    drinking: "Socially",
    workout: "Gardening & Walking",
    prompts: [
      { question: "My superpower...", answer: "Reviving any dying houseplant and spotting the best flea market deals." }
    ],
    anthem: { song: "Bloom", artist: "The Paper Kites" },
    activeNow: true
  },
  {
    id: "p16",
    name: "Mateo Cruz",
    age: 28,
    gender: "male",
    occupation: "Pilot & Adventure Guide",
    companyOrSchool: "SkyWest Airlines",
    distanceMiles: 8,
    location: "Long Island City, NY",
    bio: "Taking off into sunsets. When I am grounded, you will catch me salsa dancing, trying street food, or planning the next backcountry trek.",
    photos: [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Aviation", "Salsa", "Travel", "Adventure", "Street Food", "Hiking"],
    compatibilityScore: 89,
    verified: true,
    zodiac: "Sagittarius ♐",
    height: "6'2\"",
    lookingFor: "Adventure partner",
    drinking: "Rum & Cocktails",
    workout: "Calisthenics & Swimming",
    prompts: [
      { question: "Best first date...", answer: "Sunset drinks overlooking the runway followed by spontaneous Latin dancing." }
    ],
    anthem: { song: "Dákiti", artist: "Bad Bunny" },
    activeNow: true
  },
  {
    id: "p17",
    name: "Nadia Al-Mansoor",
    age: 27,
    gender: "female",
    occupation: "Human Rights Lawyer",
    companyOrSchool: "Amnesty International",
    distanceMiles: 4,
    location: "Midtown, NY",
    bio: "Fighting for justice in courtroom by day, bingeing fantasy novels and dark chocolate by night. Fluent in Arabic, French, and sarcasm.",
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Human Rights", "Books", "Debate", "Coffee", "Cinema", "Languages"],
    compatibilityScore: 96,
    verified: true,
    zodiac: "Scorpio ♏",
    height: "5'7\"",
    lookingFor: "Equal partnership",
    drinking: "Cabernet Sauvignon",
    workout: "HIIT & Swimming",
    prompts: [
      { question: "My love language...", answer: "Intellectual banter, shared laughter, and bringing me unexpected iced coffee." }
    ],
    anthem: { song: "Feeling Good", artist: "Nina Simone" },
    activeNow: true
  },
  {
    id: "p18",
    name: "Oliver Wright",
    age: 26,
    gender: "male",
    occupation: "Craft Brewer & Dog Foster",
    companyOrSchool: "Other Half Brewing",
    distanceMiles: 2,
    location: "Gowanus, Brooklyn",
    bio: "Currently fostering a very goofy golden retriever named Waffles. If you like sour beers, trivia nights, and dog park dates, we will get along.",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Dogs", "Craft Beer", "Trivia", "Board Games", "Barbecue", "Comedy"],
    compatibilityScore: 92,
    verified: false,
    zodiac: "Cancer ♋",
    height: "5'11\"",
    lookingFor: "Long-term love",
    drinking: "IPA & Stout lover",
    workout: "Dog walks & biking",
    prompts: [
      { question: "Meet my plus one...", answer: "Waffles the golden retriever, who will judge your vibe immediately." }
    ],
    anthem: { song: "Budapest", artist: "George Ezra" },
    activeNow: true
  },
  {
    id: "p19",
    name: "Clara Johansson",
    age: 25,
    gender: "female",
    occupation: "Interior Stylist & Ceramist",
    companyOrSchool: "Stockholm / NYC",
    distanceMiles: 3,
    location: "Nolita, NY",
    bio: "Scandinavian minimalist with a maximalist love for cinnamon buns, antique mirrors, and cozy candlelit dinners. Let's make art together.",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Design", "Ceramics", "Architecture", "Fika", "Coffee", "Music"],
    compatibilityScore: 94,
    verified: true,
    zodiac: "Virgo ♍",
    height: "5'8\"",
    lookingFor: "Meaningful relationship",
    drinking: "Natural wines",
    workout: "Reformer Pilates",
    prompts: [
      { question: "The ideal fika date...", answer: "Fresh cardamom buns, dark roast filter coffee, and deep life talk." }
    ],
    anthem: { song: "Holocene", artist: "Bon Iver" },
    activeNow: true
  },
  {
    id: "p20",
    name: "Darius King",
    age: 30,
    gender: "male",
    occupation: "Fintech Founder & Boxer",
    companyOrSchool: "Pulse Capital",
    distanceMiles: 4,
    location: "Battery Park, NY",
    bio: "Building the future of personal wealth. Outside work, I train in Muay Thai, collect modern art, and cook incredible steak.",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Fintech", "Boxing", "Art", "Steak", "Chess", "Fitness"],
    compatibilityScore: 87,
    verified: true,
    zodiac: "Leo ♌",
    height: "6'3\"",
    lookingFor: "Ambitious partner",
    drinking: "Bourbon on the rocks",
    workout: "Muay Thai & Lifting",
    prompts: [
      { question: "A goal for this year...", answer: "Angel invest in 3 sustainable startups and travel to Japan." }
    ],
    anthem: { song: "Starboy", artist: "The Weeknd" },
    activeNow: true
  },
  {
    id: "p21",
    name: "Yuki Tanaka",
    age: 26,
    gender: "female",
    occupation: "Audio Engineer & Producer",
    companyOrSchool: "Electric Lady Studios",
    distanceMiles: 2,
    location: "Greenwich Village, NY",
    bio: "Capturing soundscapes and mixing album records. Obsessed with retro synths, matcha ice cream, and spontaneous midnight bike rides.",
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Music Production", "Synths", "Matcha", "Cycling", "Vinyl", "Gaming"],
    compatibilityScore: 96,
    verified: true,
    zodiac: "Aquarius ♒",
    height: "5'5\"",
    lookingFor: "Creative soulmate",
    drinking: "Japanese craft beers",
    workout: "Night cycling",
    prompts: [
      { question: "Send me...", answer: "Your top 3 songs of all time and why they give you goosebumps." }
    ],
    anthem: { song: "Stay with Me", artist: "Miki Matsubara" },
    activeNow: true
  },
  {
    id: "p22",
    name: "Tristan Vance",
    age: 27,
    gender: "male",
    occupation: "Astrophysicist & Climber",
    companyOrSchool: "Hayden Planetarium",
    distanceMiles: 3,
    location: "Upper West Side, NY",
    bio: "Mapping the stars while clinging to rock faces. Searching for someone to share telescopes, campfire tales, and strong morning coffee.",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Astronomy", "Climbing", "Coffee", "Sci-Fi", "Camping", "Physics"],
    compatibilityScore: 93,
    verified: true,
    zodiac: "Gemini ♊",
    height: "6'0\"",
    lookingFor: "Long-term partnership",
    drinking: "Whiskey & Porter",
    workout: "Bouldering 4x/week",
    prompts: [
      { question: "Did you know...", answer: "There are more stars in the universe than grains of sand on all Earth beaches." }
    ],
    anthem: { song: "Space Oddity", artist: "David Bowie" },
    activeNow: true
  },
  {
    id: "p23",
    name: "Sienna Miller",
    age: 24,
    gender: "female",
    occupation: "Fashion Illustrator & Ballerina",
    companyOrSchool: "Parsons School of Design",
    distanceMiles: 1,
    location: "Flatiron, NY",
    bio: "Dancing through life on pointe shoes. Passionate about silk watercolors, French cinema, and hunting for the dreamiest chocolate croissant.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Ballet", "Fashion", "Illustration", "French Cinema", "Pastries", "Coffee"],
    compatibilityScore: 97,
    verified: true,
    zodiac: "Taurus ♉",
    height: "5'6\"",
    lookingFor: "Romantic fairytale",
    drinking: "Socially",
    workout: "Ballet & Yoga",
    prompts: [
      { question: "I fall for someone who...", answer: "Knows how to slow dance in a living room when good music comes on." }
    ],
    anthem: { song: "Lover", artist: "Taylor Swift" },
    activeNow: true
  },
  {
    id: "p24",
    name: "Sebastian Blake",
    age: 29,
    gender: "male",
    occupation: "Marine Biologist & Free Diver",
    companyOrSchool: "Wildlife Conservation Society",
    distanceMiles: 5,
    location: "Coney Island / DUMBO",
    bio: "Can hold my breath for 4 minutes underwater. On land, I cook killer paella, play the cello, and rescue injured sea animals.",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Marine Biology", "Diving", "Cello", "Cooking", "Ocean", "Wildlife"],
    compatibilityScore: 92,
    verified: true,
    zodiac: "Pisces ♓",
    height: "6'2\"",
    lookingFor: "Deep connection",
    drinking: "Only on special occasions",
    workout: "Swimming & Freediving",
    prompts: [
      { question: "Best travel adventure...", answer: "Swimming alongside humpback whales in French Polynesia." }
    ],
    anthem: { song: "Ocean Eyes", artist: "Billie Eilish" },
    activeNow: true
  },
  {
    id: "p25",
    name: "Camila Fernandez",
    age: 26,
    gender: "female",
    occupation: "Choreographer & Latin Dancer",
    companyOrSchool: "Alvin Ailey Dance Theater",
    distanceMiles: 2,
    location: "Washington Heights, NY",
    bio: "Life is better when you are dancing salsa, bachata, or reggaeton. Let's trade favorite street food spots and laugh until our ribs hurt.",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Dance", "Salsa", "Bachata", "Latin Music", "Foodie", "Fitness"],
    compatibilityScore: 95,
    verified: true,
    zodiac: "Leo ♌",
    height: "5'7\"",
    lookingFor: "Fun & chemistry",
    drinking: "Mojitos & Sangria",
    workout: "Dancing 5 hours daily",
    prompts: [
      { question: "I will teach you...", answer: "How to dance salsa even if you swear you have two left feet!" }
    ],
    anthem: { song: "Despacito", artist: "Luis Fonsi" },
    activeNow: true
  },
  {
    id: "p26",
    name: "Noah Sterling",
    age: 28,
    gender: "male",
    occupation: "Documentary Filmmaker",
    companyOrSchool: "Vice Media",
    distanceMiles: 3,
    location: "Bushwick, Brooklyn",
    bio: "Telling stories of underground subcultures worldwide. When home, I make woodfire pizza in the backyard and listen to jazz records.",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Filmmaking", "Documentaries", "Pizza", "Jazz", "Vinyl", "Cinema"],
    compatibilityScore: 90,
    verified: true,
    zodiac: "Sagittarius ♐",
    height: "6'1\"",
    lookingFor: "Long-term relationship",
    drinking: "Mezcal & Craft Beers",
    workout: "Running & Yoga",
    prompts: [
      { question: "Favorite movie soundtrack...", answer: "Interstellar by Hans Zimmer or In the Mood for Love." }
    ],
    anthem: { song: "Take Five", artist: "Dave Brubeck" },
    activeNow: false
  },
  {
    id: "p27",
    name: "Harper Davis",
    age: 25,
    gender: "female",
    occupation: "Book Editor & Podcast Host",
    companyOrSchool: "Penguin Random House",
    distanceMiles: 2,
    location: "Greenwich Village, NY",
    bio: "Living surrounded by stacks of novels, cozy knit sweaters, and Earl Grey tea. Let's debate plot twists and visit the Strand bookstore.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Books", "Podcasts", "Literature", "Tea", "Cats", "Indie Cinema"],
    compatibilityScore: 94,
    verified: true,
    zodiac: "Virgo ♍",
    height: "5'5\"",
    lookingFor: "Deep romantic connection",
    drinking: "Earl Grey by day, Pinot Noir by night",
    workout: "Long city walks",
    prompts: [
      { question: "My favorite book quote...", answer: "Whatever our souls are made of, his and mine are the same." }
    ],
    anthem: { song: "Cardigan", artist: "Taylor Swift" },
    activeNow: true
  },
  {
    id: "p28",
    name: "Zackary Taylor",
    age: 27,
    gender: "male",
    occupation: "Personal Trainer & Nutritionist",
    companyOrSchool: "Equinox",
    distanceMiles: 4,
    location: "Meatpacking District, NY",
    bio: "Helping people reach their peak physical and mental potential. Big fan of hearty protein bowls, beach volleyball, and puppy cuddles.",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Fitness", "Nutrition", "Beach Volleyball", "Dogs", "Health", "Cooking"],
    compatibilityScore: 89,
    verified: true,
    zodiac: "Aries ♈",
    height: "6'2\"",
    lookingFor: "Fitness & life buddy",
    drinking: "Rarely",
    workout: "Lifting 6x/week",
    prompts: [
      { question: "A healthy habit I swear by...", answer: "10-minute morning cold shower followed by 10 minutes of gratitude journaling." }
    ],
    anthem: { song: "Can't Hold Us", artist: "Macklemore" },
    activeNow: true
  },
  {
    id: "p29",
    name: "Leila Mirzakhani",
    age: 26,
    gender: "female",
    occupation: "Architectural Lighting Designer",
    companyOrSchool: "Leni Design Lab",
    distanceMiles: 3,
    location: "SoHo, NY",
    bio: "I shape how spaces feel with light and shadow. Love museum late nights, Persian rice tahdig, indie rock concerts, and pottery studio dates.",
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Design", "Architecture", "Persian Food", "Rock Music", "Pottery", "Art"],
    compatibilityScore: 97,
    verified: true,
    zodiac: "Cancer ♋",
    height: "5'7\"",
    lookingFor: "Long-term relationship",
    drinking: "Socially",
    workout: "Pilates & cycling",
    prompts: [
      { question: "I will make for you...", answer: "Crispy saffron tahdig that will change your standard for home-cooked food forever." }
    ],
    anthem: { song: "Sweet Disposition", artist: "The Temper Trap" },
    activeNow: true
  },
  {
    id: "p30",
    name: "Elijah Scott",
    age: 29,
    gender: "male",
    occupation: "Venture Capitalist & Triathlete",
    companyOrSchool: "Bessemer Venture Partners",
    distanceMiles: 4,
    location: "Flatiron, NY",
    bio: "Investing in climate tech and AI healthcare startups. Weekend ironman triathlete. Let's grab cold brew and talk about big ideas.",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Tech", "Startups", "Triathlon", "Climate", "Coffee", "Economics"],
    compatibilityScore: 91,
    verified: true,
    zodiac: "Capricorn ♑",
    height: "6'1\"",
    lookingFor: "Life partner",
    drinking: "Fine wines & Scotch",
    workout: "Ironman training",
    prompts: [
      { question: "My most controversial opinion...", answer: "Emails sent after 7 PM should be forbidden by law." }
    ],
    anthem: { song: "Midnight City", artist: "M83" },
    activeNow: false
  },
  {
    id: "p31",
    name: "Talia Ben-David",
    age: 25,
    gender: "female",
    occupation: "Sommelier & Travel Writer",
    companyOrSchool: "Bon Appétit",
    distanceMiles: 2,
    location: "West Village, NY",
    bio: "Have visited 34 countries and counting. Passionate about Mediterranean tapas, olive oil tasting, and spontaneous weekend getaways to upstate cabins.",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Travel", "Wine", "Foodie", "Writing", "Mediterranean", "Languages"],
    compatibilityScore: 95,
    verified: true,
    zodiac: "Sagittarius ♐",
    height: "5'6\"",
    lookingFor: "Adventurous soulmate",
    drinking: "Sommelier level wine",
    workout: "Swimming & Hiking",
    prompts: [
      { question: "Next passport stamp...", answer: "San Sebastián, Spain for pintxos bar crawling!" }
    ],
    anthem: { song: "Watermelon Sugar", artist: "Harry Styles" },
    activeNow: true
  },
  {
    id: "p32",
    name: "Finnian Gallagher",
    age: 28,
    gender: "male",
    occupation: "Woodworker & Custom Furniture Maker",
    companyOrSchool: "Red Hook Timberworks",
    distanceMiles: 4,
    location: "Red Hook, Brooklyn",
    bio: "Handcrafting walnut dining tables and bespoke furniture. Love dogs, vinyl records, campfires, and old-school rock and roll.",
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Woodworking", "Design", "Dogs", "Campfires", "Rock Music", "Beer"],
    compatibilityScore: 93,
    verified: true,
    zodiac: "Taurus ♉",
    height: "6'3\"",
    lookingFor: "Long-term relationship",
    drinking: "Guinness & Stout",
    workout: "Physical workshop labor",
    prompts: [
      { question: "I will make something for you...", answer: "A custom cutting board or bedside table engraved with your initials." }
    ],
    anthem: { song: "Harvest Moon", artist: "Neil Young" },
    activeNow: true
  },
  {
    id: "p33",
    name: "Mila Kunisova",
    age: 26,
    gender: "female",
    occupation: "Creative Copywriter & Standup Comic",
    companyOrSchool: "Wieden+Kennedy",
    distanceMiles: 1,
    location: "East Village, NY",
    bio: "I write witty ads and do open mics at Comedy Cellar. Looking for someone who can match my banter and doesn't mind being the punchline of a loving joke.",
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Comedy", "Standup", "Writing", "Trivia", "Podcasts", "Pizza"],
    compatibilityScore: 98,
    verified: true,
    zodiac: "Gemini ♊",
    height: "5'5\"",
    lookingFor: "Someone who makes me laugh",
    drinking: "Gin & Tonic",
    workout: "Laughing & Walking",
    prompts: [
      { question: "Best first date...", answer: "Grabbing slice of Joe's Pizza and catching surprise sets at the Comedy Cellar." }
    ],
    anthem: { song: "Supercut", artist: "Lorde" },
    activeNow: true
  },
  {
    id: "p34",
    name: "Harrison Wong",
    age: 30,
    gender: "male",
    occupation: "Neurologist & Violinist",
    companyOrSchool: "Mount Sinai Hospital",
    distanceMiles: 3,
    location: "Upper East Side, NY",
    bio: "Studying human consciousness and performing in amateur string quartets. Looking for warmth, kindness, and someone to share Lincoln Center tickets.",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Classical Music", "Violin", "Science", "Medicine", "Opera", "Reading"],
    compatibilityScore: 94,
    verified: true,
    zodiac: "Virgo ♍",
    height: "5'11\"",
    lookingFor: "Life partner",
    drinking: "Socially",
    workout: "Swimming & Tennis",
    prompts: [
      { question: "My ideal weekend...", answer: "Saturday morning farmers market, rehearsing Bach, and cooking pasta with a glass of Chianti." }
    ],
    anthem: { song: "Clair de Lune", artist: "Claude Debussy" },
    activeNow: true
  },
  {
    id: "p35",
    name: "Roxanne Dubois",
    age: 24,
    gender: "female",
    occupation: "Virtual Reality Artist & Sculptor",
    companyOrSchool: "New Museum Lab",
    distanceMiles: 2,
    location: "Lower East Side, NY",
    bio: "Blending 3D immersive worldbuilding with traditional bronze sculpting. Love cyberpunk aesthetics, night drives, and hot ramen on rainy days.",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["VR/AR", "3D Art", "Sculpture", "Ramen", "Cyberpunk", "Tech"],
    compatibilityScore: 92,
    verified: true,
    zodiac: "Scorpio ♏",
    height: "5'8\"",
    lookingFor: "Dating / Relationship",
    drinking: "Cocktails & Boba",
    workout: "Virtual reality gaming & boxing",
    prompts: [
      { question: "What I bring to the table...", answer: "Immense creative energy, headset gaming dates, and killer ramen spot recommendations." }
    ],
    anthem: { song: "Resonance", artist: "HOME" },
    activeNow: true
  },
  {
    id: "p36",
    name: "Kasper Lind",
    age: 28,
    gender: "male",
    occupation: "Sailboat Captain & Windsurfer",
    companyOrSchool: "Manhattan Sailing Club",
    distanceMiles: 5,
    location: "Battery Park / North Cove",
    bio: "Born on the Baltic Sea, now sailing the Hudson. If you love sunset cruises, salt breeze, seafood grills, and acoustic playlists, jump aboard.",
    photos: [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Sailing", "Surfing", "Seafood", "Ocean", "Travel", "Acoustic"],
    compatibilityScore: 90,
    verified: true,
    zodiac: "Aquarius ♒",
    height: "6'2\"",
    lookingFor: "Adventure partner",
    drinking: "Beer & Rum",
    workout: "Sailing & Swimming",
    prompts: [
      { question: "Our first date could be...", answer: "Private sunset boat ride around the Statue of Liberty with wine and charcuterie." }
    ],
    anthem: { song: "Beyond", artist: "Leon Bridges" },
    activeNow: true
  },
  {
    id: "p37",
    name: "Priya Sharma",
    age: 27,
    gender: "female",
    occupation: "AI Ethics Researcher & Bharatanatyam Dancer",
    companyOrSchool: "NYU Center for Data Science",
    distanceMiles: 3,
    location: "Gramercy, NY",
    bio: "Pondering ethical AI while keeping centuries-old Indian classical dance traditions alive. Big fan of chai, museum exhibits, and witty puns.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["AI Ethics", "Classical Dance", "Chai", "Museums", "Debate", "Literature"],
    compatibilityScore: 97,
    verified: true,
    zodiac: "Libra ♎",
    height: "5'6\"",
    lookingFor: "Equal partnership",
    drinking: "Socially",
    workout: "Dance & Yoga",
    prompts: [
      { question: "The secret to my heart...", answer: "Making a truly authentic masala chai from scratch and sharing book recommendations." }
    ],
    anthem: { song: "Agar Tum Saath Ho", artist: "Arijit Singh" },
    activeNow: true
  },
  {
    id: "p38",
    name: "Alex Mercer",
    age: 28,
    gender: "male",
    occupation: "Game UX Director & Indie Developer",
    companyOrSchool: "Epic Games",
    distanceMiles: 3,
    location: "DUMBO, Brooklyn",
    bio: "Obsessed with creating emotional experiences in video games. Love synthwave music, specialty pour-over coffee, and cute dogs.",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Gaming", "Coffee", "Tech", "Synthwave", "Dogs", "Design"],
    compatibilityScore: 93,
    verified: true,
    zodiac: "Aries ♈",
    height: "6'0\"",
    lookingFor: "Long-term relationship",
    drinking: "Craft Beer & Cocktails",
    workout: "Gym & Cycling",
    prompts: [
      { question: "I will never get tired of...", answer: "A great story, whether in a movie, video game, or over a candlelit date." }
    ],
    anthem: { song: "Midnight City", artist: "M83" },
    activeNow: true
  },
  {
    id: "p39",
    name: "Celeste Moreau",
    age: 25,
    gender: "female",
    occupation: "Astrologer & Perfumer",
    companyOrSchool: "Maison Celeste",
    distanceMiles: 2,
    location: "West Village, NY",
    bio: "Creating bespoke botanical fragrances aligned with birth charts. Let me guess your moon and rising sign on our first drink.",
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Astrology", "Perfume", "Botanicals", "Tarot", "Candles", "Music"],
    compatibilityScore: 91,
    verified: true,
    zodiac: "Scorpio ♏",
    height: "5'7\"",
    lookingFor: "Cosmic connection",
    drinking: "Natural wine & herbal cocktails",
    workout: "Pilates",
    prompts: [
      { question: "I can tell if we click within...", answer: "5 minutes of hearing what songs move your spirit." }
    ],
    anthem: { song: "Cosmic Love", artist: "Florence + The Machine" },
    activeNow: true
  },
  {
    id: "p40",
    name: "Owen Montgomery",
    age: 31,
    gender: "male",
    occupation: "Restaurateur & Sommelier",
    companyOrSchool: "Osteria Brooklyn",
    distanceMiles: 1,
    location: "Cobble Hill, Brooklyn",
    bio: "Opening neighborhood dining spots where people fall in love over handmade tagliatelle and great Barolo. Looking for someone genuine and kind.",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Foodie", "Wine", "Restaurants", "Cooking", "Hospitality", "Travel"],
    compatibilityScore: 96,
    verified: true,
    zodiac: "Taurus ♉",
    height: "6'1\"",
    lookingFor: "Life partner",
    drinking: "Italian Wines",
    workout: "Running & Tennis",
    prompts: [
      { question: "The key ingredient in life...", answer: "Generosity, patience, and high quality extra virgin olive oil." }
    ],
    anthem: { song: "Fly Me to the Moon", artist: "Frank Sinatra" },
    activeNow: true
  }
];
