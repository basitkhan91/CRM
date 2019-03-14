
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
    public class FindingRepository : Repository<Finding>, IFindingRepository
    {
        public FindingRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Finding> GetAllFindingData()
        {
            try
            {
                var result = _appContext.Finding.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderBy(c => c.Description).ToList();
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
