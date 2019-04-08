/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AssettypelistingComponent } from './assettypelisting.component';

let component: AssettypelistingComponent;
let fixture: ComponentFixture<AssettypelistingComponent>;

describe('assettypelisting component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssettypelistingComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AssettypelistingComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});