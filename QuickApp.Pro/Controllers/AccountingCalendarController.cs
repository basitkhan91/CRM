
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
namespace QuickApp.Pro.Controllers
{


    [Route("api/[controller]")]
    public class AccountingCalendarController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        


        public AccountingCalendarController(IUnitOfWork unitOfWork, ILogger<AccountingCalendarController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        //[HttpGet("Get")]
        //[Produces(typeof(List<AccountingCalendarViewModel>))]
        //public IActionResult Get()
        //{
        //    var allGatecodeinfo = _unitOfWork.accountingCalendar.GetPriorities(); //.GetAllCustomersData();
        //    return Ok(Mapper.Map<IEnumerable<AccountingCalendarViewModel>>(allGatecodeinfo));

        //}
        //[HttpGet("auditHistoryById/{id}")]
        //[Produces(typeof(List<AuditHistory>))]
        //public IActionResult GetAuditHostoryById(long id)
        //{
        //    var result = _unitOfWork.AuditHistory.GetAllHistory("Priority", id); //.GetAllCustomersData();


        //    try
        //    {
        //        var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

        //        return Ok(resul1);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }



        //}
    }
}