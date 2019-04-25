﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Models;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customer { get; }
        IEnumerable<Customer> getAlldata();
        ICustomerBillingInformationRepository CustomerBillingInformation { get;}

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

        ITaxRateRepository TaxRates { get; }

        ITaxTypeRepository TaxType { get; }

        IVendorClassificationRepository VendorClassifications { get; }

        IWorkPerformedRepository WorkPerformed { get; }

        IPublication Publication { get; }


        IMasterCompanyRepository MasterCompanies { get; }

        IActionAttributeRepository ActionAttribute { get; }

        IGatecodeRepository Gatecode { get; }

        IIntegration Integration { get; }
        IPriority Priority { get; }

        IItemClassification ItemClassification { get; }

        IItemgroup Itemgroup { get; }

        IUnitOfMeasureRepository UnitOfMeasure { get; }

        IWorkScopeRepository WorkScope { get; }

        IEmployeeExpertiseRepository EmployeeExpertise { get; }

        IExpenditureCategory ExpenditureCategory { get; }
        IDefaultMessage DefaultMessage { get; }
        IGlCashFlowRepository GlClassFlowClassification { get; }

    int SaveChanges();


        IAuditHistoryRepository AuditHistory { get; }

        IJobTitle JobTitle { get; }
        IDocument Document { get; }

        ICharge Charge { get; }
        
        IVendor Vendor { get;  }
        IAddress Address { get; }
        IContactRepository ContactRepository { get;}
        IVendorContactRepository vendorContactRepository { get; }
        IFinance Finance { get; }
        //IContactRepository Contact { get; }
        IPayment Payment { get; }

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
        
        ICompany company { get; }

        IDivision division { get; }

        IDepartment department { get; }

        IBusinessUnit businessUnit { get; }

        IEmployeeLicenseType employeeLicenseType { get; }

        IEmployeeLicensure employeeLicensure { get; }

        IEmployeeTraining employeeTraining { get; }

        IVendorWarning  VendorWarning { get; }

        ICustomerContactRepository CustomerContact { get; }
        ICustomerShippingAddress CustomerShippingAddress { get; }

        ICustomerShipping CustomerShipping { get; }
        ICustomerWarning CustomerWarning { get; }
        //IEmployeeShift employeeShift { get; }

        ICustomerType customerType { get; }

        IATAChapter ATAChapter { get; }
      
        IAircraftType aircraftType { get; }

        IAircraftModel aircraftModel { get; }

        ICustomerAircraftModel customerAircraftModel { get; }


        ICustomerAircraftType customerAircraftType { get; }


        IItemMaster itemMaster { get; }

        IStockLineList stockLineList { get; }

        //IStockListAdjustment StockListAdjustment { get; }
       
        ITimeLife timeLife { get; }

        IWarning warning { get; }

        IReceivingCustomerWork receivingCustomerWork { get; }

        ILegalEntity legalEntity { get; }

       // IGLAccountClassRespository gLAccountClass { get; }

        IGlCashFlowRepository glCashFlowRepository { get; }

        IPurchaseOrder purchaseOrder { get; }

        ICustomerAffliationRepository CustomerAffliationRepository { get; }
        IGLAccountCategoriesRepository GLAccountCategories { get; }
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
        IStocklineAdjustmentReasonRepository stocklineAdjustmentReasonRepository { get; }

        IItemMasterAircraftManafacturerRepository ItemMasterAircraftManafacturerRepository { get; }

        IItemMasterIntegrationPortalRepository ItemMasterIntegrationPortalRepository { get; }


        ICustomerIntegrationPortalRepository CustomerIntegrationPortalRepository { get; }


        IEmployeeLeaveTypeMappingRepository EmployeeLeaveTypeMappingRepository { get; }


        IAccountingCalendar accountingCalendar { get; }

        IGLAccount gLAccount { get; }

        IAssetIntangibleType assetIntangibleType { get; }

        IAssetType assetType { get; }

        IEmployeeShiftRepository EmployeeShiftMappingRepository { get; }
        IWorkFlowRepositoryTest workFlowRepositoryTest { get; }
        //IPurchaseOrderPartRepository PurchaseOrderPartRepository { get; }
        IStocklineIntegrationPortalRepository StocklineIntegrationPortalRepository { get; }

        ICapabilityTypeRepository capabilityTypeRepository { get; }
        IAssetRepository Asset { get; }

        IRepository<T> Repository<T>() where T : class;

        IGLAccountNodeShareWithEntityMapper GLAccountNodeShareWithEntityMapper { get; }

        IPartStockLineMapper PartStockLineMapper { get; }

        void SaveChanges(Employee employeeobject);
    }
}
