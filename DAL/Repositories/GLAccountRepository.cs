using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class GLAccountRepository : Repository<DAL.Models.GLAccount>, IGLAccount
    {
        public GLAccountRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.GLAccount> GetAllglacoounts(long id)
        {
            var glAccountData= _appContext.GLAccount.Include("GlClassFlowClassification").Include("GLAccountMiscCategory").Include("MasterCompany").Where(c => c.GLAccountId==id).ToList();

            return glAccountData;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;


    }
}
