import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AssetList {
    no: number;
    ecode: string;
    kategori: string;
    asset: string;
    manager: string;
    lokasi: string;
    pemeriksaan: string;
    hasilpemeriksaan: string;
}

@Injectable({ providedIn: 'root' })
export class AssetListService {

    ELEMENT_DATA: AssetList[] = [
        { no: 1, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 2, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 3, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 4, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 5, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 6, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 7, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 8, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 9, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' },
        { no: 10, ecode: 'test', kategori: 'test', asset: 'test',
            manager: 'test', lokasi: 'test', pemeriksaan: '2019-11-30', hasilpemeriksaan: 'good' }
    ];
    constructor() { }

    getAssetList(): any {
        const elementObservable = new Observable(observer => {
            setTimeout(() => {
                observer.next(this.ELEMENT_DATA);
            }, 1000);
        });
        return elementObservable;
    }

    getAsset() {
        return this.ELEMENT_DATA;
    }
}
