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

    public class VendorShippingDetailsRepository : Repository<VendorShippingDetails>, IVendorShippingDetailsRepository
    {
        List<Vendor> iList = new List<Vendor>();
        public VendorShippingDetailsRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorShippingDetails> GetVendorShippingDetails()
        {
            return _appContext.VendorShippingDetails.OrderByDescending(c => c.VendorShippingId).ToList();
        }


        //public IEnumerable<object> GetVendorListDetails()
        //{

        //    {
        //        var data = (from t in _appContext.Vendor
        //                    join ad in _appContext.Address on t.AddressId equals ad.AddressId
        //                    join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
        //                    // select new { t, ad, vt }).ToList();
        //                    select new
        //                    {
        //                        Address1 = ad.Line1,
        //                        Address2 = ad.Line2,
        //                        Address3 = ad.Line3,
        //                        t.VendorCode,
        //                        t.VendorName,
        //                        ad.City,
        //                        ad.StateOrProvince,
        //                        vt.Description,
        //                        t.CreatedDate,
        //                        t.UpdatedDate,
        //                        ad.AddressId,
        //                        ad.Country,
        //                        ad.PostalCode
        //                    }).ToList();
        //        return data;

        //    }
        //    // return _appContext.Vendor.OrderByDescending(c => c.VendorId).ToList();





        //}


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
