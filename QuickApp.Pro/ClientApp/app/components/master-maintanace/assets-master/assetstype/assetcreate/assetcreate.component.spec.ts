/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AssetcreateComponent } from './assetcreate.component';

let component: AssetcreateComponent;
let fixture: ComponentFixture<AssetcreateComponent>;

describe('assetcreate component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssetcreateComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AssetcreateComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});