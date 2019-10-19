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
    public class CompanyRepository : Repository<DAL.Models.Company>, ICompany
    {
        public CompanyRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Company> GetAllCompanyData()
        {
            return _appContext.Company.Include("MasterCompany").OrderByDescending(c => c.CompanyId).ToList();
        }


        public long CreateCompanyBillingAddress(CompanyBillingAddress billingAddress)
        {
            try
            {
                billingAddress.CreatedDate = billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.IsActive = true;
                billingAddress.IsDeleted = false;
                _appContext.CompanyBillingAddress.Add(billingAddress);
                _appContext.SaveChanges();
                return billingAddress.CompanyBillingAddressId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateCompanyBillingAddress(CompanyBillingAddress billingAddress)
        {
            try
            {
                billingAddress.UpdatedDate = DateTime.Now;
                _appContext.CompanyBillingAddress.Update(billingAddress);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCompanyBillingAddress(long billingAddressId, string updatedBy)
        {
            try
            {
                CompanyBillingAddress billingAddress = new CompanyBillingAddress();
                billingAddress.CompanyBillingAddressId = billingAddressId;
                billingAddress.IsDeleted = true;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.CompanyBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void CompanyBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            try
            {
                CompanyBillingAddress billingAddress = new CompanyBillingAddress();
                billingAddress.CompanyBillingAddressId = billingAddressId;
                billingAddress.IsActive = status;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.CompanyBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetCompanyBillingAddress()
        {
            try
            {
                var list = (from vba in _appContext.CompanyBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.IsDeleted == false
                            select new
                            {
                                vba.SiteName,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                vba.CreatedDate
                            }).OrderByDescending(p => p.CreatedDate).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object CompanyBillingAddressById(long billingAddressId)
        {
            try
            {
                var data = (from vba in _appContext.CompanyBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.CompanyBillingAddressId == billingAddressId
                            select new
                            {
                                vba,
                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PostalCode,
                                ad.StateOrProvince
                            }
                          ).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public long CreateCompanyShippingAddress(CompanyShippingAddress ShippingAddress)
        {
            try
            {
                ShippingAddress.CreatedDate = ShippingAddress.UpdatedDate = DateTime.Now;
                ShippingAddress.IsActive = true;
                ShippingAddress.IsDeleted = false;
                _appContext.CompanyShippingAddress.Add(ShippingAddress);
                _appContext.SaveChanges();
                return ShippingAddress.CompanyShippingAddressId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateCompanyShippingAddress(CompanyShippingAddress ShippingAddress)
        {
            try
            {
                ShippingAddress.UpdatedDate = DateTime.Now;
                _appContext.CompanyShippingAddress.Update(ShippingAddress);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCompanyShippingAddress(long ShippingAddressId, string updatedBy)
        {
            try
            {
                CompanyShippingAddress ShippingAddress = new CompanyShippingAddress();
                ShippingAddress.CompanyShippingAddressId = ShippingAddressId;
                ShippingAddress.IsDeleted = true;
                ShippingAddress.UpdatedDate = DateTime.Now;
                ShippingAddress.UpdatedBy = updatedBy;

                _appContext.CompanyShippingAddress.Attach(ShippingAddress);

                _appContext.Entry(ShippingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void CompanyShippingAddressStatus(long ShippingAddressId, bool status, string updatedBy)
        {
            try
            {
                CompanyShippingAddress ShippingAddress = new CompanyShippingAddress();
                ShippingAddress.CompanyShippingAddressId = ShippingAddressId;
                ShippingAddress.IsActive = status;
                ShippingAddress.UpdatedDate = DateTime.Now;
                ShippingAddress.UpdatedBy = updatedBy;

                _appContext.CompanyShippingAddress.Attach(ShippingAddress);

                _appContext.Entry(ShippingAddress).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetCompanyShippingAddress()
        {
            try
            {
                var list = (from vba in _appContext.CompanyShippingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.IsDeleted == false
                            select new
                            {
                                vba.SiteName,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                vba.CreatedDate
                            }).OrderByDescending(p => p.CreatedDate).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object CompanyShippingAddressById(long ShippingAddressId)
        {
            try
            {
                var data = (from vba in _appContext.CompanyShippingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.CompanyShippingAddressId == ShippingAddressId
                            select new
                            {
                                vba,
                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PostalCode,
                                ad.StateOrProvince
                            }
                          ).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
