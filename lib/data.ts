import { WeddingInfo, GalleryImage } from './types';

export const weddingInfo: WeddingInfo = {
  groom: {
    name: '신랑 이름',
    father: '신랑 아버지',
    mother: '신랑 어머니',
    account: {
      bank: '은행명',
      number: '계좌번호',
      holder: '신랑 이름',
    },
  },
  bride: {
    name: '신부 이름',
    father: '신부 아버지',
    mother: '신부 어머니',
    account: {
      bank: '은행명',
      number: '계좌번호',
      holder: '신부 이름',
    },
  },
  date: '2024-12-25',
  time: '14:00',
  location: {
    name: '웨딩홀 이름',
    address: '서울특별시 강남구 테헤란로 123',
    tel: '02-1234-5678',
    lat: 37.5665,
    lng: 126.9780,
  },
};

export const galleryImages: GalleryImage[] = [
  { id: '1', url: '/images/gallery/1.jpg', alt: 'Wedding Photo 1' },
  { id: '2', url: '/images/gallery/2.jpg', alt: 'Wedding Photo 2' },
  { id: '3', url: '/images/gallery/3.jpg', alt: 'Wedding Photo 3' },
  { id: '4', url: '/images/gallery/4.jpg', alt: 'Wedding Photo 4' },
  { id: '5', url: '/images/gallery/5.jpg', alt: 'Wedding Photo 5' },
  { id: '6', url: '/images/gallery/6.jpg', alt: 'Wedding Photo 6' },
];

export const invitationMessage = `
서로가 마주보며 다져온 사랑을
이제 함께 한 곳을 바라보며
걸어갈 수 있는 큰 사랑으로 키우고자 합니다.

저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게
앞날을 축복해 주시면 감사하겠습니다.
`;
