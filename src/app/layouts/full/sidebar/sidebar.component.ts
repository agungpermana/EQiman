import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
import { MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class AppSidebarComponent implements OnDestroy {
  expanded: boolean;
  expanded2: boolean;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onItemSelected(item: Menu) {
    console.log('onItemSelected', item);
    if (!item.children || !item.children.length) {
      this.router.navigate([item.state]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
  onItemSelected2(item: Menu) {
    console.log('onItemSelected2', item);
    if (!item.children || !item.children.length) {
      this.router.navigate([item.state]);
    }
    if (item.children && item.children.length) {
      this.expanded2 = !this.expanded2;
    }
  }
  public onMenuClose() {
    console.log('menu closed');
  }

  public onMenuOpen() {
    console.log('menu Opened');
  }

  private onItemSelect(item: any) {
    console.log(item);
  }
}
