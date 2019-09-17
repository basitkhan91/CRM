using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]

    public class GlAccountClassController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public GlAccountClassController(IUnitOfWork unitOfWork, ILogger<GlAccountClassController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<GLAccountClassViewModel>))]
        public IActionResult Get()
        {
            var allGlAccountClass = _unitOfWork.GLAccountClass.GetAllGLAccountClassData(); 
            return Ok(Mapper.Map<IEnumerable<GLAccountClassViewModel>>(allGlAccountClass));

        }
        
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GLAccountClass", id); 

            try
            {
                var resul1 = Mapper.Map<IEnumerable<GLAccountClassViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("glaccountclasspost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] GLAccountClassViewModel GLAccountClassViewModel)
        {
            if (ModelState.IsValid)
            {
                if (GLAccountClassViewModel == null)
                    return BadRequest($"{nameof(GLAccountClassViewModel)} cannot be null");

                DAL.Models.GLAccountClass glaccountclassobject = new DAL.Models.GLAccountClass();
                glaccountclassobject.GLAccountClassId = GLAccountClassViewModel.GLAccountClassId;
                glaccountclassobject.GLCID = GLAccountClassViewModel.GLCID ;
                glaccountclassobject.GLAccountClassName = GLAccountClassViewModel.GLAccountClassName;
                glaccountclassobject.MasterCompanyId = GLAccountClassViewModel.MasterCompanyId;
                glaccountclassobject.IsActive = GLAccountClassViewModel.IsActive;
                glaccountclassobject.CreatedDate = DateTime.Now;
                glaccountclassobject.UpdatedDate = DateTime.Now;
                glaccountclassobject.CreatedBy = GLAccountClassViewModel.CreatedBy;
                glaccountclassobject.UpdatedBy = GLAccountClassViewModel.UpdatedBy;
                _unitOfWork.GLAccountClass.Add(glaccountclassobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("glaccountclasspost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] GLAccountClassViewModel GLAccountClassViewModel)
        {

            if (ModelState.IsValid)
            {
                if (GLAccountClassViewModel == null)
                    return BadRequest($"{nameof(GLAccountClassViewModel)} cannot be null");

                var existingResult = _unitOfWork.GLAccountClass.GetSingleOrDefault(c => c.GLAccountClassId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = GLAccountClassViewModel.UpdatedBy;
                existingResult.GLAccountClassId = GLAccountClassViewModel.GLAccountClassId;
                existingResult.GLCID = GLAccountClassViewModel.GLCID;
                existingResult.GLAccountClassName = GLAccountClassViewModel.GLAccountClassName;
                existingResult.IsActive = GLAccountClassViewModel.IsActive;
                existingResult.MasterCompanyId = GLAccountClassViewModel.MasterCompanyId;

                _unitOfWork.GLAccountClass.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("glaccountclasspost/{id}")]
        [Produces(typeof(GLAccountClassViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.GLAccountClass.GetSingleOrDefault(c => c.GLAccountClassId == id);
            existingResult.IsDelete = true;
            _unitOfWork.GLAccountClass.Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<GLAccountClassAudit>()
                .Find(x => x.GLAccountClassId == id)
                .OrderByDescending(x => x.GLAccountClassAuditId);

            var auditResult = new List<AuditResult<GLAccountClassAudit>>();

            auditResult.Add(new AuditResult<GLAccountClassAudit> { AreaName = "GL Account Class", Result = audits.ToList() });

            return Ok(auditResult);
        }


        [HttpPost("pagination")]
        public IActionResult GetAircraftManufacturer([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = (pageIndex / pageListPerPage) + 1;
            var data = DAL.Common.PaginatedList<GLAccountClass>.Create(_unitOfWork.GLAccountClass.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(GLAccountClassModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<GLAccountClassModel> dynamicGridData = new DynamicGridData<GLAccountClassModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<GLAccountClassModel> gLAccountClassModels = new List<GLAccountClassModel>();
            GLAccountClassModel gLAccountClass = null;
            var gLAccounts = _unitOfWork.GLAccountClass.GetAll();
            foreach (var item in gLAccounts)
            {
                gLAccountClass = new GLAccountClassModel();
                gLAccountClass.GLAccountClassId = item.GLAccountClassId;
                gLAccountClass.GLCID = item.GLCID;
                gLAccountClass.GLAccountClassName = item.GLAccountClassName;
                gLAccountClass.CreatedDate = item.CreatedDate;
                gLAccountClass.CreatedBy = item.CreatedBy;
                gLAccountClass.UpdatedDate = item.UpdatedDate;
                gLAccountClass.UpdatedBy = item.UpdatedBy;
                //currency.IsActive = item.IsActive;
                gLAccountClassModels.Add(gLAccountClass);
            }
            dynamicGridData.ColumnData = gLAccountClassModels;
            return Ok(dynamicGridData);
        }
    }
}

