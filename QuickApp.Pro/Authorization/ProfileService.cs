// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using DAL.Core;
using DAL.Models;
using DAL;

namespace QuickApp.Pro.Authorization
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private readonly ApplicationDbContext _context;

        public ProfileService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory, ApplicationDbContext context)
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
            _context = context;
        }

        public async System.Threading.Tasks.Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            if (user.EmployeeId != null)
            {
                var result = (from e in _context.Employee
                                  //join usr in _context.AspNetUsers on e.EmployeeId equals usr.EmployeeId
                              join mle in _context.ManagementStructure on e.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                              from mle in mainCompanyTree.DefaultIfEmpty()

                              join divmle in _context.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                              from divmle in mainDivCompany.DefaultIfEmpty()

                              join biumle in _context.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                              from biumle in BIUDivCompany.DefaultIfEmpty()

                              join compmle in _context.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                              from compmle in comivCompany.DefaultIfEmpty()
                              where e.EmployeeId == user.EmployeeId
                              select new
                              {
                                  //e.EmployeeId,
                                  //UserName = e.FirstName,
                                  EntityName = mle.Name,
                                  DivEntityName = divmle.Name,
                                  BiEntityName = biumle.Name,
                                  CoEntityName = compmle.Name,
                                  e.ManagementStructureId,

                              }).FirstOrDefault();

                if (result != null)
                {
                    claims.Add(new Claim(PropertyConstants.ManagementStructureId, Convert.ToString(result.ManagementStructureId)));
                    claims.Add(new Claim(PropertyConstants.EntityName, result.EntityName));
                    claims.Add(new Claim(PropertyConstants.DivEntityName, result.DivEntityName));
                    claims.Add(new Claim(PropertyConstants.BiEntityName, result.BiEntityName));
                    claims.Add(new Claim(PropertyConstants.CoEntityName, result.CoEntityName));
                }

                claims.Add(new Claim(PropertyConstants.EmployeeId, Convert.ToString(user.EmployeeId)));

            }

          

            if (user.JobTitle != null)
                claims.Add(new Claim(PropertyConstants.JobTitle, user.JobTitle));

            if (user.FullName != null)
                claims.Add(new Claim(PropertyConstants.FullName, user.FullName));

            if (user.Configuration != null)
                claims.Add(new Claim(PropertyConstants.Configuration, user.Configuration));

            context.IssuedClaims = claims;
        }


        public async System.Threading.Tasks.Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);

            context.IsActive = (user != null) && user.IsEnabled;
        }
    }
}