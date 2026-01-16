import HeroSection from '@/components/HeroSection';
import InvitationSection from '@/components/InvitationSection';
import DdayCounter from '@/components/DdayCounter';
import Gallery from '@/components/Gallery';
import LocationSection from '@/components/LocationSection';
import DiningSection from '@/components/DiningSection';
import RsvpSection from '@/components/RsvpSection';
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
        <LocationSection />
        <DiningSection />
        <RsvpSection />
        <AccountSection />
        <Guestbook />
        <Footer />
      </main>
    </>
  );
}
