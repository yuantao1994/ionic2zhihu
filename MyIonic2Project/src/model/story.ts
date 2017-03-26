
class StoryBase {
    type: number;
    id: number;
    ga_perfix?: string;
    title: string
}

export class Story extends StoryBase {

    images: string[];

}

export class TopStory extends StoryBase {
    image: string;
}
