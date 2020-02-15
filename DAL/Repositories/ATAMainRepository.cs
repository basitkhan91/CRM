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
    public class ATAMainRepository : Repository<ATAChapter>, IATAMainRepository
    {
        public ATAMainRepository(ApplicationDbContext context) : base(context)
        { }

  
        public IEnumerable<ATAChapter> GetAllATAMainnData()
        {
            try
            {
                var result = _appContext.ATAChapter.Include("MasterCompany").Where(c => (c.IsDeleted == false || c.IsDeleted == null) &&c.IsActive==true ).OrderBy(c => c.ATAChapterName).ToList();
                return result;
            }
            catch (Exception)
            {
                throw;
            }

          
        }
        public IEnumerable<ATAChapter> GetAllATAMainData()
        {
            try
            {
                var result = _appContext.ATAChapter.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.ATAChapterId).ToList();
                return result;
            }
            catch (Exception)
            {
                throw;
            }


        }
        public IEnumerable<object> GetATASUBS(long ChID)
        {
            throw new NotImplementedException();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
