/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { GateCodeComponent } from './gate-code.component';

let component: GateCodeComponent;
let fixture: ComponentFixture<GateCodeComponent>;

describe('GateCode component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GateCodeComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(GateCodeComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});