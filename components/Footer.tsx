export default function Footer() {
  return (
    <footer className="bg-pastel-gold-dark text-gray-700 py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <svg
            className="w-10 h-10 text-white mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">
            소중한 분들을 모시고자 하오니
            <br />
            바쁘시더라도 부디 참석하시어
            <br />
            자리를 빛내 주시면 감사하겠습니다
          </p>
        </div>
        <div className="text-xs text-gray-600">
          <p>© 2024 Mobile Wedding Invitation</p>
          <p className="mt-2">Made with ♥ Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
