export function calculateDday(targetDate: string): number {
  const today = new Date();
  const target = new Date(targetDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject();
      textArea.remove();
    });
  }
}

export function generateCalendarUrl(weddingInfo: { date: string; time: string; location: { name: string; address: string } }): string {
  const { date, time, location } = weddingInfo;
  // Google Calendar URL 형식: YYYYMMDDTHHMMSS
  const dateFormatted = date.replace(/-/g, ''); // 2024-12-25 → 20241225
  const startDateTime = `${dateFormatted}T${time.replace(':', '')}00`;
  const endDateTime = `${dateFormatted}T${(parseInt(time.split(':')[0]) + 2).toString().padStart(2, '0')}${time.split(':')[1]}00`;

  const title = encodeURIComponent('결혼식');
  const details = encodeURIComponent(`${location.name}에서 결혼식이 있습니다.`);
  const locationParam = encodeURIComponent(`${location.name}, ${location.address}`);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${locationParam}`;
}
