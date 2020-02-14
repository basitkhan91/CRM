using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                        from cont in country.DefaultIfEmpty()

                        where ((v.IsDeleted == false || v.IsDeleted == null) && (v.VendorId==id))

                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.Country,
                            CountryName = cont.countries_name,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            v.SiteName,
                            v.VendorShippingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.VendorId,
                            v.IsActive,
                            v.IsPrimary
                          


                        }).ToList();
            return data;
        }
        public IEnumerable<Object> GetAllShipViaDetails(long Selectedrow)
        {
            var data = (from vs in _appContext.VendorShipping
                        join vsa in  _appContext.VendorShippingAddress on Selectedrow equals vsa.VendorShippingAddressId  
                        where ((vs.VendorShippingAddressId == Selectedrow) && (vs.IsActive==true && vs.IsDeleted!=true))

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
                            vs.UpdatedDate,
                            vs.IsPrimary
                       

                        }).ToList();
            return data;
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);
        public IEnumerable<object> GetVendorShippingAddressAudit(long vendorId, long vendirShippingAddressId)
        {
            var data = (from v in _appContext.VendorShippingAddressAudit
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                        from cont in country.DefaultIfEmpty()
                        where (v.VendorId == vendorId && v.VendorShippingAddressId== vendirShippingAddressId)                        
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,                           
                            ad.Country,
                            CountryName = cont.countries_name,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            v.SiteName,
                            v.AuditVendorShippingAddressId,
                            v.VendorShippingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.CreatedBy,
                            v.UpdatedBy,
                            v.VendorId,
                            v.IsActive
                        }).OrderByDescending(c=>c.AuditVendorShippingAddressId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
