export interface WeddingInfo {
  groom: {
    name: string;
    father: string;
    mother: string;
    account?: {
      bank: string;
      number: string;
      holder: string;
    };
  };
  bride: {
    name: string;
    father: string;
    mother: string;
    account?: {
      bank: string;
      number: string;
      holder: string;
    };
  };
  date: string;
  time: string;
  location: {
    name: string;
    hall?: string;
    address: string;
    tel?: string;
    lat: number;
    lng: number;
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

export interface DiningInfo {
  floor: string;
  type: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attendance: 'attending' | 'not-attending' | 'undecided';
  guestCount: number;
  mealOption?: 'regular' | 'vegetarian';
  message?: string;
  createdAt: Date;
}
