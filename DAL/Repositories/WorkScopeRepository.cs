
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class WorkScopeRepository : Repository<WorkScope>, IWorkScopeRepository
    {
        public WorkScopeRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<WorkScope> GetAllWorkScopeData()
        {
            try
            {
                var result = _appContext.WorkScope.Include("MasterCompany").Where(c => (c.IsActive == null || c.IsActive == true) && (c.IsDelete == false || c.IsDelete == null)).OrderBy(c => c.Description).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public IEnumerable<WorkScopeAudit> GetWorkScopeHistory(long workScopeId)
        {
            try
            {
                return _appContext.WorkScopeAudit.Where(p => p.WorkScopeId == workScopeId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
