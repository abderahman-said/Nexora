import VideoHero from '@/components/pages/home/VideoHero';
import AboutSection from '@/components/pages/home/AboutSection';
import ServiceCards from '@/components/pages/home/ServiceCards';
import LazySections from '@/components/pages/home/LazySections';

export default function Home() {
    return (
        <main>
            <VideoHero />
            <AboutSection />
            <ServiceCards />
            <LazySections />
        </main>
    );
}
