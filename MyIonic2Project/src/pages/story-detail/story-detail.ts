import { StoriesService } from './../../services/stories.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoryDetail } from "../../model/StoryDetail";

import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from "../../../node_modules/.2.3.0@ionic-angular/components/loading/loading";

/*
  Generated class for the StoryDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-story-detail',
  templateUrl: 'story-detail.html'
})
export class StoryDetailPage implements OnInit {

  srcUrl: any;
  storyId: number;
  storyDetial: StoryDetail;
  constructor(
    public loadingCtrl:LoadingController,
    private sanitizer: DomSanitizer,
    public storiesService: StoriesService,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.storyId = this.navParams.data.id;
    let loading = this.loadingCtrl.create({
     // content: '请稍后...',
      dismissOnPageChange:true,
      showBackdrop:false
    });
    loading.present();
 
    setTimeout(() => {
      loading.dismiss();
    }, 5000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryDetailPage');
  }

  getStoryDetail() {
    this.storiesService.getStroy(this.storyId).subscribe(result => {
      if (result.type == 0) {
        if (result.image) {
          result.image = result.image.replace(/http[s]*:\/\//, '//images.weserv.nl/?url=');
        }
        result.body = result.body.replace(/http[s]*:\/\/pic[1-4]{1}/g, '//images.weserv.nl/?url=pic3');
        this.storyDetial = result as StoryDetail;
      } else {
        this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result.share_url);
      }
    });
  }

  ngOnInit(): void {
    this.getStoryDetail();
  }
}
