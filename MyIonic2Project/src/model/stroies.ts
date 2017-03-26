import { Story, TopStory } from './story';

export class StoriesRoot {
    date: string;
    stories: Story[];
    top_stories?: TopStory[];
}