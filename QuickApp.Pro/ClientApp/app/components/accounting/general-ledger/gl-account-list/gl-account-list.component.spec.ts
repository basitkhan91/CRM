/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { GlAccountListComponent } from './gl-account-list.component';

let component: GlAccountListComponent;
let fixture: ComponentFixture<GlAccountListComponent>;

describe('gl-account-list component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GlAccountListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(GlAccountListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});