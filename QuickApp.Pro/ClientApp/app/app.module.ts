// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//import { Http } from '@angular/http’;
//import { HttpModule } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts';
import { NgxCarouselModule } from 'ngx-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { Globals } from './globals';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { SettingsModule } from './settings/settings.module';
import { FooterModule } from './shared/footer.component';
import { ThemePickerModule } from './shared/theme-picker.component';
import { AppTitleService } from './services/app-title.service';
import {
  AppTranslationService,
  TranslateLanguageLoader
} from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { WorkFlowtService } from './services/workflow.service';
import { WorkFlowEndpoint } from './services/workflow-endpoint.service';
import { ActionService } from './services/action.service';
import { ActionEndpoint } from './services/action-endpoint.service';
import { AtaMainService } from './services/atamain.service';
import { ATAMainEndpoint } from './services/atamain-endpoint.service';
import { AtaSubChapter1Service } from './services/atasubchapter1.service';
import { ATASubChapter1Endpoint } from './services/atasubchapter1-endpoint.service';
import { AtaSubChapter2Service } from './services/atasubchapter2.service';
import { ATASubChapter2Endpoint } from './services/atasubchapter2-endpoint.service';
import { SiteService } from './services/site.service';
import { SiteEndpoint } from './services/site-endpoint.service';
import { BinService } from './services/bin.service';
import { BinEndpoint } from './services/bin-endpoint.service';
import { CurrencyService } from './services/currency.service';
import { CurrencyEndpoint } from './services/currency-endpoint.service';
import { ConditionService } from './services/condition.service';
import { ConditionEndpoint } from './services/condition-endpoint.service';
import { FindingService } from './services/finding.service';
import { FindingEndpoint } from './services/finding-endpoint.service';
import { TaxRateService } from './services/taxrate.service';
import { TaxRateEndpointService } from './services/taxrate-endpoint.service';
import { VendorClassificationService } from './services/vendorclassification.service';
import { VendorClassificationEndpoint } from './services/vendorclassification-endpoint.service';
import { WorkPerformedService } from './services/workperformed.service';
import { WorkPerformedEndpointService } from './services/workperformed-endpoint.service';
import { MasterCompanyEndpoint } from './services/mastercompany-endpoint.service';
import { MasterComapnyService } from './services/mastercompany.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginControlComponent } from './components/login/login-control.component';
import { LoginDialogComponent } from './components/login/login-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RmaComponent } from './components/receiving/rma/rma.component';
import { SalesOrderComponent } from './components/receiving/sales-order/sales-order.component';
import { ShippingComponent } from './components/receiving/shipping/shipping.component';
import { LicTypeComponent } from './components/lic-type/lic-type.component';
import { OwnerComponent } from './components/owner/owner.component';
import { PlatformComponent } from './components/platform/platform.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BannerDemoComponent } from './components/controls/banner-demo.component';
import { TodoDemoComponent } from './components/controls/todo-demo.component';
import { StatisticsDemoComponent } from './components/controls/statistics-demo.component';
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';
import { AddTaskDialogComponent } from './components/controls/add-task-dialog.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditTermsService } from './services/Credit Terms.service';
import { CreditTermsEndpoint } from './services/Credit Terms-endpoint.service';
import { CustomerClassificationEndpoint } from './services/Customer Classification -endpoint.service';
import { CustomerClassificationService } from './services/CustomerClassification.service';
import { ActionAttributeEndpointService } from './services/actionattribute-endpoint';
import { ActionAttributeService } from './services/actionattribute.service';
import { GatecodeService } from './services/gatecode.service';
import { GatecodeEndpointService } from './services/gatecode-endpoint.service';
import { IntegrationService } from './services/integration-service';
import { IntegrationEndpointService } from './services/integration.endpoint-service';
import { PriorityService } from './services/priority.service';
import { PriorityEndpointService } from './services/priority-endpoint.service';
import { ItemClassificationService } from './services/item-classfication.service';
import { ItemClassificationEndpointService } from './services/item-classification-endpoint.service';
import { ItemGroupService } from './services/item-group.service';
import { ItemgroupEndpointService } from './services/item-group-endpoint.service';
import { ProvisionService } from './services/provision.service';
import { ProvisionEndpoint } from './services/provision-endpoint.service';
import { ReasonService } from './services/reason.service';
import { ReasonEndpoint } from './services/reason-endpoint.service';
import { PublicationEndpointService } from './services/publication-endpoint.service';
import { PublicationService } from './services/publication.service';
import { UnitOfMeasureService } from './services/unitofmeasure.service';
import { UnitOfMeasureEndpoint } from './services/unitofmeasure-endpoint.service';
import { WorkScopeService } from './services/workscope.service';
import { WorkScopeEndpointService } from './services/workscope-endpoint.service';
import { EmployeeExpertiseService } from './services/employeeexpertise.service';
import { EmployeeExpertiseEndpointService } from './services/employeeexpertise-endpoint.service';
import { ExpenditureCategoryEndpoint } from './services/expenditurecategory-endpoint.service';
import { ExpenditureCategoryService } from './services/expenditurecategory.service';
import { DefaultMessageEndpoint } from './services/defaultmessage-endpoint.service';
import { DefaultMessageService } from './services/defaultmessage.service';
import { DocumentEndpointService } from './services/document-endpoint.service';
import { DocumentService } from './services/document.service';
import { JobTitleService } from './services/job-title.service';
import { JobTitleEndpontService } from './services/job-title-endpoint.service';
import { CustomerService } from './services/customer.service';
import { CustomerEndpoint } from './services/customer-endpoint.service';
import { TaxTypeService } from './services/taxtype.service';
import { TaxTypeEndpointService } from './services/taxtype-endpoint.service';
import { ModalService } from '../app/services/model.service';
import { ChargeService } from './services/charge.service';
import { ChargeEndpoint } from './services/charge-endpoint.service';
import { VendorService } from './services/vendor.service';
import { VendorEndpointService } from './services/vendor-endpoint.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeEndpoint } from './services/employee-endpoint.service';
import { ItemMasterService } from './services/itemMaster.service';
import { ItemMasterEndpoint } from './services/itemMaster-endpoint.service';
import { StocklineService } from './services/stockline.service';
import { StocklineEndpoint } from './services/stockline-endpoint.service';
import { ReceivingCustomerWorkService } from './services/receivingcustomerwork.service';
import { ReceivingCustomerWorkEndpoint } from './services/receivingcustomerWork-endpoint.service';
import { LegalEntityService } from './services/legalentity.service';
import { LegalEntityEndpontService } from './services/legalentity-endpoint.service';
import { GLAccountClassService } from './services/glaccountclass.service';
import { GLAccountClassEndpoint } from './services/glaccountclass-endpoint.service';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseEndpoint } from './services/warehouse-endpoint.service';
import { GLAccountCategoryService } from './services/glaccount-category.service';
import { GLAccountCategoryEndpointservice } from './services/glaccountcategory-endpoint.service';
import { SingleScreenBreadcrumbService } from './services/single-screens-breadcrumb.service';
import { AuthService } from './services/auth.service';
import { GlCashFlowClassificationEndpoint } from './services/gl-cash-flow-classification-endpoint.service';
import { GlCashFlowClassificationService } from './services/gl-cash-flow-classification.service';
import { ManufacturerService } from './services/manufacturer.service';
import { ManufacturerEndpoint } from './services/manufacturer-endpoint.service';
import { VendorCapabilitiesService } from './services/vendorcapabilities.service';
import { VendorCapabilitiesEndpoint } from './services/vendorcapabilities-endpoint.service';
import { LocationService } from './services/location.service';
import { LocationEndpoint } from './services/location-endpoint.service';
import { laborAndOverheadCostEndpointservice } from './services/laborandoverheadcost-endpoint.service';
import { LaborAndOverheadCostService } from './services/laborandoverheadcost.service';
import { ShelfService } from './services/shelf.service';
import { ShelfEndpoint } from './services/shelf-endpoint.service';
import { MessageService } from 'primeng/api';
import { RolesManagementStructureService } from './services/roles-management-structure.service';
import { RolesManagementStructureEndpoint } from './services/roles-management-structure-endpoint.service';
import { CertificationTypeEndpoint } from './services/certificationtype.endpoint.service';
import { CertificationtypeService } from './services/certificationtype.service';
import { AssetStatusService } from './services/asset-status/asset-status.service';
import { AssetStatusEndpointService } from './services/asset-status/assetstatus-endpoint.service';
import { DepriciationMethodService } from './services/depriciation-method/depriciation.service';
import { DepriciationMethodEndpointService } from './services/depriciation-method/depriciationmethod-endpoint.service';
import { DisposalTypeService } from './services/disposal-type/disposaltype.service';
import { DisposalTypeEndpointService } from './services/disposal-type/disposaltype-endpoint.service';
import { DepreciationIntervalsEndpoint } from './services/Depreciation -intervals/depreciation-intervals-endpoint.service';
import { DepreciationIntervalsService } from './services/Depreciation -intervals/depreciation-intervals.service ';
import { AssetDepConventionTypeEndpointService } from './services/assetDepConventionType/assetDepConventionType-endpoint.service';
import { AssetDepConventionTypeService } from './services/assetDepConventionType/assetDepConventionType.service';
import { AssetIntangibleTypeSingleScreenEndpointService } from './services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen-endpoint';
import { AssetIntangibleTypeSingleScreenService } from './services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen.service';
import { AssetTypeSingleScreenEndpointService } from './services/AssetTypeSingleScreen/assettypesinglescreen-endpoint.service';
import { AssetTypeSingleScreenService } from './services/AssetTypeSingleScreen/assettypesinglescreen.service';
import { AssetIntangibleTypeEndpointService } from './services/AssetIntangibleType/assetIntangibletype-endpoint.service';
import { AssetIntangibleTypeService } from './services/AssetIntangibleType/AssetIntangibleType.service';
import { AssetTypeEndpointService } from './services/AssetType/assettype-endpoint.service';
import { AssetTypeService } from './services/AssetType/assettype.service';
import { GlAccountService } from './services/glAccount/glAccount.service';
import { GlAccountEndpointService } from './services/glAccount/glAccount-endpoint.service';
import { AccountCalenderService } from './services/account-calender/accountcalender.service';
import { AccountCalenderEndpointService } from './services/account-calender/accountcalender-endpoint.service';
import { ActionsButtonsComponent } from './components/ActionButtons/actions-buttons.component';
import { InterCompanySetupService } from './services/intercompany-setup-service';
import { InterCompanySetupEndPointService } from './services/intercompany-setup-endpoint.service';
import { UserRoleEndPointService } from './components/user-role/user-role-endpoint.service';
import { UserRoleService } from './components/user-role/user-role-service';
import { RolesGuardService } from './services/roles-guard.service';
import { UnauthorizedAccessComponent } from '../unauthorizedaccess/unauthorized-access.component';
import { CompanyService } from './services/company.service';
import { CompanyEndpoint } from './services/company-endpoint.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { WorkOrderService } from './services/work-order/work-order.service';
//import { AuditComponent } from "./components/Audit/audit.component";

@NgModule({
  imports: [
    CardModule,
    PanelMenuModule,
    SharedModule,
    FooterModule,
    ThemePickerModule,
    HttpClientModule,
    AdminModule,
    SettingsModule,
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    ToastyModule.forRoot(),
    ChartsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LoginControlComponent,
    LoginDialogComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    AboutComponent,
    RmaComponent,
    SalesOrderComponent,
    ShippingComponent,
    LicTypeComponent,
    OwnerComponent,
    PlatformComponent,
    SupervisorComponent,
    NotFoundComponent,
    NotificationsViewerComponent,
    AddTaskDialogComponent,
    StatisticsDemoComponent,
    TodoDemoComponent,
    BannerDemoComponent,
    ActionsButtonsComponent,
    UnauthorizedAccessComponent,
    LoginComponent,
    SpinnerComponent
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AlertService,
    ConfigurationService,
    AppTitleService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    EndpointFactory,
    WorkFlowtService,
    WorkFlowEndpoint,
    ActionService,
    ActionEndpoint,
    AtaMainService,
    ATAMainEndpoint,
    AtaSubChapter1Service,
    ATASubChapter1Endpoint,
    AtaSubChapter2Service,
    ATASubChapter2Endpoint,
    SiteService,
    SiteEndpoint,
    WarehouseService,
    WarehouseEndpoint,
    BinService,
    BinEndpoint,
    GLAccountCategoryService,
    GLAccountCategoryEndpointservice,
    NgbActiveModal,
    MasterCompanyEndpoint,
    MasterComapnyService,
    CurrencyService,
    CurrencyEndpoint,
    ConditionEndpoint,
    ConditionService,
    CreditTermsService,
    CreditTermsEndpoint,
    FindingService,
    FindingEndpoint,
    CustomerClassificationEndpoint,
    CustomerClassificationService,
    ProvisionEndpoint,
    ProvisionService,
    ReasonEndpoint,
    ReasonService,
    ActionAttributeService,
    ActionAttributeEndpointService,
    GatecodeService,
    GatecodeEndpointService,
    IntegrationService,
    IntegrationEndpointService,
    PriorityService,
    PriorityEndpointService,
    ItemClassificationService,
    ItemClassificationEndpointService,
    ItemGroupService,
    ItemgroupEndpointService,
    TaxRateService,
    ManufacturerService,
    ManufacturerEndpoint,
    TaxRateEndpointService,
    VendorClassificationService,
    VendorClassificationEndpoint,
    WorkPerformedService,
    WorkPerformedEndpointService,
    PublicationService,
    PublicationEndpointService,
    UnitOfMeasureService,
    UnitOfMeasureEndpoint,
    WorkScopeService,
    WorkScopeEndpointService,
    EmployeeExpertiseService,
    EmployeeExpertiseEndpointService,
    ExpenditureCategoryEndpoint,
    ExpenditureCategoryService,
    DefaultMessageEndpoint,
    DefaultMessageService,
    DocumentService,
    DocumentEndpointService,
    JobTitleService,
    JobTitleEndpontService,
    CustomerService,
    CustomerEndpoint,
    TaxTypeService,
    TaxTypeEndpointService,
    ChargeService,
    ChargeEndpoint,
    ModalService,
    Globals,
    GLAccountClassEndpoint,
    GLAccountClassService,
    VendorService,
    VendorEndpointService,
    EmployeeService,
    EmployeeEndpoint,
    ItemMasterEndpoint,
    ItemMasterService,
    StocklineService,
    StocklineEndpoint,
    ReceivingCustomerWorkService,
    ReceivingCustomerWorkEndpoint,
    LegalEntityService,
    LegalEntityEndpontService,
    AuthService,
    SingleScreenBreadcrumbService,
    GlCashFlowClassificationService,
    GlCashFlowClassificationEndpoint,
    VendorCapabilitiesService,
    VendorCapabilitiesEndpoint,
    LocationService,
    LocationEndpoint,
    laborAndOverheadCostEndpointservice,
    LaborAndOverheadCostService,
    ShelfService,
    ShelfEndpoint,
    MessageService,
    RolesManagementStructureService,
    RolesManagementStructureEndpoint,
    CertificationTypeEndpoint,
    CertificationtypeService,
    AssetStatusService,
    AssetStatusEndpointService,
    AssetTypeService,
    AssetTypeEndpointService,
    AssetIntangibleTypeService,
    AssetIntangibleTypeEndpointService,
    DepriciationMethodService,
    DepriciationMethodEndpointService,
    DisposalTypeService,
    DisposalTypeEndpointService,
    DepreciationIntervalsEndpoint,
    DepreciationIntervalsService,
    AssetDepConventionTypeEndpointService,
    AssetDepConventionTypeService,
    AssetIntangibleTypeSingleScreenEndpointService,
    AssetIntangibleTypeSingleScreenService,
    AssetTypeSingleScreenEndpointService,
    AssetTypeSingleScreenService,
    GlAccountService,
    GlAccountEndpointService,
    AccountCalenderService,
    AccountCalenderEndpointService,
    InterCompanySetupService,
    InterCompanySetupEndPointService,
    UserRoleEndPointService,
    UserRoleService,
    RolesGuardService,
    CompanyService,
    CompanyEndpoint,
    WorkOrderService
  ],
  entryComponents: [LoginDialogComponent, AddTaskDialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
