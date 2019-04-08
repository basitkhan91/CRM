// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
import { CommonModule } from '@angular/common'; //<-- This one
import { RouterModule, Routes } from '@angular/router';
import { GroupByPipe } from '../pipes/group-by.pipe';

import { SinglePagesRoutingModule   } from "./singlepages-routing.module";

import { SingleComponent } from "./singlepages.component";
import { ActionsComponent } from '../components/actions/actions.component';
import { ActionAttributesComponent } from '../components/action-attributes/action-attributes.component';
import { AtaMainComponent } from '../components/ata-main/ata-main.component';
import { CreditTermsComponent } from '../components/credit-terms/credit-terms.component';
import { CurrencyComponent } from '../components/currency/currency.component';
import { CustomerClassificationComponent } from '../components/customer-classification/customer-classification.component';
import { DocumentsComponent } from '../components/documents/documents.component';
import { EmployeeExpertiseComponent } from '../components/employee-expertise/employee-expertise.component';
import { ExpenditureComponent } from '../components/expenditure/expenditure.component';
import { FindingsComponent } from '../components/findings/findings.component';
import { GateCodeComponent } from '../components/gate-code/gate-code.component';
import { IntegrationComponent } from '../components/integration/integration.component';
import { ItemClassificationComponent } from '../components/item-classification/item-classification.component';
import { ItemGroupComponent } from '../components/item-group/item-group.component';
import { JobTitleComponent } from '../components/job-title/job-title.component';
import { PriorityComponent } from '../components/priority/priority.component';
import { ProvisionComponent } from '../components/provision/provision.component';
import { PublicationComponent } from '../components/publication/publication.component';
import { ReasonComponent } from '../components/reason/reason.component';
import { TaxRateComponent } from '../components/tax-rate/tax-rate.component';
import { UnitOfMeasureComponent } from '../components/unit-of-measure/unit-of-measure.component';
import { VendorClassificationComponent } from '../components/vendor-classification/vendor-classification.component';
import { WorkPerformedComponent } from '../components/work-performed/work-performed.component';
import { WorkScopeComponent } from '../components/work-scope/work-scope.component';


import { ActionAttributeMappingComponent } from '../components/action-attribute-mapping/action-attribute-mapping.component';
import { AtaSubChapter1Component } from '../components/ata-sub-chapter1/ata-sub-chapter1.component';
import { AtaSubChapter2Component } from '../components/ata-sub-chapter2/ata-sub-chapter2.component';
import { SiteComponent } from '../components/site/site.component';
import { CapabilitiesComponent } from '../components/capabilities/capabilities.component';
import { FinancialStatementMappingComponent } from '../components/financial-statement-mapping/financial-statement-mapping.component';
import { GlAccountClassComponent } from '../components/gl-account-class/gl-account-class.component';
import { GlCashFlowClassificationComponent } from '../components/gl-cash-flow-classification/gl-cash-flow-classification.component';
import { GlFinancialStatementComponent } from '../components/gl-financial-statement/gl-financial-statement.component';
import { JournalApprovalsComponent } from '../components/journal-approvals/journal-approvals.component';
import { RfqEngineComponent } from '../components/rfq-engine/rfq-engine.component';
import { ActionsEditorComponent } from '../components/actions/actions-editor.component';




//import { DefaultMessagesComponent } from '../components/default-messages/default-messages.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChargesComponent } from '../components/charges/charges.component';
//import { TaxTypeComponent } from '../components/tax-type/tax-type.component';
import { DefaultMessageComponent } from '../components/default-message/default-message.component';
import { TaxTypeComponent } from "../components/tax-type/tax-type.component";
import { ConditionsComponent } from "../components/conditions/conditions.component";


import { InputSwitchModule } from 'primeng/inputswitch';
import { BreadcrumbModule } from 'primeng/breadcrumb'; //bread crumb
import { SingleScreenBreadcrumbService } from "../services/single-screens-breadcrumb.service";
import { WarehouseComponent } from "../components/warehouse/warehouse.component";
import { GLAccountCategoryComponent } from "../components/gl-account-categories/gl-account-categories.component";
import { ManufacturerComponent } from "../components/manufacturer/manufacturer.component";
import { VendorcapabilitiesComponent } from "../components/vendorcapabilities/vendorcapabilities.component";
//import { VendorcapabilitiesComponent } from "../components/vendor-capabilities/vendor-capabilities.component";
import { LocationComponent } from "../components/location/location.component";
import { LaberAndOverheadCostSetupComponent } from "../components/laber-and-overhead-cost-setup/laber-and-overhead-cost-setup.component";
import { ShelfComponent } from "../components/shelf/shelf.component";
import { BinComponent } from '../components/bin/bin.component';
import { TreeTableModule } from 'primeng/treetable'; //for site,warehouse,location,shelf,bin
import { CheckboxModule } from 'primeng/checkbox'; //for site,warehouse,location,shelf,bin
import { TreeModule } from 'primeng/tree';
import { DialogModule } from "primeng/dialog";
import { CertificationTypeComponent } from "../components/certification-type/certification-type.component";
import { AssetStatusComponent } from "../components/AssetStatus/asset-status.component";
import { AssetStatusService } from "../services/asset-status/asset-status.service";
import { AssetStatusEndpointService } from "../services/asset-status/assetstatus-endpoint.service";
import { DepriciationMethodComponent } from "../components/depriciation-method/depriciation-method.component";
import { DepriciationMethodService } from "../services/depriciation-method/depriciation.service";
import { DepriciationMethodEndpointService } from "../services/depriciation-method/depriciationmethod-endpoint.service";
import { DisposalTypeEndpointService } from "../services/disposal-type/disposaltype-endpoint.service";
import { DisposalTypeService } from "../services/disposal-type/disposaltype.service";
import { DisposalTypeComponent } from "../components/disposal-type/disposal-type.component";
import { AssetDepConventionTypeComponent } from "../components/asset-dep-convention-type/asset-dep-convention-type.component";
import { DepreciationIntervalsService } from "../services/Depreciation -intervals/depreciation-intervals.service ";
import { DepreciationIntervalsEndpoint } from "../services/Depreciation -intervals/depreciation-intervals-endpoint.service";
import { AssetDepConventionTypeService } from "../services/assetDepConventionType/assetDepConventionType.service";
import { AssetDepConventionTypeEndpointService } from "../services/assetDepConventionType/assetDepConventionType-endpoint.service";
import { DepreciationIntervalsComponent } from "../components/depreciation-intervals/depreciation-intervals.component";
import { AssetIntangibleTypeSingleScreenEndpointService } from "../services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen-endpoint";
import { AssetIntangibleTypeSingleScreenService } from "../services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen.service";
import { AssetIntangibleTypeSingleScreenComponent } from "../components/asset-intangible-type-single-screen/asset-intangible-type-single-screen.component";
import { AssetTypeSingleScreenEndpointService } from "../services/AssetTypeSingleScreen/assettypesinglescreen-endpoint.service";
import { AssetTypeSingleScreenService } from "../services/AssetTypeSingleScreen/assettypesinglescreen.service";
import { AssetTypeSingleScreenComponent } from "../components/asset-type-single-screen/asset-type-single-screen.component";
import { CreateAssetComponent } from "../components/Asset-Management/Asset-pages/create-asset/create-asset.component";
//import { SharedModule } from '../shared/shared.module';
//import { CompanyComponent } from '../shared/company/company.component';

@NgModule({
	imports: [
	//	SharedModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        QuickAppProMaterialModule,
        TranslateModule,
        CommonModule,
        SinglePagesRoutingModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
        MultiSelectModule,
        AutoCompleteModule,
        InputSwitchModule,
		CheckboxModule, BreadcrumbModule, TreeTableModule, CheckboxModule, TreeModule, DialogModule
		//CompanyComponent
    ],
    declarations: [
        SingleComponent,
        ActionsComponent,
        ActionAttributesComponent,
        AtaMainComponent,
        CreditTermsComponent,
        CurrencyComponent,
        CustomerClassificationComponent,
        DocumentsComponent,
        EmployeeExpertiseComponent,
        ExpenditureComponent,
        FindingsComponent,
        GateCodeComponent,
        IntegrationComponent,
        ItemClassificationComponent,
        ItemGroupComponent,
        JobTitleComponent,
        PriorityComponent,
        ProvisionComponent,
        PublicationComponent,
        ReasonComponent,
        TaxRateComponent,
        UnitOfMeasureComponent,
        VendorClassificationComponent,
        WorkPerformedComponent,
        WorkScopeComponent,
        ActionsEditorComponent,
        DefaultMessageComponent,
      	ChargesComponent,
        TaxTypeComponent,
		ConditionsComponent,
		ActionAttributeMappingComponent,
		AtaSubChapter1Component,
		AtaSubChapter2Component,
		SiteComponent,
		BinComponent,
		CapabilitiesComponent,
		FinancialStatementMappingComponent,
		GlAccountClassComponent,
		GlCashFlowClassificationComponent,
		GlFinancialStatementComponent,
		JournalApprovalsComponent,
		RfqEngineComponent,
		WarehouseComponent,
		GLAccountCategoryComponent,
		ManufacturerComponent,
		VendorcapabilitiesComponent,
		LocationComponent,
		LaberAndOverheadCostSetupComponent,
		ShelfComponent,
        CertificationTypeComponent,
        AssetStatusComponent,
        DisposalTypeComponent,
        DepriciationMethodComponent,
        AssetDepConventionTypeComponent,
        DepreciationIntervalsComponent,
        AssetIntangibleTypeSingleScreenComponent,
        AssetTypeSingleScreenComponent,

		//DefaultMessageComponent


    ],
    providers: [
        SingleScreenBreadcrumbService,
        AssetStatusService,
        AssetStatusEndpointService,
        AssetStatusEndpointService,
        DepriciationMethodService,
        DepriciationMethodEndpointService,
        DisposalTypeEndpointService,
        DisposalTypeService,
        DepreciationIntervalsService,
        DepreciationIntervalsEndpoint,
        AssetDepConventionTypeService,
        AssetDepConventionTypeEndpointService,
        AssetIntangibleTypeSingleScreenEndpointService,
        AssetIntangibleTypeSingleScreenService,
        AssetTypeSingleScreenEndpointService,
        AssetTypeSingleScreenService
    ],
    exports: [
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        QuickAppProMaterialModule,
        TranslateModule,
        VendorClassificationComponent
    ],
    entryComponents: [
    ],
   
})
export class SinglePgesModule {

}