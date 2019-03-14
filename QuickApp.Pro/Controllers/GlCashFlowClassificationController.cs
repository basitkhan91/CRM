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
    public class GlCashFlowClassificationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public GlCashFlowClassificationController( ApplicationDbContext context,IUnitOfWork unitOfWork, ILogger<GlCashFlowClassificationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<GlCashFlowClassificationViewModel>))]
        public IActionResult Get()
        {
            var allcashflows = _context.GlClassFlowClassification.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a=>a.GlClassFlowClassificationId).ToList();
            return Ok(allcashflows);

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GlClassFlowClassification", id);

            try
            {
                var resul1 = Mapper.Map<IEnumerable<GlCashFlowClassificationViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("glcashflowpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] GlCashFlowClassificationViewModel GlCashFlowClassificationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (GlCashFlowClassificationViewModel == null)
                    return BadRequest($"{nameof(GlCashFlowClassificationViewModel)} cannot be null");

                DAL.Models.GlClassFlowClassification glclassflowobject = new DAL.Models.GlClassFlowClassification();
                glclassflowobject.GlClassFlowClassificationId = GlCashFlowClassificationViewModel.GlClassFlowClassificationId;
                glclassflowobject.GLCID = GlCashFlowClassificationViewModel.GLCID;
                glclassflowobject.GLClassFlowClassificationName = GlCashFlowClassificationViewModel.GLClassFlowClassificationName;
                glclassflowobject.MasterCompanyId = GlCashFlowClassificationViewModel.MasterCompanyId;
                glclassflowobject.IsActive = GlCashFlowClassificationViewModel.IsActive;
                glclassflowobject.CreatedDate = DateTime.Now;
                glclassflowobject.UpdatedDate = DateTime.Now;
                glclassflowobject.CreatedBy = GlCashFlowClassificationViewModel.CreatedBy;
                glclassflowobject.UpdatedBy = GlCashFlowClassificationViewModel.UpdatedBy;
                _unitOfWork.GlClassFlowsClassification.Add(glclassflowobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("glcashflowpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] GlCashFlowClassificationViewModel GlCashFlowClassificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (GlCashFlowClassificationViewModel == null)
                    return BadRequest($"{nameof(GlCashFlowClassificationViewModel)} cannot be null");

                var existingResult = _unitOfWork.GlClassFlowsClassification.GetSingleOrDefault(c => c.GlClassFlowClassificationId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = GlCashFlowClassificationViewModel.UpdatedBy;
                existingResult.GlClassFlowClassificationId = GlCashFlowClassificationViewModel.GlClassFlowClassificationId;
                existingResult.GLCID = GlCashFlowClassificationViewModel.GLCID;
                existingResult.GLClassFlowClassificationName = GlCashFlowClassificationViewModel.GLClassFlowClassificationName;
                existingResult.IsActive = GlCashFlowClassificationViewModel.IsActive;
                existingResult.MasterCompanyId = GlCashFlowClassificationViewModel.MasterCompanyId;

                _unitOfWork.GlClassFlowsClassification.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("glcashflowpost/{id}")]
        [Produces(typeof(GlCashFlowClassificationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.GlClassFlowClassification.GetSingleOrDefault(c => c.GlClassFlowClassificationId == id);
            existingResult.IsDelete = true;
            _unitOfWork.GlClassFlowsClassification.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }
    }

}

