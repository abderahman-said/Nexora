import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import Container from '@/components/ui/Container';

export default function VideoHero() {
    return (
        <section
            id="hero"
            className="
                relative min-h-[90dvh] md:min-h-[100dvh] flex flex-col items-center justify-center
                overflow-hidden bg-[#f8fafc] dark:bg-[#090d16]
                 pt-[96px] pb-14 md:pb-20
                 md:pt-24
            "
        >
            <HeroBackground />

            <Container className="relative z-10">
                <HeroContent />
            </Container>
        </section>
    );
}
