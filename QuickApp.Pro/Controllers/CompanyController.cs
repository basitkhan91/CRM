using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;


namespace QuickApp.Pro.Controllers
{
    [Route("api/company")]
    public class CompanyController : Controller
    {
        private IUnitOfWork _unitOfWork;

        private readonly ApplicationDbContext _context;
        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/values

        [HttpGet("get/{companyId}")]
        public IActionResult Get(int companyId)
        {
            var company = _unitOfWork.Company.Get(companyId);
            return Ok(company);
        }


        // GET: api/values
        [HttpGet("get")]
        [Produces(typeof(List<CompanyViewModel>))]
        public IActionResult Get()
        {
            var allComppanyData = _unitOfWork.Company.GetAllCompanyData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<CompanyViewModel>>(allComppanyData));

        }

        [HttpPost("createcompanybillingaddress")]
        public IActionResult CreateCompanyBillingAddress([FromBody] CompanyBillingAddress billingAddress)
        {
            if (ModelState.IsValid)
            {
                billingAddress.CompanyBillingAddressId = _unitOfWork.Company.CreateCompanyBillingAddress(billingAddress);
                return Ok(billingAddress);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatecompanybillingaddress")]
        public IActionResult UpdateCompanyBillingAddress([FromBody] CompanyBillingAddress billingAddress)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.Company.UpdateCompanyBillingAddress(billingAddress);
                return Ok(billingAddress);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("deletecompanybillingaddress")]
        public IActionResult DeleteCompanyBillingAddress(long billingAddressId, string updatedBy)
        {
            _unitOfWork.Company.DeleteCompanyBillingAddress(billingAddressId, updatedBy);
            return Ok();
        }

        [HttpGet("companybillingaddressstatus")]
        public IActionResult CompanyBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            _unitOfWork.Company.CompanyBillingAddressStatus(billingAddressId, status, updatedBy);
            return Ok();
        }

        [HttpGet("companybillingaddress")]
        public IActionResult GetCompanyBillingAddress()
        {
            _unitOfWork.Company.GetCompanyBillingAddress();
            return Ok();
        }

        [HttpGet("companybillingaddressbyid")]
        public IActionResult CompanyBillingAddressById(long billingAddressId)
        {
            _unitOfWork.Company.CompanyBillingAddressById(billingAddressId);
            return Ok();
        }


        [HttpPost("createcompanyshippingaddress")]
        public IActionResult CreateCompanyshippingAddress([FromBody] CompanyShippingAddress shippingAddress)
        {
            if (ModelState.IsValid)
            {
                shippingAddress.CompanyShippingAddressId = _unitOfWork.Company.CreateCompanyShippingAddress(shippingAddress);
                return Ok(shippingAddress);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatecompanyshippingaddress")]
        public IActionResult UpdateCompanyshippingAddress([FromBody] CompanyShippingAddress shippingAddress)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.Company.UpdateCompanyShippingAddress(shippingAddress);
                return Ok(shippingAddress);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("deletecompanyshippingaddress")]
        public IActionResult DeleteCompanyshippingAddress(long shippingAddressId, string updatedBy)
        {
            _unitOfWork.Company.DeleteCompanyShippingAddress(shippingAddressId, updatedBy);
            return Ok();
        }

        [HttpGet("companyshippingaddressstatus")]
        public IActionResult CompanyshippingAddressStatus(long shippingAddressId, bool status, string updatedBy)
        {
            _unitOfWork.Company.CompanyShippingAddressStatus(shippingAddressId, status, updatedBy);
            return Ok();
        }

        [HttpGet("companyshippingaddress")]
        public IActionResult GetCompanyshippingAddress()
        {
            _unitOfWork.Company.GetCompanyShippingAddress();
            return Ok();
        }

        [HttpGet("companyshippingaddressbyid")]
        public IActionResult CompanyshippingAddressById(long shippingAddressId)
        {
            _unitOfWork.Company.CompanyShippingAddressById(shippingAddressId);
            return Ok();
        }
    }
}

   

