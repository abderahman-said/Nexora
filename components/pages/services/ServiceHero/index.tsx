import SharedHero from '@/components/ui/SharedHero';
export default function ServiceHero() {
    return (
        <SharedHero
            id="services-hero"
             titlePrefix="Our"
            titleHighlight="Services"
             breadcrumbLabel="Services"
            backgroundImage="/assets/about_banner.png"
        />
    );
}