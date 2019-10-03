// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================
using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using DAL.Models.Interfaces;
using DAL.Common;

namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        // Test Changes....
        public string CurrentUserId { get; set; }
        public DbSet<ShippingReference> ShippingReference { get; set; }
        public DbSet<ShippingVia> ShippingVia { get; set; }
        public DbSet<ShippingAccount> ShippingAccount { get; set; }
        public DbSet<ItemMasterAircraftMapping> ItemMasterAircraftMapping { get; set; }
        public DbSet<ItemMasterATAMapping> ItemMasterATAMapping { get; set; }
        public DbSet<ItemMasterPurchaseSale> ItemMasterPurchaseSale { get; set; }
        public DbSet<WorkflowPublicationDashNumber> WorkflowPublicationDashNumber { get; set; }
        public DbSet<UserRoleMapper> UserRoleMapper { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<ModuleHierarchyMaster> ModuleHierarchyMaster { get; set; }
        public DbSet<AssetStatus> AssetStatus { get; set; }
        public DbSet<AssetStatusAudit> AssetStatusAudit { get; set; }
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

        public DbSet<ActionAttribute> ActionAttribute { get; set; }
        public DbSet<ActionAttributeAudit> ActionAttributeAudit { get; set; }
        public DbSet<GatecodeClass> Gatecode { get; set; }
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
        public DbSet<GLAccountClass> GLAccountClass { get; set; }

        public DbSet<CertificationType> CertificationType { get; set; }

        public DbSet<DiscountModel> Discount { get; set; }
        public DbSet<ExpenditureCategory> ExpenditureCategory { get; set; }

        public DbSet<DefaultMessage> DefaultMessage { get; set; }
        public DbSet<TaxType> TaxType { get; set; }
        public DbSet<TaxTypeAudit> TaxTypeAudit { get; set; }
        public DbSet<Document> Document { get; set; }
        public DbSet<CustomerType> CustomerType { get; set; }
        public DbSet<Charge> Charge { get; set; }
        public DbSet<Vendor> Vendor { get; set; }
        public DbSet<CustomerContact> CustomerContact { get; set; }
        public DbSet<CustomerShipping> CustomerShipping { get; set; }
        public DbSet<CustomerShippingAddress> CustomerShippingAddress { get; set; }

        public DbSet<VendorContact> VendorContact { get; set; }
        public DbSet<VendorPayment> VendorPayment { get; set; }
        public DbSet<VendorPaymentMethod> VendorPaymentMethod { get; set; }
        public DbSet<VendorShipping> VendorShipping { get; set; }
        public DbSet<VendorType> VendorType { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Contact> Contact { get; set; }
        public DbSet<ContactAudit> ContactAudit { get; set; }
        public DbSet<VendorCheckPayment> VendorCheckPayment { get; set; }
        public DbSet<CheckPayment> CheckPayment { get; set; }

        public DbSet<VendorDomesticWirePayment> VendorDomesticWirePayment { get; set; }

        public DbSet<DomesticWirePayment> DomesticWirePayment { get; set; }

        public DbSet<VendorInternationlWirePayment> VendorInternationlWirePayment { get; set; }

        public DbSet<InternationalwirePayment> InternationalWirePayment { get; set; }

        public DbSet<VendorShippingAddress> VendorShippingAddress { get; set; }
        // public DbSet<VendorShippingDetails> VendorShippingDetails { get; set; }
        public DbSet<VendorWarnings> VendorWarning { get; set; }
        public DbSet<CustomerWarning> CustomerWarning { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<shift> Shift { get; set; }
        public DbSet<Countries> Countries { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Division> Division { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<BusinessUnit> BusinessUnit { get; set; }
        public DbSet<EmployeeLeaveType> EmployeeLeaveType { get; set; }

        public DbSet<EmployeeLicensure> EmployeeLicensure { get; set; }
        public DbSet<EmployeeLicenseType> EmployeeLicenseType { get; set; }

        public DbSet<EmployeeTraining> EmployeeTraining { get; set; }
        public DbSet<EmployeeTrainingType> EmployeeTrainingType { get; set; }
        // public DbSet<EmployeeShift> EmployeeShift { get; set; }
        public DbSet<CustomerBillingAddress> CustomerBillingAddress { get; set; }
        public DbSet<ATAChapter> ATAChapter { get; set; }

        public DbSet<AircraftType> AircraftType { get; set; }

        public DbSet<AircraftModel> AircraftModel { get; set; }

        public DbSet<CustomerAircraftModel> CustomerAircraftModel { get; set; }
        public DbSet<AddressAudit> Address_Audit { get; set; }

        public DbSet<CustomerAircraftType> CustomerAircraftType { get; set; }

        public DbSet<ItemMaster> ItemMaster { get; set; }

        public DbSet<ACH> ACH { get; set; }

        public DbSet<ItemMasterCapes> ItemMasterCapes { get; set; }
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

        public DbSet<LaborOverloadCost> LaborOverloadCost { get; set; }
        public DbSet<LaborOverloadCostAudit> LaborOverloadCostAudit { get; set; }
        public DbSet<TimeLife> TimeLife { get; set; }

        public DbSet<LegalEntity> LegalEntity { get; set; }

        public DbSet<PurchaseOrder> PurchaseOrder { get; set; }

        public DbSet<PurchaseOrderPart> PurchaseOrderPart { get; set; }
        public DbSet<RepairOrderPart> RepairOrderPart { get; set; }

        //  public DbSet<GLAccountClass> GLAccountClass { get; set; }

        //public DbSet<GlClassFlowClassification> GlCashFlowClassification { get; set; }


        public DbSet<ReceivingCustomerWork> ReceivingCustomerWork { get; set; }

        public DbSet<ManagementStructure> ManagementStructure { get; set; }

        public DbSet<GLAccountCategories> GLAccountCategory { get; set; }
        public DbSet<GLAccountCategoriesAudit> GLAccountCategoryAudit { get; set; }
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
        public DbSet<PublicationModel> PublicationModels { get; set; }
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
        public DbSet<GLAccountNodeShareWithEntityMapper> GLAccountNodeShareWithEntityMapper { get; set; }
        public DbSet<AssetDepreciationMethod> AssetDepreciationMethod { get; set; }
        public DbSet<AssetDepreciationMethodAudit> AssetDepreciationMethodAudit { get; set; }
        public DbSet<AssetDisposalType> AssetDisposalType { get; set; }
        public DbSet<AssetDepreciationIntervalType> AssetDepreciationIntervalType { get; set; }
        public DbSet<AssetDepConventionType> AssetDepConventionType { get; set; }
        public DbSet<AssetIntangibleTypeSingleScreen> AssetIntangibleTypeSingleScreen { get; set; }

        public DbSet<AssetType> AssetType { get; set; }
        public DbSet<Asset> Asset { get; set; }
        public DbSet<GLAccountMiscCategory> GLAccountMiscCategory { get; set; }
        public DbSet<GLAccount> GLAccount { get; set; }
        public DbSet<AssetAttributeType> AssetAttributeType { get; set; }
        public DbSet<AssetIntangibleType> AssetIntangibleType { get; set; }

        public DbSet<AccountingCalendar> AccountingCalendar { get; set; }
        public DbSet<PartStockLineMapper> PartStockLineMapper { get; set; }
        // public DbSet<ProvisionAudit> ProvisionAudit { get; set; }
        public DbSet<AssetIntangibleTypeSingleScreenAudit> AssetIntangibleTypeSingleScreenAudit { get; set; }

        public DbSet<AssetDisposalTypeAudit> AssetdisposalTypeAudit { get; set; }
        public DbSet<AssetDepreciationIntervalTypeAudit> AssetDepreciationIntervalTypeAudit { get; set; }

        public DbSet<AssetDepConventionTypeAudit> AssetDepConventionTypeAudit { get; set; }

        public DbSet<GLAccountClassAudit> GLAccountClassAudit { get; set; }

        public DbSet<MarkUpPercentage> MarkUpPercentage { get; set; }
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
        public DbSet<TaxRatesAudit> TaxRateAudit { get; set; }

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
        public DbSet<PriorityAudit> PriorityAudit { get; set; }
        public DbSet<WarehouseAudit> WarehouseAudit { get; set; }
        public DbSet<LocationAudit> LocationAudit { get; set; }
        public DbSet<ShelfAudit> ShelfAudit { get; set; }
        public DbSet<BinAudit> BinAudit { get; set; }
        public DbSet<ProvisionAudit> ProvisionAudit { get; set; }
        public DbSet<ExpenditureCategoryAudit> ExpenditureCategoryAudit { get; set; }
        public DbSet<AssetTypeAudit> AssetTypeAudit { get; set; }


        public DbSet<GatecodeClassAudit> GatecodeAudit { get; set; }
        public DbSet<InterCompanySetup> InterCompanySetup { get; set; }

        public DbSet<JournalBatch> JournalBatch { get; set; }
        public DbSet<JournalType> JournalType { get; set; }
        public DbSet<JournalPeriod> JournalPeriod { get; set; }
        public DbSet<JournalSource> JournalSource { get; set; }
        public DbSet<JournalManual> JournalManual { get; set; }

        public DbSet<WorkOrder> WorkOrder { get; set; }
        public DbSet<WorkOrderStatus> WorkOrderStatus { get; set; }
        public DbSet<WorkOrderType> WorkOrderType { get; set; }
        public DbSet<WorkOrderLabor> WorkOrderLabor { get; set; }
        public DbSet<WorkOrderStage> WorkOrderStage { get; set; }
        public DbSet<WorkOrderPartNumber> WorkOrderPartNumber { get; set; }

        public DbSet<VendorCapability> VendorCapability { get; set; }
        public DbSet<AircraftModelAudit> AircraftModelAudit { get; set; }
        public DbSet<AircraftDashNumber> AircraftDashNumber { get; set; }
        public DbSet<AircraftDashNumberAudit> AircraftDashNumberAudit { get; set; }
        public DbSet<AircraftTypeAudit> AircraftTypeAudit { get; set; }

        public DbSet<PublicationItemMasterMapping> PublicationItemMasterMapping { get; set; }

        public DbSet<PublicationPNACMappingModel> PublicationPNACMappingModel { get; set; }
        public DbSet<PublicationPNATAMappingModel> PublicationPNATAMappingModel { get; set; }

        public DbSet<CustomerAircraftMapping> CustomerAircraftMapping { get; set; }
        public DbSet<CustomerATAMapping> CustomerATAMapping { get; set; }
        public DbSet<AssetCapes> AssetCapes { get; set; }
        public DbSet<AssetCapesAudit> AssetCapesAudit { get; set; }

        public DbSet<CustomerInternationalShipping> CustomerInternationalShipping { get; set; }
        public DbSet<ShippingViaDetails> ShippingViaDetails { get; set; }
        public DbSet<Attachment> Attachment { get; set; }
        public DbSet<AttachmentDetails> AttachmentDetails { get; set; }
        public DbSet<ClassificationMapping> ClassificationMapping { get; set; }
        public DbSet<RestrictedParts> RestrictedParts { get; set; }
        public DbSet<MasterParts> MasterParts { get; set; }
        public DbSet<Nha_Tla_Alt_Equ_ItemMapping> Nha_Tla_Alt_Equ_ItemMapping { get; set; }

        public DbSet<WorkFlowWorkOrder> WorkFlowWorkOrder { get; set; }
        public DbSet<WorkOrderLaborHeader> WorkOrderLaborHeader { get; set; }
        public DbSet<WorkOrderCharges> WorkOrderCharges { get; set; }
        public DbSet<WorkOrderAssets> WorkOrderAssets { get; set; }
        public DbSet<WorkOrderExclusions> WorkOrderExclusions { get; set; }
        public DbSet<WorkOrderMaterials> WorkOrderMaterials { get; set; }
        public DbSet<WorkOrderDocuments> WorkOrderDocuments { get; set; }
        public DbSet<WorkOrderAddress> WorkOrderAddress { get; set; }
        public DbSet<WorkOrderQuote> WorkOrderQuote { get; set; }
        public DbSet<WorkOrderFreight> WorkOrderFreight { get; set; }
        public DbSet<PublicationTypeAudit> PublicationTypeAudit { get; set; }
        


        public DbSet<AssetIntangibleAttributeType> AssetIntangibleAttributeType { get; set; }

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
