/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { StocklineAdjustmentReasonComponent } from './stockline-adjustment-reason.component';

let component: StocklineAdjustmentReasonComponent;
let fixture: ComponentFixture<StocklineAdjustmentReasonComponent>;

describe('stockline-adjustment-reason component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ StocklineAdjustmentReasonComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(StocklineAdjustmentReasonComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});