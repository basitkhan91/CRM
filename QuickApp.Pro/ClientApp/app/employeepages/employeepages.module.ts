﻿import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
import { EmployeepagesRoutingModule } from "./employeepages-routing.module";
import { EmployeePagesComponent } from "./employeepages.component";
import { CommonModule } from '@angular/common'; //<-- This one
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from "primeng/autocomplete";

import { StepsModule } from 'primeng/steps';//Prime Ng Steps
import { DialogModule } from 'primeng/dialog'; //Prime Ng Dailog
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { GMapModule } from 'primeng/gmap';
import { CalendarModule } from 'primeng/calendar';

import { RadioButtonModule } from 'primeng/radiobutton';
import { EmployeesListComponent } from "../shared/components/employee/employee-list/employees-list.component";
import { EmployeeGeneralInformationComponent } from "../shared/components/employee/employee-general-information/employee-general-information.component";
import { EmployeeCertificationComponent } from "../shared/components/employee/employee-certification/employee-certification.component";
import { EmployeeTrainingComponent } from "../shared/components/employee/employee-training/employee-training.component";
import { EmployeeStepsPrimeNgComponent } from "../shared/components/employee/employee-steps-prime-ng/employee-steps-prime-ng.component";
@NgModule({
    imports: [
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        QuickAppProMaterialModule,
        TranslateModule,
        CommonModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
        MultiSelectModule,
        EmployeepagesRoutingModule,
        InputSwitchModule,
        CheckboxModule,
        AutoCompleteModule,
        GMapModule
		, RadioButtonModule,
        CalendarModule, StepsModule, BreadcrumbModule,
        DialogModule
    ],
    declarations: [
        EmployeePagesComponent,
		EmployeesListComponent,
		EmployeeGeneralInformationComponent,
		EmployeeCertificationComponent,
		EmployeeTrainingComponent,
		EmployeeStepsPrimeNgComponent
    ],
    providers: [
      
    ],
    entryComponents: [
       
    ],


})
export class EmployeepagesModule {

}