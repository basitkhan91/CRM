/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { MgmtStructureComponent } from './mgmt-structure.component';

let component: MgmtStructureComponent;
let fixture: ComponentFixture<MgmtStructureComponent>;

describe('assetcreate component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MgmtStructureComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(MgmtStructureComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});