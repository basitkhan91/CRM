using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
    class CustomerBillingInformationRepository : Repository<CustomerBillingAddress>, ICustomerBillingInformationRepository
    {
        public CustomerBillingInformationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<CustomerBillingAddress> GetAllCustomerBillingAddress()
        {
            return _appContext.CustomerBillingAddress.Include("MasterCompany").OrderByDescending(c => c.CustomerBillingAddressId).ToList();
        }

        public IEnumerable<Object> GetAllCusBillingDetails(long id)
        {
            var data = (from v in _appContext.CustomerBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join c in _appContext.Countries on ad.Country equals Convert.ToString(c.countries_id) into adc
                        from c in adc.DefaultIfEmpty()
                        where ((v.IsDelete == null || v.IsDelete == false) && (v.CustomerId == id))

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
                            v.SiteName,
                            v.CustomerBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.CustomerId,
                            v.IsActive,
                            v.IsDelete,
                            v.IsPrimary,
                            Country = c.countries_id,
                            CountryName=c.countries_name


                        }).ToList();
            return data;
        }


        public IEnumerable<Object> GetAllCusBillingHistory(long id)
        {
            var data = (from v in _appContext.CustomerBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join c in _appContext.Countries on ad.Country equals Convert.ToString(c.countries_id) into adc
                        from c in adc.DefaultIfEmpty()
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
                            v.CustomerBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.CustomerId,
                            v.IsActive,
                            v.IsDelete,
                            v.IsPrimary,
                            Country = c.countries_name
                        }).ToList();
            return data;
        }

        public IEnumerable<object> GetAllCustomerBillingAddressAudit(long customerId, long addressId)
        {
            var data = (from v in _appContext.CustomerBillingAddressAudit
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join c in _appContext.Countries on ad.Country equals Convert.ToString(c.countries_id) into adc
                        from c in adc.DefaultIfEmpty()
                        where v.CustomerId == customerId && v.CustomerBillingAddressId == addressId
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            v.AuditCustomerBillingAddressId,
                            v.SiteName,
                            v.CustomerBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.CustomerId,
                            v.IsActive,
                            v.IsDelete,
                            v.IsPrimary,
                            Country = c.countries_name
                        }).OrderBy(c=>c.AuditCustomerBillingAddressId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
