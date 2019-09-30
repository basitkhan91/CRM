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
using DAL.Common;

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
                        where t.IsDelete == false || t.IsDelete == null
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
                                t.CustomerPhoneExt,
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


        public IEnumerable<object> GetCustomerRowByid(long customerId)
        {

            {
                var data = (from t in _appContext.Customer
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals vt.CustomerAffiliationId
                            join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                            from currency in curr.DefaultIfEmpty()
                            join creditTerms in _appContext.CreditTerms on t.CreditTermsId equals creditTerms.CreditTermsId into cre
                            from creditTerms in cre.DefaultIfEmpty()
                            join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                            join mup in _appContext.MarkUpPercentage on t.MarkUpPercentageId equals mup.MarkUpPercentageId into tmup
                            from mup in tmup.DefaultIfEmpty()
                            where t.CustomerId == customerId //&&  (t.IsDelete == true || t.IsDelete == null)
                            // select new { t, ad, vt }).ToList();
                            select new
                            {

								addressId = t.AddressId,
								isAddressForBilling = t.IsAddressForBilling,
								isAddressForShipping = t.IsAddressForShipping,
								customerAffiliationId = vt.CustomerAffiliationId,
								customerTypeId = t.CustomerTypeId,
								name = t.Name,
								customerPhone = t.CustomerPhone,
								email = t.Email,
								address1 = ad.Line1,
								address2 = ad.Line2,
								address3 = ad.Line3,
								city = ad.City,
								stateOrProvince = ad.StateOrProvince,
								postalCode = ad.PostalCode,
								country = ad.Country,
								customerCode = t.CustomerCode,
								doingBuinessAsName = t.DoingBuinessAsName,
								parent = t.Parent,
								customerParentName = t.CustomerParentName,
								customerURL = t.CustomerURL,
								generalCurrencyId = t.GeneralCurrencyId,
								customerClassificationId = t.CustomerClassificationId,
								contractReference = t.ContractReference,
								isPBHCustomer = t.IsPBHCustomer,
								pbhCustomerMemo = t.PBHCustomerMemo,
								restrictPMA = t.RestrictPMA,
								restrictPMAMemo = t.RestrictPMAMemo,
								restrictBER = t.RestrictBER,
								restrictBERMemo = t.RestrictBERMemo,
								scanDocuments = t.ScanDocuments,
								isCustomerAlsoVendor = t.IsCustomerAlsoVendor,
								edi = t.EDI,
								ediDescription = t.EDIDescription,
								isAeroExchange = t.IsAeroExchange,
								aeroExchangeDescription = t.AeroExchangeDescription,
								createdBy = t.CreatedBy,
								updatedBy = t.UpdatedBy,
								UpdatedDate = t.UpdatedDate,
								CreatedDate = t.CreatedDate,
								masterCompanyId = t.MasterCompanyId,
								isActive = t.IsActive,
								markUpPercentageId = t.MarkUpPercentageId,
								creditLimit = t.CreditLimit,
								creditTermsId = t.CreditTermsId,
								discountId = t.DiscountId,
								allowNettingOfAPAR = t.AllowNettingOfAPAR,
								isTaxExempt = t.IsTaxExempt,
								taxRateStateOrProvince = t.TaxRateStateOrProvince,
								taxRateOther = t.TaxRateOther,
								taxTypeId = t.TaxTypeId,
								allowPartialBilling = t.AllowPartialBilling,
								allowProformaBilling = t.AllowProformaBilling,
								customerId = t.CustomerId,
								primarySalesPersonId = t.PrimarySalesPersonId,
							    csrName = t.CSRName,
								secondarySalesPersonId = t.SecondarySalesPersonId,
								annualQuota = t.AnnualQuota,
								annualRevenuePotential = t.AnnualRevenuePotential,
								AgentName = t.AgentName
								




			

								//t.CreditTermsId,
								//t.CurrencyId,
								//ad,
								//t.PrimarySalesPersonFirstName,
								//t.CustomerId,
								//t,
								//// cc,
								//creditTerms,
								//currency,
								//currency.Symbol,
								////creditTerms.Name,
								//t.Email,
								//t.IsActive,
								//Address1 = ad.Line1,
								//Address2 = ad.Line2,
								//Address3 = ad.Line3,
								//t.CustomerCode,
								//t.DoingBuinessAsName,
								//t.Parent,
								//t.RestrictPMAMemo,
								//t.PBHCustomerMemo,
								//t.ContractReference,
								//t.CustomerURL,
								//t.Name,
								//ad.City,
								//ad.StateOrProvince,
								//vt.description,
								//t.CreatedDate,
								//t.CreatedBy,
								//t.UpdatedBy,
								//t.UpdatedDate,
								//ad.AddressId,
								//ad.Country,
								//ad.PostalCode,
								//vt.CustomerAffiliationId,
								//cc.CustomerClassificationId,
								//mup.MarkUpValue,
								//CreditTermName = creditTerms.Name,
								////cc.Description
							}).OrderByDescending(a => a.UpdatedDate).ToList();
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

        public IEnumerable<object> GetAircraftMapped(long customerId)
        {
            {

                var data = (from c in _appContext.CustomerAircraftMapping
                            where c.CustomerId == customerId && c.IsDeleted == false
                            select new
                            {
                                c.CustomerAircraftMappingId,
                                c.CustomerId,
                                c.AircraftTypeId,
                                c.AircraftType,
                                c.AircraftModelId,
                                c.DashNumberId,
                                c.CreatedBy,
                                c.DashNumber,
                                c.AircraftModel,
                                c.Memo,
                                c.Inventory,
                                c.MasterCompanyId
                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> GetATAMapped(long customerId)
        {
            {

                var data = (from ca in _appContext.CustomerATAMapping
                            where ca.CustomerId == customerId && ca.IsDeleted == false
                            select new
                            {
                                ca.CustomerATAMappingId,
                                ca.CustomerId,
                                ca.ATAChapterId,
                                ca.ATAChapterCode,
                                ca.ATAChapterName,
       
                                ca.ATASubChapterId,
                                ca.ATASubChapterDescription


                            }).ToList();
                return data;
            }
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



        public void CreateCustomerInternationalShippingDetails(CustomerInternationalShipping model)
        {
            try
            {
                model.CreatedDate = model.UpdatedDate = DateTime.Now;
                model.IsActive = true;
                model.IsDeleted = false;
                _appContext.CustomerInternationalShipping.Add(model);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateCustomerInternationalShippingDetails(CustomerInternationalShipping model)
        {
            try
            {
                model.UpdatedDate = DateTime.Now;
                _appContext.CustomerInternationalShipping.Update(model);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCustomerInternationalShippingDetails(long id, string updatedBy)
        {
            try
            {
                CustomerInternationalShipping model = new CustomerInternationalShipping();
                model.InternationalShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.CustomerInternationalShipping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void CustomerInternationalShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            try
            {
                CustomerInternationalShipping model = new CustomerInternationalShipping();
                model.InternationalShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;
                model.UpdatedBy = updatedBy;

                _appContext.CustomerInternationalShipping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public GetData<CustomerInternationalShipping> GetCustomerInternationalShippingDetails(CustomerInternationalShipping model)
        {
            GetData<CustomerInternationalShipping> getData = new GetData<CustomerInternationalShipping>();
            CustomerInternationalShipping intShipping;
            var totalRecords = 0;
            try
            {
                var pageNumber = 0;//(model.first / model.rows) + 1;
                var take = 0;// model.rows;
                var skip = 0;// take * (pageNumber - 1);

                totalRecords = _appContext.CustomerInternationalShipping
                 .Join(_appContext.Countries,
                           cis => cis.ShipToCountryId,
                           c => c.countries_id,
                           (cis, c) => new { cis, c })
                 .Where(p => p.cis.IsDeleted == false)
                 .Count();

                var result = _appContext.CustomerInternationalShipping
                 .Join(_appContext.Countries,
                           cis => cis.ShipToCountryId,
                           c => c.countries_id,
                           (cis, c) => new { cis, c })
                 .Select(p => new
                 {
                     InternationalShippingId = p.cis.InternationalShippingId,
                     CustomerId = p.cis.CustomerId,
                     ExportLicense = p.cis.ExportLicense,
                     StartDate = p.cis.StartDate,
                     Amount = p.cis.Amount,
                     IsPrimary = p.cis.IsPrimary,
                     Description = p.cis.Description,
                     ExpirationDate = p.cis.ExpirationDate,
                     ShipToCountryId = p.cis.ShipToCountryId,
                     ShipToCountry = p.c.countries_name,
                     IsActive = p.cis.IsActive,
                     IsDeleted = p.cis.IsDeleted,
                     UpdatedDate = p.cis.UpdatedDate
                 })
                 .Where(p => p.IsDeleted == false && p.CustomerId==model.CustomerId)
                 .OrderByDescending(p => p.UpdatedDate)
                 .Skip(skip)
                 .Take(take)
                 .ToList();

                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        intShipping = new CustomerInternationalShipping();
                        intShipping.Amount = item.Amount;
                        intShipping.Description = item.Description;
                        intShipping.ExpirationDate = item.ExpirationDate;
                        intShipping.ExportLicense = item.ExportLicense;
                        intShipping.InternationalShippingId = item.InternationalShippingId;
                        intShipping.IsActive = item.IsActive;
                        intShipping.IsPrimary = item.IsPrimary;
                        intShipping.ShipToCountry = item.ShipToCountry;
                        intShipping.StartDate = item.StartDate;
                        getData.PaginationList.Add(intShipping);
                    }
                }
                else
                {
                    getData.PaginationList = new List<CustomerInternationalShipping>();
                }
                getData.TotalRecordsCount = totalRecords;

                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public GetData<CustomerInternationalShipping> GetCustomerInternationalShippingDetails(long customerId,int pageNumber,int pageSize)
        {
            GetData<CustomerInternationalShipping> getData = new GetData<CustomerInternationalShipping>();
            CustomerInternationalShipping intShipping;
            var totalRecords = 0;
            try
            {
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                totalRecords = _appContext.CustomerInternationalShipping
                 .Join(_appContext.Countries,
                           cis => cis.ShipToCountryId,
                           c => c.countries_id,
                           (cis, c) => new { cis, c })
                 .Where(p => p.cis.IsDeleted == false && p.cis.CustomerId == customerId)
                 .Count();

                var result = _appContext.CustomerInternationalShipping
                 .Join(_appContext.Countries,
                           cis => cis.ShipToCountryId,
                           c => c.countries_id,
                           (cis, c) => new { cis, c })
                 .Where(p => p.cis.IsDeleted == false && p.cis.CustomerId == customerId)
                 .Select(p => new
                 {
                     InternationalShippingId = p.cis.InternationalShippingId,
                     CustomerId = p.cis.CustomerId,
                     ExportLicense = p.cis.ExportLicense,
                     StartDate = p.cis.StartDate,
                     Amount = p.cis.Amount,
                     IsPrimary = p.cis.IsPrimary,
                     Description = p.cis.Description,
                     ExpirationDate = p.cis.ExpirationDate,
                     ShipToCountryId = p.cis.ShipToCountryId,
                     ShipToCountry = p.c.countries_name,
                     IsActive = p.cis.IsActive,
                     IsDeleted = p.cis.IsDeleted,
                     UpdatedDate = p.cis.UpdatedDate
                 })
                 
                 .OrderByDescending(p => p.UpdatedDate)
                 .Skip(skip)
                 .Take(take)
                 .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<CustomerInternationalShipping>();
                    foreach (var item in result)
                    {
                        intShipping = new CustomerInternationalShipping();
                        intShipping.Amount = item.Amount;
                        intShipping.Description = item.Description;
                        intShipping.ExpirationDate = item.ExpirationDate;
                        intShipping.ExportLicense = item.ExportLicense;
                        intShipping.InternationalShippingId = item.InternationalShippingId;
                        intShipping.IsActive = item.IsActive;
                        intShipping.IsPrimary = item.IsPrimary;
                        intShipping.ShipToCountry = item.ShipToCountry;
                        intShipping.StartDate = item.StartDate;
                        getData.PaginationList.Add(intShipping);
                    }
                }
                else
                {
                    getData.PaginationList = new List<CustomerInternationalShipping>();
                }
                getData.TotalRecordsCount = totalRecords;

                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public CustomerInternationalShipping GetCustomerInternationalShippingDetailsById(long id)
        {
            CustomerInternationalShipping intShipping = new CustomerInternationalShipping();
            try
            {
                var result = _appContext.CustomerInternationalShipping
                 .Join(_appContext.Countries,
                           cis => cis.ShipToCountryId,
                           c => c.countries_id,
                           (cis, c) => new { cis, c })
                 .Join(_appContext.Customer,
                           cis1 => cis1.cis.CustomerId,
                           cust => cust.CustomerId,
                           (cis1, cust) => new { cis1, cust })
                 .Where(p=>p.cis1.cis.InternationalShippingId==id)
                 .Select(p => new
                 {
                     InternationalShippingId = p.cis1.cis.InternationalShippingId,
                     CustomerId = p.cis1.cis.CustomerId,
                     CustomerName = p.cust.Name,
                     ExportLicense = p.cis1.cis.ExportLicense,
                     StartDate = p.cis1.cis.StartDate,
                     Amount = p.cis1.cis.Amount,
                     IsPrimary = p.cis1.cis.IsPrimary,
                     Description = p.cis1.cis.Description,
                     ExpirationDate = p.cis1.cis.ExpirationDate,
                     ShipToCountryId = p.cis1.cis.ShipToCountryId,
                     ShipToCountry = p.cis1.c.countries_name,
                     MasterCompanyId = p.cis1.cis.MasterCompanyId,
                     CreatedBy = p.cis1.cis.CreatedBy,
                     UpdatedBy = p.cis1.cis.UpdatedBy,
                     CreatedDate = p.cis1.cis.CreatedDate,
                     UpdatedDate = p.cis1.cis.UpdatedDate,
                     IsActive = p.cis1.cis.IsActive,
                     IsDeleted = p.cis1.cis.IsDeleted

                 })
                 .FirstOrDefault();

                if (result != null)
                {
                    intShipping.Amount = result.Amount;
                    intShipping.Description = result.Description;
                    intShipping.ExpirationDate = result.ExpirationDate;
                    intShipping.ExportLicense = result.ExportLicense;
                    intShipping.InternationalShippingId = result.InternationalShippingId;
                    intShipping.IsActive = result.IsActive;
                    intShipping.IsPrimary = result.IsPrimary;
                    intShipping.ShipToCountry = result.ShipToCountry;
                    intShipping.StartDate = result.StartDate;
                    intShipping.IsDeleted = result.IsDeleted;
                    intShipping.ShipToCountryId = result.ShipToCountryId;
                }

                
                return intShipping;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public void CreateShippingViaDetails(ShippingViaDetails model)
        {
            try
            {
                model.CreatedDate = model.UpdatedDate = DateTime.Now;
                model.IsActive = true;
                model.IsDeleted = false;
                _appContext.ShippingViaDetails.Add(model);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateShippingViaDetails(ShippingViaDetails model)
        {
            try
            {
                model.UpdatedDate = DateTime.Now;
                _appContext.ShippingViaDetails.Update(model);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteShippingViaDetails(long id, string updatedBy)
        {
            try
            {
                ShippingViaDetails model = new ShippingViaDetails();
                model.ShippingViaDetailsId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.ShippingViaDetails.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void ShippingViaDetailsStatus(long id, bool status, string updatedBy)
        {
            try
            {
                ShippingViaDetails model = new ShippingViaDetails();
                model.ShippingViaDetailsId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;

                _appContext.ShippingViaDetails.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public GetData<ShippingViaDetails> GetShippingViaDetails(ShippingViaDetails model)
        {
            GetData<ShippingViaDetails> getData = new GetData<ShippingViaDetails>();
            try
            {
                var pageNumber = (model.first / model.rows) + 1;
                var take = model.rows;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = _appContext.ShippingViaDetails.Where(p=>p.IsDeleted==false)
                 .OrderByDescending(p => p.UpdatedDate)
                 .Count();


                getData.PaginationList = _appContext.ShippingViaDetails
                 .Where(p => p.IsDeleted == false)
                 .OrderByDescending(p => p.UpdatedDate)
                 .Skip(skip)
                 .Take(take)
                 .ToList();

                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public GetData<ShippingViaDetails> GetShippingViaDetails(long internationalShippingId, int pageNumber, int pageSize)
        {
            GetData<ShippingViaDetails> getData = new GetData<ShippingViaDetails>();
            try
            {
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = _appContext.ShippingViaDetails.Where(p => p.IsDeleted == false && p.InternationalShippingId == internationalShippingId)
                 .OrderByDescending(p => p.UpdatedDate)
                 .Count();


                getData.PaginationList = _appContext.ShippingViaDetails
                 .Where(p => p.IsDeleted == false && p.InternationalShippingId== internationalShippingId)
                 .OrderByDescending(p => p.UpdatedDate)
                 .Skip(skip)
                 .Take(take)
                 .ToList();

                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ShippingViaDetails GetShippingViaDetailsById(long id)
        {
            ShippingViaDetails shippingViaDetails = new ShippingViaDetails();
            try
            {
                shippingViaDetails = _appContext.ShippingViaDetails
                 .Where(p => p.IsDeleted == false && p.ShippingViaDetailsId == id)
                 .OrderByDescending(p => p.UpdatedDate)
                 .FirstOrDefault();
                return shippingViaDetails;
            }
            catch (Exception)
            {

                throw;
            }
        }






		public IEnumerable<object> searchCustomerAircraftMappingDataByMultiTypeIdModelIDDashID(long CustomerId, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            long[] myAircraftTypeId = null;
            long[] myAircraftModelId = null;
            long[] myDashNumberId = null;
            if (AircraftTypeId != null && AircraftTypeId != "")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId != "")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myAircraftModelId.Contains(cam.AircraftModelId) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myAircraftModelId.Contains(cam.AircraftModelId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftModelId.Contains(cam.AircraftModelId) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftModelId.Contains(cam.AircraftModelId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
        }
        public IEnumerable<object> searchgetCustomerATAMappingDataByMultiTypeIdATAIDATASUBID(long CustomerId, string ATAChapterId, string ATASubChapterID)
        {
            long[] myATAChapterId = null;
            long[] myATASubChapterID = null;
            if (ATAChapterId != null && ATAChapterId != "")
                myATAChapterId = ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (ATASubChapterID != null && ATASubChapterID != "")
                myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (ATAChapterId != null && ATASubChapterID != null)
            {
                var data = (from cATA in _appContext.CustomerATAMapping
                            where cATA.CustomerId == CustomerId && myATAChapterId.Contains(cATA.ATAChapterId) && myATASubChapterID.Contains(cATA.ATASubChapterId) && cATA.IsDeleted != true
                            select new { cATA.CustomerATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (ATAChapterId != null && ATASubChapterID == null)
            {
                var data = (from cATA in _appContext.CustomerATAMapping
                            where cATA.CustomerId == CustomerId && myATAChapterId.Contains(cATA.ATAChapterId) && cATA.IsDeleted != true
                            select new { cATA.CustomerATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else if (ATAChapterId == null && ATASubChapterID != null)
            {
                var data = (from cATA in _appContext.CustomerATAMapping
                            where cATA.CustomerId == CustomerId && myATASubChapterID.Contains(cATA.ATASubChapterId) && cATA.IsDeleted != true
                            select new { cATA.CustomerATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from cATA in _appContext.CustomerATAMapping
                            where cATA.CustomerId == CustomerId && cATA.IsDeleted != true
                            select new { cATA.CustomerATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
