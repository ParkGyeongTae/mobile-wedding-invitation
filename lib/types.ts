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
