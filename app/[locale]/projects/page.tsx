import ProjectsPage from '@/components/pages/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Projects | Nexora Solutions',
    description: 'Explore our portfolio of successful projects that showcase our expertise in building innovative digital solutions for enterprise clients.',
};

export default function Projects() {
    return <ProjectsPage />;
}
