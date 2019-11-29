import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Menu} from '../shared/menu-items/menu-items';
import {Router} from '@angular/router';
import {NavService} from './nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean;
  itemicon: boolean;
  iconsvg: any;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: Menu;
  @Input() depth: number;

  constructor(public navService: NavService,
              public router: Router,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer
              ) {
    this.itemicon = false;
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      // if (this.item.children !== null && this.item.kdParent !== null) {
      //   this.itemicon = true;
      //   this.iconsvg = this.item.icon;
      //   this.matIconRegistry.addSvgIcon(
      //     this.item.icon,
      //     this.domSanitizer.bypassSecurityTrustResourceUrl('../best/assets/' + this.iconsvg + '.svg')
      //   );
      // } else if (this.item.children === null && this.item.kdParent === null) {
      //   this.itemicon = true;
      //   this.iconsvg = this.item.icon;
      //   this.matIconRegistry.addSvgIcon(
      //     this.item.icon,
      //     this.domSanitizer.bypassSecurityTrustResourceUrl('../best/assets/' + this.iconsvg + '.svg')
      //   );
      // } else {
      //   this.itemicon = false;
      // }
      if (this.item.state && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.state}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: Menu) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.state]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
