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
    [Route("api/[controller]")]

    public class ManagementStructureGetController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public ManagementStructureGetController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;

        }

        //[HttpGet("managementget/{id}")]
        //[Produces(typeof(List<ManagementStructureViewModel>))]
        //public string ManagementGetById(int id)
        //{

        //    try
        //    {
        //        //var managementRoot = _context.ManagementStructure.Where(..... && .Mane = id);
        //        //ManagementStructureViewModel parent1 = null;
        //        //ManagementViewModel parent2 = null;
        //        //ManagementViewModel parent3 = null;

        //        var result = _unitOfWork.stockLineList.GetAllStockLinelistData();

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }
        //}

    }
}
