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
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CustomerClassificationController : Controller
    {
       
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public CustomerClassificationController(IUnitOfWork unitOfWork, ILogger<CustomerClassificationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        
        [HttpGet("Get")]
        [Produces(typeof(List<CustomerClassificationViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.CustomerClassifications.GetAllCustomerClassificationData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<CustomerClassificationViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("CustomerClassification", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }
        [HttpPost("CustomerclassPost")]
        public IActionResult CreateAction([FromBody] CustomerClassificationViewModel customerClassificationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (customerClassificationViewModel == null)
                    return BadRequest($"{nameof(customerClassificationViewModel)} cannot be null");

                DAL.Models.CustomerClassification Customerclassbjobject = new DAL.Models.CustomerClassification();
                Customerclassbjobject.Description = customerClassificationViewModel.Description;
                Customerclassbjobject.MasterCompanyId = customerClassificationViewModel.MasterCompanyId;
                Customerclassbjobject.IsActive = customerClassificationViewModel.IsActive;
                Customerclassbjobject.Memo = customerClassificationViewModel.Memo;
                Customerclassbjobject.CreatedDate = DateTime.Now;
                Customerclassbjobject.UpdatedDate = DateTime.Now;
                Customerclassbjobject.IsDeleted = false;
                Customerclassbjobject.CreatedBy = customerClassificationViewModel.CreatedBy;
                Customerclassbjobject.UpdatedBy = customerClassificationViewModel.UpdatedBy;
                _unitOfWork.CustomerClassifications.Add(Customerclassbjobject);
                _unitOfWork.SaveChanges();
                return Ok(Customerclassbjobject);

            }

            return Ok(ModelState);
        }
        

        [HttpPut("CustomerclassPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] CustomerClassificationViewModel customerClassificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (customerClassificationViewModel == null)
                    return BadRequest($"{nameof(CustomerClassificationViewModel)} cannot be null");

                var existingResult = _unitOfWork.CustomerClassifications.GetSingleOrDefault(c => c.CustomerClassificationId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = customerClassificationViewModel.UpdatedBy;
                existingResult.Memo = customerClassificationViewModel.Memo;
                existingResult.Description = customerClassificationViewModel.Description;
                existingResult.IsActive = customerClassificationViewModel.IsActive;
                existingResult.IsDeleted = customerClassificationViewModel.IsDeleted;

                existingResult.MasterCompanyId = customerClassificationViewModel.MasterCompanyId;

                _unitOfWork.CustomerClassifications.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("CustomerclassPost/{id}")]
        [Produces(typeof(CustomerClassificationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.CustomerClassifications.GetSingleOrDefault(c => c.CustomerClassificationId == id);

            existingResult.IsDeleted = true;
            _unitOfWork.CustomerClassifications.Update(existingResult);

            //_unitOfWork.CustomerClassifications.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<CustomerClassificationAudit>()
                .Find(x => x.CustomerClassificationId == id)
                .OrderByDescending(x => x.CustomerClassificationAuditId);

            var auditResult = new List<AuditResult<CustomerClassificationAudit>>();

            auditResult.Add(new AuditResult<CustomerClassificationAudit> { AreaName = "Customer Classification", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }

}
