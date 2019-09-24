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
    public class FindingController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public FindingController(IUnitOfWork unitOfWork, ILogger<FindingController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<FindingViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Findings.GetAllFindingData(); //.GetAllCustomersData();
            try
            {
                var resul1 = Mapper.Map<IEnumerable<FindingViewModel>>(result);
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
            var result = _unitOfWork.AuditHistory.GetAllHistory("Finding", id); //.GetAllCustomersData();


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
        [HttpPost("findingpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] FindingViewModel findingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (findingViewModel == null)
                    return BadRequest($"{nameof(findingViewModel)} cannot be null");

                DAL.Models.Finding findingObj = new DAL.Models.Finding();
                findingObj.FindingCode = findingViewModel.FindingCode;
                findingObj.Description = findingViewModel.Description;
                findingObj.Memo = findingViewModel.Memo;
                findingObj.MasterCompanyId = findingViewModel.MasterCompanyId;
                findingObj.IsActive = findingViewModel.IsActive;
                findingObj.CreatedDate = DateTime.Now;
                findingObj.UpdatedDate = DateTime.Now;
                findingObj.CreatedBy = findingViewModel.CreatedBy;
                findingObj.UpdatedBy = findingViewModel.UpdatedBy;
                _unitOfWork.Findings.Add(findingObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("findingpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] FindingViewModel findingViewModel)
        {

            if (ModelState.IsValid)
            {
                if (findingViewModel == null)
                    return BadRequest($"{nameof(findingViewModel)} cannot be null");
                var existingResult = _unitOfWork.Findings.GetSingleOrDefault(c => c.FindingId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = findingViewModel.UpdatedBy;
                existingResult.FindingCode = findingViewModel.FindingCode;
                existingResult.Description = findingViewModel.Description;
                existingResult.Memo = findingViewModel.Memo;
                existingResult.MasterCompanyId = findingViewModel.MasterCompanyId;
                existingResult.IsActive = findingViewModel.IsActive;
                existingResult.MasterCompanyId = findingViewModel.MasterCompanyId;
                _unitOfWork.Findings.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("findingpost/{id}")]
        [Produces(typeof(FindingViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Findings.GetSingleOrDefault(c => c.FindingId == id);

            existingResult.IsDelete = true;
            _unitOfWork.Findings.Update(existingResult);
            //_unitOfWork.Findings.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<FindingAudit>()
                .Find(x => x.FindingId == id)
                .OrderByDescending(x => x.FindingAuditId);

            var auditResult = new List<AuditResult<FindingAudit>>();

            auditResult.Add(new AuditResult<FindingAudit> { AreaName = "Finding", Result = audits.ToList() });

            return Ok(auditResult);
        }
        #region
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(FindingModel).GetProperties();
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
            dynamicGridData.ColumnData = _unitOfWork.Findings.GetAll().Where(u => u.IsDelete == false);
            return Ok(dynamicGridData);
        }
        #endregion
    }
}