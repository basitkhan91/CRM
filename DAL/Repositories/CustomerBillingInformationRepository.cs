using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories.Interfaces
{
    class CustomerBillingInformationRepository : Repository<CustomerBillingAddress>, ICustomerBillingInformationRepository
    {
        public CustomerBillingInformationRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<CustomerBillingAddress> GetAllCustomerBillingAddress()
        {
            return _appContext.CustomerBillingAddress.Include("MasterCompany").OrderByDescending(c => c.CustomerBillingAddressId).ToList();
        }

        public IEnumerable<Object> GetAllCusBillingDetails(long id)
        {
            var data = (from v in _appContext.CustomerBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        where ((v.IsDelete== null || v.IsDelete == false) && (v.CustomerId == id))

                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.Country,
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
                            v.IsPrimary


                        }).ToList();
            return data;
        }


        public IEnumerable<Object> GetAllCusBillingHistory(long id)
        {
            var data = (from v in _appContext.CustomerBillingAddress
                join ad in _appContext.Address on v.AddressId equals ad.AddressId
                where ((v.IsDelete == null || v.IsDelete == false) && (v.CustomerId == id))

                select new
                {
                    Address1 = ad.Line1,
                    Address2 = ad.Line2,
                    Address3 = ad.Line3,
                    ad.AddressId,
                    ad.Country,
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
                    v.IsPrimary
                }).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
