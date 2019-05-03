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
    [Route("api/[controller]")]
    public class SiteController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public SiteController(IUnitOfWork unitOfWork, ILogger<SiteController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<SiteViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Sites.GetAllSiteData(); //GetAllSite Information
            return Ok(result);
        }

        [HttpGet("GetMangementSite/{id}")]
        [Produces(typeof(List<ManagementSiteViewModel>))]
        public IActionResult GetMangementSite(long id)
        {
            var result = _unitOfWork.managementSite.GetAllManagementSiteData(id); //GetAllSite Information
            return Ok(result);


        }


        [HttpPost("sitesPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] SiteViewModel siteViewModel,Address address)
        {
            if (ModelState.IsValid)
            {
                if (siteViewModel == null)
                    return BadRequest($"{nameof(siteViewModel)} cannot be null");

                DAL.Models.Site siteobject = new DAL.Models.Site();
                siteViewModel.MasterCompanyId = 1;
                siteobject.SiteId = siteViewModel.SiteId;
                siteobject.Name = siteViewModel.Name;
                siteobject.Memo = siteViewModel.Memo;
                siteobject.MasterCompanyId = siteViewModel.MasterCompanyId;
                siteobject.IsActive = siteViewModel.IsActive;
                siteobject.CreatedDate = DateTime.Now;
                siteobject.UpdatedDate = DateTime.Now;
                siteobject.IsDelete = false;//Externally we are dong for create
                siteobject.CreatedBy = siteViewModel.CreatedBy;
                siteobject.UpdatedBy = siteViewModel.UpdatedBy;
                AddAddress(siteViewModel);
                siteobject.AddressId = siteViewModel.AddressId.Value;
                _unitOfWork.Sites.Add(siteobject);
                _unitOfWork.SaveChanges();
                return Ok(siteobject);

            }

            return Ok(ModelState);
        }

        public IActionResult AddAddress(SiteViewModel siteViewModel)
        {
            Address address = new Address();
            address.Line1 = siteViewModel.Address1;
            address.Line2 = siteViewModel.Address2;
            address.Line3 = siteViewModel.Address3;
            address.PostalCode = siteViewModel.PostalCode;
            address.StateOrProvince = siteViewModel.StateOrProvince;
            address.City = siteViewModel.City;
            address.Country = siteViewModel.Country;
            address.MasterCompanyId = 1;
            address.RecordCreateDate = DateTime.Now;
            address.CreatedBy = siteViewModel.CreatedBy;
            address.UpdatedBy = siteViewModel.UpdatedBy;
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            _unitOfWork.Address.Add(address);
            _unitOfWork.SaveChanges();
            siteViewModel.AddressId = address.AddressId.Value;
            return Ok(ModelState);
        }


        [HttpPost("managementSitesPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateManagementSiteAction([FromBody] ManagementSiteViewModel managementSiteViewModel)
        {
            if (ModelState.IsValid)
            {
                if (managementSiteViewModel == null)
                    return BadRequest($"{nameof(managementSiteViewModel)} cannot be null");

                DAL.Models.ManagementSite managementsiteobject = new DAL.Models.ManagementSite();
                managementSiteViewModel.MasterCompanyId = 1;
               // managementsiteobject.ManagementSiteId = managementSiteViewModel.ManagementSiteId;
                managementsiteobject.SiteId = managementSiteViewModel.SiteId;
                managementsiteobject.ManagementStructureId = managementSiteViewModel.ManagementStructureId;
                managementsiteobject.MasterCompanyId = managementSiteViewModel.MasterCompanyId;
                if (managementSiteViewModel.IsActive != null)
                {
                    managementsiteobject.IsActive = managementSiteViewModel.IsActive;
                }
                managementsiteobject.CreatedDate = DateTime.Now;
                managementsiteobject.UpdatedDate = DateTime.Now;
                managementsiteobject.IsDelete = false;//Externally we are dong for create
                managementsiteobject.CreatedBy = managementSiteViewModel.CreatedBy;
                managementsiteobject.UpdatedBy = managementSiteViewModel.UpdatedBy;
                _unitOfWork.managementSite.Add(managementsiteobject);
                _unitOfWork.SaveChanges();
                return Ok(managementsiteobject);

            }

            return Ok(ModelState);
        }
        [HttpPut("sitesPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] SiteViewModel siteViewModel)
        {

            if (ModelState.IsValid)
            {
                if (siteViewModel == null)
                    return BadRequest($"{nameof(siteViewModel)} cannot be null");

                var existingResult = _unitOfWork.Sites.GetSingleOrDefault(c => c.SiteId == id);
                var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == existingResult.AddressId);
                //
                siteViewModel.MasterCompanyId = 1;
                existingResult.SiteId = siteViewModel.SiteId;
                existingResult.Name = siteViewModel.Name;
                existingResult.MasterCompanyId = siteViewModel.MasterCompanyId;
                existingResult.Memo = siteViewModel.Memo;
                existingResult.IsActive = siteViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = siteViewModel.CreatedBy;
                existingResult.UpdatedBy = siteViewModel.UpdatedBy;

                address.Line1 = siteViewModel.Address1;
                address.Line2 = siteViewModel.Address2;
                address.Line3 = siteViewModel.Address3;
                address.PostalCode = siteViewModel.PostalCode;
                address.StateOrProvince = siteViewModel.StateOrProvince;
                address.City = siteViewModel.City;
                address.Country = siteViewModel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = siteViewModel.CreatedBy;
                address.UpdatedBy = siteViewModel.UpdatedBy;
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                //

                _unitOfWork.Address.Update(address);
                _unitOfWork.SaveChanges();
                _unitOfWork.Sites.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }


        [HttpPut("managementSitesPost/{id}")]
        public IActionResult UpdateMnagamentSiteAction(long id, [FromBody] ManagementSiteViewModel managementSiteViewModel)
        {

            if (ModelState.IsValid)
            {
                if (managementSiteViewModel == null)
                    return BadRequest($"{nameof(managementSiteViewModel)} cannot be null");

                var existingResult = _unitOfWork.managementSite.GetSingleOrDefault(c => c.SiteId == id);
                managementSiteViewModel.MasterCompanyId = 1;
                existingResult.SiteId = managementSiteViewModel.SiteId;
                existingResult.ManagementStructureId = managementSiteViewModel.ManagementStructureId;
                existingResult.MasterCompanyId = managementSiteViewModel.MasterCompanyId;
              
                    existingResult.IsActive = managementSiteViewModel.IsActive;
               
                
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = managementSiteViewModel.CreatedBy;
                existingResult.UpdatedBy = managementSiteViewModel.UpdatedBy;

               
                _unitOfWork.SaveChanges();
                _unitOfWork.managementSite.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }


        [HttpDelete("sitesPost/{id}")]
        [Produces(typeof(SiteViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Sites.GetSingleOrDefault(c => c.SiteId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Sites.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }


        [HttpDelete("managementSitesPost/{id}")]
        [Produces(typeof(ManagementSiteViewModel))]
        public IActionResult DeleteManagementAction(long id)
        {
            var existingResult = _context.ManagementSite.Where(c => c.SiteId == id).ToList();
            //in this we are removing complete Management Site Data based on SiteId after that we will call update method to add Data 
            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.managementSite.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            //existingResult.IsDelete = true;
            //_unitOfWork.managementSite.Update(existingResult);
           

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<SiteAudit>()
                .Find(x => x.SiteId == id)
                .OrderByDescending(x => x.SiteAuditId);

            var auditResult = new List<AuditResult<SiteAudit>>();

            auditResult.Add(new AuditResult<SiteAudit> { AreaName = "Site Status", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }

}