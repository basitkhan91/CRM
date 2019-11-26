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
    public class ATASubChapter2Repository : Repository<ATASubChapter2>, IATASubChapter2Repository
    {
        public ATASubChapter2Repository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<ATASubChapter2> GetAllATAMainnData()
        {
            try
            {
                var result = _appContext.ATASubChapter2.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ATASubChapter2Id).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
