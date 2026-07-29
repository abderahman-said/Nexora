import { LucideIcon } from 'lucide-react';

export interface ContactInfoItem {
    id: number;
    title: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    action: string;
    actionText: string;
}
