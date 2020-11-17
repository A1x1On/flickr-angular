import { Component } from '@angular/core';
import * as Flickr   from 'flickr-sdk';
import * as _        from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  busy      : Promise<any>;
  flickr    : Flickr;
  search    : any;

  constructor() {
    this.busy   = null;
    this.flickr = Flickr('87ca6d68325684d7ed3c92331adcea37');
    this.search = {
      value    : '',
      photos   : [],
      resolves : [],
      timeOut  : null,
    };
  }

  changeSearch(){
    clearTimeout(this.search.timeOut);

    this.busy = new Promise((resolve) => {
      this.search.resolves.push(resolve);

      this.search.timeOut = setTimeout(() => {
        this.flickr.photos.search({text: this.search.value}).then((res) => {

          res.body.photos.photo = _.map(res.body.photos.photo, p => {
            p['link'] = `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_w.jpg`;
            return p;
          });

          this.search.photos  = [];
          let i               = 0;
          let arrayRow        = [];
          _.each(res.body.photos.photo, p => {
            arrayRow.push(p);
            i = i + 1;

            if(i == 4){
              this.search.photos.push(arrayRow);
              i        = 0;
              arrayRow = [];
            }
          });

          _.each(this.search.resolves, r => r({success: true}));
        }).catch(function (err) {
          console.error('search', err);
        });
      }, 1500);

    });

  }
}
