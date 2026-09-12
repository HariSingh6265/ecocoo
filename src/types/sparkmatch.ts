export type TabType = "discover" | "matches" | "chat" | "profile";

export interface PromptItem {
  question: string;
  answer: string;
}

export interface Anthem {
  song: string;
  artist: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: "female" | "male" | "non-binary";
  occupation: string;
  companyOrSchool?: string;
  distanceMiles: number;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  compatibilityScore: number;
  verified: boolean;
  zodiac?: string;
  height?: string;
  lookingFor?: string;
  drinking?: string;
  workout?: string;
  prompts?: PromptItem[];
  anthem?: Anthem;
  activeNow?: boolean;
  matchedAt?: string;
  isSuperMatch?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "match";
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  isAudioPrompt?: boolean;
}

export interface MatchItem {
  id: string;
  profile: Profile;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  matchedAt: string;
  isSuperMatch?: boolean;
  messages: ChatMessage[];
}

export interface FilterState {
  ageRange: [number, number];
  maxDistance: number;
  selectedInterests: string[];
  verifiedOnly: boolean;
  minCompatibility: number;
  gender: "all" | "female" | "male" | "non-binary";
}

export interface UserProfileState {
  name: string;
  age: number;
  occupation: string;
  bio: string;
  location: string;
  photos: string[];
  interests: string[];
  sparksCount: number;
  superLikesLeft: number;
  boostsLeft: number;
  isVip: boolean;
  lookingFor: string;
  zodiac: string;
  height: string;
}
