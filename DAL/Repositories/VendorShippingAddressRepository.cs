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
    public class VendorShippingAddressRepository : Repository<VendorShippingAddress>, IVendorShippingAddress
    {
        public VendorShippingAddressRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorShippingAddress> GetVendorShippingAddresses()
        {
            return _appContext.VendorShippingAddress.Include("MasterCompany").OrderByDescending(c => c.VendorShippingAddressId).ToList();
        }
        public IEnumerable<Object> GetAllShippingAddressDetails(long id)
        {
            var data = (from v in _appContext.VendorShippingAddress
                        //join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        
                      where ((v.IsDelete == false || v.IsDelete == null) && (v.VendorId==id))

                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            //Address1 = ad.Line1,
                            //Address2 = ad.Line2,
                            //Address3 = ad.Line3,
                            //ad.AddressId,
                            //ad.Country,
                            //ad.PostalCode,
                            //ad.City,
                            //ad.StateOrProvince,
                            v.SiteName,
                            v.VendorShippingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.VendorId,
                            v.IsActive
                          


                        }).ToList();
            return data;
        }
        public IEnumerable<Object> GetAllShipViaDetails(long Selectedrow)
        {
            var data = (from vs in _appContext.VendorShipping
                        join vsa in  _appContext.VendorShippingAddress on Selectedrow equals vsa.VendorShippingAddressId  
                        where ((vs.VendorShippingAddressId == Selectedrow) && (vs.IsActive==true))

                        // select new { t, ad, vt }).ToList();
            select new
                        {
                            vsa.SiteName,
                            vs.VendorShippingId,
                            vs.Memo,
                            vs.ShipVia,
                            vs.ShippingAccountinfo,
                            vs.ShippingURL,
                            vs.ShippingId,
                            vs.IsActive,
                            vs.VendorId,
                            vs.VendorShippingAddressId,
                            vs.CreatedDate,
                            vs.UpdatedDate
                       

                        }).ToList();
            return data;
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
