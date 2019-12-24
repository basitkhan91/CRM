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
    public class ConditionController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ConditionController(IUnitOfWork unitOfWork, ILogger<ConditionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<ConditionViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Conditions.GetAllConditionData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<ConditionViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<ConditionAudit>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            //var result = _unitOfWork.AuditHistory.GetAllHistory("Condition", id); //.GetAllCustomersData();


            //try
            //{
            //    var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

            //    return Ok(resul1);
            //}

            try
            {
                var result = _unitOfWork.Conditions.GetAuditDetails(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }
        [HttpPost("ConditionPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ConditionViewModel conditionViewModel)
        {
            if (ModelState.IsValid)
            {
                if (conditionViewModel == null)
                    return BadRequest($"{nameof(conditionViewModel)} cannot be null");
                Condition conditionObj = new Condition();
                conditionObj.Description = conditionViewModel.Description;
                conditionObj.MasterCompanyId = conditionViewModel.MasterCompanyId;
                conditionObj.IsActive = conditionViewModel.IsActive;
                conditionObj.IsDelete = conditionViewModel.IsDeleted;
                conditionObj.Memo = conditionViewModel.Memo;
                conditionObj.CreatedDate = DateTime.Now;
                conditionObj.UpdatedDate = DateTime.Now;
                conditionObj.CreatedBy = conditionViewModel.CreatedBy;
                conditionObj.UpdatedBy = conditionViewModel.UpdatedBy;
                _unitOfWork.Conditions.Add(conditionObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("ConditionPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ConditionViewModel conditionViewModel)
        {

            if (ModelState.IsValid)
            {
                if (conditionViewModel == null)
                    return BadRequest($"{nameof(conditionViewModel)} cannot be null");

                var existingResult = _unitOfWork.Conditions.GetSingleOrDefault(c => c.ConditionId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();

                existingResult.IsDelete = conditionViewModel.IsDeleted;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = conditionViewModel.UpdatedBy;
                existingResult.Description = conditionViewModel.Description;
                existingResult.IsActive = conditionViewModel.IsActive;
                existingResult.Memo = conditionViewModel.Memo;
                existingResult.MasterCompanyId = conditionViewModel.MasterCompanyId;

                _unitOfWork.Conditions.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("ConditionPost/{id}")]
        [Produces(typeof(ConditionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Conditions.GetSingleOrDefault(c => c.ConditionId == id);

             existingResult.IsDelete = true;
            _unitOfWork.Conditions.Update(existingResult);

            //_unitOfWork.Conditions.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }
        [HttpGet("audits/{id}")]
        [Produces(typeof(List<ConditionAudit>))]
        public IActionResult AuditDetails(long id)
        {
     
            var result = _unitOfWork.Conditions.GetAuditDetails(id);
            return Ok(result);
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(ConditionSPModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);//FirstCharToUpper(property.Name);
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            dynamicGridData.ColumnData = _unitOfWork.Conditions.GetAll().Where(u => u.IsDelete == false);
            dynamicGridData.TotalRecords = dynamicGridData.ColumnData.Count();


            return Ok(dynamicGridData);
        }

        [HttpPost("UploadConditionCustomData")]
        public IActionResult UploadConditionCustomData()
        {

            _unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("Condition"), Request.Form.Files[0]);
            return Ok();
        }

    }


}
