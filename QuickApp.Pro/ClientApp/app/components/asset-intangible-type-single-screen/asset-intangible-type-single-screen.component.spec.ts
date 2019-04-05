/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AssetIntangibleTypeSingleScreenComponent } from './asset-intangible-type-single-screen.component';

let component: AssetIntangibleTypeSingleScreenComponent;
let fixture: ComponentFixture<AssetIntangibleTypeSingleScreenComponent>;

describe('AssetIntangibleTypeSingleScreen component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssetIntangibleTypeSingleScreenComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AssetIntangibleTypeSingleScreenComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});