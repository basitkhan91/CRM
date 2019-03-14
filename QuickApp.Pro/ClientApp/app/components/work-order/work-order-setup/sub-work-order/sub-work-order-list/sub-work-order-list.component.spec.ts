/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SubWorkOrderListComponent } from './sub-work-order-list.component';

let component: SubWorkOrderListComponent;
let fixture: ComponentFixture<SubWorkOrderListComponent>;

describe('SubWorkOrderList component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SubWorkOrderListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SubWorkOrderListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});