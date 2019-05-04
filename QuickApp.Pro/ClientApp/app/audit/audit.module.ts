
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuditComponent } from "../components/Audit/audit.component";

@NgModule({
	declarations: [
		AuditComponent
    ],

    imports: [
        CommonModule
    ],

    exports: [
        AuditComponent
    ],

    providers: [
    ],

    bootstrap: [
        AuditComponent
    ],

})
export class AuditModule {

}