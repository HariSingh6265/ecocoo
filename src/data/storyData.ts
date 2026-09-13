import { StoryMetadata, MediaItem, VersionMemory, PersonalityTrait, StoryChapter } from '../types/story';

/**
 * CENTRAL FRIENDSHIP SCRAPBOOK CONFIGURATION & STORY DATA
 * 
 * Handcrafted for: Monaco (15 September)
 * From: Hari / Harshu (29 July)
 */

export const STORY_METADATA: StoryMetadata = {
  recipient: {
    fullName: "Monaco Gaha",
    firstName: "Monaco",
    nickname: "Monaco",
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
  { id: "prologue", number: "00", title: "The Scroll", subtitle: "Before I say Happy Birthday..." },
  { id: "origins", number: "01", title: "Class 10 & Telegram", subtitle: "Do random log, ek Vedantu group" },
  { id: "cyber-police", number: "02", title: "Cyber Police Era", subtitle: "Case File #001: Threat Neutralized 😂" },
  { id: "perspective", number: "03", title: "The Perspective Shift", subtitle: "Jab aapne mera dimaag theek kiya" },
  { id: "no-video-call", number: "04", title: "Zero Video Calls", subtitle: "Yeh abhi tak nahi hua!" },
  { id: "aap-problem", number: "05", title: "The 'Aap' Problem", subtitle: "Monaco vs Hari's permanent grammar" },
  { id: "the-gap", number: "06", title: "The Silence", subtitle: "Pause dabaya tha, goodbye nahi" },
  { id: "terrace-nights", number: "07", title: "Terrace Nights", subtitle: "Terrace ka matlab hi tha call karna" },
  { id: "long-calls", number: "08", title: "2–3 Hours Disappearing", subtitle: "Wait... itni der se baat kar rahe hain?" },
  { id: "talking-all-day", number: "09", title: "What Should I Do?", subtitle: "Poora din baat aur mutual advice" },
  { id: "board-results", number: "10", title: "The 89% Incident", subtitle: "82.6% vs ~89% • Your Version vs My Version" },
  { id: "media-vault", number: "11", title: "The Creative Archive", subtitle: "Edits, Shayari & Poems collection" },
  { id: "unbroken-thread", number: "12", title: "September & July", subtitle: "The friendship that remembered" },
  { id: "pune-incident", number: "13", title: "The Pune Blunder", subtitle: "Rotaract trip & 16th September rescue 🙈" },
  { id: "classified", number: "14", title: "Classified Record", subtitle: "Access Restricted 🔒" },
  { id: "personality", number: "15", title: "Things You Don't Realize", subtitle: "Mujhe notice hota hai" },
  { id: "mutual-support", number: "16", title: "Cricket & Growth", subtitle: "Thank you for supporting me too" },
  { id: "family-roots", number: "17", title: "Roops & Heritage", subtitle: "15 September double celebration" },
  { id: "epilogue", number: "18", title: "Happy Birthday", subtitle: "Aap hi rahenge. 😂" },
];

export const VERSION_MEMORIES: VersionMemory[] = [
  {
    id: "class10-results",
    title: "The Class 10 Board Results Paradox",
    tag: "Board Exams Chronicle",
    context: "Results day. Two friends looking at numbers on screen with totally opposite emotional reactions.",
    hariVersion: {
      headline: "Hari's View (82.6%)",
      body: "Maine apna 82.6% dekha aur main literally khush tha, full chill mode. Phir maine aapka score pucha — you had around 89% — aur aap ro rahe the ki 90% cross nahi hua aur tabiyat bhi theek nahi thi! Main agle 1 ghante tak aapko samjha raha tha ki 89% bohot achhe marks hote hain.",
      quote: "You had around 89%. I had 82.6%. You were crying... and I was somehow completely okay.",
      statBadge: "82.6% • Relaxed & Happy 😎",
    },
    monacoVersion: {
      headline: "Monaco's View (~89%)",
      body: "My marks were SO low 😭 aur meri tabiyat bhi kharab thi uss din. Mujhe laga sab kharab ho gaya. Even though Hari ke marks mujhse kam the, woh bilkul nahi ro raha tha — ulta baith ke mujhe shaant kara raha tha aur samjha raha tha.",
      quote: "My marks were SO LOW 😭 and you had to calm me down.",
      statBadge: "~89% • Heartbroken at that moment 😭",
    },
    takeaway: "The point was never the percentages. The point is ki tab bhi, jab aap panic kar rahe the, main shaant kara raha tha. That dynamic started right there.",
  },
];

export const PERSONALITY_WORDS = [
  { word: "SWEET", hindi: "Soft-spoken and warm", note: "Sabke saath ek effortless gentleness." },
  { word: "GOOD LISTENER", hindi: "Actually sunne wali", note: "Jab koi problem batata hai, aap poora dhyan dete ho." },
  { word: "SUPPORTIVE", hindi: "Hamesha encourage karne wali", note: "Reminding people of what they are capable of." },
  { word: "GREAT ADVISOR", hindi: "'What should I do?'", note: "Grounded and honest guidance, no fake advice." },
  { word: "TINY TEMPER", hindi: "Chhoti baaton pe gussa 😂", note: "Aur gusse mein chhote harmless gaalis jo sirf aapke mooh se funny lagte hain!" },
  { word: "CARING", hindi: "Quiet kindness", note: "Genuinely looking out for the people around you." },
];

export const MEDIA_VAULT_ITEMS: MediaItem[] = [
  {
    id: "media-edit-1",
    type: "edit",
    title: "Annual Birthday Edit Edition",
    subtitle: "Every September's Creative Craft",
    placeholderLabel: "[INSERT OLD BIRTHDAY EDIT]",
    note: "Har saal aapke liye birthday video edit banana ek fixed tradition ban chuka tha.",
    src: "/videos/VID-20240729-WA0002.mp4",
    rotation: -2,
    aspectRatio: "portrait",
  },
  {
    id: "media-poem-1",
    type: "poem",
    title: "Written Lines & Friendship Verses",
    subtitle: "Lines you said were 'the best'",
    placeholderLabel: "[INSERT POEM / VERSES HERE]",
    note: "Aapne meri poems padhi aur hamesha bola ki yeh best hain aur aur likha karo.",
    src: "/photos/IMG_20230529_104223.jpg",
    rotation: 2,
    aspectRatio: "square",
  },
  {
    id: "media-shayari-1",
    type: "shayari",
    title: "Exchanged Shayari & Late Notes",
    subtitle: "Words shared across the years",
    placeholderLabel: "[INSERT MY SHAYARI HERE]",
    note: "Humaare hisse ke log,\naap bankr aa gaye...",
    src: "/photos/Shayri.jpeg",
    rotation: -1,
    aspectRatio: "square",
  },
  {
    id: "media-photo-1",
    type: "photo",
    title: "Monaco Memory Polaroid",
    subtitle: "Reserved for laptop archive picture",
    placeholderLabel: "[INSERT MONACO / OUR OLD PHOTO]",
    note: "Monaco's picture from our memories.",
    src: "/photos/Monaco.jpg",
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
    src: "/videos/a_simple_video_of_paper_cut_de.mp4",
    rotation: -3,
    aspectRatio: "landscape",
  },
  {
    id: "media-telegram-1",
    type: "telegram",
    title: "Telegram Study Group Era",
    subtitle: "Class 10 Board Prep Archive",
    placeholderLabel: "[INSERT TELEGRAM SCREENSHOT]",
    note: "Where it all started: Vedantu board-prep group, do random students.",
    src: "/videos/VID-20240729-WA0003.mp4",
    rotation: 1,
    aspectRatio: "landscape",
  },
];

export const TIMELINE_CALL_HOURS = [
  { time: "10:30 PM", label: "Call Start", note: "Bas ek normal sa check-in, din kaisa tha." },
  { time: "11:30 PM", label: "1 Hour In", note: "Life topics, random thoughts, stress, aur sab kuch share hona shuru." },
  { time: "12:30 AM", label: "2 Hours In", note: "Still talking non-stop. Kisi ne clock nahi dekhi." },
  { time: "01:30 AM", label: "The Realization", note: "'Wait... WHAT? 2 bajne wale hain?!' 😂" },
];

export const FINAL_LETTER_CONTENT = {
  opening: "Monaco,",
  lines: [
    "I don't think you realize how much your presence has meant to me across all these years.",
    "Aapne hamesha suna hai jab mujhe baat karni thi. Jab cheezein confusing lagti thi, aapne guide kiya. You've calmed me down, given me honest advice, aur hamesha encourage kiya ki main cricket khelta rahu, poems likhta rahu, aur grow karta rahu.",
    "Aapne mere har chhote edit aur shayari ko appreciate kiya. Even during those years jab life busy ho gayi thi aur hum mahino baat nahi karte the, September aur July hamesha yaad rahe. Aur jab bhi wapas baat hui, toh laga hi nahi ki koi doori aayi thi — it just continued, like we had pressed pause instead of goodbye.",
    "I genuinely hope life gives you all the happiness, peace, growth, and good things you deserve.",
    "And no matter how much life changes or how often we talk in the coming years...",
    "You'll always be someone I'm genuinely grateful I met.",
  ],
  birthdayWish: "Happy Birthday, Monaco.",
  signatureLead: "And apparently...",
  signatureName: "I'll always be Harshu to you.",
  finalPunchline: "Aap hi rahenge. 😂",
};
