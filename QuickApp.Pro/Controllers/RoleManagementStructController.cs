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
    public class RoleManagementStructController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public RoleManagementStructController(IUnitOfWork unitOfWork, ILogger<RoleManagementStructController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<UserRoleLevelViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.userRoleLevel.GetAllUserRoleLevelData(); //GetAllUserRole Information
            return Ok(result);
        }

        [HttpGet("GetUserRoleMangementStructure/{id}")]
        [Produces(typeof(List<UserRoleLevelMgmStructViewModel>))]
        public IActionResult GetRoleMangementStructure(long id)
        {
            var result = _unitOfWork.userRoleLevelMgmStruct.GetAllUserRoleLevelMgmStructData(id); //GetAllUserRoleManagementStru Information
            return Ok(result);
        }

        [HttpPost("userRolePost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] UserRoleLevelViewModel userRoleLevelViewModel)
        {
            if (ModelState.IsValid)
            {
                if (userRoleLevelViewModel == null)
                    return BadRequest($"{nameof(userRoleLevelViewModel)} cannot be null");

                DAL.Models.UserRoleLevel userroleobject = new DAL.Models.UserRoleLevel();
                userRoleLevelViewModel.MasterCompanyId = 1;
                //userroleobject.UserRoleLevelId = userRoleLevelViewModel.UserRoleLevelId;
                userroleobject.Description = userRoleLevelViewModel.Description;
                userroleobject.MasterCompanyId = userRoleLevelViewModel.MasterCompanyId;
                userroleobject.IsActive = userRoleLevelViewModel.IsActive;
                userroleobject.CreatedDate = DateTime.Now;
                userroleobject.UpdatedDate = DateTime.Now;
                //userroleobject.IsDelete = false;//Externally we are dong for create
                userroleobject.CreatedBy = userRoleLevelViewModel.CreatedBy;
                userroleobject.UpdatedBy = userRoleLevelViewModel.UpdatedBy;
                _unitOfWork.userRoleLevel.Add(userroleobject);
                _unitOfWork.SaveChanges();
                return Ok(userroleobject);

            }

            return Ok(ModelState);
        }


        [HttpPost("UserRoleMangementStructurePost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateManagementStrucutureAction([FromBody] UserRoleLevelMgmStructViewModel userRoleLevelMgmStruct)
        {
            if (ModelState.IsValid)
            {
                if (userRoleLevelMgmStruct == null)
                    return BadRequest($"{nameof(userRoleLevelMgmStruct)} cannot be null");

                DAL.Models.UserRoleLevelMgmtStruct userrolemanagementstructobject = new DAL.Models.UserRoleLevelMgmtStruct();
                userRoleLevelMgmStruct.MasterCompanyId = 1;
                // managementsiteobject.ManagementSiteId = managementSiteViewModel.ManagementSiteId;
                userrolemanagementstructobject.UserRoleLevelId = userRoleLevelMgmStruct.UserRoleLevelId;
                userrolemanagementstructobject.ManagementStructureId = userRoleLevelMgmStruct.ManagementStructureId;
                userrolemanagementstructobject.MasterCompanyId = userRoleLevelMgmStruct.MasterCompanyId;
                userrolemanagementstructobject.IsActive = userRoleLevelMgmStruct.IsActive;
                userrolemanagementstructobject.CreatedDate = DateTime.Now;
                userrolemanagementstructobject.UpdatedDate = DateTime.Now;
                userrolemanagementstructobject.IsDelete = false;//Externally we are dong for create
                userrolemanagementstructobject.CreatedBy = userRoleLevelMgmStruct.CreatedBy;
                userrolemanagementstructobject.UpdatedBy = userRoleLevelMgmStruct.UpdatedBy;
                _unitOfWork.userRoleLevelMgmStruct.Add(userrolemanagementstructobject);
                _unitOfWork.SaveChanges();
                return Ok(userrolemanagementstructobject);
            }

            return Ok(ModelState);
        }


        [HttpPut("userRolePost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] UserRoleLevelViewModel userRoleLevelViewModel)
        {

            if (ModelState.IsValid)
            {
                if (userRoleLevelViewModel == null)
                    return BadRequest($"{nameof(userRoleLevelViewModel)} cannot be null");

                var existingResult = _unitOfWork.userRoleLevel.GetSingleOrDefault(c => c.UserRoleLevelId == id);
                //sending Primary Keywith that we are putting
                userRoleLevelViewModel.MasterCompanyId = 1;
                existingResult.Description = userRoleLevelViewModel.Description;
                existingResult.MasterCompanyId = userRoleLevelViewModel.MasterCompanyId;
                existingResult.IsActive = userRoleLevelViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = userRoleLevelViewModel.CreatedBy;
                existingResult.UpdatedBy = userRoleLevelViewModel.UpdatedBy;
                
                _unitOfWork.userRoleLevel.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }

        [HttpPut("UserRoleMangementStructurePost/{id}")]
        public IActionResult UpdateRoleMnagamentStructureAction(long id, [FromBody] UserRoleLevelMgmStructViewModel userRoleLevelMgmStructViewModel)
        {

            if (ModelState.IsValid)
            {
                if (userRoleLevelMgmStructViewModel == null)
                    return BadRequest($"{nameof(userRoleLevelMgmStructViewModel)} cannot be null");

                var existingResult = _unitOfWork.userRoleLevelMgmStruct.GetSingleOrDefault(c => c.UserRoleManagementStructureId == id);
                userRoleLevelMgmStructViewModel.MasterCompanyId = 1;
                existingResult.UserRoleLevelId = userRoleLevelMgmStructViewModel.UserRoleLevelId;
                existingResult.ManagementStructureId = userRoleLevelMgmStructViewModel.ManagementStructureId;
                existingResult.MasterCompanyId = userRoleLevelMgmStructViewModel.MasterCompanyId;
                existingResult.IsActive = userRoleLevelMgmStructViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = userRoleLevelMgmStructViewModel.CreatedBy;
                existingResult.UpdatedBy = userRoleLevelMgmStructViewModel.UpdatedBy;


                _unitOfWork.SaveChanges();
                _unitOfWork.userRoleLevelMgmStruct.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }

        [HttpDelete("userRolePost/{id}")]
        [Produces(typeof(UserRoleLevel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.userRoleLevel.GetSingleOrDefault(c => c.UserRoleLevelId == id);
            //existingResult.IsDelete = true;
            _unitOfWork.userRoleLevel.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpDelete("UserRoleMangementStructurePost/{id}")]
        [Produces(typeof(UserRoleLevelMgmStructViewModel))]
        public IActionResult DeleteManagementAction(long id)
        {
            var existingResult = _context.UserRoleLevelMgmtStruct.Where(c => c.UserRoleLevelId == id).ToList();
            //in this we are removing complete Management Site Data based on SiteId after that we will call update method to add Data 
            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.userRoleLevelMgmStruct.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            //existingResult.IsDelete = true;
            //_unitOfWork.managementSite.Update(existingResult);
            return Ok(id);
        }


    }
}