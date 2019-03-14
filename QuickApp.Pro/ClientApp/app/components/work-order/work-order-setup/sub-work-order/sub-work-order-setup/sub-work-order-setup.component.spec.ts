/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SubWorkOrderSetupComponent } from './sub-work-order-setup.component';

let component: SubWorkOrderSetupComponent;
let fixture: ComponentFixture<SubWorkOrderSetupComponent>;

describe('SubWorkOrderSetup component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SubWorkOrderSetupComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SubWorkOrderSetupComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});