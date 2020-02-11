using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System.Linq.Dynamic.Core;
using DAL.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.KeyVault.Models;
using Remotion.Linq.Parsing.ExpressionVisitors.Transformation.PredefinedTransformations;
using Spire.Pdf.Exporting.XPS.Schema;
using Contact = DAL.Models.Contact;
using Path = System.IO.Path;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Net.Http.Headers;
using DAL.Common.Enum;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {


        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public CustomerController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;

        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Customer.GetAllCustomersData(); //.GetAllCustomersData();
            return Ok(result);
        }
        [HttpGet("GetAll")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult GetAll()
        {
            var result = _unitOfWork.Customer.GetCustomersData(); //.GetAllCustomersData();
            return Ok(result);
        }
        [HttpGet("Getdiscount")]
        [Produces(typeof(List<DiscountViewModel>))]
        public IActionResult Getdiscount()
        {
            var result = _unitOfWork.Discount.GetAllDiscountData(); //.GetAllCustomersData();
            return Ok(result);
        }

        [HttpGet("GetCustomerBynameList/{name}")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult GetCustomerByNameList(string name, CustomerViewModel customerViewModel)
        {
            var allCustomerBynamelistDetails = _unitOfWork.Customer.SearchCustomer(name, DAL.Models.Enums.CustomerSearchType.ContainsName); //.GetAllCustomersData();
            return Ok(allCustomerBynamelistDetails);
        }


        [HttpGet("customergeneralinfo")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult Customergeneralinfo(CustomerViewModel customerViewModel)
        {
            //.GetAllCustomersData();
            return Ok(customerViewModel);
        }

        [HttpGet("fianlEmptyObj")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult getFianlEmptyObj(CustomerViewModel customerViewModel)
        {
            //.GetAllCustomersData();
            return Ok(customerViewModel);
        }

        //Added by Vishnu:
        [HttpGet("CustomerTypeGet")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult cusTypeGet(CustomerViewModel customerViewModel)
        {
            var allcustomertype = _unitOfWork.customerType.GetCustomerTypes(); //.GetAllCustomersData();
            return Ok(allcustomertype);
        }

        [HttpGet("GetcountryList")]
        [Produces(typeof(List<Countries>))]
        public IActionResult GetcountryList()
        {
            var allcustomertype = _context.Countries.OrderBy(c => c.nice_name).ToList();
            return Ok(allcustomertype);

        }

        [HttpGet("aircraftTypeGet/{id}")]
        [Produces(typeof(List<AircraftModelViewModel>))]
        public IActionResult aircraft(string id, AircraftModelViewModel aircraftModelViewModel)
        {


            var allcustomertype = _unitOfWork.aircraftModel.GetAllAircraftModelData(id); //.GetAllCustomersData();
            return Ok(allcustomertype);

        }

        [HttpGet("CustomerlistIdGet/{customerId}")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult GetCustomerWithid(long customerId)
        {
            var customerDtails = _unitOfWork.Customer.GetCustomerWithid(customerId); //.GetAllCustomersData();
            return Ok(customerDtails);

        }

        [HttpGet("CustomerRowByIdGet/{customerId}")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult GetCustomerRowById(long customerId)
        {
            var customerDtails = _unitOfWork.Customer.GetCustomerRowByid(customerId); //.GetAllCustomersData();
            return Ok(customerDtails);

        }

        [HttpGet("AtachapterGet")]
        [Produces(typeof(List<ATAChapterViewModel>))]
        public IActionResult atachapterGet(ATAChapterViewModel aTAChapterViewModel)
        {
            var allatachapter = _unitOfWork.ATAChapter.GetATAChapterData(); //.GetAllCustomersData();
            return Ok(allatachapter);

        }

        [HttpGet("customerAddressGet/{id}")]
        [Produces(typeof(List<CustomerBillingAddress>))]
        public IActionResult customerAddressGet(long id, CustomerBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.CustomerBillingInformation.GetAllCusBillingDetails(id); //.GetAllCustomersData();
            return Ok(allCusbilldetails);

        }

        [HttpGet("getCustomerBillViaDetails/{id}")]
        [Produces(typeof(List<CustomerBillingAddress>))]
        public IActionResult getCustomerBillViaDetails(long id, CustomerBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.CustomerBillingInformation.GetAllCusBillingDetails(id); //.GetAllCustomersData();
            return Ok(allCusbilldetails);

        }

        [HttpGet("cusshippingGet/{id}")]
        [Produces(typeof(List<CustomerBillingAddress>))]
        public IActionResult cusshippingGet(long id, CustomerBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.CustomerShippingAddress.GetAllShippingAddressDetails(id); //.GetAllCustomersData();
            return Ok(allCusbilldetails);

        }

        [HttpGet("Aircraftget")]
        [Produces(typeof(List<AircraftTypeViewModel>))]
        public IActionResult aircraftGet(AircraftTypeViewModel aircraftTypeViewModel)
        {
            var allatachapter = _unitOfWork.aircraftType.getAircraftTypeData(); //.GetAllCustomersData();
            return Ok(allatachapter);

        }

        [HttpGet("aircraftManufacturerGet/{id}")]
        [Produces(typeof(List<CustomerAircraftModelViewModel>))]
        public IActionResult aircraftManufacturerGet(int id)
        {
            var aircraft = _unitOfWork.customerAircraftType.GetAll();
            var aircraftManufacturer = aircraft.Where(a => a.CustomerId == id).ToList();
            return Ok(aircraftManufacturer);

        }

        [HttpGet("AddressGet")]
        [Produces(typeof(List<Address>))]
        public IActionResult GetAddress()
        {
            var alladdresses = _unitOfWork.Address.GetAddresses(); //.GetAllCustomersData();
            return Ok(alladdresses);

        }

        [HttpPost("insertToAuditaddress")]
        // [HttpPost("insertToAuditaddress")]
        public IActionResult InsertToAuditaddress([FromBody] AuditAddressViewModel addressAuditViewmodel)
        {

            AddressAudit au = new AddressAudit();
            addressAuditViewmodel.IsDeleted = false;
            au.City = addressAuditViewmodel.City;
            au.AddressId = addressAuditViewmodel.AddressId;
            au.Country = addressAuditViewmodel.Country;
            au.Line1 = addressAuditViewmodel.Line1;
            au.Line2 = addressAuditViewmodel.Line2;
            au.Line3 = addressAuditViewmodel.Line3;

            au.IsDeleted = addressAuditViewmodel.IsDeleted;
            _context.Address_Audit.Add(au);
            _context.SaveChanges();
            return Ok(au);


        }

        [HttpPut("updateToAuditaddress/{id}")]
        public IActionResult UpdateToAuditaddress(long id, AuditAddressViewModel addressAudit)
        {
            var actionobject = _context.Address_Audit.First(a => a.AddressId == id);
            actionobject.City = addressAudit.City;
            actionobject.AddressId = addressAudit.AddressId;
            actionobject.Country = addressAudit.Country;
            actionobject.Line1 = addressAudit.Line1;
            actionobject.Line2 = addressAudit.Line2;
            actionobject.Line3 = addressAudit.Line3;
            _context.Address_Audit.Add(actionobject);
            _context.SaveChanges();
            return Ok(actionobject);


        }
        [HttpPost("insertDiscount")]
        public IActionResult CreateAction([FromBody] DiscountViewModel discountViewModel)
        {
            if (ModelState.IsValid)
            {
                if (discountViewModel == null)
                    return BadRequest($"{nameof(DiscountViewModel)} cannot be null");

                DAL.Models.DiscountModel discObj = new DAL.Models.DiscountModel();
                discObj.DiscontValue = discountViewModel.DiscontValue;
                discObj.MasterCompanyId = 1;
                discObj.CreatedBy = discountViewModel.CreatedBy;
                discObj.UpdatedBy = discountViewModel.UpdatedBy;
                discObj.CreatedDate = System.DateTime.UtcNow;
                discObj.UpdatedDate = discountViewModel.UpdatedDate;
                _unitOfWork.Discount.Add(discObj);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }

        [HttpPut("updatediscount/{id}")]
        public IActionResult UpdateDiscont(long id, DiscountViewModel discountViewModel)
        {
            var disc = _context.Discount.First(a => a.DiscountId == id);
            disc.DiscontValue = discountViewModel.DiscontValue;
            _context.Discount.Add(disc);
            _context.SaveChanges();
            return Ok(disc);
        }

        [HttpGet("GetDescriptionbypart/{name}")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult Getdescriptionbypart(string name, CustomerViewModel itemMasterViewModel)
        {
            var descriptionbypart = _unitOfWork.Customer.GetCustomerBynameList(name); //.GetAllCustomersData();
            return Ok(descriptionbypart);

        }

        [HttpPost("customers")]
        public IActionResult CreateAction([FromBody] CustomerViewModel customerViewModel, Address address, CustomerType ct)
        {
            if (ModelState.IsValid)
            {
                if (customerViewModel == null)
                    return BadRequest($"{nameof(customerViewModel)} cannot be null");
                DAL.Models.Customer actionobject = new DAL.Models.Customer();
                ct.CustomerTypeId = 1;
                customerViewModel.MasterCompanyId = 1;
                actionobject.IsActive = true;
                actionobject.IsDeleted = false;
                actionobject.CustomerAffiliationId = customerViewModel.CustomerAffiliationId;
                actionobject.CurrencyId = customerViewModel.CurrencyId;
                actionobject.CreditTermsId = customerViewModel.CreditTermsId;
                actionobject.Name = customerViewModel.Name;
                actionobject.Parent = customerViewModel.Parent;
                actionobject.Email = customerViewModel.Email;
                actionobject.CustomerPhone = customerViewModel.CustomerPhone;
                actionobject.CustomerPhoneExt = customerViewModel.CustomerPhoneExt;
                actionobject.AnnualQuota = customerViewModel.AnnualQuota;
                actionobject.AnnualRevenuePotential = customerViewModel.AnnualRevenuePotential;
                actionobject.CustomerParentName = customerViewModel.CustomerParentName;
                actionobject.ScanDocuments = customerViewModel.ScanDocuments;
                actionobject.PBHCustomerMemo = customerViewModel.PBHCustomerMemo;
                actionobject.RestrictPMA = customerViewModel.RestrictPMA;
                actionobject.IsAddressForBilling = customerViewModel.IsAddressForBilling;
                actionobject.IsAddressForShipping = customerViewModel.IsAddressForShipping;
                actionobject.EDI = customerViewModel.EDI;
                actionobject.IsAeroExchange = customerViewModel.IsAeroExchange;
                actionobject.AeroExchangeDescription = customerViewModel.AeroExchangeDescription;
                actionobject.EDIDescription = customerViewModel.EDIDescription;
                // actionobject.IntegrationPortalId = customerViewModel.IntegrationPortalId;
                actionobject.RestrictBERMemo = customerViewModel.RestrictBERMemo;

                if (customerViewModel.CustomerClassificationIds != null)
                { actionobject.CustomerClassificationId = customerViewModel.CustomerClassificationIds[0] ?? null; }

                actionobject.CustomerTypeId = customerViewModel.CustomerTypeId;
                actionobject.CustomerType = customerViewModel.CustomerType;
                actionobject.IsCustomerAlsoVendor = customerViewModel.IsCustomerAlsoVendor;
                actionobject.IsPBHCustomer = customerViewModel.IsPBHCustomer;
                actionobject.CustomerCode = customerViewModel.CustomerCode;
                actionobject.ContractReference = customerViewModel.ContractReference;
                actionobject.DoingBuinessAsName = customerViewModel.DoingBuinessAsName;
                actionobject.CustomerURL = customerViewModel.CustomerURL;
                actionobject.CustomerClassification = customerViewModel.CustomerClassification;
                actionobject.CustomerAddress = customerViewModel.CustomerAddress;
                actionobject.RestrictBER = customerViewModel.RestrictBER;
                actionobject.RestrictPMA = customerViewModel.RestrictPMA;
                actionobject.CustomerBillingAddress = customerViewModel.CustomerBillingAddress;
                actionobject.RestrictPMAMemo = customerViewModel.RestrictPMAMemo;
                actionobject.MasterCompanyId = customerViewModel.MasterCompanyId;
                actionobject.CustomerAffiliationId = customerViewModel.CustomerAffiliationId;
                actionobject.ATAChapterId = customerViewModel.ATAChapterId;
                actionobject.GeneralCurrencyId = customerViewModel.GeneralCurrencyId;
                actionobject.ataSubChapterId = customerViewModel.ataSubChapterId;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = customerViewModel.CreatedBy;
                actionobject.UpdatedBy = customerViewModel.UpdatedBy;
                AddAddress(customerViewModel);

                actionobject.AddressId = customerViewModel.Addressid.Value;
                if (customerViewModel.IntegrationPortalId == null)
                {
                    customerViewModel.IntegrationPortalId = null;
                }
                _unitOfWork.Customer.Add(actionobject);
                _unitOfWork.SaveChanges();

                //Added By Vijay on 12/11/2019 for IsAddressForShipping and IsAddressForBilling as selected as true condition
                if (actionobject.CustomerId > 0)
                {

                    if (Convert.ToBoolean(actionobject.IsAddressForShipping))
                    {
                        long ShippingAddressId = _unitOfWork.Customer.AddCustomerShippingAddress(actionobject);



                    }

                    if (Convert.ToBoolean(actionobject.IsAddressForBilling))
                    {
                        long BillingAddressId = _unitOfWork.Customer.AddCustomerBillinggAddress(actionobject);

                    }
                }





                if (actionobject.RestrictPMA == true)
                    _unitOfWork.CommonRepository.CreateRestrictedParts(customerViewModel.RestrictedPMAParts, actionobject.CustomerId, Convert.ToInt32(ModuleEnum.Customer));
                if (actionobject.RestrictBER == true)
                    _unitOfWork.CommonRepository.CreateRestrictedParts(customerViewModel.RestrictedDERParts, actionobject.CustomerId, Convert.ToInt32(ModuleEnum.Customer));

                if (customerViewModel.CustomerTaxTypeRateMapping != null)
                {
                    actionobject.CustomerTaxTypeRateMapping = customerViewModel.CustomerTaxTypeRateMapping;
                    _unitOfWork.CommonRepository.CreateCustomerTaxTypeRateMapping(
                        actionobject.CustomerTaxTypeRateMapping, actionobject.CustomerId);

                }


                if (customerViewModel.CustomerClassificationIds != null)
                {
                    List<ClassificationMapping> listofEClassificationMappings = customerViewModel
                        .CustomerClassificationIds
                        .Select(item => new ClassificationMapping() { ClasificationId = item.Value }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateClassificationMappings(listofEClassificationMappings, Convert.ToInt32(ModuleEnum.Customer),
                        actionobject.CustomerId, actionobject.CreatedBy);
                }
                if (customerViewModel.IntegrationPortalId != null)
                {
                    List<IntegrationPortalMapping> listofIntegrationMappings = customerViewModel
                        .IntegrationPortalId
                        .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Customer),
                        actionobject.CustomerId, actionobject.CreatedBy);
                }

                if (actionobject.CustomerId > 0)
                {
                    _unitOfWork.Customer.AddCustomecontact(actionobject);


                }
                if (actionobject.CustomerId > 0)
                {
                    if (Convert.ToBoolean(actionobject.IsCustomerAlsoVendor))
                    {
                        //_unitOfWork.Customer.AddVendor(actionobject);
                        Vendor objVendor = new Vendor();

                        objVendor.RelatedCustomerId = actionobject.CustomerId;
                        objVendor.MasterCompanyId = 1;
                        objVendor.IsActive = true;
                        objVendor.IsDeleted = false;
                        objVendor.VendorTypeId = actionobject.CustomerAffiliationId;
                        objVendor.CurrencyId = actionobject.CurrencyId;
                        objVendor.CreditTermsId = actionobject.CreditTermsId;
                        objVendor.VendorName = actionobject.Name;
                        objVendor.Parent = Convert.ToInt64(actionobject.Parent);
                        objVendor.VendorEmail = actionobject.Email;
                        objVendor.VendorPhone = actionobject.CustomerPhone;
                        objVendor.VendorPhoneExt = actionobject.CustomerPhoneExt;
                        objVendor.IsAddressForBilling = actionobject.IsAddressForBilling;
                        objVendor.IsAddressForShipping = actionobject.IsAddressForShipping;
                        objVendor.VendorCode = actionobject.CustomerCode;
                        objVendor.VendorURL = actionobject.CustomerURL;
                        objVendor.VendorContractReference = actionobject.ContractReference;
                        objVendor.DoingBusinessAsName = actionobject.DoingBuinessAsName;
                        objVendor.Parent = Convert.ToInt64(actionobject.Parent);

                        objVendor.MasterCompanyId = Convert.ToInt32(actionobject.MasterCompanyId);

                        objVendor.CreatedDate = DateTime.Now;
                        objVendor.UpdatedDate = DateTime.Now;
                        objVendor.CreatedBy = actionobject.CreatedBy;
                        objVendor.UpdatedBy = actionobject.UpdatedBy;

                        AddAddress(customerViewModel);
                        objVendor.AddressId = customerViewModel.Addressid.Value;

                        _context.Vendor.Add(objVendor);
                        _context.SaveChanges();
                        if (customerViewModel.IntegrationPortalId != null)
                        {
                            List<IntegrationPortalMapping> listofIntegrationMappings = customerViewModel
                                .IntegrationPortalId
                                .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
                                ).ToList();
                            _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Vendor),
                                objVendor.VendorId, actionobject.CreatedBy);
                        }
                        if (objVendor.VendorId > 0)
                        {
                            _unitOfWork.Customer.AddVendorContact(actionobject, objVendor.VendorId);

                            if (Convert.ToBoolean(objVendor.IsAddressForShipping))
                            {
                                _unitOfWork.Customer.AddVendorShippingAddress(actionobject, objVendor.VendorId, Convert.ToInt64(objVendor.AddressId));

                            }

                            if (Convert.ToBoolean(objVendor.IsAddressForBilling))
                            {
                                _unitOfWork.Customer.AddVendorBillingAddress(actionobject, objVendor.VendorId, Convert.ToInt64(objVendor.AddressId));

                            }


                        }

                    }
                }
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }





        [HttpPut("customers/{id}")]
        public IActionResult UpdateCustomers(long id, [FromBody] CustomerViewModel customerViewModel, CustomerType ct)
        {
            bool customerCode = false;
            bool updateShippingAddress = false;
            bool updateBillingAddress = false;
            var actionobject = _unitOfWork.Customer.GetSingleOrDefault(a => a.CustomerId == id);
            var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == customerViewModel.Addressid);
            if (actionobject.CustomerCode != customerViewModel.CustomerCode)
            {
                customerCode = true;
            }

            customerViewModel.MasterCompanyId = 1;
            actionobject.RestrictBERMemo = customerViewModel.RestrictBERMemo;
            actionobject.Name = customerViewModel.Name;
            actionobject.Parent = customerViewModel.Parent;
            actionobject.Email = customerViewModel.Email;
            actionobject.CustomerPhone = customerViewModel.CustomerPhone;
            actionobject.CustomerPhoneExt = customerViewModel.CustomerPhoneExt;
            actionobject.AnnualQuota = customerViewModel.AnnualQuota;
            actionobject.AnnualRevenuePotential = customerViewModel.AnnualRevenuePotential;
            actionobject.CustomerParentName = customerViewModel.CustomerParentName;
            actionobject.ScanDocuments = customerViewModel.ScanDocuments;
            actionobject.PBHCustomerMemo = customerViewModel.PBHCustomerMemo;
            actionobject.RestrictPMA = customerViewModel.RestrictPMA;
            // actionobject.IntegrationPortalId = customerViewModel.IntegrationPortalId;
            actionobject.RestrictBER = customerViewModel.RestrictBER;
            actionobject.CustomerClassificationId = customerViewModel.CustomerClassificationIds[0];
            actionobject.CustomerTypeId = customerViewModel.CustomerTypeId;
            actionobject.CustomerType = customerViewModel.CustomerType;
            actionobject.IsCustomerAlsoVendor = customerViewModel.IsCustomerAlsoVendor;
            actionobject.IsAddressForBilling = customerViewModel.IsAddressForBilling;
            actionobject.IsAddressForShipping = customerViewModel.IsAddressForShipping;
            actionobject.IsPBHCustomer = customerViewModel.IsPBHCustomer;
            actionobject.CustomerCode = customerViewModel.CustomerCode;
            actionobject.ContractReference = customerViewModel.ContractReference;
            actionobject.DoingBuinessAsName = customerViewModel.DoingBuinessAsName;
            actionobject.CustomerURL = customerViewModel.CustomerURL;
            actionobject.CustomerClassification = customerViewModel.CustomerClassification;
            actionobject.CustomerAddress = customerViewModel.CustomerAddress;
            actionobject.RestrictBER = customerViewModel.RestrictBER;
            actionobject.RestrictPMA = customerViewModel.RestrictPMA;
            actionobject.CustomerBillingAddress = customerViewModel.CustomerBillingAddress;
            actionobject.RestrictPMAMemo = customerViewModel.RestrictPMAMemo;
            actionobject.MasterCompanyId = customerViewModel.MasterCompanyId;
            actionobject.IsActive = customerViewModel.IsActive;
            actionobject.CustomerAffiliationId = customerViewModel.CustomerAffiliationId;
            actionobject.ATAChapterId = customerViewModel.ATAChapterId;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            actionobject.ataSubChapterId = customerViewModel.ataSubChapterId;
            actionobject.CreatedBy = customerViewModel.CreatedBy;
            actionobject.UpdatedBy = customerViewModel.UpdatedBy;
            address.Line1 = customerViewModel.Address1;
            address.Line2 = customerViewModel.Address2;
            address.Line3 = customerViewModel.Address3;
            address.PostalCode = customerViewModel.PostalCode;
            address.StateOrProvince = customerViewModel.StateOrProvince;
            address.City = customerViewModel.City;
            address.Country = customerViewModel.Country;
            address.MasterCompanyId = 1;
            address.CreatedBy = customerViewModel.CreatedBy;
            address.UpdatedBy = customerViewModel.UpdatedBy;
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            actionobject.GeneralCurrencyId = customerViewModel.GeneralCurrencyId;
            if (actionobject.IsCustomerAlsoVendor== false)
            {

                actionobject.AllowNettingOfAPAR = false;
            }
            var flag = _context.Address.Any(a => (a.AddressId == customerViewModel.Addressid) && (a.Line1 == customerViewModel.Address1 && a.Line2 == customerViewModel.Address2 && a.City == customerViewModel.City && a.StateOrProvince == customerViewModel.StateOrProvince && a.Country == customerViewModel.Country && a.PostalCode == customerViewModel.PostalCode));

            var custShipping = _context.CustomerShippingAddress.Where(p => p.CustomerId == customerViewModel.CustomerId && p.AddressId == customerViewModel.Addressid && p.IsPrimary == true).AsNoTracking().FirstOrDefault();
            var custBilling = _context.CustomerBillingAddress.Where(p => p.CustomerId == customerViewModel.CustomerId && p.AddressId == customerViewModel.Addressid && p.IsPrimary == true).AsNoTracking().FirstOrDefault();

            if (flag == false || customerCode == true || custShipping == null)
            {

                updateShippingAddress = true;

            }
            if (flag == false || customerCode == true || custBilling == null)
            {

                updateBillingAddress = true;

            }

            //actionobject.IsAddressForBillingAndShipping = customerViewModel.IsAddressForBillingAndShipping;
            if (customerViewModel.AircraftTypeId != null)
            {
                var aircraftTypeList = _unitOfWork.customerAircraftType.GetAllData().ToList();
                aircraftTypeList.Where(a => a.CustomerId == id).ToList().ForEach(a => _unitOfWork.customerAircraftType.Remove(a));
                _unitOfWork.SaveChanges();
                foreach (string s in customerViewModel.AircraftTypeId)
                {
                    if (s != "")
                    {
                        var aircraftType = new CustomerAircraftType();
                        aircraftType.AircraftTypeId = Convert.ToInt32(s);
                        aircraftType.CustomerId = id;
                        aircraftType.MasterCompanyId = 1;
                        aircraftType.CreatedBy = customerViewModel.CreatedBy;
                        aircraftType.UpdatedBy = customerViewModel.UpdatedBy;
                        aircraftType.CreatedDate = DateTime.Now;
                        aircraftType.UpdatedDate = DateTime.Now;
                        aircraftType.IsActive = true;
                        _unitOfWork.customerAircraftType.Add(aircraftType);
                        _unitOfWork.SaveChanges();
                    }
                }
            }



            if (customerViewModel.IntegrationPortalId != null)
            {
                var integrationPortalList = _context.IntegrationPortalMapping.Where(a => a.ReferenceId == id && a.ModuleId == Convert.ToInt32(ModuleEnum.Customer)).ToList();

                if (integrationPortalList.Count > 0)
                {
                    foreach (var objData in integrationPortalList)
                    {
                        _context.IntegrationPortalMapping.Remove(objData);
                        _unitOfWork.SaveChanges();
                    }
                }

                List<IntegrationPortalMapping> listofIntegrationMappings = customerViewModel
                    .IntegrationPortalId
                    .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
                    ).ToList();
                _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Customer),
                    actionobject.CustomerId, actionobject.CreatedBy);
            }

            _unitOfWork.Address.Update(address);
            _unitOfWork.SaveChanges();
            _unitOfWork.Customer.Update(actionobject);
            _unitOfWork.SaveChanges();

            //Added By Vijay on 12/11/2019 for IsAddressForShipping and IsAddressForBilling as selected as true condition
            if (actionobject.CustomerId > 0)
            {
                if (Convert.ToBoolean(actionobject.IsAddressForShipping))
                {
                    long ShippingAddressId = _unitOfWork.Customer.AddCustomerShippingAddress(actionobject, updateShippingAddress);

                }

                if (Convert.ToBoolean(actionobject.IsAddressForBilling))
                {
                    long BillingAddressId = _unitOfWork.Customer.AddCustomerBillinggAddress(actionobject, updateBillingAddress);

                }
            }
            if (actionobject.CustomerId > 0)
            {
                _unitOfWork.Customer.AddCustomecontact(actionobject);


            }
            _unitOfWork.CommonRepository.UpdateRestrictedParts(customerViewModel.RestrictedPMAParts, actionobject.CustomerId, Convert.ToInt32(ModuleEnum.Customer), "PMA");
            _unitOfWork.CommonRepository.UpdateRestrictedParts(customerViewModel.RestrictedDERParts, actionobject.CustomerId, Convert.ToInt32(ModuleEnum.Customer), "DER");


            List<ClassificationMapping> listofEClassificationMappings = customerViewModel.CustomerClassificationIds
                .Select(item => new ClassificationMapping() { ClasificationId = item.Value }
                ).ToList();

            _unitOfWork.CommonRepository.UpdateClassificationMappings(listofEClassificationMappings, Convert.ToInt32(ModuleEnum.Customer), actionobject.CustomerId, actionobject.CreatedBy);

            if (Convert.ToBoolean(actionobject.IsCustomerAlsoVendor))
            {
                //_unitOfWork.Customer.AddVendor(actionobject);
               
                long vendorId = 0;
                long addressId = 0;
                var objVendor = _unitOfWork.Vendor.GetSingleOrDefault(a => a.RelatedCustomerId == id);
                if (objVendor != null)
                {
                    //objVendor.RelatedCustomerId = actionobject.CustomerId;
                    objVendor.MasterCompanyId = 1;
                    objVendor.IsActive = actionobject.IsActive;
                    objVendor.IsDeleted = actionobject.IsDeleted;
                    objVendor.VendorTypeId = actionobject.CustomerAffiliationId;
                    objVendor.CurrencyId = actionobject.CurrencyId;
                    objVendor.CreditTermsId = actionobject.CreditTermsId;
                    objVendor.VendorName = actionobject.Name;
                    objVendor.Parent = Convert.ToInt64(actionobject.Parent);
                    objVendor.VendorEmail = actionobject.Email;
                    objVendor.VendorPhone = actionobject.CustomerPhone;
                    objVendor.VendorPhoneExt = actionobject.CustomerPhoneExt;
                    objVendor.IsAddressForBilling = actionobject.IsAddressForBilling;
                    objVendor.IsAddressForShipping = actionobject.IsAddressForShipping;
                    objVendor.VendorCode = actionobject.CustomerCode;
                    objVendor.VendorURL = actionobject.CustomerURL;
                    objVendor.VendorContractReference = actionobject.ContractReference;
                    objVendor.DoingBusinessAsName = actionobject.DoingBuinessAsName;
                    objVendor.Parent = Convert.ToInt64(actionobject.Parent);

                    objVendor.MasterCompanyId = Convert.ToInt32(actionobject.MasterCompanyId);

                    objVendor.CreatedDate = DateTime.Now;
                    objVendor.UpdatedDate = DateTime.Now;
                    objVendor.CreatedBy = actionobject.CreatedBy;
                    objVendor.UpdatedBy = actionobject.UpdatedBy;

                    UpdateAddress(customerViewModel, Convert.ToInt64(objVendor.AddressId));
                    //objVendor.AddressId = customerViewModel.Addressid.Value;

                    _context.Vendor.Update(objVendor);
                    _context.SaveChanges();
                    vendorId = objVendor.VendorId;
                    addressId = Convert.ToInt64(objVendor.AddressId);
                }
                else
                {
                    Vendor objcreateVendor = new Vendor();

                    objcreateVendor.RelatedCustomerId = actionobject.CustomerId;
                    objcreateVendor.MasterCompanyId = 1;
                    objcreateVendor.IsActive = true;
                    objcreateVendor.IsDeleted = false;
                    objcreateVendor.VendorTypeId = actionobject.CustomerAffiliationId;
                    objcreateVendor.CurrencyId = actionobject.CurrencyId;
                    objcreateVendor.CreditTermsId = actionobject.CreditTermsId;
                    objcreateVendor.VendorName = actionobject.Name;
                    objcreateVendor.Parent = Convert.ToInt64(actionobject.Parent);
                    objcreateVendor.VendorEmail = actionobject.Email;
                    objcreateVendor.VendorPhone = actionobject.CustomerPhone;
                    objcreateVendor.VendorPhoneExt = actionobject.CustomerPhoneExt;
                    objcreateVendor.IsAddressForBilling = actionobject.IsAddressForBilling;
                    objcreateVendor.IsAddressForShipping = actionobject.IsAddressForShipping;
                    objcreateVendor.VendorCode = actionobject.CustomerCode;
                    objcreateVendor.VendorURL = actionobject.CustomerURL;
                    objcreateVendor.VendorContractReference = actionobject.ContractReference;
                    objcreateVendor.DoingBusinessAsName = actionobject.DoingBuinessAsName;
                    objcreateVendor.Parent = Convert.ToInt64(actionobject.Parent);

                    objcreateVendor.MasterCompanyId = Convert.ToInt32(actionobject.MasterCompanyId);

                    objcreateVendor.CreatedDate = DateTime.Now;
                    objcreateVendor.UpdatedDate = DateTime.Now;
                    objcreateVendor.CreatedBy = actionobject.CreatedBy;
                    objcreateVendor.UpdatedBy = actionobject.UpdatedBy;

                    AddAddress(customerViewModel);
                    objcreateVendor.AddressId = customerViewModel.Addressid.Value;

                    _context.Vendor.Add(objcreateVendor);
                    _context.SaveChanges();
                    vendorId = objcreateVendor.VendorId;
                    addressId = Convert.ToInt64(objcreateVendor.AddressId);

                }
                if (customerViewModel.IntegrationPortalId != null)
                {
                    var integrationPortalList = _context.IntegrationPortalMapping.Where(a => a.ReferenceId == vendorId && a.ModuleId == Convert.ToInt32(ModuleEnum.Vendor)).ToList();

                    if (integrationPortalList.Count > 0)
                    {
                        foreach (var objData in integrationPortalList)
                        {
                            _context.IntegrationPortalMapping.Remove(objData);
                            _unitOfWork.SaveChanges();
                        }
                    }

                    List<IntegrationPortalMapping> listofIntegrationMappings = customerViewModel
                        .IntegrationPortalId
                        .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Vendor),
                        vendorId, actionobject.CreatedBy);
                }

                if (vendorId > 0)
                {
                    _unitOfWork.Customer.AddVendorContact(actionobject, vendorId);

                    if (Convert.ToBoolean(customerViewModel.IsAddressForShipping))
                    {
                        _unitOfWork.Customer.AddVendorShippingAddress(actionobject, vendorId, addressId);

                    }

                    if (Convert.ToBoolean(customerViewModel.IsAddressForBilling))
                    {
                        _unitOfWork.Customer.AddVendorBillingAddress(actionobject, vendorId, addressId);
                    }


                }

            }


            return Ok(actionobject);


            //return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult AddAddress(CustomerViewModel customerViewModel)
        {
            Address address = new Address();
            address.Line1 = customerViewModel.Address1;
            address.Line2 = customerViewModel.Address2;
            address.Line3 = customerViewModel.Address3;
            address.PostalCode = customerViewModel.PostalCode;
            address.StateOrProvince = customerViewModel.StateOrProvince;
            address.City = customerViewModel.City;
            address.Country = customerViewModel.Country;
            address.MasterCompanyId = 1;
            address.IsActive = true;
            address.CreatedBy = customerViewModel.CreatedBy;
            address.UpdatedBy = customerViewModel.UpdatedBy;
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            _unitOfWork.Address.Add(address);
            //_unitOfWork.Repository<Customer>().
            _unitOfWork.SaveChanges();
            customerViewModel.Addressid = address.AddressId.Value;
            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult UpdateAddress(CustomerViewModel customerViewModel, long addressId)
        {
            var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == addressId);

            address.Line1 = customerViewModel.Address1;
            address.Line2 = customerViewModel.Address2;
            address.Line3 = customerViewModel.Address3;
            address.PostalCode = customerViewModel.PostalCode;
            address.StateOrProvince = customerViewModel.StateOrProvince;
            address.City = customerViewModel.City;
            address.Country = customerViewModel.Country;
            address.MasterCompanyId = 1;
            address.IsActive = true;
            address.CreatedBy = customerViewModel.CreatedBy;
            address.UpdatedBy = customerViewModel.UpdatedBy;
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            _unitOfWork.Address.Update(address);
            _unitOfWork.SaveChanges();
            return Ok(ModelState);
        }



        [HttpGet("contactEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getContactEmptyObj(ContactViewModel contactViewModel)
        {
            //.GetAllCustomersData();
            ContactViewModel contactViewModel1 = new ContactViewModel();
            return Ok(contactViewModel1);

        }

        [HttpGet("fianlContactEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getFianlContactEmptyObj(ContactViewModel contactViewModel)
        {
            //.GetAllCustomersData();
            return Ok(contactViewModel);

        }

        [HttpGet("paymentEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getPaymentEmptyObj(ContactViewModel contactViewModel)
        {
            //.GetAllCustomersData();
            return Ok(contactViewModel);

        }

        [HttpGet("getCustomerShipViaDetails/{Selectedrow}")]
        [Produces(typeof(List<CustomerShipping>))]
        public IActionResult getCustomerShipViaDetails(long Selectedrow)
        {

            var allShipViaDetails = _unitOfWork.CustomerShippingAddress.GetAllShipViaDetails(Selectedrow); //.GetAllCustomersData();
            return Ok(allShipViaDetails);

        }

        [HttpGet("ContactGet/{contactId}")]
        [Produces(typeof(List<Contact>))]
        public IActionResult Contactget(long contactId)
        {
            var allContacts = _unitOfWork.ContactRepository.GetCustomerContacts(contactId); //.GetAllCustomersData();
            return Ok(allContacts);

        }

        [HttpGet("ContactCompleteGet")]
        [Produces(typeof(List<Contact>))]
        public IActionResult ContactCompleteget()
        {
            var allContacts = _unitOfWork.ContactRepository.GetCompleteContacts(); //.GetAllCustomersData();
            return Ok(allContacts);

        }

        [HttpGet("CustomerWarningsget/{Selectedrow}")]
        [Produces(typeof(List<CustomerShipping>))]
        public IActionResult getCustomerWarningsWithid(long Selectedrow)
        {

            var allShipViaDetails = _unitOfWork.CustomerWarning.GetCustomerwarningWithid(Selectedrow); //.GetAllCustomersData();
            return Ok(allShipViaDetails);

        }

        [HttpGet("GetCustomerWarnings/{Selectedrow}")]
        [Produces(typeof(List<CustomerWarning>[]))]
        public IActionResult GetCustomerWarningsWithid(long Selectedrow)
        {

            var allWarningCustomerwarning = _unitOfWork.CustomerWarning.GetCustomerwarning(Selectedrow); //.GetAllCustomersData();
            return Ok(allWarningCustomerwarning);

        }


        [HttpPost("CustomerContactPost")]
        public IActionResult CreateContact([FromBody] ContactViewModel contactViewModel, CustomercontactViewModel customercontactViewModel)
        {
            if (ModelState.IsValid)
            {
                if (contactViewModel == null)
                    return BadRequest($"{nameof(contactViewModel)} cannot be null");
                Contact contactObj = new Contact();
                contactViewModel.MasterCompanyId = 1;
                contactViewModel.ContactId = null;
                contactObj.ContactId = contactViewModel.ContactId;
                contactObj.Prefix = contactViewModel.Prefix;
                contactObj.Suffix = contactViewModel.Suffix;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.AlternatePhone = contactViewModel.AlternatePhone;
                contactObj.Email = contactViewModel.Email;
                contactObj.Fax = contactViewModel.Fax;
                contactObj.Tag = contactViewModel.Tag;
                contactObj.FirstName = contactViewModel.FirstName;
                contactObj.LastName = contactViewModel.LastName;
                contactObj.MiddleName = contactViewModel.MiddleName;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.MobilePhone = contactViewModel.MobilePhone;
                contactObj.Notes = contactViewModel.Notes;
                contactObj.WorkPhone = contactViewModel.WorkPhone;
                contactObj.WebsiteURL = contactViewModel.WebsiteURL;
                contactObj.MasterCompanyId = contactViewModel.MasterCompanyId;
                contactObj.WorkPhoneExtn = contactViewModel.WorkPhoneExtn;
                contactObj.IsActive = true;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = contactViewModel.CreatedBy;
                contactObj.UpdatedBy = contactViewModel.UpdatedBy;
                contactObj.WorkPhoneExtn = contactObj.WorkPhoneExtn;
                _unitOfWork.ContactRepository.Add(contactObj);

                _unitOfWork.SaveChanges();
                contactViewModel.ContactId = contactObj.ContactId;
                return Ok(contactViewModel);
            }

            return Ok(ModelState);
        }

        [HttpPost("ContactPost")]
        public IActionResult CreateCustomerContact([FromBody] CustomercontactViewModel CustomerContactViewModel)
        {
            Contact data;
            if (ModelState.IsValid)
            {
                if (CustomerContactViewModel == null)
                    return BadRequest($"{nameof(CustomerContactViewModel)} cannot be null");
                CustomerContact contactObj = new CustomerContact();
                CustomerContactViewModel.MasterCompanyId = 1;
                contactObj.ContactId = CustomerContactViewModel.ContactId;
                contactObj.CustomerId = CustomerContactViewModel.CustomerId;
                contactObj.MasterCompanyId = CustomerContactViewModel.MasterCompanyId;
                contactObj.IsActive = CustomerContactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.IsDeleted = false;
                contactObj.CreatedBy = CustomerContactViewModel.CreatedBy;
                contactObj.UpdatedBy = CustomerContactViewModel.UpdatedBy;

                if (CustomerContactViewModel.IsDefaultContact == true)
                {
                    var customerContact = _context.CustomerContact.Where(p => p.CustomerId == CustomerContactViewModel.CustomerId && p.IsDefaultContact == true).FirstOrDefault();

                    if (customerContact != null)
                    {

                        customerContact.IsDefaultContact = false;
                        customerContact.UpdatedDate = DateTime.Now;
                        _context.CustomerContact.Update(customerContact);
                        _context.SaveChanges();



                        _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(customerContact.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(customerContact.CustomerContactId), CustomerContactViewModel.UpdatedBy);


                    }



                }
                contactObj.IsDefaultContact = CustomerContactViewModel.IsDefaultContact;

                _unitOfWork.CustomerContact.Add(contactObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(contactObj.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(contactObj.CustomerContactId), CustomerContactViewModel.UpdatedBy);


            }
            return Ok(ModelState);
        }

        [HttpPut("CustomerContactPost/{id}")]
        public IActionResult updateContact(long id, [FromBody] ContactViewModel contactViewModel, CustomercontactViewModel customercontactView)
        {
            if (ModelState.IsValid)
            {
                if (contactViewModel == null)
                    return BadRequest($"{nameof(contactViewModel)} cannot be null");
                var contactObj = _unitOfWork.ContactRepository.GetSingleOrDefault(c => c.ContactId == id);
                contactViewModel.MasterCompanyId = 1;
                contactObj.ContactId = contactViewModel.ContactId;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.AlternatePhone = contactViewModel.AlternatePhone;
                contactObj.Email = contactViewModel.Email;
                contactObj.Fax = contactViewModel.Fax;
                contactObj.Prefix = contactViewModel.Prefix;
                contactObj.Suffix = contactViewModel.Suffix;
                contactObj.FirstName = contactViewModel.FirstName;
                contactObj.LastName = contactViewModel.LastName;
                contactObj.MiddleName = contactViewModel.MiddleName;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.MobilePhone = contactViewModel.MobilePhone;
                contactObj.Tag = contactViewModel.Tag;

                contactObj.Notes = contactViewModel.Notes;
                contactObj.WorkPhone = contactViewModel.WorkPhone;
                contactObj.WebsiteURL = contactViewModel.WebsiteURL;
                contactObj.MasterCompanyId = contactViewModel.MasterCompanyId;
                contactObj.IsActive = contactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.WorkPhoneExtn = contactViewModel.WorkPhoneExtn;
                //contactObj.IsDefaultContact = contactViewModel.IsDefaultContact;
                contactObj.CreatedBy = contactViewModel.CreatedBy;
                contactObj.UpdatedBy = contactViewModel.UpdatedBy;

                _unitOfWork.ContactRepository.Update(contactObj);
                _unitOfWork.SaveChanges();
                /*Update Customer Contacts*/


                var customerContact = _context.CustomerContact.Where(p => p.ContactId == id).FirstOrDefault();

                if (contactViewModel.IsDefaultContact == true)
                {
                    var customerContacts = _context.CustomerContact.Where(p => p.CustomerId == customerContact.CustomerId && p.IsDefaultContact == true).FirstOrDefault();

                    if (customerContacts != null && customerContacts.CustomerContactId != customerContact.CustomerContactId)
                    {

                        customerContacts.IsDefaultContact = false;
                        customerContacts.UpdatedDate = DateTime.Now;
                        _context.CustomerContact.Update(customerContacts);
                        _context.SaveChanges();

                        _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(customerContacts.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(customerContacts.CustomerContactId), contactViewModel.UpdatedBy);

                    }

                }


                if (customerContact != null)
                {
                    customerContact.UpdatedDate = DateTime.Now;
                    customerContact.UpdatedBy = contactViewModel.UpdatedBy;
                    customerContact.IsDefaultContact = contactViewModel.IsDefaultContact;
                    customerContact.IsActive = contactViewModel.IsActive;
                    _unitOfWork.CustomerContact.Update(customerContact);
                    _unitOfWork.SaveChanges();
                    _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(customerContact.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(customerContact.CustomerContactId), contactViewModel.UpdatedBy);


                }

            }
            return Ok(contactViewModel);
        }




        [HttpGet("customercontactauditdetails")]
        public IActionResult GetAuditHistoryById(long customercontactId, long customerId)
        {
            try
            {
                var result = _unitOfWork.CommonRepository.GetContactAudit(customerId, Convert.ToInt32(ModuleEnum.Customer), customercontactId);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("getContactHistroty/{id}", Name = "getContactHistrotyById")]
        [Produces(typeof(List<AuditHistory>))]

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Contact", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }



        [HttpDelete("CustomerContact/{id}")]
        [Produces(typeof(CustomercontactViewModel))]
        public IActionResult DeleteAction(long id, string updatedBy)
        {

            CustomerContact model = new CustomerContact();
            model.CustomerContactId = id;
            model.UpdatedDate = DateTime.Now;
            model.IsDeleted = true;
            model.UpdatedBy = updatedBy;

            _context.CustomerContact.Attach(model);

            _context.Entry(model).Property(x => x.IsDeleted).IsModified = true;
            _context.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
            return Ok();


        }
        [HttpPost("CustomerShippingPost")]
        public IActionResult CreateShipping([FromBody] CustomerShippingViewModel Customershipping, Address address, long? CustomerAddressid, CustomerShippingAdressViewModel customerShippingAdressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (Customershipping == null)
                    return BadRequest($"{nameof(Customershipping)} cannot be null");

                long? id = 0;

                Customershipping.MasterCompanyId = 1;
                Customershipping.IsActive = true;
                customerShippingAdressViewModel.IsActive = true;
                Customershipping.CreatedBy = Customershipping.CreatedBy;
                Customershipping.UpdatedBy = Customershipping.UpdatedBy;
                Customershipping.CreatedDate = DateTime.Now;
                Customershipping.UpdatedDate = DateTime.Now;

                address.Line1 = Customershipping.Address1;
                address.Line2 = Customershipping.Address2;
                address.Line3 = Customershipping.Address3;
                address.City = Customershipping.City;
                address.StateOrProvince = Customershipping.StateOrProvince;
                address.PostalCode = Customershipping.PostalCode;
                address.Country = Customershipping.Country;
                address.MasterCompanyId = 1;
                address.CreatedBy = Customershipping.CreatedBy;
                address.UpdatedBy = Customershipping.UpdatedBy;

                address.UpdatedDate = DateTime.Now;
                address.IsActive = Customershipping.IsActive;



                if (Customershipping.AddressId > 0)
                {
                    address.CreatedDate = Customershipping.CreatedDate;
                    address.AddressId = Customershipping.AddressId;
                    _unitOfWork.Address.Update(address);
                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _unitOfWork.Address.Add(address);
                }


                _unitOfWork.SaveChanges();

                updateCusShipdetails(customerShippingAdressViewModel, address.AddressId, Customershipping, address);
                return Ok(Customershipping);
            }

            return Ok(ModelState);
        }

        [HttpGet("updatelistStatus/{id}")]
        public IActionResult DeleteCustomer(long id)
        {

            var CustomerObj = _unitOfWork.Repository<Customer>().Find(x => x.CustomerId == id).FirstOrDefault();
            if (CustomerObj != null)
            {
                CustomerObj.IsDeleted = true;
                CustomerObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Repository<Customer>().Update(CustomerObj);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }



        [HttpPost("List")]
        public IActionResult GetList([FromBody] Filters<CustomerFilters> customerFilters)
        {
            var result = _unitOfWork.Customer.GetList(customerFilters);
            return Ok(result);

        }
        [HttpGet("ListGlobalSearch")]

        public IActionResult GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {
            var result = _unitOfWork.Customer.GetListGlobalFilter(value, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("customersUpdateforActive")]
        public IActionResult CustomerStatus(long CustomerId, bool status, string updatedBy)
        {
            _unitOfWork.Customer.CustomerStatus(CustomerId, status, updatedBy);
            return Ok();

        }
        [HttpPut("shippingUpdateforActive/{id}")]
        public IActionResult shippingUpdateforActive(long id, [FromBody]CustomerShippingAdressViewModel customershipping)
        {
            if (ModelState.IsValid)
            {
                if (customershipping == null)
                    return BadRequest($"{nameof(customershipping)} cannot be null");
                var CustomerObj = _unitOfWork.CustomerShippingAddress.GetSingleOrDefault(a => a.CustomerShippingAddressId == id);
                customershipping.MasterCompanyId = 1;
                //CustomerObj.IsActive = true;
                CustomerObj.IsActive = customershipping.IsActive;
                CustomerObj.UpdatedDate = DateTime.Now;
                CustomerObj.UpdatedBy = customershipping.UpdatedBy;
                CustomerObj.CustomerShippingAddressId = customershipping.CustomerShippingAddressId;
                _unitOfWork.CustomerShippingAddress.Update(CustomerObj);
                _unitOfWork.SaveChanges();
                return Ok(CustomerObj);
            }

            return Ok(ModelState);
        }



        [HttpPut("billingUpdateforActive/{id}")]
        public IActionResult updateAsset([FromBody] CustomerBillingAddress customerBillingAddress)
        {
            customerBillingAddress.MasterCompanyId = 1;
            customerBillingAddress.UpdatedDate = DateTime.Now;
            customerBillingAddress.IsActive = customerBillingAddress.IsActive;
            _unitOfWork.Repository<CustomerBillingAddress>().Update(customerBillingAddress);
            _unitOfWork.SaveChanges();
            return Ok(customerBillingAddress);
        }

        [HttpPost("updateShipping")]
        public IActionResult updateShipping([FromBody]CustomerShippingViewModel Customershipping, Address address, long? CustomerAddressid, CustomerShippingViewModel CustomerShippingAdressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (Customershipping == null)
                    return BadRequest($"{nameof(Customershipping)} cannot be null");
                CustomerShippingAddress CustomerObj = new CustomerShippingAddress();
                Customershipping.MasterCompanyId = 1;
                // CustomerObj.IsActive = true;
                CustomerObj.IsActive = Customershipping.IsActive;
                CustomerObj.IsPrimary = Customershipping.IsPrimary;
                CustomerObj.CreatedDate = DateTime.Now;
                CustomerObj.UpdatedDate = DateTime.Now;
                CustomerObj.CreatedBy = Customershipping.CreatedBy;
                CustomerObj.UpdatedBy = Customershipping.UpdatedBy;
                CustomerObj.CustomerId = Customershipping.CustomerId;
                //updateVendorShippingAddress(vendorShippingAdressViewModel, id, vendorshipping, address);
                _unitOfWork.CustomerShippingAddress.Add(CustomerObj);
                _unitOfWork.SaveChanges();
                return Ok(CustomerObj);
            }

            return Ok(ModelState);
        }
        [HttpPost("CustomerShippingAddressDetails")]
        public IActionResult updateCustomerShippingAddress([FromBody] CustomerShippingViewModel CustomershippingViewModel, long? id, CustomerShippingViewModel Customershipping, Address address)
        {
            if (ModelState.IsValid)
            {
                if (CustomershippingViewModel == null)
                    return BadRequest($"{nameof(CustomershippingViewModel)} cannot be null");
                CustomerShippingAddress CustomerShippingAddressObj = new CustomerShippingAddress();
                CustomerShippingAddressObj.IsActive = true;
                CustomerShippingAddressObj.IsPrimary = Customershipping.IsPrimary;
                CustomerShippingAddressObj.CustomerId = Customershipping.CustomerId;
                CustomerShippingAddressObj.MasterCompanyId = 1;
                CustomerShippingAddressObj.IsActive = Customershipping.IsActive;
                CustomerShippingAddressObj.CreatedDate = DateTime.Now;
                CustomerShippingAddressObj.UpdatedDate = DateTime.Now;
                CustomerShippingAddressObj.CreatedBy = Customershipping.CreatedBy;
                CustomerShippingAddressObj.UpdatedBy = Customershipping.UpdatedBy;
                _unitOfWork.CustomerShippingAddress.Add(CustomerShippingAddressObj);
                _unitOfWork.SaveChanges();
                long? venAddressid = CustomerShippingAddressObj.CustomerShippingAddressId;
                Customershipping.CustomerShippingAddressId = CustomerShippingAddressObj.CustomerShippingAddressId;
                //updateShipping(vendorshipping, address, venAddressid, CustomerShippingViewModel);
                return Ok(CustomerShippingAddressObj);


            }

            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult updateCusShipdetails([FromBody] CustomerShippingAdressViewModel CustomershippingViewModel, long? id, CustomerShippingViewModel Customershipping, Address address)
        {
            if (ModelState.IsValid)
            {
                if (CustomershippingViewModel == null)
                    return BadRequest($"{nameof(CustomershippingViewModel)} cannot be null");
                CustomerShippingAddress CustomerShippingAddressObj = new CustomerShippingAddress();
                CustomerShippingAddressObj.IsActive = true;
                CustomerShippingAddressObj.CustomerId = Customershipping.CustomerId;
                CustomerShippingAddressObj.AddressId = id;
                CustomerShippingAddressObj.SiteName = Customershipping.SiteName;
                CustomerShippingAddressObj.ExportLicenseNumber = Customershipping.ExportLicenseNumber;
                CustomerShippingAddressObj.Description = Customershipping.Description;
                CustomerShippingAddressObj.StartDate = Customershipping.StartDate;
                CustomerShippingAddressObj.ExpirationDate = Customershipping.ExpirationDate;
                CustomerShippingAddressObj.Amount = Customershipping.Amount;
                CustomerShippingAddressObj.MasterCompanyId = 1;
                //CustomerShippingAddressObj.IsActive = Customershipping.IsActive;

                CustomerShippingAddressObj.UpdatedDate = DateTime.Now;
                CustomerShippingAddressObj.CreatedBy = Customershipping.CreatedBy;
                CustomerShippingAddressObj.UpdatedBy = Customershipping.UpdatedBy;



                if (Customershipping.IsPrimary == true)
                {
                    var shippingAddress = _context.CustomerShippingAddress.Where(p => p.CustomerId == Customershipping.CustomerId && p.IsPrimary == true).FirstOrDefault();
                    if (shippingAddress != null && shippingAddress.CustomerShippingAddressId != Customershipping.CustomerShippingAddressId)
                    {
                        shippingAddress.IsPrimary = false;
                        _context.CustomerShippingAddress.Update(shippingAddress);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(Customershipping.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(shippingAddress.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), Customershipping.UpdatedBy);
                    }
                }

                CustomerShippingAddressObj.IsPrimary = Customershipping.IsPrimary;

                if (Customershipping.CustomerShippingAddressId > 0)
                {
                    CustomerShippingAddressObj.CreatedDate = Customershipping.CreatedDate;
                    CustomerShippingAddressObj.CustomerShippingAddressId = Customershipping.CustomerShippingAddressId;
                    _unitOfWork.CustomerShippingAddress.Update(CustomerShippingAddressObj);
                }
                else
                {
                    CustomerShippingAddressObj.CreatedDate = DateTime.Now;
                    _unitOfWork.CustomerShippingAddress.Add(CustomerShippingAddressObj);
                }



                _unitOfWork.SaveChanges();
                long? venAddressid = CustomerShippingAddressObj.CustomerShippingAddressId;
                Customershipping.CustomerShippingId = CustomerShippingAddressObj.CustomerShippingAddressId;
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(Customershipping.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(CustomerShippingAddressObj.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), Customershipping.UpdatedBy);

                //updateShipping(vendorshipping, address, venAddressid, CustomerShippingViewModel);
                return Ok(CustomerShippingAddressObj);
            }
            return Ok(ModelState);
        }

        [HttpPut("updateShipAddress/{id}")]
        public IActionResult saveShipDetails(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerShippingViewModel == null)
                    return BadRequest($"{nameof(CustomerShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.CustomerShippingAddress.GetSingleOrDefault(c => c.CustomerShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == CustomerShippingViewModel.CustomerShippingAddressId);
                checkPaymentObj.IsActive = true;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsActive = CustomerShippingViewModel.IsActive;
                checkPaymentObj.SiteName = CustomerShippingViewModel.SiteName;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                addressObj.Line1 = CustomerShippingViewModel.Address1;
                addressObj.Line2 = CustomerShippingViewModel.Address2;
                addressObj.Line3 = CustomerShippingViewModel.Address3;
                addressObj.PostalCode = CustomerShippingViewModel.PostalCode;
                addressObj.StateOrProvince = CustomerShippingViewModel.StateOrProvince;
                addressObj.City = CustomerShippingViewModel.City;
                addressObj.Country = CustomerShippingViewModel.Country;
                addressObj.MasterCompanyId = 1;
                // addressObj.RecordCreateDate = DateTime.Now;
                addressObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("addShipViaDetails")]
        public IActionResult CreateShipViaDetails([FromBody]  CustomerShippingViewModel CustomerShippingDetailsViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerShippingDetailsViewModel == null)
                    return BadRequest($"{nameof(CustomerShippingDetailsViewModel)} cannot be null");
                CustomerShipping actionobject = new CustomerShipping();

                CustomerShippingDetailsViewModel.MasterCompanyId = 1;
                //actionobject.IsActive = true;
                actionobject.CustomerId = CustomerShippingDetailsViewModel.CustomerId;
                actionobject.CustomerShippingAddressId = CustomerShippingDetailsViewModel.CustomerShippingAddressId;
                actionobject.ShipVia = CustomerShippingDetailsViewModel.ShipVia;
                actionobject.ShippingAccountinfo = CustomerShippingDetailsViewModel.ShippingAccountinfo;
                actionobject.ShippingId = CustomerShippingDetailsViewModel.ShippingId;
                actionobject.ShippingURL = CustomerShippingDetailsViewModel.ShippingURL;
                actionobject.MasterCompanyId = CustomerShippingDetailsViewModel.MasterCompanyId;
                actionobject.IsActive = true;
                actionobject.Memo = CustomerShippingDetailsViewModel.Memo;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = CustomerShippingDetailsViewModel.CreatedBy;
                actionobject.UpdatedBy = CustomerShippingDetailsViewModel.UpdatedBy;
                actionobject.IsPrimary = CustomerShippingDetailsViewModel.IsPrimary;

                if (CustomerShippingDetailsViewModel.IsPrimary == true)
                {
                    var customerContact = _context.CustomerShipping.AsNoTracking().Where(p => p.CustomerShippingAddressId == CustomerShippingDetailsViewModel.CustomerShippingAddressId && p.IsPrimary == true).FirstOrDefault();

                    if (customerContact != null)
                    {

                        customerContact.IsPrimary = false;
                        customerContact.UpdatedDate = DateTime.Now;
                        customerContact.UpdatedBy = CustomerShippingDetailsViewModel.UpdatedBy;
                        _unitOfWork.CustomerShipping.Update(customerContact);
                        _unitOfWork.SaveChanges();

                    }



                }
                _unitOfWork.CustomerShipping.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateShipViaDetails/{id}")]
        public IActionResult updateShipviaAddress(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {

            if (ModelState.IsValid)
            {
                var checkPaymentObj = _unitOfWork.CustomerShipping.GetSingleOrDefault(c => c.CustomerShippingId == id);


                checkPaymentObj.IsActive = true;

                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.CustomerId = CustomerShippingViewModel.CustomerId;
                checkPaymentObj.CustomerShippingAddressId = CustomerShippingViewModel.CustomerShippingAddressId;
                checkPaymentObj.ShipVia = CustomerShippingViewModel.ShipVia;
                checkPaymentObj.ShippingAccountinfo = CustomerShippingViewModel.ShippingAccountinfo;
                checkPaymentObj.ShippingId = CustomerShippingViewModel.ShippingId;
                checkPaymentObj.ShippingURL = CustomerShippingViewModel.ShippingURL;
                checkPaymentObj.MasterCompanyId = CustomerShippingViewModel.MasterCompanyId;
                checkPaymentObj.IsActive = CustomerShippingViewModel.IsActive;
                checkPaymentObj.Memo = CustomerShippingViewModel.Memo;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;

                checkPaymentObj.IsPrimary = CustomerShippingViewModel.IsPrimary;
                if (CustomerShippingViewModel.IsPrimary == true)
                {
                    var customerContact = _context.CustomerShipping.AsNoTracking().Where(p => p.CustomerShippingAddressId == CustomerShippingViewModel.CustomerShippingAddressId && p.IsPrimary == true).FirstOrDefault();

                    if (customerContact != null && customerContact.CustomerShippingId != CustomerShippingViewModel.CustomerShippingId)
                    {

                        CustomerShipping model = new CustomerShipping();
                        model.CustomerShippingId = customerContact.CustomerShippingId;
                        model.UpdatedDate = DateTime.Now;
                        model.IsPrimary = false;
                        model.UpdatedBy = CustomerShippingViewModel.UpdatedBy;

                        _context.CustomerShipping.Attach(model);

                        _context.Entry(model).Property(x => x.IsPrimary).IsModified = true;
                        _context.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                        _context.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                       

                        //customerContact.IsPrimary = false;
                        //customerContact.UpdatedDate = DateTime.Now;
                        //customerContact.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                        //_unitOfWork.CustomerShipping.Update(customerContact);
                        
                    }

                }



                _unitOfWork.CustomerShipping.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);

            }


            return Ok(ModelState);
        }


        #region ShipVia

        [HttpPost("InsShipVia")]
        public IActionResult InsertShipViaDetails([FromBody]  CustomerShippingViewModel CustomerShippingDetailsViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerShippingDetailsViewModel == null)
                    return BadRequest($"{nameof(CustomerShippingDetailsViewModel)} cannot be null");
                CustomerShipping actionobject = new CustomerShipping();
                actionobject.CustomerId = CustomerShippingDetailsViewModel.CustomerId;
                actionobject.ShipVia = CustomerShippingDetailsViewModel.ShipVia;
                actionobject.CustomerShippingAddressId = CustomerShippingDetailsViewModel.CustomerShippingAddressId;
                actionobject.ShippingAccountinfo = CustomerShippingDetailsViewModel.ShippingAccountinfo;
                actionobject.ShippingId = CustomerShippingDetailsViewModel.ShippingId;
                actionobject.ShippingURL = CustomerShippingDetailsViewModel.ShippingURL;
                actionobject.Memo = CustomerShippingDetailsViewModel.Memo;
                actionobject.MasterCompanyId = CustomerShippingDetailsViewModel.MasterCompanyId = 1;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = CustomerShippingDetailsViewModel.CreatedBy;
                actionobject.UpdatedBy = CustomerShippingDetailsViewModel.UpdatedBy;
                actionobject.IsActive = CustomerShippingDetailsViewModel.IsActive;
                _unitOfWork.CustomerShipping.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateShipVia/{id}")]
        public IActionResult UpdateShipvia(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                var updateShipObj = _unitOfWork.CustomerShipping.GetSingleOrDefault(c => c.CustomerShippingId == id);

                updateShipObj.CustomerId = CustomerShippingViewModel.CustomerId;
                updateShipObj.CustomerShippingAddressId = CustomerShippingViewModel.CustomerShippingAddressId;
                updateShipObj.ShipVia = CustomerShippingViewModel.ShipVia;
                updateShipObj.ShippingAccountinfo = CustomerShippingViewModel.ShippingAccountinfo;
                updateShipObj.ShippingId = CustomerShippingViewModel.ShippingId;
                updateShipObj.ShippingURL = CustomerShippingViewModel.ShippingURL;
                updateShipObj.MasterCompanyId = CustomerShippingViewModel.MasterCompanyId;
                updateShipObj.IsActive = CustomerShippingViewModel.IsActive;
                updateShipObj.Memo = CustomerShippingViewModel.Memo;
                updateShipObj.CreatedDate = DateTime.Now;
                updateShipObj.UpdatedDate = DateTime.Now;
                updateShipObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                updateShipObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                _unitOfWork.CustomerShipping.Update(updateShipObj);
                _unitOfWork.SaveChanges();
                return Ok(updateShipObj);
            }
            return Ok(ModelState);
        }

        [HttpGet("GetShipVia/{id}")]
        public IActionResult GetShipvia(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {
            var result = _unitOfWork.CustomerShippingAddress.GetAllShipViaDetails(id);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }


        [HttpGet("GetShipViaAudit")]
        public IActionResult GetShipviaAudit(long customerId, long customerShippingAddressId, long customerShippingId)
        {
            var result = _unitOfWork.CustomerShippingAddress.GetCustomerShippingAudit(customerId, customerShippingAddressId, customerShippingId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        #endregion

        [HttpPut("updateStatuscusShippingAddress/{id}")]
        public IActionResult updateStatuscusShippingAddress(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerShippingViewModel == null)
                    return BadRequest($"{nameof(CustomerShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.CustomerShippingAddress.GetSingleOrDefault(c => c.CustomerShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
                // addressObj.IsActive = CustomerShippingViewModel.AddressStatus;
                checkPaymentObj.IsActive = CustomerShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                //checkPaymentObj.IsActive = true;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                addressObj.UpdatedDate = DateTime.Now;
                addressObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateStatusCustomerBilling/{id}")]
        public IActionResult updateStatusCustomerBilling(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerShippingViewModel == null)
                    return BadRequest($"{nameof(CustomerShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.CustomerBillingInformation.GetSingleOrDefault(c => c.CustomerBillingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
                // addressObj.IsActive = CustomerShippingViewModel.AddressStatus;
                checkPaymentObj.IsActive = CustomerShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsDeleted = true;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                //checkPaymentObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                addressObj.UpdatedDate = DateTime.Now;
                // addressObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerBillingInformation.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);


            }

            return Ok(ModelState);
        }


        [HttpPut("updateStatusCustomerShipping/{id}")]
        public IActionResult updateStatusCustomerShipping(long id, [FromBody] CustomerShippingViewModel CustomerShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerShippingViewModel == null)
                    return BadRequest($"{nameof(CustomerShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.CustomerShippingAddress.GetSingleOrDefault(c => c.CustomerShippingAddressId == id);
                checkPaymentObj.IsActive = CustomerShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsDelete = true;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = CustomerShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = CustomerShippingViewModel.UpdatedBy;
                _unitOfWork.CustomerShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);

            }

            return Ok(ModelState);
        }

        [HttpPost("saveCustomerWarnings")]
        public IActionResult SaveCustomerWarnings([FromBody]  CustomerWarningViewModel[] CustomerWarningViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerWarningViewModel == null)
                    return BadRequest($"{nameof(CustomerWarningViewModel)} cannot be null");

                for (int i = 0; i < CustomerWarningViewModel.Length; i++)
                {

                    CustomerWarning CustomerObject = new CustomerWarning();

                    CustomerWarningViewModel[i].MasterCompanyId = 1;
                    // CustomerWarningViewModel.IsActive = true;
                    CustomerObject.CustomerId = CustomerWarningViewModel[i].CustomerId;
                    CustomerObject.Allow = CustomerWarningViewModel[i].Allow;
                    CustomerObject.SourceModule = CustomerWarningViewModel[i].SourceModule;
                    CustomerObject.Restrict = CustomerWarningViewModel[i].Restrict;
                    CustomerObject.Warning = CustomerWarningViewModel[i].Warning;
                    CustomerObject.WarningMessage = CustomerWarningViewModel[i].WarningMessage;
                    CustomerObject.RestrictMessage = CustomerWarningViewModel[i].RestrictMessage;
                    CustomerObject.MasterCompanyId = CustomerWarningViewModel[i].MasterCompanyId;
                    CustomerObject.CreatedDate = DateTime.Now;
                    CustomerObject.UpdatedDate = DateTime.Now;
                    CustomerObject.CreatedBy = CustomerWarningViewModel[i].CreatedBy;
                    CustomerObject.UpdatedBy = CustomerWarningViewModel[i].UpdatedBy;
                    CustomerObject.IsAllow = CustomerWarningViewModel[i].IsAllow;
                    CustomerObject.IsActive = CustomerWarningViewModel[i].IsActive;
                    CustomerObject.IsDeleted = false;
                    _unitOfWork.CustomerWarning.Add(CustomerObject);
                    _unitOfWork.SaveChanges();

                }
                return Ok(CustomerWarningViewModel);
            }

            return Ok(ModelState);
        }

        [HttpPut("saveCustomerWarnings/{id}")]
        public IActionResult SaveCustomerWarningswithid(long id, [FromBody]  CustomerWarningViewModel[] CustomerWarningViewModel)
        {
            if (ModelState.IsValid)
            {
                if (CustomerWarningViewModel == null)
                    return BadRequest($"{nameof(CustomerWarningViewModel)} cannot be null");
                //var CustomerObject = _unitOfWork.CustomerWarning.GetSingleOrDefault(c => c.CustomerId == id);

                //for (int i = 0; i < CustomerWarningViewModel.Length; i++)
                //{
                //    if (CustomerWarningViewModel[i].CustomerWarningId > 0)
                //    {
                //        var CustomerObject = _unitOfWork.CustomerWarning.Get(CustomerWarningViewModel[i].CustomerWarningId);

                //        if (CustomerObject != null)
                //        {
                //            CustomerWarningViewModel[i].MasterCompanyId = 1;
                //            CustomerObject.CustomerId = CustomerWarningViewModel[i].CustomerId;
                //            CustomerObject.Allow = CustomerWarningViewModel[i].Allow;
                //            CustomerObject.SourceModule = CustomerWarningViewModel[i].SourceModule;
                //            CustomerObject.Restrict = CustomerWarningViewModel[i].Restrict;
                //            CustomerObject.Warning = CustomerWarningViewModel[i].Warning;
                //            CustomerObject.WarningMessage = CustomerWarningViewModel[i].WarningMessage;
                //            CustomerObject.RestrictMessage = CustomerWarningViewModel[i].RestrictMessage;
                //            CustomerObject.MasterCompanyId = CustomerWarningViewModel[i].MasterCompanyId;
                //            CustomerObject.IsActive = CustomerWarningViewModel[i].IsActive;
                //            CustomerObject.CreatedDate = DateTime.Now;
                //            //CustomerObject.IsActive = true;
                //            CustomerObject.UpdatedDate = DateTime.Now;
                //            CustomerObject.CreatedBy = CustomerWarningViewModel[i].CreatedBy;
                //            CustomerObject.UpdatedBy = CustomerWarningViewModel[i].UpdatedBy;
                //            CustomerObject.IsAllow = CustomerWarningViewModel[i].IsAllow;
                //            CustomerObject.IsWarning = CustomerWarningViewModel[i].IsWarning;
                //            CustomerObject.IsRestrict = CustomerWarningViewModel[i].IsRestrict;
                //            _unitOfWork.CustomerWarning.Update(CustomerObject);
                //            _unitOfWork.SaveChanges();
                //        }

                //    }
                //}


                var custWarnData = _context.CustomerWarning.Where(p => p.CustomerId == id).ToList();

                if (custWarnData.Count > 0)
                {
                    foreach (var cWarnData in custWarnData)
                    {
                        _context.CustomerWarning.Remove(cWarnData);
                    }
                    _context.SaveChanges();

                }


                for (int i = 0; i < CustomerWarningViewModel.Length; i++)
                {

                    CustomerWarning CustomerObject = new CustomerWarning();

                    CustomerWarningViewModel[i].MasterCompanyId = 1;
                    // CustomerWarningViewModel.IsActive = true;
                    CustomerObject.CustomerId = CustomerWarningViewModel[i].CustomerId;
                    CustomerObject.Allow = CustomerWarningViewModel[i].Allow;
                    CustomerObject.SourceModule = CustomerWarningViewModel[i].SourceModule;
                    CustomerObject.Restrict = CustomerWarningViewModel[i].Restrict;
                    CustomerObject.Warning = CustomerWarningViewModel[i].Warning;
                    CustomerObject.WarningMessage = CustomerWarningViewModel[i].WarningMessage;
                    CustomerObject.RestrictMessage = CustomerWarningViewModel[i].RestrictMessage;
                    CustomerObject.MasterCompanyId = CustomerWarningViewModel[i].MasterCompanyId;
                    CustomerObject.CreatedDate = DateTime.Now;
                    CustomerObject.UpdatedDate = DateTime.Now;
                    CustomerObject.CreatedBy = CustomerWarningViewModel[i].CreatedBy;
                    CustomerObject.UpdatedBy = CustomerWarningViewModel[i].UpdatedBy;
                    CustomerObject.IsAllow = CustomerWarningViewModel[i].IsAllow;
                    CustomerObject.IsActive = CustomerWarningViewModel[i].IsActive;
                    CustomerObject.IsDeleted = false;
                    _unitOfWork.CustomerWarning.Add(CustomerObject);
                    _unitOfWork.SaveChanges();

                }
                return Ok(CustomerWarningViewModel);
            }

            return Ok(ModelState);
        }

        [HttpPost("customerBillingPost")]
        public IActionResult CreateBilling([FromBody] CustomerBillingAddressViewModel customerBillingAddressViewModel, Address address, long? vendAddressid)
        {
            if (ModelState.IsValid)
            {
                if (customerBillingAddressViewModel == null)
                    return BadRequest($"{nameof(customerBillingAddressViewModel)} cannot be null");
                CustomerBillingAddress cbs = new CustomerBillingAddress();
                cbs.MasterCompanyId = 1;
                cbs.IsActive = true;
                cbs.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                cbs.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                cbs.CreatedDate = DateTime.Now;
                cbs.IsPrimary = customerBillingAddressViewModel.IsPrimary;
                customerBillingAddressViewModel.UpdatedDate = DateTime.Now;
                customerBillingAddressViewModel.IsActive = true;
                address.Line1 = customerBillingAddressViewModel.Address1;
                address.Line2 = customerBillingAddressViewModel.Address2;
                address.Line3 = customerBillingAddressViewModel.Address3;
                address.PostalCode = customerBillingAddressViewModel.PostalCode;
                address.StateOrProvince = customerBillingAddressViewModel.StateOrProvince;
                address.City = customerBillingAddressViewModel.City;
                address.Country = customerBillingAddressViewModel.Country;
                address.MasterCompanyId = 1;
                address.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                address.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = customerBillingAddressViewModel.IsActive;

                if (customerBillingAddressViewModel.AddressId > 0)
                {
                    address.AddressId = customerBillingAddressViewModel.AddressId;
                    _unitOfWork.Address.Update(address);
                }
                else
                    _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();

                long? id = address.AddressId;
                updateCustomerbillingAddress(customerBillingAddressViewModel, id, address);
                return Ok(customerBillingAddressViewModel);
            }

            return Ok(ModelState);
        }

        [HttpPut("customerBillAddressdetails/{id}")]
        public IActionResult saveBillDetails(long id, [FromBody] CustomerBillingAddressViewModel customerBillingAddressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerBillingAddressViewModel == null)
                    return BadRequest($"{nameof(customerBillingAddressViewModel)} cannot be null");
                var checkBillingObj = _unitOfWork.CustomerBillingInformation.GetSingleOrDefault(c => c.CustomerBillingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == customerBillingAddressViewModel.AddressId);

                checkBillingObj.MasterCompanyId = 1;
                checkBillingObj.IsActive = customerBillingAddressViewModel.IsActive;
                checkBillingObj.SiteName = customerBillingAddressViewModel.SiteName;
                checkBillingObj.CreatedDate = DateTime.Now;
                checkBillingObj.UpdatedDate = DateTime.Now;
                checkBillingObj.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                checkBillingObj.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                checkBillingObj.MasterCompanyId = customerBillingAddressViewModel.MasterCompanyId;
                addressObj.Line1 = customerBillingAddressViewModel.Address1;
                addressObj.Line2 = customerBillingAddressViewModel.Address2;
                addressObj.Line3 = customerBillingAddressViewModel.Address3;
                addressObj.PostalCode = customerBillingAddressViewModel.PostalCode;
                addressObj.StateOrProvince = customerBillingAddressViewModel.StateOrProvince;
                addressObj.City = customerBillingAddressViewModel.City;
                addressObj.Country = customerBillingAddressViewModel.Country;
                addressObj.MasterCompanyId = 1;
                // addressObj.RecordCreateDate = DateTime.Now;
                addressObj.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                addressObj.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;

                if (customerBillingAddressViewModel.IsPrimary == true)
                {
                    CustomerBillingAddress shippingAddress = new CustomerBillingAddress();
                    shippingAddress = _context.CustomerBillingAddress.Where(p => p.CustomerId == customerBillingAddressViewModel.CustomerId && p.IsPrimary == true).FirstOrDefault();

                    if (shippingAddress != null && shippingAddress.CustomerBillingAddressId != checkBillingObj.CustomerBillingAddressId)
                    {
                        shippingAddress.IsPrimary = false;
                        _context.CustomerBillingAddress.Update(shippingAddress);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerBillingAddressViewModel.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(shippingAddress.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), customerBillingAddressViewModel.UpdatedBy);
                    }
                }

                checkBillingObj.IsPrimary = customerBillingAddressViewModel.IsPrimary;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerBillingInformation.Update(checkBillingObj);
                _unitOfWork.SaveChanges();

                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerBillingAddressViewModel.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(checkBillingObj.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), customerBillingAddressViewModel.UpdatedBy);

                return Ok(checkBillingObj);
            }
            return Ok(ModelState);
        }

        [HttpPut("cusShippingUpdate/{id}")]
        public IActionResult cusShippingUpdate(long id, [FromBody] CustomerShippingAdressViewModel customerBillingAddressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerBillingAddressViewModel == null)
                    return BadRequest($"{nameof(customerBillingAddressViewModel)} cannot be null");
                var checkBillingObj = _unitOfWork.CustomerShippingAddress.GetSingleOrDefault(c => c.CustomerShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == customerBillingAddressViewModel.AddressId);
                checkBillingObj.IsActive = true;
                checkBillingObj.MasterCompanyId = 1;
                checkBillingObj.IsActive = customerBillingAddressViewModel.IsActive;
                checkBillingObj.SiteName = customerBillingAddressViewModel.SiteName;
                checkBillingObj.CreatedDate = DateTime.Now;
                checkBillingObj.UpdatedDate = DateTime.Now;
                checkBillingObj.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                checkBillingObj.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                checkBillingObj.ExportLicenseNumber = customerBillingAddressViewModel.ExportLicenseNumber;
                checkBillingObj.Description = customerBillingAddressViewModel.Description;
                checkBillingObj.StartDate = customerBillingAddressViewModel.StartDate;
                checkBillingObj.ExpirationDate = customerBillingAddressViewModel.ExpirationDate;
                checkBillingObj.Amount = customerBillingAddressViewModel.Amount;
                checkBillingObj.MasterCompanyId = 1;
                addressObj.Line1 = customerBillingAddressViewModel.Address1;
                addressObj.Line2 = customerBillingAddressViewModel.Address2;
                addressObj.Line3 = customerBillingAddressViewModel.Address3;
                addressObj.PostalCode = customerBillingAddressViewModel.PostalCode;
                addressObj.StateOrProvince = customerBillingAddressViewModel.StateOrProvince;
                addressObj.City = customerBillingAddressViewModel.City;
                addressObj.Country = customerBillingAddressViewModel.Country;
                addressObj.MasterCompanyId = 1;



                if (customerBillingAddressViewModel.IsPrimary == true)
                {
                    //var shippingAddress = _context.CustomerShippingAddress.Where(p => p.CustomerId == customerBillingAddressViewModel.CustomerId).ToList();
                    //if (shippingAddress != null && shippingAddress.Count > 0)
                    //{
                    //    foreach (var item in shippingAddress)
                    //    {
                    //        item.IsPrimary = false;
                    //        _context.CustomerShippingAddress.Update(item);
                    //        _context.SaveChanges();
                    //    }
                    //}

                    CustomerShippingAddress shippingAddress = new CustomerShippingAddress();
                    shippingAddress = _context.CustomerShippingAddress.Where(p => p.CustomerId == customerBillingAddressViewModel.CustomerId && p.IsPrimary == true).FirstOrDefault();

                    if (shippingAddress != null && shippingAddress.CustomerShippingAddressId != customerBillingAddressViewModel.CustomerShippingAddressId)
                    {
                        shippingAddress.IsPrimary = false;
                        _context.CustomerShippingAddress.Update(shippingAddress);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerBillingAddressViewModel.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(shippingAddress.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), customerBillingAddressViewModel.UpdatedBy);
                    }
                }
                // addressObj.RecordCreateDate = DateTime.Now;

                //created by is not needed as the record is already created and the viewmodel returns null
                //addressObj.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                checkBillingObj.IsPrimary = customerBillingAddressViewModel.IsPrimary;

                addressObj.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerShippingAddress.Update(checkBillingObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerBillingAddressViewModel.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(checkBillingObj.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), customerBillingAddressViewModel.UpdatedBy);

                return Ok(checkBillingObj);


            }

            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        //[HttpPost("vendorShippingAddressDetails")]
        public IActionResult updateCustomerbillingAddress([FromBody] CustomerBillingAddressViewModel customerBillingAddressViewModel, long? id, Address address)
        {
            if (ModelState.IsValid)
            {
                CustomerBillingAddress cbs = new CustomerBillingAddress();
                if (customerBillingAddressViewModel == null)
                    return BadRequest($"{nameof(customerBillingAddressViewModel)} cannot be null");
                CustomerBillingAddress CustomerShippingAddressObj = new CustomerBillingAddress();
                CustomerShippingAddressObj.IsActive = true;
                CustomerShippingAddressObj.CustomerId = customerBillingAddressViewModel.CustomerId;
                CustomerShippingAddressObj.SiteName = customerBillingAddressViewModel.SiteName;
                CustomerShippingAddressObj.MasterCompanyId = 1;
                CustomerShippingAddressObj.IsPrimary = customerBillingAddressViewModel.IsPrimary;
                CustomerShippingAddressObj.AddressId = id;
                CustomerShippingAddressObj.CreatedDate = DateTime.Now;
                CustomerShippingAddressObj.UpdatedDate = DateTime.Now;
                CustomerShippingAddressObj.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                CustomerShippingAddressObj.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;

                if (customerBillingAddressViewModel.IsPrimary == true)
                {
                    CustomerBillingAddress shippingAddress = new CustomerBillingAddress();
                    shippingAddress = _context.CustomerBillingAddress.Where(p => p.CustomerId == customerBillingAddressViewModel.CustomerId && p.IsPrimary == true).FirstOrDefault();

                    if (shippingAddress != null)
                    {
                        shippingAddress.IsPrimary = false;
                        _context.CustomerBillingAddress.Update(shippingAddress);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerBillingAddressViewModel.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(shippingAddress.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), customerBillingAddressViewModel.UpdatedBy);
                    }
                    // var billingAddress = _context.CustomerBillingAddress.Where(p => p.CustomerId == customerBillingAddressViewModel.CustomerId).ToList();
                }

                if (customerBillingAddressViewModel.CustomerBillingAddressId > 0)
                {
                    CustomerShippingAddressObj.CustomerBillingAddressId = customerBillingAddressViewModel.CustomerBillingAddressId;
                    _unitOfWork.CustomerBillingInformation.Update(CustomerShippingAddressObj);
                }
                else
                {
                    _unitOfWork.CustomerBillingInformation.Add(CustomerShippingAddressObj);
                }

                _unitOfWork.SaveChanges();
                long? venAddressid = CustomerShippingAddressObj.CustomerBillingAddressId;
                cbs.CustomerBillingAddressId = CustomerShippingAddressObj.CustomerBillingAddressId;
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerBillingAddressViewModel.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(CustomerShippingAddressObj.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), customerBillingAddressViewModel.UpdatedBy);

                //updateShipping(vendorshipping, address, venAddressid, customerBillingAddressViewModel);
                return Ok(CustomerShippingAddressObj);
            }
            return Ok(ModelState);
        }

        [HttpPut("customerFinancePost/{id}")]
        public IActionResult Updatefinance(long id, [FromBody] CustomerViewModel customerViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerViewModel == null)
                    return BadRequest($"{nameof(customerViewModel)} cannot be null");
                var customerObj = _unitOfWork.Customer.GetSingleOrDefault(c => c.CustomerId == id);
                customerViewModel.MasterCompanyId = 1;
                customerObj.EDI = customerViewModel.EDI;
                customerObj.MarkUpPercent = customerViewModel.MarkUpPercent;
                customerObj.CreditLimit = customerViewModel.CreditLimit;
                customerObj.CreditTermsId = customerViewModel.CreditTermsId;
                customerObj.TaxRateOther = customerViewModel.TaxRateOther;
                customerObj.TaxTypeId = customerViewModel.TaxTypeId;
                customerObj.TaxRateStateOrProvince = customerViewModel.TaxRateStateOrProvince;
                customerObj.AllowPartialBilling = customerViewModel.AllowPartialBilling;
                customerObj.AllowProformaBilling = customerViewModel.AllowProformaBilling;
                customerObj.CurrencyId = customerViewModel.GeneralCurrencyId;
                customerObj.Discount = customerViewModel.Discount;
                customerObj.DiscountId = customerViewModel.DiscountId;
                customerObj.EDIDescription = customerViewModel.EDIDescription;
                customerObj.IsAeroExchange = customerViewModel.IsAeroExchange;
                customerObj.IsTaxExempt = customerViewModel.IsTaxExempt;
                customerObj.AeroExchangeDescription = customerViewModel.AeroExchangeDescription;
                if (customerViewModel.IsCustomerAlsoVendor && customerViewModel.CustomerTypeId == Convert.ToInt32(CustomerTypeEnum.Customer))
                {
                    customerObj.AllowNettingOfAPAR = customerViewModel.AllowNettingOfAPAR;
                }
                else
                {
                    customerObj.AllowNettingOfAPAR = false;
                }
                customerObj.MarkUpPercentageId = customerViewModel.MarkUpPercentageId;
                customerObj.MasterCompanyId = 1;
                customerObj.IsActive = true;
                customerObj.CreatedDate = DateTime.Now;
                customerObj.UpdatedDate = DateTime.Now;
                customerObj.CreatedBy = customerViewModel.CreatedBy;
                customerObj.UpdatedBy = customerViewModel.UpdatedBy;

                _unitOfWork.Customer.Update(customerObj);
                _unitOfWork.SaveChanges();

                customerObj.CustomerTaxTypeRateMapping = new List<CustomerTaxTypeRateMapping>();
                List<object> result = ToList(_unitOfWork.Customer.GetTaxTypeRateMapped(customerObj.CustomerId));

               

                var newMappingRecord = result.Except(customerViewModel.CustomerTaxTypeRateMapping);



                foreach (var customerContactTaxMapping in customerViewModel.CustomerTaxTypeRateMapping)
                {
                    if (customerContactTaxMapping.CustomerTaxTypeRateMappingId > 0)
                    {
                        var extData = _context.CustomerTaxTypeRateMapping.Where(p => p.CustomerTaxTypeRateMappingId == customerContactTaxMapping.CustomerTaxTypeRateMappingId).FirstOrDefault();
                        extData.UpdatedBy = customerContactTaxMapping.UpdatedBy ?? "admin";
                        extData.UpdatedDate = System.DateTime.Now;
                        extData.TaxRate = customerContactTaxMapping.TaxRate;
                        extData.TaxRateId = customerContactTaxMapping.TaxRateId;
                        extData.TaxType = customerContactTaxMapping.TaxType;
                        extData.TaxTypeId = customerContactTaxMapping.TaxTypeId;
                        _unitOfWork.Repository<CustomerTaxTypeRateMapping>().Update(extData);
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        var custContChaptr = _unitOfWork.Repository<CustomerTaxTypeRateMapping>().GetSingleOrDefault(c => c.CustomerId == Convert.ToInt64(customerContactTaxMapping.CustomerId) && (c.TaxRateId == Convert.ToInt64(customerContactTaxMapping.TaxRateId)) && (c.TaxTypeId == Convert.ToInt64(customerContactTaxMapping.TaxTypeId)));
                        if (custContChaptr == null)
                        {
                            //var newMappingRecord = result.Except(customerViewModel.CustomerTaxTypeRateMapping);
                            customerContactTaxMapping.MasterCompanyId = 1;
                            customerContactTaxMapping.CreatedBy = customerContactTaxMapping.CreatedBy ?? "admin";
                            customerContactTaxMapping.UpdatedBy = customerContactTaxMapping.UpdatedBy ?? "admin";
                            customerContactTaxMapping.CreatedDate = System.DateTime.Now;
                            customerContactTaxMapping.UpdatedDate = System.DateTime.Now;
                            customerContactTaxMapping.IsDeleted = false;
                            customerObj.CustomerTaxTypeRateMapping.Add(customerContactTaxMapping);
                            _unitOfWork.SaveChanges();
                        }
                        else
                        {
                            return BadRequest("Record already exist with these details");
                        }
                    }

                }
               
                return Ok(customerObj);
            }
            return Ok(ModelState);
        }

        public static List<TSource> ToList<TSource>(IEnumerable<TSource> source)
        {
            if (source == null)
            {
                //throw Error.ArgumentNull("source");
            }
            return new List<TSource>(source);
        }


        [HttpPost("Saleslist")]
        public IActionResult SalepersonAction([FromBody] CustomerViewModel customerViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerViewModel == null)
                    return BadRequest($"{nameof(customerViewModel)} cannot be null");
                DAL.Models.Customer actionobject = new DAL.Models.Customer();
                customerViewModel.MasterCompanyId = 1;
                // actionobject.IsActive = true;
                actionobject.PrimarySalesPersonFirstName = customerViewModel.PrimarySalesPersonFirstName;
                actionobject.PrimarySalesPersonId = customerViewModel.PrimarySalesPersonId;
                actionobject.SecondarySalesPersonId = customerViewModel.SecondarySalesPersonId;
                actionobject.SecondarySalesPersonName = customerViewModel.SecondarySalesPersonName;
                actionobject.CSRName = customerViewModel.CSRName;
                actionobject.AgentName = customerViewModel.AgentName;
                actionobject.MasterCompanyId = customerViewModel.MasterCompanyId;
                actionobject.IsActive = customerViewModel.IsActive;
                actionobject.CsrId = customerViewModel.CsrId;
                actionobject.SaId = customerViewModel.SaId;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = customerViewModel.CreatedBy;
                actionobject.UpdatedBy = customerViewModel.UpdatedBy;
                AddAddress(customerViewModel);
                actionobject.AddressId = customerViewModel.Addressid.Value;
                _unitOfWork.Customer.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }
            return Ok(ModelState);
        }

        [HttpPost("Aircraftpost")]
        public IActionResult CreateAircraftModels([FromBody] CustomerAircraftModel customerAircraftModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.CustomerAircraftModel.Any(o => o.AircraftModelId == customerAircraftModel.AircraftModelId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresule = _context.CustomerAircraftModel.Where(c => c.AircraftModelId == customerAircraftModel.AircraftModelId).FirstOrDefault();
                    existingresule.AircraftModelId = customerAircraftModel.AircraftModelId;
                    existingresule.IsActive = true;
                    existingresule.CustomerId = customerAircraftModel.CustomerId;
                    existingresule.Priority = customerAircraftModel.Priority;
                    existingresule.MasterCompanyId = 1;
                    existingresule.CreatedDate = DateTime.Now;
                    existingresule.UpdatedDate = DateTime.Now;
                    existingresule.CreatedBy = customerAircraftModel.CreatedBy;
                    existingresule.UpdatedBy = customerAircraftModel.UpdatedBy;
                    _context.CustomerAircraftModel.Update(existingresule);
                    _context.SaveChanges();
                }
                else
                {
                    CustomerAircraftModel cp = new CustomerAircraftModel();
                    cp.AircraftModelId = customerAircraftModel.AircraftModelId;
                    //cp.AircraftModelId = customerAircraftModel.AircraftModelId;
                    cp.CustomerId = customerAircraftModel.CustomerId;
                    cp.Priority = customerAircraftModel.Priority;
                    cp.MasterCompanyId = 1;
                    cp.IsActive = true;
                    cp.CreatedDate = DateTime.Now;
                    cp.UpdatedDate = DateTime.Now;
                    cp.CreatedBy = customerAircraftModel.CreatedBy;
                    cp.UpdatedBy = customerAircraftModel.UpdatedBy;
                    _context.CustomerAircraftModel.Add(cp);
                    _context.SaveChanges();


                }
            }
            return Ok(customerAircraftModel);

        }


        #region AircraftInformation

        //GET data from CustomerAircraftMapping with customerId
        [HttpGet("getCustomerAircraftMapped/{customerId}")]
        [Produces(typeof(List<CustomerAircraftMapping>))]
        public IActionResult AircraftMapped(long customerId)
        {
            var result = _unitOfWork.Customer.GetAircraftMapped(customerId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("CustomerAircraftPost")]
        [Produces(typeof(CustomerAircraftMapping[]))]
        public IActionResult InsertCustomerAircraftInfo([FromBody] CustomerAircraftMappingViewModel[] customerAircraftMappingVM)
        {
            if (ModelState.IsValid)
            {


                for (int i = 0; i < customerAircraftMappingVM.Length; i++)
                {

                    var aircraft = _unitOfWork.Repository<CustomerAircraftMapping>().GetSingleOrDefault(c => c.AircraftTypeId == Convert.ToInt32(customerAircraftMappingVM[i].AircraftTypeId) && (c.AircraftModelId == customerAircraftMappingVM[i].AircraftModelId) && (c.DashNumberId == customerAircraftMappingVM[i].DashNumberId) && (c.MasterCompanyId == customerAircraftMappingVM[i].MasterCompanyId) && (c.CustomerId == customerAircraftMappingVM[i].CustomerId));// && c.AircraftModelId == customerAircraftMappingVM[i].AircraftModelId && c.MasterCompanyId == customerAircraftMappingVM[i].MasterCompanyId && c.CustomerId = customerAircraftMappingVM[i].CustomerId);
                    if (aircraft == null)
                    {
                        CustomerAircraftMapping customerAircraftMapping = new CustomerAircraftMapping
                        {

                            AircraftType = customerAircraftMappingVM[i].AircraftType,
                            AircraftModel = customerAircraftMappingVM[i].AircraftModel,
                            DashNumber = customerAircraftMappingVM[i].DashNumber,
                            //ModelNumber = customerAircraftMappingVM[i].ModelNumber,
                            AircraftModelId = customerAircraftMappingVM[i].AircraftModelId,
                            DashNumberId = customerAircraftMappingVM[i].DashNumberId,
                            Memo = customerAircraftMappingVM[i].Memo,
                            MasterCompanyId = customerAircraftMappingVM[i].MasterCompanyId,
                            CreatedBy = customerAircraftMappingVM[i].CreatedBy,
                            UpdatedBy = customerAircraftMappingVM[i].UpdatedBy,
                            CustomerId = customerAircraftMappingVM[i].CustomerId,
                            CreatedDate = System.DateTime.Now,
                            UpdatedDate = System.DateTime.Now,
                            IsDeleted = customerAircraftMappingVM[i].IsDeleted,
                            Inventory = customerAircraftMappingVM[i].Inventory,
                            AircraftTypeId = customerAircraftMappingVM[i].AircraftTypeId
                        };
                        _unitOfWork.Repository<CustomerAircraftMapping>().Add(customerAircraftMapping);
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        return BadRequest("Record already exist with these details");
                    }

                }
            }
            else
            {
                return BadRequest($"{nameof(customerAircraftMappingVM)} cannot be null");
            }
            return Ok(ModelState);
        }

        [HttpPut("CustomerAircraftUpdate/{id}")]
        [Produces(typeof(CustomerAircraftMapping[]))]
        public IActionResult UpdateCustomerAircraftInfo(long id, [FromBody] CustomerAircraftMappingViewModel customerAircraftMappingVM)
        {
            if (ModelState.IsValid)
            {
                var aircraft = _unitOfWork.Repository<CustomerAircraftMapping>().GetSingleOrDefault(c => c.CustomerAircraftMappingId == id);// && c.AircraftModelId == customerAircraftMappingVM[i].AircraftModelId && c.MasterCompanyId == customerAircraftMappingVM[i].MasterCompanyId && c.CustomerId = customerAircraftMappingVM[i].CustomerId);
                aircraft.AircraftType = customerAircraftMappingVM.AircraftType;
                aircraft.AircraftModel = customerAircraftMappingVM.AircraftModel;
                aircraft.DashNumber = customerAircraftMappingVM.DashNumber;
                //ModelNumber = customerAircraftMappingVM[i].ModelNumber,
                aircraft.AircraftModelId = customerAircraftMappingVM.AircraftModelId;
                aircraft.DashNumberId = customerAircraftMappingVM.DashNumberId;
                aircraft.Memo = customerAircraftMappingVM.Memo;
                aircraft.MasterCompanyId = customerAircraftMappingVM.MasterCompanyId;
                aircraft.CreatedBy = customerAircraftMappingVM.CreatedBy;
                aircraft.UpdatedBy = customerAircraftMappingVM.UpdatedBy;
                aircraft.CustomerId = customerAircraftMappingVM.CustomerId;
                aircraft.CreatedDate = System.DateTime.Now;
                aircraft.UpdatedDate = System.DateTime.Now;
                aircraft.IsDeleted = customerAircraftMappingVM.IsDeleted;
                aircraft.Inventory = customerAircraftMappingVM.Inventory;
                aircraft.AircraftTypeId = customerAircraftMappingVM.AircraftTypeId;

                _unitOfWork.Repository<CustomerAircraftMapping>().Update(aircraft);
                _unitOfWork.SaveChanges();
            }


            else
            {
                return BadRequest($"{nameof(customerAircraftMappingVM)} cannot be null");
            }
            return Ok(ModelState);
        }

        [HttpDelete("DeleteCustomerAircraftMappint/{id}")]
        public IActionResult DeleteCustomerAircraft(long id)
        {
            var existingResult = _unitOfWork.Repository<CustomerAircraftMapping>().GetSingleOrDefault(c => c.CustomerAircraftMappingId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<CustomerAircraftMapping>().Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }
        [HttpGet("getCustomerAircraftMappedAudit/{customerAircraftMappingId}")]
        [Produces(typeof(List<CustomerAircraftMappingAudit>))]
        public IActionResult AircraftMappedAudit(long customerAircraftMappingId)
        {
            var result = _unitOfWork.Customer.GetAircraftMappedAudit(customerAircraftMappingId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        #endregion

        #region ATA Chapter
        [HttpGet("getCustomerATAMapped/{customerId}")]
        [Produces(typeof(List<CustomerATAMapping>[]))]
        public IActionResult ataMapped(long customerId)
        {
            var result = _unitOfWork.Customer.GetATAMapped(customerId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }

        }

        [HttpGet("getCustomerATAMappedAudit/{CustomerContactATAMappingId}")]
        [Produces(typeof(List<CustomerATAMapping>[]))]
        public IActionResult ataMappedAudit(long CustomerContactATAMappingId)
        {
            var result = _unitOfWork.Customer.GetATAMappedAudit(CustomerContactATAMappingId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }

        }

        [HttpPost("CustomerATAPost")]
        public IActionResult InsertCustomerATA([FromBody] CustomerATAMapping[] customerATAMapping)
        {
            if (ModelState.IsValid)
            {
                foreach (var customerAtaMapping in customerATAMapping)
                {
                    _unitOfWork.Repository<CustomerATAMapping>().Add(customerAtaMapping);
                    _unitOfWork.SaveChanges();
                }
            }
            else
            {
                return BadRequest($"{nameof(customerATAMapping)} cannot be null");
            }

            return Ok(ModelState);

        }

        //[HttpDelete("DeleteCustomerATAMapping/{id}")]
        //public IActionResult DeleteCustomerATA(long id)
        //{
        //    var existingResult = _unitOfWork.Repository<CustomerATAMapping>().GetSingleOrDefault(c => c.CustomerATAMappingId == id);
        //    existingResult.IsDeleted = true;
        //    _unitOfWork.Repository<CustomerATAMapping>().Update(existingResult);
        //    _unitOfWork.SaveChanges();
        //    return Ok(id);
        //}

        #endregion

        #region Customer Contact ATA Mapping
        [HttpGet("getCustomerContactATAMapped/{contactId}")]
        [Produces(typeof(List<CustomerContactATAMapping>))]
        public IActionResult ataContactMapped(long contactId)
        {
            var result = _unitOfWork.Customer.GetATAContactMapped(contactId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }

        }



        [HttpPost("CustomerContactATAPost")]
        public IActionResult InsertCustomerContactATA([FromBody] CustomerContactATAMapping[] customerContactATAMapping)
        {
            if (ModelState.IsValid)
            {
                for (int i = 0; i < customerContactATAMapping.Length; i++)
                {

                    var atachapter = _unitOfWork.Repository<CustomerContactATAMapping>().GetSingleOrDefault(c => c.CustomerContactId == customerContactATAMapping[i].CustomerContactId && (c.ATAChapterId == customerContactATAMapping[i].ATAChapterId) && (c.ATASubChapterId == customerContactATAMapping[i].ATASubChapterId) && (c.MasterCompanyId == customerContactATAMapping[i].MasterCompanyId));// && c.AircraftModelId == customerAircraftMappingVM[i].AircraftModelId && c.MasterCompanyId == customerAircraftMappingVM[i].MasterCompanyId && c.CustomerId = customerAircraftMappingVM[i].CustomerId);
                    if (atachapter == null)
                    {

                        //foreach (var customerContactAtaMapping in customerContactATAMapping)
                        //{


                            _unitOfWork.Repository<CustomerContactATAMapping>().Add(customerContactATAMapping[i]);
                            _unitOfWork.SaveChanges();
                       // }
                    }
                    else
                    {

                        return BadRequest("Record already exist with these details");
                    }
                }
            }
            else
            {
                return BadRequest($"{nameof(customerContactATAMapping)} cannot be null");
            }

            return Ok(ModelState);

        }

        [HttpPut("CustomerContactATAUpdate/{id}")]
        public IActionResult InsertCustomerContactATA(long id, [FromBody] CustomerContactATAMapping customerContactAtaMapping)
        {
            if (ModelState.IsValid)
            {

                var custATAData = _context.CustomerContactATAMapping.Where(c => c.CustomerContactATAMappingId == id).FirstOrDefault();
                if (custATAData != null)
                {
                    custATAData.CustomerContactId = customerContactAtaMapping.CustomerContactId;
                    custATAData.CustomerId = customerContactAtaMapping.CustomerId;
                    custATAData.ATAChapterId = customerContactAtaMapping.ATAChapterId;
                    custATAData.ATASubChapterId = customerContactAtaMapping.ATASubChapterId;
                    custATAData.ATAChapterCode = customerContactAtaMapping.ATAChapterCode;
                    custATAData.ATAChapterName = customerContactAtaMapping.ATAChapterName;
                    custATAData.ATASubChapterDescription = customerContactAtaMapping.ATASubChapterDescription;
                    custATAData.UpdatedBy = customerContactAtaMapping.UpdatedBy;
                    custATAData.UpdatedDate = DateTime.Now;
                    custATAData.IsActive = customerContactAtaMapping.IsActive;
                    _unitOfWork.Repository<CustomerContactATAMapping>().Update(custATAData);
                    _unitOfWork.SaveChanges();

                }
                else
                {

                    return BadRequest("Record already exist with these details");
                }
            }


            return Ok(ModelState);

        }

        [HttpDelete("DeleteCustomerContactATAMapping/{id}")]
        public IActionResult DeleteCustomerContactATA(long id)
        {
            var existingResult = _unitOfWork.Repository<CustomerContactATAMapping>().GetSingleOrDefault(c => c.CustomerContactATAMappingId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<CustomerContactATAMapping>().Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }


        #endregion

        #region TaxTypeRateMapped

        [HttpGet("getCustomerTaxTypeRateMapped/{customerId}")]
        [Produces(typeof(List<CustomerTaxTypeRateMapping>))]
        public IActionResult TaxTypeRateMapped(long customerId)
        {
            var result = _unitOfWork.Customer.GetTaxTypeRateMapped(customerId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("CustomerTaxTypeRatePost")]
        [Produces(typeof(CustomerTaxTypeRateMapping[]))]
        public IActionResult InsertCustomerTaxTypeRateInfo([FromBody] CustomerTaxTypeRateMapping[] customerTaxTypeRateMapping)
        {
            if (ModelState.IsValid)
            {
                foreach (var customerContactTaxMapping in customerTaxTypeRateMapping)
                {

                    customerContactTaxMapping.MasterCompanyId = 1;
                    customerContactTaxMapping.CreatedBy = customerContactTaxMapping.CreatedBy ?? "admin";
                    customerContactTaxMapping.UpdatedBy = customerContactTaxMapping.UpdatedBy ?? "admin";
                    customerContactTaxMapping.CreatedDate = System.DateTime.Now;
                    customerContactTaxMapping.UpdatedDate = System.DateTime.Now;
                    customerContactTaxMapping.IsDeleted = customerContactTaxMapping.IsDeleted;

                    _unitOfWork.Repository<CustomerTaxTypeRateMapping>().Add(customerContactTaxMapping);
                    _unitOfWork.SaveChanges();
                }
            }
            else
            {
                return BadRequest($"{nameof(customerTaxTypeRateMapping)} cannot be null");
            }

            return Ok(ModelState);
        }


        [HttpPut("CustomerTaxTypeRateUpdate/{id}")]
        [Produces(typeof(CustomerTaxTypeRateMapping))]
        public IActionResult InsertCustomerTaxTypeRateInfoUpdate(long id, [FromBody] CustomerTaxTypeRateMapping customerContactTaxMapping)
        {
            if (ModelState.IsValid)
            {

                if (id > 0)
                {
                    var extData = _context.CustomerTaxTypeRateMapping.Where(p => p.CustomerTaxTypeRateMappingId == id).FirstOrDefault();
                    extData.UpdatedBy = customerContactTaxMapping.UpdatedBy ?? "admin";
                    extData.UpdatedDate = System.DateTime.Now;
                    //extData.TaxRate = customerContactTaxMapping.TaxRate;
                    extData.TaxRateId = customerContactTaxMapping.TaxRateId;
                    //extData.TaxType = customerContactTaxMapping.TaxType;
                    extData.TaxTypeId = customerContactTaxMapping.TaxTypeId;
                    _unitOfWork.Repository<CustomerTaxTypeRateMapping>().Update(extData);
                    _unitOfWork.SaveChanges();
                }
                else
                {
                    return BadRequest($"{nameof(customerContactTaxMapping)} update failed!");
                }

            }
            else
            {
                return BadRequest($"{nameof(customerContactTaxMapping)} cannot be null");
            }

            return Ok(ModelState);
        }

        [HttpGet("CustomerTaxTypeRateAudit/{id}")]
        [Produces(typeof(CustomerTaxTypeRateMapping))]
        public IActionResult CustomerTaxTypeRateInfoAudit(long id)
        {

            var result = _unitOfWork.Customer.CustomerTaxTypeRateInfoAudit(id);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }


        [HttpDelete("DeleteCustomerTaxTypeRateMappint/{id}")]
        public IActionResult DeleteCustomerTaxTypeRate(long id)
        {
            var existingResult = _unitOfWork.Repository<CustomerTaxTypeRateMapping>().GetSingleOrDefault(c => c.CustomerTaxTypeRateMappingId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<CustomerTaxTypeRateMapping>().Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        #endregion

        [HttpPut("customerSalesPost/{id}")]
        public IActionResult UpdateSales(long id, [FromBody] CustomerViewModel customerViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerViewModel == null)
                    return BadRequest($"{nameof(customerViewModel)} cannot be null");
                var customerObj = _unitOfWork.Customer.GetSingleOrDefault(c => c.CustomerId == id);
                customerViewModel.MasterCompanyId = 1;
                customerObj.PrimarySalesPersonFirstName = customerViewModel.PrimarySalesPersonFirstName;
                customerObj.PrimarySalesPersonId = customerViewModel.PrimarySalesPersonId;
                customerObj.SecondarySalesPersonId = customerViewModel.SecondarySalesPersonId;
                customerObj.SecondarySalesPersonName = customerViewModel.SecondarySalesPersonName;
                customerObj.CSRName = customerViewModel.CSRName;
                customerObj.CsrId = customerViewModel.CsrId;
                customerObj.SaId = customerViewModel.SaId;
                customerObj.AgentName = customerViewModel.AgentName;
                customerObj.AnnualQuota = customerViewModel.AnnualQuota;
                customerObj.AnnualRevenuePotential = customerViewModel.AnnualRevenuePotential;
                customerObj.MasterCompanyId = customerViewModel.MasterCompanyId;
                customerObj.IsActive = customerViewModel.IsActive;
                customerObj.CreatedDate = DateTime.Now;
                customerObj.UpdatedDate = DateTime.Now;
                customerObj.CreatedBy = customerViewModel.CreatedBy;
                customerObj.UpdatedBy = customerViewModel.UpdatedBy;
                _unitOfWork.Customer.Update(customerObj);
                _unitOfWork.SaveChanges();
                return Ok(customerObj);
            }

            return Ok(ModelState);
        }

        [HttpGet("GetAircarftmodelsdata/{id}")]
        [Produces(typeof(List<AircraftModelViewModel>))]
        public IActionResult GetAircarftmodelsdata(long id, AircraftModelViewModel aircraftModelViewModel)
        {
            var allseectedaircarftmodels = _unitOfWork.aircraftModel.GetSelectedAircraftModeldata(id); //.GetAllCustomersData();
            return Ok(allseectedaircarftmodels);

        }

        [HttpPost("saveCustomeraircraftdata")]
        public IActionResult SaveCustomeraircraft([FromBody]  CustomerAircraftTypeViewModel customerAircraftTypeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerAircraftTypeViewModel == null)
                    return BadRequest($"{nameof(customerAircraftTypeViewModel)} cannot be null");
                CustomerAircraftType CustomerObject = new CustomerAircraftType();

                customerAircraftTypeViewModel.MasterCompanyId = 1;
                CustomerObject.CustomerId = customerAircraftTypeViewModel.CustomerId;
                CustomerObject.AircraftTypeId = customerAircraftTypeViewModel.AircraftTypeId;
                CustomerObject.MasterCompanyId = customerAircraftTypeViewModel.MasterCompanyId;
                //CustomerObject.IsActive = true;
                CustomerObject.IsActive = customerAircraftTypeViewModel.IsActive;
                CustomerObject.CreatedDate = DateTime.Now;
                CustomerObject.UpdatedDate = DateTime.Now;
                CustomerObject.CreatedBy = customerAircraftTypeViewModel.CreatedBy;
                CustomerObject.UpdatedBy = customerAircraftTypeViewModel.UpdatedBy;
                _unitOfWork.customerAircraftType.Add(CustomerObject);
                _unitOfWork.SaveChanges();
                return Ok(CustomerObject);
            }

            return Ok(ModelState);
        }

        [HttpPost("postCountryList")]
        public IActionResult CountryList([FromBody] CountriesViewModel countriesViewModel)
        {
            if (ModelState.IsValid)
            {
                if (countriesViewModel == null)
                    return BadRequest($"{nameof(countriesViewModel)} cannot be null");
                DAL.Models.Countries actionobject = new DAL.Models.Countries();
                actionobject.countries_name = countriesViewModel.countries_name;
                actionobject.countries_iso_code = countriesViewModel.countries_iso_code;
                //actionobject.IsActive = true;
                actionobject.IsActive = countriesViewModel.IsActive;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = countriesViewModel.CreatedBy;
                actionobject.UpdatedBy = countriesViewModel.UpdatedBy;

                _unitOfWork.Countries.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [HttpPost("savemultiIntegrations")]
        public IActionResult createIntegration([FromBody] CustomerIntegrationPortalViewmodel itemMasterIntegrationPortal)
        {
            if (ModelState.IsValid)
            {
                if (_context.CustomerIntegrationPortal.Any(o => o.IntegrationPortalId == itemMasterIntegrationPortal.IntegrationPortalId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresule = _context.CustomerIntegrationPortal.Where(c => c.IntegrationPortalId == itemMasterIntegrationPortal.IntegrationPortalId).FirstOrDefault();
                    existingresule.IntegrationPortalId = itemMasterIntegrationPortal.IntegrationPortalId;

                    existingresule.CustomerId = Convert.ToInt64(itemMasterIntegrationPortal.CustomerId);
                    existingresule.CreatedBy = itemMasterIntegrationPortal.CreatedBy;
                    existingresule.UpdatedBy = itemMasterIntegrationPortal.UpdatedBy;
                    existingresule.MasterCompanyId = 1;
                    existingresule.CreatedDate = DateTime.Now;
                    existingresule.UpdatedDate = DateTime.Now;
                    _context.CustomerIntegrationPortal.Update(existingresule);
                    _context.SaveChanges();
                }
                else
                {
                    CustomerIntegrationPortal cp = new CustomerIntegrationPortal();
                    cp.IntegrationPortalId = itemMasterIntegrationPortal.IntegrationPortalId;
                    cp.CustomerId = Convert.ToInt64(itemMasterIntegrationPortal.CustomerId);
                    cp.MasterCompanyId = 1;
                    cp.CreatedBy = itemMasterIntegrationPortal.CreatedBy;
                    cp.UpdatedBy = itemMasterIntegrationPortal.UpdatedBy;
                    cp.CreatedDate = DateTime.Now;
                    cp.UpdatedDate = DateTime.Now;
                    _context.CustomerIntegrationPortal.Add(cp);
                    _context.SaveChanges();
                }
            }
            return Ok(itemMasterIntegrationPortal);
            // return Ok(ModelState);
        }

        [HttpGet("IntegrationGet/{id}")]
        [Produces(typeof(List<CustomerIntegrationPortalViewmodel>))]
        public IActionResult integrationGet(int id)
        {
            var integrationportal = _unitOfWork.Customer.getIntegrationData(id); //.GetAllCustomersData();
            return Ok(integrationportal);

        }


        [HttpGet("getAllCustomers")]
        public IEnumerable<Customer> getAllCustomers()
        {
            try
            {
                var customers = _unitOfWork.Customer.getAllCustomer();
                return customers;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("getAllCustomersInfo")]
        public IActionResult getAllCustomersInfo()
        {
            try
            {
                var customersInfo = _unitOfWork.Customer.getAllCustomersInfo();
                return Ok(customersInfo);
            }
            catch (Exception)
            {
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
                throw;
            }
        }

        [HttpPost("pagination")]
        public IActionResult GetCustomer([FromBody]CustomerSearchViewModel paginate)
        {
            GetData getData = new GetData();


            IQueryable<CustomerSearchViewModel> queryable = null;
            List<CustomerSearchViewModel> customersList = new List<CustomerSearchViewModel>();
            CustomerSearchViewModel customer = null;
            if (!string.IsNullOrEmpty(paginate.CustomerCode) || !string.IsNullOrEmpty(paginate.Name)
                || !string.IsNullOrEmpty(paginate.Email)
                || !string.IsNullOrEmpty(paginate.PrimarySalesPersonFirstName)
                || !string.IsNullOrEmpty(paginate.City)
                || !string.IsNullOrEmpty(paginate.StateOrProvince)
                || !string.IsNullOrEmpty(paginate.CustomerType)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy)
                || (paginate.CreatedDate != null)
                || (paginate.UpdatedDate != null))
            {
                var customers = (from t in _context.Customer
                                 join ad in _context.Address on t.AddressId equals ad.AddressId
                                 join ct in _context.CustomerType on t.CustomerTypeId equals ct.CustomerTypeId
                                 join cc in _context.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                                 where t.IsDeleted == false || t.IsDeleted == null
                                 select new
                                 {
                                     ct.Description,
                                     t.CustomerId,
                                     t,
                                     Address1 = ad.Line1,
                                     Address2 = ad.Line2,
                                     Address3 = ad.Line3,
                                     t.CustomerCode,
                                     t.Name,
                                     t.Email,
                                     t.CustomerPhone,
                                     t.CustomerPhoneExt,
                                     ad.City,
                                     ad.StateOrProvince,
                                     t.CreatedDate,
                                     t.CreatedBy,
                                     t.UpdatedBy,
                                     t.UpdatedDate,
                                     ad.AddressId,
                                     ad.Country,
                                     ad.PostalCode,
                                     t.PrimarySalesPersonFirstName,
                                     t.CustomerClassification,
                                     t.IsActive,
                                     t.CsrId,
                                     t.SaId,
                                     CustomerClarification = cc.Description
                                 }).OrderByDescending(a => a.UpdatedDate).ToList();
                foreach (var item in customers)
                {
                    customer = new CustomerSearchViewModel();
                    customer.CustomerId = item.CustomerId;
                    customer.CustomerPhone = item.CustomerPhone;
                    customer.CustomerPhoneExt = item.CustomerPhoneExt;
                    customer.CustomerCode = item.CustomerCode;
                    customer.City = item.City;
                    customer.StateOrProvince = item.StateOrProvince;
                    customer.CustomerType = item.Description;
                    customer.Name = item.Name;
                    customer.Email = item.Email;
                    customer.CreatedDate = item.CreatedDate;
                    customer.CreatedBy = item.CreatedBy;
                    customer.UpdatedDate = item.UpdatedDate;
                    customer.UpdatedBy = item.UpdatedBy;
                    customer.PrimarySalesPersonFirstName = item.PrimarySalesPersonFirstName;
                    customer.IsActive = item.IsActive;
                    customer.CustomerClarifiacationName = item.CustomerClarification;
                    customer.CustomerPhone = item.CustomerPhone;
                    customersList.Add(customer);
                }
                #region Pagination for join tables
                if (!string.IsNullOrEmpty(paginate.CustomerCode))
                {
                    customersList = customersList.Where(c => c.CustomerCode != null && c.CustomerCode.ToUpper().Contains(paginate.CustomerCode.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Name))
                {
                    customersList = customersList.Where(c => c.Name != null && c.Name.ToUpper().Contains(paginate.Name.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Email))
                {
                    customersList = customersList.Where(c => c.Email != null && c.Email.ToUpper().Contains(paginate.Email.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.City))
                {
                    customersList = customersList.Where(c => c.City != null && c.City.ToUpper().Contains(paginate.City.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.StateOrProvince))
                {
                    customersList = customersList.Where(c => c.StateOrProvince != null && c.StateOrProvince.ToUpper().Contains(paginate.StateOrProvince.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CustomerType))
                {
                    customersList = customersList.Where(c => c.CustomerType != null && c.CustomerType.ToUpper().Contains(paginate.CustomerType.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.PrimarySalesPersonFirstName))
                {
                    customersList = customersList.Where(c => c.PrimarySalesPersonFirstName != null && c.PrimarySalesPersonFirstName.ToUpper().Contains(paginate.PrimarySalesPersonFirstName.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    customersList = customersList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    customersList = customersList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                if (paginate.CreatedDate != null)
                {
                    customersList = customersList.Where(c => c.CreatedDate != null && (c.CreatedDate >= paginate.CreatedDate || c.CreatedDate <= paginate.CreatedDate)).ToList();
                }
                if (paginate.UpdatedDate != null)

                {
                    customersList = customersList.Where(c => c.UpdatedDate != null && (c.UpdatedDate > paginate.UpdatedDate || c.UpdatedDate < paginate.UpdatedDate)).ToList();
                }
                getData.TotalRecordsCount = customersList.Count();
            }
            else
            {
                var sortedField = paginate.sortField;
                var customers = (from t in _context.Customer
                                 join ad in _context.Address on t.AddressId equals ad.AddressId
                                 join ct in _context.CustomerType on t.CustomerTypeId equals ct.CustomerTypeId
                                 join cc in _context.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                                 where t.IsDeleted == false || t.IsDeleted == null
                                 select new
                                 {
                                     ct.Description,
                                     t.CustomerId,
                                     t,
                                     Address1 = ad.Line1,
                                     Address2 = ad.Line2,
                                     Address3 = ad.Line3,
                                     t.CustomerCode,
                                     t.Name,
                                     t.Email,
                                     t.CustomerPhone,
                                     t.CustomerPhoneExt,
                                     ad.City,
                                     ad.StateOrProvince,
                                     t.CreatedDate,
                                     t.CreatedBy,
                                     t.UpdatedBy,
                                     t.UpdatedDate,
                                     ad.AddressId,
                                     ad.Country,
                                     ad.PostalCode,
                                     t.PrimarySalesPersonFirstName,
                                     t.IsActive,
                                     CustomerClarification = cc.Description
                                 }).OrderByDescending(a => a.UpdatedDate).ToList();
                foreach (var item in customers)
                {
                    customer = new CustomerSearchViewModel();
                    customer.CustomerId = item.CustomerId;
                    customer.CustomerCode = item.CustomerCode;
                    customer.City = item.City;
                    customer.StateOrProvince = item.StateOrProvince;
                    customer.CustomerType = item.Description;
                    customer.Name = item.Name;
                    customer.Email = item.Email;
                    customer.CreatedDate = item.CreatedDate;
                    customer.CreatedBy = item.CreatedBy;
                    customer.UpdatedDate = item.UpdatedDate;
                    customer.UpdatedBy = item.UpdatedBy;
                    customer.PrimarySalesPersonFirstName = item.PrimarySalesPersonFirstName;
                    customer.IsActive = item.IsActive;
                    customer.CustomerClarifiacationName = item.CustomerClarification;
                    customer.CustomerPhone = item.CustomerPhone;
                    customersList.Add(customer);
                    getData.TotalRecordsCount = customersList.Count();
                }

            }
            #endregion
            if (paginate.sortField != null)
            {
                queryable = customersList.AsQueryable().OrderBy(paginate.sortField);
            }
            else
            {
                queryable = customersList.AsQueryable();//.OrderBy("Email");
            }


            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.CustomerList = DAL.Common.PaginatedList<CustomerSearchViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        [HttpPost("globalSearch")]
        public IActionResult GetCustomer([FromBody]GlobalSearchModel paginate)
        {
            IQueryable<Customer> queryable = null;
            if (!string.IsNullOrEmpty(paginate.GlobalSearchString))
            {
                queryable = _context.Customer.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                    .OrderByDescending(c => c.CustomerId).ToList().AsQueryable();
                // queryable = _context.Customer.Where(c => new[] { c.CustomerCode, c.Name, c.Email, c.PrimarySalesPersonFirstName }.Any(s => s.Contains(paginate.GlobalSearchString))).ToList().AsQueryable();
            }
            else
                queryable = _context.Customer.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                    .OrderByDescending(c => c.CustomerId).ToList().AsQueryable();
            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                var data = DAL.Common.PaginatedList<Customer>.Create(queryable, pageCount, pageListPerPage);
                return Ok(data);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        [HttpPost("createinternationalshipping")]
        public IActionResult CreateCustomerInternationalShipping([FromBody] CustomerInternationalShipping model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");
                _unitOfWork.Customer.CreateCustomerInternationalShippingDetails(model);
            }
            return Ok(ModelState);
        }

        [HttpPost("updateinternationalshipping")]
        public IActionResult UpdateCustomerInternationalShipping([FromBody] CustomerInternationalShipping model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");
                _unitOfWork.Customer.UpdateCustomerInternationalShippingDetails(model);
            }
            return Ok(ModelState);
        }

        [HttpGet("deleteinternationalshipping")]
        public IActionResult DeleteCustomerInternationalShippingDetails(long id, string updatedBy)
        {
            _unitOfWork.Customer.DeleteCustomerInternationalShippingDetails(id, updatedBy);
            return Ok();
        }

        [HttpGet("internationalshippingdetailsstatus")]
        public IActionResult CustomerInternationalShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.Customer.CustomerInternationalShippingDetailsStatus(id, status, updatedBy);
            return Ok();
        }

        [HttpGet("internationalshippingdetaillist")]
        public IActionResult GetCustomerInternationalShippingDetails(long customerId, int pageNumber, int pageSize)
        {
            var result = _unitOfWork.Customer.GetCustomerInternationalShippingDetails(customerId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("internationalshippingdetailsbyid")]
        public IActionResult GetCustomerInternationalShippingDetailsById(long id)
        {
            var result = _unitOfWork.Customer.GetCustomerInternationalShippingDetailsById(id);
            return Ok(result);
        }

        [HttpPost("createshippingviadetails")]
        public IActionResult CreateShippingViaDetails([FromBody] ShippingViaDetails model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");
                _unitOfWork.Customer.CreateShippingViaDetails(model);
            }
            return Ok(ModelState);
        }

        [HttpPost("updateshippingviadetails")]
        public IActionResult UpdateShippingViaDetails([FromBody] ShippingViaDetails model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");
                _unitOfWork.Customer.UpdateShippingViaDetails(model);
            }
            return Ok(ModelState);
        }

        [HttpGet("deleteshippingviadetails")]
        public IActionResult DeleteShippingViaDetails(long id, string updatedBy)
        {
            _unitOfWork.Customer.DeleteShippingViaDetails(id, updatedBy);
            return Ok();
        }

        [HttpGet("shippingviadetailsstatus")]
        public IActionResult ShippingViaDetailsStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.Customer.ShippingViaDetailsStatus(id, status, updatedBy);
            return Ok();
        }

        [HttpGet("getshippingviadetails")]
        public IActionResult GetShippingViaDetails(long internationalShippingId, int pageNumber, int pageSize)
        {
            var result = _unitOfWork.Customer.GetShippingViaDetails(internationalShippingId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("getshippingviadetailsbyid")]
        public IActionResult GetShippingViaDetailsById(long id)
        {
            var result = _unitOfWork.Customer.GetShippingViaDetailsById(id);
            return Ok(result);
        }
        [HttpGet("getauditshippingviadetailsbyid")]
        public IActionResult GetShippingViaDetailsById(long customerId, long internationalShippingId, long shippingViaDetailsId)
        {
            var result = _unitOfWork.Customer.GetAuditShippingViaDetailsById(customerId, internationalShippingId, shippingViaDetailsId);
            return Ok(result);
        }

        [HttpGet("getrestrictedparts")]
        public IActionResult GetRestrictedParts(int moduleId, long? referenceId, string partType)
        {
            var result = _unitOfWork.CommonRepository.GetRestrictedParts(moduleId, referenceId, partType);
            return Ok(result);
        }

        [HttpGet("getRestrictsPmaList")]
        public IActionResult GetRestrictsPmaList(int itemMasterId, long? customerId)
        {
            var result = _unitOfWork.CommonRepository.GetRestrictPmaList(itemMasterId, customerId);
            return Ok(result);
        }

        [HttpGet("getRestrictsBerList")]
        public IActionResult GetRestrictsBerList(int itemMasterId, long? customerId)
        {
            var result = _unitOfWork.CommonRepository.GetRestrictDerList(itemMasterId, customerId);
            return Ok(result);
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<CustomerSearchViewModel> CustomerList { get; set; }
        }

        [HttpGet("searchGetCustomerATAMappedByMultiATAIDATASubID")]
        public IActionResult CustomerATAMappedList(long customerId, string contactId, string ATAChapterId, string ATASubChapterID)
        {
            var result = _unitOfWork.Customer.searchgetCustomerATAMappingDataByMultiTypeIdATAIDATASUBID(customerId, contactId, ATAChapterId, ATASubChapterID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }



        #region customerDocument
        [HttpPost("customerDocumentUpload")]
        [Produces("application/json")]
        public IActionResult DocumentUploadAction()
        {

            try
            {
                CustomerDocumentDetail objCustomerDocumentDetail = new CustomerDocumentDetail();
                if (ModelState.IsValid)
                {

                    long attachmentId = 0;
                    long documentDeatailId = 0;
                    if (Request.Form == null)
                        return BadRequest($"{nameof(objCustomerDocumentDetail)} cannot be null");

                    long CustomerDocumentDetailId = Convert.ToInt64(Request.Form["CustomerDocumentDetailId"]);

                    if (CustomerDocumentDetailId > 0)
                    {
                        var customerDocObj = _unitOfWork.Customer.GetCustomerDocumentDetailById(CustomerDocumentDetailId);
                        //objVendorDocumentDetail.MasterCompanyId = 1;      
                        customerDocObj.CustomerId = Convert.ToInt64(Request.Form["CustomerId"]);
                        customerDocObj.UpdatedDate = DateTime.Now;
                        customerDocObj.UpdatedBy = Request.Form["UpdatedBy"];
                        customerDocObj.DocName = Request.Form["DocName"];
                        customerDocObj.DocMemo = Request.Form["DocMemo"];
                        customerDocObj.DocDescription = Request.Form["DocDescription"];
                        if (customerDocObj.AttachmentId > 0)
                        {
                            customerDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objCustomerDocumentDetail.CustomerId,
                              Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), customerDocObj.UpdatedBy, customerDocObj.MasterCompanyId, customerDocObj.AttachmentId);
                        }
                        else
                        {
                            customerDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objCustomerDocumentDetail.CustomerId,

                                Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), customerDocObj.UpdatedBy, customerDocObj.MasterCompanyId);

                        }

                        _unitOfWork.CreateDocumentDetails.Update(customerDocObj);
                        _unitOfWork.SaveChanges();
                        attachmentId = customerDocObj.AttachmentId;
                        documentDeatailId = customerDocObj.CustomerDocumentDetailId;

                    }
                    else
                    {
                        objCustomerDocumentDetail.CustomerId = Convert.ToInt64(Request.Form["CustomerId"]);
                        objCustomerDocumentDetail.MasterCompanyId = 1;
                        objCustomerDocumentDetail.CreatedBy = Request.Form["CreatedBy"];
                        objCustomerDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
                        objCustomerDocumentDetail.CreatedDate = DateTime.Now;
                        objCustomerDocumentDetail.UpdatedDate = DateTime.Now;
                        objCustomerDocumentDetail.DocName = Request.Form["DocName"];
                        objCustomerDocumentDetail.DocMemo = Request.Form["DocMemo"];
                        objCustomerDocumentDetail.DocDescription = Request.Form["DocDescription"];
                        objCustomerDocumentDetail.IsActive = true;
                        objCustomerDocumentDetail.IsDeleted = false;
                        objCustomerDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objCustomerDocumentDetail.CustomerId,
                                                                                Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), objCustomerDocumentDetail.UpdatedBy, objCustomerDocumentDetail.MasterCompanyId);
                        _unitOfWork.CreateDocumentDetails.Add(objCustomerDocumentDetail);
                        _unitOfWork.SaveChanges();
                        documentDeatailId = objCustomerDocumentDetail.CustomerDocumentDetailId;

                        attachmentId = objCustomerDocumentDetail.AttachmentId;


                    }

                    if (documentDeatailId != null)
                    {
                        DocumentsAudit obj = new DocumentsAudit();
                        obj.UpdatedDate = obj.CreatedDate = DateTime.Now;
                        obj.CreatedBy = obj.UpdatedBy = Request.Form["UpdatedBy"];
                        obj.MasterCompanyId = 1;
                        obj.ModuleId = Convert.ToInt32(ModuleEnum.Customer);
                        obj.ReferenceId = Convert.ToInt64(Request.Form["CustomerId"]);
                        obj.AttachmentId = documentDeatailId;
                        obj.DocDescription = Request.Form["DocDescription"];
                        obj.DocMemo = Request.Form["DocMemo"];
                        obj.DocName = Request.Form["DocName"];
                        obj.IsActive = true;
                        if (attachmentId != null)
                        {
                            var data = _context.AttachmentDetails.AsNoTracking().Where(p => p.AttachmentId == attachmentId).OrderByDescending(p => p.UpdatedDate).FirstOrDefault();
                            if (data != null)
                            {
                                obj.FileName = data.FileName;
                                obj.Link = data.Link;
                                obj.Description = data.Description;

                            }
                        }


                        _context.DocumentsAudit.Add(obj);
                        _context.SaveChanges();
                    }

                    return Ok(objCustomerDocumentDetail);
                }




                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("customerDocumentUpdate")]
        public IActionResult customerDocumentUpdate()
        {
            CustomerDocumentDetail objCustomerDocumentDetail = new CustomerDocumentDetail();
            if (ModelState.IsValid)
            {
                if (Request.Form == null)
                    return BadRequest($"{nameof(objCustomerDocumentDetail)} cannot be null");




                objCustomerDocumentDetail.CustomerId = Convert.ToInt64(Request.Form["CustomerId"]);
                var customerDocObj = _unitOfWork.Customer.GetCustomerDocumentDetailById(objCustomerDocumentDetail.CustomerId);
                objCustomerDocumentDetail.MasterCompanyId = 1;
                objCustomerDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
                objCustomerDocumentDetail.DocName = Request.Form["DocName"];
                objCustomerDocumentDetail.DocMemo = Request.Form["DocMemo"];
                objCustomerDocumentDetail.DocDescription = Request.Form["DocDescription"];
                objCustomerDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objCustomerDocumentDetail.CustomerId,
                    Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), objCustomerDocumentDetail.UpdatedBy, objCustomerDocumentDetail.MasterCompanyId);

                _unitOfWork.CreateDocumentDetails.Update(objCustomerDocumentDetail);
                _unitOfWork.SaveChanges();

                AttachmentDetails data = _context.AttachmentDetails.AsNoTracking().Where(p => p.AttachmentId == objCustomerDocumentDetail.AttachmentId).FirstOrDefault();
                if (data != null)
                {
                    DocumentsAudit obj = new DocumentsAudit();

                    obj.UpdatedDate = obj.CreatedDate = DateTime.Now;
                    obj.CreatedBy = obj.UpdatedBy = Request.Form["UpdatedBy"];
                    obj.MasterCompanyId = 1;
                    obj.ModuleId = Convert.ToInt32(ModuleEnum.Customer);
                    obj.ReferenceId = Convert.ToInt64(Request.Form["CustomerId"]);
                    obj.DocDescription = Request.Form["DocDescription"];
                    obj.DocMemo = Request.Form["DocMemo"];
                    obj.DocName = Request.Form["DocName"];
                    obj.FileName = data.FileName;
                    obj.Link = data.Link;
                    obj.Description = data.Description;
                    obj.IsActive = true;
                    obj.AttachmentId = objCustomerDocumentDetail.CustomerDocumentDetailId;




                    _context.DocumentsAudit.Add(obj);
                    _context.SaveChanges();
                }

                return Ok(objCustomerDocumentDetail);
            }
            return Ok(ModelState);
        }


        [HttpGet("getCustomerDocumentDetail/{id}")]
        [Produces(typeof(List<CustomerDocumentDetail>))]
        public IActionResult GetCustomerDocumentDetail(long id, CustomerDocumentDetail cstomerDocumentDetail)
        {
            var allcusDoc = _unitOfWork.CreateDocumentDetails.GetAllDataById(id);
            return Ok(allcusDoc);

        }



        [HttpDelete("customerDocumentDelete/{id}")]
        [Produces(typeof(CustomerViewModel))]
        public IActionResult DeleteDocumentAction(long id)
        {
            var existingResult = _unitOfWork.Publication.GetSingleOrDefault(c => c.PublicationRecordId == id);

            existingResult.IsDeleted = true;
            _unitOfWork.Publication.Update(existingResult);
            //_unitOfWork.Publication.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("getCustomerDocumentAudit")]
        [Produces(typeof(CustomerDocumentDetailAudit))]
        public IActionResult GetCustomerDocumentDetailAudit(long id, long customerId)
        {
            var allvendorsDoc = _unitOfWork.CreateDocumentDetails.GetAllAudotHistoryById(id, customerId, Convert.ToInt32(ModuleEnum.Customer));
            return Ok(allvendorsDoc);

        }
        #endregion

        [HttpGet("getCustomerBillingHistory/{id}")]
        [Produces(typeof(List<CustomerBillingAddress>))]
        public IActionResult getCustomerBillingHistory(long id, CustomerBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.CustomerBillingInformation.GetAllCusBillingHistory(id); //.GetAllCustomersData();
            return Ok(allCusbilldetails);

        }

        [HttpGet("getCustomerShippingHistory/{id}")]
        [Produces(typeof(List<CustomerShippingAddress>))]
        public IActionResult getCustomerShippingHistory(long id, CustomerShippingAddress cstomerShippingAddress)
        {
            var allCusShippingdetails = _unitOfWork.CustomerShippingAddress.GetAllCusShippingHistory(id); //.GetAllCustomersData();
            return Ok(allCusShippingdetails);

        }


        [HttpGet("customershipviadetails")]
        [Produces(typeof(List<CustomerShippingAddress>))]
        public IActionResult GetCustomerShipviaDetails(long customerId, long addressId)
        {
            var allCusShippingdetails = _unitOfWork.Customer.GetCustomerShipviaDetails(customerId, addressId);
            return Ok(allCusShippingdetails);

        }


        [HttpGet("customernameandcodes")]
        public IActionResult GetCustomerNameAndCodes(string value)
        {
            var custmoerNameAndCodes = _unitOfWork.Customer.GetCustomerNameAndCodes(value);
            return Ok(custmoerNameAndCodes);

        }


        [HttpGet("customerclassificationmappings")]
        public IActionResult GetCustomerClassificationMappings(long referenceId)
        {
            var result = _unitOfWork.CommonRepository.GetCustomerClassificationMappings(Convert.ToInt32(ModuleEnum.Customer), referenceId);
            return Ok(result);
        }




        [HttpGet("customernameandcodesbyId")]
        public IActionResult GetCustomerNameAndCodesByCustomerId(long customerId)
        {
            var custmoerNameAndCodes = _unitOfWork.Customer.GetCustomerNameAndCodesByCustomerId(customerId);
            return Ok(custmoerNameAndCodes);

        }




        /// <summary>
        /// Added By Vijay on 15-11-2019
        /// This API is used for customer billing history based on CustomerId and CustomerBillingaddressId
        /// </summary>
        /// <param name="customerId"></param>
        /// <param name="customerBillingaddressId"></param>
        /// <returns></returns>
        [HttpGet("getCustomerBillingHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllCustomerBillingAddressAudit(long customerId, long customerBillingaddressId)
        {
            //var allCusBillingDetails = _unitOfWork.CustomerBillingInformation.GetAllCustomerBillingAddressAudit(customerId, customerBillingaddressId);
            //return Ok(allCusBillingDetails);
            var allCusBillingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(customerId, customerBillingaddressId, Convert.ToInt32(AddressTypeEnum.BillingAddress), Convert.ToInt32(ModuleEnum.Customer));

            return Ok(allCusBillingDetails);
        }
        /// <summary>
        /// Added By Vijay on 15-11-2019
        /// This API is used for to get all customer shipping history based on CustomerId and CustomerShippingAddressId
        /// </summary>
        /// <param name="customerId"></param>
        /// <param name="customerShippingAddressId"></param>
        /// <returns></returns>
        [HttpGet("getCustomerShippingHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllCustomerShippingAddressAudit(long customerId, long customerShippingAddressId)
        {
            var allCusShippingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(customerId, customerShippingAddressId, Convert.ToInt32(AddressTypeEnum.ShippingAddress), Convert.ToInt32(ModuleEnum.Customer));
            return Ok(allCusShippingDetails);
        }

        [HttpGet("deletesRestrictedParts")]
        public IActionResult DeleteRestrictedParts(long id, string updatedBy)
        {
            _unitOfWork.Customer.DeleteRestrictedParts(id, updatedBy);
            return Ok();
        }
        [HttpGet("shippingdetailsstatus")]
        public IActionResult CustomerShippingDetailsStatus(long id, bool status, string updatedBy)
        {

            _unitOfWork.Customer.CustomerShippingDetailsStatus(id, status, updatedBy);

            var data = (from t in _context.CustomerShippingAddress
                        where t.CustomerShippingAddressId == id
                        select new
                        {

                            CustomerId = t.CustomerId,

                        }).FirstOrDefault();


            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(id), Convert.ToInt32(AddressTypeEnum.ShippingAddress), updatedBy);


            return Ok();
        }
        [HttpGet("customersBillingUpdateStatus")]
        public IActionResult CustomerBillingStatus(long id, bool status, string updatedBy)
        {

            _unitOfWork.Customer.CustomerBillingStatus(id, status, updatedBy);
            var data = (from t in _context.CustomerBillingAddress
                        where t.CustomerBillingAddressId == id
                        select new
                        {

                            CustomerId = t.CustomerId,

                        }).FirstOrDefault();

            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(id), Convert.ToInt32(AddressTypeEnum.BillingAddress), updatedBy);

            return Ok();

        }
        [HttpGet("searchCustomerAircraftMappingDataByMultiTypeIdModelIDDashID")]
        public IActionResult searchCustomerAircraftMappingDataByMultiTypeIdModelIDDashID(long customerId, string AircraftTypeId, string AircraftModelId, string DashNumberId, string memo)
        {
            var result = _unitOfWork.Customer.searchCustomerAircraftMappingDataByMultiTypeIdModelIDDashID(customerId, AircraftTypeId, AircraftModelId, DashNumberId, memo);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("deleteshipviadetails")]
        public IActionResult DeleteShipViaDetails(long id, string updatedBy)
        {
            _unitOfWork.Customer.DeleteShipViaDetails(id, updatedBy);
            return Ok();
        }
        [HttpGet("shippingdetailsviastatus")]
        public IActionResult CustomerShippingDetailsViaStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.Customer.CustomerShippingDetailsViaStatus(id, status, updatedBy);
            return Ok();
        }
        [HttpDelete("deleteCustomerDocuments/{id}")]
        public IActionResult DeleteCustomerDocuments(long id)
        {
            var existingResult = _unitOfWork.Repository<CustomerDocumentDetail>().GetSingleOrDefault(c => c.CustomerDocumentDetailId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<CustomerDocumentDetail>().Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpPost("customerFinanceDocumentUpload")]
        [Produces("application/json")]
        public IActionResult CustomerDocumentUploadAction()
        {

            try
            {
                CustomerDocumentDetail objCustomerDocumentDetail = new CustomerDocumentDetail();
                if (ModelState.IsValid)
                {
                    if (Request.Form == null)
                        return BadRequest($"{nameof(objCustomerDocumentDetail)} cannot be null");
                    objCustomerDocumentDetail.MasterCompanyId = 1;
                    objCustomerDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
                    objCustomerDocumentDetail.CustomerId = Convert.ToInt64(Request.Form["CustomerId"]);

                    if (objCustomerDocumentDetail.CustomerId > 0)
                    {
                        var attachmentData = _context.Attachment.Where(p => p.ReferenceId == objCustomerDocumentDetail.CustomerId && p.ModuleId == Convert.ToInt32(ModuleEnum.Customer)).FirstOrDefault();

                        if (attachmentData != null)
                        {
                            objCustomerDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objCustomerDocumentDetail.CustomerId,
                                                         Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), objCustomerDocumentDetail.UpdatedBy, objCustomerDocumentDetail.MasterCompanyId, attachmentData.AttachmentId);


                        }
                        else
                        {
                            objCustomerDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objCustomerDocumentDetail.CustomerId,
                                                                       Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), objCustomerDocumentDetail.UpdatedBy, objCustomerDocumentDetail.MasterCompanyId);

                        }

                    }

                    return Ok(objCustomerDocumentDetail);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getCustmerFinanceDocumentDetail/{id}")]
        public IActionResult GetCustomerFinanceDocumentDetail(long id, int moduleId)
        {
            var allcustomerFinanceDocs = _unitOfWork.Customer.GetCustomerFinanceDocumentDetailById(id, moduleId);
            return Ok(allcustomerFinanceDocs);
        }
        [HttpDelete("customerAttachmentDelete/{id}")]
        public IActionResult GetCustomerFinanceDocumentDelete(long id, string updatedBy)
        {
            var deleteStatus = _unitOfWork.Customer.GetCustomerFinanceDocumentDelete(id, updatedBy);
            return Ok(deleteStatus);
        }
        [HttpGet("GetCustomerContacts")]
        // [Produces(typeof(List<ATAChapterViewModel>))]
        public IActionResult GetCustomerContacts(long id)
        {
            var allATAMaininfo = _unitOfWork.Customer.GetCustomerContacts(id);
            return Ok(allATAMaininfo);

        }
        [HttpGet("GetCustomerAuditHistoryByid")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult GetCustomerAuditHistoryByid(long customerId)
        {
            var customerDtails = _unitOfWork.Customer.GetCustomerAuditHistoryByid(customerId); //.GetAllCustomersData();
            return Ok(customerDtails);

        }
        [HttpGet("GetCustomerInternationalShippingAuditHistoryByid")]
        [Produces(typeof(List<CustomerViewModel>))]
        public IActionResult GetCustomerInternationalShippingAuditHistoryByid(long customerId, long internationalShippingId)
        {
            var customerDtails = _unitOfWork.Customer.GetCustomerInternationalShippingAuditHistoryByid(customerId, internationalShippingId); //.GetAllCustomersData();
            return Ok(customerDtails);

        }

        [HttpPost("uploadcustomerbillingaddress")]
        public IActionResult UploadBillingCustomData(long customerId)
        {
            var result = _unitOfWork.Customer.UploadCustomerBillingAddressCustomData(Request.Form.Files[0], customerId);
            return Ok(result);
        }

        [HttpPost("uploadcustomershippingaddress")]
        public IActionResult UploadShippingCustomData(long customerId)
        {
            var result = _unitOfWork.Customer.UploadCustomerShippingAddressCustomData(Request.Form.Files[0], customerId);
            return Ok(result);
        }
        [HttpPost("uploadcustomerinternationalshipping")]
        public IActionResult UploadInternationalCustomData(long customerId)
        {
            _unitOfWork.Customer.UploadCustomerInternationalCustomData(Request.Form.Files[0], customerId);
            return Ok();
        }
        [HttpPost("uploadcustomercontacts")]
        public IActionResult UploadContactsCustomData(long customerId)
        {
            _unitOfWork.Customer.UploadCustomerContactsCustomData(Request.Form.Files[0], customerId);
            return Ok();
        }
        [HttpGet("getinternationalshippingviadetails")]
        public IActionResult GetShippingViaDetails(long internationalShippingId)
        {
            var result = _unitOfWork.Customer.GetInterShippingViaDetails(internationalShippingId);
            return Ok(result);
        }

    }

}



