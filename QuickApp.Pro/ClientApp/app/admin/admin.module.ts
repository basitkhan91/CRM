// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from "./admin-routing.module";

import { AdminComponent } from "./admin.component";
import { RoleListComponent } from "./role-list.component";
import { EditRoleDialogComponent } from "./edit-role-dialog.component";
import { RoleEditorComponent } from './role-editor.component';
import { UserListComponent } from "./user-list.component";
import { EditUserDialogComponent } from "./edit-user-dialog.component";
import { GlobalSettingsComponent } from "./global-settings/global-settings.component";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { SelectButtonModule } from "primeng/selectbutton";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { InputSwitchModule } from "primeng/inputswitch";
import { CheckboxModule } from "primeng/checkbox";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BreadcrumbModule } from 'primeng/breadcrumb'; //bread crumb

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
        MultiSelectModule,
        InputSwitchModule,
        CheckboxModule,
        AutoCompleteModule,
        BreadcrumbModule
    ],
    declarations: [
        AdminComponent,
        RoleListComponent,
        EditRoleDialogComponent,
        RoleEditorComponent,
        UserListComponent,
        EditUserDialogComponent,
        GlobalSettingsComponent
    ],
    entryComponents: [
        EditUserDialogComponent,
        EditRoleDialogComponent
    ]
})
export class AdminModule
{

}