/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { VendorSetupComponent } from './vendor-setup.component';

let component: VendorSetupComponent;
let fixture: ComponentFixture<VendorSetupComponent>;

describe('VendorSetup component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VendorSetupComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(VendorSetupComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});