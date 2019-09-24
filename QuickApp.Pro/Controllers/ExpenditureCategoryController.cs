using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
    public class ExpenditureCategoryController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public ExpenditureCategoryController(IUnitOfWork unitOfWork, ILogger<ExpenditureCategoryController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ExpenditureCategoryViewModel>))]
        public IActionResult Get()
        {
            var allExpenditureCategoryinfo = _unitOfWork.ExpenditureCategory.getAllExpenditureCategoryInfo(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ExpenditureCategoryViewModel>>(allExpenditureCategoryinfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ExpenditureCategory", id); //.GetAllCustomersData();


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

        [HttpPost("expenditurecategory")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ExpenditureCategoryViewModel expenditurecategoryViewModel)
        {
            if (ModelState.IsValid)
            {
                if (expenditurecategoryViewModel == null)
                    return BadRequest($"{nameof(expenditurecategoryViewModel)} cannot be null");

                DAL.Models.ExpenditureCategory expenditurecategoryobject = new DAL.Models.ExpenditureCategory();
                expenditurecategoryobject.Description = expenditurecategoryViewModel.Description;
                expenditurecategoryobject.MasterCompanyId = expenditurecategoryViewModel.MasterCompanyId;
                expenditurecategoryobject.IsActive = expenditurecategoryViewModel.IsActive;
                expenditurecategoryobject.Memo = expenditurecategoryViewModel.Memo;
                expenditurecategoryobject.CreatedDate = DateTime.Now;
                expenditurecategoryobject.UpdatedDate = DateTime.Now;
                expenditurecategoryobject.CreatedBy = expenditurecategoryViewModel.CreatedBy;
                expenditurecategoryobject.UpdatedBy = expenditurecategoryViewModel.UpdatedBy;
                _unitOfWork.ExpenditureCategory.Add(expenditurecategoryobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("expenditurecategory/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ExpenditureCategoryViewModel expenditurecategoryViewModel)
        {

            if (ModelState.IsValid)
            {
                if (expenditurecategoryViewModel == null)
                    return BadRequest($"{nameof(expenditurecategoryViewModel)} cannot be null");

                var existingResult = _unitOfWork.ExpenditureCategory.GetSingleOrDefault(c => c.ExpenditureCategoryId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = expenditurecategoryViewModel.UpdatedBy;
                existingResult.Description = expenditurecategoryViewModel.Description;
                existingResult.Memo = expenditurecategoryViewModel.Memo;
                existingResult.IsActive = expenditurecategoryViewModel.IsActive;
                existingResult.MasterCompanyId = expenditurecategoryViewModel.MasterCompanyId;

                _unitOfWork.ExpenditureCategory.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("expenditurecategory/{id}")]
        [Produces(typeof(ExpenditureCategoryViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ExpenditureCategory.GetSingleOrDefault(c => c.ExpenditureCategoryId == id);

            existingResult.IsDelete = true;
            _unitOfWork.ExpenditureCategory.Update(existingResult);

            //_unitOfWork.ExpenditureCategory.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ExpenditureCategoryAudit>()
                .Find(x => x.ExpenditureCategoryId == id)
                .OrderByDescending(x => x.ExpenditureCategoryAuditId);

            var auditResult = new List<AuditResult<ExpenditureCategoryAudit>>();

            auditResult.Add(new AuditResult<ExpenditureCategoryAudit> { AreaName = "Expenditure", Result = audits.ToList() });

            return Ok(auditResult);
        }
        #region
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(ExpenditureCategoryModel).GetProperties();
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
            dynamicGridData.ColumnData = _unitOfWork.ExpenditureCategory.GetAll().Where(u => u.IsDelete == false);
            return Ok(dynamicGridData);
        }
        #endregion
    }




}
