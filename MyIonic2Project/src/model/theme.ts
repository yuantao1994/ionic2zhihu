import { Story } from './story';
export class Theme {
    color: number;
    thumbnail: string;
    description: string;
    id: number;
    name: string;
}

export class ThemeNews {
    stories: Story[];
    description: string;
    background: string;
    color: number;
    name: string;
    image: string;
    editors: Array<{ url: string, bio: string, id: number, avatar: string, name: string }>;
    image_source: string;
}