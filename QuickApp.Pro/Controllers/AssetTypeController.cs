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
    public class AssetTypeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public AssetTypeController(IUnitOfWork unitOfWork, ILogger<AssetTypeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
    //    [HttpGet("Get")]
    //    [Produces(typeof(List<PriorityViewModel>))]
    //    public IActionResult Get()
    //    {
    //        var allGatecodeinfo = _unitOfWork.Priority.GetPriorities(); //.GetAllCustomersData();
    //        return Ok(Mapper.Map<IEnumerable<PriorityViewModel>>(allGatecodeinfo));

    //    }
    //    [HttpGet("auditHistoryById/{id}")]
    //    [Produces(typeof(List<AuditHistory>))]
    //    public IActionResult GetAuditHostoryById(long id)
    //    {
    //        var result = _unitOfWork.AuditHistory.GetAllHistory("Priority", id); //.GetAllCustomersData();


    //        try
    //        {
    //            var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

    //            return Ok(resul1);
    //        }
    //        catch (Exception ex)
    //        {

    //            throw;
    //        }



    //    }

       
       

    //    [HttpDelete("priority/{id}")]
    //    [Produces(typeof(PriorityViewModel))]
    //    public IActionResult DeleteAction(long id)
    //    {
    //        var existingResult = _unitOfWork.Priority.GetSingleOrDefault(c => c.PriorityId == id);
    //        existingResult.IsDelete = true;
    //        _unitOfWork.Priority.Update(existingResult);
    //        //_unitOfWork.Priority.Remove(existingResult);

    //        _unitOfWork.SaveChanges();

    //        return Ok(id);
    //    }

    }




}