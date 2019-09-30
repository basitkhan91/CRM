﻿using System;
using System.Collections.Generic;
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
            var allCustomerBynamelistDetails = _unitOfWork.Customer.GetCustomerBynameList(name); //.GetAllCustomersData();
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
                actionobject.IsDelete = false;
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
                actionobject.CustomerClassificationId = customerViewModel.CustomerClassificationId;
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

                //if (actionobject.IsCustomerAlsoVendor)
                //{
                //    DAL.Models.Vendor vendorobject = new DAL.Models.Vendor();
                //    vt.VendorTypeId = 1;
                //    vendorobject.VendorId = customerViewModel.CustomerId;
                //    vendorobject.VendorName = customerViewModel.CustomerParentName;
                //    vendorobject.LicenseNumber = customerViewModel.LicenseNumber;
                //    vendorobject.VendorClassificationId = customerViewModel.VendorClassificationId;
                //    vendorobject.capabilityId = customerViewModel.capabilityId;
                //    vendorobject.VendorPhone = customerViewModel.VendorPhone;
                //    vendorobject.VendorTypeId = customerViewModel.VendorTypeId;
                //    vendorobject.IsPreferredVendor = customerViewModel.IsPreferredVendor;
                //    vendorobject.Parent = customerViewModel.Parent;
                //    vendorobject.IsVendorAlsoCustomer = customerViewModel.IsVendorAlsoCustomer;
                //    vendorobject.VendorEmail = customerViewModel.VendorEmail;
                //    vendorobject.VendorCode = customerViewModel.VendorCode;
                //    vendorobject.VendorContractReference = customerViewModel.VendorContractReference;
                //    vendorobject.DoingBusinessAsName = customerViewModel.DoingBusinessAsName;
                //    vendorobject.VendorURL = customerViewModel.VendorURL;
                //    vendorobject.IsCertified = customerViewModel.IsCertified;
                //    vendorobject.VendorAudit = customerViewModel.VendorAudit;
                //    vendorobject.MasterCompanyId = customerViewModel.MasterCompanyId;
                //    vendorobject.IsActive = true;
                //    vendorobject.CreditTermsId = customerViewModel.CreditTermsId;
                //    vendorobject.CreatedDate = DateTime.Now;
                //    vendorobject.UpdatedDate = DateTime.Now;
                //    vendorobject.CreatedBy = customerViewModel.CreatedBy;
                //    vendorobject.UpdatedBy = customerViewModel.UpdatedBy;
                //    //actionobject.vendorc
                //    AddAddress(customerViewModel);
                //    vendorobject.AddressId = customerViewModel.AddressId.Value;
                //    _unitOfWork.Vendor.Add(vendorobject);
                //    _unitOfWork.SaveChanges();
                //    return Ok(vendorobject);
                //}


                List<AttachmentDetails> attachmentDetails = new List<AttachmentDetails>();

                _unitOfWork.CommonRepository.CreateRestrictedParts(actionobject.RestrictedPMAParts, actionobject.CustomerId);
                _unitOfWork.CommonRepository.CreateRestrictedParts(actionobject.RestrictedDERParts, actionobject.CustomerId);
                _unitOfWork.CommonRepository.CreateClassificationMappings(actionobject.CustomerClassificationMapping, actionobject.CustomerId);

                // _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, attachmentDetails, actionobject.CustomerId,Convert.ToInt32(DAL.Common.ModuleEnum.Customer), Convert.ToString(DAL.Common.ModuleEnum.Customer), actionobject.CreatedBy, actionobject.MasterCompanyId);

                return Ok(actionobject);
            }

            return Ok(ModelState);
        }


        
        [HttpPut("customers/{id}")]
        public IActionResult UpdateCustomers(long id, [FromBody] CustomerViewModel customerViewModel, CustomerType ct)
        {

            var actionobject = _unitOfWork.Customer.GetSingleOrDefault(a => a.CustomerId == id);
            var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == customerViewModel.Addressid);

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
            actionobject.CustomerClassificationId = customerViewModel.CustomerClassificationId;
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
            address.RecordCreateDate = DateTime.Now;
            address.CreatedBy = customerViewModel.CreatedBy;
            address.UpdatedBy = customerViewModel.UpdatedBy;
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            actionobject.GeneralCurrencyId = customerViewModel.GeneralCurrencyId;
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
                var integrationList = _unitOfWork.CustomerIntegrationPortalRepository.GetAllData().ToList();
                integrationList.Where(a => a.CustomerId == id).ToList().ForEach(a => _unitOfWork.CustomerIntegrationPortalRepository.Remove(a));
                _unitOfWork.SaveChanges();
                foreach (string s in customerViewModel.IntegrationPortalId)
                {
                    if (s != "")
                    {
                        var integrationTypes = new CustomerIntegrationPortal();
                        integrationTypes.IntegrationPortalId = Convert.ToInt32(s);
                        integrationTypes.CustomerId = id;
                        integrationTypes.MasterCompanyId = 1;
                        integrationTypes.CreatedBy = customerViewModel.CreatedBy;
                        integrationTypes.UpdatedBy = customerViewModel.UpdatedBy;
                        integrationTypes.CreatedDate = DateTime.Now;
                        integrationTypes.UpdatedDate = DateTime.Now;
                        integrationTypes.IsActive = true;
                        _unitOfWork.CustomerIntegrationPortalRepository.Add(integrationTypes);
                        _unitOfWork.SaveChanges();
                    }
                }
            }


            _unitOfWork.Address.Update(address);
            _unitOfWork.SaveChanges();
            _unitOfWork.Customer.Update(actionobject);
            _unitOfWork.SaveChanges();

            _unitOfWork.CommonRepository.UpdateRestrictedParts(actionobject.RestrictedPMAParts, actionobject.CustomerId);
            _unitOfWork.CommonRepository.UpdateRestrictedParts(actionobject.RestrictedDERParts, actionobject.CustomerId);
            _unitOfWork.CommonRepository.UpdateClassificationMappings(actionobject.CustomerClassificationMapping, actionobject.CustomerId);
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
            address.RecordCreateDate = DateTime.Now;
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
                customercontactViewModel.IsDefaultContact = customercontactViewModel.IsDefaultContact;
                contactObj.WorkPhoneExtn = contactObj.WorkPhoneExtn;
                _unitOfWork.ContactRepository.Add(contactObj);
                _unitOfWork.SaveChanges();
                return Ok(contactObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("ContactPost")]
        public IActionResult CreateCustomerContact([FromBody] CustomercontactViewModel CustomerContactViewModel)
        {

            if (ModelState.IsValid)
            {
                if (CustomerContactViewModel == null)
                    return BadRequest($"{nameof(CustomerContactViewModel)} cannot be null");
                CustomerContact contactObj = new CustomerContact();
                CustomerContactViewModel.MasterCompanyId = 1;
                contactObj.ContactId = CustomerContactViewModel.ContactId;
                contactObj.CustomerId = CustomerContactViewModel.CustomerId;
                contactObj.IsDefaultContact = CustomerContactViewModel.IsDefaultContact;
                contactObj.MasterCompanyId = CustomerContactViewModel.MasterCompanyId;
                contactObj.IsActive = CustomerContactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = CustomerContactViewModel.CreatedBy;
                contactObj.UpdatedBy = CustomerContactViewModel.UpdatedBy;
                _unitOfWork.CustomerContact.Add(contactObj);
                _unitOfWork.SaveChanges();
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
                if(customerContact!=null)
                {
                    customerContact.UpdatedDate = DateTime.Now;
                    customerContact.UpdatedBy = contactViewModel.UpdatedBy;
                    customerContact.IsDefaultContact = contactViewModel.IsDefaultContact;

                    _unitOfWork.CustomerContact.Update(customerContact);
                    _unitOfWork.SaveChanges();
                }

            }
            return Ok(contactViewModel);
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

                throw;
            }



        }

        [HttpDelete("CustomerContact/{id}")]
        [Produces(typeof(CustomercontactViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ContactRepository.GetSingleOrDefault(c => c.ContactId == id);
            var existingResultofcustomerContact = _unitOfWork.CustomerContact.GetSingleOrDefault(c => c.ContactId == id);
            _unitOfWork.CustomerContact.Remove(existingResultofcustomerContact);
            _unitOfWork.SaveChanges();
            _unitOfWork.ContactRepository.Remove(existingResult);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpPost("CustomerShippingPost")]
        public IActionResult CreateShipping([FromBody] CustomerShippingViewModel Customershipping, Address address, long? CustomerAddressid, CustomerShippingAdressViewModel customerShippingAdressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (Customershipping == null)
                    return BadRequest($"{nameof(Customershipping)} cannot be null");

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
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = Customershipping.CreatedBy;
                address.UpdatedBy = Customershipping.UpdatedBy;
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = Customershipping.IsActive;
                _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();
                long? id = address.AddressId;
                updateCusShipdetails(customerShippingAdressViewModel, id, Customershipping, address);
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
                CustomerObj.IsDelete = true;
                CustomerObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Repository<Customer>().Update(CustomerObj);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
              return  BadRequest();
            }
            
        }

        [HttpPut("customersUpdateforActive/{id}")]
        public IActionResult customersUpdateforActive(long id, [FromBody]CustomerViewModel Customershipping)
        {
            if (ModelState.IsValid)
            {
                var CustomerObj = _unitOfWork.Customer.GetSingleOrDefault(a => a.CustomerId == id);
                Customershipping.MasterCompanyId = 1;
                //Customershipping.IsActive = true;
                CustomerObj.IsActive = Customershipping.IsActive;
                CustomerObj.UpdatedDate = DateTime.Now;
                CustomerObj.UpdatedBy = Customershipping.UpdatedBy;
                CustomerObj.CustomerId = Customershipping.CustomerId;
                _unitOfWork.Customer.Update(CustomerObj);
                _unitOfWork.SaveChanges();
                return Ok(CustomerObj);
            }

            return Ok(ModelState);
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

        //[HttpPut("billingUpdateforActive/{id}")]
        //public IActionResult billingUpdateforActive(long id, [FromBody]CustomerBillingAddressViewModel cuBillingViewmodel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var CustomerBillingObj = _unitOfWork.CustomerBillingInformation.GetSingleOrDefault(a => a.CustomerBillingAddressId == id);
        //        cuBillingViewmodel.MasterCompanyId = 1;
        //      // CustomerBillingObj.IsActive = true;
        //       CustomerBillingObj.IsActive = cuBillingViewmodel.IsActive;
        //        CustomerBillingObj.UpdatedDate = DateTime.Now;
        //        CustomerBillingObj.UpdatedBy = cuBillingViewmodel.UpdatedBy;
        //        CustomerBillingObj.CustomerBillingAddressId = cuBillingViewmodel.CustomerBillingAddressId;
        //        _unitOfWork.CustomerBillingInformation.Update(CustomerBillingObj);
        //        _unitOfWork.SaveChanges();
        //        return Ok(CustomerBillingObj);
        //    }

        //    return Ok(ModelState);
        //}

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
                CustomerShippingAddressObj.CreatedDate = DateTime.Now;
                CustomerShippingAddressObj.UpdatedDate = DateTime.Now;
                CustomerShippingAddressObj.CreatedBy = Customershipping.CreatedBy;
                CustomerShippingAddressObj.UpdatedBy = Customershipping.UpdatedBy;
                _unitOfWork.CustomerShippingAddress.Add(CustomerShippingAddressObj);
                _unitOfWork.SaveChanges();
                long? venAddressid = CustomerShippingAddressObj.CustomerShippingAddressId;
                Customershipping.CustomerShippingId = CustomerShippingAddressObj.CustomerShippingAddressId;
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
                actionobject.IsActive = CustomerShippingDetailsViewModel.IsActive;
                actionobject.Memo = CustomerShippingDetailsViewModel.Memo;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = CustomerShippingDetailsViewModel.CreatedBy;
                actionobject.UpdatedBy = CustomerShippingDetailsViewModel.UpdatedBy;
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
                checkPaymentObj.IsDelete = true;
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
        //[HttpDelete("updateStatusCustomerBilling/{id}")]
        //[Produces(typeof(CustomerBillingAddressViewModel))]
        //public IActionResult updateStatusCustomerBilling(long id)
        //{
        //    var existingResult = _unitOfWork.CustomerBillingInformation.GetSingleOrDefault(c => c.CustomerBillingAddressId == id);
        //    var existingResultofcustomerBilling = _unitOfWork.CustomerContact.GetSingleOrDefault(c => c.ContactId == id);
        //    _unitOfWork.CustomerContact.Remove(existingResultofcustomerBilling);
        //    _unitOfWork.SaveChanges();
        //    _unitOfWork.CustomerBillingInformation.Remove(existingResult);
        //    _unitOfWork.SaveChanges();

        //    return Ok(id);
        //}

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
                    CustomerObject.IsActive = CustomerWarningViewModel[i].IsActive;
                    CustomerObject.CreatedDate = DateTime.Now;
                    CustomerObject.UpdatedDate = DateTime.Now;
                    CustomerObject.CreatedBy = CustomerWarningViewModel[i].CreatedBy;
                    CustomerObject.UpdatedBy = CustomerWarningViewModel[i].UpdatedBy;
                    CustomerObject.IsAllow = CustomerWarningViewModel[i].IsAllow;
                    _unitOfWork.CustomerWarning.Add(CustomerObject);
                    _unitOfWork.SaveChanges();
                    return Ok(CustomerObject);
                }
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
                var CustomerObject = _unitOfWork.CustomerWarning.GetSingleOrDefault(c => c.CustomerWarningId == id);

                for (int i = 0; i < CustomerWarningViewModel.Length; i++)
                {
                    CustomerWarningViewModel[i].MasterCompanyId = 1;
                    CustomerObject.CustomerId = CustomerWarningViewModel[i].CustomerId;
                    CustomerObject.Allow = CustomerWarningViewModel[i].Allow;
                    CustomerObject.SourceModule = CustomerWarningViewModel[i].SourceModule;
                    CustomerObject.Restrict = CustomerWarningViewModel[i].Restrict;
                    CustomerObject.Warning = CustomerWarningViewModel[i].Warning;
                    CustomerObject.WarningMessage = CustomerWarningViewModel[i].WarningMessage;
                    CustomerObject.RestrictMessage = CustomerWarningViewModel[i].RestrictMessage;
                    CustomerObject.MasterCompanyId = CustomerWarningViewModel[i].MasterCompanyId;
                    CustomerObject.IsActive = CustomerWarningViewModel[i].IsActive;
                    CustomerObject.CreatedDate = DateTime.Now;
                    //CustomerObject.IsActive = true;
                    CustomerObject.UpdatedDate = DateTime.Now;
                    CustomerObject.CreatedBy = CustomerWarningViewModel[i].CreatedBy;
                    CustomerObject.UpdatedBy = CustomerWarningViewModel[i].UpdatedBy;
                    CustomerObject.IsAllow = CustomerWarningViewModel[i].IsAllow;
                    CustomerObject.IsWarning = CustomerWarningViewModel[i].IsWarning;
                    CustomerObject.IsRestrict = CustomerWarningViewModel[i].IsRestrict;
                    _unitOfWork.CustomerWarning.Update(CustomerObject);
                    _unitOfWork.SaveChanges();
                    return Ok(CustomerObject);
                }
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
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = customerBillingAddressViewModel.CreatedBy;
                address.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = customerBillingAddressViewModel.IsActive;
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
                checkBillingObj.IsPrimary = customerBillingAddressViewModel.IsPrimary;
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
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerBillingInformation.Update(checkBillingObj);
                _unitOfWork.SaveChanges();
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
                checkBillingObj.IsPrimary = customerBillingAddressViewModel.IsPrimary;
                addressObj.Line1 = customerBillingAddressViewModel.Address1;
                addressObj.Line2 = customerBillingAddressViewModel.Address2;
                addressObj.Line3 = customerBillingAddressViewModel.Address3;
                addressObj.PostalCode = customerBillingAddressViewModel.PostalCode;
                addressObj.StateOrProvince = customerBillingAddressViewModel.StateOrProvince;
                addressObj.City = customerBillingAddressViewModel.City;
                addressObj.Country = customerBillingAddressViewModel.Country;
                addressObj.MasterCompanyId = 1;
                // addressObj.RecordCreateDate = DateTime.Now;

                //created by is not needed as the record is already created and the viewmodel returns null
                //addressObj.CreatedBy = customerBillingAddressViewModel.CreatedBy;

                addressObj.UpdatedBy = customerBillingAddressViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.CustomerShippingAddress.Update(checkBillingObj);
                _unitOfWork.SaveChanges();
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
                _unitOfWork.CustomerBillingInformation.Add(CustomerShippingAddressObj);
                _unitOfWork.SaveChanges();
                long? venAddressid = CustomerShippingAddressObj.CustomerBillingAddressId;
                cbs.CustomerBillingAddressId = CustomerShippingAddressObj.CustomerBillingAddressId;
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
                customerObj.CurrencyId = customerViewModel.CurrencyId;
                customerObj.Discount = customerViewModel.Discount;
                customerObj.DiscountId = customerViewModel.DiscountId;
                customerObj.EDIDescription = customerViewModel.EDIDescription;
                customerObj.IsAeroExchange = customerViewModel.IsAeroExchange;
                customerObj.IsTaxExempt = customerViewModel.IsTaxExempt;
                customerObj.AeroExchangeDescription = customerViewModel.AeroExchangeDescription;
                customerObj.AllowNettingOfAPAR = customerViewModel.AllowNettingOfAPAR;
                customerObj.MarkUpPercentageId = customerViewModel.MarkUpPercentageId;
                customerObj.MasterCompanyId = 1;
                customerObj.IsActive = true;
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
            // return Ok(ModelState);
        }
        //[HttpGet("GetAircarftmodelsdata/{id}")]
        //[Produces(typeof(List<CustomerAircraftModel>))]
        //public IActionResult GetAircarftmodelsdata(long id, CustomerAircraftModel customerAircraftModel)
        //{


        //    var allseectedaircarftmodels = _unitOfWork.customerAircraftModel.GetSelectedAircraftModeldata(id); //.GetAllCustomersData();
        //    return Ok(allseectedaircarftmodels);

        //}

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
                    CustomerAircraftMapping customerAircraftMapping = new CustomerAircraftMapping
                    {
                        AircraftType = customerAircraftMappingVM[i].AircraftType,
                        AircraftModel = customerAircraftMappingVM[i].AircraftModel,
                        DashNumber = customerAircraftMappingVM[i].DashNumber,
                        ModelNumber = customerAircraftMappingVM[i].ModelNumber,
                        AircraftModelId = customerAircraftMappingVM[i].AircraftModelId,
                        DashNumberId = customerAircraftMappingVM[i].DashNumberId,
                        Memo = customerAircraftMappingVM[i].Memo,
                        MasterCompanyId = customerAircraftMappingVM[i].MasterCompanyId,
                        CreatedBy = customerAircraftMappingVM[i].CreatedBy,
                        UpdatedBy = customerAircraftMappingVM[i].UpdatedBy,
                        CustomerId = customerAircraftMappingVM[i].CustomerId,
                        CreatedDate =  System.DateTime.Now,
                        UpdatedDate =  System.DateTime.Now,
                        IsDeleted = customerAircraftMappingVM[i].IsDeleted,
                        Inventory = customerAircraftMappingVM[i].Inventory,
                        AircraftTypeId = customerAircraftMappingVM[i].AircraftTypeId
                };
                    _unitOfWork.Repository<CustomerAircraftMapping>().Add(customerAircraftMapping);
                    _unitOfWork.SaveChanges();
                }
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

        #endregion

        #region ATA Chapter
        [HttpGet("getCustomerATAMapped/{customerId}")]
        [Produces(typeof(List<CustomerATAMapping>))]
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

        [HttpDelete("DeleteCustomerATAMapping/{id}")]
        public IActionResult DeleteCustomerATA(long id)
        {
            var existingResult = _unitOfWork.Repository<CustomerATAMapping>().GetSingleOrDefault(c => c.CustomerATAMappingId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<CustomerATAMapping>().Update(existingResult);
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

                    existingresule.CustomerId = itemMasterIntegrationPortal.CustomerId;
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
                    cp.CustomerId = itemMasterIntegrationPortal.CustomerId;
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

        [HttpGet("getMarkUpValues")]
        public IActionResult getAll()
        {
            var markUpPercentages = _unitOfWork.Repository<MarkUpPercentage>().GetAll().OrderByDescending(x => x.MarkUpPercentageId);
            return Ok(markUpPercentages);
        }

        [HttpPost("addMarkUp")]
        public IActionResult addasset([FromBody] MarkUpPercentage markUpPercentage)
        {
            if (markUpPercentage != null)
            {
                markUpPercentage.MarkUpPercentageId = 0;
                _context.MarkUpPercentage.Add(markUpPercentage);
                _context.SaveChanges();
            }
            return Ok(markUpPercentage);
        }

        [HttpPut("addMarkUp/{id}")]
        public IActionResult updateAsset([FromBody] MarkUpPercentage markUpPercentage)
        {
            _unitOfWork.Repository<MarkUpPercentage>().Update(markUpPercentage);
            _unitOfWork.SaveChanges();
            return Ok(markUpPercentage);
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
                throw;
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
                                 where t.IsDelete == false || t.IsDelete == null
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
                                     CustomerClarification= cc.Description
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
                                 where t.IsDelete == false || t.IsDelete == null
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
                queryable = _context.Customer.Where(c => (c.IsDelete == false || c.IsDelete == null))
                    .OrderByDescending(c => c.CustomerId).ToList().AsQueryable();
                // queryable = _context.Customer.Where(c => new[] { c.CustomerCode, c.Name, c.Email, c.PrimarySalesPersonFirstName }.Any(s => s.Contains(paginate.GlobalSearchString))).ToList().AsQueryable();
            }
            else
                queryable = _context.Customer.Where(c => (c.IsDelete == false || c.IsDelete == null))
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
           var result= _unitOfWork.Customer.GetCustomerInternationalShippingDetails(customerId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("internationalshippingdetailsbyid")]
        public IActionResult GetCustomerInternationalShippingDetailsById(long id)
        {
           var result= _unitOfWork.Customer.GetCustomerInternationalShippingDetailsById(id);
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
            var result =_unitOfWork.Customer.GetShippingViaDetails(internationalShippingId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("getshippingviadetailsbyid")]
        public IActionResult GetShippingViaDetailsById(long id)
        {
            var result = _unitOfWork.Customer.GetShippingViaDetailsById(id);
            return Ok(result);
        }

        [HttpGet("getrestrictedparts")]
        public IActionResult GetRestrictedParts(int moduleId, long? referenceId, string partType)
        {
          var result=  _unitOfWork.CommonRepository.GetRestrictedParts(moduleId, referenceId, partType);
            return Ok(result);
        }


        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<CustomerSearchViewModel> CustomerList { get; set; }
        }

        [HttpGet("searchGetCustomerATAMappedByMultiATAIDATASubID/{CustomerId}")]
        public IActionResult CustomerATAMappedList(long CustomerId, string ATAChapterId, string ATASubChapterID)
        {
            var result = _unitOfWork.Customer.searchgetCustomerATAMappingDataByMultiTypeIdATAIDATASUBID(CustomerId, ATAChapterId, ATASubChapterID);

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
        public IActionResult DocumentUploadAction([FromBody] CustomerViewModel customerViewModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    if (customerViewModel == null && Request.Form == null)
                        return BadRequest($"{nameof(customerViewModel)} cannot be null");
                    DAL.Models.Customer actionobject = new DAL.Models.Customer();
                    actionobject.CustomerId = customerViewModel.CustomerId;
                    customerViewModel.MasterCompanyId = 1;
                    actionobject.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, customerViewModel.CustomerId, Convert.ToInt32(ModuleEnum.Customer), Convert.ToString(ModuleEnum.Customer), customerViewModel.UpdatedBy, customerViewModel.MasterCompanyId);
                    return Ok(actionobject);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                throw;
            }
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


        #endregion



    }
}



