import { NewsThemesPage } from './../pages/news-themes/news-themes';
import { StoriesService } from './../services/stories.service';
import { Theme } from './../model/theme';
import { StoryListPage } from './../pages/story-list/story-list';
import { Component, ViewChild, OnInit } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {


  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = StoryListPage;
  pages: Array<{ title: string, component: any }>;
  themes: Theme[];
  constructor(
    public storiesService: StoriesService,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '首页', component: StoryListPage },
    ];
  }

  getThemes() {
    this.storiesService.getThemes().subscribe(result => {
      this.themes = result;
    });
  }
  ngOnInit(): void {
    this.getThemes();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }


  openNewsTheme(newsTheme: Theme) {
    this.menu.close();
    this.nav.setRoot(NewsThemesPage, newsTheme)
  }
}
