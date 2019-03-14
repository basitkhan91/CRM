/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ActionAttributesComponent } from './action-attributes.component';

let component: ActionAttributesComponent;
let fixture: ComponentFixture<ActionAttributesComponent>;

describe('ActionAttributes component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ActionAttributesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ActionAttributesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});