import React from 'react';
import { Layers } from 'lucide-react';
import Container from '@/components/ui/Container';
import { getCompanyStory } from '@/lib/data/aboutData';
import AboutVisionMission from './AboutVisionMission';
import { useTranslations } from 'next-intl';

export default function AboutStory() {
    const t = useTranslations('about');
    const COMPANY_STORY = getCompanyStory(t);
    return (
        <section
            id="about-story"
            className="scroll-section relative w-full pt-16 sm:pt-20  bg-slate-100/90 dark:bg-[#090d16] site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">

                        <h2 className="text-[25px] sm:text-[31px] lg:text-[43px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                            {COMPANY_STORY.title}
                        </h2>

                        <p className="leading-[2]! text-slate-700 dark:text-slate-200 font-medium text-base sm:text-lg leading-relaxed pt-6">
                            {COMPANY_STORY.description}
                        </p>

                        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            {COMPANY_STORY.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        <AboutVisionMission />

            </Container>
        </section>
    );
}
