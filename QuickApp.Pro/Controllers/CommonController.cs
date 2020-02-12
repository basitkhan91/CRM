using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CommonController : Controller
    {
        private IUnitOfWork _unitOfWork;

        public CommonController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("vendorcontacts")]
        public IActionResult GetVendorContactsList(long vendorId)
        {
            var vendorContacts = _unitOfWork.CommonRepository.GetVendorContactsList(vendorId);
            return Ok(vendorContacts);

        }

        [HttpGet]
        [Route("customercontacts")]
        public IActionResult GetCustomerContactsList(long customerId)
        {
            var vendorContacts = _unitOfWork.CommonRepository.GetCustomerContactsList(customerId);
            return Ok(vendorContacts);

        }

        [HttpGet]
        [Route("getmasterparts")]
        public IActionResult GetMasterParts()
        {
            var masterParts = _unitOfWork.CommonRepository.GetMasterParts();
            return Ok(masterParts);

        }

        [HttpGet]
        [Route("getrestrictedparts")]
        public IActionResult GetRestrictedParts(long moduleId, long? referenceId, string partType)
        {
            var restrictedParts = _unitOfWork.CommonRepository.GetRestrictedParts(moduleId, referenceId, partType);
            return Ok(restrictedParts);

        }
        [HttpGet]
        [Route("getrestrictedpartswithdesc")]
        public IActionResult GetRestrictedPartsWithDescription(long moduleId, long? referenceId, string partType)
        {
            var restrictedParts = _unitOfWork.CommonRepository.GetRestrictedPartsWithDescription(moduleId, referenceId, partType);
            return Ok(restrictedParts);

        }

        [HttpGet]
        [Route("binddropdowns")]
        public IActionResult BindDropdowns(string tableName, string primaryColumn, string textColumn,long count=0)
        {
            var result = _unitOfWork.CommonRepository.BindDropdowns(tableName, primaryColumn, textColumn,count);
            return Ok(result);

        }

        [HttpPost]
        [Route("createshipvia")]
        public IActionResult CreateShippingVia([FromBody] ShippingVia shippingVia)
        {
            if (ModelState.IsValid)
            {
                shippingVia.ShippingViaId = _unitOfWork.CommonRepository.CreateShippingVia(shippingVia);
                return Ok(shippingVia);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("updateshipvia")]
        public IActionResult UpdateShippingVia([FromBody] ShippingVia shippingVia)
        {
            if (ModelState.IsValid)
            {
                 _unitOfWork.CommonRepository.UpdateShippingVia(shippingVia);
                return Ok(shippingVia);
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        [Route("shippingviadetails")]
        public IActionResult GetShippingViaDetails(long shippingViaId, int userType)
        {
            var result = _unitOfWork.CommonRepository.GetShippingViaDetails(shippingViaId, userType);
            return Ok(result);

        }

        [HttpGet]
        [Route("bindshipviadetails")]
        public IActionResult BindShipViaDetails(int userType, long referenceId)
        {
            var result = _unitOfWork.CommonRepository.BindShipViaDetails(userType, referenceId);
            return Ok(result);

        }

        [HttpPost]
        [Route("createaddress")]
        public IActionResult CreateAddress([FromBody] Address address)
        {
            if (ModelState.IsValid)
            {
                address.AddressId = _unitOfWork.CommonRepository.CreateAddress(address);
                return Ok(address);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("updateaddress")]
        public IActionResult UpdateAddress([FromBody] Address address)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.CommonRepository.UpdateAddress(address);
                return Ok(address);
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        [Route("addressdetails")]
        public IActionResult GetAddressDetails(long addressId)
        {
            var result = _unitOfWork.CommonRepository.GetAddressDetails(addressId);
            return Ok(result);

        }

        [HttpGet]
        [Route("managementstructure")]
        public IActionResult GetManagementStructure(long manmgStrucId)
        {
            var result = _unitOfWork.CommonRepository.GetManagementStructure(manmgStrucId);
            return Ok(result);

        }


        [HttpGet]
        [Route("managementstructurecodes")]
        public IActionResult GetManagementStructureCodes(long manmgStrucId)
        {
            var result = _unitOfWork.CommonRepository.GetManagementStructureCodes(manmgStrucId);
            return Ok(result);

        }
        [HttpGet]
        [Route("defaultcurrency")]
        public IActionResult GetDefaultCurrency(long legalEntityId)
        {
            var result = _unitOfWork.CommonRepository.GetDefaultCurrency(legalEntityId);
            return Ok(result);

        }

        [HttpGet("classificationmappings")]
        public IActionResult GetClassificationMappings(long referenceId ,int moduleId)
        {
            var result = _unitOfWork.CommonRepository.GetVendorClassificationMappings(moduleId, referenceId);
            return Ok(result);
        }

        [HttpGet("integrationmappings")]
        public IActionResult GetIntegrationMappings(long referenceId, int moduleId)
        {
            var result = _unitOfWork.CommonRepository.GetIntegrationMappings(referenceId, moduleId);
            return Ok(result);
        }

        [HttpGet("levelonedata")]
        public IActionResult ManagementStructureLevelOneData()
        {
            var result = _unitOfWork.CommonRepository.ManagementStructureLevelOneData();
            return Ok(result);
        }

        [HttpGet("leveltwodata")]
        public IActionResult ManagementStructureLevelTwoData(long parentId)
        {
            var result = _unitOfWork.CommonRepository.ManagementStructureLevelTwoData(parentId);
            return Ok(result);
        }

        [HttpGet("levelthreedata")]
        public IActionResult ManagementStructureLevelThreeData(long parentId)
        {
            var result = _unitOfWork.CommonRepository.ManagementStructureLevelThreeData(parentId);
            return Ok(result);
        }

        [HttpGet("levelfourdata")]
        public IActionResult ManagementStructureLevelFourData(long parentId)
        {
            var result = _unitOfWork.CommonRepository.ManagementStructureLevelFourData(parentId);
            return Ok(result);
        }

        [HttpGet("partpurchasesaledetails")]
        public IActionResult GetPartPurchaseSaleDetails(long itemMasterId, string condition)
        {
            var result = _unitOfWork.CommonRepository.GetPartPurchaseSaleDetails(itemMasterId, condition);
            return Ok(result);
        }

        [HttpGet("employeesbyjobtitle")]
        public IActionResult GetEmployeesByJobTitle(long jobTitleId)
        {
            var result = _unitOfWork.CommonRepository.GetEmployeesByJobTitle(jobTitleId);
            return Ok(result);
        }

        [HttpGet("employeesbyexpertise")]
        public IActionResult GetEmployeesByExpertise(long expertiseId)
        {
            var result = _unitOfWork.CommonRepository.GetEmployeesByExpertise(expertiseId);
            return Ok(result);
        }

        [HttpGet("getemployeestation")]
        public IActionResult GetEmployeeStation(long employeeId)
        {
            var result = _unitOfWork.CommonRepository.GetEmployeeStation(employeeId);
            return Ok(result);
        }

        [HttpGet("jobtitletypes")]
        public IActionResult GetJobTitleTypes(long masterCompanyId)
        {
            var result = _unitOfWork.CommonRepository.GetJobTitleTypes(masterCompanyId);
            return Ok(result);
        }

        [HttpGet("expertisetypes")]
        public IActionResult GetExpertiseTypes(long masterCompanyId)
        {
            var result = _unitOfWork.CommonRepository.GetExpertiseTypes(masterCompanyId);
            return Ok(result);
        }

    }
}