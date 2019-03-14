

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class MasterCompanyController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public MasterCompanyController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<MasterCompanyViewModel>))]
        public IActionResult Get()
        {
                var result = _unitOfWork.MasterCompanies.GetAllMasterComapnyData(); 
                 return Ok(result);
        }


    }


}