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

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CreditTermsController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public CreditTermsController(IUnitOfWork unitOfWork, ILogger<CreditTermsController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<CreditTermsViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.CreditTerms.GetAllCreditTermsData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<CreditTermsViewModel>>(result);

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("CreditTerms", id); //.GetAllCustomersData();


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
        [HttpPost("Creditermspost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] CreditTermsViewModel credittermviewmodel)
        {
            if (ModelState.IsValid)
            {
                if (credittermviewmodel == null)
                    return BadRequest($"{nameof(credittermviewmodel)} cannot be null");
                DAL.Models.CreditTerms credittermsobj = new DAL.Models.CreditTerms();
                credittermsobj.Name = credittermviewmodel.Name;
                credittermsobj.Percentage = credittermviewmodel.Percentage;
                credittermsobj.Days = credittermviewmodel.Days;
                credittermsobj.NetDays = credittermviewmodel.NetDays;
                credittermsobj.MasterCompanyId = credittermviewmodel.MasterCompanyId;
                credittermsobj.Memo = credittermviewmodel.Memo;
                credittermsobj.IsActive = credittermviewmodel.IsActive;
                credittermsobj.CreatedDate = DateTime.Now;
                credittermsobj.UpdatedDate = DateTime.Now;
                credittermsobj.CreatedBy = credittermviewmodel.CreatedBy;
                credittermsobj.UpdatedBy = credittermviewmodel.UpdatedBy;
                _unitOfWork.CreditTerms.Add(credittermsobj);
                _unitOfWork.SaveChanges();
                return Ok(credittermsobj);
            }

            return Ok(ModelState);
        }
        [HttpPut("Creditermspost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] CreditTermsViewModel credittermviewmodel)
        {

            if (ModelState.IsValid)
            {
                if (credittermviewmodel == null)
                    return BadRequest($"{nameof(credittermviewmodel)} cannot be null");

                var existingResult = _unitOfWork.CreditTerms.GetSingleOrDefault(c => c.CreditTermsId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = credittermviewmodel.UpdatedBy;
                existingResult.Memo = credittermviewmodel.Memo;
                existingResult.Name = credittermviewmodel.Name;
                existingResult.Percentage = credittermviewmodel.Percentage;
                existingResult.Days = credittermviewmodel.Days;
                existingResult.NetDays = credittermviewmodel.NetDays;
                existingResult.IsActive = credittermviewmodel.IsActive;
                existingResult.MasterCompanyId = credittermviewmodel.MasterCompanyId;

                _unitOfWork.CreditTerms.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("Creditermspost/{id}")]
        [Produces(typeof(CreditTermsViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.CreditTerms.GetSingleOrDefault(c => c.CreditTermsId == id);

            existingResult.IsDelete = true;
            _unitOfWork.CreditTerms.Update(existingResult);

            //_unitOfWork.CreditTerms.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<CreditTermsAudit>()
                .Find(x => x.CreditTermsId == id)
                .OrderByDescending(x => x.CreditTermsAuditId);

            var auditResult = new List<AuditResult<CreditTermsAudit>>();

            auditResult.Add(new AuditResult<CreditTermsAudit> { AreaName = "Credit terms ", Result = audits.ToList() });

            return Ok(auditResult);
        }
        #region
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(CreditTermsModel).GetProperties();
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
            dynamicGridData.ColumnData = _unitOfWork.CreditTerms.GetAll().Where(u => u.IsDelete == false);
            return Ok(dynamicGridData);
        }
        #endregion
    }
}