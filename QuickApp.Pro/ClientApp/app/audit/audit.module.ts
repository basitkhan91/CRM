import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuditComponent } from "../components/Audit/audit.component";
import { AppSiteAuditComponent } from "../components/Audit/AppSiteAudit/app-site-audit.component";
import { AppSiteAuditNoHistoryComponent } from "../components/Audit/AuditNoHistory/app-site-audit-no-history.component";
import { WareHouseAuditComponent } from "../components/Audit/WareHouseAudit/warehouse-audit.component";

@NgModule({
  declarations: [
    AuditComponent,
    AppSiteAuditComponent,
    AppSiteAuditNoHistoryComponent,
    WareHouseAuditComponent
  ],

  imports: [CommonModule],

  exports: [
    AuditComponent,
    AppSiteAuditComponent,
    AppSiteAuditNoHistoryComponent,
    WareHouseAuditComponent
  ],

  providers: [],

  bootstrap: [AuditComponent]
})
export class AuditModule {}
