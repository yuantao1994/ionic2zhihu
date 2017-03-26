import { ThemeNews } from './../../model/theme';
import { StoriesService } from './../../services/stories.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Story } from "../../model/story";
import { StoryDetailPage } from "../story-detail/story-detail";

/*
  Generated class for the NewsThemes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news-themes',
  templateUrl: 'news-themes.html'
})
export class NewsThemesPage implements OnInit {
  ngOnInit(): void {
    this.storiesService.getThemeNews(this.themeId).subscribe(result => {
      for (var i = 0; i < result.stories.length; i++) {
        if (result.stories[i].images && result.stories[i].images.length > 0) {
          let url = result.stories[i].images[0];
          result.stories[i].images[0] = url.replace(/http[s]*:\/\//, '//images.weserv.nl/?url=');
        }
      }
    for (let j = 0; j < result.editors.length; j++) {
        if (result.editors[j].avatar) {
          let url = result.editors[j].avatar;
          result.editors[j].avatar = url.replace(/http[s]*:\/\//, '//images.weserv.nl/?url=');
        }
    }
      this.themeNews = result;
    });
  }

  themeId: number;
  _themeNews: ThemeNews
  constructor(
    public storiesService: StoriesService,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.themeId = navParams.data.id;
  }

  set themeNews(value: ThemeNews) {
    this._themeNews = value;
  }
  get themeNews() {
    return this._themeNews;
  }
  storyShow(story: Story) {
    this.navCtrl.push(StoryDetailPage, story);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsThemesPage');

  }

}
