import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';
import { AtaMainService } from '../../../services/atamain.service';

@Component({
    selector: 'app-customer-ata',
    templateUrl: './customer-ata.component.html',
    styleUrls: ['./customer-ata.component.scss'],

})
/** anys component*/
export class CustomerATAInformationComponent implements OnInit {
    LoadAtachapter: any = [];
    ataMainchapter: any;
    atasubchapter: any;
    ataChapter: any;
    atasubchapterValues: any;

constructor(
    private atasubchapter1service: AtaSubChapter1Service,
    private atamain: AtaMainService,
){}

ngOnInit(){
this.getAllATAChapter();
this.getAllATASubChapter();

// this.ataChapter = this.LoadAtachapter;

}

    getAllATAChapter() {
        this.atamain.getAtaMainList().subscribe(Atachapter => {
            this.ataMainchapter = Atachapter[0];
            for (let i = 0; i < this.ataMainchapter.length; i++) {
                this.LoadAtachapter.push(
                    { value: this.ataMainchapter[i].ataChapterId, label: this.ataMainchapter[i].ataChapterName },
                );
            }
        });
    }

    getAllATASubChapter() {
        this.atasubchapter1service.getAtaSubChapter1List().subscribe(res => {
            this.atasubchapter = res[0].map(x => {
                return {
                    label: x.description,
                    value: x
                }
            })
        })
        // this.atasubchapterValues = this.atasubchapter;
    }
}