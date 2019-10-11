import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuditComponent } from "../components/Audit/audit.component";
import { AppSiteAuditComponent } from "../components/Audit/AppSiteAudit/app-site-audit.component";

@NgModule({
  declarations: [AuditComponent, AppSiteAuditComponent],

  imports: [CommonModule],

  exports: [AuditComponent, AppSiteAuditComponent],

  providers: [],

  bootstrap: [AuditComponent]
})
export class AuditModule {}
