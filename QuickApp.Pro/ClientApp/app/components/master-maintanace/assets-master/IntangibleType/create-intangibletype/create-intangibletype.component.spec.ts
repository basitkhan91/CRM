/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CreateIntangibletypeComponent } from './create-intangibletype.component';

let component: CreateIntangibletypeComponent;
let fixture: ComponentFixture<CreateIntangibletypeComponent>;

describe('create-intangibletype component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CreateIntangibletypeComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CreateIntangibletypeComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});