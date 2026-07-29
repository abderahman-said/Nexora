export interface ClientCardProps {
    client: Testimonial;
}

export interface Testimonial {
    id: string;
    clientName: string;
    role: string;
    comment: string;
    rating: number;
    avatar: string;
}
