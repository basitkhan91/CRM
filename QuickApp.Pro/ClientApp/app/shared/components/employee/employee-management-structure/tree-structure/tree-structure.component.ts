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
        if(this.employeeService.legalEnityList.indexOf(structure.data.managementStructureId) != -1){
            let index = this.employeeService.legalEnityList.indexOf(structure.data.managementStructureId);
            this.employeeService.legalEnityList.splice(index, index+1);
        }
        else{
            this.employeeService.legalEnityList.push(structure.data.managementStructureId);
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
}