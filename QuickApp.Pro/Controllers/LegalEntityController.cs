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
using System.Threading.Tasks;

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("LegalEntity", id); //.GetAllLegalEntitysData();


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
            //return Ok(Mapper.Map<IEnumerable<LegalEntityViewModel>>(allentity));
            return Ok(allentity);

        }

        [HttpGet("ParentEntities")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetParentEntities()
        {
            var allentity = _unitOfWork.LegalEntity.GetParentEntities();
            return Ok(allentity);

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
        public IActionResult CreateAction([FromBody] LegalEntityViewModel legalEntityViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (legalEntityViewModel == null)
                    return BadRequest($"{nameof(legalEntityViewModel)} cannot be null");
                
                DAL.Models.LegalEntity entityobject = new DAL.Models.LegalEntity();
                DomesticWirePayment domesticWirePaymentObj = new DomesticWirePayment();
                InternationalwirePayment internationalWirePaymentObj = new InternationalwirePayment();
                ACH ach = new ACH();
                entityobject.MasterCompanyId = legalEntityViewModel.MasterCompanyId;
                entityobject.Name = legalEntityViewModel.Name;
                entityobject.LedgerName = legalEntityViewModel.LedgerName;
                entityobject.Description = legalEntityViewModel.Description;
                entityobject.DoingLegalAs = legalEntityViewModel.DoingLegalAs;
                entityobject.CageCode = legalEntityViewModel.CageCode;
                //entityobject.DomesticWirePaymentId = legalEntityViewModel.DomesticWirePaymentId;
                entityobject.FAALicense = legalEntityViewModel.FAALicense;
                entityobject.FunctionalCurrencyId = legalEntityViewModel.FunctionalCurrencyId;
                entityobject.IsBankingInfo = legalEntityViewModel.IsBankingInfo;
                entityobject.IsBalancingEntity = legalEntityViewModel.IsBalancingEntity;
                entityobject.IsLastLevel = legalEntityViewModel.IsLastLevel;
                entityobject.LockBoxAddressId = legalEntityViewModel.LockBoxAddressId;
                entityobject.ReportingCurrencyId = legalEntityViewModel.ReportingCurrencyId;
                entityobject.TaxId = legalEntityViewModel.TaxId;
                entityobject.FaxNumber = legalEntityViewModel.FaxNumber;
                entityobject.PhoneNumber1 = legalEntityViewModel.PhoneNumber1;
                entityobject.IsActive = true;
                entityobject.CreatedDate = DateTime.Now;
                entityobject.UpdatedDate = DateTime.Now;
                entityobject.CreatedBy = legalEntityViewModel.CreatedBy;
                entityobject.UpdatedBy = legalEntityViewModel.UpdatedBy;
                if (legalEntityViewModel.AddressId == null)
                {
                    entityobject.AddressId = null;


                }
                if (legalEntityViewModel.ParentId == null)
                {
                    entityobject.ParentId = null;
                }
                entityobject.ParentId = legalEntityViewModel.ParentId;
                AddAddress(legalEntityViewModel);
                entityobject.AddressId = legalEntityViewModel.AddressId.Value;
                address.Line1 = legalEntityViewModel.Address1;
                address.Line2 = legalEntityViewModel.Address2;
                address.City = legalEntityViewModel.City;
                address.PostalCode = legalEntityViewModel.PostalCode;
                address.StateOrProvince = legalEntityViewModel.BankProvince;
                address.Country = legalEntityViewModel.Country;
                address.MasterCompanyId = 1;
                address.IsActive = legalEntityViewModel.IsActive;
                address.CreatedBy = legalEntityViewModel.CreatedBy;
                address.UpdatedBy = legalEntityViewModel.UpdatedBy;
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.PoBox = legalEntityViewModel.PoBox;
                _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();

                entityobject.LockBoxAddressId = address.AddressId.Value;
                if (legalEntityViewModel.DomesticABANumber != null)
                {
                    domesticWirePaymentObj.MasterCompanyId = 1;
                    domesticWirePaymentObj.ABA = legalEntityViewModel.DomesticABANumber;
                    domesticWirePaymentObj.AccountNumber = legalEntityViewModel.DomesticBankAccountNumber;
                    domesticWirePaymentObj.BankName = legalEntityViewModel.DomesticBankName;
                    domesticWirePaymentObj.CreatedDate = DateTime.Now;
                    domesticWirePaymentObj.UpdatedDate = DateTime.Now;
                    domesticWirePaymentObj.IntermediaryBankName = legalEntityViewModel.DomesticIntermediateBank;
                    domesticWirePaymentObj.BenificiaryBankName = legalEntityViewModel.DomesticBenficiaryBankName;
                    domesticWirePaymentObj.CreatedBy = legalEntityViewModel.CreatedBy;
                    domesticWirePaymentObj.UpdatedBy = legalEntityViewModel.UpdatedBy;
                    _unitOfWork.vendorDomesticPaymentRepository.Add(domesticWirePaymentObj);
                    _unitOfWork.SaveChanges();
                    entityobject.DomesticWirePaymentId = domesticWirePaymentObj.DomesticWirePaymentId.Value;
                }
                if (legalEntityViewModel.InternationalBenficiaryBankName != null)
                {
                    internationalWirePaymentObj.IsActive = true;
                    internationalWirePaymentObj.MasterCompanyId = 1;
                    internationalWirePaymentObj.SwiftCode = legalEntityViewModel.InternationalSWIFTID;
                    internationalWirePaymentObj.BeneficiaryBankAccount = legalEntityViewModel.InternationalBankAccountNumber.ToString();
                    internationalWirePaymentObj.BeneficiaryBank = legalEntityViewModel.InternationalBankName;
                    internationalWirePaymentObj.IntermediaryBank = legalEntityViewModel.InternationalIntermediateBank;
                    internationalWirePaymentObj.BankName = legalEntityViewModel.InternationalBankName;
                    internationalWirePaymentObj.CreatedDate = DateTime.Now;
                    internationalWirePaymentObj.UpdatedDate = DateTime.Now;
                    internationalWirePaymentObj.CreatedBy = legalEntityViewModel.CreatedBy;
                    internationalWirePaymentObj.UpdatedBy = legalEntityViewModel.UpdatedBy;
                    _unitOfWork.vendorInternationalPaymentRepository.Add(internationalWirePaymentObj);
                    _unitOfWork.SaveChanges();
                    entityobject.InternationalWirePaymentId = internationalWirePaymentObj.InternationalWirePaymentId.Value;
                }

                if (legalEntityViewModel.AchBankName != null)
                {
                    ach.IsActive = true;
                    ach.MasterCompanyId = 1;
                    ach.ABA = legalEntityViewModel.AchABANumber;
                    ach.AccountNumber = legalEntityViewModel.AchBankAccountNumber;
                    ach.BankName = legalEntityViewModel.AchBankName;
                    ach.BeneficiaryBankName = legalEntityViewModel.AchBenficiaryBankName;
                    ach.IntermediateBankName = legalEntityViewModel.AchIntermediateBank;
                    ach.SwiftCode = legalEntityViewModel.AchSWIFTID;
                    ach.CreatedDate = DateTime.Now;
                    ach.UpdatedDate = DateTime.Now;
                    ach.CreatedBy = legalEntityViewModel.CreatedBy;
                    ach.UpdatedBy = legalEntityViewModel.UpdatedBy;
                    _context.ACH.Add(ach);
                    _unitOfWork.SaveChanges();
                    entityobject.ACHId = ach.ACHId;
                }

                _unitOfWork.LegalEntity.Add(entityobject);
                _unitOfWork.SaveChanges();
               // if (legalEntityViewModel.ParentId == null) { UpdateToParent(entityobject); }
               
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
                    var domesticWirePaymentObj = _context.DomesticWirePayment.Where(a => a.DomesticWirePaymentId == entityobject.DomesticWirePaymentId).SingleOrDefault();
                    var internationalWirePaymentObj = _context.InternationalWirePayment.Where(a => a.InternationalWirePaymentId == entityobject.InternationalWirePaymentId).SingleOrDefault();
                    var address = _context.Address.Where(a => a.AddressId == entityobject.AddressId).SingleOrDefault();
                    var lockAddress = _context.Address.Where(a => a.AddressId == entityobject.LockBoxAddressId).SingleOrDefault();
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
                    entityobject.IsBankingInfo = legalEntityViewModel.IsBankingInfo;
                    entityobject.IsBalancingEntity = legalEntityViewModel.IsBalancingEntity;
                    entityobject.IsLastLevel = legalEntityViewModel.IsLastLevel;
                    entityobject.LockBoxAddressId = legalEntityViewModel.LockBoxAddressId;
                    entityobject.ReportingCurrencyId = legalEntityViewModel.ReportingCurrencyId;
                    entityobject.LedgerName = legalEntityViewModel.LedgerName;
                    entityobject.TaxId = legalEntityViewModel.TaxId;
                    entityobject.CreatedDate = DateTime.Now;
                    entityobject.UpdatedDate = DateTime.Now;
                    entityobject.CreatedBy = legalEntityViewModel.CreatedBy;
                    entityobject.UpdatedBy = legalEntityViewModel.UpdatedBy;
                 
                    if (address != null) {
                        address.Line1 = legalEntityViewModel.Address1;
                        address.Line2 = legalEntityViewModel.Address2;
                        address.PostalCode = legalEntityViewModel.PostalCode;
                        address.City = legalEntityViewModel.City;
                        address.StateOrProvince = legalEntityViewModel.StateOrProvince;
                        //address.StateOrProvince = legalEntityViewModel.BankProvince;
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

                    if (lockAddress != null)
                    {
                        lockAddress.PoBox = legalEntityViewModel.PoBox;
                        lockAddress.Line1 = legalEntityViewModel.BankStreetaddress1;
                        lockAddress.Line2 = legalEntityViewModel.BankStreetaddress2;
                        lockAddress.StateOrProvince = legalEntityViewModel.BankProvince;
                        lockAddress.City = legalEntityViewModel.BankCity;
                        lockAddress.Country = legalEntityViewModel.Country;
                        lockAddress.PostalCode = legalEntityViewModel.PostalCode;
                        lockAddress.Country = legalEntityViewModel.Country;
                        lockAddress.MasterCompanyId = 1;
                        lockAddress.CreatedBy = legalEntityViewModel.CreatedBy;
                        lockAddress.UpdatedBy = legalEntityViewModel.UpdatedBy;
                        lockAddress.CreatedDate = DateTime.Now;
                        lockAddress.UpdatedDate = DateTime.Now;
                        lockAddress.PoBox = legalEntityViewModel.PoBox;
                        _unitOfWork.Address.Update(lockAddress);
                        _unitOfWork.SaveChanges();

                    }


                    if (domesticWirePaymentObj != null)
                    {
                        domesticWirePaymentObj.MasterCompanyId = 1;
                        domesticWirePaymentObj.ABA = legalEntityViewModel.DomesticABANumber;
                        domesticWirePaymentObj.AccountNumber = legalEntityViewModel.DomesticBankAccountNumber;
                        domesticWirePaymentObj.BankName = legalEntityViewModel.DomesticBankName;
                        domesticWirePaymentObj.CreatedDate = DateTime.Now;
                        domesticWirePaymentObj.UpdatedDate = DateTime.Now;
                        domesticWirePaymentObj.IntermediaryBankName = legalEntityViewModel.DomesticIntermediateBank;
                        domesticWirePaymentObj.BenificiaryBankName = legalEntityViewModel.DomesticBenficiaryBankName;
                        domesticWirePaymentObj.CreatedBy = legalEntityViewModel.CreatedBy;
                        domesticWirePaymentObj.UpdatedBy = legalEntityViewModel.UpdatedBy;
                        _unitOfWork.vendorDomesticPaymentRepository.Update(domesticWirePaymentObj);
                        _unitOfWork.SaveChanges();
                    }
                    if (internationalWirePaymentObj != null)
                    {
                        internationalWirePaymentObj.IsActive = true;
                        internationalWirePaymentObj.MasterCompanyId = 1;
                        internationalWirePaymentObj.SwiftCode = legalEntityViewModel.InternationalSWIFTID;
                        internationalWirePaymentObj.BeneficiaryBankAccount = legalEntityViewModel.InternationalBankAccountNumber.ToString();
                        internationalWirePaymentObj.BeneficiaryBank = legalEntityViewModel.InternationalBankName;
                        internationalWirePaymentObj.CreatedDate = DateTime.Now;
                        internationalWirePaymentObj.UpdatedDate = DateTime.Now;
                        internationalWirePaymentObj.IntermediaryBank = legalEntityViewModel.InternationalIntermediateBank;
                        internationalWirePaymentObj.BankName = legalEntityViewModel.InternationalBankName;
                        internationalWirePaymentObj.CreatedBy = legalEntityViewModel.CreatedBy;
                        internationalWirePaymentObj.UpdatedBy = legalEntityViewModel.UpdatedBy;
                        _unitOfWork.vendorInternationalPaymentRepository.Update(internationalWirePaymentObj);
                        _unitOfWork.SaveChanges();
                    }
                    if (ach != null)
                   {
                        ach.IsActive = true;
                        ach.MasterCompanyId = 1;
                        ach.ABA = legalEntityViewModel.AchABANumber;
                        ach.AccountNumber = legalEntityViewModel.AchBankAccountNumber;
                        ach.BankName = legalEntityViewModel.AchBankName;
                        ach.BeneficiaryBankName = legalEntityViewModel.AchBenficiaryBankName;
                        ach.IntermediateBankName = legalEntityViewModel.AchIntermediateBank;
                        ach.SwiftCode = legalEntityViewModel.AchSWIFTID;
                        ach.CreatedDate = DateTime.Now;
                        ach.UpdatedDate = DateTime.Now;
                        ach.CreatedBy = legalEntityViewModel.CreatedBy;
                        ach.UpdatedBy = legalEntityViewModel.UpdatedBy;
                        _context.ACH.Update(ach);
                        _unitOfWork.SaveChanges();
                        
                    }

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
            var allCusbilldetails = _unitOfWork.LegalEntityBillingInformation.GetAllLegalEntityBillingDetails(id); //.GetAllLegalEntitysData();
            return Ok(allCusbilldetails);

        }

        //[HttpGet("legalEntityshippingGet/{id}")]
        //[Produces(typeof(List<LegalEntityBillingAddress>))]
        //public IActionResult legalEntityshippingGet(long id, LegalEntityBillingAddress cstomerBillingAddress)
        //{
        //    var allCusbilldetails = _unitOfWork.LegalEntityShippingAddress.GetAllShippingAddressDetails(id); //.GetAllLegalEntitysData();
        //    return Ok(allCusbilldetails);
        //}


        [HttpGet("AddressGet")]
        [Produces(typeof(List<Address>))]
        public IActionResult GetAddress()
        {
            var alladdresses = _unitOfWork.Address.GetAddresses(); //.GetAllLegalEntitysData();
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

       
        //[HttpPost("LegalEntitys")]
        //public IActionResult CreateAction([FromBody] LegalEntityViewModel LegalEntityViewModel, Address address, LegalEntityType ct)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (LegalEntityViewModel == null)
        //            return BadRequest($"{nameof(LegalEntityViewModel)} cannot be null");
        //        DAL.Models.LegalEntity actionobject = new DAL.Models.LegalEntity();
        //        ct.LegalEntityTypeId = 1;
        //        LegalEntityViewModel.MasterCompanyId = 1;
        //        actionobject.IsActive = true;
        //        actionobject.IsDeleted = false;
        //        actionobject.LegalEntityAffiliationId = LegalEntityViewModel.LegalEntityAffiliationId;
        //        actionobject.CurrencyId = LegalEntityViewModel.CurrencyId;
        //        actionobject.CreditTermsId = LegalEntityViewModel.CreditTermsId;
        //        actionobject.Name = LegalEntityViewModel.Name;
        //        actionobject.Parent = LegalEntityViewModel.Parent;
        //        actionobject.Email = LegalEntityViewModel.Email;
        //        actionobject.LegalEntityPhone = LegalEntityViewModel.LegalEntityPhone;
        //        actionobject.LegalEntityPhoneExt = LegalEntityViewModel.LegalEntityPhoneExt;
        //        actionobject.AnnualQuota = LegalEntityViewModel.AnnualQuota;
        //        actionobject.AnnualRevenuePotential = LegalEntityViewModel.AnnualRevenuePotential;
        //        actionobject.LegalEntityParentName = LegalEntityViewModel.LegalEntityParentName;
        //        actionobject.ScanDocuments = LegalEntityViewModel.ScanDocuments;
        //        actionobject.PBHLegalEntityMemo = LegalEntityViewModel.PBHLegalEntityMemo;
        //        actionobject.RestrictPMA = LegalEntityViewModel.RestrictPMA;
        //        actionobject.IsAddressForBilling = LegalEntityViewModel.IsAddressForBilling;
        //        actionobject.IsAddressForShipping = LegalEntityViewModel.IsAddressForShipping;
        //        actionobject.EDI = LegalEntityViewModel.EDI;
        //        actionobject.IsAeroExchange = LegalEntityViewModel.IsAeroExchange;
        //        actionobject.AeroExchangeDescription = LegalEntityViewModel.AeroExchangeDescription;
        //        actionobject.EDIDescription = LegalEntityViewModel.EDIDescription;
        //        // actionobject.IntegrationPortalId = LegalEntityViewModel.IntegrationPortalId;
        //        actionobject.RestrictBERMemo = LegalEntityViewModel.RestrictBERMemo;

        //        if (LegalEntityViewModel.LegalEntityClassificationIds != null)
        //        { actionobject.LegalEntityClassificationId = LegalEntityViewModel.LegalEntityClassificationIds[0] ?? null; }

        //        actionobject.LegalEntityTypeId = LegalEntityViewModel.LegalEntityTypeId;
        //        actionobject.LegalEntityType = LegalEntityViewModel.LegalEntityType;
        //        actionobject.IsLegalEntityAlsoVendor = LegalEntityViewModel.IsLegalEntityAlsoVendor;
        //        actionobject.IsPBHLegalEntity = LegalEntityViewModel.IsPBHLegalEntity;
        //        actionobject.LegalEntityCode = LegalEntityViewModel.LegalEntityCode;
        //        actionobject.ContractReference = LegalEntityViewModel.ContractReference;
        //        actionobject.DoingBuinessAsName = LegalEntityViewModel.DoingBuinessAsName;
        //        actionobject.LegalEntityURL = LegalEntityViewModel.LegalEntityURL;
        //        actionobject.LegalEntityClassification = LegalEntityViewModel.LegalEntityClassification;
        //        actionobject.LegalEntityAddress = LegalEntityViewModel.LegalEntityAddress;
        //        actionobject.RestrictBER = LegalEntityViewModel.RestrictBER;
        //        actionobject.RestrictPMA = LegalEntityViewModel.RestrictPMA;
        //        actionobject.LegalEntityBillingAddress = LegalEntityViewModel.LegalEntityBillingAddress;
        //        actionobject.RestrictPMAMemo = LegalEntityViewModel.RestrictPMAMemo;
        //        actionobject.MasterCompanyId = LegalEntityViewModel.MasterCompanyId;
        //        actionobject.LegalEntityAffiliationId = LegalEntityViewModel.LegalEntityAffiliationId;
        //        actionobject.ATAChapterId = LegalEntityViewModel.ATAChapterId;
        //        actionobject.GeneralCurrencyId = LegalEntityViewModel.GeneralCurrencyId;
        //        actionobject.ataSubChapterId = LegalEntityViewModel.ataSubChapterId;
        //        actionobject.CreatedDate = DateTime.Now;
        //        actionobject.UpdatedDate = DateTime.Now;
        //        actionobject.CreatedBy = LegalEntityViewModel.CreatedBy;
        //        actionobject.UpdatedBy = LegalEntityViewModel.UpdatedBy;
        //        AddAddress(LegalEntityViewModel);

        //        actionobject.AddressId = LegalEntityViewModel.Addressid.Value;
        //        if (LegalEntityViewModel.IntegrationPortalId == null)
        //        {
        //            LegalEntityViewModel.IntegrationPortalId = null;
        //        }
        //        _unitOfWork.LegalEntity.Add(actionobject);
        //        _unitOfWork.SaveChanges();

        //        //Added By Vijay on 12/11/2019 for IsAddressForShipping and IsAddressForBilling as selected as true condition
        //        if (actionobject.LegalEntityId > 0)
        //        {

        //            if (Convert.ToBoolean(actionobject.IsAddressForShipping))
        //            {
        //                long ShippingAddressId = _unitOfWork.LegalEntity.AddLegalEntityShippingAddress(actionobject);

        //                _unitOfWork.CommonRepository.CreateHistory(
        //               LegalEntityViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), actionobject.LegalEntityId, ShippingAddressId, Convert.ToInt32(AddressTypeEnum.ShippingAddress), true);
        //            }

        //            if (Convert.ToBoolean(actionobject.IsAddressForBilling))
        //            {
        //                long BillingAddressId = _unitOfWork.LegalEntity.AddLegalEntityBillinggAddress(actionobject);
        //                _unitOfWork.CommonRepository.CreateHistory(
        //            LegalEntityViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), actionobject.LegalEntityId, BillingAddressId, Convert.ToInt32(AddressTypeEnum.BillingAddress), true);

        //            }
        //        }





        //        if (actionobject.RestrictPMA == true)
        //            _unitOfWork.CommonRepository.CreateRestrictedParts(LegalEntityViewModel.RestrictedPMAParts, actionobject.LegalEntityId, Convert.ToInt32(ModuleEnum.LegalEntity));
        //        if (actionobject.RestrictBER == true)
        //            _unitOfWork.CommonRepository.CreateRestrictedParts(LegalEntityViewModel.RestrictedDERParts, actionobject.LegalEntityId, Convert.ToInt32(ModuleEnum.LegalEntity));

        //        if (LegalEntityViewModel.LegalEntityTaxTypeRateMapping != null)
        //        {
        //            actionobject.LegalEntityTaxTypeRateMapping = LegalEntityViewModel.LegalEntityTaxTypeRateMapping;
        //            _unitOfWork.CommonRepository.CreateLegalEntityTaxTypeRateMapping(
        //                actionobject.LegalEntityTaxTypeRateMapping, actionobject.LegalEntityId);

        //        }


        //        if (LegalEntityViewModel.LegalEntityClassificationIds != null)
        //        {
        //            List<ClassificationMapping> listofEClassificationMappings = LegalEntityViewModel
        //                .LegalEntityClassificationIds
        //                .Select(item => new ClassificationMapping() { ClasificationId = item.Value }
        //                ).ToList();
        //            _unitOfWork.CommonRepository.CreateClassificationMappings(listofEClassificationMappings, Convert.ToInt32(ModuleEnum.LegalEntity),
        //                actionobject.LegalEntityId, actionobject.CreatedBy);
        //        }
        //        if (LegalEntityViewModel.IntegrationPortalId != null)
        //        {
        //            List<IntegrationPortalMapping> listofIntegrationMappings = LegalEntityViewModel
        //                .IntegrationPortalId
        //                .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
        //                ).ToList();
        //            _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.LegalEntity),
        //                actionobject.LegalEntityId, actionobject.CreatedBy);
        //        }

        //        if (actionobject.LegalEntityId > 0)
        //        {
        //            _unitOfWork.LegalEntity.AddCustomecontact(actionobject);


        //        }
        //        if (actionobject.LegalEntityId > 0)
        //        {
        //            if (Convert.ToBoolean(actionobject.IsLegalEntityAlsoVendor))
        //            {
        //                //_unitOfWork.LegalEntity.AddVendor(actionobject);
        //                Vendor objVendor = new Vendor();

        //                objVendor.RelatedLegalEntityId = actionobject.LegalEntityId;
        //                objVendor.MasterCompanyId = 1;
        //                objVendor.IsActive = true;
        //                objVendor.IsDeleted = false;
        //                objVendor.VendorTypeId = actionobject.LegalEntityAffiliationId;
        //                objVendor.CurrencyId = actionobject.CurrencyId;
        //                objVendor.CreditTermsId = actionobject.CreditTermsId;
        //                objVendor.VendorName = actionobject.Name;
        //                objVendor.Parent = Convert.ToInt64(actionobject.Parent);
        //                objVendor.VendorEmail = actionobject.Email;
        //                objVendor.VendorPhone = actionobject.LegalEntityPhone;
        //                objVendor.VendorPhoneExt = actionobject.LegalEntityPhoneExt;
        //                objVendor.IsAddressForBilling = actionobject.IsAddressForBilling;
        //                objVendor.IsAddressForShipping = actionobject.IsAddressForShipping;
        //                objVendor.VendorCode = actionobject.LegalEntityCode;
        //                objVendor.VendorURL = actionobject.LegalEntityURL;
        //                objVendor.VendorContractReference = actionobject.ContractReference;
        //                objVendor.DoingBusinessAsName = actionobject.DoingBuinessAsName;
        //                objVendor.Parent = Convert.ToInt64(actionobject.Parent);

        //                objVendor.MasterCompanyId = Convert.ToInt32(actionobject.MasterCompanyId);

        //                objVendor.CreatedDate = DateTime.Now;
        //                objVendor.UpdatedDate = DateTime.Now;
        //                objVendor.CreatedBy = actionobject.CreatedBy;
        //                objVendor.UpdatedBy = actionobject.UpdatedBy;

        //                AddAddress(LegalEntityViewModel);
        //                objVendor.AddressId = LegalEntityViewModel.Addressid.Value;

        //                _context.Vendor.Add(objVendor);
        //                _context.SaveChanges();
        //                if (LegalEntityViewModel.IntegrationPortalId != null)
        //                {
        //                    List<IntegrationPortalMapping> listofIntegrationMappings = LegalEntityViewModel
        //                        .IntegrationPortalId
        //                        .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
        //                        ).ToList();
        //                    _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Vendor),
        //                        objVendor.VendorId, actionobject.CreatedBy);
        //                }
        //                if (objVendor.VendorId > 0)
        //                {
        //                    _unitOfWork.LegalEntity.AddVendorContact(actionobject, objVendor.VendorId);

        //                    if (Convert.ToBoolean(objVendor.IsAddressForShipping))
        //                    {
        //                        _unitOfWork.LegalEntity.AddVendorShippingAddress(actionobject, objVendor.VendorId, Convert.ToInt64(objVendor.AddressId));

        //                    }

        //                    if (Convert.ToBoolean(objVendor.IsAddressForBilling))
        //                    {
        //                        _unitOfWork.LegalEntity.AddVendorBillingAddress(actionobject, objVendor.VendorId, Convert.ToInt64(objVendor.AddressId));
        //                    }


        //                }

        //            }
        //        }
        //        return Ok(actionobject);
        //    }

        //    return Ok(ModelState);
        //}

        //[HttpPut("LegalEntitys/{id}")]
        //public IActionResult UpdateLegalEntitys(long id, [FromBody] LegalEntityViewModel LegalEntityViewModel, LegalEntityType ct)
        //{
        //    var actionobject = _unitOfWork.LegalEntity.GetSingleOrDefault(a => a.LegalEntityId == id);
        //    var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == LegalEntityViewModel.Addressid);
        //    LegalEntityViewModel.MasterCompanyId = 1;
        //    actionobject.RestrictBERMemo = LegalEntityViewModel.RestrictBERMemo;
        //    actionobject.Name = LegalEntityViewModel.Name;
        //    actionobject.Parent = LegalEntityViewModel.Parent;
        //    actionobject.Email = LegalEntityViewModel.Email;
        //    actionobject.LegalEntityPhone = LegalEntityViewModel.LegalEntityPhone;
        //    actionobject.LegalEntityPhoneExt = LegalEntityViewModel.LegalEntityPhoneExt;
        //    actionobject.AnnualQuota = LegalEntityViewModel.AnnualQuota;
        //    actionobject.AnnualRevenuePotential = LegalEntityViewModel.AnnualRevenuePotential;
        //    actionobject.LegalEntityParentName = LegalEntityViewModel.LegalEntityParentName;
        //    actionobject.ScanDocuments = LegalEntityViewModel.ScanDocuments;
        //    actionobject.PBHLegalEntityMemo = LegalEntityViewModel.PBHLegalEntityMemo;
        //    actionobject.RestrictPMA = LegalEntityViewModel.RestrictPMA;
        //    // actionobject.IntegrationPortalId = LegalEntityViewModel.IntegrationPortalId;
        //    actionobject.RestrictBER = LegalEntityViewModel.RestrictBER;
        //    actionobject.LegalEntityClassificationId = LegalEntityViewModel.LegalEntityClassificationIds[0];
        //    actionobject.LegalEntityTypeId = LegalEntityViewModel.LegalEntityTypeId;
        //    actionobject.LegalEntityType = LegalEntityViewModel.LegalEntityType;
        //    actionobject.IsLegalEntityAlsoVendor = LegalEntityViewModel.IsLegalEntityAlsoVendor;
        //    actionobject.IsAddressForBilling = LegalEntityViewModel.IsAddressForBilling;
        //    actionobject.IsAddressForShipping = LegalEntityViewModel.IsAddressForShipping;
        //    actionobject.IsPBHLegalEntity = LegalEntityViewModel.IsPBHLegalEntity;
        //    actionobject.LegalEntityCode = LegalEntityViewModel.LegalEntityCode;
        //    actionobject.ContractReference = LegalEntityViewModel.ContractReference;
        //    actionobject.DoingBuinessAsName = LegalEntityViewModel.DoingBuinessAsName;
        //    actionobject.LegalEntityURL = LegalEntityViewModel.LegalEntityURL;
        //    actionobject.LegalEntityClassification = LegalEntityViewModel.LegalEntityClassification;
        //    actionobject.LegalEntityAddress = LegalEntityViewModel.LegalEntityAddress;
        //    actionobject.RestrictBER = LegalEntityViewModel.RestrictBER;
        //    actionobject.RestrictPMA = LegalEntityViewModel.RestrictPMA;
        //    actionobject.LegalEntityBillingAddress = LegalEntityViewModel.LegalEntityBillingAddress;
        //    actionobject.RestrictPMAMemo = LegalEntityViewModel.RestrictPMAMemo;
        //    actionobject.MasterCompanyId = LegalEntityViewModel.MasterCompanyId;
        //    actionobject.IsActive = LegalEntityViewModel.IsActive;
        //    actionobject.LegalEntityAffiliationId = LegalEntityViewModel.LegalEntityAffiliationId;
        //    actionobject.ATAChapterId = LegalEntityViewModel.ATAChapterId;
        //    actionobject.CreatedDate = DateTime.Now;
        //    actionobject.UpdatedDate = DateTime.Now;
        //    actionobject.ataSubChapterId = LegalEntityViewModel.ataSubChapterId;
        //    actionobject.CreatedBy = LegalEntityViewModel.CreatedBy;
        //    actionobject.UpdatedBy = LegalEntityViewModel.UpdatedBy;
        //    address.Line1 = LegalEntityViewModel.Address1;
        //    address.Line2 = LegalEntityViewModel.Address2;
        //    address.Line3 = LegalEntityViewModel.Address3;
        //    address.PostalCode = LegalEntityViewModel.PostalCode;
        //    address.StateOrProvince = LegalEntityViewModel.StateOrProvince;
        //    address.City = LegalEntityViewModel.City;
        //    address.Country = LegalEntityViewModel.Country;
        //    address.MasterCompanyId = 1;
        //    address.CreatedBy = LegalEntityViewModel.CreatedBy;
        //    address.UpdatedBy = LegalEntityViewModel.UpdatedBy;
        //    address.CreatedDate = DateTime.Now;
        //    address.UpdatedDate = DateTime.Now;
        //    actionobject.GeneralCurrencyId = LegalEntityViewModel.GeneralCurrencyId;
        //    //actionobject.IsAddressForBillingAndShipping = LegalEntityViewModel.IsAddressForBillingAndShipping;
        //    if (LegalEntityViewModel.AircraftTypeId != null)
        //    {
        //        var aircraftTypeList = _unitOfWork.LegalEntityAircraftType.GetAllData().ToList();
        //        aircraftTypeList.Where(a => a.LegalEntityId == id).ToList().ForEach(a => _unitOfWork.LegalEntityAircraftType.Remove(a));
        //        _unitOfWork.SaveChanges();
        //        foreach (string s in LegalEntityViewModel.AircraftTypeId)
        //        {
        //            if (s != "")
        //            {
        //                var aircraftType = new LegalEntityAircraftType();
        //                aircraftType.AircraftTypeId = Convert.ToInt32(s);
        //                aircraftType.LegalEntityId = id;
        //                aircraftType.MasterCompanyId = 1;
        //                aircraftType.CreatedBy = LegalEntityViewModel.CreatedBy;
        //                aircraftType.UpdatedBy = LegalEntityViewModel.UpdatedBy;
        //                aircraftType.CreatedDate = DateTime.Now;
        //                aircraftType.UpdatedDate = DateTime.Now;
        //                aircraftType.IsActive = true;
        //                _unitOfWork.LegalEntityAircraftType.Add(aircraftType);
        //                _unitOfWork.SaveChanges();
        //            }
        //        }
        //    }



        //    if (LegalEntityViewModel.IntegrationPortalId != null)
        //    {
        //        var integrationPortalList = _context.IntegrationPortalMapping.Where(a => a.ReferenceId == id && a.ModuleId == Convert.ToInt32(ModuleEnum.LegalEntity)).ToList();

        //        if (integrationPortalList.Count > 0)
        //        {
        //            foreach (var objData in integrationPortalList)
        //            {
        //                _context.IntegrationPortalMapping.Remove(objData);
        //                _unitOfWork.SaveChanges();
        //            }
        //        }

        //        List<IntegrationPortalMapping> listofIntegrationMappings = LegalEntityViewModel
        //            .IntegrationPortalId
        //            .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
        //            ).ToList();
        //        _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.LegalEntity),
        //            actionobject.LegalEntityId, actionobject.CreatedBy);
        //    }

        //    _unitOfWork.Address.Update(address);
        //    _unitOfWork.SaveChanges();
        //    _unitOfWork.LegalEntity.Update(actionobject);
        //    _unitOfWork.SaveChanges();

        //    //Added By Vijay on 12/11/2019 for IsAddressForShipping and IsAddressForBilling as selected as true condition
        //    if (actionobject.LegalEntityId > 0)
        //    {
        //        if (Convert.ToBoolean(actionobject.IsAddressForShipping))
        //        {
        //            long ShippingAddressId = _unitOfWork.LegalEntity.AddLegalEntityShippingAddress(actionobject);
        //            _unitOfWork.CommonRepository.CreateHistory(
        //            LegalEntityViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), actionobject.LegalEntityId, ShippingAddressId, Convert.ToInt32(AddressTypeEnum.ShippingAddress), true);

        //        }

        //        if (Convert.ToBoolean(actionobject.IsAddressForBilling))
        //        {
        //            long BillingAddressId = _unitOfWork.LegalEntity.AddLegalEntityBillinggAddress(actionobject);
        //            _unitOfWork.CommonRepository.CreateHistory(
        //            LegalEntityViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), actionobject.LegalEntityId, BillingAddressId, Convert.ToInt32(AddressTypeEnum.BillingAddress), true);

        //        }
        //    }
        //    if (actionobject.LegalEntityId > 0)
        //    {
        //        _unitOfWork.LegalEntity.AddCustomecontact(actionobject);


        //    }
        //    _unitOfWork.CommonRepository.UpdateRestrictedParts(LegalEntityViewModel.RestrictedPMAParts, actionobject.LegalEntityId, Convert.ToInt32(ModuleEnum.LegalEntity), "PMA");
        //    _unitOfWork.CommonRepository.UpdateRestrictedParts(LegalEntityViewModel.RestrictedDERParts, actionobject.LegalEntityId, Convert.ToInt32(ModuleEnum.LegalEntity), "DER");


        //    List<ClassificationMapping> listofEClassificationMappings = LegalEntityViewModel.LegalEntityClassificationIds
        //        .Select(item => new ClassificationMapping() { ClasificationId = item.Value }
        //        ).ToList();

        //    _unitOfWork.CommonRepository.UpdateClassificationMappings(listofEClassificationMappings, Convert.ToInt32(ModuleEnum.LegalEntity), actionobject.LegalEntityId, actionobject.CreatedBy);

        //    if (Convert.ToBoolean(actionobject.IsLegalEntityAlsoVendor))
        //    {
        //        //_unitOfWork.LegalEntity.AddVendor(actionobject);
        //        long vendorId = 0;
        //        long addressId = 0;
        //        var objVendor = _unitOfWork.Vendor.GetSingleOrDefault(a => a.RelatedLegalEntityId == id);
        //        if (objVendor != null)
        //        {
        //            //objVendor.RelatedLegalEntityId = actionobject.LegalEntityId;
        //            objVendor.MasterCompanyId = 1;
        //            objVendor.IsActive = actionobject.IsActive;
        //            objVendor.IsDeleted = actionobject.IsDeleted;
        //            objVendor.VendorTypeId = actionobject.LegalEntityAffiliationId;
        //            objVendor.CurrencyId = actionobject.CurrencyId;
        //            objVendor.CreditTermsId = actionobject.CreditTermsId;
        //            objVendor.VendorName = actionobject.Name;
        //            objVendor.Parent = Convert.ToInt64(actionobject.Parent);
        //            objVendor.VendorEmail = actionobject.Email;
        //            objVendor.VendorPhone = actionobject.LegalEntityPhone;
        //            objVendor.VendorPhoneExt = actionobject.LegalEntityPhoneExt;
        //            objVendor.IsAddressForBilling = actionobject.IsAddressForBilling;
        //            objVendor.IsAddressForShipping = actionobject.IsAddressForShipping;
        //            objVendor.VendorCode = actionobject.LegalEntityCode;
        //            objVendor.VendorURL = actionobject.LegalEntityURL;
        //            objVendor.VendorContractReference = actionobject.ContractReference;
        //            objVendor.DoingBusinessAsName = actionobject.DoingBuinessAsName;
        //            objVendor.Parent = Convert.ToInt64(actionobject.Parent);

        //            objVendor.MasterCompanyId = Convert.ToInt32(actionobject.MasterCompanyId);

        //            objVendor.CreatedDate = DateTime.Now;
        //            objVendor.UpdatedDate = DateTime.Now;
        //            objVendor.CreatedBy = actionobject.CreatedBy;
        //            objVendor.UpdatedBy = actionobject.UpdatedBy;

        //            UpdateAddress(LegalEntityViewModel, Convert.ToInt64(objVendor.AddressId));
        //            //objVendor.AddressId = LegalEntityViewModel.Addressid.Value;

        //            _context.Vendor.Update(objVendor);
        //            _context.SaveChanges();
        //            vendorId = objVendor.VendorId;
        //            addressId = Convert.ToInt64(objVendor.AddressId);
        //        }
        //        else
        //        {
        //            Vendor objcreateVendor = new Vendor();

        //            objcreateVendor.RelatedLegalEntityId = actionobject.LegalEntityId;
        //            objcreateVendor.MasterCompanyId = 1;
        //            objcreateVendor.IsActive = true;
        //            objcreateVendor.IsDeleted = false;
        //            objcreateVendor.VendorTypeId = actionobject.LegalEntityAffiliationId;
        //            objcreateVendor.CurrencyId = actionobject.CurrencyId;
        //            objcreateVendor.CreditTermsId = actionobject.CreditTermsId;
        //            objcreateVendor.VendorName = actionobject.Name;
        //            objcreateVendor.Parent = Convert.ToInt64(actionobject.Parent);
        //            objcreateVendor.VendorEmail = actionobject.Email;
        //            objcreateVendor.VendorPhone = actionobject.LegalEntityPhone;
        //            objcreateVendor.VendorPhoneExt = actionobject.LegalEntityPhoneExt;
        //            objcreateVendor.IsAddressForBilling = actionobject.IsAddressForBilling;
        //            objcreateVendor.IsAddressForShipping = actionobject.IsAddressForShipping;
        //            objcreateVendor.VendorCode = actionobject.LegalEntityCode;
        //            objcreateVendor.VendorURL = actionobject.LegalEntityURL;
        //            objcreateVendor.VendorContractReference = actionobject.ContractReference;
        //            objcreateVendor.DoingBusinessAsName = actionobject.DoingBuinessAsName;
        //            objcreateVendor.Parent = Convert.ToInt64(actionobject.Parent);

        //            objcreateVendor.MasterCompanyId = Convert.ToInt32(actionobject.MasterCompanyId);

        //            objcreateVendor.CreatedDate = DateTime.Now;
        //            objcreateVendor.UpdatedDate = DateTime.Now;
        //            objcreateVendor.CreatedBy = actionobject.CreatedBy;
        //            objcreateVendor.UpdatedBy = actionobject.UpdatedBy;

        //            AddAddress(LegalEntityViewModel);
        //            objcreateVendor.AddressId = LegalEntityViewModel.Addressid.Value;

        //            _context.Vendor.Add(objcreateVendor);
        //            _context.SaveChanges();
        //            vendorId = objcreateVendor.VendorId;
        //            addressId = Convert.ToInt64(objcreateVendor.AddressId);

        //        }
        //        if (LegalEntityViewModel.IntegrationPortalId != null)
        //        {
        //            var integrationPortalList = _context.IntegrationPortalMapping.Where(a => a.ReferenceId == vendorId && a.ModuleId == Convert.ToInt32(ModuleEnum.Vendor)).ToList();

        //            if (integrationPortalList.Count > 0)
        //            {
        //                foreach (var objData in integrationPortalList)
        //                {
        //                    _context.IntegrationPortalMapping.Remove(objData);
        //                    _unitOfWork.SaveChanges();
        //                }
        //            }

        //            List<IntegrationPortalMapping> listofIntegrationMappings = LegalEntityViewModel
        //                .IntegrationPortalId
        //                .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = Convert.ToInt64(item) }
        //                ).ToList();
        //            _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Vendor),
        //                vendorId, actionobject.CreatedBy);
        //        }

        //        if (vendorId > 0)
        //        {
        //            _unitOfWork.LegalEntity.AddVendorContact(actionobject, vendorId);

        //            if (Convert.ToBoolean(LegalEntityViewModel.IsAddressForShipping))
        //            {
        //                _unitOfWork.LegalEntity.AddVendorShippingAddress(actionobject, vendorId, addressId);

        //            }

        //            if (Convert.ToBoolean(LegalEntityViewModel.IsAddressForBilling))
        //            {
        //                _unitOfWork.LegalEntity.AddVendorBillingAddress(actionobject, vendorId, addressId);
        //            }


        //        }

        //    }


        //    return Ok(actionobject);
        //}

        //[ApiExplorerSettings(IgnoreApi = true)]
        //public IActionResult AddAddress(LegalEntityViewModel LegalEntityViewModel)
        //{
        //    Address address = new Address();
        //    address.Line1 = LegalEntityViewModel.Address1;
        //    address.Line2 = LegalEntityViewModel.Address2;
        //    address.Line3 = LegalEntityViewModel.Address3;
        //    address.PostalCode = LegalEntityViewModel.PostalCode;
        //    address.StateOrProvince = LegalEntityViewModel.StateOrProvince;
        //    address.City = LegalEntityViewModel.City;
        //    address.Country = LegalEntityViewModel.Country;
        //    address.MasterCompanyId = 1;
        //    address.IsActive = true;
        //    address.CreatedBy = LegalEntityViewModel.CreatedBy;
        //    address.UpdatedBy = LegalEntityViewModel.UpdatedBy;
        //    address.CreatedDate = DateTime.Now;
        //    address.UpdatedDate = DateTime.Now;
        //    _unitOfWork.Address.Add(address);
        //    //_unitOfWork.Repository<LegalEntity>().
        //    _unitOfWork.SaveChanges();
        //    LegalEntityViewModel.Addressid = address.AddressId.Value;
        //    return Ok(ModelState);
        //}

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult UpdateAddress(LegalEntityViewModel LegalEntityViewModel, long addressId)
        {
            var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == addressId);

            address.Line1 = LegalEntityViewModel.Address1;
            address.Line2 = LegalEntityViewModel.Address2;
            //address.Line3 = LegalEntityViewModel.Address3;
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

        //[HttpGet("getLegalEntityShipViaDetails/{Selectedrow}")]
        //[Produces(typeof(List<LegalEntityShipping>))]
        //public IActionResult getLegalEntityShipViaDetails(long Selectedrow)
        //{

        //    var allShipViaDetails = _unitOfWork.LegalEntityShippingAddress.GetAllShipViaDetails(Selectedrow); //.GetAllLegalEntitysData();
        //    return Ok(allShipViaDetails);

        //}

        //[HttpGet("ContactGet/{contactId}")]
        //[Produces(typeof(List<Contact>))]
        //public IActionResult Contactget(long contactId)
        //{
        //    var allContacts = _unitOfWork.ContactRepository.GetLegalEntityContacts(contactId); //.GetAllLegalEntitysData();
        //    return Ok(allContacts);

        //}

        [HttpGet("ContactCompleteGet")]
        [Produces(typeof(List<Contact>))]
        public IActionResult ContactCompleteget()
        {
            var allContacts = _unitOfWork.ContactRepository.GetCompleteContacts(); //.GetAllLegalEntitysData();
            return Ok(allContacts);

        }

        //[HttpPost("LegalEntityContactPost")]
        //public IActionResult CreateContact([FromBody] ContactViewModel contactViewModel, LegalEntitycontactViewModel LegalEntitycontactViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (contactViewModel == null)
        //            return BadRequest($"{nameof(contactViewModel)} cannot be null");
        //        Contact contactObj = new Contact();
        //        contactViewModel.MasterCompanyId = 1;
        //        contactViewModel.ContactId = null;
        //        contactObj.ContactId = contactViewModel.ContactId;
        //        contactObj.Prefix = contactViewModel.Prefix;
        //        contactObj.Suffix = contactViewModel.Suffix;
        //        contactObj.ContactTitle = contactViewModel.ContactTitle;
        //        contactObj.AlternatePhone = contactViewModel.AlternatePhone;
        //        contactObj.Email = contactViewModel.Email;
        //        contactObj.Fax = contactViewModel.Fax;
        //        contactObj.Tag = contactViewModel.Tag;
        //        contactObj.FirstName = contactViewModel.FirstName;
        //        contactObj.LastName = contactViewModel.LastName;
        //        contactObj.MiddleName = contactViewModel.MiddleName;
        //        contactObj.ContactTitle = contactViewModel.ContactTitle;
        //        contactObj.MobilePhone = contactViewModel.MobilePhone;
        //        contactObj.Notes = contactViewModel.Notes;
        //        contactObj.WorkPhone = contactViewModel.WorkPhone;
        //        contactObj.WebsiteURL = contactViewModel.WebsiteURL;
        //        contactObj.MasterCompanyId = contactViewModel.MasterCompanyId;
        //        contactObj.WorkPhoneExtn = contactViewModel.WorkPhoneExtn;
        //        contactObj.IsActive = true;
        //        contactObj.CreatedDate = DateTime.Now;
        //        contactObj.UpdatedDate = DateTime.Now;
        //        contactObj.CreatedBy = contactViewModel.CreatedBy;
        //        contactObj.UpdatedBy = contactViewModel.UpdatedBy;
        //        contactObj.WorkPhoneExtn = contactObj.WorkPhoneExtn;
        //        _unitOfWork.ContactRepository.Add(contactObj);

        //        _unitOfWork.SaveChanges();
        //        contactViewModel.ContactId = contactObj.ContactId;
        //        return Ok(contactViewModel);
        //    }

        //    return Ok(ModelState);
        //}

        //[HttpPost("ContactPost")]
        //public IActionResult CreateLegalEntityContact([FromBody] LegalEntitycontactViewModel LegalEntityContactViewModel)
        //{

        //    if (ModelState.IsValid)
        //    {
        //        if (LegalEntityContactViewModel == null)
        //            return BadRequest($"{nameof(LegalEntityContactViewModel)} cannot be null");
        //        LegalEntityContact contactObj = new LegalEntityContact();
        //        LegalEntityContactViewModel.MasterCompanyId = 1;
        //        contactObj.ContactId = LegalEntityContactViewModel.ContactId;
        //        contactObj.LegalEntityId = LegalEntityContactViewModel.LegalEntityId;
        //        contactObj.MasterCompanyId = LegalEntityContactViewModel.MasterCompanyId;
        //        contactObj.IsActive = LegalEntityContactViewModel.IsActive;
        //        contactObj.CreatedDate = DateTime.Now;
        //        contactObj.UpdatedDate = DateTime.Now;
        //        contactObj.IsDeleted = false;
        //        contactObj.CreatedBy = LegalEntityContactViewModel.CreatedBy;
        //        contactObj.UpdatedBy = LegalEntityContactViewModel.UpdatedBy;

        //        if (LegalEntityContactViewModel.IsDefaultContact == true)
        //        {
        //            var LegalEntityContact = _context.LegalEntityContact.Where(p => p.LegalEntityId == LegalEntityContactViewModel.LegalEntityId).ToList();

        //            if (LegalEntityContact != null && LegalEntityContact.Count > 0)
        //            {
        //                foreach (var item in LegalEntityContact)
        //                {
        //                    item.IsDefaultContact = false;
        //                    _context.LegalEntityContact.Update(item);
        //                    _context.SaveChanges();
        //                }
        //            }



        //        }
        //        contactObj.IsDefaultContact = LegalEntityContactViewModel.IsDefaultContact;

        //        _unitOfWork.LegalEntityContact.Add(contactObj);
        //        _unitOfWork.SaveChanges();
        //        Contact data = _context.Contact.AsNoTracking().Where(p => p.ContactId == Convert.ToInt64(LegalEntityContactViewModel.ContactId)).FirstOrDefault();

        //        //var data = _unitOfWork.ContactRepository.GetContactsById(Convert.ToInt64(LegalEntityContactViewModel.ContactId)).FirstOrDefault();
        //        ContactAudit obj = new ContactAudit();


        //        obj.IsDefaultContact = LegalEntityContactViewModel.IsDefaultContact;

        //        obj.LastName = data.LastName;
        //        obj.FirstName = data.FirstName;
        //        obj.Tag = data.Tag;
        //        obj.MiddleName = data.MiddleName;
        //        obj.ContactTitle = data.ContactTitle;
        //        obj.WorkPhone = data.WorkPhone;
        //        obj.MobilePhone = data.MobilePhone;
        //        obj.Prefix = data.Prefix;
        //        obj.Suffix = data.Suffix;
        //        obj.AlternatePhone = data.AlternatePhone;
        //        obj.WorkPhoneExtn = data.WorkPhoneExtn;
        //        obj.Fax = data.Fax;
        //        obj.Email = data.Email;
        //        obj.Notes = data.Notes;
        //        obj.WebsiteURL = data.WebsiteURL;
        //        obj.MasterCompanyId = data.MasterCompanyId;
        //        obj.CreatedDate = DateTime.Now;
        //        obj.UpdatedDate = DateTime.Now;
        //        obj.CreatedBy = data.CreatedBy;
        //        obj.UpdatedBy = data.UpdatedBy;
        //        obj.IsActive = data.IsActive;

        //        _unitOfWork.CommonRepository.CreateContactHistory(obj, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(contactObj.LegalEntityId), Convert.ToInt64(contactObj.LegalEntityContactId));

        //    }
        //    return Ok(ModelState);
        //}

        //[HttpPut("LegalEntityContactPost/{id}")]
        //public IActionResult updateContact(long id, [FromBody] ContactViewModel contactViewModel, LegalEntitycontactViewModel LegalEntitycontactView)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (contactViewModel == null)
        //            return BadRequest($"{nameof(contactViewModel)} cannot be null");
        //        var contactObj = _unitOfWork.ContactRepository.GetSingleOrDefault(c => c.ContactId == id);
        //        contactViewModel.MasterCompanyId = 1;
        //        contactObj.ContactId = contactViewModel.ContactId;
        //        contactObj.ContactTitle = contactViewModel.ContactTitle;
        //        contactObj.AlternatePhone = contactViewModel.AlternatePhone;
        //        contactObj.Email = contactViewModel.Email;
        //        contactObj.Fax = contactViewModel.Fax;
        //        contactObj.Prefix = contactViewModel.Prefix;
        //        contactObj.Suffix = contactViewModel.Suffix;
        //        contactObj.FirstName = contactViewModel.FirstName;
        //        contactObj.LastName = contactViewModel.LastName;
        //        contactObj.MiddleName = contactViewModel.MiddleName;
        //        contactObj.ContactTitle = contactViewModel.ContactTitle;
        //        contactObj.MobilePhone = contactViewModel.MobilePhone;
        //        contactObj.Tag = contactViewModel.Tag;

        //        contactObj.Notes = contactViewModel.Notes;
        //        contactObj.WorkPhone = contactViewModel.WorkPhone;
        //        contactObj.WebsiteURL = contactViewModel.WebsiteURL;
        //        contactObj.MasterCompanyId = contactViewModel.MasterCompanyId;
        //        contactObj.IsActive = contactViewModel.IsActive;
        //        contactObj.CreatedDate = DateTime.Now;
        //        contactObj.UpdatedDate = DateTime.Now;
        //        contactObj.WorkPhoneExtn = contactViewModel.WorkPhoneExtn;
        //        //contactObj.IsDefaultContact = contactViewModel.IsDefaultContact;
        //        contactObj.CreatedBy = contactViewModel.CreatedBy;
        //        contactObj.UpdatedBy = contactViewModel.UpdatedBy;

        //        _unitOfWork.ContactRepository.Update(contactObj);
        //        _unitOfWork.SaveChanges();
        //        /*Update LegalEntity Contacts*/


        //        var LegalEntityContact = _context.LegalEntityContact.Where(p => p.ContactId == id).FirstOrDefault();

        //        if (contactViewModel.IsDefaultContact == true)
        //        {
        //            var LegalEntityContacts = _context.LegalEntityContact.Where(p => p.LegalEntityId == LegalEntityContact.LegalEntityId).ToList();

        //            if (LegalEntityContacts != null && LegalEntityContacts.Count > 0)
        //            {
        //                foreach (var item in LegalEntityContacts)
        //                {
        //                    item.IsDefaultContact = false;
        //                    _context.LegalEntityContact.Update(item);
        //                    _context.SaveChanges();
        //                }
        //            }

        //        }


        //        if (LegalEntityContact != null)
        //        {
        //            LegalEntityContact.UpdatedDate = DateTime.Now;
        //            LegalEntityContact.UpdatedBy = contactViewModel.UpdatedBy;
        //            LegalEntityContact.IsDefaultContact = contactViewModel.IsDefaultContact;
        //            _unitOfWork.LegalEntityContact.Update(LegalEntityContact);
        //            _unitOfWork.SaveChanges();
        //            _unitOfWork.CommonRepository.CreateContactHistory(contactViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityContact.LegalEntityId), Convert.ToInt64(LegalEntityContact.LegalEntityContactId));
        //        }

        //    }
        //    return Ok(contactViewModel);
        //}

        //[HttpGet("LegalEntitycontactauditdetails")]
        //public IActionResult GetAuditHistoryById(long LegalEntitycontactId, long LegalEntityId)
        //{
        //    try
        //    {
        //        var result = _unitOfWork.CommonRepository.GetContactAudit(LegalEntityId, Convert.ToInt32(ModuleEnum.LegalEntity), LegalEntitycontactId);
        //        return Ok(result);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        //[HttpGet("getContactHistroty/{id}", Name = "getContactHistrotyById")]
        //[Produces(typeof(List<AuditHistory>))]
        //[ApiExplorerSettings(IgnoreApi = true)]
        //public IActionResult GetAuditHostoryById(long id)
        //{
        //    var result = _unitOfWork.AuditHistory.GetAllHistory("Contact", id); //.GetAllLegalEntitysData();
        //    try
        //    {
        //        var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

        //        return Ok(resul1);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpDelete("LegalEntityContact/{id}")]
        //[Produces(typeof(LegalEntitycontactViewModel))]
        //public IActionResult DeleteAction(long id, string updatedBy)
        //{

        //    LegalEntityContact model = new LegalEntityContact();
        //    model.LegalEntityContactId = id;
        //    model.UpdatedDate = DateTime.Now;
        //    model.IsDeleted = true;
        //    model.UpdatedBy = updatedBy;

        //    _context.LegalEntityContact.Attach(model);

        //    _context.Entry(model).Property(x => x.IsDeleted).IsModified = true;
        //    _context.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
        //    _context.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

        //    _context.SaveChanges();
        //    return Ok();


        //}
        //[HttpPost("LegalEntityShippingPost")]
        //public IActionResult CreateShipping([FromBody] LegalEntityShippingViewModel LegalEntityshipping, Address address, long? LegalEntityAddressid, LegalEntityShippingAdressViewModel LegalEntityShippingAdressViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (LegalEntityshipping == null)
        //            return BadRequest($"{nameof(LegalEntityshipping)} cannot be null");

        //        long? id = 0;

        //        LegalEntityshipping.MasterCompanyId = 1;
        //        LegalEntityshipping.IsActive = true;
        //        LegalEntityShippingAdressViewModel.IsActive = true;
        //        LegalEntityshipping.CreatedBy = LegalEntityshipping.CreatedBy;
        //        LegalEntityshipping.UpdatedBy = LegalEntityshipping.UpdatedBy;
        //        LegalEntityshipping.CreatedDate = DateTime.Now;
        //        LegalEntityshipping.UpdatedDate = DateTime.Now;

        //        address.Line1 = LegalEntityshipping.Address1;
        //        address.Line2 = LegalEntityshipping.Address2;
        //        address.Line3 = LegalEntityshipping.Address3;
        //        address.City = LegalEntityshipping.City;
        //        address.StateOrProvince = LegalEntityshipping.StateOrProvince;
        //        address.PostalCode = LegalEntityshipping.PostalCode;
        //        address.Country = LegalEntityshipping.Country;
        //        address.MasterCompanyId = 1;
        //        address.CreatedBy = LegalEntityshipping.CreatedBy;
        //        address.UpdatedBy = LegalEntityshipping.UpdatedBy;

        //        address.UpdatedDate = DateTime.Now;
        //        address.IsActive = LegalEntityshipping.IsActive;



        //        if (LegalEntityshipping.AddressId > 0)
        //        {
        //            address.CreatedDate = LegalEntityshipping.CreatedDate;
        //            address.AddressId = LegalEntityshipping.AddressId;
        //            _unitOfWork.Address.Update(address);
        //        }
        //        else
        //        {
        //            address.CreatedDate = DateTime.Now;
        //            _unitOfWork.Address.Add(address);
        //        }


        //        _unitOfWork.SaveChanges();

        //        updateCusShipdetails(LegalEntityShippingAdressViewModel, address.AddressId, LegalEntityshipping, address);
        //        return Ok(LegalEntityshipping);
        //    }

        //    return Ok(ModelState);
        //}

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



        //[HttpPost("List")]
        //public IActionResult GetList([FromBody] Filters<LegalEntityFilters> LegalEntityFilters)
        //{
        //    var result = _unitOfWork.LegalEntity.GetList(LegalEntityFilters);
        //    return Ok(result);

        //}
        //[HttpGet("ListGlobalSearch")]

        //public IActionResult GetListGlobalFilter(string value, int pageNumber, int pageSize)
        //{
        //    var result = _unitOfWork.LegalEntity.GetListGlobalFilter(value, pageNumber, pageSize);
        //    return Ok(result);
        //}

        //[HttpGet("LegalEntitysUpdateforActive")]
        //public IActionResult LegalEntityStatus(long LegalEntityId, bool status, string updatedBy)
        //{
        //    _unitOfWork.LegalEntity.LegalEntityStatus(LegalEntityId, status, updatedBy);
        //    return Ok();

        //}
        //[HttpPut("shippingUpdateforActive/{id}")]
        //public IActionResult shippingUpdateforActive(long id, [FromBody]LegalEntityShippingAdressViewModel LegalEntityshipping)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (LegalEntityshipping == null)
        //            return BadRequest($"{nameof(LegalEntityshipping)} cannot be null");
        //        var LegalEntityObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(a => a.LegalEntityShippingAddressId == id);
        //        LegalEntityshipping.MasterCompanyId = 1;
        //        //LegalEntityObj.IsActive = true;
        //        LegalEntityObj.IsActive = LegalEntityshipping.IsActive;
        //        LegalEntityObj.UpdatedDate = DateTime.Now;
        //        LegalEntityObj.UpdatedBy = LegalEntityshipping.UpdatedBy;
        //        LegalEntityObj.LegalEntityShippingAddressId = LegalEntityshipping.LegalEntityShippingAddressId;
        //        _unitOfWork.LegalEntityShippingAddress.Update(LegalEntityObj);
        //        _unitOfWork.SaveChanges();
        //        return Ok(LegalEntityObj);
        //    }

        //    return Ok(ModelState);
        //}


        //  [HttpPost("updateShipping")]
        //  public IActionResult updateShipping([FromBody]LegalEntityShippingViewModel LegalEntityshipping, Address address, long? LegalEntityAddressid, LegalEntityShippingViewModel LegalEntityShippingAdressViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityshipping == null)
        //              return BadRequest($"{nameof(LegalEntityshipping)} cannot be null");
        //          LegalEntityShippingAddress LegalEntityObj = new LegalEntityShippingAddress();
        //          LegalEntityshipping.MasterCompanyId = 1;
        //          // LegalEntityObj.IsActive = true;
        //          LegalEntityObj.IsActive = LegalEntityshipping.IsActive;
        //          LegalEntityObj.IsPrimary = LegalEntityshipping.IsPrimary;
        //          LegalEntityObj.CreatedDate = DateTime.Now;
        //          LegalEntityObj.UpdatedDate = DateTime.Now;
        //          LegalEntityObj.CreatedBy = LegalEntityshipping.CreatedBy;
        //          LegalEntityObj.UpdatedBy = LegalEntityshipping.UpdatedBy;
        //          LegalEntityObj.LegalEntityId = LegalEntityshipping.LegalEntityId;
        //          //updateVendorShippingAddress(vendorShippingAdressViewModel, id, vendorshipping, address);
        //          _unitOfWork.LegalEntityShippingAddress.Add(LegalEntityObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(LegalEntityObj);
        //      }

        //      return Ok(ModelState);
        //  }
        //  [HttpPost("LegalEntityShippingAddressDetails")]
        //  public IActionResult updateLegalEntityShippingAddress([FromBody] LegalEntityShippingViewModel LegalEntityshippingViewModel, long? id, LegalEntityShippingViewModel LegalEntityshipping, Address address)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityshippingViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityshippingViewModel)} cannot be null");
        //          LegalEntityShippingAddress LegalEntityShippingAddressObj = new LegalEntityShippingAddress();
        //          LegalEntityShippingAddressObj.IsActive = true;
        //          LegalEntityShippingAddressObj.IsPrimary = LegalEntityshipping.IsPrimary;
        //          LegalEntityShippingAddressObj.LegalEntityId = LegalEntityshipping.LegalEntityId;
        //          LegalEntityShippingAddressObj.MasterCompanyId = 1;
        //          LegalEntityShippingAddressObj.IsActive = LegalEntityshipping.IsActive;
        //          LegalEntityShippingAddressObj.CreatedDate = DateTime.Now;
        //          LegalEntityShippingAddressObj.UpdatedDate = DateTime.Now;
        //          LegalEntityShippingAddressObj.CreatedBy = LegalEntityshipping.CreatedBy;
        //          LegalEntityShippingAddressObj.UpdatedBy = LegalEntityshipping.UpdatedBy;
        //          _unitOfWork.LegalEntityShippingAddress.Add(LegalEntityShippingAddressObj);
        //          _unitOfWork.SaveChanges();
        //          long? venAddressid = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
        //          LegalEntityshipping.LegalEntityShippingAddressId = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
        //          //updateShipping(vendorshipping, address, venAddressid, LegalEntityShippingViewModel);
        //          return Ok(LegalEntityShippingAddressObj);


        //      }

        //      return Ok(ModelState);
        //  }

        //  [ApiExplorerSettings(IgnoreApi = true)]
        //  public IActionResult updateCusShipdetails([FromBody] LegalEntityShippingAdressViewModel LegalEntityshippingViewModel, long? id, LegalEntityShippingViewModel LegalEntityshipping, Address address)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityshippingViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityshippingViewModel)} cannot be null");
        //          LegalEntityShippingAddress LegalEntityShippingAddressObj = new LegalEntityShippingAddress();
        //          LegalEntityShippingAddressObj.IsActive = true;
        //          LegalEntityShippingAddressObj.LegalEntityId = LegalEntityshipping.LegalEntityId;
        //          LegalEntityShippingAddressObj.AddressId = id;
        //          LegalEntityShippingAddressObj.SiteName = LegalEntityshipping.SiteName;
        //          LegalEntityShippingAddressObj.ExportLicenseNumber = LegalEntityshipping.ExportLicenseNumber;
        //          LegalEntityShippingAddressObj.Description = LegalEntityshipping.Description;
        //          LegalEntityShippingAddressObj.StartDate = LegalEntityshipping.StartDate;
        //          LegalEntityShippingAddressObj.ExpirationDate = LegalEntityshipping.ExpirationDate;
        //          LegalEntityShippingAddressObj.Amount = LegalEntityshipping.Amount;
        //          LegalEntityShippingAddressObj.MasterCompanyId = 1;
        //          //LegalEntityShippingAddressObj.IsActive = LegalEntityshipping.IsActive;

        //          LegalEntityShippingAddressObj.UpdatedDate = DateTime.Now;
        //          LegalEntityShippingAddressObj.CreatedBy = LegalEntityshipping.CreatedBy;
        //          LegalEntityShippingAddressObj.UpdatedBy = LegalEntityshipping.UpdatedBy;



        //          if (LegalEntityshipping.IsPrimary == true)
        //          {
        //              LegalEntityShippingAddress shippingAddress = new LegalEntityShippingAddress();
        //              shippingAddress = _context.LegalEntityShippingAddress.Where(p => p.LegalEntityId == LegalEntityshipping.LegalEntityId && p.IsPrimary == true).FirstOrDefault();

        //              if (shippingAddress != null && shippingAddress.LegalEntityShippingAddressId != LegalEntityshipping.LegalEntityShippingAddressId)
        //              {
        //                  shippingAddress.IsPrimary = false;
        //                  _context.LegalEntityShippingAddress.Update(shippingAddress);
        //                  _context.SaveChanges();
        //                  _unitOfWork.CommonRepository.CreateHistory(
        //       shippingAddress, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityshipping.LegalEntityId), Convert.ToInt64(shippingAddress.LegalEntityShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);
        //              }
        //          }

        //          LegalEntityShippingAddressObj.IsPrimary = LegalEntityshipping.IsPrimary;
        //          //LegalEntityShippingAddressObj.IsPrimary = false;

        //          if (LegalEntityshipping.LegalEntityShippingAddressId > 0)
        //          {
        //              LegalEntityShippingAddressObj.CreatedDate = LegalEntityshipping.CreatedDate;
        //              LegalEntityShippingAddressObj.LegalEntityShippingAddressId = LegalEntityshipping.LegalEntityShippingAddressId;
        //              _unitOfWork.LegalEntityShippingAddress.Update(LegalEntityShippingAddressObj);
        //          }
        //          else
        //          {
        //              LegalEntityShippingAddressObj.CreatedDate = DateTime.Now;
        //              _unitOfWork.LegalEntityShippingAddress.Add(LegalEntityShippingAddressObj);
        //          }



        //          _unitOfWork.SaveChanges();
        //          long? venAddressid = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
        //          LegalEntityshipping.LegalEntityShippingId = LegalEntityShippingAddressObj.LegalEntityShippingAddressId;
        //          _unitOfWork.CommonRepository.CreateHistory(
        //       LegalEntityshipping, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityshipping.LegalEntityId), Convert.ToInt64(LegalEntityshipping.LegalEntityShippingId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);

        //          //updateShipping(vendorshipping, address, venAddressid, LegalEntityShippingViewModel);
        //          return Ok(LegalEntityShippingAddressObj);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpPut("updateShipAddress/{id}")]
        //  public IActionResult saveShipDetails(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityShippingViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
        //          var checkPaymentObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
        //          var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == LegalEntityShippingViewModel.LegalEntityShippingAddressId);
        //          checkPaymentObj.IsActive = true;
        //          checkPaymentObj.MasterCompanyId = 1;
        //          checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
        //          checkPaymentObj.SiteName = LegalEntityShippingViewModel.SiteName;
        //          checkPaymentObj.CreatedDate = DateTime.Now;
        //          checkPaymentObj.UpdatedDate = DateTime.Now;
        //          checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          addressObj.Line1 = LegalEntityShippingViewModel.Address1;
        //          addressObj.Line2 = LegalEntityShippingViewModel.Address2;
        //          addressObj.Line3 = LegalEntityShippingViewModel.Address3;
        //          addressObj.PostalCode = LegalEntityShippingViewModel.PostalCode;
        //          addressObj.StateOrProvince = LegalEntityShippingViewModel.StateOrProvince;
        //          addressObj.City = LegalEntityShippingViewModel.City;
        //          addressObj.Country = LegalEntityShippingViewModel.Country;
        //          addressObj.MasterCompanyId = 1;
        //          // addressObj.RecordCreateDate = DateTime.Now;
        //          addressObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          addressObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          //addressObj.CreatedDate = DateTime.Now;
        //          addressObj.UpdatedDate = DateTime.Now;
        //          _unitOfWork.Address.Update(addressObj);
        //          _unitOfWork.LegalEntityShippingAddress.Update(checkPaymentObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(checkPaymentObj);
        //      }

        //      return Ok(ModelState);
        //  }

        //  [HttpPost("addShipViaDetails")]
        //  public IActionResult CreateShipViaDetails([FromBody]  LegalEntityShippingViewModel LegalEntityShippingDetailsViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityShippingDetailsViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityShippingDetailsViewModel)} cannot be null");
        //          LegalEntityShipping actionobject = new LegalEntityShipping();

        //          LegalEntityShippingDetailsViewModel.MasterCompanyId = 1;
        //          //actionobject.IsActive = true;
        //          actionobject.LegalEntityId = LegalEntityShippingDetailsViewModel.LegalEntityId;
        //          actionobject.LegalEntityShippingAddressId = LegalEntityShippingDetailsViewModel.LegalEntityShippingAddressId;
        //          actionobject.ShipVia = LegalEntityShippingDetailsViewModel.ShipVia;
        //          actionobject.ShippingAccountinfo = LegalEntityShippingDetailsViewModel.ShippingAccountinfo;
        //          actionobject.ShippingId = LegalEntityShippingDetailsViewModel.ShippingId;
        //          actionobject.ShippingURL = LegalEntityShippingDetailsViewModel.ShippingURL;
        //          actionobject.MasterCompanyId = LegalEntityShippingDetailsViewModel.MasterCompanyId;
        //          actionobject.IsActive = true;
        //          actionobject.Memo = LegalEntityShippingDetailsViewModel.Memo;
        //          actionobject.CreatedDate = DateTime.Now;
        //          actionobject.UpdatedDate = DateTime.Now;
        //          actionobject.CreatedBy = LegalEntityShippingDetailsViewModel.CreatedBy;
        //          actionobject.UpdatedBy = LegalEntityShippingDetailsViewModel.UpdatedBy;
        //          _unitOfWork.LegalEntityShipping.Add(actionobject);
        //          _unitOfWork.SaveChanges();
        //          return Ok(actionobject);
        //      }

        //      return Ok(ModelState);
        //  }

        //  [HttpPut("updateShipViaDetails/{id}")]
        //  public IActionResult updateShipviaAddress(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {

        //      if (ModelState.IsValid)
        //      {
        //          var checkPaymentObj = _unitOfWork.LegalEntityShipping.GetSingleOrDefault(c => c.LegalEntityShippingId == id);


        //          checkPaymentObj.IsActive = true;

        //          checkPaymentObj.MasterCompanyId = 1;
        //          checkPaymentObj.LegalEntityId = LegalEntityShippingViewModel.LegalEntityId;
        //          checkPaymentObj.LegalEntityShippingAddressId = LegalEntityShippingViewModel.LegalEntityShippingAddressId;
        //          checkPaymentObj.ShipVia = LegalEntityShippingViewModel.ShipVia;
        //          checkPaymentObj.ShippingAccountinfo = LegalEntityShippingViewModel.ShippingAccountinfo;
        //          checkPaymentObj.ShippingId = LegalEntityShippingViewModel.ShippingId;
        //          checkPaymentObj.ShippingURL = LegalEntityShippingViewModel.ShippingURL;
        //          checkPaymentObj.MasterCompanyId = LegalEntityShippingViewModel.MasterCompanyId;
        //          checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
        //          checkPaymentObj.Memo = LegalEntityShippingViewModel.Memo;
        //          checkPaymentObj.CreatedDate = DateTime.Now;
        //          checkPaymentObj.UpdatedDate = DateTime.Now;
        //          checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          _unitOfWork.LegalEntityShipping.Update(checkPaymentObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(checkPaymentObj);

        //      }


        //      return Ok(ModelState);
        //  }


        //  #region ShipVia

        //  [HttpPost("InsShipVia")]
        //  public IActionResult InsertShipViaDetails([FromBody]  LegalEntityShippingViewModel LegalEntityShippingDetailsViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityShippingDetailsViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityShippingDetailsViewModel)} cannot be null");
        //          LegalEntityShipping actionobject = new LegalEntityShipping();
        //          actionobject.LegalEntityId = LegalEntityShippingDetailsViewModel.LegalEntityId;
        //          actionobject.ShipVia = LegalEntityShippingDetailsViewModel.ShipVia;
        //          actionobject.LegalEntityShippingAddressId = LegalEntityShippingDetailsViewModel.LegalEntityShippingAddressId;
        //          actionobject.ShippingAccountinfo = LegalEntityShippingDetailsViewModel.ShippingAccountinfo;
        //          actionobject.ShippingId = LegalEntityShippingDetailsViewModel.ShippingId;
        //          actionobject.ShippingURL = LegalEntityShippingDetailsViewModel.ShippingURL;
        //          actionobject.Memo = LegalEntityShippingDetailsViewModel.Memo;
        //          actionobject.MasterCompanyId = LegalEntityShippingDetailsViewModel.MasterCompanyId = 1;
        //          actionobject.CreatedDate = DateTime.Now;
        //          actionobject.UpdatedDate = DateTime.Now;
        //          actionobject.CreatedBy = LegalEntityShippingDetailsViewModel.CreatedBy;
        //          actionobject.UpdatedBy = LegalEntityShippingDetailsViewModel.UpdatedBy;
        //          actionobject.IsActive = LegalEntityShippingDetailsViewModel.IsActive;
        //          _unitOfWork.LegalEntityShipping.Add(actionobject);
        //          _unitOfWork.SaveChanges();
        //          return Ok(actionobject);
        //      }

        //      return Ok(ModelState);
        //  }

        //  [HttpPut("updateShipVia/{id}")]
        //  public IActionResult UpdateShipvia(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          var updateShipObj = _unitOfWork.LegalEntityShipping.GetSingleOrDefault(c => c.LegalEntityShippingId == id);

        //          updateShipObj.LegalEntityId = LegalEntityShippingViewModel.LegalEntityId;
        //          updateShipObj.LegalEntityShippingAddressId = LegalEntityShippingViewModel.LegalEntityShippingAddressId;
        //          updateShipObj.ShipVia = LegalEntityShippingViewModel.ShipVia;
        //          updateShipObj.ShippingAccountinfo = LegalEntityShippingViewModel.ShippingAccountinfo;
        //          updateShipObj.ShippingId = LegalEntityShippingViewModel.ShippingId;
        //          updateShipObj.ShippingURL = LegalEntityShippingViewModel.ShippingURL;
        //          updateShipObj.MasterCompanyId = LegalEntityShippingViewModel.MasterCompanyId;
        //          updateShipObj.IsActive = LegalEntityShippingViewModel.IsActive;
        //          updateShipObj.Memo = LegalEntityShippingViewModel.Memo;
        //          updateShipObj.CreatedDate = DateTime.Now;
        //          updateShipObj.UpdatedDate = DateTime.Now;
        //          updateShipObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          updateShipObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          _unitOfWork.LegalEntityShipping.Update(updateShipObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(updateShipObj);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpGet("GetShipVia/{id}")]
        //  public IActionResult GetShipvia(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {
        //      var result = _unitOfWork.LegalEntityShippingAddress.GetAllShipViaDetails(id);
        //      if (result == null)
        //      {
        //          return BadRequest();
        //      }
        //      else
        //      {
        //          return Ok(result);
        //      }
        //  }


        //  [HttpGet("GetShipViaAudit")]
        //  public IActionResult GetShipviaAudit(long LegalEntityId, long LegalEntityShippingAddressId, long LegalEntityShippingId)
        //  {
        //      var result = _unitOfWork.LegalEntityShippingAddress.GetLegalEntityShippingAudit(LegalEntityId, LegalEntityShippingAddressId, LegalEntityShippingId);
        //      if (result == null)
        //      {
        //          return BadRequest();
        //      }
        //      else
        //      {
        //          return Ok(result);
        //      }
        //  }

        //  #endregion

        //  [HttpPut("updateStatuscusShippingAddress/{id}")]
        //  public IActionResult updateStatuscusShippingAddress(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityShippingViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
        //          var checkPaymentObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
        //          var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
        //          // addressObj.IsActive = LegalEntityShippingViewModel.AddressStatus;
        //          checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
        //          checkPaymentObj.MasterCompanyId = 1;
        //          //checkPaymentObj.IsActive = true;
        //          checkPaymentObj.UpdatedDate = DateTime.Now;
        //          checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          addressObj.UpdatedDate = DateTime.Now;
        //          addressObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          addressObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          _unitOfWork.Address.Update(addressObj);
        //          _unitOfWork.LegalEntityShippingAddress.Update(checkPaymentObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(checkPaymentObj);
        //      }

        //      return Ok(ModelState);
        //  }

        //  [HttpPut("updateStatusLegalEntityBilling/{id}")]
        //  public IActionResult updateStatusLegalEntityBilling(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityShippingViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
        //          var checkPaymentObj = _unitOfWork.LegalEntityBillingInformation.GetSingleOrDefault(c => c.LegalEntityBillingAddressId == id);
        //          var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
        //          // addressObj.IsActive = LegalEntityShippingViewModel.AddressStatus;
        //          checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
        //          checkPaymentObj.MasterCompanyId = 1;
        //          checkPaymentObj.IsDeleted = true;
        //          checkPaymentObj.UpdatedDate = DateTime.Now;
        //          //checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          addressObj.UpdatedDate = DateTime.Now;
        //          // addressObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          addressObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          _unitOfWork.Address.Update(addressObj);
        //          _unitOfWork.LegalEntityBillingInformation.Update(checkPaymentObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(checkPaymentObj);


        //      }

        //      return Ok(ModelState);
        //  }


        //  [HttpPut("updateStatusLegalEntityShipping/{id}")]
        //  public IActionResult updateStatusLegalEntityShipping(long id, [FromBody] LegalEntityShippingViewModel LegalEntityShippingViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityShippingViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityShippingViewModel)} cannot be null");
        //          var checkPaymentObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
        //          checkPaymentObj.IsActive = LegalEntityShippingViewModel.IsActive;
        //          checkPaymentObj.MasterCompanyId = 1;
        //          checkPaymentObj.IsDelete = true;
        //          checkPaymentObj.UpdatedDate = DateTime.Now;
        //          checkPaymentObj.CreatedBy = LegalEntityShippingViewModel.CreatedBy;
        //          checkPaymentObj.UpdatedBy = LegalEntityShippingViewModel.UpdatedBy;
        //          _unitOfWork.LegalEntityShippingAddress.Update(checkPaymentObj);
        //          _unitOfWork.SaveChanges();
        //          return Ok(checkPaymentObj);

        //      }

        //      return Ok(ModelState);
        //  }

       
        //  [HttpPost("LegalEntityBillingPost")]
        //  public IActionResult CreateBilling([FromBody] LegalEntityBillingAddressViewModel LegalEntityBillingAddressViewModel, Address address, long? vendAddressid)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityBillingAddressViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
        //          LegalEntityBillingAddress cbs = new LegalEntityBillingAddress();
        //          cbs.MasterCompanyId = 1;
        //          cbs.IsActive = true;
        //          cbs.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          cbs.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
        //          cbs.CreatedDate = DateTime.Now;
        //          cbs.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
        //          LegalEntityBillingAddressViewModel.UpdatedDate = DateTime.Now;
        //          LegalEntityBillingAddressViewModel.IsActive = true;
        //          address.Line1 = LegalEntityBillingAddressViewModel.Address1;
        //          address.Line2 = LegalEntityBillingAddressViewModel.Address2;
        //          address.Line3 = LegalEntityBillingAddressViewModel.Address3;
        //          address.PostalCode = LegalEntityBillingAddressViewModel.PostalCode;
        //          address.StateOrProvince = LegalEntityBillingAddressViewModel.StateOrProvince;
        //          address.City = LegalEntityBillingAddressViewModel.City;
        //          address.Country = LegalEntityBillingAddressViewModel.Country;
        //          address.MasterCompanyId = 1;
        //          address.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          address.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
        //          address.CreatedDate = DateTime.Now;
        //          address.UpdatedDate = DateTime.Now;
        //          address.IsActive = LegalEntityBillingAddressViewModel.IsActive;

        //          if (LegalEntityBillingAddressViewModel.AddressId > 0)
        //          {
        //              address.AddressId = LegalEntityBillingAddressViewModel.AddressId;
        //              _unitOfWork.Address.Update(address);
        //          }
        //          else
        //              _unitOfWork.Address.Add(address);
        //          _unitOfWork.SaveChanges();

        //          long? id = address.AddressId;
        //          updateLegalEntitybillingAddress(LegalEntityBillingAddressViewModel, id, address);
        //          return Ok(LegalEntityBillingAddressViewModel);
        //      }

        //      return Ok(ModelState);
        //  }

        //  [HttpPut("LegalEntityBillAddressdetails/{id}")]
        //  public IActionResult saveBillDetails(long id, [FromBody] LegalEntityBillingAddressViewModel LegalEntityBillingAddressViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityBillingAddressViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
        //          var checkBillingObj = _unitOfWork.LegalEntityBillingInformation.GetSingleOrDefault(c => c.LegalEntityBillingAddressId == id);
        //          var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == LegalEntityBillingAddressViewModel.AddressId);

        //          checkBillingObj.MasterCompanyId = 1;
        //          checkBillingObj.IsActive = LegalEntityBillingAddressViewModel.IsActive;
        //          checkBillingObj.SiteName = LegalEntityBillingAddressViewModel.SiteName;
        //          checkBillingObj.CreatedDate = DateTime.Now;
        //          checkBillingObj.UpdatedDate = DateTime.Now;
        //          checkBillingObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          checkBillingObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
        //          checkBillingObj.MasterCompanyId = LegalEntityBillingAddressViewModel.MasterCompanyId;
        //          addressObj.Line1 = LegalEntityBillingAddressViewModel.Address1;
        //          addressObj.Line2 = LegalEntityBillingAddressViewModel.Address2;
        //          addressObj.Line3 = LegalEntityBillingAddressViewModel.Address3;
        //          addressObj.PostalCode = LegalEntityBillingAddressViewModel.PostalCode;
        //          addressObj.StateOrProvince = LegalEntityBillingAddressViewModel.StateOrProvince;
        //          addressObj.City = LegalEntityBillingAddressViewModel.City;
        //          addressObj.Country = LegalEntityBillingAddressViewModel.Country;
        //          addressObj.MasterCompanyId = 1;
        //          // addressObj.RecordCreateDate = DateTime.Now;
        //          addressObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          addressObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
        //          //addressObj.CreatedDate = DateTime.Now;
        //          addressObj.UpdatedDate = DateTime.Now;

        //          if (LegalEntityBillingAddressViewModel.IsPrimary == true)
        //          {
        //              var billingAddress = _context.LegalEntityBillingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId).ToList();
        //              if (billingAddress != null && billingAddress.Count > 0)
        //              {
        //                  foreach (var item in billingAddress)
        //                  {
        //                      item.IsPrimary = false;
        //                      _context.LegalEntityBillingAddress.Update(item);
        //                      _context.SaveChanges();
        //                  }
        //              }
        //          }

        //          checkBillingObj.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
        //          _unitOfWork.Address.Update(addressObj);
        //          _unitOfWork.LegalEntityBillingInformation.Update(checkBillingObj);
        //          _unitOfWork.SaveChanges();

        //          _unitOfWork.CommonRepository.CreateHistory(
        //LegalEntityBillingAddressViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityBillingAddressViewModel.LegalEntityId), Convert.ToInt64(checkBillingObj.LegalEntityBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), false);

        //          return Ok(checkBillingObj);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpPut("cusShippingUpdate/{id}")]
        //  public IActionResult cusShippingUpdate(long id, [FromBody] LegalEntityShippingAdressViewModel LegalEntityBillingAddressViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (LegalEntityBillingAddressViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
        //          var checkBillingObj = _unitOfWork.LegalEntityShippingAddress.GetSingleOrDefault(c => c.LegalEntityShippingAddressId == id);
        //          var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == LegalEntityBillingAddressViewModel.AddressId);
        //          checkBillingObj.IsActive = true;
        //          checkBillingObj.MasterCompanyId = 1;
        //          checkBillingObj.IsActive = LegalEntityBillingAddressViewModel.IsActive;
        //          checkBillingObj.SiteName = LegalEntityBillingAddressViewModel.SiteName;
        //          checkBillingObj.CreatedDate = DateTime.Now;
        //          checkBillingObj.UpdatedDate = DateTime.Now;
        //          checkBillingObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          checkBillingObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
        //          checkBillingObj.ExportLicenseNumber = LegalEntityBillingAddressViewModel.ExportLicenseNumber;
        //          checkBillingObj.Description = LegalEntityBillingAddressViewModel.Description;
        //          checkBillingObj.StartDate = LegalEntityBillingAddressViewModel.StartDate;
        //          checkBillingObj.ExpirationDate = LegalEntityBillingAddressViewModel.ExpirationDate;
        //          checkBillingObj.Amount = LegalEntityBillingAddressViewModel.Amount;
        //          checkBillingObj.MasterCompanyId = 1;
        //          addressObj.Line1 = LegalEntityBillingAddressViewModel.Address1;
        //          addressObj.Line2 = LegalEntityBillingAddressViewModel.Address2;
        //          addressObj.Line3 = LegalEntityBillingAddressViewModel.Address3;
        //          addressObj.PostalCode = LegalEntityBillingAddressViewModel.PostalCode;
        //          addressObj.StateOrProvince = LegalEntityBillingAddressViewModel.StateOrProvince;
        //          addressObj.City = LegalEntityBillingAddressViewModel.City;
        //          addressObj.Country = LegalEntityBillingAddressViewModel.Country;
        //          addressObj.MasterCompanyId = 1;



        //          if (LegalEntityBillingAddressViewModel.IsPrimary == true)
        //          {
        //              //var shippingAddress = _context.LegalEntityShippingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId).ToList();
        //              //if (shippingAddress != null && shippingAddress.Count > 0)
        //              //{
        //              //    foreach (var item in shippingAddress)
        //              //    {
        //              //        item.IsPrimary = false;
        //              //        _context.LegalEntityShippingAddress.Update(item);
        //              //        _context.SaveChanges();
        //              //    }
        //              //}

        //              LegalEntityShippingAddress shippingAddress = new LegalEntityShippingAddress();
        //              shippingAddress = _context.LegalEntityShippingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId && p.IsPrimary == true).FirstOrDefault();

        //              if (shippingAddress != null && shippingAddress.LegalEntityShippingAddressId != LegalEntityBillingAddressViewModel.LegalEntityShippingAddressId)
        //              {
        //                  shippingAddress.IsPrimary = false;
        //                  _context.LegalEntityShippingAddress.Update(shippingAddress);
        //                  _context.SaveChanges();
        //                  _unitOfWork.CommonRepository.CreateHistory(
        //       shippingAddress, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityBillingAddressViewModel.LegalEntityId), Convert.ToInt64(shippingAddress.LegalEntityShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);
        //              }
        //          }
        //          // addressObj.RecordCreateDate = DateTime.Now;

        //          //created by is not needed as the record is already created and the viewmodel returns null
        //          //addressObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          checkBillingObj.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;

        //          addressObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;
        //          //addressObj.CreatedDate = DateTime.Now;
        //          addressObj.UpdatedDate = DateTime.Now;
        //          _unitOfWork.Address.Update(addressObj);
        //          _unitOfWork.LegalEntityShippingAddress.Update(checkBillingObj);
        //          _unitOfWork.SaveChanges();
        //          _unitOfWork.CommonRepository.CreateHistory(
        //    LegalEntityBillingAddressViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(checkBillingObj.LegalEntityId), Convert.ToInt64(checkBillingObj.LegalEntityShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), false);

        //          return Ok(checkBillingObj);


        //      }

        //      return Ok(ModelState);
        //  }

        //  [ApiExplorerSettings(IgnoreApi = true)]
        //  //[HttpPost("vendorShippingAddressDetails")]
        //  public IActionResult updateLegalEntitybillingAddress([FromBody] LegalEntityBillingAddressViewModel LegalEntityBillingAddressViewModel, long? id, Address address)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          LegalEntityBillingAddress cbs = new LegalEntityBillingAddress();
        //          if (LegalEntityBillingAddressViewModel == null)
        //              return BadRequest($"{nameof(LegalEntityBillingAddressViewModel)} cannot be null");
        //          LegalEntityBillingAddress LegalEntityShippingAddressObj = new LegalEntityBillingAddress();
        //          LegalEntityShippingAddressObj.IsActive = true;
        //          LegalEntityShippingAddressObj.LegalEntityId = LegalEntityBillingAddressViewModel.LegalEntityId;
        //          LegalEntityShippingAddressObj.SiteName = LegalEntityBillingAddressViewModel.SiteName;
        //          LegalEntityShippingAddressObj.MasterCompanyId = 1;
        //          LegalEntityShippingAddressObj.IsPrimary = LegalEntityBillingAddressViewModel.IsPrimary;
        //          LegalEntityShippingAddressObj.AddressId = id;
        //          LegalEntityShippingAddressObj.CreatedDate = DateTime.Now;
        //          LegalEntityShippingAddressObj.UpdatedDate = DateTime.Now;
        //          LegalEntityShippingAddressObj.CreatedBy = LegalEntityBillingAddressViewModel.CreatedBy;
        //          LegalEntityShippingAddressObj.UpdatedBy = LegalEntityBillingAddressViewModel.UpdatedBy;

        //          if (LegalEntityBillingAddressViewModel.IsPrimary == true)
        //          {
        //              var billingAddress = _context.LegalEntityBillingAddress.Where(p => p.LegalEntityId == LegalEntityBillingAddressViewModel.LegalEntityId).ToList();
        //              if (billingAddress != null && billingAddress.Count > 0)
        //              {
        //                  foreach (var item in billingAddress)
        //                  {
        //                      item.IsPrimary = false;
        //                      _context.LegalEntityBillingAddress.Update(item);
        //                      _context.SaveChanges();
        //                  }
        //              }
        //          }

        //          if (LegalEntityBillingAddressViewModel.LegalEntityBillingAddressId > 0)
        //          {
        //              LegalEntityShippingAddressObj.LegalEntityBillingAddressId = LegalEntityBillingAddressViewModel.LegalEntityBillingAddressId;
        //              _unitOfWork.LegalEntityBillingInformation.Update(LegalEntityShippingAddressObj);
        //          }
        //          else
        //          {
        //              _unitOfWork.LegalEntityBillingInformation.Add(LegalEntityShippingAddressObj);
        //          }

        //          _unitOfWork.SaveChanges();
        //          long? venAddressid = LegalEntityShippingAddressObj.LegalEntityBillingAddressId;
        //          cbs.LegalEntityBillingAddressId = LegalEntityShippingAddressObj.LegalEntityBillingAddressId;
        //          _unitOfWork.CommonRepository.CreateHistory(
        //    LegalEntityBillingAddressViewModel, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(LegalEntityBillingAddressViewModel.LegalEntityId), Convert.ToInt64(LegalEntityShippingAddressObj.LegalEntityBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), false);

        //          //updateShipping(vendorshipping, address, venAddressid, LegalEntityBillingAddressViewModel);
        //          return Ok(LegalEntityShippingAddressObj);
        //      }
        //      return Ok(ModelState);
        //  }

        //  public static List<TSource> ToList<TSource>(IEnumerable<TSource> source)
        //  {
        //      if (source == null)
        //      {
        //          //throw Error.ArgumentNull("source");
        //      }
        //      return new List<TSource>(source);
        //  }



        //  [HttpPost("postCountryList")]
        //  public IActionResult CountryList([FromBody] CountriesViewModel countriesViewModel)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (countriesViewModel == null)
        //              return BadRequest($"{nameof(countriesViewModel)} cannot be null");
        //          DAL.Models.Countries actionobject = new DAL.Models.Countries();
        //          actionobject.countries_name = countriesViewModel.countries_name;
        //          actionobject.countries_iso_code = countriesViewModel.countries_iso_code;
        //          //actionobject.IsActive = true;
        //          actionobject.IsActive = countriesViewModel.IsActive;
        //          actionobject.CreatedDate = DateTime.Now;
        //          actionobject.UpdatedDate = DateTime.Now;
        //          actionobject.CreatedBy = countriesViewModel.CreatedBy;
        //          actionobject.UpdatedBy = countriesViewModel.UpdatedBy;

        //          _unitOfWork.Countries.Add(actionobject);
        //          _unitOfWork.SaveChanges();
        //          return Ok(actionobject);
        //      }

        //      return Ok(ModelState);
        //  }

        //  [HttpPost("savemultiIntegrations")]
        //  public IActionResult createIntegration([FromBody] LegalEntityIntegrationPortalViewmodel itemMasterIntegrationPortal)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (_context.LegalEntityIntegrationPortal.Any(o => o.IntegrationPortalId == itemMasterIntegrationPortal.IntegrationPortalId))
        //          {
        //              // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
        //              var existingresule = _context.LegalEntityIntegrationPortal.Where(c => c.IntegrationPortalId == itemMasterIntegrationPortal.IntegrationPortalId).FirstOrDefault();
        //              existingresule.IntegrationPortalId = itemMasterIntegrationPortal.IntegrationPortalId;

        //              existingresule.LegalEntityId = Convert.ToInt64(itemMasterIntegrationPortal.LegalEntityId);
        //              existingresule.CreatedBy = itemMasterIntegrationPortal.CreatedBy;
        //              existingresule.UpdatedBy = itemMasterIntegrationPortal.UpdatedBy;
        //              existingresule.MasterCompanyId = 1;
        //              existingresule.CreatedDate = DateTime.Now;
        //              existingresule.UpdatedDate = DateTime.Now;
        //              _context.LegalEntityIntegrationPortal.Update(existingresule);
        //              _context.SaveChanges();
        //          }
        //          else
        //          {
        //              LegalEntityIntegrationPortal cp = new LegalEntityIntegrationPortal();
        //              cp.IntegrationPortalId = itemMasterIntegrationPortal.IntegrationPortalId;
        //              cp.LegalEntityId = Convert.ToInt64(itemMasterIntegrationPortal.LegalEntityId);
        //              cp.MasterCompanyId = 1;
        //              cp.CreatedBy = itemMasterIntegrationPortal.CreatedBy;
        //              cp.UpdatedBy = itemMasterIntegrationPortal.UpdatedBy;
        //              cp.CreatedDate = DateTime.Now;
        //              cp.UpdatedDate = DateTime.Now;
        //              _context.LegalEntityIntegrationPortal.Add(cp);
        //              _context.SaveChanges();
        //          }
        //      }
        //      return Ok(itemMasterIntegrationPortal);
        //      // return Ok(ModelState);
        //  }

        //  [HttpGet("IntegrationGet/{id}")]
        //  [Produces(typeof(List<LegalEntityIntegrationPortalViewmodel>))]
        //  public IActionResult integrationGet(int id)
        //  {
        //      var integrationportal = _unitOfWork.LegalEntity.getIntegrationData(id); //.GetAllLegalEntitysData();
        //      return Ok(integrationportal);

        //  }


        //  [HttpGet("getAllLegalEntitys")]
        //  public IEnumerable<LegalEntity> getAllLegalEntitys()
        //  {
        //      try
        //      {
        //          var LegalEntitys = _unitOfWork.LegalEntity.getAllLegalEntity();
        //          return LegalEntitys;
        //      }
        //      catch (Exception ex)
        //      {
        //          throw ex;
        //      }
        //  }

        //  [HttpGet("getAllLegalEntitysInfo")]
        //  public IActionResult getAllLegalEntitysInfo()
        //  {
        //      try
        //      {
        //          var LegalEntitysInfo = _unitOfWork.LegalEntity.getAllLegalEntitysInfo();
        //          return Ok(LegalEntitysInfo);
        //      }
        //      catch (Exception)
        //      {
        //          return BadRequest(new Exception("Error Occured while fetching LegalEntity specific details."));
        //          throw;
        //      }
        //  }

        //  [HttpPost("pagination")]
        //  public IActionResult GetLegalEntity([FromBody]LegalEntitySearchViewModel paginate)
        //  {
        //      GetData getData = new GetData();


        //      IQueryable<LegalEntitySearchViewModel> queryable = null;
        //      List<LegalEntitySearchViewModel> LegalEntitysList = new List<LegalEntitySearchViewModel>();
        //      LegalEntitySearchViewModel LegalEntity = null;
        //      if (!string.IsNullOrEmpty(paginate.LegalEntityCode) || !string.IsNullOrEmpty(paginate.Name)
        //          || !string.IsNullOrEmpty(paginate.Email)
        //          || !string.IsNullOrEmpty(paginate.PrimarySalesPersonFirstName)
        //          || !string.IsNullOrEmpty(paginate.City)
        //          || !string.IsNullOrEmpty(paginate.StateOrProvince)
        //          || !string.IsNullOrEmpty(paginate.LegalEntityType)
        //          || !string.IsNullOrEmpty(paginate.CreatedBy)
        //          || !string.IsNullOrEmpty(paginate.UpdatedBy)
        //          || (paginate.CreatedDate != null)
        //          || (paginate.UpdatedDate != null))
        //      {
        //          var LegalEntitys = (from t in _context.LegalEntity
        //                           join ad in _context.Address on t.AddressId equals ad.AddressId
        //                           join ct in _context.LegalEntityType on t.LegalEntityTypeId equals ct.LegalEntityTypeId
        //                           join cc in _context.LegalEntityClassification on t.LegalEntityClassificationId equals cc.LegalEntityClassificationId
        //                           where t.IsDeleted == false || t.IsDeleted == null
        //                           select new
        //                           {
        //                               ct.Description,
        //                               t.LegalEntityId,
        //                               t,
        //                               Address1 = ad.Line1,
        //                               Address2 = ad.Line2,
        //                               Address3 = ad.Line3,
        //                               t.LegalEntityCode,
        //                               t.Name,
        //                               t.Email,
        //                               t.LegalEntityPhone,
        //                               t.LegalEntityPhoneExt,
        //                               ad.City,
        //                               ad.StateOrProvince,
        //                               t.CreatedDate,
        //                               t.CreatedBy,
        //                               t.UpdatedBy,
        //                               t.UpdatedDate,
        //                               ad.AddressId,
        //                               ad.Country,
        //                               ad.PostalCode,
        //                               t.PrimarySalesPersonFirstName,
        //                               t.LegalEntityClassification,
        //                               t.IsActive,
        //                               t.CsrId,
        //                               t.SaId,
        //                               LegalEntityClarification = cc.Description
        //                           }).OrderByDescending(a => a.UpdatedDate).ToList();
        //          foreach (var item in LegalEntitys)
        //          {
        //              LegalEntity = new LegalEntitySearchViewModel();
        //              LegalEntity.LegalEntityId = item.LegalEntityId;
        //              LegalEntity.LegalEntityPhone = item.LegalEntityPhone;
        //              LegalEntity.LegalEntityPhoneExt = item.LegalEntityPhoneExt;
        //              LegalEntity.LegalEntityCode = item.LegalEntityCode;
        //              LegalEntity.City = item.City;
        //              LegalEntity.StateOrProvince = item.StateOrProvince;
        //              LegalEntity.LegalEntityType = item.Description;
        //              LegalEntity.Name = item.Name;
        //              LegalEntity.Email = item.Email;
        //              LegalEntity.CreatedDate = item.CreatedDate;
        //              LegalEntity.CreatedBy = item.CreatedBy;
        //              LegalEntity.UpdatedDate = item.UpdatedDate;
        //              LegalEntity.UpdatedBy = item.UpdatedBy;
        //              LegalEntity.PrimarySalesPersonFirstName = item.PrimarySalesPersonFirstName;
        //              LegalEntity.IsActive = item.IsActive;
        //              LegalEntity.LegalEntityClarifiacationName = item.LegalEntityClarification;
        //              LegalEntity.LegalEntityPhone = item.LegalEntityPhone;
        //              LegalEntitysList.Add(LegalEntity);
        //          }
        //          #region Pagination for join tables
        //          if (!string.IsNullOrEmpty(paginate.LegalEntityCode))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.LegalEntityCode != null && c.LegalEntityCode.ToUpper().Contains(paginate.LegalEntityCode.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.Name))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.Name != null && c.Name.ToUpper().Contains(paginate.Name.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.Email))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.Email != null && c.Email.ToUpper().Contains(paginate.Email.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.City))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.City != null && c.City.ToUpper().Contains(paginate.City.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.StateOrProvince))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.StateOrProvince != null && c.StateOrProvince.ToUpper().Contains(paginate.StateOrProvince.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.LegalEntityType))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.LegalEntityType != null && c.LegalEntityType.ToUpper().Contains(paginate.LegalEntityType.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.PrimarySalesPersonFirstName))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.PrimarySalesPersonFirstName != null && c.PrimarySalesPersonFirstName.ToUpper().Contains(paginate.PrimarySalesPersonFirstName.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.CreatedBy))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
        //          }
        //          if (!string.IsNullOrEmpty(paginate.UpdatedBy))
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
        //          }
        //          if (paginate.CreatedDate != null)
        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.CreatedDate != null && (c.CreatedDate >= paginate.CreatedDate || c.CreatedDate <= paginate.CreatedDate)).ToList();
        //          }
        //          if (paginate.UpdatedDate != null)

        //          {
        //              LegalEntitysList = LegalEntitysList.Where(c => c.UpdatedDate != null && (c.UpdatedDate > paginate.UpdatedDate || c.UpdatedDate < paginate.UpdatedDate)).ToList();
        //          }
        //          getData.TotalRecordsCount = LegalEntitysList.Count();
        //      }
        //      else
        //      {
        //          var sortedField = paginate.sortField;
        //          var LegalEntitys = (from t in _context.LegalEntity
        //                           join ad in _context.Address on t.AddressId equals ad.AddressId
        //                           join ct in _context.LegalEntityType on t.LegalEntityTypeId equals ct.LegalEntityTypeId
        //                           join cc in _context.LegalEntityClassification on t.LegalEntityClassificationId equals cc.LegalEntityClassificationId
        //                           where t.IsDeleted == false || t.IsDeleted == null
        //                           select new
        //                           {
        //                               ct.Description,
        //                               t.LegalEntityId,
        //                               t,
        //                               Address1 = ad.Line1,
        //                               Address2 = ad.Line2,
        //                               Address3 = ad.Line3,
        //                               t.LegalEntityCode,
        //                               t.Name,
        //                               t.Email,
        //                               t.LegalEntityPhone,
        //                               t.LegalEntityPhoneExt,
        //                               ad.City,
        //                               ad.StateOrProvince,
        //                               t.CreatedDate,
        //                               t.CreatedBy,
        //                               t.UpdatedBy,
        //                               t.UpdatedDate,
        //                               ad.AddressId,
        //                               ad.Country,
        //                               ad.PostalCode,
        //                               t.PrimarySalesPersonFirstName,
        //                               t.IsActive,
        //                               LegalEntityClarification = cc.Description
        //                           }).OrderByDescending(a => a.UpdatedDate).ToList();
        //          foreach (var item in LegalEntitys)
        //          {
        //              LegalEntity = new LegalEntitySearchViewModel();
        //              LegalEntity.LegalEntityId = item.LegalEntityId;
        //              LegalEntity.LegalEntityCode = item.LegalEntityCode;
        //              LegalEntity.City = item.City;
        //              LegalEntity.StateOrProvince = item.StateOrProvince;
        //              LegalEntity.LegalEntityType = item.Description;
        //              LegalEntity.Name = item.Name;
        //              LegalEntity.Email = item.Email;
        //              LegalEntity.CreatedDate = item.CreatedDate;
        //              LegalEntity.CreatedBy = item.CreatedBy;
        //              LegalEntity.UpdatedDate = item.UpdatedDate;
        //              LegalEntity.UpdatedBy = item.UpdatedBy;
        //              LegalEntity.PrimarySalesPersonFirstName = item.PrimarySalesPersonFirstName;
        //              LegalEntity.IsActive = item.IsActive;
        //              LegalEntity.LegalEntityClarifiacationName = item.LegalEntityClarification;
        //              LegalEntity.LegalEntityPhone = item.LegalEntityPhone;
        //              LegalEntitysList.Add(LegalEntity);
        //              getData.TotalRecordsCount = LegalEntitysList.Count();
        //          }

        //      }
        //      #endregion
        //      if (paginate.sortField != null)
        //      {
        //          queryable = LegalEntitysList.AsQueryable().OrderBy(paginate.sortField);
        //      }
        //      else
        //      {
        //          queryable = LegalEntitysList.AsQueryable();//.OrderBy("Email");
        //      }


        //      if (paginate != null)
        //      {
        //          var pageListPerPage = paginate.rows;
        //          var pageIndex = paginate.first;
        //          var pageCount = (pageIndex / pageListPerPage) + 1;
        //          getData.LegalEntityList = DAL.Common.PaginatedList<LegalEntitySearchViewModel>.Create(queryable, pageCount, pageListPerPage);
        //          return Ok(getData);
        //      }
        //      else
        //          return BadRequest(new Exception("Error Occured while fetching LegalEntity specific details."));
        //  }

        //  [HttpPost("globalSearch")]
        //  public IActionResult GetLegalEntity([FromBody]GlobalSearchModel paginate)
        //  {
        //      IQueryable<LegalEntity> queryable = null;
        //      if (!string.IsNullOrEmpty(paginate.GlobalSearchString))
        //      {
        //          queryable = _context.LegalEntity.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
        //              .OrderByDescending(c => c.LegalEntityId).ToList().AsQueryable();
        //          // queryable = _context.LegalEntity.Where(c => new[] { c.LegalEntityCode, c.Name, c.Email, c.PrimarySalesPersonFirstName }.Any(s => s.Contains(paginate.GlobalSearchString))).ToList().AsQueryable();
        //      }
        //      else
        //          queryable = _context.LegalEntity.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
        //              .OrderByDescending(c => c.LegalEntityId).ToList().AsQueryable();
        //      if (paginate != null)
        //      {
        //          var pageListPerPage = paginate.rows;
        //          var pageIndex = paginate.first;
        //          var pageCount = (pageIndex / pageListPerPage) + 1;
        //          var data = DAL.Common.PaginatedList<LegalEntity>.Create(queryable, pageCount, pageListPerPage);
        //          return Ok(data);
        //      }
        //      else
        //          return BadRequest(new Exception("Error Occured while fetching LegalEntity specific details."));
        //  }

        //  [HttpPost("createinternationalshipping")]
        //  public IActionResult CreateLegalEntityInternationalShipping([FromBody] LegalEntityInternationalShipping model)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (model == null)
        //              return BadRequest($"{nameof(model)} cannot be null");
        //          _unitOfWork.LegalEntity.CreateLegalEntityInternationalShippingDetails(model);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpPost("updateinternationalshipping")]
        //  public IActionResult UpdateLegalEntityInternationalShipping([FromBody] LegalEntityInternationalShipping model)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (model == null)
        //              return BadRequest($"{nameof(model)} cannot be null");
        //          _unitOfWork.LegalEntity.UpdateLegalEntityInternationalShippingDetails(model);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpGet("deleteinternationalshipping")]
        //  public IActionResult DeleteLegalEntityInternationalShippingDetails(long id, string updatedBy)
        //  {
        //      _unitOfWork.LegalEntity.DeleteLegalEntityInternationalShippingDetails(id, updatedBy);
        //      return Ok();
        //  }

        //  [HttpGet("internationalshippingdetailsstatus")]
        //  public IActionResult LegalEntityInternationalShippingDetailsStatus(long id, bool status, string updatedBy)
        //  {
        //      _unitOfWork.LegalEntity.LegalEntityInternationalShippingDetailsStatus(id, status, updatedBy);
        //      return Ok();
        //  }

        //  [HttpGet("internationalshippingdetaillist")]
        //  public IActionResult GetLegalEntityInternationalShippingDetails(long LegalEntityId, int pageNumber, int pageSize)
        //  {
        //      var result = _unitOfWork.LegalEntity.GetLegalEntityInternationalShippingDetails(LegalEntityId, pageNumber, pageSize);
        //      return Ok(result);
        //  }

        //  [HttpGet("internationalshippingdetailsbyid")]
        //  public IActionResult GetLegalEntityInternationalShippingDetailsById(long id)
        //  {
        //      var result = _unitOfWork.LegalEntity.GetLegalEntityInternationalShippingDetailsById(id);
        //      return Ok(result);
        //  }

        //  [HttpPost("createshippingviadetails")]
        //  public IActionResult CreateShippingViaDetails([FromBody] ShippingViaDetails model)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (model == null)
        //              return BadRequest($"{nameof(model)} cannot be null");
        //          _unitOfWork.LegalEntity.CreateShippingViaDetails(model);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpPost("updateshippingviadetails")]
        //  public IActionResult UpdateShippingViaDetails([FromBody] ShippingViaDetails model)
        //  {
        //      if (ModelState.IsValid)
        //      {
        //          if (model == null)
        //              return BadRequest($"{nameof(model)} cannot be null");
        //          _unitOfWork.LegalEntity.UpdateShippingViaDetails(model);
        //      }
        //      return Ok(ModelState);
        //  }

        //  [HttpGet("deleteshippingviadetails")]
        //  public IActionResult DeleteShippingViaDetails(long id, string updatedBy)
        //  {
        //      _unitOfWork.LegalEntity.DeleteShippingViaDetails(id, updatedBy);
        //      return Ok();
        //  }

        //  [HttpGet("shippingviadetailsstatus")]
        //  public IActionResult ShippingViaDetailsStatus(long id, bool status, string updatedBy)
        //  {
        //      _unitOfWork.LegalEntity.ShippingViaDetailsStatus(id, status, updatedBy);
        //      return Ok();
        //  }

        //  [HttpGet("getshippingviadetails")]
        //  public IActionResult GetShippingViaDetails(long internationalShippingId, int pageNumber, int pageSize)
        //  {
        //      var result = _unitOfWork.LegalEntity.GetShippingViaDetails(internationalShippingId, pageNumber, pageSize);
        //      return Ok(result);
        //  }

        //[HttpGet("getshippingviadetailsbyid")]
        //public IActionResult GetShippingViaDetailsById(long id)
        //{
        //    var result = _unitOfWork.LegalEntity.GetShippingViaDetailsById(id);
        //    return Ok(result);
        //}
        //[HttpGet("getauditshippingviadetailsbyid")]
        //public IActionResult GetShippingViaDetailsById(long LegalEntityId, long internationalShippingId, long shippingViaDetailsId)
        //{
        //    var result = _unitOfWork.LegalEntity.GetAuditShippingViaDetailsById(LegalEntityId, internationalShippingId, shippingViaDetailsId);
        //    return Ok(result);
        //}

        //  public class GetData
        //  {
        //      public int TotalRecordsCount { get; set; }
        //      public List<LegalEntitySearchViewModel> LegalEntityList { get; set; }
        //  }


        //  [HttpPost("LegalEntityDocumentUpload")]
        //  [Produces("application/json")]
        //  public IActionResult DocumentUploadAction()
        //  {

        //      try
        //      {
        //          LegalEntityDocumentDetail objLegalEntityDocumentDetail = new LegalEntityDocumentDetail();
        //          if (ModelState.IsValid)
        //          {
        //              if (Request.Form == null)
        //                  return BadRequest($"{nameof(objLegalEntityDocumentDetail)} cannot be null");

        //              long LegalEntityDocumentDetailId = Convert.ToInt64(Request.Form["LegalEntityDocumentDetailId"]);

        //              if (LegalEntityDocumentDetailId > 0)
        //              {
        //                  var LegalEntityDocObj = _unitOfWork.LegalEntity.GetLegalEntityDocumentDetailById(LegalEntityDocumentDetailId);
        //                  //objVendorDocumentDetail.MasterCompanyId = 1;      
        //                  LegalEntityDocObj.LegalEntityId = Convert.ToInt64(Request.Form["LegalEntityId"]);

        //                  LegalEntityDocObj.UpdatedBy = Request.Form["UpdatedBy"];
        //                  LegalEntityDocObj.DocName = Request.Form["DocName"];
        //                  LegalEntityDocObj.DocMemo = Request.Form["DocMemo"];
        //                  LegalEntityDocObj.DocDescription = Request.Form["DocDescription"];
        //                  if (LegalEntityDocObj.AttachmentId > 0)
        //                  {
        //                      LegalEntityDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
        //                        Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), LegalEntityDocObj.UpdatedBy, LegalEntityDocObj.MasterCompanyId, LegalEntityDocObj.AttachmentId);

        //                  }
        //                  else
        //                  {
        //                      LegalEntityDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
        //                           Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), LegalEntityDocObj.UpdatedBy, LegalEntityDocObj.MasterCompanyId);
        //                  }

        //                  _unitOfWork.CreateDocumentDetails.Update(LegalEntityDocObj);
        //                  _unitOfWork.SaveChanges();
        //              }
        //              else
        //              {
        //                  objLegalEntityDocumentDetail.LegalEntityId = Convert.ToInt64(Request.Form["LegalEntityId"]);
        //                  objLegalEntityDocumentDetail.MasterCompanyId = 1;
        //                  objLegalEntityDocumentDetail.CreatedBy = Request.Form["CreatedBy"];
        //                  objLegalEntityDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
        //                  objLegalEntityDocumentDetail.DocName = Request.Form["DocName"];
        //                  objLegalEntityDocumentDetail.DocMemo = Request.Form["DocMemo"];
        //                  objLegalEntityDocumentDetail.DocDescription = Request.Form["DocDescription"];
        //                  objLegalEntityDocumentDetail.IsActive = true;
        //                  objLegalEntityDocumentDetail.IsDeleted = false;
        //                  objLegalEntityDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
        //                                                                          Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), objLegalEntityDocumentDetail.UpdatedBy, objLegalEntityDocumentDetail.MasterCompanyId);
        //                  _unitOfWork.CreateDocumentDetails.Add(objLegalEntityDocumentDetail);
        //                  _unitOfWork.SaveChanges();
        //              }
        //              return Ok(objLegalEntityDocumentDetail);
        //          }
        //          //objLegalEntityDocumentDetail.LegalEntityId = Convert.ToInt64(Request.Form["LegalEntityId"]);
        //          //objLegalEntityDocumentDetail.MasterCompanyId = 1;
        //          //objLegalEntityDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
        //          //objLegalEntityDocumentDetail.DocName = Request.Form["DocName"];
        //          //objLegalEntityDocumentDetail.DocMemo = Request.Form["DocMemo"];
        //          //objLegalEntityDocumentDetail.DocDescription = Request.Form["DocDescription"];
        //          //objLegalEntityDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
        //          //                                                    Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), objLegalEntityDocumentDetail.UpdatedBy, objLegalEntityDocumentDetail.MasterCompanyId);
        //          // _unitOfWork.CreateDocumentDetails.Add(objLegalEntityDocumentDetail);
        //          //_unitOfWork.SaveChanges();

        //          //return Ok(objLegalEntityDocumentDetail);

        //          return Ok(ModelState);
        //      }
        //      catch (Exception ex)
        //      {
        //          return BadRequest(ex.Message);
        //      }
        //  }

        //[HttpPut("LegalEntityDocumentUpdate")]
        //public IActionResult LegalEntityDocumentUpdate()
        //{
        //    LegalEntityDocumentDetail objLegalEntityDocumentDetail = new LegalEntityDocumentDetail();
        //    if (ModelState.IsValid)
        //    {
        //        if (Request.Form == null)
        //            return BadRequest($"{nameof(objLegalEntityDocumentDetail)} cannot be null");
        //        objLegalEntityDocumentDetail.LegalEntityId = Convert.ToInt64(Request.Form["LegalEntityId"]);
        //        var LegalEntityDocObj = _unitOfWork.LegalEntity.GetLegalEntityDocumentDetailById(objLegalEntityDocumentDetail.LegalEntityId);
        //        objLegalEntityDocumentDetail.MasterCompanyId = 1;
        //        objLegalEntityDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
        //        objLegalEntityDocumentDetail.DocName = Request.Form["DocName"];
        //        objLegalEntityDocumentDetail.DocMemo = Request.Form["DocMemo"];
        //        objLegalEntityDocumentDetail.DocDescription = Request.Form["DocDescription"];
        //        objLegalEntityDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objLegalEntityDocumentDetail.LegalEntityId,
        //            Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToString(ModuleEnum.LegalEntity), objLegalEntityDocumentDetail.UpdatedBy, objLegalEntityDocumentDetail.MasterCompanyId);
        //        _unitOfWork.CreateDocumentDetails.Update(objLegalEntityDocumentDetail);
        //        _unitOfWork.SaveChanges();

        //        return Ok(objLegalEntityDocumentDetail);
        //    }
        //    return Ok(ModelState);
        //}


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

        //[HttpGet("getLegalEntityShippingHistory/{id}")]
        //[Produces(typeof(List<LegalEntityShippingAddress>))]
        //public IActionResult getLegalEntityShippingHistory(long id, LegalEntityShippingAddress cstomerShippingAddress)
        //{
        //    var allCusShippingdetails = _unitOfWork.LegalEntityShippingAddress.GetAllCusShippingHistory(id); //.GetAllLegalEntitysData();
        //    return Ok(allCusShippingdetails);

        //}


        //[HttpGet("LegalEntityshipviadetails")]
        //[Produces(typeof(List<LegalEntityShippingAddress>))]
        //public IActionResult GetLegalEntityShipviaDetails(long LegalEntityId, long addressId)
        //{
        //    var allCusShippingdetails = _unitOfWork.LegalEntity.GetLegalEntityShipviaDetails(LegalEntityId, addressId);
        //    return Ok(allCusShippingdetails);

        //}

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

        //[HttpGet("shippingdetailsstatus")]
        //public IActionResult LegalEntityShippingDetailsStatus(long id, bool status, string updatedBy)
        //{
        //    var data = (from t in _context.LegalEntityShippingAddress
        //                join ad in _context.Address on t.AddressId equals ad.AddressId
        //                where t.LegalEntityShippingAddressId == id
        //                select new
        //                {
        //                    ad,
        //                    t.LegalEntityId,
        //                    SiteName = t.SiteName,
        //                    Address1 = ad.Line1,
        //                    Address2 = ad.Line2,
        //                    City = ad.City,
        //                    StateOrProvince = ad.StateOrProvince,
        //                    CreatedDate = t.CreatedDate,
        //                    CreatedBy = t.CreatedBy,
        //                    UpdatedBy = updatedBy,
        //                    UpdatedDate = t.UpdatedDate,
        //                    ad.AddressId,
        //                    Country = ad.Country,
        //                    PostalCode = ad.PostalCode,
        //                    MasterCompanyId = t.MasterCompanyId,
        //                    IsActive = status,
        //                    IsPrimary = t.IsPrimary
        //                }).FirstOrDefault();

        //    ShippingBillingAddressAudit obj = new ShippingBillingAddressAudit();
        //    obj.SiteName = data.SiteName;
        //    obj.City = data.City;
        //    obj.StateOrProvince = data.StateOrProvince;
        //    obj.Country = data.Country;
        //    obj.Line1 = data.Address1;
        //    obj.Line2 = data.Address2;
        //    obj.PostalCode = data.PostalCode;
        //    obj.StateOrProvince = data.StateOrProvince;
        //    obj.MasterCompanyId = Convert.ToInt32(data.MasterCompanyId);
        //    obj.IsActive = data.IsActive;
        //    obj.CreatedBy = data.CreatedBy;
        //    obj.UpdatedBy = data.UpdatedBy;
        //    obj.IsPrimary = Convert.ToBoolean(data.IsPrimary);
        //    _unitOfWork.LegalEntity.LegalEntityShippingDetailsStatus(id, status, updatedBy);

        //    _unitOfWork.CommonRepository.CreateHistory(
        //    obj, Convert.ToInt32(ModuleEnum.LegalEntity), Convert.ToInt64(data.LegalEntityId), id, Convert.ToInt32(AddressTypeEnum.ShippingAddress), false, true);


        //    return Ok();
        //}
        //[HttpGet("deleteshipviadetails")]
        //public IActionResult DeleteShipViaDetails(long id, string updatedBy)
        //{
        //    _unitOfWork.LegalEntity.DeleteShipViaDetails(id, updatedBy);
        //    return Ok();
        //}
        //[HttpGet("shippingdetailsviastatus")]
        //public IActionResult LegalEntityShippingDetailsViaStatus(long id, bool status, string updatedBy)
        //{
        //    _unitOfWork.LegalEntity.LegalEntityShippingDetailsViaStatus(id, status, updatedBy);
        //    return Ok();
        //}

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

        //[HttpGet("GetLegalEntityAuditHistoryByid")]
        //[Produces(typeof(List<LegalEntityViewModel>))]
        //public IActionResult GetLegalEntityAuditHistoryByid(long LegalEntityId)
        //{
        //    var LegalEntityDtails = _unitOfWork.LegalEntity.GetLegalEntityAuditHistoryByid(LegalEntityId); //.GetAllLegalEntitysData();
        //    return Ok(LegalEntityDtails);
        //}

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
