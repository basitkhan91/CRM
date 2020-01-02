using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


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
//              {
//                throw ex
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

            //var data = (from tr in _appContext.TaxRate
            //            join ty in _appContext.TaxType on Convert.ToByte(tr.TaxTypeId) equals ty.TaxTypeId
            //            where tr.IsDeleted == false || tr.IsDeleted == null
            //            select new
            //            {
            //                tr.CreatedBy,
            //                tr.CreatedDate,
            //                tr.IsActive,
            //                tr.IsDeleted,
            //                tr.MasterCompanyId,
            //                tr.Memo,
            //                tr.TaxRate,
            //                tr.TaxRateId,
            //                tr.TaxTypeId,
            //                TaxType = ty.Description
            //            }).ToList();
            //return data;
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

