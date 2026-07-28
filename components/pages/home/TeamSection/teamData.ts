export interface TeamMemberSocials {
    linkedin: string;
    twitter: string;
    email: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    socials: TeamMemberSocials;
}
export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'Ahmed kamal',
        role: 'CEO',
        image: '/team/Ahmedkamal.jpeg',
        bio: 'Leading the vision and strategy behind Nexora, turning bold ideas into products that make a real impact.',
        socials: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:henry@nexora.com',
        },
    },
    {
        id: 2,
        name: 'Mohamed Khairy',
        role: 'QA Tester',
        image: '/team/Mohamedkhairy.jpeg',
        bio: 'Ensure that our software and applications are free of errors and bugs before they reach our clients.',
        socials: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:alex@nexora.com',
        },
    },
    {
        id: 3,
        name: 'Ahmed Rashed',
        role: 'Android Developer',
        image: '/team/AhmedRashed.jpeg',
        bio: 'Transforming complex requirements into seamless, scalable Android applications that users love.',
        socials: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:rayan@nexora.com',
        },
    },
    {
        id: 4,
        name: 'Abdelrahman Elsaeid',
        role: 'Front End Developer',
        image: '/team/abdorady.jpeg',
        bio: 'Transforming complex requirements into seamless, scalable Front End applications that users love.',
        socials: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:sophia@nexora.com',
        },
    },
    {
        id: 5,
        name: 'Ahlam kamal',
        role: 'QA Tester',
        image: '/team/Ahlamkamal.jpeg',
        bio: 'Ensure that our software and applications are free of errors and bugs before they reach our clients.',
        socials: {
            linkedin: '#',
            twitter: '#',
            email: 'mailto:sophia@nexora.com',
        },
    },
];