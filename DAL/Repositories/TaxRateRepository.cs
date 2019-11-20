
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
//{
//    public class TaxRateRepository : Repository<TaxRates>, ITaxRateRepository
//    {
//        public TaxRateRepository(ApplicationDbContext context) : base(context)
//        { }


//        public IEnumerable<TaxRates> GetAllTaxRateData()
//        {
//            try
//            {
//                var result = _appContext.TaxRate.Include("MasterCompany").OrderBy(c => c.TaxType).ToList();
//                return result;
//            }
//            catch (Exception ex)
//            {

//                return null;
//            }


//        }

//        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

//    }
//}
{
    public class TaxRateRepository : Repository<DAL.Models.TaxRates>, ITaxRateRepository
    {
        public TaxRateRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.TaxRates> GetAllTaxRateData()
        {
            return _appContext.TaxRate.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.TaxRateId).ToList();
        }

        override
        public IQueryable<DAL.Models.TaxRates> GetPaginationData()
        {
            return _appContext.TaxRate.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.TaxRateId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

