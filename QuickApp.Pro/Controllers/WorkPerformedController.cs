using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
    public class WorkPerformedController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public WorkPerformedController(IUnitOfWork unitOfWork, ILogger<WorkPerformedController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<WorkPerformedViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.WorkPerformed.GetAllWorkPerformedData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<WorkPerformedViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("WorkPerformed", id); //.GetAllCustomersData();


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
        [HttpPost("workperformed")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] WorkPerformedViewModel workPerformedViewModel)
        {
            if (ModelState.IsValid)
            {
                if (workPerformedViewModel == null)
                    return BadRequest($"{nameof(workPerformedViewModel)} cannot be null");

                DAL.Models.WorkPerformed workperformedobject = new DAL.Models.WorkPerformed();
                workperformedobject.Description = workPerformedViewModel.Description;
                workperformedobject.Memo = workPerformedViewModel.Memo;
                workperformedobject.WorkPerformedCode = workPerformedViewModel.WorkPerformedCode;
                workperformedobject.Memo = workPerformedViewModel.Memo;
                workperformedobject.MasterCompanyId = workPerformedViewModel.MasterCompanyId;
                workperformedobject.IsActive = workPerformedViewModel.IsActive;
                workperformedobject.CreatedDate = DateTime.Now;
                workperformedobject.UpdatedDate = DateTime.Now;
                workperformedobject.CreatedBy = workPerformedViewModel.CreatedBy;
                workperformedobject.UpdatedBy = workPerformedViewModel.UpdatedBy;
                _unitOfWork.WorkPerformed.Add(workperformedobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("workperformed/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] WorkPerformedViewModel workPerformedViewModel)
        {

            if (ModelState.IsValid)
            {
                if (workPerformedViewModel == null)
                    return BadRequest($"{nameof(workPerformedViewModel)} cannot be null");

                var existingResult = _unitOfWork.WorkPerformed.GetSingleOrDefault(c => c.WorkPerformedId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = workPerformedViewModel.UpdatedBy;
                existingResult.Description = workPerformedViewModel.Description;
                existingResult.Memo = workPerformedViewModel.Memo;
                existingResult.WorkPerformedCode = workPerformedViewModel.WorkPerformedCode;
                existingResult.Memo = workPerformedViewModel.Memo;
                existingResult.IsActive = workPerformedViewModel.IsActive;
                existingResult.MasterCompanyId = workPerformedViewModel.MasterCompanyId;

                _unitOfWork.WorkPerformed.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("workperformed/{id}")]
        [Produces(typeof(WorkPerformedViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.WorkPerformed.GetSingleOrDefault(c => c.WorkPerformedId == id);

            existingResult.IsDelete = true;
            _unitOfWork.WorkPerformed.Update(existingResult);

            //_unitOfWork.WorkPerformed.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<WorkPerformedAudit>()
                .Find(x => x.WorkPerformedId == id)
                .OrderByDescending(x => x.WorkPerformedAuditId);

            var auditResult = new List<AuditResult<WorkPerformedAudit>>();

            auditResult.Add(new AuditResult<WorkPerformedAudit> { AreaName = "workperformed Status", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpGet("workperformedhistory")]
        public IActionResult GetWorkPerformedHistory(long workPerformedId)
        {
            var reult = _unitOfWork.WorkPerformed.GetWorkPerformedHistory(workPerformedId);
            return Ok(reult);
        }

        #region
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(WorkPerformedModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            dynamicGridData.ColumnData = _unitOfWork.WorkPerformed.GetAll();
            return Ok(dynamicGridData);
        }
        #endregion
    }




}
