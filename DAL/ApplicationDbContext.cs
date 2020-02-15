// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        // Test Changes....
        public string CurrentUserId { get; set; }


        public DbSet<WorkOrderAdditionalComments> WorkOrderAdditionalComments { get; set; }
        public DbSet<WorkOrderBulletinsModification> WorkOrderBulletinsModification { get; set; }
        public DbSet<WorkOrderDiscovery> WorkOrderDiscovery { get; set; }
        public DbSet<WorkOrderFinalInspection> WorkOrderFinalInspection { get; set; }
        public DbSet<WorkOrderFinalTest> WorkOrderFinalTest { get; set; }
        public DbSet<WorkOrderPmaDerBulletins> WorkOrderPmaDerBulletins { get; set; }
        public DbSet<WorkOrderPreAssemblyInspection> WorkOrderPreAssemblyInspection { get; set; }
        public DbSet<WorkOrderPreAssmentResults> WorkOrderPreAssmentResults { get; set; }
        public DbSet<WorkOrderPreliinaryReview> WorkOrderPreliinaryReview { get; set; }
        public DbSet<WorkOrderRemovalReasons> WorkOrderRemovalReasons { get; set; }
        public DbSet<WorkOrderTeardown> WorkOrderTeardown { get; set; }
        public DbSet<WorkOrderTestDataUsed> WorkOrderTestDataUsed { get; set; }
        public DbSet<WorkOrderWorkPerformed> WorkOrderWorkPerformed { get; set; }

        public DbSet<CodeTypes> CodeTypes { get; set; }
        public DbSet<CodePrefixes> CodePrefixes { get; set; }
        public DbSet<GlobalSettings> GlobalSettings { get; set; }
        public DbSet<CustomerContactAudit> CustomerContactAudit { get; set; }

        public DbSet<ShippingReference> ShippingReference { get; set; }
        public DbSet<ShippingVia> ShippingVia { get; set; }
        public DbSet<ShippingAccount> ShippingAccount { get; set; }
        public DbSet<ItemMasterAircraftMapping> ItemMasterAircraftMapping { get; set; }
        public DbSet<ItemMasterAircraftMappingAudit> ItemMasterAircraftMappingAudit { get; set; }


        public DbSet<ItemMasterATAMapping> ItemMasterATAMapping { get; set; }
        public DbSet<ItemMasterPurchaseSale> ItemMasterPurchaseSale { get; set; }
        public DbSet<WorkflowPublicationDashNumber> WorkflowPublicationDashNumber { get; set; }
        public DbSet<UserRoleMapper> UserRoleMapper { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<ModuleHierarchyMaster> ModuleHierarchyMaster { get; set; }
        public DbSet<AssetStatus> AssetStatus { get; set; }
        public DbSet<AssetStatusAudit> AssetStatusAudit { get; set; }
        public DbSet<AssetLocation> AssetLocation { get; set; }
        public DbSet<AssetLocationAudit> AssetLocationAudit { get; set; }
        public DbSet<AssetAcquisitionType> AssetAcquisitionType { get; set; }
        public DbSet<AssetAcquisitionTypeAudit> AssetAcquisitionTypeAudit { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<CustomerAudit> CustomerAudit { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<WorkflowAction> WorkflowAction { get; set; }
        public DbSet<DAL.Models.Task> Task { get; set; }
        public DbSet<TaskAudit> TaskAudit { get; set; }
        // public DbSet<ATAMain> ATAMain { get; set; }
        public DbSet<ATASubChapter> ATASubChapter { get; set; }
        public DbSet<ATASubChapter2> ATASubChapter2 { get; set; }
        public DbSet<Site> Site { get; set; }
        public DbSet<ManagementSite> ManagementSite { get; set; }
        public DbSet<ManagementWarehouse> ManagementWarehouse { get; set; }
        public DbSet<ManagementLocation> ManagementLocation { get; set; }
        public DbSet<ManagementShelf> ManagementShelf { get; set; }
        public DbSet<ManagementBin> ManagementBin { get; set; }
        public DbSet<Warehouse> Warehouse { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Shelf> Shelf { get; set; }
        public DbSet<Bin> Bin { get; set; }
        public DbSet<MasterCompany> MasterCompany { get; set; }
        public DbSet<Finding> Finding { get; set; }
        public DbSet<Condition> Condition { get; set; }
        public DbSet<CreditTerms> CreditTerms { get; set; }
        public DbSet<CustomerClassification> CustomerClassification { get; set; }
        public DbSet<Currency> Currency { get; set; }
        public DbSet<Manufacturer> Manufacturer { get; set; }
        public DbSet<ManufacturerAudit> ManufacturerAudit { get; set; }
        public DbSet<Provision> Provision { get; set; }
        public DbSet<VendorCapabiliy> VendorCapabiliy { get; set; }
        public DbSet<VendorCapabilities> VendorCapabilities { get; set; }
        public DbSet<VendorCapabiliyAudit> VendorCapabiliyAudit { get; set; }
        public DbSet<Reason> Reason { get; set; }
        public DbSet<CapabilityType> capabilityType { get; set; }
        public DbSet<CapabilityTypeAudit> CapabilityTypeAudit { get; set; }

        public DbSet<ActionAttribute> ActionAttribute { get; set; }
        public DbSet<ActionAttributeAudit> ActionAttributeAudit { get; set; }
        public DbSet<IntegrationPortal> IntegrationPortal { get; set; }
        public DbSet<Priority> Priority { get; set; }
        public DbSet<ItemClassfication> ItemClassification { get; set; }
        public DbSet<Itemgroup> Itemgroup { get; set; }

        public DbSet<Publication> Publication { get; set; }
        public DbSet<TaxRates> TaxRate { get; set; }
        public DbSet<VendorClassification> VendorClassification { get; set; }
        public DbSet<WorkPerformed> WorkPerformed { get; set; }
        public DbSet<AuditHistory> AuditHistory { get; set; }

        public DbSet<UnitOfMeasure> UnitOfMeasure { get; set; }
        public DbSet<UnitOfMeasureAudit> UnitOfMeasureAudit { get; set; }
        public DbSet<WorkScope> WorkScope { get; set; }
        public DbSet<WorkScopeAudit> WorkScopeAudit { get; set; }
        public DbSet<EmployeeExpertise> EmployeeExpertise { get; set; }

        public DbSet<JobTitle> JobTitle { get; set; }

        public DbSet<JobType> JobType { get; set; }

        public DbSet<GLAccountClass> GLAccountClass { get; set; }

        public DbSet<CertificationType> CertificationType { get; set; }

        public DbSet<DiscountModel> Discount { get; set; }

        public DbSet<DefaultMessage> DefaultMessage { get; set; }
        public DbSet<TaxType> TaxType { get; set; }
        public DbSet<TaxTypeAudit> TaxTypeAudit { get; set; }
        public DbSet<Document> Document { get; set; }
        public DbSet<CustomerType> CustomerType { get; set; }
        public DbSet<Charge> Charge { get; set; }
        public DbSet<Vendor> Vendor { get; set; }
        public DbSet<VendorAudit> VendorAudit { get; set; }
        public DbSet<CustomerContact> CustomerContact { get; set; }
        public DbSet<CustomerShipping> CustomerShipping { get; set; }
        public DbSet<LegalEntityShipping> LegalEntityShipping { get; set; }
        public DbSet<CustomerShippingAudit> CustomerShippingAudit { get; set; }

        public DbSet<CustomerShippingAddress> CustomerShippingAddress { get; set; }
        public DbSet<CustomerShippingAddressAudit> CustomerShippingAddressAudit { get; set; }
        public DbSet<LegalEntityShippingAudit> LegalEntityShippingAudit { get; set; }
        public DbSet<LegalEntityShippingAddress> LegalEntityShippingAddress { get; set; }
        public DbSet<LegalEntityShippingAddressAudit> LegalEntityShippingAddressAudit { get; set; }

        public DbSet<VendorContact> VendorContact { get; set; }
        public DbSet<VendorContactAudit> VendorContactAudit { get; set; }
        public DbSet<VendorPayment> VendorPayment { get; set; }
        public DbSet<VendorPaymentMethod> VendorPaymentMethod { get; set; }
        public DbSet<VendorShipping> VendorShipping { get; set; }
        public DbSet<VendorType> VendorType { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<ContactAudit> ContactAudit { get; set; }
        public DbSet<VendorCheckPayment> VendorCheckPayment { get; set; }
        public DbSet<CheckPayment> CheckPayment { get; set; }
        public DbSet<CheckPaymentAudit> CheckPaymentAudit { get; set; }

        public DbSet<VendorDomesticWirePayment> VendorDomesticWirePayment { get; set; }

        public DbSet<DomesticWirePayment> DomesticWirePayment { get; set; }

        public DbSet<VendorInternationlWirePayment> VendorInternationlWirePayment { get; set; }

        public DbSet<InternationalwirePayment> InternationalWirePayment { get; set; }

        public DbSet<VendorShippingAddress> VendorShippingAddress { get; set; }
        public DbSet<VendorShippingAddressAudit> VendorShippingAddressAudit { get; set; }
        // public DbSet<VendorShippingDetails> VendorShippingDetails { get; set; }
        public DbSet<VendorWarnings> VendorWarning { get; set; }
        public DbSet<CustomerWarning> CustomerWarning { get; set; }
        public DbSet<Employee> Employee { get; set; }
        //public DbSet<AspNetUsers> AspNetUsers { get; set; }
        public DbSet<EmployeeAudit> EmployeeAudit { get; set; }
        public DbSet<shift> Shift { get; set; }
        public DbSet<Countries> Countries { get; set; }
        public DbSet<EmployeeLeaveType> EmployeeLeaveType { get; set; }

        public DbSet<EmployeeLicensure> EmployeeLicensure { get; set; }
        public DbSet<EmployeeLicenseType> EmployeeLicenseType { get; set; }

        public DbSet<EmployeeTraining> EmployeeTraining { get; set; }
        public DbSet<EmployeeTrainingType> EmployeeTrainingType { get; set; }
        public DbSet<EmployeeUserRole> EmployeeUserRole { get; set; }
        public DbSet<EmployeeManagementStructure> EmployeeManagementStructure { get; set; }
        // public DbSet<EmployeeShift> EmployeeShift { get; set; }

        public DbSet<CustomerBillingAddress> CustomerBillingAddress { get; set; }
        public DbSet<CustomerBillingAddressAudit> CustomerBillingAddressAudit { get; set; }

        public DbSet<ATAChapter> ATAChapter { get; set; }

        public DbSet<AircraftType> AircraftType { get; set; }

        public DbSet<AircraftModel> AircraftModel { get; set; }

       
        public DbSet<AddressAudit> Address_Audit { get; set; }

      

        public DbSet<ItemMaster> ItemMaster { get; set; }
        public DbSet<ItemType> ItemType { get; set; }

        public DbSet<ACH> ACH { get; set; }

        public DbSet<ItemMasterCapes> ItemMasterCapes { get; set; }
        public DbSet<ItemMasterCapesAudit> ItemMasterCapesAudit { get; set; }
        public DbSet<VendorCapes> VendorCapes { get; set; }

        public DbSet<Warning> Warning { get; set; }


        public DbSet<Capability> Capability { get; set; }
        public DbSet<ItemMasterAircraftModel> ItemMasterAircraftModel { get; set; }
        public DbSet<VendorCapabiltiyAircraftModel> VendorAircraftModel { get; set; }

        public DbSet<ItemMasterIntegrationPortal> ItemMasterIntegrationPortal { get; set; }


        public DbSet<CustomerIntegrationPortal> CustomerIntegrationPortal { get; set; }
        public DbSet<Part> Part { get; set; }

        //public DbSet<Part> Part { get; set; }

        //public DbSet<Manufacturer> Manufacturer { get; set; }
        public DbSet<CustomerAffiliation> CustomerAffiliation { get; set; }

        public DbSet<StockLine> StockLine { get; set; }
        public DbSet<StockLineDraft> StockLineDraft { get; set; }
        public DbSet<TimeLife> TimeLife { get; set; }
        public DbSet<TimeLifeDraft> TimeLifeDraft { get; set; }

        public DbSet<LaborOverloadCost> LaborOverloadCost { get; set; }
        public DbSet<LaborOverloadCostAudit> LaborOverloadCostAudit { get; set; }

        public DbSet<LegalEntityAudit> LegalEntityAudit { get; set; }
        public DbSet<LegalEntity> LegalEntity { get; set; }

        public DbSet<PurchaseOrder> PurchaseOrder { get; set; }

        public DbSet<PurchaseOrderPart> PurchaseOrderPart { get; set; }
        public DbSet<RepairOrderPart> RepairOrderPart { get; set; }

        //  public DbSet<GLAccountClass> GLAccountClass { get; set; }

        //public DbSet<GlClassFlowClassification> GlCashFlowClassification { get; set; }


        public DbSet<ReceivingCustomerWork> ReceivingCustomerWork { get; set; }
        public DbSet<ReceivingCustomerWorkAudit> ReceivingCustomerWorkAudit { get; set; }

        public DbSet<ManagementStructure> ManagementStructure { get; set; }

        public DbSet<GlClassFlowClassification> GlClassFlowClassification { get; set; }
        public DbSet<GlClassFlowClassificationAudit> GlClassFlowClassificationAudit { get; set; }
        public DbSet<UIRoleEntity> UIRoleEntity { get; set; }
        public DbSet<UserRoleLevel> UserRoleLevel { get; set; }

        public DbSet<UserRoleLevelEntity> UserRoleLevelEntity { get; set; }
        public DbSet<PermittedEditAction> PermittedEditAction { get; set; }
        public DbSet<UserRoleLevelMgmtStruct> UserRoleLevelMgmtStruct { get; set; }

        public DbSet<StocklineAdjustmentDataType> StocklineAdjustmentDataType { get; set; }
        public DbSet<StocklineAdjustment> StocklineAdjustment { get; set; }
        //public DbSet<PurchaseOrder> PurchaseOrder { get; set; }
        public DbSet<RepairOrder> RepairOrder { get; set; }
        public DbSet<StocklineAdjustmentReason> stocklineAdjustmentReason { get; set; }
        public DbSet<StocklineAdjustmentReasonAudit> stocklineAdjustmentReasonAudit { get; set; }

        public DbSet<ItemMasterAircraftManufacturer> ItemMasterAircraftManufacturer { get; set; }
        public DbSet<EmployeeLeaveTypeMapping> EmployeeLeaveTypeMapping { get; set; }

        public DbSet<EmployeeShiftMapping> EmployeeShiftMapping { get; set; }
        public DbSet<WorkflowActionAttribute> WorkflowActionAttribute { get; set; }
        public DbSet<Workflow> Workflow { get; set; }
        public DbSet<WorkflowMaterial> WorkflowMaterial { get; set; }
        public DbSet<WorkflowEquipmentList> WorkflowEquipmentList { get; set; }
        public DbSet<WorkflowExpertiseList> WorkflowExpertiseList { get; set; }
        public DbSet<WorkflowChargesList> WorkflowChargesList { get; set; }
        public DbSet<StocklineIntegrationPortal> StocklineIntegrationPortal { get; set; }
        public DbSet<WorkFlowDirection> WorkFlowDirection { get; set; }

        public DbSet<ExpertiseType> ExpertiseType { get; set; }
        public DbSet<MaterialCondition> MaterialConditions { get; set; }
        public DbSet<MaterialMandatory> MaterialMandatories { get; set; }
        public DbSet<MaterialUOM> MaterialUOMs { get; set; }

        public DbSet<PublicationType> PublicationType { get; set; }
        public DbSet<PublicationStatus> PublicationStatuses { get; set; }
        public DbSet<ExclusionEstimatedOccurance> ExclusionEstimatedOccurances { get; set; }

        public DbSet<EquipmentAssetType> EquipmentAssetTypes { get; set; }
        public DbSet<ChargesType> ChargesTypes { get; set; }
        public DbSet<ChargesCurrency> ChargesCurrencies { get; set; }
        //public DbSet<Action> Actions { get; set; }
        // public DbSet<ActionAttribute> ActionAttributes { get; set; }
        public DbSet<ChargesTable> Charges { get; set; }
        public DbSet<Direction> Directions { get; set; }
        public DbSet<EquipmentList> EquipmentLists { get; set; }
        public DbSet<Expertise> Expertises { get; set; }

        public DbSet<MaterialList> MaterialLists { get; set; }
        public DbSet<Publications> Publications { get; set; }
        public DbSet<Measurement> Measurements { get; set; }
        public DbSet<Exclusion> Exclusions { get; set; }
        public DbSet<WorkFlowExclusion> WorkFlowExclusion { get; set; }
        public DbSet<WorkflowMeasurement> WorkflowMeasurement { get; set; }


        public DbSet<VendorCapabilityAircraftType> vendorCapabilityAircraftType { get; set; }
        public DbSet<VendorCapabilityType> vendorCapabilityType { get; set; }
        public DbSet<VendorCapabiltiyAircraftModel> vendorCapabiltiyAircraftModel { get; set; }
        public DbSet<GLAccountNode> GLAccountNode { get; set; }
        public DbSet<GLAccountNodeAudit> GLAccountNodeAudit { get; set; }
        public DbSet<GLAccountNodeShareWithEntityMapper> GLAccountNodeShareWithEntityMapper { get; set; }
        public DbSet<AssetDepreciationMethod> AssetDepreciationMethod { get; set; }
        public DbSet<AssetDepreciationMethodAudit> AssetDepreciationMethodAudit { get; set; }
        public DbSet<AssetDisposalType> AssetDisposalType { get; set; }
        public DbSet<AssetDepreciationIntervalType> AssetDepreciationIntervalType { get; set; }
        public DbSet<AssetDepreciationInterval> AssetDepreciationInterval { get; set; }
        public DbSet<AssetDepreciationIntervalAudit> AssetDepreciationIntervalAudit { get; set; }
        public DbSet<AssetDepConventionType> AssetDepConventionType { get; set; }
        public DbSet<AssetDepConvention> AssetDepConvention { get; set; }
        public DbSet<AssetDepConventionAudit> AssetDepConventionAudit { get; set; }

        public DbSet<AssetType> AssetType { get; set; }
        public DbSet<AssetIntangibleType> AssetIntangibleType { get; set; }
        public DbSet<StageCode> StageCode { get; set; }

        public DbSet<AssetTypeAudit> AssetTypeAudit { get; set; }
        public DbSet<AssetIntangibleTypeAudit> AssetIntangibleTypeAudit { get; set; }
        public DbSet<StageCodeAudit> StageCodeAudit { get; set; }
        public DbSet<GLAccountCategory> GLAccountCategory { get; set; }
        public DbSet<GLAccountCategoryAudit> GLAccountCategoryAudit { get; set; }
        public DbSet<ExpenditureCategory> ExpenditureCategory { get; set; }
        public DbSet<ExpenditureCategoryAudit> ExpenditureCategoryAudit { get; set; }
        public DbSet<AssetAttributeType> AssetAttributeType { get; set; }
        public DbSet<AssetAttributeTypeAudit> AssetAttributeTypeAudit { get; set; }

        public DbSet<Asset> Asset { get; set; }

        public DbSet<AssetAudit> AssetAudit { get; set; }
        public DbSet<GLAccountMiscCategory> GLAccountMiscCategory { get; set; }
        public DbSet<GLAccount> GLAccount { get; set; }

        public DbSet<AccountingCalendar> AccountingCalendar { get; set; }
        public DbSet<PartStockLineMapper> PartStockLineMapper { get; set; }
        // public DbSet<ProvisionAudit> ProvisionAudit { get; set; }

        public DbSet<AssetDisposalTypeAudit> AssetDisposalTypeAudit { get; set; }
        public DbSet<AssetDepreciationIntervalTypeAudit> AssetDepreciationIntervalTypeAudit { get; set; }

        public DbSet<AssetDepConventionTypeAudit> AssetDepConventionTypeAudit { get; set; }

        public DbSet<GLAccountClassAudit> GLAccountClassAudit { get; set; }


        public DbSet<POROCategory> POROCategory { get; set; }
        public DbSet<POROCategoryAudit> POROCategoryAudit { get; set; }

        public DbSet<CustomerClassificationAudit> CustomerClassificationAudit { get; set; }
        public DbSet<DocumentAudit> DocumentAudit { get; set; }
        public DbSet<DefaultMessageAudit> DefaultMessageAudit { get; set; }
        public DbSet<EmployeeExpertiseAudit> EmployeeExpertiseAudit { get; set; }
        public DbSet<FindingAudit> FindingAudit { get; set; }
        public DbSet<IntegrationPortalAudit> IntegrationPortalAudit { get; set; }
        //public DbSet<GatecodeClassAudit> GatecodeClassAudit { get; set; }
        public DbSet<PublicationAudit> PublicationAudit { get; set; }
        public DbSet<ReasonAudit> ReasonAudit { get; set; }
        public DbSet<SiteAudit> SiteAudit { get; set; }
        public DbSet<TaxRatesAudit> TaxRatesAudit { get; set; }

        //public DbSet<UnitOfMeasureAudit> UnitOfMeasureAudit { get; set; }
        public DbSet<VendorClassificationAudit> VendorClassificationAudit { get; set; }
        public DbSet<WorkPerformedAudit> WorkPerformedAudit { get; set; }
        public DbSet<WorkflowScopeAudit> WorkflowScopeAudit { get; set; }
        //public DbSet<WorkScopeAudit> WorkScopeAudit { get; set; }
        public DbSet<ATAChapterAudit> ATAChapterAudit { get; set; }
        public DbSet<ATASubChapterAudit> ATASubChapterAudit { get; set; }
        public DbSet<EmployeeLicenseTypeAudit> EmployeeLicenseTypeAudit { get; set; }
        public DbSet<ChargeAudit> ChargeAudit { get; set; }
        public DbSet<ConditionAudit> ConditionAudit { get; set; }
        public DbSet<CreditTermsAudit> CreditTermsAudit { get; set; }
        public DbSet<CurrencyAudit> CurrencyAudit { get; set; }
        public DbSet<ItemClassficationAudit> ItemClassificationAudit { get; set; }
        public DbSet<ItemgroupAudit> ItemGroupAudit { get; set; }
        public DbSet<JobTitleAudit> JobTitleAudit { get; set; }
        public DbSet<JobTypeAudit> JobTypeAudit { get; set; }
        public DbSet<PriorityAudit> PriorityAudit { get; set; }
        public DbSet<WarehouseAudit> WarehouseAudit { get; set; }
        public DbSet<LocationAudit> LocationAudit { get; set; }
        public DbSet<ShelfAudit> ShelfAudit { get; set; }
        public DbSet<BinAudit> BinAudit { get; set; }
        public DbSet<ProvisionAudit> ProvisionAudit { get; set; }


        public DbSet<InterCompanySetup> InterCompanySetup { get; set; }

        public DbSet<JournalBatch> JournalBatch { get; set; }
        public DbSet<JournalType> JournalType { get; set; }
        public DbSet<JournalCurrencyType> JournalCurrencyType { get; set; }
        public DbSet<JournalPeriod> JournalPeriod { get; set; }
        public DbSet<JournalSource> JournalSource { get; set; }
        public DbSet<JournalManual> JournalManual { get; set; }
        public DbSet<BalanceType> BalanceType { get; set; }
        public DbSet<JournalCategory> JournalCategory { get; set; }
        public DbSet<WorkOrder> WorkOrder { get; set; }
        public DbSet<WorkOrderStatus> WorkOrderStatus { get; set; }
        public DbSet<WorkOrderType> WorkOrderType { get; set; }
        public DbSet<WorkOrderLabor> WorkOrderLabor { get; set; }
        public DbSet<WorkOrderStage> WorkOrderStage { get; set; }
        public DbSet<WorkOrderPartNumber> WorkOrderPartNumber { get; set; }
        public DbSet<WorkOrderExpertise> WorkOrderExpertise { get; set; }
        public DbSet<WorkOrderDirections> WorkOrderDirections { get; set; }
        public DbSet<WorkOrderPublications> WorkOrderPublications { get; set; }

        public DbSet<VendorCapability> VendorCapability { get; set; }
        public DbSet<AircraftModelAudit> AircraftModelAudit { get; set; }
        public DbSet<AircraftDashNumber> AircraftDashNumber { get; set; }
        public DbSet<AircraftDashNumberAudit> AircraftDashNumberAudit { get; set; }
        public DbSet<AircraftTypeAudit> AircraftTypeAudit { get; set; }

        public DbSet<PublicationItemMasterMapping> PublicationItemMasterMapping { get; set; }

        public DbSet<PublicationPNACMappingModel> PublicationPNACMappingModel { get; set; }
        public DbSet<PublicationPNATAMappingModel> PublicationPNATAMappingModel { get; set; }

        public DbSet<CustomerAircraftMapping> CustomerAircraftMapping { get; set; }
       
        public DbSet<CustomerContactATAMapping> CustomerContactATAMapping { get; set; }
        public DbSet<CustomerContactATAMappingAudit> CustomerContactATAMappingAudit { get; set; }
        public DbSet<CustomerTaxTypeRateMapping> CustomerTaxTypeRateMapping { get; set; }
        public DbSet<CustomerTaxTypeRateMappingAudit> CustomerTaxTypeRateMappingAudit { get; set; }
        public DbSet<AssetCapes> AssetCapes { get; set; }
        public DbSet<AssetCapesAudit> AssetCapesAudit { get; set; }

        public DbSet<LegalEntityInternationalShipping> LegalEntityInternationalShipping { get; set; }
        public DbSet<CustomerInternationalShipping> CustomerInternationalShipping { get; set; }
        public DbSet<CustomerInternationalShippingAudit> CustomerInternationalShippingAudit { get; set; }
        public DbSet<LegalEntityInternationalShippingAudit> LegalEntityInternationalShippingAudit { get; set; }
        public DbSet<ShippingViaDetails> ShippingViaDetails { get; set; }
        public DbSet<ShippingViaDetailsAudit> ShippingViaDetailsAudit { get; set; }

        public DbSet<CustomerDocumentDetail> CustomerDocumentDetails { get; set; }
        public DbSet<CustomerDocumentDetailAudit> CustomerDocumentDetailsAudit { get; set; }

        public DbSet<Attachment> Attachment { get; set; }
        public DbSet<AttachmentDetails> AttachmentDetails { get; set; }
        public DbSet<ClassificationMapping> ClassificationMapping { get; set; }
        public DbSet<RestrictedParts> RestrictedParts { get; set; }
        public DbSet<RestrictsPMAList> RestrictsPMAList { get; set; }
        public DbSet<RestrictsBERList> RestrictsBERList { get; set; }
        public DbSet<MasterParts> MasterParts { get; set; }
        public DbSet<Nha_Tla_Alt_Equ_ItemMapping> Nha_Tla_Alt_Equ_ItemMapping { get; set; }
        public DbSet<NhaTlaAltEquAudit> NhaTlaAltEquAudit { get; set; }

        public DbSet<WorkOrderWorkFlow> WorkOrderWorkFlow { get; set; }
        public DbSet<WorkOrderLaborHeader> WorkOrderLaborHeader { get; set; }
        public DbSet<WorkOrderCharges> WorkOrderCharges { get; set; }
        public DbSet<WorkOrderAssets> WorkOrderAssets { get; set; }
        public DbSet<WorkOrderAssetAudit> WorkOrderAssetAudit { get; set; }
        public DbSet<WorkOrderExclusions> WorkOrderExclusions { get; set; }
        public DbSet<WorkOrderMaterials> WorkOrderMaterials { get; set; }
        public DbSet<WorkOrderDocuments> WorkOrderDocuments { get; set; }
        public DbSet<WorkOrderAddress> WorkOrderAddress { get; set; }
        public DbSet<WorkOrderQuote> WorkOrderQuote { get; set; }
        public DbSet<WorkOrderFreight> WorkOrderFreight { get; set; }
        public DbSet<PublicationTypeAudit> PublicationTypeAudit { get; set; }
        public DbSet<Memo> Memo { get; set; }
        public DbSet<MemoAudit> MemoAudit { get; set; }
        public DbSet<Email> Email { get; set; }
        public DbSet<EmailAudit> EmailAudit { get; set; }
        public DbSet<CommunicationContact> CommunicationContact { get; set; }
        public DbSet<CommunicationContactAudit> CommunicationContactAudit { get; set; }
        public DbSet<CommunicationChat> CommunicationChat { get; set; }
        public DbSet<CommunicationChatAudit> CommunicationChatAudit { get; set; }



        public DbSet<Dropdowns> Dropdowns { get; set; }
        public DbSet<Percentage> Percent { get; set; }
        public DbSet<PercentageAudit> PercentAudit { get; set; }
        public DbSet<AssetIntangibleAttributeType> AssetIntangibleAttributeType { get; set; }
        // public DbSet<Percent> Percent { get; set; }
        public DbSet<PurchaseOrderApprover> PurchaseOrderApprover { get; set; }
        public DbSet<PurchaseOrderApproverList> PurchaseOrderApproverList { get; set; }
        public DbSet<POBillingShippingAddress> POBillingShippingAddress { get; set; }
        public DbSet<PurchaseOrderAddress> PurchaseOrderAddress { get; set; }
        public DbSet<VendorBillingAddress> VendorBillingAddress { get; set; }
        public DbSet<VendorBillingAddressAudit> VendorBillingAddressAudit { get; set; }
        public DbSet<VendorDocumentDetails> VendorDocumentDetails { get; set; }
        public DbSet<VendorDocumentDetailsAudit> VendorDocumentDetailsAudit { get; set; }
        public DbSet<PurchaseOrderShipVia> PurchaseOrderShipVia { get; set; }
        public DbSet<LegalEntityBillingAddress> LegalEntityBillingAddress { get; set; }
        public DbSet<LegalEntityContact> LegalEntityContact { get; set; }
        public DbSet<PurchaseOrderAudit> PurchaseOrderAudit { get; set; }
        public DbSet<WorkOrderTask> WorkOrderTask { get; set; }
        public DbSet<WorkOrderTaskAttribute> WorkOrderTaskAttribute { get; set; }
        public DbSet<WorkOrderPublicationDashNumber> WorkOrderPublicationDashNumber { get; set; }
        public DbSet<RepairOrderApprover> RepairOrderApprover { get; set; }
        public DbSet<RepairOrderApproverList> RepairOrderApproverList { get; set; }
        public DbSet<ItemMasterExchangeLoan> ItemMasterExchangeLoan { get; set; }

        public DbSet<MasterSalesOrderQuoteTypes> MasterSalesOrderQuoteTypes { get; set; }
        public DbSet<MasterSalesCreditTerms> MasterSalesCreditTerms { get; set; }

        public DbSet<MasterSalesLeadSources> MasterSalesLeadSources { get; set; }

        public DbSet<MasterSalesProbablity> MasterSalesProbablity { get; set; }
        public DbSet<SubWorkOrder> SubWorkOrder { get; set; }
        public DbSet<IntegrationPortalMapping> IntegrationPortalMapping { get; set; }

        public DbSet<Master1099> Master1099 { get; set; }
        public DbSet<VendorProcess1099> VendorProcess1099 { get; set; }
        public DbSet<VendorCapabilityAircraft> VendorCapabilityAircraft { get; set; }
        public DbSet<VendorInternationalShipping> VendorInternationalShipping { get; set; }
        public DbSet<VendorInternationalShippingAudit> VendorInternationalShippingAudit { get; set; }
        public DbSet<VendorInternationalShipViaDetails> VendorInternationalShipViaDetails { get; set; }
        public DbSet<VendorInternationalShipViaDetailsAudit> VendorInternationalShipViaDetailsAudit { get; set; }
        public DbSet<VendorContactATAMapping> VendorContactATAMapping { get; set; }
        public DbSet<VendorContactATAMappingAudit> VendorContactATAMappingAudit { get; set; }

        public DbSet<AssetWarrantyStatus> AssetWarrantyStatus { get; set; }

        public DbSet<WorkOrderQuoteExclusions> WorkOrderQuoteExclusions { get; set; }
        public DbSet<WorkOrderQuoteFreight> WorkOrderQuoteFreight { get; set; }
        public DbSet<WorkOrderQuoteCharges> WorkOrderQuoteCharges { get; set; }
        public DbSet<WorkOrderQuoteLabor> WorkOrderQuoteLabor { get; set; }
        public DbSet<WorkOrderQuoteLaborHeader> WorkOrderQuoteLaborHeader { get; set; }
        public DbSet<WorkOrderQuoteMaterial> WorkOrderQuoteMaterial { get; set; }
        public DbSet<WorkOrderQuoteDetails> WorkOrderQuoteDetails { get; set; }
        public DbSet<WorkOrderBillingInvoicing> WorkOrderBillingInvoicing { get; set; }
        public DbSet<InvoiceType> InvoiceType { get; set; }
        public DbSet<DAL.Models.Sales.SalesOrderQuote.SalesOrderQuote> SalesOrderQuote { get; set; }
        public DbSet<DAL.Models.Sales.SalesOrderQuoteApproverList> SalesOrderQuoteApproverList { get; set; }
        public DbSet<DAL.Models.Sales.SalesOrderQuotePart> SalesOrderQuotePart { get; set; }
        public DbSet<Master1099Audit> Master1099Audit { get; set; }
        public DbSet<TagType> TagType { get; set; }
        public DbSet<CustomerAircraftMappingAudit> CustomerAircraftMappingAudit { get; set; }

        public DbSet<Models.Sales.MasterSalesOrderQuoteStatus> MasterSalesOrderQuoteStatus { get; set; }
        public DbSet<AuditCustomerContact> AuditCustomerContact { get; set; }
        public DbSet<LegalEntityContactAudit> LegalEntityContactAudit { get; set; }
        public DbSet<WorkOrderSettings> WorkOrderSettings { get; set; }
        public DbSet<WorkOrderStageAndStatus> WorkOrderStageAndStatus { get; set; }
        public DbSet<EmployeeStation> EmployeeStation { get; set; }
        public DbSet<EmployeeStationAudit> EmployeeStationAudit { get; set; }
        public DbSet<Carrier> Carrier { get; set; }
        public DbSet<ShippingBillingAddressAudit> ShippingBillingAddressAudit { get; set; }
        public DbSet<DocumentsAudit> DocumentsAudit { get; set; }

        public DbSet<VendorShippingAudit> VendorShippingAudit { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Customer>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().HasIndex(c => c.Name);
            //builder.Entity<Customer>().Property(c => c.Email).HasMaxLength(100);
            //builder.Entity<Customer>().Property(c => c.PhoneNumber).IsUnicode(false).HasMaxLength(30);
            //builder.Entity<Customer>().Property(c => c.City).HasMaxLength(50);
            //builder.Entity<Customer>().ToTable($"App{nameof(this.Customer)}");

            builder.Entity<ProductCategory>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ProductCategory>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<ProductCategory>().ToTable($"App{nameof(this.ProductCategories)}");

            builder.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Product>().HasIndex(p => p.Name);
            builder.Entity<Product>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<Product>().Property(p => p.Icon).IsUnicode(false).HasMaxLength(256);
            builder.Entity<Product>().HasOne(p => p.Parent).WithMany(p => p.Children).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Product>().ToTable($"App{nameof(this.Products)}");

            builder.Entity<Order>().Property(o => o.Comments).HasMaxLength(500);
            builder.Entity<Order>().ToTable($"App{nameof(this.Orders)}");

            builder.Entity<OrderDetail>().ToTable($"App{nameof(this.OrderDetails)}");

            builder.Entity<WorkflowAction>().ToTable($"{nameof(this.WorkflowAction)}");
            //  builder.Entity<Models.Action>().ToTable($"{nameof(this.Actions)}");

        }

        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }


        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


        private void UpdateAuditEntities()
        {

        }
    }
}
