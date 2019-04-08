/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { IntangibletypeListingComponent } from './intangibletype-listing.component';

let component: IntangibletypeListingComponent;
let fixture: ComponentFixture<IntangibletypeListingComponent>;

describe('intangibletype-listing component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ IntangibletypeListingComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(IntangibletypeListingComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});