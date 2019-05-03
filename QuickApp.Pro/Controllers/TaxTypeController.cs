using System;
using System.Collections.Generic;
using System.Linq;
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

    [Route("api/TaxType")]
    public class TaxTypeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetTaxTypeById";

        public TaxTypeController (IUnitOfWork unitOfWork, ILogger<ActionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<TaxTypeViewModel>))]
        public IActionResult Get()
        {
            var allTaxTypes = _unitOfWork.TaxType.GetAllTaxTypeData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<TaxTypeViewModel>>(allTaxTypes));


        }



       //[HttpGet("auditHistoryById/{id}", Name = "GetAuditHostoryById")]
       // [Produces(typeof(List<AuditHistory>))]
       // public IActionResult GetAuditHostoryById(long id)
       // {
       //     var result = _unitOfWork.AuditHistory.GetAllHistory("TaxType", id); //.GetAllCustomersData();


       //     try
       //     {
       //         var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

       //         return Ok(resul1);
       //     }
       //     catch (Exception ex)
       //     {

       //         throw;
       //     }



       // }

        [HttpPost("taxType")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] TaxTypeViewModel taxViewModel)

        { 
            if (ModelState.IsValid)
            {
                if (taxViewModel == null)
                    return BadRequest($"{nameof(taxViewModel)} cannot be null");

                DAL.Models.TaxType taxTypeObj = new DAL.Models.TaxType();
                
                taxTypeObj.Description = taxViewModel.Description;
                taxTypeObj.MasterCompanyId = taxViewModel.MasterCompanyId;
                taxTypeObj.IsActive = taxViewModel.IsActive;
                taxTypeObj.Memo = taxViewModel.Memo;
                taxTypeObj.CreatedDate = DateTime.Now;
                taxTypeObj.UpdatedDate = DateTime.Now;
                taxTypeObj.CreatedBy = taxViewModel.CreatedBy;
                taxTypeObj.UpdatedBy = taxViewModel.UpdatedBy;
                _unitOfWork.TaxType.Add(taxTypeObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("taxType/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] TaxTypeViewModel taxTypeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (taxTypeViewModel == null)
                    return BadRequest($"{nameof(taxTypeViewModel)} cannot be null");

                var existingResult = _unitOfWork.TaxType.GetSingleOrDefault(c => c.TaxTypeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = taxTypeViewModel.UpdatedBy;
                existingResult.Description = taxTypeViewModel.Description;
                existingResult.Memo = taxTypeViewModel.Memo;
                existingResult.IsActive = taxTypeViewModel.IsActive;
                existingResult.MasterCompanyId = taxTypeViewModel.MasterCompanyId;

                _unitOfWork.TaxType.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("actions/{id}")]
        [Produces(typeof(TaxTypeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.TaxType.GetSingleOrDefault(c => c.TaxTypeId == id);

            existingResult.IsDelete = true;
            _unitOfWork.TaxType.Update(existingResult);


            //_unitOfWork.TaxType.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<TaxTypeAudit>()
                .Find(x => x.TaxTypeId == id)
                .OrderByDescending(x => x.TaxTypeAuditId);

            var auditResult = new List<AuditResult<TaxTypeAudit>>();

            auditResult.Add(new AuditResult<TaxTypeAudit> { AreaName = "Tax Type Status", Result = audits.ToList() });

            return Ok(auditResult);
        }

    }




}
