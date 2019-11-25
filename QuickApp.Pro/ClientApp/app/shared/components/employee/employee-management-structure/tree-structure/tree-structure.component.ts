import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../../services/employee.service';


@Component({
    selector: 'app-tree-structure',
    templateUrl: './tree-structure.component.html',
    styleUrls: ['./tree-structure.component.scss']
})
/** employees-list component*/
export class TreeStructureComponent implements OnInit{
    @Input() gridData:any[];
    constructor(public employeeService: EmployeeService){
        // console.log(this.gridData);
    }
    storeLegalEntity(structure){
        var findIndex = -1;
        this.employeeService.legalEnityList.forEach((legEntity, index)=>{
            if(legEntity.managementStructureId == structure.data.managementStructureId){
                findIndex = index;
            }
        })
        if(findIndex != -1){
            this.employeeService.legalEnityList.splice(findIndex, findIndex+1);
            document.getElementById(`${structure.data.managementStructureId}`)['checked'] = false;
        }
        else{
            document.getElementById(`${structure.data.managementStructureId}`)['checked'] = true;
            this.employeeService.legalEnityList.push({
                managementStructureId: structure.data.managementStructureId,
                isActive: structure.data.isActive,
                isDeleted: structure.data.isDeleted
            });
        }
        if(structure.children){
            structure.children.forEach(element => {
                this.storeLegalEntity(element)
            });
        }
    }
    ngOnInit(){
        this.structureInit();
    }

    structureInit(){
        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
        }
    }

    checkLegalEntityExist(id){
        this.employeeService.legalEnityList.forEach((legEntity, index)=>{
            if(id == legEntity.managementStructureId){
                return true;
            }
        })
        return false;
    }
}