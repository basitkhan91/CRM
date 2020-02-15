// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Models;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;

namespace DAL
{
    public interface IUnitOfWork
    {
        IGLAccountNodeRepository GLAccountNode { get; }
        IUserRoleRepository UserRole { get; }
        ICustomerRepository Customer { get; }
        IEnumerable<Customer> getAlldata();
        ICustomerBillingInformationRepository CustomerBillingInformation { get; }

        ILegalEntityBillnformationRepository LegalEntityBillingInformation { get; }

        IProductRepository Products { get; }
        IOrdersRepository Orders { get; }
        IWorkflowActionRepository WorkflowActions { get; }

        IActionRepository Actions { get; }

        IATAMainRepository ATAMains { get; }

        IATASubChapter1Repository ATASubChapter { get; }

        IATASubChapter2Repository ATASubChapter2s { get; }

        ISiteRepository Sites { get; }
        IVendorCapabilitiesRepository VendorCapabilities { get; }
        IWarehouseRepository Warehouses { get; }

        ILocationRepository Locations { get; }

        IShelfRepository Shelfs { get; }

        IBinRepository Bins { get; }

        ICurrencyRepository Currencys { get; }

        IConditionRepository Conditions { get; }

        ICreditTermsRepository CreditTerms { get; }

        IGLAccountClassRespository GLAccountClass { get; }

        ICustomerClassificationRepository CustomerClassifications { get; }


        IFindingRepository Findings { get; }

        IGlCashFlowRepository GlClassFlowsClassification { get; }
        //IManufacturerRepository Manufacturer { get; }

        IProvisionRepository Provisions { get; }

        IReasonRepository Reasons { get; }

        ITaxRateRepository TaxRate { get; }

        ITaxTypeRepository TaxType { get; }

        IVendorClassificationRepository VendorClassifications { get; }

        IWorkPerformedRepository WorkPerformed { get; }

        IPublication Publication { get; }


        IMasterCompanyRepository MasterCompanies { get; }

        IActionAttributeRepository ActionAttribute { get; }


        IIntegration Integration { get; }
        IPriority Priority { get; }

        IItemClassification ItemClassification { get; }

        IItemgroup Itemgroup { get; }

        IUnitOfMeasureRepository UnitOfMeasure { get; }

        IWorkScopeRepository WorkScope { get; }

        IEmployeeExpertiseRepository EmployeeExpertise { get; }

        IDefaultMessage DefaultMessage { get; }
        IGlCashFlowRepository GlClassFlowClassification { get; }

        int SaveChanges();


        IAuditHistoryRepository AuditHistory { get; }

        IJobTitle JobTitle { get; }

        IJournalRepository Journal { get; }

        IJobType JobType { get; }
        IDocument Document { get; }

        ICharge Charge { get; }

        IVendor Vendor { get; }
        IAddress Address { get; }
        IContactRepository ContactRepository { get; }
        IVendorContactRepository vendorContactRepository { get; }
        IVendorDocumentDetailRepository VendorDocumentDetails { get; }
        IFinance Finance { get; }
        //IContactRepository Contact { get; }
        //IPayment Payment { get; }

        IShipping Shipping { get; }

        IVendorPaymentRepository vendorPaymentRepository { get; }
        IVendorCheckPaymentRepository vendorCheckPaymentRepository { get; }

        IVendorDomesticPaymentRepository vendorDomesticPaymentRepository { get; }

        IVendorDomesticWirePaymentRepository vendordomesticWirePaymentRepository { get; }
        IVendorInternationalPaymentRepository vendorInternationalPaymentRepository { get; }

        IVendorPaymentMethodRepository vendorPaymentMethodRepository { get; }

        IVendorInternationalWirePaymentRepository vendorInternationalWirePaymentRepository { get; }
        IVendorShippingAddress VendorShippingAddress { get; }



        //IVendorShippingDetailsRepository VendorShippingDetailsRepository { get;  }

        IEmployee employee { get; }
        IShiftRepository shift { get; }
        ICountriesRepository Countries { get; }
        IEmployeeLeaveType EmployeeLeaveType { get; }
        IEmployeeTrainingTypeRepository EmployeeTrainingType { get; }

        IEmployeeLicenseType employeeLicenseType { get; }

        IEmployeeLicensure employeeLicensure { get; }

        IEmployeeTraining employeeTraining { get; }

        IVendorWarning VendorWarning { get; }

        ICustomerContactRepository CustomerContact { get; }

        ILegalEntityContactRepository LegalEntityContact { get; }
        ICustomerShippingAddress CustomerShippingAddress { get; }
        ILegalEntityShippingAddress LegalEntityShippingAddress { get; }
        ICustomerShipping CustomerShipping { get; }
        ILegalEntityShipping LegalEntityShipping { get; }
        ICustomerWarning CustomerWarning { get; }
        //IEmployeeShift employeeShift { get; }

        ICustomerType customerType { get; }

        IATAChapter ATAChapter { get; }

        IAircraftType aircraftType { get; }

        IAircraftModel aircraftModel { get; }

    
        ICustomerDocumentDetail CreateDocumentDetails { get; }
       

        IItemMaster itemMaster { get; }

        IStockLineList stockLineList { get; }

        ITagType tagType { get; }
        //IStockListAdjustment StockListAdjustment { get; }

        ITimeLife timeLife { get; }

        IWarning warning { get; }

        IReceivingCustomerWork receivingCustomerWork { get; }

        ILegalEntity LegalEntity { get; }

        // IGLAccountClassRespository gLAccountClass { get; }

        IGlCashFlowRepository glCashFlowRepository { get; }

        IPurchaseOrder purchaseOrder { get; }
        IRepairOrder repairOrder { get; }

        ICustomerAffliationRepository CustomerAffliationRepository { get; }
        IDiscountRepository Discount { get; }
        IManufacturerRepository Manufacturer { get; }
        ILaborAndOverheadCostRepository LaborAndOverheadCost { get; }
        IManagementSiteRepository managementSite { get; }
        IManagementWarehouseRepository managementWarehouse { get; }
        IManagementLocationRepository managementLocation { get; }
        IManagementShelfRepository managementShelf { get; }
        IManagementBinRepository managementBin { get; }
        IUserRoleLevelMgmStructRepository userRoleLevelMgmStruct { get; }
        IUserRoleLevelRepository userRoleLevel { get; }
        IStocklineAdjustmentRepository stocklineAdjustmentRepository { get; }

        //ICertificationTypeRepository CertificationTypeRepository { get; }
        IStocklineAdjustmentReasonRepository StocklineAdjustmentReasonRepository { get; }

        IItemMasterAircraftManafacturerRepository ItemMasterAircraftManafacturerRepository { get; }

        IItemMasterIntegrationPortalRepository ItemMasterIntegrationPortalRepository { get; }


        ICustomerIntegrationPortalRepository CustomerIntegrationPortalRepository { get; }


        IEmployeeLeaveTypeMappingRepository EmployeeLeaveTypeMappingRepository { get; }


        IAccountingCalendar accountingCalendar { get; }

        IGLAccount gLAccount { get; }


        IAssetTypeRepository AssetTypeRepository { get; }
        IAssetIntangibleTypeRepository AssetIntangibleTypeRepository { get; }
        IAssetIntangibleAttributeTypeRepository AssetIntangibleAttributeTypeRepository { get; }
        IStageCodeRepository StageCodeRepository { get; }
        IGLAccountCategoryRepository GLAccountCategoryRepository { get; }
        IExpenditureCategoryRepository ExpenditureCategoryRepository { get; }
        IAssetAttributeTypeRepository AssetAttributeTypeRepository { get; }


        IEmployeeShiftRepository EmployeeShiftMappingRepository { get; }
        IWorkFlowRepositoryTest workFlowRepositoryTest { get; }
        //IPurchaseOrderPartRepository PurchaseOrderPartRepository { get; }
        IStocklineIntegrationPortalRepository StocklineIntegrationPortalRepository { get; }
        IWorkOrderRepository WorkOrderRepository { get; }
        IWorkOrderStageRepository WorkOrderStageRepository { get; }
        ICapabilityTypeRepository capabilityTypeRepository { get; }
        IAssetRepository Asset { get; }
        IAssetAuditRepository AssetAudit { get; }

        IRepository<T> Repository<T>() where T : class;

        IGLAccountNodeShareWithEntityMapper GLAccountNodeShareWithEntityMapper { get; }

        IPartStockLineMapper PartStockLineMapper { get; }

        IDashNumberRepository DashNumberRepository { get; }

        ICommonRepository CommonRepository { get; }

        IAssetCapes AssetCapes { get; }

        IFileUploadRepository FileUploadRepository { get; }

        //IAssetIntangibleAttributeType AssetIntangibleAttributeType { get; }
        IAssetDepreciationInterval AssetDepreciationInterval { get; }

        IAssetDepreciationMethod AssetDepreciationMethod { get; }

        IAssetDisposalType AssetDisposalType { get; }

        IAssetStatus AssetStatus { get; }

        IAssetLocation AssetLocation { get; }
		IAssetLocationAudit AssetLocationAudit { get; }

        IAssetAcquisitionType AssetAcquisitionType { get; }
		IAssetAcquisitionTypeAudit AssetAcquisitionTypeAudit { get; }

        IAssetDepConvention AssetDepConvention { get; }

        IPublicationTypeRepository PublicationTypeRepository { get; }

        ICommunicationRepository CommunicationRepository { get; }

        IPercentageRepository PercentageRepository { get; }

        IMasterSalesOrderQuoteTypesRepository MasterSalesOrderQuoteTypesRepository { get; }

        IMasterSalesCreditTermsRepository MasterSalesCreditTermsRepository { get; }

        IMasterSalesLeadSourcesRepository MasterSalesLeadSourcesRepository { get; }

        IMasterSalesProbablityRepository MasterSalesProbablityRepository { get; }

        IItemMasterExchangeLoanRepository ItemMasterExchangeLoan { get; }

        void SaveChanges(Employee employeeobject);

        IReceiveRepairOrderRepository ReceiveRepairOrder { get; }

        ISalesOrderQuoteRepository SalesOrderQuote { get; }

        ISalesOrderQuoteApproverList SalesOrderQuoteApproverList { get; }

        ISalesOrderQuotePartRepository SalesOrderQuotePart { get; }

        IMasterSalesOrderQuoteStatusRepository MasterSalesOrderQuoteStatusRepository { get; }
        IEmployeeStationRepository employeeStationRepository { get; }

        IGlobalSettingsRepository GlobalSettingsRepository { get; }
    }
}
