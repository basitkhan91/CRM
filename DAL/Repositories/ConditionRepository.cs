
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
    public class ConditionRepository : Repository<Condition>, IConditionRepository
    {
        public ConditionRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Condition> GetAllConditionData()
        {

            try
            {
                var result = _appContext.Condition.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderBy(c => c.Description).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public IEnumerable<ConditionAudit> GetAuditDetails(long conditionId)
        {
            return _appContext.ConditionAudit.Where(c => c.ConditionId   == conditionId).OrderByDescending(p => p.UpdatedDate).ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
