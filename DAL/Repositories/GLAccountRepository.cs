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

        public IEnumerable<DAL.Models.GLAccount> GetAllglacoounts(long? id)
        {
            try
            {
                var glAccountData = _appContext.GLAccount.Where(x => x.GLAccountId == id).Include("GlClassFlowClassification").Include("MasterCompany").ToList();
                return glAccountData;
            }
            catch (Exception)
            {
                throw;
            }
           

            
            //return null;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;


    }
}
