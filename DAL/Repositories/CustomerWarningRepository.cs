using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class CustomerWarningRepository : Repository<CustomerWarning>, ICustomerWarning
    {
        public CustomerWarningRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<CustomerWarning> GetCustomerWarnings()
        {
            return _appContext.CustomerWarning.Include("MasterCompany").OrderByDescending(c => c.CustomerWarningId).ToList();
        }
        public IEnumerable<object> GetCustomerwarningWithid(long CustomerId)
        {

            var data = (from t in _appContext.CustomerWarning

                        where t.CustomerId == CustomerId
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            t.CustomerId,
                            t,

                        }).ToList();
            return data;
            //return _appContext.CustomerWarning.Include("MasterCompany").OrderByDescending(c => c.CustomerWarningId).ToList();
        }

        public IEnumerable<object> GetCustomerwarning(long CustomerId)
        {

            var data = (from t in _appContext.CustomerWarning

                where t.CustomerId == CustomerId
                select new
                {
                    t.CustomerId,
                    t.CustomerWarningId,
                    t.SourceModule,
                   
                    t.WarningMessage,
                    t.RestrictMessage,
                    t.MasterCompanyId,
                    t.CreatedBy,
                    t.UpdatedBy,
                    t.CreatedDate,
                    t.UpdatedDate,
                    t.IsActive,
                    t.IsRestrict,
                    t.IsAllow,
                    t.IsWarning
                }).ToList();
            return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

   