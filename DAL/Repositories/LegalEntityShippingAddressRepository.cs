using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DAL.Repositories
{
    public class LegalEntityShippingAddressRepository : Repository<LegalEntityShippingAddress>, ILegalEntityShippingAddress
    {
        public LegalEntityShippingAddressRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<LegalEntityShippingAddress> GetLegalEntityShippingAddress()
        {
            return _appContext.LegalEntityShippingAddress.Include("MasterCompany").OrderByDescending(c => c.LegalEntityShippingAddressId).ToList();
        }
        public IEnumerable<Object> GetAllShippingAddressDetails(long id)
        {
            var data = (from c in _appContext.LegalEntityShippingAddress
                        join ad in _appContext.Address on c.AddressId equals ad.AddressId
                        join co in _appContext.Countries on ad.Country equals Convert.ToString(co.countries_id) into adc
                        from co in adc.DefaultIfEmpty()
                        where  c.IsDeleted == false && (c.LegalEntityId == id)
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            c.SiteName,
                            c.Amount,
                            c.StartDate,
                            c.ExportLicenseNumber,
                            c.ExpirationDate,
                            c.Description,
                            c.LegalEntityShippingAddressId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.LegalEntityId,
                            c.IsActive,
                            c.IsPrimary,
                            CountryName = co.countries_name,
                            Country = co.countries_id,
                        }).ToList();
            return data;
        }
        public IEnumerable<Object> GetAllShipViaDetails(long Selectedrow)
        {
            var data = (from cs in _appContext.LegalEntityShipping
                        join csa in _appContext.LegalEntityShippingAddress on cs.LegalEntityShippingAddressId equals csa.LegalEntityShippingAddressId
                        where ((cs.LegalEntityShippingAddressId == Selectedrow) && (cs.IsDeleted == false || cs.IsDeleted == null))

                        select new
                        {
                            csa.SiteName,
                            cs.LegalEntityShippingId,
                            cs.Memo,
                            cs.ShipVia,
                            ShippingAccountInfo = cs.ShippingAccountinfo,
                            cs.ShippingURL,
                            cs.ShippingId,
                            cs.IsActive,
                            cs.LegalEntityId,
                            cs.LegalEntityShippingAddressId,
                            cs.CreatedDate,
                            cs.UpdatedDate,
                        }).ToList();
            return data;
        }

        public IEnumerable<Object> GetAllCusShippingHistory(long id)
        {
            var data = (from v in _appContext.LegalEntityShippingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join co in _appContext.Countries on ad.Country equals Convert.ToString(co.countries_id) into adc
                        from co in adc.DefaultIfEmpty()
                        where v.LegalEntityId == id

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
                            v.LegalEntityShippingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.LegalEntityId,
                            v.IsActive,
                            v.IsDeleted,
                            Country = co.countries_name
                        }).ToList();
            return data;
        }

        public IEnumerable<Object> GetLegalEntityShippingAddressAudit(long LegalEntityId, long LegalEntityShippingAddressId)
        {
            var data = (from c in _appContext.LegalEntityShippingAddressAudit
                        join ad in _appContext.Address on c.AddressId equals ad.AddressId
                        join co in _appContext.Countries on ad.Country equals Convert.ToString(co.countries_id) into adc
                        from co in adc.DefaultIfEmpty()
                        where c.LegalEntityId == LegalEntityId && c.LegalEntityShippingAddressId == LegalEntityShippingAddressId
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            c.AuditLegalEntityShippingAddressId,
                            c.SiteName,
                            c.Amount,
                            c.StartDate,
                            c.ExportLicenseNumber,
                            c.ExpirationDate,
                            c.Description,
                            c.LegalEntityShippingAddressId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.CreatedBy,
                            c.UpdatedBy,
                            c.LegalEntityId,
                            c.IsActive,
                            c.IsPrimary,
                            Country = co.countries_name
                        }).OrderByDescending(c => c.AuditLegalEntityShippingAddressId).ToList();
            return data;
        }

        public IEnumerable<Object> GetLegalEntityShippingAudit(long LegalEntityId, long LegalEntityShippingAddressId, long LegalEntityShippingId)
        {
            var data = (from cs in _appContext.LegalEntityShippingAudit
                        join csa in _appContext.LegalEntityShippingAddress on cs.LegalEntityShippingAddressId equals csa.LegalEntityShippingAddressId
                        where ((cs.LegalEntityShippingAddressId == LegalEntityShippingAddressId) && (cs.IsDeleted == false || cs.IsDeleted == null) && cs.LegalEntityShippingId == LegalEntityShippingId && cs.LegalEntityId == LegalEntityId)
                        select new
                        {
                            csa.SiteName,
                            cs.LegalEntityShippingId,
                            cs.Memo,
                            cs.ShipVia,
                            ShippingAccountInfo = cs.ShippingAccountinfo,
                            cs.ShippingURL,
                            cs.ShippingId,
                            cs.IsActive,
                            cs.LegalEntityId,
                            cs.LegalEntityShippingAddressId,
                            cs.CreatedDate,
                            cs.UpdatedDate,
                            cs.CreatedBy,
                            cs.UpdatedBy,
                            cs.AuditLegalEntityShippingId

                        }).OrderByDescending(c => c.AuditLegalEntityShippingId).ToList();
            return data;
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}