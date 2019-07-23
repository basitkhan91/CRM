
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
    public class CurrencyRepository : Repository<Currency>,ICurrencyRepository
    {
        public CurrencyRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Currency> GetAllCurrencyData()
        {
           
            try
            {
                var result=_appContext.Currency.Where(c => c.IsDelete == null || c.IsDelete==false).OrderBy(c => c.Code).ToList();
                //var result = _appContext.Currency.Include("MasterCompany").Where(c => c.IsDelete == null).ToList();
                //var result = _appContext.Currency.Include("MasterCompany").ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        override
       public IQueryable<DAL.Models.Currency> GetPaginationData()
        {
            return _appContext.Currency.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.CurrencyId).ToList().AsQueryable();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
