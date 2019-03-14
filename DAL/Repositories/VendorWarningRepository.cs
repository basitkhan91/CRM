using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    public class VendorWarningRepository : Repository<VendorWarnings>, IVendorWarning
    {
        public VendorWarningRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorWarnings> GetVendorWarnings()
        {
            return _appContext.VendorWarning.Include("MasterCompany").OrderByDescending(c => c.VendorWarningId).ToList();
        }
        public IEnumerable<object> GetVendorwarningWithid(long VendorId)
        {

            var data = (from t in _appContext.VendorWarning

                        where t.VendorId==VendorId
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            t.VendorId,
                            t,
                            
                        }).ToList();
            return data;
            //return _appContext.VendorWarning.Include("MasterCompany").OrderByDescending(c => c.VendorWarningId).ToList();
        }
        


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
