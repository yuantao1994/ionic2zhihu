import { Theme, ThemeNews } from './../model/theme';
import { StoryDetail } from './../model/storyDetail';
import { StoriesRoot } from './../model/stroies';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Story } from "../model/story";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StoriesService {
    private stroiesUrl = 'http://news-at.zhihu.com/api/4/news/latest';
    private storyDetailUrl = 'http://news-at.zhihu.com/api/4/news/';
    private themesUrl = 'http://news-at.zhihu.com/api/4/themes';
    private beforeNewsUrl = 'http://news-at.zhihu.com/api/4/news/before/'

    constructor(private http: Http) {

    }

    //获取今日新闻
    getStories(): Observable<StoriesRoot> {
        // return this.http.get(this.stroiesUrl).toPromise()
        //     .then(response =>
        //         response.json() as StoriesRoot
        //     ).catch(this.handleError)
        return this.http.get(this.stroiesUrl).map(response => response.json() as StoriesRoot)
    }

    //获取新闻详情
    getStroy(id: number): Observable<StoryDetail> {
        let url = this.storyDetailUrl + id;
        // return this.http.get(url).toPromise()
        //     .then((response) =>
        //     {
        //         var json = response.json();
        //         var storyBody= json as Story ;
        //         return Promise.resolve<Story>(storyBody);
        //     })
        //     .catch(this.handleError);
        return this.http.get(url).map(response => response.json() as StoryDetail);
    }

    //查询新闻主题
    getThemes(): Observable<Theme[]> {
        return this.http.get(this.themesUrl).map(response =>
            response.json().others as Theme[]);
    }


    //根据主题查询日报新闻
    getThemeNews(id: number): Observable<ThemeNews> {
        return this.http.get('http://news-at.zhihu.com/api/4/theme/' + id).map(response => response.json() as ThemeNews);
    }


    //查询历史新闻
    getOldNews(date: string): Observable<StoriesRoot> {
        return this.http.get(this.beforeNewsUrl + date).map(response => response.json() as StoriesRoot);
    }
}