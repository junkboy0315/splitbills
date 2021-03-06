import { animate, group, keyframes, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { PersonListService } from '../shared/personlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

  // see: https://coursetro.com/posts/code/78/Creating-Stagger-Animations-in-Angular-4
  // see: https://www.yearofmoo.com/2017/06/new-wave-of-animation-features.html
  animations: [
    trigger('onPersonListChange', [
      transition('* => *', [
        // to run 3 queries at a time
        group([
          // search all the entering element inside [@onPersonListChange] is placed
          query(
            '.container-of-person-list:enter, .list-group-item:enter', // 'container-of-person-list' is for first entry
            animate(
              '0.15s ease-out',
              keyframes([
                style({ opacity: 0, transform: 'translateX(-50%)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(0%)', offset: 1 }),
              ]),
            ),
            { optional: true },
          ),

          query(
            '.container-of-person-list:leave, .list-group-item:leave', // 'container-of-person-list' is for last leave
            animate(
              '0.15s ease-out',
              keyframes([
                style({
                  opacity: 1.0,
                  transform: 'scaleY(1)',
                  height: '100%',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  offset: 0,
                }),
                style({
                  opacity: 0.0,
                  transform: 'scaleY(0)',
                  height: 0,
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  offset: 1,
                }),
              ]),
            ),
            { optional: true },
          ),

          query(
            '#total-person-count',
            animate(
              '0.15s ease-in',
              keyframes([
                style({ opacity: 1.0, transform: 'scale(1.5)', offset: 0 }),
                style({ opacity: 1.0, transform: 'scale(1)', offset: 1 }),
              ]),
            ),
            { optional: true },
          ),
        ]),
      ]),
    ]),
  ],
})
export class MainComponent {
  constructor(public personListService: PersonListService) {}

  addPerson() {
    this.personListService.addPerson();
  }
}
