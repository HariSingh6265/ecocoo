export interface StoryMetadata {
  recipient: {
    fullName: string;
    firstName: string;
    nickname: string; // "Monaco"
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
  src?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'polaroid';
  rotation?: number;
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
  monacoVersion: {
    headline: string;
    body: string;
    quote?: string;
    statBadge?: string;
  };
  takeaway: string;
}

export interface PersonalityTrait {
  id: string;
  word: string;
  hindiTitle: string;
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
