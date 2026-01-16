import HeroSection from '@/components/HeroSection';
import InvitationSection from '@/components/InvitationSection';
import DdayCounter from '@/components/DdayCounter';
import Gallery from '@/components/Gallery';
import ShareSection from '@/components/ShareSection';
import LocationSection from '@/components/LocationSection';
import DiningSection from '@/components/DiningSection';
import AccountSection from '@/components/AccountSection';
import Guestbook from '@/components/Guestbook';
import FloatingHearts from '@/components/FloatingHearts';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <FloatingHearts />
      <main className="relative min-h-screen">
        <HeroSection />
        <InvitationSection />
        <DdayCounter />
        <Gallery />
        <ShareSection />
        <LocationSection />
        <DiningSection />
        <AccountSection />
        <Guestbook />
        <Footer />
      </main>
    </>
  );
}
