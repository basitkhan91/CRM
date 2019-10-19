import { Component,OnInit} from '@angular/core';
// import { AssetTypeService } from '../../../../../services/AssetType/assettype.service';
import { Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
// import { AlertService } from '../../../../../services/alert.service';
// import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOut } from '../../services/animations';
import {LegalEntityService} from '../../services/legalentity.service';
import { ThrowStmt } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-mgmt-structure',
    templateUrl: './mgmt-structure.component.html',
    styleUrls: ['./mgmt-structure.component.scss'],
    animations: [fadeInOut]
})
/** assettypelisting component*/
export class MgmtStructureComponent implements OnInit {
     allmgmtData:any[];
     companyList:any[];
     buList:any[];
     divisionList:any[];
     departmentList:any[];
     selectedCompanyID:number=0;
     selectedBUId:number=0;
     selectedDivisionID:number=0;
     selectedDeptID:number=0;
     @Output() mgmtStructureId:any = new EventEmitter<number>();
    /**
     *
     */
    constructor(public legalEntityService: LegalEntityService){
        
    }
    ngOnInit() {
      this.loadManagementdata();
    }
    private loadManagementdata() {
		this.legalEntityService.getManagemententity().subscribe(
			results => this.loadHierarchy(results[0]),
			//error => this.onDataLoadFailed(error)
		);
    }
    loadHierarchy(mgmtStructureData){
      this.allmgmtData=mgmtStructureData;
      this.companyList= this.allmgmtData.filter(c=> c.parentId==null);
      }
      getBUList() {
      console.log(`Company :${ this.selectedCompanyID}`);
      this.mgmtStructureId.emit(this.selectedCompanyID);
      this.divisionList=[];
      this.departmentList=[];
      this.selectedBUId=0;
      this.selectedDeptID=0;
      this.selectedDivisionID=0;
       this.buList=this.allmgmtData.filter(c=>c.parentId===this.selectedCompanyID);
      }
    getDivisionList()
    {
      console.log(`BU :${ this.selectedBUId}`);
      this.mgmtStructureId.emit(this.selectedBUId);
      this.departmentList=[];
      this.selectedDeptID=0;
      this.selectedDivisionID=0;
       this.divisionList=this.allmgmtData.filter(c=>c.parentId===this.selectedBUId);
    }
    getDeptList(){
      console.log(`Division id :${ this.selectedDivisionID}`);
      this.mgmtStructureId.emit(this.selectedDivisionID);
     this.departmentList=this.allmgmtData.filter(c=>c.parentId===this.selectedDivisionID);
    }
    setstructureId(){
      this.mgmtStructureId=this.selectedDeptID;
    }
     
}