using AutoMapper;
using DAL;
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
            var result = _unitOfWork.AuditHistory.GetAllHistory("LegalEntity", id); //.GetAllCustomersData();


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
                entityobject.MasterCompanyId = 1;
                entityobject.Name = legalEntityViewModel.Name;
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
                address.RecordModifiedDate = legalEntityViewModel.RecordModifiedDate;
                address.MasterCompanyId = 1;
                address.IsActive = legalEntityViewModel.IsActive;
                address.RecordCreateDate = DateTime.Now;
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
                    internationalWirePaymentObj.BeneficiaryCustomer = legalEntityViewModel.InternationalBenficiaryBankName;
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
            address.Line1 = legalEntityViewModel.BankStreetaddress1;
            address.Line2 = legalEntityViewModel.BankStreetaddress2;
            address.PostalCode = legalEntityViewModel.PostalCode;
            address.StateOrProvince = legalEntityViewModel.BankProvince;
            //address.City = legalEntityViewModel.BankCity;
            address.Country = legalEntityViewModel.Country;
            address.RecordModifiedDate = legalEntityViewModel.RecordModifiedDate;
            address.MasterCompanyId = 1;
            address.IsActive = true;
            address.RecordCreateDate = DateTime.Now;
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
                    entityobject.TaxId = legalEntityViewModel.TaxId;
                    entityobject.CreatedDate = DateTime.Now;
                    entityobject.UpdatedDate = DateTime.Now;
                    entityobject.CreatedBy = legalEntityViewModel.CreatedBy;
                    entityobject.UpdatedBy = legalEntityViewModel.UpdatedBy;
                 
                    if (address != null) {
                        address.Line1 = legalEntityViewModel.Address1;
                        address.Line2 = legalEntityViewModel.Address2;
                        address.PostalCode = legalEntityViewModel.PostalCode;
                        address.StateOrProvince = legalEntityViewModel.BankProvince;
                        address.Country = legalEntityViewModel.Country;
                        address.RecordModifiedDate = legalEntityViewModel.RecordModifiedDate;
                        address.MasterCompanyId = 1;
                        address.RecordCreateDate = DateTime.Now;
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
                        lockAddress.Country = legalEntityViewModel.Country;lockAddress.RecordModifiedDate = legalEntityViewModel.RecordModifiedDate;
                        lockAddress.MasterCompanyId = 1;
                        lockAddress.RecordCreateDate = DateTime.Now;
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
                        internationalWirePaymentObj.BeneficiaryCustomer = legalEntityViewModel.InternationalBenficiaryBankName;
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
                    entityobject.IsDelete = true;
                    _context.LegalEntity.Update(entityobject);
                    _context.SaveChanges();
                }
            
            return Ok(ModelState);

        }

        [HttpPut("UpdateActive")]
        public IActionResult updatereceivingcustomer([FromBody] LegalEntity legalEntity)
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
	}
}

    
   


