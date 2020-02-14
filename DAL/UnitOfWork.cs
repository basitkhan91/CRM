// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Common;
using DAL.Models;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;
        IUserRoleRepository _userRole { get; set; }
        ICustomerRepository _customer;
        ICustomerBillingInformationRepository _customerBillingInformation;
        ILegalEntityBillnformationRepository _legalEntityBillingInformation;
        IProductRepository _products;
        IOrdersRepository _orders;
        IWorkflowActionRepository _workflowActions;
        IActionRepository _actionRepository;
        IATAMainRepository _aTAMainRepository;
        IATASubChapter1Repository _aTASubChapter1Repository;
        IATASubChapter2Repository _aTASubChapter2Repository;
        ISiteRepository _siteRepository;
        IWarehouseRepository _warehouseRepository;
        ILocationRepository _locationRepository;
        IShelfRepository _shelfRepository;
        IBinRepository _binRepository;
        ICurrencyRepository _currencyRepository;
        IMasterCompanyRepository _masterCompanyRepository;
        IActionAttributeRepository _actionAttributeRepository;
        IIntegration _integrationRepository;
        IPriority _priority;
        ICreditTermsRepository _CreditTermsRepository;
        ICustomerClassificationRepository _customerClassificationRepository;
        IConditionRepository _conditionRepository;
        IFindingRepository _findingRepository;
        IProvisionRepository _provisionRepository;
        IReasonRepository _reasonRepository;
        IItemClassification _itemclassfifcation;
        IItemgroup _itemgroup;
        IPublication _publication;
        ITaxRateRepository _taxRateRepository;
        ITaxTypeRepository _taxTypeRepository;
        IVendorClassificationRepository _vendorClassificationRepository;
        IWorkPerformedRepository _workPerformedRepository;
        IAuditHistoryRepository _auditHistoryRepository;
        IUnitOfMeasureRepository _unitOfMeasureRepository;
        IWorkScopeRepository _workScopeRepository;
        IEmployeeExpertiseRepository _employeeExpertiseRepository;
        IJobTitle _jobTitle;
        IJobType _jobType;
        IExpenditureCategoryRepository _expenditureCategoryRepository;
        IAssetAttributeTypeRepository _assetAttributeTypeRepository;
        IDefaultMessage _defaultMessage;
        IDocument _document;
        IVendor _vendor;
        ICharge _charge;
        IAddress _address;
        IContactRepository _contact;
        IFinance _finance;
        //IPayment _payment;
        IShipping _shipping;
        IVendorContactRepository _vendorContactRepository;
        IVendorPaymentRepository _vendorPaymentRepository;
        IManufacturerRepository _manufacturerRepository;
        IVendorCheckPaymentRepository _vendorCheckPaymentRepository;
        IVendorCapabilitiesRepository _vendorCapabilitiesRepository;

        IVendorDomesticPaymentRepository _vendorDomesticPaymentRepository;

        IVendorDomesticWirePaymentRepository _vendorDomesticWirePaymentRepository;

        IVendorInternationalPaymentRepository _vendorInternationalPaymentRepository;

        IVendorInternationalWirePaymentRepository _vendorInternationalWirePaymentRepository;

        IVendorShippingAddress _vendorShippingAddress;
        IVendorDocumentDetailRepository _vendorDocumentDetails;

        //IVendorShippingDetailsRepository _vendorShippingDetailsRepository;
        IGLAccountClassRespository _gLAccountClassRespository;
        IAssetRepository _assetRepository;
        IAssetAuditRepository _assetAuditRepository;
        IEmployee _employee;
        IGlCashFlowRepository _glCashFlowRepository;
        IEmployeeLeaveType _employeeLeaveType;
        IEmployeeTrainingTypeRepository _EmployeeTrainingType;

        IEmployeeLicenseType _employeeLicenseType;

        IEmployeeLicensure _employeeLicensure;

        //IEmployeeShift _employeeShift;

        IEmployeeTraining _employeeTraining;
        IShiftRepository _shift;
        ICountriesRepository _Countries;
        ICustomerWarning _CustomerWarning;
        ICustomerContactRepository _CustomerContact;
        ILegalEntityContactRepository _legalEntityContact;
        ICustomerShippingAddress _CustomerShippingAddress;
        ILegalEntityShippingAddress _LegalEntityShippingAddress;
        ICustomerAffliationRepository _customerAffliationRepository;

        ICustomerType _customerType;

        IATAChapter _aTAChapter;

        IAircraftType _aircraftType;

        IAircraftModel _aircraftModel;

        //ICustomerAircraftModel _customerAircraftModel;

        //ICustomerAircraftType _customerAircraftType;
        ICustomerDocumentDetail _customerDocumentDetail;

        IItemMaster _itemMaster;
        // IRepairOrder _repairOrder;

        ITimeLife _timeLife;

        IStockLineList _stockList;

        ILegalEntity _legalEntity;

        IReceivingCustomerWork _receivingCustomerWork;

        IWarning _warning;
        ILaborAndOverheadCostRepository _LaborAndOverheadCost;
        IManagementSiteRepository _managementSite;
        IManagementWarehouseRepository _managementWarehouse;
        IManagementLocationRepository _managementLocation;
        IManagementShelfRepository _managementShelf;
        IManagementBinRepository _managementBin;
        IUserRoleLevelMgmStructRepository _userRoleLevelMgmStruct;
        IUserRoleLevelRepository _userRoleLevel;
        IDiscountRepository _discount;
        ICustomerShipping _customershipping;

        IPurchaseOrder _purchaseOrder;
        IRepairOrder _repairOrder;
        IStocklineAdjustmentRepository _stocklineAdjustmentRepository;
        //IWarehouseRepository _warehouseRepository;
        ICertificationTypeRepository _ICertificationTypeRepository;
        IStocklineAdjustmentReasonRepository _stocklineAdjustmentReason;

        IItemMasterAircraftManafacturerRepository _itemMasterAircraftManafacturerRepository;

        IItemMasterIntegrationPortalRepository _itemMasterIntegrationPortalRepository;

        ICustomerIntegrationPortalRepository _customerIntegrationPortalRepository;

        IEmployeeLeaveTypeMappingRepository _employeeLeaveTypeMappingRepository;

        IEmployeeShiftRepository _employeeShiftmappingRepository;
        IWorkFlowRepositoryTest _workFlowRepositoryTest;
        IStocklineIntegrationPortalRepository _stocklineIntegrationPortalRepository;

        ICapabilityTypeRepository _capabilityTypeRepository;

        IAccountingCalendar _accountingCalendar;

        IAssetTypeRepository _assetTypeRepository;
        IAssetIntangibleTypeRepository _assetIntangibleTypeRepository;
        IStageCodeRepository _stageCodeRepository;
        IGLAccountCategoryRepository _GLAccountCategoryRepository;

        IGLAccount _gLAccount;


        IGLAccountNodeShareWithEntityMapper gLAccountNodeShareWithEntityMapper;

        IPartStockLineMapper partStockLineMapper;

        IGLAccountNodeRepository glAccountNode;

        IDashNumberRepository dashNumberRepository;
        IWorkOrderRepository workOrderRepository;
        IWorkOrderStageRepository workOrderStageRepository;
        //IPurchaseOrderPartRepository _purchaseOrderPartRepository;

        ICommonRepository _commonRepository;

        ICustomerAircraftMapping _customerAircraftMapping;

        IFileUploadRepository _fileUploadRepository { get; set; }

        IAssetCapes _assetCapes;

        IAssetIntangibleAttributeTypeRepository _assetIntangibleAttributeTypeRepository;
        IAssetDepreciationInterval _assetDepreciationInterval;

        IAssetDepreciationMethod _assetDepreciationMethod;
        IAssetDisposalType _assetDisposalType;
        IAssetStatus _assetStatus;
        IAssetLocation _assetLocation;
        IAssetLocationAudit _assetLocationAudit;
        // IAssetLocationAuditRepository _assetLocationAuditRepository;
        IAssetAcquisitionType _AssetAcquisitionType;
        IAssetAcquisitionTypeAudit _AssetAcquisitionTypeAudit;
        IAssetDepConvention _assetDepConvention;

        IPublicationTypeRepository _publicationTypeRepository;
        ICommunicationRepository _communicationRepository;
        IPercentageRepository _percentageRepository;

        IMasterSalesOrderQuoteTypesRepository _masterSalesOrderQuoteTypesRepository;
        IMasterSalesCreditTermsRepository _masterSalesCreditTermsRepository;
        IMasterSalesLeadSourcesRepository _masterSalesLeadSourcesRepository;
        IMasterSalesProbablityRepository _masterSalesProbablityRepository;

        IItemMasterExchangeLoanRepository itemMasterExchangeLoanRepository;
        IReceiveRepairOrderRepository _receiveRepairOrder;
        ISalesOrderQuoteRepository _salesOrderQuoteRepository;
        ISalesOrderQuoteApproverList _salesOrderQuoteApproverListRepository;

        ISalesOrderQuotePartRepository _salesOrderQuotePartRepository;
        ITagType _tagTypeRepository;
        IMasterSalesOrderQuoteStatusRepository _masterSalesOrderQuoteStatusRepository;
        IEmployeeStationRepository _employeeStationRepository;
        IGlobalSettingsRepository _globalSettingsRepository;
        JournalRepository _journalRepository;
        LegalEntityShippingRepository _legalEntityShippingRepository;

        public UnitOfWork(ApplicationDbContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings;
        }


        IVendorWarning _vendorWarning;

        public IUserRoleRepository UserRole
        {
            get
            {
                if (_userRole == null)
                    _userRole = new UserRoleRepository(_context);

                return _userRole;
            }
        }

        public IGLAccountNodeRepository GLAccountNode
        {
            get
            {
                if (glAccountNode == null)
                    glAccountNode = new GLAccountNodeRepository(_context);

                return glAccountNode;
            }
        }

        public IVendorWarning VendorWarning
        {
            get
            {
                if (_vendorWarning == null)
                    _vendorWarning = new VendorWarningRepository(_context);

                return _vendorWarning;
            }
        }
        public ICustomerShipping CustomerShipping
        {
            get
            {
                if (_customershipping == null)
                    _customershipping = new CustomerShippingRepository(_context);

                return _customershipping;
            }
        }
        public ICustomerAffliationRepository CustomerAffliationRepository
        {
            get
            {
                if (_customerAffliationRepository == null)
                    _customerAffliationRepository = new CustomerAffliateRepository(_context);

                return _customerAffliationRepository;
            }
        }

        public ICustomerRepository Customer
        {
            get
            {
                if (_customer == null)
                    _customer = new CustomerRepository(_context, _appSettings);

                return _customer;
            }
        }

        public ICustomerBillingInformationRepository CustomerBillingInformation
        {
            get
            {
                if (_customerBillingInformation == null)
                    _customerBillingInformation = new CustomerBillingInformationRepository(_context);

                return _customerBillingInformation;
            }
        }

        public ILegalEntityBillnformationRepository LegalEntityBillingInformation
        {
            get
            {
                if (_legalEntityBillingInformation == null)
                    _legalEntityBillingInformation = new LegalEntityBillingInformationRepository(_context);

                return _legalEntityBillingInformation;
            }
        }

        public IProductRepository Products
        {
            get
            {
                if (_products == null)
                    _products = new ProductRepository(_context);

                return _products;
            }
        }



        public IVendorCapabilitiesRepository VendorCapabilities

        {
            get
            {
                if (_vendorCapabilitiesRepository == null)
                    _vendorCapabilitiesRepository = new VendorCapabilitiesRepository(_context);
                return _vendorCapabilitiesRepository;
            }
        }

        public IOrdersRepository Orders
        {
            get
            {
                if (_orders == null)
                    _orders = new OrdersRepository(_context);

                return _orders;
            }
        }

        public IWorkflowActionRepository WorkflowActions
        {
            get


            {
                if (_workflowActions == null)
                    _workflowActions = new WorkflowActionRepository(_context);

                return _workflowActions;
            }
        }

        public IActionRepository Actions
        {
            get
            {
                if (_actionRepository == null)
                    _actionRepository = new ActionRepository(_context);
                return _actionRepository;
            }
        }

        public IATAMainRepository ATAMains
        {
            get
            {
                if (_aTAMainRepository == null)
                    _aTAMainRepository = new ATAMainRepository(_context);
                return _aTAMainRepository;
            }
        }
        public IATASubChapter1Repository ATASubChapter
        {
            get
            {
                if (_aTASubChapter1Repository == null)
                    _aTASubChapter1Repository = new ATASubChapter1Repository(_context);
                return _aTASubChapter1Repository;
            }
        }
        public IATASubChapter1Repository ATASubChapter1s
        {
            get
            {
                if (_aTASubChapter1Repository == null)
                    _aTASubChapter1Repository = new ATASubChapter1Repository(_context);
                return _aTASubChapter1Repository;
            }
        }

        public IATASubChapter2Repository ATASubChapter2s
        {
            get
            {
                if (_aTASubChapter2Repository == null)
                    _aTASubChapter2Repository = new ATASubChapter2Repository(_context);
                return _aTASubChapter2Repository;
            }
        }
        public ISiteRepository Sites
        {
            get
            {
                if (_siteRepository == null)
                    _siteRepository = new SiteRepository(_context, _appSettings);
                return _siteRepository;
            }
        }
        public IWarehouseRepository Warehouses
        {
            get
            {
                if (_warehouseRepository == null)
                    _warehouseRepository = new WarehouseRepository(_context, _appSettings);
                return _warehouseRepository;
            }
        }
        public ILocationRepository Locations
        {
            get
            {
                if (_locationRepository == null)
                    _locationRepository = new LocationRepository(_context, _appSettings);
                return _locationRepository;
            }
        }
        public IShelfRepository Shelfs
        {
            get
            {
                if (_shelfRepository == null)
                    _shelfRepository = new ShelfRepository(_context, _appSettings);
                return _shelfRepository;
            }
        }
        public IBinRepository Bins
        {
            get
            {
                if (_binRepository == null)
                    _binRepository = new BinRepository(_context);
                return _binRepository;
            }
        }
        public ICurrencyRepository Currencys
        {
            get
            {
                if (_currencyRepository == null)
                    _currencyRepository = new CurrencyRepository(_context, _appSettings);
                return _currencyRepository;
            }
        }


        public IConditionRepository Conditions
        {
            get
            {
                if (_conditionRepository == null)
                    _conditionRepository = new ConditionRepository(_context);
                return _conditionRepository;
            }
        }



        public ICreditTermsRepository CreditTerms
        {
            get
            {
                if (_CreditTermsRepository == null)
                    _CreditTermsRepository = new CreditTermsRepository(_context);
                return _CreditTermsRepository;
            }
        }


        //public ICustomerClassificationRepository CustomerClassifications
        //{
        //    //get
        //    //{
        //    //    if (_customerClassificationRepository == null)
        //    //        _customerClassificationRepository = new CustomerClassificationRepository(_context);
        //    //    return _customerClassificationRepository;
        //    //}
        //}


        public IFindingRepository Findings
        {
            get
            {
                if (_findingRepository == null)
                    _findingRepository = new FindingRepository(_context);
                return _findingRepository;
            }
        }

        public ICustomerAircraftMapping CustomerAircraftMapping
        {
            get
            {
                return _customerAircraftMapping;
            }

        }

        public int SaveChanges()
        {
            //AuditChanges();
            return _context.SaveChanges();
        }

        public void SaveChanges(Employee employeeobject)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> getAlldata()
        {
            throw new NotImplementedException();
        }

        public IRepository<T> Repository<T>() where T : class
        {
            return new Repository<T>(_context);
        }

        public IMasterCompanyRepository MasterCompanies
        {
            get
            {
                if (_masterCompanyRepository == null)
                    _masterCompanyRepository = new MasterCompanyRepository(_context);
                return _masterCompanyRepository;
            }
        }

        ICustomerClassificationRepository IUnitOfWork.CustomerClassifications
        {
            get
            {
                if (_customerClassificationRepository == null)
                    _customerClassificationRepository = new CustomerClassificationRepository(_context);
                return _customerClassificationRepository;
            }
        }

        IProvisionRepository IUnitOfWork.Provisions
        {
            get
            {
                if (_provisionRepository == null)
                    _provisionRepository = new ProvisionRepository(_context);
                return _provisionRepository;
            }
        }

        public IReasonRepository Reasons
        {
            get
            {
                if (_reasonRepository == null)
                    _reasonRepository = new ReasonRepository(_context);
                return _reasonRepository;
            }
        }

        public IActionAttributeRepository ActionAttribute
        {
            get
            {
                if (_actionAttributeRepository == null)
                    _actionAttributeRepository = new ActionAttributeRepository(_context);
                return _actionAttributeRepository;
            }
        }

        public IIntegration Integration
        {
            get
            {
                if (_integrationRepository == null)
                    _integrationRepository = new IntegrationRepository(_context);
                return _integrationRepository;
            }
        }
        public IPriority Priority
        {
            get
            {
                if (_priority == null)
                    _priority = new PriorityRepository(_context);
                return _priority;
            }
        }





        public IItemClassification ItemClassification
        {
            get
            {
                if (_itemclassfifcation == null)
                    _itemclassfifcation = new ItemClassificationRepository(_context, _appSettings);
                return _itemclassfifcation;
            }
        }
        public IItemgroup Itemgroup
        {
            get
            {
                if (_itemgroup == null)
                    _itemgroup = new ItemgroupRepository(_context);
                return _itemgroup;
            }
        }

        public ITaxRateRepository TaxRate

        {
            get
            {
                if (_taxRateRepository == null)
                    _taxRateRepository = new TaxRateRepository(_context);
                return _taxRateRepository;

            }
        }

        public ITaxTypeRepository TaxType

        {
            get
            {
                if (_taxTypeRepository == null)
                    _taxTypeRepository = new TaxTypeRepository(_context);
                return _taxTypeRepository;

            }
        }

        public IVendorClassificationRepository VendorClassifications

        {
            get
            {
                if (_vendorClassificationRepository == null)
                    _vendorClassificationRepository = new VendorClassificationRepository(_context);
                return _vendorClassificationRepository;

            }
        }

        public IWorkPerformedRepository WorkPerformed
        {
            get
            {
                if (_workPerformedRepository == null)
                    _workPerformedRepository = new WorkPerformedRepository(_context);
                return _workPerformedRepository;

            }
        }

        public IPublication Publication
        {
            get
            {
                if (_publication == null)
                    _publication = new PublicationRepository(_context, _appSettings);
                return _publication;

            }
        }

        public IAuditHistoryRepository AuditHistory
        {
            get
            {
                if (_auditHistoryRepository == null)
                    _auditHistoryRepository = new AuditHistoryRepository(_context);
                return _auditHistoryRepository;

            }
        }

        public IUnitOfMeasureRepository UnitOfMeasure

        {
            get
            {
                if (_unitOfMeasureRepository == null)
                    _unitOfMeasureRepository = new UnitOfMeasureRepository(_context, _appSettings);
                return _unitOfMeasureRepository;

            }
        }

        IWorkScopeRepository IUnitOfWork.WorkScope
        {
            get
            {
                if (_workScopeRepository == null)
                    _workScopeRepository = new WorkScopeRepository(_context);
                return _workScopeRepository;

            }
        }

        public IEmployeeExpertiseRepository EmployeeExpertise
        {
            get
            {
                if (_employeeExpertiseRepository == null)
                    _employeeExpertiseRepository = new EmployeeExpertiseRepository(_context, _appSettings);
                return _employeeExpertiseRepository;
            }
        }
        public IJobTitle JobTitle
        {
            get
            {
                if (_jobTitle == null)
                    _jobTitle = new JobTitleRepository(_context);
                return _jobTitle;
            }
        }

        public IJobType JobType
        {
            get
            {
                if (_jobType == null)
                    _jobType = new JobTypeRepository(_context);
                return _jobType;
            }
        }

        public IDefaultMessage DefaultMessage
        {
            get
            {
                if (_defaultMessage == null)
                    _defaultMessage = new DefaultMessageRepository(_context);
                return _defaultMessage;
            }
        }
        public IDocument Document
        {
            get
            {
                if (_document == null)
                    _document = new DocumentRepository(_context);
                return _document;
            }
        }
        public IVendor Vendor
        {
            get
            {
                if (_vendor == null)
                    _vendor = new VenodrRepository(_context, _appSettings);
                return _vendor;
            }
        }
        public ICharge Charge

        {
            get
            {
                if (_charge == null)
                    _charge = new ChargeRepository(_context);
                return _charge;
            }
        }
        public IAddress Address

        {
            get
            {
                if (_address == null)
                    _address = new AddressRepository(_context);
                return _address;
            }
        }
        public IContactRepository ContactRepository

        {
            get
            {
                if (_contact == null)
                    _contact = new ContactRepository(_context);
                return _contact;
            }
        }
        public IFinance Finance

        {
            get
            {
                if (_finance == null)
                    _finance = new FinanceRepository(_context);
                return _finance;
            }
        }
        //public IPayment Payment

        //{
        //    get
        //    {
        //        if (_payment == null)
        //            _payment = new PaymentRepository(_context);
        //        return _payment;
        //    }
        //}
        public IShipping Shipping

        {
            get
            {
                if (_shipping == null)
                    _shipping = new ShippingRepository(_context);
                return _shipping;
            }
        }
        public IVendorContactRepository vendorContactRepository

        {
            get
            {
                if (_vendorContactRepository == null)
                    _vendorContactRepository = new VendorContactRepository(_context);
                return _vendorContactRepository;
            }
        }
        public IVendorPaymentRepository vendorPaymentRepository

        {
            get
            {
                if (_vendorPaymentRepository == null)
                    _vendorPaymentRepository = new VendorPaymentRepository(_context);
                return _vendorPaymentRepository;
            }
        }
        public IVendorCheckPaymentRepository vendorCheckPaymentRepository

        {
            get
            {
                if (_vendorCheckPaymentRepository == null)
                    _vendorCheckPaymentRepository = new VendorCheckPaymentRepository(_context);
                return _vendorCheckPaymentRepository;
            }
        }





        public IVendorDomesticPaymentRepository vendorDomesticPaymentRepository
        {
            get
            {
                if (_vendorDomesticPaymentRepository == null)
                    _vendorDomesticPaymentRepository = new VendorDomesticPaymentRepository(_context);
                return _vendorDomesticPaymentRepository;
            }
        }

        public IVendorInternationalPaymentRepository vendorInternationalPaymentRepository

        {
            get
            {
                if (_vendorInternationalPaymentRepository == null)
                    _vendorInternationalPaymentRepository = new VendorInrernationalPaymentRepository(_context);
                return _vendorInternationalPaymentRepository;
            }
        }

        public IVendorDomesticWirePaymentRepository vendordomesticWirePaymentRepository
        {
            get
            {
                if (_vendorDomesticWirePaymentRepository == null)
                    _vendorDomesticWirePaymentRepository = new VendorDomesticWirePaymentRepository(_context);
                return _vendorDomesticWirePaymentRepository;
            }
        }

        public IVendorInternationalWirePaymentRepository vendorInternationalWirePaymentRepository
        {
            get
            {
                if (_vendorInternationalWirePaymentRepository == null)
                    _vendorInternationalWirePaymentRepository = new VendorInternationalWirePaymentRepository(_context);
                return _vendorInternationalWirePaymentRepository;
            }
        }
        public IVendorShippingAddress VendorShippingAddress

        {
            get
            {
                if (_vendorShippingAddress == null)
                    _vendorShippingAddress = new VendorShippingAddressRepository(_context);
                return _vendorShippingAddress;
            }
        }
        public IVendorDocumentDetailRepository VendorDocumentDetails

        {
            get
            {
                if (_vendorDocumentDetails == null)
                    _vendorDocumentDetails = new VendorDocumentDetailRepository(_context);
                return _vendorDocumentDetails;
            }
        }

        //public IVendorShippingDetailsRepository VendorShippingDetailsRepository

        //{
        //    get
        //    {
        //        if (_vendorShippingDetailsRepository == null)
        //            _vendorShippingDetailsRepository = new VendorShippingDetailsRepository(_context);
        //        return _vendorShippingDetailsRepository;
        //    }
        //}

        public IGLAccountClassRespository GLAccountClassRespository

        {
            get
            {
                if (_gLAccountClassRespository == null)
                    _gLAccountClassRespository = new GLAccountClassRepository(_context);
                return _gLAccountClassRespository;
            }
        }



        public IManufacturerRepository Manufacturer

        {
            get
            {
                if (_manufacturerRepository == null)
                    _manufacturerRepository = new ManufacturerRepository(_context, _appSettings);
                return _manufacturerRepository;
            }
        }

        public IEmployee employee
        {
            get
            {
                if (_employee == null)
                    _employee = new EmployeeRepository(_context);
                return _employee;
            }
        }

        public IShiftRepository shift
        {
            get
            {
                if (_shift == null)
                    _shift = new ShiftRepository(_context);
                return _shift;
            }
        }
        public IEmployeeTrainingTypeRepository EmployeeTrainingType
        {
            get
            {
                if (_EmployeeTrainingType == null)
                    _EmployeeTrainingType = new EmployeeTrainingTypeRepository(_context);
                return _EmployeeTrainingType;
            }
        }
        public IEmployeeLeaveType EmployeeLeaveType

        {
            get
            {
                if (_employeeLeaveType == null)
                    _employeeLeaveType = new EmployeeLeaveTypeRepository(_context);
                return _employeeLeaveType;
            }
        }

        public ICustomerContactRepository CustomerContact

        {
            get
            {
                if (_CustomerContact == null)
                    _CustomerContact = new CustomerContactRepository(_context);
                return _CustomerContact;
            }
        }

        public ILegalEntityContactRepository LegalEntityContact

        {
            get
            {
                if (_legalEntityContact == null)
                    _legalEntityContact = new LegalEntityContactRepository(_context);
                return _legalEntityContact;
            }
        }

        public ICustomerShippingAddress CustomerShippingAddress

        {
            get
            {
                if (_CustomerShippingAddress == null)
                    _CustomerShippingAddress = new CustomerShippingAddressRepository(_context);
                return _CustomerShippingAddress;
            }
        }

        public ILegalEntityShippingAddress LegalEntityShippingAddress

        {
            get
            {
                if (_LegalEntityShippingAddress == null)
                    _LegalEntityShippingAddress = new LegalEntityShippingAddressRepository(_context);
                return _LegalEntityShippingAddress;
            }
        }

        public ICustomerWarning CustomerWarning

        {
            get
            {
                if (_CustomerWarning == null)
                    _CustomerWarning = new CustomerWarningRepository(_context);
                return _CustomerWarning;
            }
        }


        public ICountriesRepository Countries
        {
            get
            {
                if (_Countries == null)
                    _Countries = new CountriesRepository(_context);
                return _Countries;
            }
        }


        public IEmployeeLicenseType employeeLicenseType
        {
            get
            {
                if (_employeeLicenseType == null)
                    _employeeLicenseType = new EmployeeLicenseTypeRepository(_context);
                return _employeeLicenseType;
            }
        }

        public IEmployeeLicensure employeeLicensure
        {
            get
            {
                if (_employeeLicensure == null)
                    _employeeLicensure = new EmployeeLicensureRepository(_context);
                return _employeeLicensure;
            }
        }

        public IEmployeeTraining employeeTraining
        {
            get
            {
                if (_employeeTraining == null)
                    _employeeTraining = new EmployeeTrainingRepository(_context);
                return _employeeTraining;
            }
        }

        //public IEmployeeShift employeeShift
        //{
        //    get
        //    {
        //        if (_employeeShift == null)
        //            _employeeShift = new EmployeeShiftRepository(_context);
        //        return _employeeShift;
        //    }
        //}

        public ICustomerType customerType
        {
            get
            {
                if (_customerType == null)
                    _customerType = new CustomerTypeRepository(_context);
                return _customerType;
            }
        }

        public IATAChapter ATAChapter
        {
            get
            {
                if (_aTAChapter == null)
                    _aTAChapter = new ATAChapterRepository(_context, _appSettings);
                return _aTAChapter;
            }
        }

        public IAircraftType aircraftType
        {
            get
            {
                if (_aircraftType == null)
                    _aircraftType = new AircraftTypeRepository(_context);
                return _aircraftType;
            }
        }

        public IAircraftModel aircraftModel
        {
            get

            {
                if (_aircraftModel == null)
                    _aircraftModel = new AircraftModelRepository(_context);
                return _aircraftModel;
            }
        }

        //public ICustomerAircraftModel customerAircraftModel
        //{
        //    get
        //    {
        //        if (_customerAircraftModel == null)
        //            _customerAircraftModel = new CustomerAircraftModelRepository(_context);
        //        return _customerAircraftModel;
        //    }
        //}

        //public ICustomerAircraftType customerAircraftType
        //{
        //    get
        //    {
        //        if (_customerAircraftType == null)
        //            _customerAircraftType = new CustomerAircraftTypeRepository(_context);
        //        return _customerAircraftType;
        //    }
        //}

        public ICustomerDocumentDetail CreateDocumentDetails
        {
            get
            {
                if (_customerDocumentDetail == null)
                    _customerDocumentDetail = new CustomerDocumentDetailRepository(_context);
                return _customerDocumentDetail;
            }
        }

        public IItemMaster itemMaster
        {
            get
            {
                if (_itemMaster == null)
                    _itemMaster = new ItemMasterRepository(_context);
                return _itemMaster;
            }
        }

        public IWarning warning
        {
            get
            {
                if (_warning == null)
                    _warning = new WarningRepository(_context);
                return _warning;
            }
        }

        public IStockLineList stockLineList
        {
            get
            {
                if (_stockList == null)
                    _stockList = new StockLineListRepository(_context);
                return _stockList;
            }
        }

        public IReceivingCustomerWork receivingCustomerWork
        {
            get
            {

                if (_receivingCustomerWork == null)
                    _receivingCustomerWork = new ReceivingCustomerWorkRepository(_context);
                return _receivingCustomerWork;
            }
        }

        public ITimeLife timeLife
        {
            get
            {

                if (_timeLife == null)
                    _timeLife = new TimelifeRepository(_context);
                return _timeLife;
            }
        }

        public ILegalEntity LegalEntity

        {

            get
            {
                if (_legalEntity == null)
                    _legalEntity = new LegalEntityRepository(_context, _appSettings);
                return _legalEntity;

            }
        }
        public IGlCashFlowRepository GlClassFlowClassification
        {
            get
            {
                if (_glCashFlowRepository == null)
                    _glCashFlowRepository = new GlCashFlowRepository(_context);
                return _glCashFlowRepository;
            }
        }

        public IGlCashFlowRepository GlClassFlowsClassification
        {
            get
            {
                if (_glCashFlowRepository == null)
                    _glCashFlowRepository = new GlCashFlowRepository(_context);
                return _glCashFlowRepository;
            }
        }

        public IVendorCapabilitiesRepository vendorCapabilities
        {
            get
            {
                if (_vendorCapabilitiesRepository == null)
                    _vendorCapabilitiesRepository = new VendorCapabilitiesRepository(_context);
                return _vendorCapabilitiesRepository;
            }
        }



        public ILaborAndOverheadCostRepository LaborAndOverheadCost

        {
            get
            {
                if (_LaborAndOverheadCost == null)
                    _LaborAndOverheadCost = new LaborAndOverheadCostRepository(_context);
                return _LaborAndOverheadCost;
            }
        }

        public IManagementSiteRepository managementSite
        {
            get
            {
                if (_managementSite == null)
                    _managementSite = new ManagementSiteRepository(_context);
                return _managementSite;
            }
        }

        public IManagementWarehouseRepository managementWarehouse
        {
            get
            {
                if (_managementWarehouse == null)
                    _managementWarehouse = new ManagementWarehouseRepository(_context);
                return _managementWarehouse;
            }
        }

        public IManagementLocationRepository managementLocation
        {
            get
            {
                if (_managementLocation == null)
                    _managementLocation = new ManagementLocationRepository(_context);
                return _managementLocation;
            }
        }

        public IManagementShelfRepository managementShelf
        {
            get
            {
                if (_managementShelf == null)
                    _managementShelf = new ManagementShelfRepository(_context);
                return _managementShelf;
            }
        }

        public IManagementBinRepository managementBin
        {
            get
            {
                if (_managementBin == null)
                    _managementBin = new ManagementBinRepository(_context);
                return _managementBin;
            }
        }

        public IUserRoleLevelMgmStructRepository userRoleLevelMgmStruct
        {
            get
            {
                if (_userRoleLevelMgmStruct == null)
                    _userRoleLevelMgmStruct = new UserRoleLevelMgmStructRepository(_context);
                return _userRoleLevelMgmStruct;
            }
        }

        public IUserRoleLevelRepository userRoleLevel
        {
            get
            {
                if (_userRoleLevel == null)
                    _userRoleLevel = new UserRoleLevelRepository(_context);
                return _userRoleLevel;
            }
        }
        public IDiscountRepository Discount
        {

            get
            {
                if (_discount == null)
                    _discount = new DiscountRepository(_context);
                return _discount;
            }
        }


        //public IStockLineAdjustmentDatatypeRepository StockLineAdjustmentDatatypeRepository
        //{

        //    get
        //    {
        //        if (_stockLineAdjustmentDatatypeRepository == null)
        //            _stockLineAdjustmentDatatypeRepository = new StocklineAdjustementDataType(_context);
        //        return _stockLineAdjustmentDatatypeRepository;
        //    }
        //}






        public IGlCashFlowRepository glCashFlowRepository => throw new NotImplementedException();



        public IPurchaseOrder purchaseOrder

        {
            get
            {
                if (_purchaseOrder == null)
                    _purchaseOrder = new PurchaseOrderRepository(_context);
                return _purchaseOrder;
            }
        }

        public IRepairOrder repairOrder
        {
            get
            {
                if (_repairOrder == null)
                    _repairOrder = new RepairOrderRepository(_context);
                return _repairOrder;
            }
        }

        public IStocklineAdjustmentRepository stocklineAdjustmentRepository
        {
            get
            {
                if (_stocklineAdjustmentRepository == null)
                    _stocklineAdjustmentRepository = new StockLineAdjustmentRepository(_context);
                return _stocklineAdjustmentRepository;
            }
        }

        public IItemMasterAircraftManafacturerRepository ItemMasterAircraftManafacturerRepository
        {
            get
            {
                if (_itemMasterAircraftManafacturerRepository == null)
                    _itemMasterAircraftManafacturerRepository = new ItemMasterAircraftManafacturerRepository(_context);
                return _itemMasterAircraftManafacturerRepository;
            }
        }

        public IVendorPaymentMethodRepository vendorPaymentMethodRepository => throw new NotImplementedException();



        //public ICertificationTypeRepository CertificationTypeRepository {
        //    get
        //    {
        //        if (_ICertificationTypeRepository == null)
        //            _ICertificationTypeRepository = new CertificationTypeRepository(_context);
        //        return _ICertificationTypeRepository;
        //    }
        //}


        public IItemMasterIntegrationPortalRepository ItemMasterIntegrationPortalRepository
        {
            get
            {
                if (_itemMasterIntegrationPortalRepository == null)
                    _itemMasterIntegrationPortalRepository = new ItemMasterIntegrationPortalRepository(_context);
                return _itemMasterIntegrationPortalRepository;
            }
        }

        public ICustomerIntegrationPortalRepository CustomerIntegrationPortalRepository
        {
            get
            {
                if (_customerIntegrationPortalRepository == null)
                    _customerIntegrationPortalRepository = new CustomerIntegrationportalRepository(_context);
                return _customerIntegrationPortalRepository;
            }
        }

        public IEmployeeLeaveTypeMappingRepository EmployeeLeaveTypeMappingRepository
        {
            get
            {
                if (_employeeLeaveTypeMappingRepository == null)
                    _employeeLeaveTypeMappingRepository = new EmployeeLeaveTypeMappingRepository(_context);
                return _employeeLeaveTypeMappingRepository;
            }
        }

        public IEmployeeShiftRepository EmployeeShiftMappingRepository
        {
            get
            {
                if (_employeeShiftmappingRepository == null)
                    _employeeShiftmappingRepository = new EmployeeShiftMappingRepository(_context);
                return _employeeShiftmappingRepository;
            }
        }


        public IWorkFlowRepositoryTest workFlowRepositoryTest
        {
            get
            {
                if (_workFlowRepositoryTest == null)
                    _workFlowRepositoryTest = new WorkFlowRepositoryTest(_context);
                return _workFlowRepositoryTest;
            }
        }

        public IStocklineIntegrationPortalRepository StocklineIntegrationPortalRepository
        {
            get
            {
                if (_stocklineIntegrationPortalRepository == null)
                    _stocklineIntegrationPortalRepository = new StocklineIntegrationPortalRepository(_context);
                return _stocklineIntegrationPortalRepository;
            }
        }

        public ICapabilityTypeRepository capabilityTypeRepository
        {
            get
            {
                if (_capabilityTypeRepository == null)
                    _capabilityTypeRepository = new CapabilityTypeRepository(_context);
                return _capabilityTypeRepository;
            }
        }

        public IGLAccountClassRespository GLAccountClass
        {
            get
            {
                if (_gLAccountClassRespository == null)
                    _gLAccountClassRespository = new GLAccountClassRepository(_context);
                return _gLAccountClassRespository;
            }
        }

        public IAssetRepository Asset
        {
            get
            {
                if (_assetRepository == null)
                    _assetRepository = new AssetRepository(_context);
                return _assetRepository;
            }
        }

        public IAssetAuditRepository AssetAudit
        {
            get
            {
                if (_assetAuditRepository == null)
                    _assetAuditRepository = new AssetAuditRepository(_context);
                return _assetAuditRepository;
            }
        }

        public IAccountingCalendar accountingCalendar
        {
            get
            {
                if (_accountingCalendar == null)
                    _accountingCalendar = new AccountingCalendarRepository(_context);
                return _accountingCalendar;
            }
        }

        public IGLAccount gLAccount
        {
            get
            {
                if (_gLAccount == null)
                    _gLAccount = new GLAccountRepository(_context);
                return _gLAccount;
            }
        }

        public IAssetTypeRepository AssetTypeRepository
        {
            get
            {
                if (_assetTypeRepository == null)
                    _assetTypeRepository = new AssetTypeRepository(_context, _appSettings);
                return _assetTypeRepository;
            }
        }

        public IAssetIntangibleTypeRepository AssetIntangibleTypeRepository
        {
            get
            {
                if (_assetIntangibleTypeRepository == null)
                    _assetIntangibleTypeRepository = new AssetIntangibleTypeRepository(_context, _appSettings);
                return _assetIntangibleTypeRepository;
            }
        }

        public IStageCodeRepository StageCodeRepository
        {
            get
            {
                if (_stageCodeRepository == null)
                    _stageCodeRepository = new StageCodeRepository(_context, _appSettings);
                return _stageCodeRepository;
            }
        }
        public IGLAccountCategoryRepository GLAccountCategoryRepository

        {
            get
            {
                if (_GLAccountCategoryRepository == null)
                    _GLAccountCategoryRepository = new GLAccountCategoryRepository(_context, _appSettings);
                return _GLAccountCategoryRepository;
            }
        }

        public IExpenditureCategoryRepository ExpenditureCategoryRepository

        {
            get
            {
                if (_expenditureCategoryRepository == null)
                    _expenditureCategoryRepository = new ExpenditureCategoryRepository(_context, _appSettings);
                return _expenditureCategoryRepository;
            }
        }

        public IAssetAttributeTypeRepository AssetAttributeTypeRepository

        {
            get
            {
                if (_assetAttributeTypeRepository == null)
                    _assetAttributeTypeRepository = new AssetAttributeTypeRepository(_context, _appSettings);
                return _assetAttributeTypeRepository;
            }
        }
        public IGLAccountNodeShareWithEntityMapper GLAccountNodeShareWithEntityMapper
        {
            get
            {
                if (gLAccountNodeShareWithEntityMapper == null)
                    gLAccountNodeShareWithEntityMapper = new GLAccountNodeShareWithEntityMapperRepository(_context);
                return gLAccountNodeShareWithEntityMapper;
            }
        }

        private void AuditChanges()
        {
            try
            {
                _context.ChangeTracker.DetectChanges();
                var modifiedEntries = _context.ChangeTracker.Entries()
                    .Where(x => x.Entity is IAudit && x.State == EntityState.Modified).ToList();
                foreach (var entry in modifiedEntries)
                {
                    var entity = entry.Entity;
                    Type type = entity.GetType();
                    var classPath = type.GetTypeInfo().FullName;
                    var auditEntity = Activator.CreateInstance(Type.GetType(classPath + "Audit", true));
                    var auditEntityProperties = auditEntity.GetType().GetProperties();
                    var originalValues = entry.GetDatabaseValues();  // OriginalValues[property.Name];
                    var entityProperties = entity.GetType().GetProperties();
                    var isValueChanged = false;
                    auditEntityProperties.ToList().ForEach(property =>
                    {

                        if (entityProperties.Any(x => x.Name == property.Name))
                        {
                            var originalValue = originalValues[property.Name];
                            var currentValue = entry.CurrentValues[property.Name];
                            var entityProperty = entityProperties.First(x => x.Name == property.Name);
                            var isKeyAttribute = Attribute.GetCustomAttribute(entityProperty, typeof(KeyAttribute)) as KeyAttribute != null;

                            if (originalValue != null)
                            {
                                if (currentValue == null)
                                {
                                    property.SetValue(auditEntity, originalValue, null);
                                    isValueChanged = true;
                                }
                                else if (originalValue.ToString() != currentValue.ToString())
                                {
                                    property.SetValue(auditEntity, originalValue, null);
                                    isValueChanged = true;
                                }
                                else if (isKeyAttribute)
                                {
                                    property.SetValue(auditEntity, originalValue, null);
                                }
                            }
                            else
                            {
                                if (currentValue != null && property.Name == "UpdatedDate")
                                {
                                    property.SetValue(auditEntity, currentValue, null);
                                    isValueChanged = true;
                                }
                            }
                        }
                    });
                    if (isValueChanged)
                        AuditRecord(auditEntity);
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                throw;
            }
        }

        private void AuditRecord(object auditData)
        {
            var classType = typeof(Repository<>);
            var argumentType = auditData.GetType();
            var constructedAddAuditMethod = classType.MakeGenericType(argumentType);
            var obj = Activator.CreateInstance(constructedAddAuditMethod, new object[] { _context });

            MethodInfo addAuditMethod = constructedAddAuditMethod.GetMethod("Add");
            addAuditMethod.Invoke(obj, new[] { auditData });
        }


        public IPartStockLineMapper PartStockLineMapper
        {
            get
            {
                if (partStockLineMapper == null)
                    partStockLineMapper = new PartStockLineMapperRepository(_context, CommonRepository);
                return partStockLineMapper;
            }
        }

        public IDashNumberRepository DashNumberRepository
        {
            get
            {
                if (dashNumberRepository == null)
                    dashNumberRepository = new DashNumberRepository(_context);
                return dashNumberRepository;
            }
        }
        public IWorkOrderRepository WorkOrderRepository
        {
            get
            {
                if (workOrderRepository == null)
                    workOrderRepository = new WorkOrderRepository(_context);
                return workOrderRepository;
            }
        }

        public IWorkOrderStageRepository WorkOrderStageRepository
        {
            get
            {
                if (workOrderStageRepository == null)
                    workOrderStageRepository = new WorkOrderStageRepository(_context);
                return workOrderStageRepository;
            }
        }
        IAssetCapes IUnitOfWork.AssetCapes
        {
            get
            {
                if (_assetCapes == null)
                    _assetCapes = new AssetCapesRepository(_context);
                return _assetCapes;
            }
        }

        IAssetIntangibleAttributeTypeRepository IUnitOfWork.AssetIntangibleAttributeTypeRepository
        {
            get
            {
                if (_assetIntangibleAttributeTypeRepository == null)
                    _assetIntangibleAttributeTypeRepository = new AssetIntangibleAttributeTypeRepository(_context, _appSettings);
                return _assetIntangibleAttributeTypeRepository;
            }
        }

        IAssetDepreciationInterval IUnitOfWork.AssetDepreciationInterval
        {
            get
            {
                if (_assetDepreciationInterval == null)
                    _assetDepreciationInterval = new AssetDepreciationIntervalRepository(_context);
                return _assetDepreciationInterval;
            }
        }

        IStocklineAdjustmentReasonRepository IUnitOfWork.StocklineAdjustmentReasonRepository
        {
            get
            {
                if (_stocklineAdjustmentReason == null)
                    _stocklineAdjustmentReason = new StocklineAdjustmentReasonRepository(_context);
                return _stocklineAdjustmentReason;
            }
        }


        IAssetDepreciationMethod IUnitOfWork.AssetDepreciationMethod
        {
            get
            {
                if (_assetDepreciationMethod == null)
                    _assetDepreciationMethod = new AssetDepreciationMethodRepository(_context);
                return _assetDepreciationMethod;
            }
        }

        IAssetDisposalType IUnitOfWork.AssetDisposalType
        {
            get
            {
                if (_assetDisposalType == null)
                    _assetDisposalType = new AssetDisposalTypeRepository(_context);
                return _assetDisposalType;
            }
        }

        IAssetStatus IUnitOfWork.AssetStatus
        {
            get
            {
                if (_assetStatus == null)
                    _assetStatus = new AssetStatusRepository(_context);
                return _assetStatus;
            }
        }

        IAssetLocation IUnitOfWork.AssetLocation
        {
            get
            {
                if (_assetLocation == null)
                    _assetLocation = new AssetLocationRepository(_context);
                return _assetLocation;
            }
        }

        public IAssetLocationAudit AssetLocationAudit
        {
            get
            {
                if (_assetLocationAudit == null)
                    _assetLocationAudit = new AssetLocationAuditRepository(_context);
                return _assetLocationAudit;
            }
        }

        IAssetAcquisitionType IUnitOfWork.AssetAcquisitionType
        {
            get
            {
                if (_AssetAcquisitionType == null)
                    _AssetAcquisitionType = new AssetAcquisitionTypeRepository(_context);
                return _AssetAcquisitionType;
            }
        }

        IAssetAcquisitionTypeAudit IUnitOfWork.AssetAcquisitionTypeAudit
        {
            get
            {
                if (_AssetAcquisitionTypeAudit == null)
                    _AssetAcquisitionTypeAudit = new AssetAcquisitionTypeAuditRepository(_context);
                return _AssetAcquisitionTypeAudit;
            }
        }

        IAssetDepConvention IUnitOfWork.AssetDepConvention
        {
            get
            {
                if (_assetDepConvention == null)
                    _assetDepConvention = new AssetDepConventionRepository(_context);
                return _assetDepConvention;
            }
        }

        public ICommonRepository CommonRepository
        {
            get
            {
                if (_commonRepository == null)
                    _commonRepository = new CommonRepository(_context);
                return _commonRepository;
            }
        }

        //IAssetCapes IUnitOfWork.AssetCapes
        //{
        //    get {
        //        if (_assetCapes == null)
        //            _assetCapes = new AssetCapesRepository(_context);
        //        return _assetCapes;
        //    }
        //}

        IOptions<AppSettings> _appSettings;
        public IFileUploadRepository FileUploadRepository
        {
            get
            {
                if (_fileUploadRepository == null)
                    _fileUploadRepository = new FileUploadRepository(_context, _appSettings);
                return _fileUploadRepository;
            }
        }

        public IPublicationTypeRepository PublicationTypeRepository
        {
            get
            {
                if (_publicationTypeRepository == null)
                    _publicationTypeRepository = new PublicationTypeRepository(_context, _appSettings);
                return _publicationTypeRepository;
            }
        }

        public ICommunicationRepository CommunicationRepository
        {
            get
            {
                if (_communicationRepository == null)
                    _communicationRepository = new CommunicationRepository(_context, _appSettings);
                return _communicationRepository;
            }
        }

        public IPercentageRepository PercentageRepository
        {
            get
            {
                if (_percentageRepository == null)
                {
                    _percentageRepository = new PercentageRepository(_context, _appSettings);
                }
                return _percentageRepository;
            }
        }

        public IMasterSalesOrderQuoteTypesRepository MasterSalesOrderQuoteTypesRepository
        {
            get
            {
                if (_masterSalesOrderQuoteTypesRepository == null)
                {
                    _masterSalesOrderQuoteTypesRepository = new MasterSalesOrderQuoteTypesRepository(_context);
                }
                return _masterSalesOrderQuoteTypesRepository;
            }
        }

        public IMasterSalesCreditTermsRepository MasterSalesCreditTermsRepository
        {
            get
            {
                if (_masterSalesCreditTermsRepository == null)
                {
                    _masterSalesCreditTermsRepository = new MasterSalesCreditTermsRepository(_context);
                }
                return _masterSalesCreditTermsRepository;
            }
        }

        public IMasterSalesLeadSourcesRepository MasterSalesLeadSourcesRepository
        {
            get
            {
                if (_masterSalesLeadSourcesRepository == null)
                {
                    _masterSalesLeadSourcesRepository = new MasterSalesLeadSourcesRepository(_context);
                }
                return _masterSalesLeadSourcesRepository;
            }
        }

        public IMasterSalesProbablityRepository MasterSalesProbablityRepository
        {
            get
            {
                if (_masterSalesProbablityRepository == null)
                {
                    _masterSalesProbablityRepository = new MasterSalesProbablityRepository(_context);
                }
                return _masterSalesProbablityRepository;
            }
        }

        public IItemMasterExchangeLoanRepository ItemMasterExchangeLoan
        {
            get
            {
                if (itemMasterExchangeLoanRepository == null)
                {
                    itemMasterExchangeLoanRepository = new ItemMasterExchangeLoanRepository(_context, _appSettings);
                }
                return itemMasterExchangeLoanRepository;
            }
        }

        public IReceiveRepairOrderRepository ReceiveRepairOrder
        {
            get
            {
                if (_receiveRepairOrder == null)
                {
                    _receiveRepairOrder = new ReceiveRepairOrderRepository(_context, CommonRepository);
                }
                return _receiveRepairOrder;
            }
        }


        public ISalesOrderQuoteRepository SalesOrderQuote
        {
            get
            {
                if (_salesOrderQuoteRepository == null)
                    _salesOrderQuoteRepository = new SalesOrderQuoteRepository(_context);
                return _salesOrderQuoteRepository;
            }
        }

        public ISalesOrderQuoteApproverList SalesOrderQuoteApproverList
        {
            get
            {
                if (_salesOrderQuoteApproverListRepository == null)
                    _salesOrderQuoteApproverListRepository = new SalesOrderQuoteApproverListRepository(_context);
                return _salesOrderQuoteApproverListRepository;
            }
        }

        public ISalesOrderQuotePartRepository SalesOrderQuotePart
        {
            get
            {
                if (_salesOrderQuotePartRepository == null)
                    _salesOrderQuotePartRepository = new SalesOrderQuotePartRepository(_context);
                return _salesOrderQuotePartRepository;
            }
        }

        public ITagType tagType
        {
            get
            {
                if (_tagTypeRepository == null)
                    _tagTypeRepository = new TagTypeRepository(_context);
                return _tagTypeRepository;
            }
        }

        public IMasterSalesOrderQuoteStatusRepository MasterSalesOrderQuoteStatusRepository
        {
            get
            {
                if (_masterSalesOrderQuoteStatusRepository == null)
                    _masterSalesOrderQuoteStatusRepository = new MasterSalesOrderQuoteStatusRepository(_context);
                return _masterSalesOrderQuoteStatusRepository;
            }
        }

        public IEmployeeStationRepository employeeStationRepository
        {
            get
            {
                if (_employeeStationRepository == null)
                    _employeeStationRepository = new EmployeeStationRepository(_context);

                return _employeeStationRepository;
            }
        }

        public IGlobalSettingsRepository GlobalSettingsRepository
        {
            get
            {
                if (_globalSettingsRepository == null)
                    _globalSettingsRepository = new GlobalSettingsRepository(_context);

                return _globalSettingsRepository;
            }
        }

        public IJournalRepository Journal
        {
            get
            {
                if (_journalRepository == null)
                    _journalRepository = new JournalRepository(_context);

                return _journalRepository;
            }
        }

        public ILegalEntityShipping LegalEntityShipping
        {
            get
            {
                if (_legalEntityShippingRepository == null)
                    _legalEntityShippingRepository = new LegalEntityShippingRepository(_context);

                return _legalEntityShippingRepository;
            }
        }
    }
}


