import VimeoHero from '@/components/pages/home/VimeoHero';
import HorizontalWords from '@/components/pages/home/HorizontalWords';
import ServiceCards from '@/components/pages/home/ServiceCards';
import LazySections from '@/components/pages/home/LazySections';

export default function Home() {
    return (
        <main>
            <VimeoHero />
            <HorizontalWords />
            <ServiceCards />
            <LazySections />
        </main>
    );
}
