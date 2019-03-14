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
    public class GateCodeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public GateCodeController(IUnitOfWork unitOfWork, ILogger<GateCodeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<GateCodeViewModel>))]
        public IActionResult Get()
        {
            var allGatecodeinfo = _unitOfWork.Gatecode.getAllGatecodeInfo(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<GateCodeViewModel>>(allGatecodeinfo));

        }


        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GateCode", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }
        [HttpPost("gatecodepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] GateCodeViewModel gatecodeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (gatecodeViewModel == null)
                    return BadRequest($"{nameof(gatecodeViewModel)} cannot be null");

                DAL.Models.GatecodeClass gatecodeobject = new DAL.Models.GatecodeClass();
                gatecodeobject.GateCode = gatecodeViewModel.GateCode;
                gatecodeobject.Description = gatecodeViewModel.Description;
                gatecodeobject.Sequence = gatecodeViewModel.Sequence;
                gatecodeobject.MasterCompanyId = gatecodeViewModel.MasterCompanyId;
                gatecodeobject.IsActive = gatecodeViewModel.IsActive;
                gatecodeobject.Memo = gatecodeViewModel.Memo;
                gatecodeobject.CreatedDate = DateTime.Now;
                gatecodeobject.UpdatedDate = DateTime.Now;
                gatecodeobject.CreatedBy = gatecodeViewModel.CreatedBy;
                gatecodeobject.UpdatedBy = gatecodeViewModel.UpdatedBy;
                _unitOfWork.Gatecode.Add(gatecodeobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("gatecodepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] GateCodeViewModel gatecodeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (gatecodeViewModel == null)
                    return BadRequest($"{nameof(gatecodeViewModel)} cannot be null");
                var existingResult = _unitOfWork.Gatecode.GetSingleOrDefault(c => c.GateCodeId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = gatecodeViewModel.UpdatedBy;
                existingResult.GateCode = gatecodeViewModel.GateCode;
                existingResult.Description = gatecodeViewModel.Description;
                existingResult.Sequence = gatecodeViewModel.Sequence;
                existingResult.Memo = gatecodeViewModel.Memo;
                existingResult.MasterCompanyId = gatecodeViewModel.MasterCompanyId;
                existingResult.IsActive = gatecodeViewModel.IsActive;
                existingResult.MasterCompanyId = gatecodeViewModel.MasterCompanyId;
                _unitOfWork.Gatecode.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("gatecodepost/{id}")]
        [Produces(typeof(GateCodeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Gatecode.GetSingleOrDefault(c => c.GateCodeId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Gatecode.Update(existingResult);
            //_unitOfWork.Gatecode.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }
    }
}