import { Component } from '@angular/core';
import * as Flickr   from 'flickr-sdk';
import * as _        from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchVal : string;
  busy      : Promise<any>;
  link      : any;
  serachST  : any;
  flickr    : any;
  photos    : any;
  lines     : any;
  resolves  : any;

  constructor() {
    this.searchVal = '';
    this.serachST  = null;
    this.photos    = [];
    this.lines     = 0;
    this.busy      = null;
    this.resolves  = [];
    this.flickr    = Flickr('87ca6d68325684d7ed3c92331adcea37');
    //this.flickr = Flickr.tokenOnly({
    //  api_key: "87ca6d68325684d7ed3c92331adcea37"
    //});
  }

  changeSearch(){
    clearTimeout(this.serachST);

    this.busy = new Promise((resolve) => {
      this.resolves.push(resolve);

      this.serachST = setTimeout(() => {
        this.flickr.photos.search({text: this.searchVal}).then((res) => {

          res.body.photos.photo = _.map(res.body.photos.photo, p => {
            p['link'] = `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_w.jpg`;
            return p;
          });

          let i        = 0;
          this.photos  = [];
          let arrayRow = [];
          _.each(res.body.photos.photo, p => {
            arrayRow.push(p);
            i = i + 1;

            if(i == 4){
              this.photos.push(arrayRow);
              i        = 0;
              arrayRow = [];
            }
          });

          _.each(this.resolves, r => r({success: true}));
        }).catch(function (err) {
          console.error('search', err);
        });
      }, 1500);

    });

  }
}
