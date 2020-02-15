using AutoMapper;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
        public class LegalEntityController : Controller
        {

        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public LegalEntityController(IUnitOfWork unitOfWork, ILogger<LegalEntityController> logger, IEmailer emailer,  ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("LegalEntity", id); 
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

        [HttpGet("legalEntityAccountsById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetLegalEntityAccountsById(long id)
        {
            var accountsData = _unitOfWork.itemMaster.getLegalEntityAccountsData(id);
            return Ok(accountsData);
        }

        [HttpGet("Get")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult Get()
        {
            var allentity = _unitOfWork.LegalEntity.GetAllLegalEntityData();
            return Ok(allentity);

        }

        [HttpGet("ParentEntities")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetParentEntities()
        {
            var allentity = _unitOfWork.LegalEntity.GetParentEntities();
            return Ok(allentity);

        }


        [HttpGet("getEntitydatabyid/{entityId}")]
        public IActionResult GetEntityDataById(long entityId)
        {
            var allEntitylistDetails = _unitOfWork.LegalEntity.GetEntityDataById(entityId);
            return Ok(allEntitylistDetails);

        }

        [HttpGet("GetforEdigt")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetforEdigt()
        {
            var allentity = _unitOfWork.itemMaster.getLegalEntityData();
            //return Ok(Mapper.Map<IEnumerable<LegalEntityViewModel>>(allentity));
            return Ok(allentity);

        }

        [HttpPost("legalEntitypost")]
        public IActionResult CreateAction([FromBody] LegalEntityViewModel legalEntityViewModel)
        {
            if (ModelState.IsValid)
            {
                if (legalEntityViewModel == null)
                    return BadRequest($"{nameof(legalEntityViewModel)} cannot be null");
                
                LegalEntity entityobject = new LegalEntity();

                entityobject.Name = legalEntityViewModel.Name;
                entityobject.Description = legalEntityViewModel.Description;
                entityobject.DoingLegalAs = legalEntityViewModel.DoingLegalAs;
                entityobject.AddressId = legalEntityViewModel.AddressId ==null ? null : legalEntityViewModel.AddressId;
                entityobject.PhoneNumber1 = legalEntityViewModel.PhoneNumber1;
                entityobject.FaxNumber = legalEntityViewModel.FaxNumber;
                entityobject.FunctionalCurrencyId = legalEntityViewModel.FunctionalCurrencyId;
                entityobject.ReportingCurrencyId = legalEntityViewModel.ReportingCurrencyId;
                entityobject.IsBalancingEntity = legalEntityViewModel.IsBalancingEntity;
                entityobject.CageCode = legalEntityViewModel.CageCode;
                entityobject.FAALicense = legalEntityViewModel.FAALicense;
                entityobject.TaxId = legalEntityViewModel.TaxId;
                entityobject.ParentId = legalEntityViewModel.ParentId == null ? null : legalEntityViewModel.ParentId;
                entityobject.MasterCompanyId = legalEntityViewModel.MasterCompanyId;
                entityobject.CreatedBy = legalEntityViewModel.CreatedBy;
                entityobject.UpdatedBy = legalEntityViewModel.UpdatedBy;
                entityobject.CreatedDate = DateTime.Now;
                entityobject.UpdatedDate = DateTime.Now;
                entityobject.IsDeleted = false;
                entityobject.IsActive = true;
                entityobject.LedgerName = legalEntityViewModel.LedgerName;
                //entityobject.EntityLogo = legalEntityViewModel.EntityLogo;

                AddAddress(legalEntityViewModel);

                entityobject.AddressId = entityobject.AddressId.Value;

                _unitOfWork.LegalEntity.Add(entityobject);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult AddAddress(LegalEntityViewModel legalEntityViewModel)
        {
            Address address = new Address();
            address.Line1 = legalEntityViewModel.Address1;
            address.Line2 = legalEntityViewModel.Address2;
            address.PostalCode = legalEntityViewModel.PostalCode;
            address.StateOrProvince = legalEntityViewModel.StateOrProvince;
            address.City = legalEntityViewModel.City;
            address.Country = legalEntityViewModel.Country;
            address.MasterCompanyId = 1;
            address.IsActive = true;
            address.CreatedBy = legalEntityViewModel.CreatedBy;
            address.UpdatedBy = legalEntityViewModel.UpdatedBy;
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            _unitOfWork.Address.Add(address);
            _unitOfWork.SaveChanges();
            legalEntityViewModel.AddressId = address.AddressId.Value;
            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult UpdateToParent(LegalEntity legalEntityViewModel)
        {
            var existingresult = _context.LegalEntity.Where(a => a.LegalEntityId == legalEntityViewModel.LegalEntityId).SingleOrDefault();
            existingresult.ParentId = legalEntityViewModel.LegalEntityId;
            _context.LegalEntity.Update(existingresult);      
            _context.SaveChanges();
            return Ok(ModelState);
        }

        [HttpPut("legalEntitypost/{id}")]
        public IActionResult UpdateLegalEntityDetails([FromBody] LegalEntityViewModel legalEntityViewModel)
        {
            if (legalEntityViewModel != null)
            {
                var entityobject = _context.LegalEntity.Where(a => a.LegalEntityId == legalEntityViewModel.LegalEntityId).SingleOrDefault();
                if (entityobject != null)
                {
                    var address = _context.Address.Where(a => a.AddressId == entityobject.AddressId).SingleOrDefault();
                    var ach = _context.ACH.Where(a => a.ACHId == entityobject.ACHId).SingleOrDefault();
                    entityobject.MasterCompanyId = 1;
                    entityobject.ParentId = legalEntityViewModel.ParentId;
                    entityobject.Name = legalEntityViewModel.Name;
                    entityobject.Description = legalEntityViewModel.Description;
                    entityobject.DoingLegalAs = legalEntityViewModel.DoingLegalAs;
                    entityobject.CageCode = legalEntityViewModel.CageCode;
                    entityobject.FAALicense = legalEntityViewModel.FAALicense;
                    entityobject.FunctionalCurrencyId = legalEntityViewModel.FunctionalCurrencyId;
                    entityobject.FaxNumber = legalEntityViewModel.FaxNumber;
                    entityobject.PhoneNumber1 = legalEntityViewModel.PhoneNumber1;
                    entityobject.IsBalancingEntity = legalEntityViewModel.IsBalancingEntity;
                    entityobject.ReportingCurrencyId = legalEntityViewModel.ReportingCurrencyId;
                    entityobject.LedgerName = legalEntityViewModel.LedgerName;
                    entityobject.TaxId = legalEntityViewModel.TaxId;
                    entityobject.CreatedDate = DateTime.Now;
                    entityobject.UpdatedDate = DateTime.Now;
                    entityobject.CreatedBy = legalEntityViewModel.CreatedBy;
                    entityobject.UpdatedBy = legalEntityViewModel.UpdatedBy;
                   // entityobject.EntityLogo = legalEntityViewModel.EntityLogo;

                    if (address != null) {
                        address.Line1 = legalEntityViewModel.Address1;
                        address.Line2 = legalEntityViewModel.Address2;
                        address.PostalCode = legalEntityViewModel.PostalCode;
                        address.City = legalEntityViewModel.City;
                        address.StateOrProvince = legalEntityViewModel.StateOrProvince;
                        address.Country = legalEntityViewModel.Country;
                        address.MasterCompanyId = 1;
                        address.CreatedBy = legalEntityViewModel.CreatedBy;
                        address.UpdatedBy = legalEntityViewModel.UpdatedBy;
                        address.CreatedDate = DateTime.Now;
                        address.UpdatedDate = DateTime.Now;
                        address.PoBox = legalEntityViewModel.PoBox;
                        _unitOfWork.Address.Update(address);
                        _unitOfWork.SaveChanges();
                    }
                   
                   // if (ach != null)
                   //{
                   //     ach.IsActive = true;
                   //     ach.MasterCompanyId = 1;
                   //     ach.ABA = legalEntityViewModel.AchABANumber;
                   //     ach.AccountNumber = legalEntityViewModel.AchBankAccountNumber;
                   //     ach.BankName = legalEntityViewModel.AchBankName;
                   //     ach.BeneficiaryBankName = legalEntityViewModel.AchBenficiaryBankName;
                   //     ach.IntermediateBankName = legalEntityViewModel.AchIntermediateBank;
                   //     ach.SwiftCode = legalEntityViewModel.AchSWIFTID;
                   //     ach.CreatedDate = DateTime.Now;
                   //     ach.UpdatedDate = DateTime.Now;
                   //     ach.CreatedBy = legalEntityViewModel.CreatedBy;
                   //     ach.UpdatedBy = legalEntityViewModel.UpdatedBy;
                   //     _context.ACH.Update(ach);
                   //     _unitOfWork.SaveChanges();
                        
                   // }

                    _context.LegalEntity.Update(entityobject);
                    _context.SaveChanges();
                }
            }
            return Ok(ModelState);
         }

        [HttpPost("managementEntitypost")]
        public IActionResult CreateManagement([FromBody] ManagementStructureViewModel managementStructureViewModel, Address address)
        {
            ManagementStructure managementStructure = new ManagementStructure();
            managementStructure.Code = managementStructureViewModel.Code;
            managementStructure.Description = managementStructureViewModel.Description;

            _context.ManagementStructure.Add(managementStructure);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        [HttpPut("deleteLegalEntity/{id}")]
        public IActionResult UpdateLegalEntiyStatus(long id)
        {
           
                var entityobject = _context.LegalEntity.Where(a => a.LegalEntityId == id).SingleOrDefault();
                if (entityobject != null)
                {
                    entityobject.IsDeleted = true;
                    _context.LegalEntity.Update(entityobject);
                    _context.SaveChanges();
                }
            
            return Ok(ModelState);

        }

        [HttpPut("UpdateActive")]
        public IActionResult updatereceivingLegalEntity([FromBody] LegalEntity legalEntity)
        {
            if (ModelState.IsValid)
            {
                legalEntity.MasterCompanyId = 1;
                legalEntity.UpdatedDate = DateTime.Now;
                _unitOfWork.Repository<LegalEntity>().Update(legalEntity);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }

        }


        [HttpPost("createlegalentitybillingaddress")]
        public IActionResult CreateLegalEntityBillingAddress([FromBody] LegalEntityBillingAddress billingAddress)
        {
            if (ModelState.IsValid)
            {
                billingAddress.LegalEntityBillingAddressId = _unitOfWork.LegalEntity.CreateLegalEntityBillingAddress(billingAddress);
                return Ok(billingAddress);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatelegalentitybillingaddress")]
        public IActionResult UpdateLegalEntityBillingAddress([FromBody] LegalEntityBillingAddress billingAddress)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.LegalEntity.UpdateLegalEntityBillingAddress(billingAddress);
                return Ok(billingAddress);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("deletelegalentitybillingaddress")]
        public IActionResult DeleteLegalEntityBillingAddress(long billingAddressId, string updatedBy)
        {
            _unitOfWork.LegalEntity.DeleteLegalEntityBillingAddress(billingAddressId, updatedBy);
            return Ok();
        }

        [HttpGet("legalentitybillingaddressstatus")]
        public IActionResult LegalEntityBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            _unitOfWork.LegalEntity.LegalEntityBillingAddressStatus(billingAddressId, status, updatedBy);
            return Ok();
        }

        [HttpGet("legalentitybillingaddress")]
        public IActionResult GetLegalEntityBillingAddress()
        {
            _unitOfWork.LegalEntity.GetLegalEntityBillingAddress();
            return Ok();
        }

        [HttpGet("legalentitybillingaddressbyid")]
        public IActionResult LegalEntityBillingAddressById(long billingAddressId)
        {
            _unitOfWork.LegalEntity.LegalEntityBillingAddressById(billingAddressId);
            return Ok();
        }


        [HttpPost("createlegalentityshippingaddress")]
        public IActionResult CreateLegalEntityshippingAddress([FromBody] LegalEntityShippingAddress shippingAddress)
        {
            if (ModelState.IsValid)
            {
                shippingAddress.LegalEntityShippingAddressId = _unitOfWork.LegalEntity.CreateLegalEntityShippingAddress(shippingAddress);
                return Ok(shippingAddress);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatelegalentityshippingaddress")]
        public IActionResult UpdateLegalEntityshippingAddress([FromBody] LegalEntityShippingAddress shippingAddress)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.LegalEntity.UpdateLegalEntityShippingAddress(shippingAddress);
                return Ok(shippingAddress);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("deletelegalentityshippingaddress")]
        public IActionResult DeleteLegalEntityshippingAddress(long shippingAddressId, string updatedBy)
        {
            _unitOfWork.LegalEntity.DeleteLegalEntityShippingAddress(shippingAddressId, updatedBy);
            return Ok();
        }

        [HttpGet("legalentityshippingaddressstatus")]
        public IActionResult LegalEntityshippingAddressStatus(long shippingAddressId, bool status, string updatedBy)
        {
            _unitOfWork.LegalEntity.LegalEntityShippingAddressStatus(shippingAddressId, status, updatedBy);
            return Ok();
        }

        [HttpGet("legalentityshippingaddresslist")]
        public IActionResult GetLegalEntityshippingAddress()
        {
            _unitOfWork.LegalEntity.GetLegalEntityShippingAddress();
            return Ok();
        }

        [HttpGet("legalentityshippingaddressbyid")]
        public IActionResult LegalEntityshippingAddressById(long shippingAddressId)
        {
            _unitOfWork.LegalEntity.LegalEntityShippingAddressById(shippingAddressId);
            return Ok();
        }

        [HttpGet("legalentitysitenames")]
        public IActionResult GetLegalEntitySiteNames(long legalEntityId)
        {
            var result = _unitOfWork.LegalEntity.GetLegalEntitySiteNames(legalEntityId);
            return Ok(result);
        }

        [HttpGet("ChildentitiesByParentId/{parentId}")]
        public IActionResult GetChildentitiesByParentId(long parentId)
        {
            var result = _unitOfWork.LegalEntity.GetChildEntitiesByParentId(parentId);
            return Ok(result);
        }

        [HttpGet("legalentityaddress")]
        public IActionResult GetLegalEntityAddress(long addressId)
        {
            var result = _unitOfWork.LegalEntity.GetLegalEntityAddress(addressId);
            return Ok(result);
        }

        [HttpGet("legalentitycontacts")]
        public IActionResult GetLegalEntityContacts(long legalEntityId)
        {
            var result = _unitOfWork.LegalEntity.GetLegalEntityContacts(legalEntityId);
            return Ok(result);
        }

		[HttpGet("legalentityshippingsitenames")]
		public IActionResult GetLegalEntityShippingSiteNames(long legalEntityId)
		{
			var result = _unitOfWork.LegalEntity.GetLegalEntityShippingSiteNames(legalEntityId);
			return Ok(result);
		}

		[HttpGet("legalentityshippingaddress")]
		public IActionResult GetLegalEntityShippingAddress(long addressId)
		{
			var result = _unitOfWork.LegalEntity.GetLegalEntityShippingAddress(addressId);
			return Ok(result);
		}

        [HttpGet("legalentityaddressbyid/{legalentityid}")]
        public IActionResult GetLegalEntityAddressById(long legalEntityId)
        {
            var allVendShipdetails = _unitOfWork.LegalEntity.GetLegalEntityAddressById(legalEntityId); 
            return Ok(allVendShipdetails);

        }


        [HttpGet("legalEntityAddressGet/{id}")]
        [Produces(typeof(List<LegalEntityBillingAddress>))]
        public IActionResult LegalEntityAddressGet(long id, LegalEntityBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.LegalEntityBillingInformation.GetAllLegalEntityBillingDetails(id); 
            return Ok(allCusbilldetails);

        }

        [HttpGet("getLegalEntityBillViaDetails/{id}")]
        [Produces(typeof(List<LegalEntityBillingAddress>))]
        public IActionResult getLegalEntityBillViaDetails(long id, LegalEntityBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.LegalEntityBillingInformation.GetAllLegalEntityBillingDetails(id); 
            return Ok(allCusbilldetails);

        }

        [HttpGet("legalEntityshippingGet/{id}")]
        [Produces(typeof(List<LegalEntityBillingAddress>))]
        public IActionResult legalEntityshippingGet(long id, LegalEntityBillingAddress cstomerBillingAddress)
        {
            var allCusbilldetails = _unitOfWork.LegalEntityShippingAddress.GetAllShippingAddressDetails(id); 
            return Ok(allCusbilldetails);
        }


        [HttpGet("AddressGet")]
        [Produces(typeof(List<Address>))]
        public IActionResult GetAddress()
        {
            var alladdresses = _unitOfWork.Address.GetAddresses(); //.GetAllLegalEntitysData();
            return Ok(alladdresses);

        }

        [HttpPost("insertToAuditaddress")]
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
       
        
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult UpdateAddress(LegalEntityViewModel LegalEntityViewModel, long addressId)
        {
            var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == addressId);

            address.Line1 = LegalEntityViewModel.Address1;
            address.Line2 = LegalEntityViewModel.Address2;
            address.PostalCode = LegalEntityViewModel.PostalCode;
            address.StateOrProvince = LegalEntityViewModel.StateOrProvince;
            address.City = LegalEntityViewModel.City;
            address.Country = LegalEntityViewModel.Country;
            address.MasterCompanyId = 1;
            address.IsActive = true;
            address.CreatedBy = LegalEntityViewModel.CreatedBy;
            address.UpdatedBy = LegalEntityViewModel.UpdatedBy;
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
            ContactViewModel contactViewModel1 = new ContactViewModel();
            return Ok(contactViewModel1);

        }

        [HttpGet("fianlContactEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getFianlContactEmptyObj(ContactViewModel contactViewModel)
        {
            return Ok(contactViewModel);

        }

        [HttpGet("paymentEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getPaymentEmptyObj(ContactViewModel contactViewModel)
        {
            return Ok(contactViewModel);

        }

        [HttpGet("generalEmptyObj")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult getGeneralEmptyObj(LegalEntityViewModel entityViewModel)
        {
            return Ok(entityViewModel);
        }

        [HttpGet("getLegalEntityShipViaDetails/{Selectedrow}")]
        [Produces(typeof(List<LegalEntityShipping>))]
        public IActionResult getLegalEntityShipViaDetails(long Selectedrow)
        {
            var allShipViaDetails = _unitOfWork.LegalEntityShippingAddress.GetAllShipViaDetails(Selectedrow); 
            return Ok(allShipViaDetails);
        }

        [HttpGet("ContactGet/{contactId}")]
        [Produces(typeof(List<Contact>))]
        public IActionResult Contactget(long contactId)
        {
            var allContacts = _unitOfWork.ContactRepository.GetLegalEntityContacts(contactId); 
            return Ok(allContacts);
        }

        [HttpGet("ContactCompleteGet")]
        [Produces(typeof(List<Contact>))]
        public IActionResult ContactCompleteget()
        {
            var allContacts = _unitOfWork.ContactRepository.GetCompleteContacts(); 
            return Ok(allContacts);

        }

        [HttpPost("LegalEntityContactPost")]
        public IActionResult CreateContact([FromBody] ContactViewModel contactViewModel, LegalEntityContactViewModel LegalEntitycontactViewModel)
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
        public IActionResult CreateLegalEntityContact([FromBody] LegalEntityContactViewModel LegalEntityContactViewModel)
        {

            Contact data;
            if (ModelState.IsValid)
            {
                if (LegalEntityContactViewModel == null)
                    return BadRequest($"{nameof(LegalEntityContactViewModel)} cannot be null");
                CustomerContact contactObj = new CustomerContact();
                LegalEntityContactViewModel.MasterCompanyId = 1;
                contactObj.ContactId = LegalEntityContactViewModel.ContactId;
                contactObj.CustomerId = LegalEntityContactViewModel.LegalEntityId;
                contactObj.MasterCompanyId = LegalEntityContactViewModel.MasterCompanyId;
                contactObj.IsActive = LegalEntityContactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.IsDeleted = false;
                contactObj.CreatedBy = LegalEntityContactViewModel.CreatedBy;
                contactObj.UpdatedBy = LegalEntityContactViewModel.UpdatedBy;

                if (LegalEntityContactViewModel.IsDefaultContact == true)
                {
                    var customerContact = _context.CustomerContact.Where(p => p.CustomerId == LegalEntityContactViewModel.LegalEntityId && p.IsDefaultContact == true).FirstOrDefault();

                    if (customerContact != null)
                    {

                        customerContact.IsDefaultContact = false;
                        customerContact.UpdatedDate = DateTime.Now;
                        _context.CustomerContact.Update(customerContact);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(customerContact.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(customerContact.CustomerContactId), LegalEntityContactViewModel.UpdatedBy);
                    }
                }
                contactObj.IsDefaultContact = LegalEntityContactViewModel.IsDefaultContact;
                _unitOfWork.CustomerContact.Add(contactObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(contactObj.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(contactObj.CustomerContactId), LegalEntityContactViewModel.UpdatedBy);
            }
            return Ok(ModelState);
        }

        [HttpPut("LegalEntityContactPost/{id}")]
        public IActionResult updateContact(long id, [FromBody] ContactViewModel contactViewModel, LegalEntityContactViewModel LegalEntitycontactView)
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
                /*Update LegalEntity Contacts*/


                var LegalEntityContact = _context.LegalEntityContact.Where(p => p.ContactId == id).FirstOrDefault();

                if (contactViewModel.IsDefaultContact == true)
                {
                    var LegalEntityContacts = _context.LegalEntityContact.Where(p => p.LegalEntityId == LegalEntityContact.LegalEntityId).ToList();

                    if (LegalEntityContacts != null && LegalEntityContacts.Count > 0)
                    {
                        foreach (var item in LegalEntityContacts)
                        {
                            item.IsDefaultContact = false;
                            _context.LegalEntityContact.Update(item);
                            _context.SaveChanges();
                        }
                    }

                }

                if (LegalEntityContact != null)
                {
                    LegalEntityContact.UpdatedDate = DateTime.Now;
                    LegalEntityContact.UpdatedBy = contactViewModel.UpdatedBy;
                    LegalEntityContact.IsDefaultContact = contactViewModel.IsDefaultContact;
                    _unitOfWork.LegalEntityContact.Update(LegalEntityContact);
                    _unitOfWork.SaveChanges();
                    _unitOfWork.CommonRepository.CreateContactHistory(contactViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityContact.LegalEntityId), Convert.ToInt64(LegalEntityContact.LegalEntityContactId));
                }

            }
            return Ok(contactViewModel);
        }

        [HttpGet("LegalEntitycontactauditdetails")]
        public IActionResult GetAuditHistoryById(long LegalEntitycontactId, long LegalEntityId)
        {
            try
            {
                var result = _unitOfWork.CommonRepository.GetContactAudit(LegalEntityId, Convert.ToInt32(ModuleEnum.LegalEntity), LegalEntitycontactId);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("getEntityContactHistroty/{id}", Name = "getEntityContactHistroty")]
        [Produces(typeof(List<AuditHistory>))]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult getContactHistroty(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Contact", id); //.GetAllLegalEntitysData();
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

        [HttpDelete("LegalEntityContact/{id}")]
        [Produces(typeof(LegalEntityContactViewModel))]
        public IActionResult DeleteAction(long id, string updatedBy)
        {

            LegalEntityContact model = new LegalEntityContact();
            model.LegalEntityContactId = id;
            model.UpdatedDate = DateTime.Now;
            model.IsDeleted = true;
            model.UpdatedBy = updatedBy;

            _context.LegalEntityContact.Attach(model);

            _context.Entry(model).Property(x => x.IsDeleted).IsModified = true;
            _context.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
            return Ok();


        }
        [HttpPost("LegalEntityShippingPost")]
        public IActionResult CreateShipping([FromBody] LegalEntityShippingViewModel LegalEntityshipping, Address address, long? LegalEntityAddressid, LegalEntityShippingAdressViewModel LegalEntityShippingAdressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityshipping == null)
                    return BadRequest($"{nameof(LegalEntityshipping)} cannot be null");

                long? id = 0;

                LegalEntityshipping.MasterCompanyId = 1;
                LegalEntityshipping.IsActive = true;
                LegalEntityShippingAdressViewModel.IsActive = true;
                LegalEntityshipping.CreatedBy = LegalEntityshipping.CreatedBy;
                LegalEntityshipping.UpdatedBy = LegalEntityshipping.UpdatedBy;
                LegalEntityshipping.CreatedDate = DateTime.Now;
                LegalEntityshipping.UpdatedDate = DateTime.Now;

                address.Line1 = LegalEntityshipping.Address1;
                address.Line2 = LegalEntityshipping.Address2;
                address.Line3 = LegalEntityshipping.Address3;
                address.City = LegalEntityshipping.City;
                address.StateOrProvince = LegalEntityshipping.StateOrProvince;
                address.PostalCode = LegalEntityshipping.PostalCode;
                address.Country = LegalEntityshipping.Country;
                address.MasterCompanyId = 1;
                address.CreatedBy = LegalEntityshipping.CreatedBy;
                address.UpdatedBy = LegalEntityshipping.UpdatedBy;

                address.UpdatedDate = DateTime.Now;
                address.IsActive = LegalEntityshipping.IsActive;



                if (LegalEntityshipping.AddressId > 0)
                {
                    address.CreatedDate = LegalEntityshipping.CreatedDate;
                    address.AddressId = LegalEntityshipping.AddressId;
                    _unitOfWork.Address.Update(address);
                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _unitOfWork.Address.Add(address);
                }
                _unitOfWork.SaveChanges();
                updateEntityShipdetails(LegalEntityShippingAdressViewModel, address.AddressId, LegalEntityshipping, address);
                return Ok(LegalEntityshipping);
            }

            return Ok(ModelState);
        }

        [HttpGet("updatelistStatus/{id}")]
        public IActionResult DeleteLegalEntity(long id)
        {

            var LegalEntityObj = _unitOfWork.Repository<LegalEntity>().Find(x => x.LegalEntityId == id).FirstOrDefault();
            if (LegalEntityObj != null)
            {
                LegalEntityObj.IsDeleted = true;
                LegalEntityObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Repository<LegalEntity>().Update(LegalEntityObj);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost("List")]
        public IActionResult GetList([FromBody] Filters<LegalEntityFilters> LegalEntityFilters)
        {
            var result = _unitOfWork.LegalEntity.GetList(LegalEntityFilters);
            return Ok(result);

        }
        [HttpGet("ListGlobalSearch")]

        public IActionResult GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {
            var result = _unitOfWork.LegalEntity.GetListGlobalFilter(value, pageNumber, pageSize);
            return Ok(result);
        }

        //[HttpGet("LegalEntitysUpdateforActive")]
        //public IActionResult LegalEntityStatus(long LegalEntityId, bool status, string updatedBy)
        //{
        //    _unitOfWork.LegalEntity.LegalEntityStatus(LegalEntityId, status, updatedBy);
        //    return Ok();

        //}
        [HttpPut("shippingUpdateforActive/{id}")]
        public IActionResult shippingUpdateforActive(long id, [FromBody]LegalEntityShippingAdressViewModel LegalEntityshipping)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityshipping == null)
                    return BadRequest($"{nameof(LegalEntityshipping)} cannot be null");
                var LegalEntityObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(a => a.LegalEntityShippingAddressId == id);
                LegalEntityshipping.MasterCompanyId = 1;
                //LegalEntityObj.IsActive = true;
                LegalEntityObj.IsActive = LegalEntityshipping.IsActive;
                LegalEntityObj.UpdatedDate = DateTime.Now;
                LegalEntityObj.UpdatedBy = LegalEntityshipping.UpdatedBy;
                LegalEntityObj.LegalEntityShippingAddressId = LegalEntityshipping.LegalEntityShippingAddressId;
                _unitOfWork.LegalEntityShippingAddress.Update(LegalEntityObj);
                _unitOfWork.SaveChanges();
                return Ok(LegalEntityObj);
            }

            return Ok(ModelState);
        }


        [HttpPost("updateShipping")]
        public IActionResult updateShipping([FromBody]LegalEntityShippingViewModel LegalEntityshipping, Address address, long? LegalEntityAddressid, LegalEntityShippingViewModel LegalEntityShippingAdressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityshipping == null)
                    return BadRequest($"{nameof(LegalEntityshipping)} cannot be null");
                LegalEntityShippingAddress LegalEntityObj = new LegalEntityShippingAddress();
                LegalEntityshipping.MasterCompanyId = 1;
                // LegalEntityObj.IsActive = true;
                LegalEntityObj.IsActive = LegalEntityshipping.IsActive;
                LegalEntityObj.IsPrimary = LegalEntityshipping.IsPrimary;
                LegalEntityObj.CreatedDate = DateTime.Now;
                LegalEntityObj.UpdatedDate = DateTime.Now;
                LegalEntityObj.CreatedBy = LegalEntityshipping.CreatedBy;
                LegalEntityObj.UpdatedBy = LegalEntityshipping.UpdatedBy;
                LegalEntityObj.LegalEntityId = LegalEntityshipping.LegalEntityId;
                //updateVendorShippingAddress(vendorShippingAdressViewModel, id, vendorshipping, address);
                _unitOfWork.LegalEntityShippingAddress.Add(LegalEntityObj);
                _unitOfWork.SaveChanges();
                return Ok(LegalEntityObj);
            }

            return Ok(ModelState);
        }
        [HttpPost("LegalEntityShippingAddressDetails")]
        public IActionResult updateLegalEntityShippingAddress([FromBody] LegalEntityShippingViewModel LegalEntityshippingViewModel, long? id, LegalEntityShippingViewModel LegalEntityshipping, Address address)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityshippingViewModel == null)
                    return BadRequest($"{nameof(LegalEntityshippingViewModel)} cannot be null");
                LegalEntityShippingAddress LegalEntityShippingAddressObj = new LegalEntityShippingAddress();
                LegalEntityShippingAddressObj.IsActive = true;
                LegalEntityShippingAddressObj.IsPrimary = LegalEntityshipping.IsPrimary;
                LegalEntityShippingAddressObj.LegalEntityId = LegalEntityshipping.LegalEntityId;
                LegalEntityShippingAddressObj.MasterCompanyId = 1;
                LegalEntityShippingAddressObj.IsActive = LegalEntityshipping.IsActive;
                LegalEntityShippingAddressObj.CreatedDate = DateTime.Now;
                LegalEntityShippingAddressObj.UpdatedDate = DateTime.Now;
                LegalEntityShippingAddressObj.CreatedBy = LegalEntityshipping.CreatedBy;
                LegalEntityShippingAddressObj.UpdatedBy = LegalEntityshipping.UpdatedBy;
                _unitOfWork.LegalEntityShippingAddress.Add(LegalEntityShippingAddressObj);
                _unitOfWork.SaveChanges();
                long? venAddressid = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
                LegalEntityshipping.LegalEntityShippingAddressId = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
                //updateShipping(vendorshipping, address, venAddressid, LegalEntityShippingViewModel);
                return Ok(LegalEntityShippingAddressObj);


            }

            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult updateEntityShipdetails([FromBody] LegalEntityShippingAdressViewModel LegalEntityshippingViewModel, long? id, LegalEntityShippingViewModel LegalEntityshipping, Address address)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityshippingViewModel == null)
                    return BadRequest($"{nameof(LegalEntityshippingViewModel)} cannot be null");
                LegalEntityShippingAddress LegalEntityShippingAddressObj = new LegalEntityShippingAddress();
                LegalEntityShippingAddressObj.IsActive = true;
                LegalEntityShippingAddressObj.LegalEntityId = LegalEntityshipping.LegalEntityId;
                LegalEntityShippingAddressObj.AddressId = id;
                LegalEntityShippingAddressObj.SiteName = LegalEntityshipping.SiteName;
                LegalEntityShippingAddressObj.ExportLicenseNumber = LegalEntityshipping.ExportLicenseNumber;
                LegalEntityShippingAddressObj.Description = LegalEntityshipping.Description;
                LegalEntityShippingAddressObj.StartDate = LegalEntityshipping.StartDate;
                LegalEntityShippingAddressObj.ExpirationDate = LegalEntityshipping.ExpirationDate;
                LegalEntityShippingAddressObj.Amount = LegalEntityshipping.Amount;
                LegalEntityShippingAddressObj.MasterCompanyId = 1;
                //LegalEntityShippingAddressObj.IsActive = LegalEntityshipping.IsActive;

                LegalEntityShippingAddressObj.UpdatedDate = DateTime.Now;
                LegalEntityShippingAddressObj.CreatedBy = LegalEntityshipping.CreatedBy;
                LegalEntityShippingAddressObj.UpdatedBy = LegalEntityshipping.UpdatedBy;



                if (LegalEntityshipping.IsPrimary == true)
                {
                    LegalEntityShippingAddress shippingAddress = new LegalEntityShippingAddress();
                    shippingAddress = _context.LegalEntityShippingAddress.Where(p => p.LegalEntityId == LegalEntityshipping.LegalEntityId && p.IsPrimary == true).FirstOrDefault();

                    if (shippingAddress != null && shippingAddress.LegalEntityShippingAddressId != LegalEntityshipping.LegalEntityShippingAddressId)
                    {
                        shippingAddress.IsPrimary = false;
                        _context.LegalEntityShippingAddress.Update(shippingAddress);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.CreateHistory(
             shippingAddress, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityshipping.LegalEntityId), Convert.ToInt64(shippingAddress.LegalEntityShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);
                    }
                }

                LegalEntityShippingAddressObj.IsPrimary = LegalEntityshipping.IsPrimary;
                //LegalEntityShippingAddressObj.IsPrimary = false;

                if (LegalEntityshipping.LegalEntityShippingAddressId > 0)
                {
                    LegalEntityShippingAddressObj.CreatedDate = LegalEntityshipping.CreatedDate;
                    LegalEntityShippingAddressObj.LegalEntityShippingAddressId = LegalEntityshipping.LegalEntityShippingAddressId;
                    _unitOfWork.LegalEntityShippingAddress.Update(LegalEntityShippingAddressObj);
                }
                else
                {
                    LegalEntityShippingAddressObj.CreatedDate = DateTime.Now;
                    _unitOfWork.LegalEntityShippingAddress.Add(LegalEntityShippingAddressObj);
                }



                _unitOfWork.SaveChanges();
                long? venAddressid = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
                LegalEntityshipping.LegalEntityShippingId = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
                _unitOfWork.CommonRepository.CreateHistory(
             LegalEntityshipping, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityshipping.LegalEntityId), Convert.ToInt64(LegalEntityshipping.LegalEntityShippingId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);

                //updateShipping(vendorshipping, address, venAddressid, LegalEntityShippingViewModel);
                return Ok(LegalEntityShippingAddressObj);
            }
            return Ok(ModelState);
        }

        [HttpPut("updateShipAddress/{id}")]
        public IActionResult saveShipDetails(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityShippingViewModel == null)
                    return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == LegalEntityShippingViewModel.LegalEntityShippingAddressId);
                checkPaymentObj.IsActive = true;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
                checkPaymentObj.SiteName = LegalEntityShippingViewModel.SiteName;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                addressObj.Line1 = LegalEntityShippingViewModel.Address1;
                addressObj.Line2 = LegalEntityShippingViewModel.Address2;
                addressObj.Line3 = LegalEntityShippingViewModel.Address3;
                addressObj.PostalCode = LegalEntityShippingViewModel.PostalCode;
                addressObj.StateOrProvince = LegalEntityShippingViewModel.StateOrProvince;
                addressObj.City = LegalEntityShippingViewModel.City;
                addressObj.Country = LegalEntityShippingViewModel.Country;
                addressObj.MasterCompanyId = 1;
                // addressObj.RecordCreateDate = DateTime.Now;
                addressObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.LegalEntityShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("addShipViaDetails")]
        public IActionResult CreateShipViaDetails([FromBody]  LegalEntityShippingViewModel LegalEntityShippingDetailsViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityShippingDetailsViewModel == null)
                    return BadRequest($"{nameof(LegalEntityShippingDetailsViewModel)} cannot be null");
                LegalEntityShipping actionobject = new LegalEntityShipping();

                LegalEntityShippingDetailsViewModel.MasterCompanyId = 1;
                actionobject.LegalEntityId = LegalEntityShippingDetailsViewModel.LegalEntityId;
                actionobject.LegalEntityShippingAddressId = LegalEntityShippingDetailsViewModel.LegalEntityShippingAddressId;
                actionobject.ShipVia = LegalEntityShippingDetailsViewModel.ShipVia;
                actionobject.ShippingAccountinfo = LegalEntityShippingDetailsViewModel.ShippingAccountinfo;
                actionobject.ShippingId = LegalEntityShippingDetailsViewModel.ShippingId;
                actionobject.ShippingURL = LegalEntityShippingDetailsViewModel.ShippingURL;
                actionobject.MasterCompanyId = LegalEntityShippingDetailsViewModel.MasterCompanyId;
                actionobject.IsActive = true;
                actionobject.Memo = LegalEntityShippingDetailsViewModel.Memo;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = LegalEntityShippingDetailsViewModel.CreatedBy;
                actionobject.UpdatedBy = LegalEntityShippingDetailsViewModel.UpdatedBy;
                _unitOfWork.LegalEntityShipping.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateShipViaDetails/{id}")]
        public IActionResult updateShipviaAddress(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {

            if (ModelState.IsValid)
            {
                var checkPaymentObj = _unitOfWork.LegalEntityShipping.GetSingleOrDefault(c => c.LegalEntityShippingId == id);
                checkPaymentObj.IsActive = true;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.LegalEntityId = LegalEntityShippingViewModel.LegalEntityId;
                checkPaymentObj.LegalEntityShippingAddressId = LegalEntityShippingViewModel.LegalEntityShippingAddressId;
                checkPaymentObj.ShipVia = LegalEntityShippingViewModel.ShipVia;
                checkPaymentObj.ShippingAccountinfo = LegalEntityShippingViewModel.ShippingAccountinfo;
                checkPaymentObj.ShippingId = LegalEntityShippingViewModel.ShippingId;
                checkPaymentObj.ShippingURL = LegalEntityShippingViewModel.ShippingURL;
                checkPaymentObj.MasterCompanyId = LegalEntityShippingViewModel.MasterCompanyId;
                checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
                checkPaymentObj.Memo = LegalEntityShippingViewModel.Memo;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                _unitOfWork.LegalEntityShipping.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);

            }


            return Ok(ModelState);
        }


        #region ShipVia

        [HttpPost("InsShipVia")]
        public IActionResult InsertShipViaDetails([FromBody]  LegalEntityShippingViewModel LegalEntityShippingDetailsViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityShippingDetailsViewModel == null)
                    return BadRequest($"{nameof(LegalEntityShippingDetailsViewModel)} cannot be null");
                LegalEntityShipping actionobject = new LegalEntityShipping();
                actionobject.LegalEntityId = LegalEntityShippingDetailsViewModel.LegalEntityId;
                actionobject.ShipVia = LegalEntityShippingDetailsViewModel.ShipVia;
                actionobject.LegalEntityShippingAddressId = LegalEntityShippingDetailsViewModel.LegalEntityShippingAddressId;
                actionobject.ShippingAccountinfo = LegalEntityShippingDetailsViewModel.ShippingAccountinfo;
                actionobject.ShippingId = LegalEntityShippingDetailsViewModel.ShippingId;
                actionobject.ShippingURL = LegalEntityShippingDetailsViewModel.ShippingURL;
                actionobject.Memo = LegalEntityShippingDetailsViewModel.Memo;
                actionobject.MasterCompanyId = LegalEntityShippingDetailsViewModel.MasterCompanyId = 1;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = LegalEntityShippingDetailsViewModel.CreatedBy;
                actionobject.UpdatedBy = LegalEntityShippingDetailsViewModel.UpdatedBy;
                actionobject.IsActive = LegalEntityShippingDetailsViewModel.IsActive;
                _unitOfWork.LegalEntityShipping.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateShipVia/{id}")]
        public IActionResult UpdateShipvia(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                var updateShipObj = _unitOfWork.LegalEntityShipping.GetSingleOrDefault(c => c.LegalEntityShippingId == id);

                updateShipObj.LegalEntityId = LegalEntityShippingViewModel.LegalEntityId;
                updateShipObj.LegalEntityShippingAddressId = LegalEntityShippingViewModel.LegalEntityShippingAddressId;
                updateShipObj.ShipVia = LegalEntityShippingViewModel.ShipVia;
                updateShipObj.ShippingAccountinfo = LegalEntityShippingViewModel.ShippingAccountinfo;
                updateShipObj.ShippingId = LegalEntityShippingViewModel.ShippingId;
                updateShipObj.ShippingURL = LegalEntityShippingViewModel.ShippingURL;
                updateShipObj.MasterCompanyId = LegalEntityShippingViewModel.MasterCompanyId;
                updateShipObj.IsActive = LegalEntityShippingViewModel.IsActive;
                updateShipObj.Memo = LegalEntityShippingViewModel.Memo;
                updateShipObj.CreatedDate = DateTime.Now;
                updateShipObj.UpdatedDate = DateTime.Now;
                updateShipObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                updateShipObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                _unitOfWork.LegalEntityShipping.Update(updateShipObj);
                _unitOfWork.SaveChanges();
                return Ok(updateShipObj);
            }
            return Ok(ModelState);
        }

        [HttpGet("GetShipVia/{id}")]
        public IActionResult GetShipvia(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {
            var result = _unitOfWork.LegalEntityShippingAddress.GetAllShipViaDetails(id);
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
        public IActionResult GetShipviaAudit(long LegalEntityId, long LegalEntityShippingAddressId, long LegalEntityShippingId)
        {
            var result = _unitOfWork.LegalEntityShippingAddress.GetLegalEntityShippingAudit(LegalEntityId, LegalEntityShippingAddressId, LegalEntityShippingId);
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
        public IActionResult updateStatuscusShippingAddress(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityShippingViewModel == null)
                    return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
                checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                addressObj.UpdatedDate = DateTime.Now;
                addressObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.LegalEntityShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateStatusLegalEntityBilling/{id}")]
        public IActionResult updateStatusLegalEntityBilling(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityShippingViewModel == null)
                    return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.LegalEntityBillingInformation.GetSingleOrDefault(c => c.LegalEntityBillingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
                checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsDeleted = true;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                addressObj.UpdatedDate = DateTime.Now;
                addressObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.LegalEntityBillingInformation.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }
            return Ok(ModelState);
        }


        [HttpPut("updateStatusLegalEntityShipping/{id}")]
        public IActionResult updateStatusLegalEntityShipping(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityShippingViewModel == null)
                    return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
                checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsDeleted = true;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
                _unitOfWork.LegalEntityShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);

            }

            return Ok(ModelState);
        }


        [HttpPost("LegalEntityBillingPost")]
        public IActionResult CreateBilling([FromBody] LegalEntityBillingAddressViewModel LegalEntityBillingAddressViewModel, Address address, long? vendAddressid)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityBillingAddressViewModel == null)
                    return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
                LegalEntityBillingAddress cbs = new LegalEntityBillingAddress();
                cbs.MasterCompanyId = 1;
                cbs.IsActive = true;
                cbs.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
                cbs.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
                cbs.CreatedDate = DateTime.Now;
                cbs.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
                LegalEntityBillingAddressViewModel.UpdatedDate = DateTime.Now;
                LegalEntityBillingAddressViewModel.IsActive = true;
                address.Line1 = LegalEntityBillingAddressViewModel.Address1;
                address.Line2 = LegalEntityBillingAddressViewModel.Address2;
                address.Line3 = LegalEntityBillingAddressViewModel.Address3;
                address.PostalCode = LegalEntityBillingAddressViewModel.PostalCode;
                address.StateOrProvince = LegalEntityBillingAddressViewModel.StateOrProvince;
                address.City = LegalEntityBillingAddressViewModel.City;
                address.Country = LegalEntityBillingAddressViewModel.Country;
                address.MasterCompanyId = 1;
                address.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
                address.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = LegalEntityBillingAddressViewModel.IsActive;

                if (LegalEntityBillingAddressViewModel.AddressId > 0)
                {
                    address.AddressId = LegalEntityBillingAddressViewModel.AddressId;
                    _unitOfWork.Address.Update(address);
                }
                else
                    _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();

                long? id = address.AddressId;
                updateLegalEntitybillingAddress(LegalEntityBillingAddressViewModel, id, address);
                return Ok(LegalEntityBillingAddressViewModel);
            }

            return Ok(ModelState);
        }

        [HttpPut("LegalEntityBillAddressdetails/{id}")]
        public IActionResult saveBillDetails(long id, [FromBody] LegalEntityBillingAddressViewModel LegalEntityBillingAddressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityBillingAddressViewModel == null)
                    return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
                var checkBillingObj = _unitOfWork.LegalEntityBillingInformation.GetSingleOrDefault(c => c.LegalEntityBillingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == LegalEntityBillingAddressViewModel.AddressId);

                checkBillingObj.MasterCompanyId = 1;
                checkBillingObj.IsActive = LegalEntityBillingAddressViewModel.IsActive;
                checkBillingObj.SiteName = LegalEntityBillingAddressViewModel.SiteName;
                checkBillingObj.CreatedDate = DateTime.Now;
                checkBillingObj.UpdatedDate = DateTime.Now;
                checkBillingObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
                checkBillingObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
                checkBillingObj.MasterCompanyId = LegalEntityBillingAddressViewModel.MasterCompanyId;
                addressObj.Line1 = LegalEntityBillingAddressViewModel.Address1;
                addressObj.Line2 = LegalEntityBillingAddressViewModel.Address2;
                addressObj.Line3 = LegalEntityBillingAddressViewModel.Address3;
                addressObj.PostalCode = LegalEntityBillingAddressViewModel.PostalCode;
                addressObj.StateOrProvince = LegalEntityBillingAddressViewModel.StateOrProvince;
                addressObj.City = LegalEntityBillingAddressViewModel.City;
                addressObj.Country = LegalEntityBillingAddressViewModel.Country;
                addressObj.MasterCompanyId = 1;
                addressObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
                addressObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
                addressObj.UpdatedDate = DateTime.Now;

                if (LegalEntityBillingAddressViewModel.IsPrimary == true)
                {
                    var billingAddress = _context.LegalEntityBillingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId).ToList();
                    if (billingAddress != null && billingAddress.Count > 0)
                    {
                        foreach (var item in billingAddress)
                        {
                            item.IsPrimary = false;
                            _context.LegalEntityBillingAddress.Update(item);
                            _context.SaveChanges();
                        }
                    }
                }

                checkBillingObj.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.LegalEntityBillingInformation.Update(checkBillingObj);
                _unitOfWork.SaveChanges();

                _unitOfWork.CommonRepository.CreateHistory(
      LegalEntityBillingAddressViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityBillingAddressViewModel.LegalEntityId), Convert.ToInt64(checkBillingObj.LegalEntityBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), false);

                return Ok(checkBillingObj);
            }
            return Ok(ModelState);
        }

        [HttpPut("cusShippingUpdate/{id}")]
        public IActionResult entityShippingUpdate(long id, [FromBody] LegalEntityShippingAdressViewModel LegalEntityBillingAddressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LegalEntityBillingAddressViewModel == null)
                    return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
                var checkBillingObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == LegalEntityBillingAddressViewModel.AddressId);
                checkBillingObj.IsActive = true;
                checkBillingObj.MasterCompanyId = 1;
                checkBillingObj.IsActive = LegalEntityBillingAddressViewModel.IsActive;
                checkBillingObj.SiteName = LegalEntityBillingAddressViewModel.SiteName;
                checkBillingObj.CreatedDate = DateTime.Now;
                checkBillingObj.UpdatedDate = DateTime.Now;
                checkBillingObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
                checkBillingObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
                checkBillingObj.ExportLicenseNumber = LegalEntityBillingAddressViewModel.ExportLicenseNumber;
                checkBillingObj.Description = LegalEntityBillingAddressViewModel.Description;
                checkBillingObj.StartDate = LegalEntityBillingAddressViewModel.StartDate;
                checkBillingObj.ExpirationDate = LegalEntityBillingAddressViewModel.ExpirationDate;
                checkBillingObj.Amount = LegalEntityBillingAddressViewModel.Amount;
                checkBillingObj.MasterCompanyId = 1;
                addressObj.Line1 = LegalEntityBillingAddressViewModel.Address1;
                addressObj.Line2 = LegalEntityBillingAddressViewModel.Address2;
                addressObj.Line3 = LegalEntityBillingAddressViewModel.Address3;
                addressObj.PostalCode = LegalEntityBillingAddressViewModel.PostalCode;
                addressObj.StateOrProvince = LegalEntityBillingAddressViewModel.StateOrProvince;
                addressObj.City = LegalEntityBillingAddressViewModel.City;
                addressObj.Country = LegalEntityBillingAddressViewModel.Country;
                addressObj.MasterCompanyId = 1;

                if (LegalEntityBillingAddressViewModel.IsPrimary == true)
                {
                    LegalEntityShippingAddress shippingAddress = new LegalEntityShippingAddress();
                    shippingAddress = _context.LegalEntityShippingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId && p.IsPrimary == true).FirstOrDefault();

                    if (shippingAddress != null && shippingAddress.LegalEntityShippingAddressId != LegalEntityBillingAddressViewModel.LegalEntityShippingAddressId)
                    {
                        shippingAddress.IsPrimary = false;
                        _context.LegalEntityShippingAddress.Update(shippingAddress);
                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.CreateHistory(
             shippingAddress, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityBillingAddressViewModel.LegalEntityId), Convert.ToInt64(shippingAddress.LegalEntityShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);
                    }
                }
                checkBillingObj.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
                addressObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.LegalEntityShippingAddress.Update(checkBillingObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.CreateHistory(
          LegalEntityBillingAddressViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(checkBillingObj.LegalEntityId), Convert.ToInt64(checkBillingObj.LegalEntityShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);
                return Ok(checkBillingObj);
            }
            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult updateLegalEntitybillingAddress([FromBody] LegalEntityBillingAddressViewModel LegalEntityBillingAddressViewModel, long? id, Address address)
        {
            if (ModelState.IsValid)
            {
                LegalEntityBillingAddress cbs = new LegalEntityBillingAddress();
                if (LegalEntityBillingAddressViewModel == null)
                    return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
                LegalEntityBillingAddress LegalEntityShippingAddressObj = new LegalEntityBillingAddress();
                LegalEntityShippingAddressObj.IsActive = true;
                LegalEntityShippingAddressObj.LegalEntityId = LegalEntityBillingAddressViewModel.LegalEntityId;
                LegalEntityShippingAddressObj.SiteName = LegalEntityBillingAddressViewModel.SiteName;
                LegalEntityShippingAddressObj.MasterCompanyId = 1;
                LegalEntityShippingAddressObj.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
                LegalEntityShippingAddressObj.AddressId = id;
                LegalEntityShippingAddressObj.CreatedDate = DateTime.Now;
                LegalEntityShippingAddressObj.UpdatedDate = DateTime.Now;
                LegalEntityShippingAddressObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
                LegalEntityShippingAddressObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;

                if (LegalEntityBillingAddressViewModel.IsPrimary == true)
                {
                    var billingAddress = _context.LegalEntityBillingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId).ToList();
                    if (billingAddress != null && billingAddress.Count > 0)
                    {
                        foreach (var item in billingAddress)
                        {
                            item.IsPrimary = false;
                            _context.LegalEntityBillingAddress.Update(item);
                            _context.SaveChanges();
                        }
                    }
                }

                if (LegalEntityBillingAddressViewModel.LegalEntityBillingAddressId > 0)
                {
                    LegalEntityShippingAddressObj.LegalEntityBillingAddressId = LegalEntityBillingAddressViewModel.LegalEntityBillingAddressId;
                    _unitOfWork.LegalEntityBillingInformation.Update(LegalEntityShippingAddressObj);
                }
                else
                {
                    _unitOfWork.LegalEntityBillingInformation.Add(LegalEntityShippingAddressObj);
                }

                _unitOfWork.SaveChanges();
                long? venAddressid = LegalEntityShippingAddressObj.LegalEntityBillingAddressId;
                cbs.LegalEntityBillingAddressId = LegalEntityShippingAddressObj.LegalEntityBillingAddressId;
                _unitOfWork.CommonRepository.CreateHistory(
          LegalEntityBillingAddressViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityBillingAddressViewModel.LegalEntityId), Convert.ToInt64(LegalEntityShippingAddressObj.LegalEntityBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), false);
                return Ok(LegalEntityShippingAddressObj);
            }
            return Ok(ModelState);
        }

        public static List<TSource> ToList<TSource>(IEnumerable<TSource> source)
        {
            if (source == null)
            {
            }
            return new List<TSource>(source);
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
        
        [HttpGet("getLegalEntityDocumentDetail/{id}")]
        [Produces(typeof(List<LegalEntityDocumentDetail>))]
        public IActionResult GetLegalEntityDocumentDetail(long id, LegalEntityDocumentDetail cstomerDocumentDetail)
        {
            var allcusDoc = _unitOfWork.CreateDocumentDetails.GetAllDataById(id);
            return Ok(allcusDoc);
        }

        [HttpDelete("LegalEntityDocumentDelete/{id}")]
        [Produces(typeof(LegalEntityViewModel))]
        public IActionResult DeleteDocumentAction(long id)
        {
            var existingResult = _unitOfWork.Publication.GetSingleOrDefault(c => c.PublicationRecordId == id);

            existingResult.IsDeleted = true;
            _unitOfWork.Publication.Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        //[HttpGet("getLegalEntityDocumentAudit/{id}")]
        //[Produces(typeof(LegalEntityDocumentDetailAudit))]
        //public IActionResult GetLegalEntityDocumentDetailAudit(long id)
        //{
        //    var allvendorsDoc = _unitOfWork.LegalEntity.GetLegalEntityDocumentDetailsAudit(id);
        //    return Ok(allvendorsDoc);

        //}

        [HttpGet("getLegalEntityBillingHistory/{id}")]
        [Produces(typeof(List<LegalEntityBillingAddress>))]
        public IActionResult getLegalEntityBillingHistory(long id, LegalEntityBillingAddress cstomerBillingAddress)
        {
            var allLegalbilldetails = _unitOfWork.LegalEntityBillingInformation.GetAllLegalEntityBillingHistory(id); 
            return Ok(allLegalbilldetails);

        }

        [HttpGet("getLegalEntityShippingHistory/{id}")]
        [Produces(typeof(List<LegalEntityShippingAddress>))]
        public IActionResult getLegalEntityShippingHistory(long id, long entityShippingAddressId)
        {
            var allCusShippingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(id, entityShippingAddressId, Convert.ToInt32(AddressTypeEnum.ShippingAddress), Convert.ToInt32(ModuleEnum.LegalEntity));
            return Ok(allCusShippingDetails);
        }


        [HttpGet("LegalEntityshipviadetails")]
        [Produces(typeof(List<LegalEntityShippingAddress>))]
        public IActionResult GetLegalEntityShipviaDetails(long LegalEntityId, long addressId)
        {
            var allCusShippingdetails = _unitOfWork.LegalEntity.GetLegalEntityShipviaDetails(LegalEntityId, addressId);
            return Ok(allCusShippingdetails);
        }

        [HttpGet("getLegalEntityBillingHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllLegalEntityBillingAddressAudit(long LegalEntityId, long LegalEntityBillingaddressId)
        {
            var allCusBillingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(LegalEntityId, LegalEntityBillingaddressId, Convert.ToInt32(AddressTypeEnum.BillingAddress), Convert.ToInt32(ModuleEnum.LegalEntity));

            return Ok(allCusBillingDetails);
        }
        
        [HttpGet("getLegalEntityShippingHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllLegalEntityShippingAddressAudit(long LegalEntityId, long LegalEntityShippingAddressId)
        {
            var allCusShippingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(LegalEntityId, LegalEntityShippingAddressId, Convert.ToInt32(AddressTypeEnum.ShippingAddress), Convert.ToInt32(ModuleEnum.LegalEntity));
            return Ok(allCusShippingDetails);
        }

        [HttpGet("shippingdetailsstatus")]
        public IActionResult LegalEntityShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.LegalEntity.LegalEntityShippingDetailsStatus(id, status, updatedBy);

            var data = (from t in _context.LegalEntityShippingAddress
                        where t.LegalEntityShippingAddressId == id
                        select new
                        {
                            t.LegalEntityId,
                        }).FirstOrDefault();
            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.LegalEntityId), Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(id), Convert.ToInt32(AddressTypeEnum.ShippingAddress), updatedBy);


            return Ok();
        }
        [HttpGet("deleteshipviadetails")]
        public IActionResult DeleteShipViaDetails(long id, string updatedBy)
        {
            _unitOfWork.LegalEntity.DeleteShipViaDetails(id, updatedBy);
            return Ok();
        }
        [HttpGet("shippingdetailsviastatus")]
        public IActionResult LegalEntityShippingDetailsViaStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.LegalEntity.LegalEntityShippingDetailsViaStatus(id, status, updatedBy);
            return Ok();
        }

        [HttpDelete("deleteLegalEntityDocuments/{id}")]
        public IActionResult DeleteLegalEntityDocuments(long id)
        {
            var existingResult = _unitOfWork.Repository<LegalEntityDocumentDetail>().GetSingleOrDefault(c => c.LegalEntityDocumentDetailId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<LegalEntityDocumentDetail>().Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpPost("LegalEntityFinanceDocumentUpload")]
        [Produces("application/json")]
        public IActionResult LegalEntityDocumentUploadAction()
        {

            try
            {
                LegalEntityDocumentDetail objLegalEntityDocumentDetail = new LegalEntityDocumentDetail();
                if (ModelState.IsValid)
                {
                    if (Request.Form == null)
                        return BadRequest($"{nameof(objLegalEntityDocumentDetail)} cannot be null");
                    objLegalEntityDocumentDetail.MasterCompanyId = 1;
                    objLegalEntityDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
                    objLegalEntityDocumentDetail.LegalEntityId = Convert.ToInt64(Request.Form["LegalEntityId"]);

                    if (objLegalEntityDocumentDetail.LegalEntityId > 0)
                    {
                        var attachmentData = _context.Attachment.Where(p => p.ReferenceId == objLegalEntityDocumentDetail.LegalEntityId && p.ModuleId == Convert.ToInt32(ModuleEnum.LegalEntity)).FirstOrDefault();

                        if (attachmentData != null)
                        {
                            objLegalEntityDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
                                                         Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), objLegalEntityDocumentDetail.UpdatedBy, objLegalEntityDocumentDetail.MasterCompanyId, attachmentData.AttachmentId);


                        }
                        else
                        {
                            objLegalEntityDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
                                                                       Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), objLegalEntityDocumentDetail.UpdatedBy, objLegalEntityDocumentDetail.MasterCompanyId);

                        }

                    }

                    return Ok(objLegalEntityDocumentDetail);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetLegalEntityAuditHistoryByid")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetLegalEntityAuditHistoryByid(long LegalEntityId)
        {
            var LegalEntityDtails = _unitOfWork.LegalEntity.GetLegalEntityAuditHistoryByid(LegalEntityId); //.GetAllLegalEntitysData();
            return Ok(LegalEntityDtails);
        }

        [HttpGet("GetLegalEntityInternationalShippingAuditHistoryByid")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetLegalEntityInternationalShippingAuditHistoryByid(long LegalEntityId, long internationalShippingId)
        {
            var LegalEntityDtails = _unitOfWork.LegalEntity.GetLegalEntityInternationalShippingAuditHistoryByid(LegalEntityId, internationalShippingId); //.GetAllLegalEntitysData();
            return Ok(LegalEntityDtails);

        }

        [HttpPost("uploadLegalEntitybillingaddress")]
        public IActionResult UploadBillingCustomData(long LegalEntityId)
        {
            var result = _unitOfWork.LegalEntity.UploadLegalEntityBillingAddressCustomData(Request.Form.Files[0], LegalEntityId);
            return Ok(result);
        }

        [HttpPost("uploadLegalEntityshippingaddress")]
        public IActionResult UploadShippingCustomData(long LegalEntityId)
        {
            var result = _unitOfWork.LegalEntity.UploadLegalEntityShippingAddressCustomData(Request.Form.Files[0], LegalEntityId);
            return Ok(result);
        }
        [HttpPost("uploadLegalEntityinternationalshipping")]
        public IActionResult UploadInternationalCustomData(long LegalEntityId)
        {
            _unitOfWork.LegalEntity.UploadLegalEntityInternationalCustomData(Request.Form.Files[0], LegalEntityId);
            return Ok();
        }
        [HttpPost("uploadlegalEntitycontacts")]
        public IActionResult UploadContactsCustomData(long LegalEntityId)
        {
            _unitOfWork.LegalEntity.UploadLegalEntityContactsCustomData(Request.Form.Files[0], LegalEntityId);
            return Ok();
        }
    }
}
