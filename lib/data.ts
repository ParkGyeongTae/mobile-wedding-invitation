import { WeddingInfo, GalleryImage } from './types';

// 환경 변수에서 개인정보 로드
export const weddingInfo: WeddingInfo = {
  groom: {
    name: process.env.NEXT_PUBLIC_GROOM_NAME || '신랑 이름',
    father: process.env.NEXT_PUBLIC_GROOM_FATHER || '신랑 아버지',
    mother: process.env.NEXT_PUBLIC_GROOM_MOTHER || '신랑 어머니',
    account: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_BANK ? {
      bank: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_BANK,
      number: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER || '',
      holder: process.env.NEXT_PUBLIC_GROOM_ACCOUNT_HOLDER || '',
    } : undefined,
  },
  bride: {
    name: process.env.NEXT_PUBLIC_BRIDE_NAME || '신부 이름',
    father: process.env.NEXT_PUBLIC_BRIDE_FATHER || '신부 아버지',
    mother: process.env.NEXT_PUBLIC_BRIDE_MOTHER || '신부 어머니',
    account: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_BANK ? {
      bank: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_BANK,
      number: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_NUMBER || '',
      holder: process.env.NEXT_PUBLIC_BRIDE_ACCOUNT_HOLDER || '',
    } : undefined,
  },
  date: process.env.NEXT_PUBLIC_WEDDING_DATE || '2024-12-25',
  time: process.env.NEXT_PUBLIC_WEDDING_TIME || '14:00',
  location: {
    name: process.env.NEXT_PUBLIC_LOCATION_NAME || '웨딩홀 이름',
    address: process.env.NEXT_PUBLIC_LOCATION_ADDRESS || '서울특별시 강남구 테헤란로 123',
    tel: process.env.NEXT_PUBLIC_LOCATION_TEL,
    lat: parseFloat(process.env.NEXT_PUBLIC_LOCATION_LAT || '37.5665'),
    lng: parseFloat(process.env.NEXT_PUBLIC_LOCATION_LNG || '126.9780'),
  },
};

// 갤러리 이미지 개수 (환경 변수로 설정 가능)
const galleryCount = parseInt(process.env.NEXT_PUBLIC_GALLERY_COUNT || '6', 10);

export const galleryImages: GalleryImage[] = Array.from({ length: galleryCount }, (_, i) => ({
  id: String(i + 1),
  url: `/images/gallery/${i + 1}.jpg`,
  alt: `Wedding Photo ${i + 1}`,
}));

// 초대 메시지 (환경 변수로 설정 가능)
export const invitationMessage = process.env.NEXT_PUBLIC_INVITATION_MESSAGE || `
서로가 마주보며 다져온 사랑을
이제 함께 한 곳을 바라보며
걸어갈 수 있는 큰 사랑으로 키우고자 합니다.

저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게
앞날을 축복해 주시면 감사하겠습니다.
`;
