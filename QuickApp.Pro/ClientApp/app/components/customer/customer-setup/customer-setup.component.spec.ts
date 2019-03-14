/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CustomerSetupComponent } from './customer-setup.component';

let component: CustomerSetupComponent;
let fixture: ComponentFixture<CustomerSetupComponent>;

describe('CustomerSetup component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CustomerSetupComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CustomerSetupComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});