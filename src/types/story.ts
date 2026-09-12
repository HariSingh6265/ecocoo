export interface StoryMetadata {
  recipient: {
    fullName: string;
    firstName: string;
    nicknames: string[];
    birthdayFormatted: string;
    birthdayDay: number;
    birthdayMonth: string;
    sisterName: string;
    sisterNickname: string;
    sisterSharedBirthday: boolean;
  };
  creator: {
    fullName: string;
    firstName: string;
    nicknameForHer: string; // "Harshu"
    birthdayFormatted: string;
    birthdayDay: number;
    birthdayMonth: string;
    hobbies: string[];
  };
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'edit' | 'poem' | 'shayari' | 'telegram';
  title: string;
  subtitle?: string;
  year?: string;
  placeholderLabel: string;
  note?: string;
  src?: string; // Optional real file path when user replaces it
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'polaroid';
  rotation?: number; // tilt angle for scrapbook realism
}

export interface VersionMemory {
  id: string;
  title: string;
  tag: string;
  context: string;
  hariVersion: {
    headline: string;
    body: string;
    quote?: string;
    statBadge?: string;
  };
  monicaVersion: {
    headline: string;
    body: string;
    quote?: string;
    statBadge?: string;
  };
  takeaway: string;
}

export interface PersonalityTrait {
  id: string;
  title: string;
  iconName: string;
  description: string;
  reflection: string;
  isPlayful?: boolean;
}

export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}
