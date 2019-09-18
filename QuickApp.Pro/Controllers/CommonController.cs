using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
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

    }
}