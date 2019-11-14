
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
    public class CustomerShippingAddressRepository : Repository<CustomerShippingAddress>, ICustomerShippingAddress
    {
        public  CustomerShippingAddressRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<CustomerShippingAddress> GetCustomerShippingAddress()
        {
            return _appContext.CustomerShippingAddress.Include("MasterCompany").OrderByDescending(c => c.CustomerShippingAddressId).ToList();
        }
        public IEnumerable<Object> GetAllShippingAddressDetails(long id)
        {
            var data = (from c in _appContext.CustomerShippingAddress
                        join ad in _appContext.Address on c.AddressId equals ad.AddressId
                        join co in _appContext.Countries on ad.Country equals Convert.ToString(co.countries_id) into adc
                        from co in adc.DefaultIfEmpty()
                        where ((c.IsDelete == null || c.IsDelete == false) && (c.CustomerId == id))

                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            //ad.Country,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            c.SiteName,
                            c.Amount,
                            c.StartDate,
                            c.ExportLicenseNumber,
                            c.ExpirationDate,
                            c.Description,
                            c.CustomerShippingAddressId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.CustomerId,
                            c.IsActive,
                            c.IsPrimary,
                            Country = co.countries_name


                        }).ToList();
            return data;
        }
        public IEnumerable<Object> GetAllShipViaDetails(long Selectedrow)
        {
            var data = (from cs in _appContext.CustomerShipping
                        join csa in _appContext.CustomerShippingAddress on cs.CustomerShippingAddressId equals csa.CustomerShippingAddressId
                        where ((cs.CustomerShippingAddressId == Selectedrow) && (cs.IsActive == true))

                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            csa.SiteName,
                            cs.CustomerShippingId,
                            cs.Memo,
                            cs.ShipVia,
                            cs.ShippingAccountinfo,
                            cs.ShippingURL,
                            cs.ShippingId,
                            cs.IsActive,
                            cs.CustomerId,
                            cs.CustomerShippingAddressId,
                            cs.CreatedDate,
                            cs.UpdatedDate,
                            //csa.Amount,
                            //csa.StartDate,
                            //csa.ExpirationDate,
                            //csa.Description,
                            //csa.ExportLicenseNumber


                        }).ToList();
            return data;
        }

        public IEnumerable<Object> GetAllCusShippingHistory(long id)
        {
            var data = (from v in _appContext.CustomerShippingAddress
                join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join co in _appContext.Countries on ad.Country equals Convert.ToString(co.countries_id) into adc
                        from co in adc.DefaultIfEmpty()
                        where v.CustomerId == id

                select new
                {
                    Address1 = ad.Line1,
                    Address2 = ad.Line2,
                    Address3 = ad.Line3,
                    ad.AddressId,
                    //ad.Country,
                    ad.PostalCode,
                    ad.City,
                    ad.StateOrProvince,
                    v.SiteName,
                    v.CustomerShippingAddressId,
                    v.CreatedDate,
                    v.UpdatedDate,
                    v.CustomerId,
                    v.IsActive,
                    v.IsDelete,
                    v.IsPrimary,
                    Country = co.countries_name
                }).ToList();
            return data;
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
