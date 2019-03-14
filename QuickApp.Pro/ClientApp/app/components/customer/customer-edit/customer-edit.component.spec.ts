/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CustomerEditComponent } from './customer-edit.component';

let component: CustomerEditComponent;
let fixture: ComponentFixture<CustomerEditComponent>;

describe('CustomerEdit component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CustomerEditComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CustomerEditComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});