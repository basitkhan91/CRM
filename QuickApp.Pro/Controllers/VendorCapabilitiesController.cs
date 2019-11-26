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
    public class VendorCapabilitiesController
   : Controller
    {
        private IUnitOfWork _unitOfWork;
        // private readonly ApplicationDbContext _context;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        //private readonly ApplicationDbContext _context;

        public VendorCapabilitiesController(IUnitOfWork unitOfWork, ILogger<VendorCapabilitiesController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            //_context = context;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<VendorCapabilitiesViewModel>))]
        public IActionResult Get()
        {
            var allvendorcapabilities = _unitOfWork.VendorCapabilities.GetVendorCapabilitiesData();
            return Ok(Mapper.Map<IEnumerable<VendorCapabilitiesViewModel>>(allvendorcapabilities));
            //var allcashflows = _context.VendorCapabiliy.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.VendorCapabilityId).ToList();
            //return Ok(allcashflows);

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("VendorCapability", id);

            try
            {
                var resul1 = Mapper.Map<IEnumerable<VendorCapabilitiesViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }

        [HttpPost("vendorcapabilitypost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] VendorCapabilitiesViewModel VendorCapabilitiesViewModel)
        {
            if (ModelState.IsValid)
            {
                if (VendorCapabilitiesViewModel == null)
                    return BadRequest($"{nameof(VendorCapabilitiesViewModel)} cannot be null");

                DAL.Models.VendorCapabiliy vendorobject = new DAL.Models.VendorCapabiliy();
                vendorobject.VendorCapabilityId = VendorCapabilitiesViewModel.VendorCapabilityId;
                vendorobject.CapabilityId = VendorCapabilitiesViewModel.CapabilityId;
                vendorobject.CapabilityName = VendorCapabilitiesViewModel.CapabilityName;
                vendorobject.MasterCompanyId = VendorCapabilitiesViewModel.MasterCompanyId;
                vendorobject.IsActive = VendorCapabilitiesViewModel.IsActive;
                vendorobject.CreatedDate = DateTime.Now;
                vendorobject.UpdatedDate = DateTime.Now;
                vendorobject.CreatedBy = VendorCapabilitiesViewModel.CreatedBy;
                vendorobject.UpdatedBy = VendorCapabilitiesViewModel.UpdatedBy;
                _unitOfWork.VendorCapabilities.Add(vendorobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("vendorcapabilitypost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] VendorCapabilitiesViewModel VendorCapabilitiesViewModel)
        {

            if (ModelState.IsValid)
            {
                if (VendorCapabilitiesViewModel == null)
                    return BadRequest($"{nameof(VendorCapabilitiesViewModel)} cannot be null");

                var existingResult = _unitOfWork.VendorCapabilities.GetSingleOrDefault(c => c.VendorCapabilityId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = VendorCapabilitiesViewModel.CreatedBy;
                existingResult.UpdatedBy = VendorCapabilitiesViewModel.UpdatedBy;
                existingResult.VendorCapabilityId = VendorCapabilitiesViewModel.VendorCapabilityId;
                existingResult.CapabilityId = VendorCapabilitiesViewModel.CapabilityId;
                existingResult.CapabilityName = VendorCapabilitiesViewModel.CapabilityName;
                existingResult.IsActive = VendorCapabilitiesViewModel.IsActive;
                existingResult.MasterCompanyId = VendorCapabilitiesViewModel.MasterCompanyId;

                _unitOfWork.VendorCapabilities.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("vendorcapabilitypost/{id}")]
        [Produces(typeof(VendorCapabilitiesViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.VendorCapabilities.GetSingleOrDefault(c => c.VendorCapabilityId == id);
            existingResult.IsDelete = true;
            _unitOfWork.VendorCapabilities.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult GetVendorCapabilityAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<VendorCapabiliyAudit>()
                .Find(x => x.VendorCapabilityId == Id)
                .OrderByDescending(x => x.VendorCapabiliyAuditId).ToList();

            var auditResult = new List<AuditResult<VendorCapabiliyAudit>>();

            auditResult.Add(new AuditResult<VendorCapabiliyAudit>
            {
                AreaName = "Vendor Capabilities",
                Memo = "",
                Result = audits
            });

            return Ok(auditResult);
        }
    }
}
