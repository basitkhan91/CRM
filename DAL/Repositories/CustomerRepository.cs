// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        { }



        //public IEnumerable<Customer> GetTopActiveCustomers(int count)
        //{
        //    throw new NotImplementedException();
        //}

        public IEnumerable<Customer> getAllCustomer()
        {
            return _appContext.Customer.Include("CustomerContact").Where(x => x.IsDelete == null || x.IsDelete == false).ToList();

        }

        public IEnumerable<object> GetAllCustomersData()
        {
            var data = (from t in _appContext.Customer
                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                        join vt in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals vt.CustomerAffiliationId
                        join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                        from currency in curr.DefaultIfEmpty()
                        join creditTerms in _appContext.CreditTerms on t.CreditTermsId equals creditTerms.CreditTermsId into cre
                        from creditTerms in cre.DefaultIfEmpty()
                        join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                        where t.IsDelete == true || t.IsDelete == null
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            t.CreditTermsId,
                            t.CurrencyId,
                            ad,
                            t.PrimarySalesPersonFirstName,
                            t.CustomerId,
                            t,
                            // cc,
                            creditTerms,
                            currency,
                            currency.Symbol,
                            //creditTerms.Name,
                            t.Email,
                            t.IsActive,
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            t.CustomerCode,
                            t.DoingBuinessAsName,
                            t.Parent,
                            t.RestrictPMAMemo,
                            t.PBHCustomerMemo,
                            t.ContractReference,
                            t.CustomerURL,
                            t.Name,
                            ad.City,
                            ad.StateOrProvince,
                            vt.description,
                            t.CreatedDate,
                            t.CreatedBy,
                            t.UpdatedBy,
                            t.UpdatedDate,
                            ad.AddressId,
                            ad.Country,
                            ad.PostalCode,
                            vt.CustomerAffiliationId,
                            cc.CustomerClassificationId,
                            //cc.Description
                        }).OrderByDescending(a => a.UpdatedDate).ToList();
            return data;
        }
        public IEnumerable<object> GetCustomerBynameList(string name)
        {

            {
                var data = (from t in _appContext.Customer
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.CustomerType on t.CustomerTypeId equals vt.CustomerTypeId
                            join v in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals v.CustomerAffiliationId
                            join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                            where t.IsActive == true && t.Name == name

                            select new
                            {
                                ad,
                                t.PrimarySalesPersonFirstName,
                                t.CustomerId,
                                t,
                                t.Email,
                                t.IsActive,
                                t.CustomerPhone,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.CustomerCode,
                                t.CustomerClassificationId,
                                //cc.CustomerClassificationId,
                                t.Name,
                                vt.CustomerTypeId,
                                ad.City,
                                ad.StateOrProvince,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,
                                t.ContractReference

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> GetCustomerListDetails()
        {

            {
                var data = (from t in _appContext.Customer
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            // join ct in _appContext.CustomerType on t.CustomerTypeId equals ct.CustomerTypeId
                            where t.IsActive == true
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t.CustomerId,
                                t,
                                t.IsActive,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.CustomerCode,
                                t.Name,
                                ad.City,
                                ad.StateOrProvince,
                                //ct.Description,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,
                                // t.CurrencyId,

                            }).ToList();
                return data;

            }

        }


        public IEnumerable<object> GetCustomerWithid(long customerId)
        {

            {
                var data = (from t in _appContext.Customer
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join ct in _appContext.CustomerType on t.CustomerTypeId equals ct.CustomerTypeId

                            where t.CustomerId == customerId
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t.CustomerId,
                                t,
                                // t.CustomerEmail,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.CustomerCode,
                                t.Name,
                                t.Email,
                                t.CustomerPhone,
                                ad.City,
                                ad.StateOrProvince,
                                //ct.Description,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode
                            }).ToList();
                return data;

            }

        }

        public IEnumerable<object> GetCustomerWithId(long customerId)
        {
            throw new NotImplementedException();
        }

        public object getAlldata()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<object> getIntegrationData(long id)
        {

            {
                var data = (from iM in _appContext.CustomerIntegrationPortal
                            where iM.CustomerId == id

                            select new
                            {
                                iM.CustomerIntegrationPortalId,
                                iM.CustomerId,
                                iM.IntegrationPortalId,
                                iM.IsActive


                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> Getdescriptionbypart(string name)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> getAllCustomersInfo()
        {
            return _appContext.Customer.Where(x => x.IsActive == true && x.IsDelete == false)
                .Select(x =>
                    new Customer
                    {
                        CustomerId = x.CustomerId,
                        CustomerCode = x.CustomerCode,
                        Name = x.Name,
                        CustomerPhone = x.CustomerPhone,
                        Email = x.Email,
                        CustomerAddress = x.CustomerAddress

                    }).ToList();
        }

        override
       public IQueryable<DAL.Models.Customer> GetPaginationData()
        {
            return _appContext.Customer.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.CustomerId).ToList().AsQueryable();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
