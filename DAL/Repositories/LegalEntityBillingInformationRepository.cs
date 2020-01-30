using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class LegalEntityBillingInformationRepository : Repository<LegalEntityBillingAddress>, ILegalEntityBillnformationRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public LegalEntityBillingInformationRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<LegalEntityBillingAddress> GetAllLegalEntityBillingAddress()
        {
            return _appContext.LegalEntityBillingAddress.Include("MasterCompany").OrderByDescending(c => c.LegalEntityBillingAddressId).ToList();
        }

        public IEnumerable<object> GetAllLegalEntityBillingAddressAudit(long LegalEntityId, long addressId)
        {
            //var list = (from vba in _appContext.CustomerBillingAddressAudit
            //            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
            //            where vba.CustomerId == customerId && vba.CustomerBillingAddressId == addressId
            //            select new
            //            {
            //                vba.SiteName,
            //                vba.AuditCustomerBillingAddressId,
            //                vba.CustomerBillingAddressId,
            //                ad.Line1,
            //                ad.Line2,
            //                ad.Line3,
            //                ad.City,
            //                ad.StateOrProvince,
            //                ad.PostalCode,
            //                ad.Country,
            //                vba.CreatedDate,
            //                vba.UpdatedBy,
            //                vba.UpdatedDate,
            //                vba.CreatedBy,
            //                vba.IsActive
            //            }).OrderByDescending(p => p.AuditCustomerBillingAddressId).ToList();
            return null;
        }

        public IEnumerable<object> GetAllLegalEntityBillingDetails(long selectedrow)
        {
            var data = (from v in _appContext.LegalEntityBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join c in _appContext.Countries on ad.Country equals Convert.ToString(c.countries_id) into adc
                        from c in adc.DefaultIfEmpty()
                        where (v.IsDeleted == false) && (v.LegalEntityId == selectedrow)

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
                            v.LegalEntityBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.LegalEntityId,
                            v.IsActive,
                            v.IsDeleted,
                            v.IsPrimary,
                            Country = c.countries_id,
                            CountryName = c.countries_name


                        }).ToList();
            return data;
        }

        public IEnumerable<object> GetAllLegalEntityBillingHistory(long selectedrow)
        {
            var data = (from v in _appContext.LegalEntityBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join c in _appContext.Countries on ad.Country equals Convert.ToString(c.countries_id) into adc
                        from c in adc.DefaultIfEmpty()
                        where v.LegalEntityId == selectedrow

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
                            v.LegalEntityBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.LegalEntityId,
                            v.IsActive,
                            v.IsDeleted,
                            v.IsPrimary,
                            Country = c.countries_name
                        }).ToList();
            return data;
        }
    }
}
