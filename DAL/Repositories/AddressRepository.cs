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
    public class AddressRepository : Repository<Address>, IAddress
    {
        public AddressRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Address> GetAddresses()
        {
            return _appContext.Address.Include("MasterCompany").OrderByDescending(c => c.AddressId).ToList();
        }

        public IEnumerable<object> GetCheckAddress(long id)
        {
            var data = (from c in _appContext.CheckPayment
                        join ad in _appContext.Address on c.AddressId equals ad.AddressId
                        join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                        from cont in country.DefaultIfEmpty()
                        join vc in _appContext.VendorCheckPayment on c.CheckPaymentId equals vc.CheckPaymentId
                        where vc.VendorId==id
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.City,
                            ad.StateOrProvince,
                            ad.AddressId,
                            ad.Country,
                            CountryName = cont.countries_name,
                            ad.PostalCode,
                            vc.IsActive,
                            c.SiteName,
                            vc.CheckPaymentId,
                            vc,
                            c,
                            c.IsPrimayPayment
                        }).ToList();
            return data;
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
