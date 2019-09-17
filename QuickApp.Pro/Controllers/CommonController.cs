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
        readonly ILogger _logger;
        private readonly ApplicationDbContext _context;
        public CommonController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger,  ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("vendorcontacts")]
        public IActionResult GetVendorContactsList(long vendorId)
        {
            var vendorContacts = _unitOfWork.CommonRepository.GetVendorContactsList(vendorId); //.GetAllCustomersData();
            return Ok(vendorContacts);

        }

        [HttpGet]
        [Route("customercontacts")]
        public IActionResult GetCustomerContactsList(long customerId)
        {
            var vendorContacts = _unitOfWork.CommonRepository.GetCustomerContactsList(customerId); //.GetAllCustomersData();
            return Ok(vendorContacts);

        }
    }
}