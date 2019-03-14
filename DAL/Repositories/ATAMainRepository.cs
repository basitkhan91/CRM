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
                var result = _appContext.ATAChapter.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ATAChapterId).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }

          
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
