/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { VendorEditComponent } from './vendor-edit.component';

let component: VendorEditComponent;
let fixture: ComponentFixture<VendorEditComponent>;

describe('VendorEdit component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VendorEditComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(VendorEditComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});