using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using DAL.Models;
using DAL.Repositories.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Session;

namespace QuickApp.Pro.Controllers
{
    
    [Route("api/userrolepermission")]
    public class UserRolePermissionController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;
        //private IUserRoleRepository userRoleRepository;
        #endregion Private Members

        #region Constructor

        public UserRolePermissionController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            //this.userRoleRepository = userRoleRepository;
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
            var userRoles = unitOfWork.UserRole.GetAllUserRoles();
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
                    //var permissionExist = userRole.RolePermissions.Count == 0;
                    
                    //if (permissionExist)
                    //{
                    //    return BadRequest(new Exception("Please assign access to the role."));
                    //}

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

        [HttpPost("updateUserRole")]
        public IActionResult updateUserRole([FromBody] UserRole userRole)
        {
            if (userRole.Id != 0)
            {
                var rolePermissions = unitOfWork.Repository<RolePermission>().Find(x => x.UserRoleId == userRole.Id);
                unitOfWork.Repository<RolePermission>().RemoveRange(rolePermissions);
                userRole.RolePermissions = userRole.RolePermissions.Where(x => x.CanAdd ||
                                        x.CanView ||
                                        x.CanUpdate ||
                                        x.CanDelete).ToList();

                var permissionExist = userRole.RolePermissions.Count == 0;
                
                //if (permissionExist)
                //{
                //    return BadRequest(new Exception("Please assign access to the role."));
                //}

                userRole.UpdatedDate = DateTime.Now;
                
                unitOfWork.Repository<RolePermission>().AddRange(userRole.RolePermissions);
                unitOfWork.SaveChanges();
            }
            else
            {
                return BadRequest(new Exception("Please select role."));
            }

            return Ok();
        }


        [HttpPost("assignRoleToUser")]
        public IActionResult addUserRoleMapping([FromBody] List<UserRoleMapper> userRoleMapper)
        {
            if (userRoleMapper.Count() > 0)
            {
                var dbUserRoles = unitOfWork.Repository<UserRoleMapper>()
                .Find(x => x.UserId == userRoleMapper.FirstOrDefault().UserId).ToList();

                if (dbUserRoles != null && dbUserRoles.Count > 0)
                {
                    unitOfWork.Repository<UserRoleMapper>().RemoveRange(dbUserRoles);
                }

                unitOfWork.Repository<UserRoleMapper>().AddRange(userRoleMapper);
                unitOfWork.SaveChanges();

            }
            else {
                return BadRequest(new Exception("No role is assigned."));
            }

            return Ok();
        }

        [HttpGet("getUserRolesByUserId/{userId}")]
        public IActionResult getUserRolesByUserId(string userId)
        {

            HttpContext.Session.SetString("UserId", userId);
            var roles = unitOfWork.UserRole.GetUserRoleWithPermission(userId);
            return Ok(roles);        
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }


}