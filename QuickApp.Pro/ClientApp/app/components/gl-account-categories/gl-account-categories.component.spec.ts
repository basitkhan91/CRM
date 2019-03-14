/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { GLAccountCategoryComponent } from './gl-account-categories.component';

let component: GLAccountCategoryComponent;
let fixture: ComponentFixture<GLAccountCategoryComponent>;

describe('gl-account-categories component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
			declarations: [GLAccountCategoryComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
		fixture = TestBed.createComponent(GLAccountCategoryComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});