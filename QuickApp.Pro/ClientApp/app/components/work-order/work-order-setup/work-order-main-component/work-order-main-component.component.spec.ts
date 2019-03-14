/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { WorkOrderMainComponentComponent } from './work-order-main-component.component';

let component: WorkOrderMainComponentComponent;
let fixture: ComponentFixture<WorkOrderMainComponentComponent>;

describe('WorkOrderMainComponent component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WorkOrderMainComponentComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(WorkOrderMainComponentComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});