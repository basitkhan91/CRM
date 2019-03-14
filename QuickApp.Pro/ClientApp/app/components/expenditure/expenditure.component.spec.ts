/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ExpenditureComponent } from './expenditure.component';

let component: ExpenditureComponent;
let fixture: ComponentFixture<ExpenditureComponent>;

describe('Expenditure component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ExpenditureComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ExpenditureComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});