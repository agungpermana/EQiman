import { Component, ViewChild } from '@angular/core';
import { AssetListService, AssetList } from './asset-list.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-asset-list',
    templateUrl: './asset-list.component.html',
    styleUrls: ['./asset-list.component.scss'],
    providers: [AssetListService],
})
export class AssetListComponent {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    public array: any;
    dataSource: any;
    displayedColumns: string[] = ['select', 'no', 'ecode', 'kategori', 'asset', 'manager', 'lokasi', 'pemeriksaan', 'hasilpemeriksaan'];
    selection: any;
    pageSize = 10;
    currentPage = 0;
    totalSize = 0;

    constructor(private service: AssetListService) {
        this.dataSource = new MatTableDataSource<AssetList>(this.service.getAsset());
        // this.getArray();
        this.selection = new SelectionModel<AssetList>(true, []);
    }

    // private getArray() {
    //     const data = this.service.getAssetList();
    //     data.subscribe((response: AssetList[]) => {
    //         this.dataSource = new MatTableDataSource<AssetList>(response);
    //         this.dataSource.paginator = this.paginator;
    //         this.array = response;
    //         this.totalSize = this.array.length;
    //         this.iterator();
    //       });
    // }

    // private iterator() {
    //     const end = (this.currentPage + 1) * this.pageSize;
    //     const start = this.currentPage * this.pageSize;
    //     const part = this.array.slice(start, end);
    //     this.dataSource = part;
    // }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: AssetList): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no + 1}`;
    }
}
