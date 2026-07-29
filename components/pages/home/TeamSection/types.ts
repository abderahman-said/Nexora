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

export interface TeamCardProps {
  member: TeamMember;
}
