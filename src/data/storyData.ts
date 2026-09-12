import { StoryMetadata, MediaItem, VersionMemory, PersonalityTrait, StoryChapter } from '../types/story';

/**
 * CENTRAL FRIENDSHIP SCRAPBOOK CONFIGURATION & STORY DATA
 * 
 * Instructions for Hari:
 * You can easily replace any placeholder label with real image paths (e.g. src: '/photos/monica_edit_2023.jpg')
 * or adjust any text below without touching the component code!
 */

export const STORY_METADATA: StoryMetadata = {
  recipient: {
    fullName: "Monica Gaha",
    firstName: "Monica",
    nicknames: ["Monica"],
    birthdayFormatted: "15 September",
    birthdayDay: 15,
    birthdayMonth: "September",
    sisterName: "Rupali",
    sisterNickname: "Roops",
    sisterSharedBirthday: true,
  },
  creator: {
    fullName: "Hari Singh",
    firstName: "Hari",
    nicknameForHer: "Harshu",
    birthdayFormatted: "29 July",
    birthdayDay: 29,
    birthdayMonth: "July",
    hobbies: ["Cricket", "Writing Poetry & Shayari", "Creative Edits", "Personal Growth"],
  },
};

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "prologue", number: "00", title: "The Scroll", subtitle: "Before I say Happy Birthday" },
  { id: "origins", number: "01", title: "Class 10 & Telegram", subtitle: "Where two strangers crossed paths" },
  { id: "cyber-police", number: "02", title: "Cyber Police Era", subtitle: "Before we were even friends" },
  { id: "perspective", number: "03", title: "The Perspective Shift", subtitle: "Learning to understand each other" },
  { id: "banter-gap", number: "04", title: "No Video Call & Aap", subtitle: "Our unique friendship dynamics" },
  { id: "terrace-nights", number: "05", title: "Terrace & 3-Hour Calls", subtitle: "When midnight lost its meaning" },
  { id: "talking-all-day", number: "06", title: "What Should I Do?", subtitle: "Hundreds of little conversations" },
  { id: "board-results", number: "07", title: "The 89% Incident", subtitle: "Your Version vs My Version" },
  { id: "media-vault", number: "08", title: "Edits, Shayari & Poems", subtitle: "The birthday tradition" },
  { id: "unbroken-thread", number: "09", title: "September & July", subtitle: "The friendship that remembered" },
  { id: "pune-incident", number: "10", title: "The Pune Blunder", subtitle: "Rotaract & a 16th Sept rescue" },
  { id: "classified", number: "11", title: "Classified File", subtitle: "A tiny private note" },
  { id: "personality", number: "12", title: "Things You Don't Realize", subtitle: "What I genuinely notice about you" },
  { id: "mutual-support", number: "13", title: "Cricket & Growth", subtitle: "Thank you for supporting me too" },
  { id: "family-roots", number: "14", title: "Roops & Heritage", subtitle: "A quiet celebration for two" },
  { id: "epilogue", number: "15", title: "Happy Birthday", subtitle: "Aap hi rahenge" },
];

export const VERSION_MEMORIES: VersionMemory[] = [
  {
    id: "class10-results",
    title: "The Class 10 Board Results Paradox",
    tag: "Board Exams Chronicle",
    context: "Results day. Two friends looking at numbers on a screen with entirely different emotional reactions.",
    hariVersion: {
      headline: "Hari's View (82.6%)",
      body: "I remember looking at my 82.6% and genuinely feeling relieved and happy. Then I checked in on you, you had around 89% — and you were crying heavily like the world had ended because it wasn't above 90% and you weren't feeling well. I spent the next hour explaining that 89% was amazing and trying to calm you down.",
      quote: "You had around 89%. I had 82.6%. You were crying... and I was somehow completely okay.",
      statBadge: "82.6% • Relaxed & Peaceful",
    },
    monicaVersion: {
      headline: "Monica's View (~89%)",
      body: "My marks were so low 😭 and I was genuinely not feeling well that day. I couldn't believe I missed the 90% mark. And even though Hari's marks were lower, he wasn't crying at all — he just patiently sat there calming me down and making me feel better.",
      quote: "My marks were SO LOW 😭 and you had to calm me down.",
      statBadge: "~89% • Heartbroken at the time",
    },
    takeaway: "The point was never the percentages. It was the fact that even back then, one of us was panicking and the other was naturally stepping in to calm things down.",
  },
  {
    id: "cyber-police-memory",
    title: "The Telegram 'Cyber Police' Rescue",
    tag: "Origins Archive",
    context: "A study group on Telegram around Class 10 boards. An online nuisance appeared.",
    hariVersion: {
      headline: "Hari's Perspective",
      body: "Some guy online was acting threatening and bothering you in that group. I immediately put on an imaginary cyber-investigator badge, tracked him into full panic mode, and made sure he vanished from your chats. Afterwards, I gave you a whole lecture on internet safety like a big brother.",
      quote: "Somehow, before we even became friends... I had already gone into full cyber-police mode.",
      statBadge: "Badge #001 • Unofficial Internet Safety Officer",
    },
    monicaVersion: {
      headline: "Monica's Perspective",
      body: "A totally unforgettable memory from how we started talking. This guy was creating trouble, and Hari literally stepped up, scared him away like the cyber police, and told me to be careful online. It's one of the funniest ways two people ever ended up becoming long-term friends.",
      quote: "You actually scared him off and told me to stay safe on social media 😂",
      statBadge: "Memory Status: Unforgettable",
    },
    takeaway: "Before we had even shared a single normal friendship conversation, our dynamic was already set: looking out for each other.",
  },
];

export const AAP_VS_TUM_DIALOGUE = [
  { speaker: "Monica", text: "Can we please finally move to 'tum'?", role: "recipient" },
  { speaker: "Hari", text: "Aap.", role: "creator" },
  { speaker: "Monica", text: "...", role: "recipient" },
  { speaker: "Hari", text: "Aap hi rahenge.", role: "creator" },
];

export const PERSONALITY_TRAITS: PersonalityTrait[] = [
  {
    id: "soft-nature",
    title: "Quiet Kindness & Soft Nature",
    iconName: "HeartHandshake",
    description: "You have a genuinely polite, patient, and soft-spoken demeanor with people. You treat others with an effortless warmth that isn't put on.",
    reflection: "In a world where people are constantly loud or dismissive, your natural gentleness stands out. You make conversations feel safe.",
  },
  {
    id: "the-listener",
    title: "The Reliable Listener & Advisor",
    iconName: "Ear",
    description: "When someone brings a problem or asks 'What should I do?', you actually listen with your full attention before speaking.",
    reflection: "Your guidance has always been balanced and mature. You never judged — you just helped find clarity.",
  },
  {
    id: "the-temper",
    title: "The Tiny Temper & Harmless 'Gaalis'",
    iconName: "Sparkles",
    isPlayful: true,
    description: "You get irritated over the smallest little things, and when you're angry, you occasionally let out small harmless gaalis.",
    reflection: "Honestly? It's hilarious and endearing. Coming from someone as polite and soft-natured as you, hearing you get worked up over tiny things is one of the funniest parts of your personality.",
  },
  {
    id: "genuine-support",
    title: "An Unconditional Supporter",
    iconName: "ShieldCheck",
    description: "You cheer for the people you care about quietly and consistently. You celebrate their little wins and remind them of their worth.",
    reflection: "You don't just say empty words; you genuinely want to see people succeed, pursue their passions, and stay true to themselves.",
  },
];

export const MEDIA_VAULT_ITEMS: MediaItem[] = [
  {
    id: "media-edit-1",
    type: "edit",
    title: "Birthday Edit Edition (Annual Tradition)",
    subtitle: "Every September's Creative Craft",
    placeholderLabel: "[INSERT OLD BIRTHDAY EDIT]",
    note: "Over the years, making birthday video edits for you became a sacred September tradition.",
    rotation: -2,
    aspectRatio: "portrait",
  },
  {
    id: "media-poem-1",
    type: "poem",
    title: "Written Lines & Friendship Verses",
    subtitle: "Lines you said were 'the best'",
    placeholderLabel: "[INSERT POEM / VERSES HERE]",
    note: "You've read my poems and always encouraged me to write more and keep crafting lines.",
    rotation: 2,
    aspectRatio: "square",
  },
  {
    id: "media-shayari-1",
    type: "shayari",
    title: "Exchanged Shayari & Notes",
    subtitle: "Words shared across seasons",
    placeholderLabel: "[INSERT MY SHAYARI HERE]",
    note: "From birthday shayaris to thoughtful midnight messages across the years.",
    rotation: -1,
    aspectRatio: "square",
  },
  {
    id: "media-photo-1",
    type: "photo",
    title: "Memory Polaroid Placeholder",
    subtitle: "A place reserved for a real photo",
    placeholderLabel: "[INSERT MONICA / MEMORY PHOTO]",
    note: "Reserved space for when you upload real pictures from the laptop archives.",
    rotation: 3,
    aspectRatio: "polaroid",
  },
  {
    id: "media-video-1",
    type: "video",
    title: "Video Message Archive",
    subtitle: "Memories in motion",
    placeholderLabel: "[INSERT OLD VIDEO HERE]",
    note: "Birthday wishes, montage clips, or recorded messages over the years.",
    rotation: -3,
    aspectRatio: "landscape",
  },
  {
    id: "media-telegram-1",
    type: "telegram",
    title: "Telegram Study Group Era",
    subtitle: "Class 10 Board Prep Archive",
    placeholderLabel: "[INSERT TELEGRAM SCREENSHOT / ARTIFACT]",
    note: "Where it all began: Vedantu board-prep group, two students discussing exams.",
    rotation: 1,
    aspectRatio: "landscape",
  },
];

export const TIMELINE_CALL_HOURS = [
  { time: "10:30 PM", label: "Starting the call", note: "Just a quick check-in about the day, nothing heavy." },
  { time: "11:30 PM", label: "One hour in", note: "Discussing random thoughts, life situations, exam stress, and life questions." },
  { time: "12:30 AM", label: "Two hours in", note: "Still talking. Neither of us has checked the clock." },
  { time: "01:30 AM", label: "The Realization", note: "'Wait... WHAT? How is it almost 2 AM already?' 😂" },
];

export const PUNE_INCIDENT_DATA = {
  year: 2024,
  location: "Pune, Maharashtra",
  context: "Rotaract organization duties & busy travel schedule",
  hariBirthdayDate: "29 July",
  monicaBirthdayDate: "15 September",
  hariWishedDate: "16 September",
  story: "On 29 July, Monica wished me right at midnight, without missing a second. Fast-forward to 15 September 2024: I was in Pune deeply involved in Rotaract work, lost track of the date, and somehow managed to miss wishing her on the 15th! I remembered on the 16th and wished her immediately. She still jokingly brings it up — and honestly, fair enough! 😂",
};

export const FINAL_LETTER_CONTENT = {
  opening: "Monica,",
  paragraphs: [
    "I don't think you realize how much your presence has meant to me across all these years.",
    "You've listened when I needed to talk. You've supported me through confusing phases. You've calmed me down when things felt overwhelming. You've given me sound advice when I didn't know what direction to take. You've encouraged me to keep playing cricket, to keep writing poems, and to keep growing as a person.",
    "You've appreciated every little edit and shayari I've ever made for you. You've remembered birthdays even during the busy years when life took over and we barely spoke for months. And somehow, whenever we picked the phone back up, it never felt awkward or distant — it just continued, like we had hit pause instead of goodbye.",
    "I genuinely hope life brings you all the peace, happiness, growth, and good things you so deeply deserve.",
    "And no matter where life leads or how often we talk across the coming years...",
    "You'll always be someone I'm genuinely grateful I met.",
  ],
  birthdayWish: "Happy Birthday, Monica.",
  signature1: "And apparently...",
  signature2: "I'll always be Harshu to you.",
  finalPunchline: "Aap hi rahenge. 😂",
};
