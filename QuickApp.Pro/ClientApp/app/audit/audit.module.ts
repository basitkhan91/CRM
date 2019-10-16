import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuditComponent } from "../components/Audit/audit.component";
import { AppSiteAuditComponent } from "../components/Audit/AppSiteAudit/app-site-audit.component";
import { AppSiteAuditNoHistoryComponent } from "../components/Audit/AuditNoHistory/app-site-audit-no-history.component";
import { WareHouseAuditComponent } from "../components/Audit/WareHouseAudit/warehouse-audit.component";
import { AuditNoHistoryComponent } from "../components/Audit/AuditNoHistory/audit-no-history.component";

@NgModule({
  declarations: [
    AuditComponent,
    AuditNoHistoryComponent,
    AppSiteAuditComponent,
    AppSiteAuditNoHistoryComponent,
    WareHouseAuditComponent
  ],

  imports: [CommonModule],

  exports: [
    AuditComponent,
    AuditNoHistoryComponent,
    AppSiteAuditComponent,
    AppSiteAuditNoHistoryComponent,
    WareHouseAuditComponent
  ],

  providers: [],

  bootstrap: [AuditComponent]
})
export class AuditModule {}
