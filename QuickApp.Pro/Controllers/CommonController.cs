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
        public IActionResult GetRestrictedParts(int moduleId, long? referenceId, string partType)
        {
            var restrictedParts = _unitOfWork.CommonRepository.GetRestrictedParts(moduleId, referenceId, partType);
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
        public IActionResult GetShippingViaDetails(long shippingViaId)
        {
            var result = _unitOfWork.CommonRepository.GetShippingViaDetails(shippingViaId);
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

    }
}