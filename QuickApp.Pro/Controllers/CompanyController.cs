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
    [Route("api/Company")]
    public class CompanyController : Controller
    {
        private IUnitOfWork _unitOfWork;

        private readonly ApplicationDbContext _context;
        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/values

        [HttpGet("Get/{companyId}")]
        public IActionResult Get(int companyId)
        {
            var company = _unitOfWork.company.Get(companyId);
            return Ok(company);
        }


        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<CompanyViewModel>))]
        public IActionResult Get()
        {
            var allComppanyData = _unitOfWork.company.GetAllCompanyData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<CompanyViewModel>>(allComppanyData));

        }

    }
}

   

