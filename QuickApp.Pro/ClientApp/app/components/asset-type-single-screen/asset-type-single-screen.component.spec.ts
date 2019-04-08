/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AssetTypeSingleScreenComponent } from './asset-type-single-screen.component';

let component: AssetTypeSingleScreenComponent;
let fixture: ComponentFixture<AssetTypeSingleScreenComponent>;

describe('AssetTypeSingleScreen component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssetTypeSingleScreenComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AssetTypeSingleScreenComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});