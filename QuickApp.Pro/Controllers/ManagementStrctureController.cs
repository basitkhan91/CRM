using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class ManagementStrctureController : Controller
    {

        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public ManagementStrctureController(IUnitOfWork unitOfWork, ILogger<LegalEntityController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        [HttpGet("ManagementGet")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetforEdigt()
        {
            var allentity = _context.ManagementStructure.Where(a=>a.IsActive==true || a.IsActive==null).OrderByDescending(a=>a.ManagementStructureId).ToList();
            //return Ok(Mapper.Map<IEnumerable<LegalEntityViewModel>>(allentity));
            return Ok(allentity);

        }


        [HttpPost("managementEntitypost")]

        public IActionResult CreateManagement([FromBody] ManagementStructureViewModel managementStructureViewModel, Address address)
        {
            ManagementStructure managementStructure = new ManagementStructure();
            managementStructure.Code = managementStructureViewModel.Code;
            managementStructure.Description = managementStructureViewModel.Description;
            managementStructure.MasterCompanyId = 1;
            managementStructure.TagName = managementStructureViewModel.TagName;
            managementStructure.ParentId = managementStructureViewModel.ParentId;
            managementStructure.Name = managementStructureViewModel.Name;
            managementStructure.IsLastChild = managementStructureViewModel.IsLastChild;
            managementStructure.LegalEntityId = managementStructureViewModel.LegalEntityId;
            managementStructure.CreatedBy = managementStructureViewModel.CreatedBy;
            managementStructure.UpdatedBy = managementStructureViewModel.UpdatedBy;
            managementStructure.CreatedDate = DateTime.Now;
            managementStructure.UpdatedDate = DateTime.Now;
            _context.ManagementStructure.Add(managementStructure);
            _context.SaveChanges();

            return Ok(managementStructure);
        }
        [HttpPut("managementEntitypost/{id}")]
        public IActionResult updateManagementDetails([FromBody] ManagementStructureViewModel legalEntityViewModel)
        {
            if (legalEntityViewModel != null)
            {
                var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == legalEntityViewModel.ManagementStructureId).SingleOrDefault();
                if (entityobject != null)
                {
                   
                    entityobject.MasterCompanyId = 1;
                    entityobject.Name = legalEntityViewModel.Name;
                    entityobject.Description = legalEntityViewModel.Description;
                    entityobject.Code = legalEntityViewModel.Code;
                    entityobject.TagName = legalEntityViewModel.TagName;
                    entityobject.LegalEntityId = legalEntityViewModel.LegalEntityId;
                    entityobject.IsLastChild = legalEntityViewModel.IsLastChild;
                    entityobject.ParentId = legalEntityViewModel.ParentId;
      
                    _context.ManagementStructure.Update(entityobject);
                    _context.SaveChanges();
                    return Ok(entityobject);
                }
            }
            return Ok(ModelState);




        }


        [HttpDelete("managementEntitypost/{id}")]
        public IActionResult updateManagementDetailsactive(long id)
        {
            
                var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == id).SingleOrDefault();
                if (entityobject != null)
                {
                    entityobject.IsActive = false;
                    _context.ManagementStructure.Update(entityobject);
                    _context.SaveChanges();
                }
            
            return Ok(ModelState);




        }


        [HttpGet("LedgerNames")]
        [Produces(typeof(List<LegalEntityViewModel>))]
        public IActionResult GetLedgerNames()
        {
            var res = (from t in _context.LegalEntity
                       where t.IsActive == true || t.IsActive == null || 
                       !string.IsNullOrEmpty(t.LedgerName)
                       select new
                       {
                           t.LegalEntityId,
                           t.Name,
                           t.LedgerName
                       }).ToList();
            return Ok(res);
        }

        [HttpGet("ManagementGetView")]
    [Produces(typeof(List<LegalEntityViewModel>))]
    public IActionResult GetforEView()
    {
        var res = (from t in _context.ManagementStructure


                   join legalEntiryInfo in _context.LegalEntity on t.LegalEntityId equals legalEntiryInfo.LegalEntityId into cre
                   from legalEntiryInfo in cre.DefaultIfEmpty()
                   where t.IsActive == true || t.IsActive == null && t.LegalEntityId != null
                   // select new { t, ad, vt }).ToList();
                   select new
                   {
                       t.ManagementStructureId,
                       t.Code,
                       t.Name,
                       t.Description,
                       legalEntiryInfo,
                       t.ParentId,
                       t.IsLastChild,
                       t.TagName,
                       t.LegalEntityId,
                       t.MasterCompanyId,
                       t.IsActive,
                       t.IsDelete,
                       t.CreatedDate,
                       t.CreatedBy,
                       t.UpdatedBy,
                       t.UpdatedDate,

                       //cc.Description
                   }).ToList();


        // var allentity = _context.ManagementStructure.Where(a=>a.IsActive==true || a.IsActive==null).OrderByDescending(a=>a.ManagementStructureId).ToList();
        //return Ok(Mapper.Map<IEnumerable<LegalEntityViewModel>>(allentity));
        return Ok(res);
}
    }

}