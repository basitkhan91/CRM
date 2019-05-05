using System;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{
    [Route("api/userrolepermission")]
    public class UserRolePermissionController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public UserRolePermissionController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllModuleHierarchy")]
        public IActionResult getAllModuleHierarchy()
        {
            var moduleHierarchies = unitOfWork.Repository<ModuleHierarchyMaster>()
                .GetAll().OrderBy(x => x.ParentId).ToList();
            return Ok(moduleHierarchies);
        }

        [HttpGet("getAllUserRole")]
        public IActionResult getAllUserRole()
        {
            var userRoles = unitOfWork.Repository<UserRole>().GetAll();
            return Ok(userRoles);
        }

        [HttpGet("getUserRole/{userRoleId}")]
        public IActionResult getUserRole(int userRoleId)
        {
            var userRole = unitOfWork.Repository<UserRole>().Get(userRoleId);
            return Ok(userRole);
        }

        [HttpPost("addUserRole")]
        public IActionResult addUserRole([FromBody] UserRole userRole)
        {
            if (ModelState.IsValid)
            {
                var existingUserRole = unitOfWork.Repository<UserRole>()
                .Find(x => x.Name.Equals(userRole.Name, StringComparison.InvariantCultureIgnoreCase))
                .FirstOrDefault();
                if (existingUserRole == null)
                {
                    var permissionExist = userRole.RolePermissions.Count == 0;
                    var anyPermission = userRole.RolePermissions.Any(x =>
                                            x.CanAdd ||
                                            x.CanView ||
                                            x.CanUpdate ||
                                            x.CanDelete);
                    if (permissionExist || !anyPermission)
                    {
                        return BadRequest(new Exception("Please assign access to the role."));
                    }
                    
                    userRole.CreatedDate = DateTime.Now;
                    unitOfWork.Repository<UserRole>().Add(userRole);
                    unitOfWork.SaveChanges();
                }
                else
                {
                    return BadRequest(new Exception(existingUserRole.Name + " already exist."));
                }
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

            return Ok();
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }


}