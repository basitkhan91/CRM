

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
    public class MasterCompanyRepository : Repository<MasterCompany>, IMasterCompanyRepository
    {
        public MasterCompanyRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<MasterCompany> GetAllMasterComapnyData()
        {

            try
            {
                var result = _appContext.MasterCompany.OrderBy(c => c.CompanyName).ToList();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
           
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
