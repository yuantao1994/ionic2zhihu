import { NavController, NavParams, Slides, Content } from 'ionic-angular';
import { StoryDetailPage } from './../story-detail/story-detail';
import { StoriesRoot } from './../../model/stroies';
import { Story, TopStory } from './../../model/story';
import { StoriesService } from './../../services/stories.service';
import { Component, OnInit, ViewChild } from '@angular/core';

/*
  Generated class for the StoryList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-story-list',
  templateUrl: 'story-list.html'
})





export class StoryListPage implements OnInit {
  stories: Story[];
  topStories: TopStory[];
  title = "今日热闻";
  @ViewChild('mySlider') slider: Slides;
  oldNews: Array<{ date: string, stories: Story[] }>;
   @ViewChild(Content) content: Content;
  currentNewsDate: string;
  constructor(
    public stoiesService: StoriesService,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.oldNews = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryListPage');
  }
 
  
 
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.title='今日热闻';
    this.getLatestNews();
    setTimeout(() => {//todo 异步操作完成并且刷新结束
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if (this.currentNewsDate) {
      this.stoiesService.getOldNews(this.currentNewsDate).subscribe(result => {
        for (var i = 0; i < result.stories.length; i++) {
          if (result.stories[i].images && result.stories[i].images.length > 0) {
            let url = result.stories[i].images[0];
            result.stories[i].images[0] = url.replace(/http[s]*:\/\//, '//images.weserv.nl/?url=');
          }
        }
        this.currentNewsDate=result.date;
        var dateStr= this.currentNewsDate.substr(4,2)+'月'+this.currentNewsDate.substr(6,2)+"日"
        this.oldNews.push({ date: dateStr, stories: result.stories });
        infiniteScroll.complete();
        this.title = dateStr;
      });
    } else {
      infiniteScroll.complete();
    }

  }


  getLatestNews() {
    this.stoiesService.getStories().subscribe(result => {
      for (var i = 0; i < result.stories.length; i++) {
        if (result.stories[i].images && result.stories[i].images.length > 0) {
          let url = result.stories[i].images[0];
          result.stories[i].images[0] = url.replace(/http[s]*:\/\//, '//images.weserv.nl/?url=');
        }
      }
      for (var i = 0; i < result.top_stories.length; i++) {
        if (result.top_stories[i].image) {
          let url = result.top_stories[i].image;
          result.top_stories[i].image = url.replace(/http[s]*:\/\//, '//images.weserv.nl/?url=');
        }
      }
      this.stories = result.stories;
      this.topStories = result.top_stories;
      this.currentNewsDate = result.date;
    }).add(function () {
      console.log('subscribeadd');
    });
  }

  storyShow(story: Story) {
    this.navCtrl.push(StoryDetailPage, story);
  }




  ngOnInit(): void {
    this.getLatestNews();
    setInterval(() => {
      if (this.slider.isEnd()) {
        this.slider.slideTo(0, 500);
        return;
      }
      this.slider.slideNext(500, false);
    }, 4000);
  }


}