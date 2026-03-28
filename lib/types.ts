export interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

export interface WeddingInfo {
  groom: {
    name: string;
    father: string;
    mother: string;
    account?: AccountInfo;
    fatherAccount?: AccountInfo;
    motherAccount?: AccountInfo;
  };
  bride: {
    name: string;
    father: string;
    mother: string;
    account?: AccountInfo;
    fatherAccount?: AccountInfo;
    motherAccount?: AccountInfo;
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
  passwordHash?: string;
}

export interface DiningInfo {
  floor: string;
  type: string;
  startTime: string;
  endTime: string;
  description?: string;
}
