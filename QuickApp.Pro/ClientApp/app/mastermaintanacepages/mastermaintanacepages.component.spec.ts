/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { MastermaintanacepagesComponent } from './mastermaintanacepages.component';

let component: MastermaintanacepagesComponent;
let fixture: ComponentFixture<MastermaintanacepagesComponent>;

describe('mastermaintanacepages component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MastermaintanacepagesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(MastermaintanacepagesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});