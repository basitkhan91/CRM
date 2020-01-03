// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;
using DAL.Common;
using DAL.Models.Enums;

using System.Linq.Dynamic.Core;

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


        public IEnumerable<object> GetList(Filters<CustomerFilters> customerFilters)
        {
            if (customerFilters.filters == null)
                customerFilters.filters = new CustomerFilters();
            var pageNumber = customerFilters.first + 1;
            var take = customerFilters.rows;
            var skip = take * (pageNumber - 1);

            var totalRecords = (from t in _appContext.Customer
                                join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                                join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                                from custContacts in custinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                from contacts in contactInfo.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)
                                && t.Name.Contains((!String.IsNullOrEmpty(customerFilters.filters.Name) ? customerFilters.filters.Name : t.Name))
                                && t.CustomerCode.Contains((!String.IsNullOrEmpty(customerFilters.filters.CustomerCode) ? customerFilters.filters.CustomerCode : t.CustomerCode))
                                && t.Email.Contains((!String.IsNullOrEmpty(customerFilters.filters.Email) ? customerFilters.filters.Email : t.Email))
                                && type.Description.Contains((!String.IsNullOrEmpty(customerFilters.filters.CustomerType) ? customerFilters.filters.CustomerType : type.Description))
                                && ct.Description.Contains((!String.IsNullOrEmpty(customerFilters.filters.CustomerClassification) ? customerFilters.filters.CustomerClassification : ct.Description))
                                && ad.City.Contains((!String.IsNullOrEmpty(customerFilters.filters.City) ? customerFilters.filters.City : ad.City))
                                && ad.StateOrProvince.Contains((!String.IsNullOrEmpty(customerFilters.filters.StateOrProvince) ? customerFilters.filters.StateOrProvince : ad.StateOrProvince))

                                 && customerFilters.filters.Contact == null ? string.IsNullOrEmpty(contacts.WorkPhone) || contacts.WorkPhone != null :
                                         contacts.WorkPhone.Contains(customerFilters.filters.Contact)

                                && customerFilters.filters.SalesPersonPrimary == null ? string.IsNullOrEmpty(t.PrimarySalesPersonFirstName) || t.PrimarySalesPersonFirstName != null :
                                         t.PrimarySalesPersonFirstName.Contains(customerFilters.filters.SalesPersonPrimary)
                                select new
                                {
                                    t.CustomerId,
                                    Contact = contacts.WorkPhone == null ? "-" : contacts.WorkPhone,

                                }).Distinct().Count();

            var data = (from t in _appContext.Customer
                        join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                        join AccountTyp in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals AccountTyp.CustomerAffiliationId

                        join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                        join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                        from custContacts in custinfo.DefaultIfEmpty()
                        join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                        from contacts in contactInfo.DefaultIfEmpty()
                        where (t.IsDeleted == false || t.IsDeleted == null)
                        && t.Name.Contains((!String.IsNullOrEmpty(customerFilters.filters.Name) ? customerFilters.filters.Name : t.Name))
                        && t.CustomerCode.Contains((!String.IsNullOrEmpty(customerFilters.filters.CustomerCode) ? customerFilters.filters.CustomerCode : t.CustomerCode))
                        && t.Email.Contains((!String.IsNullOrEmpty(customerFilters.filters.Email) ? customerFilters.filters.Email : t.Email))
                        && type.Description.Contains((!String.IsNullOrEmpty(customerFilters.filters.CustomerType) ? customerFilters.filters.CustomerType : type.Description))
                        && ct.Description.Contains((!String.IsNullOrEmpty(customerFilters.filters.CustomerClassification) ? customerFilters.filters.CustomerClassification : ct.Description))
                        && ad.City.Contains((!String.IsNullOrEmpty(customerFilters.filters.City) ? customerFilters.filters.City : ad.City))
                        && ad.StateOrProvince.Contains((!String.IsNullOrEmpty(customerFilters.filters.StateOrProvince) ? customerFilters.filters.StateOrProvince : ad.StateOrProvince))
                         && customerFilters.filters.Contact == null ? string.IsNullOrEmpty(contacts.WorkPhone) || contacts.WorkPhone != null :
                                 contacts.WorkPhone.Contains(customerFilters.filters.Contact)

                        && customerFilters.filters.SalesPersonPrimary == null ? string.IsNullOrEmpty(t.PrimarySalesPersonFirstName) || t.PrimarySalesPersonFirstName != null :
                                 t.PrimarySalesPersonFirstName.Contains(customerFilters.filters.SalesPersonPrimary)
                        select new
                        {
                            t.CustomerId,
                            t.Name,
                            t.CustomerCode,
                            t.Email,
                            AccountType = type.Description,
                            CustomerClassification = ct.Description,
                            City = ad.City,
                            StateOrProvince = ad.StateOrProvince,
                            Contact = contacts.WorkPhone == null ? "-" : contacts.WorkPhone,
                            SalesPersonPrimary = t.PrimarySalesPersonFirstName == null ? "-" : t.PrimarySalesPersonFirstName,
                            t.CreatedDate,
                            t.IsActive,
                            t.IsDeleted,
                            CustomerType = AccountTyp.description,
                            TotalRecords = totalRecords
                        }).Distinct().OrderByDescending(p => p.CreatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();

            if (!string.IsNullOrEmpty(customerFilters.SortOrder) && !string.IsNullOrEmpty(customerFilters.SortColumn))
            {
                if (customerFilters.SortOrder.ToLower() == "-1")
                {
                    switch (customerFilters.SortColumn)
                    {
                        case "name":
                            return data.OrderByDescending(p => p.Name).ToList();
                        case "customerCode":
                            return data.OrderByDescending(p => p.CustomerCode).ToList();
                        case "accountType":
                            return data.OrderByDescending(p => p.AccountType).ToList();
                        case "customerType":
                            return data.OrderByDescending(p => p.CustomerType).ToList();
                        case "customerClassification":
                            return data.OrderByDescending(p => p.CustomerClassification).ToList();
                        case "email":
                            return data.OrderByDescending(p => p.Email).ToList();
                        case "city":
                            return data.OrderByDescending(p => p.City).ToList();
                        case "stateOrProvince":
                            return data.OrderByDescending(p => p.StateOrProvince).ToList();
                        case "contact":
                            return data.OrderByDescending(p => p.Contact).ToList();
                        case "salesPersonPrimary":
                            return data.OrderByDescending(p => p.SalesPersonPrimary).ToList();


                    }
                }
                else
                {
                    switch (customerFilters.SortColumn)
                    {
                        case "name":
                            return data.OrderBy(p => p.Name).ToList();
                        case "customerCode":
                            return data.OrderBy(p => p.CustomerCode).ToList();
                        case "accountType":
                            return data.OrderBy(p => p.AccountType).ToList();
                        case "customerType":
                            return data.OrderBy(p => p.CustomerType).ToList();
                        case "customerClassification":
                            return data.OrderBy(p => p.CustomerClassification).ToList();
                        case "email":
                            return data.OrderBy(p => p.Email).ToList();
                        case "city":
                            return data.OrderBy(p => p.City).ToList();
                        case "stateOrProvince":
                            return data.OrderBy(p => p.StateOrProvince).ToList();
                        case "contact":
                            return data.OrderBy(p => p.Contact).ToList();
                        case "salesPersonPrimary":
                            return data.OrderBy(p => p.SalesPersonPrimary).ToList();


                    }
                }
            }


            return (data);
        }

        public IEnumerable<object> GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {

            var pageNumbers = pageNumber + 1;
            var take = pageSize;
            var skip = take * (pageNumbers - 1);

            if (!string.IsNullOrEmpty(value))
            {
                var totalRecords = (from t in _appContext.Customer
                                    join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                                    join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                                    join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                    join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                                    from custContacts in custinfo.DefaultIfEmpty()
                                    join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                    from contacts in contactInfo.DefaultIfEmpty()
                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    && t.Name.Contains(value) || t.CustomerCode.Contains(value) || t.Email.Contains(value)
                                    || type.Description.Contains(value) || ct.Description.Contains(value)
                                    || ad.City.Contains(value) || ad.StateOrProvince.Contains(value)
                                    || contacts.WorkPhone.Contains(value) || t.PrimarySalesPersonFirstName.Contains(value)
                                    select new
                                    {
                                        t.CustomerId,

                                    }).Count();

                var data = (from t in _appContext.Customer
                            join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                            join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                            from custContacts in custinfo.DefaultIfEmpty()
                            join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                            from contacts in contactInfo.DefaultIfEmpty()
                            where (t.IsDeleted == false || t.IsDeleted == null)
                                   && t.Name.Contains(value) || t.CustomerCode.Contains(value) || t.Email.Contains(value)
                                   || type.Description.Contains(value) || ct.Description.Contains(value)
                                   || ad.City.Contains(value) || ad.StateOrProvince.Contains(value)
                                   || contacts.WorkPhone.Contains(value) || t.PrimarySalesPersonFirstName.Contains(value)
                            select new
                            {
                                t.CustomerId,
                                t.Name,
                                t.CustomerCode,
                                t.Email,
                                CustomerType = type.Description,
                                CustomerClassification = ct.Description,
                                City = ad.City,
                                StateOrProvince = ad.StateOrProvince,
                                Contact = contacts.WorkPhone == null ? "-" : contacts.WorkPhone,
                                SalesPersonPrimary = t.PrimarySalesPersonFirstName == null ? "-" : t.PrimarySalesPersonFirstName,
                                t.UpdatedDate,
                                t.IsActive,
                                t.IsDeleted,
                                TotalRecords = totalRecords
                            }).OrderBy(p => p.UpdatedDate)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToList();



                return (data);
            }
            else
            {
                var totalRecords = (from t in _appContext.Customer
                                    join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                                    join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                                    join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                    join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                                    from custContacts in custinfo.DefaultIfEmpty()
                                    join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                    from contacts in contactInfo.DefaultIfEmpty()
                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    select new
                                    {
                                        t.CustomerId,

                                    }).Count();

                var data = (from t in _appContext.Customer
                            join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                            join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                            from custContacts in custinfo.DefaultIfEmpty()
                            join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                            from contacts in contactInfo.DefaultIfEmpty()
                            where (t.IsDeleted == false || t.IsDeleted == null)
                            select new
                            {
                                t.CustomerId,
                                t.Name,
                                t.CustomerCode,
                                t.Email,
                                CustomerType = type.Description,
                                CustomerClassification = ct.Description,
                                City = ad.City,
                                StateOrProvince = ad.StateOrProvince,
                                Contact = contacts.WorkPhone == null ? "-" : contacts.WorkPhone,
                                SalesPersonPrimary = t.PrimarySalesPersonFirstName == null ? "-" : t.PrimarySalesPersonFirstName,
                                t.UpdatedDate,
                                t.IsActive,
                                t.IsDeleted,
                                TotalRecords = totalRecords
                            }).OrderBy(p => p.UpdatedDate)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToList();



                return (data);
            }


        }
        public void CustomerStatus(long CustomerId, bool status, string updatedBy)
        {
            Customer customer = new Customer();
            try
            {
                customer.CustomerId = CustomerId;
                customer.UpdatedDate = DateTime.Now;
                customer.UpdatedBy = updatedBy;
                customer.IsActive = status;

                _appContext.Customer.Attach(customer);
                _appContext.Entry(customer).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(customer).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(customer).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Customer> getAllCustomer()
        {
            return _appContext.Customer.Include("CustomerContact").Where(x => x.IsDeleted == null || x.IsDeleted == false).ToList();

        }



        public IEnumerable<object> GetAllCustomersData()
        {
            var data = (from t in _appContext.Customer
                        join custType in _appContext.CustomerType on t.CustomerTypeId equals custType.CustomerTypeId into cust
                        from custType in cust.DefaultIfEmpty()

                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                        join vt in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals vt.CustomerAffiliationId
                        join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                        from currency in curr.DefaultIfEmpty()
                        join creditTerms in _appContext.CreditTerms on t.CreditTermsId equals creditTerms.CreditTermsId into cre
                        from creditTerms in cre.DefaultIfEmpty()
                        join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                        where t.IsDeleted == false || t.IsDeleted == null
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
                        }).Where(t => t.IsActive == true).OrderByDescending(a => a.UpdatedDate).ToList();
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

        public IEnumerable<object> SearchCustomer(string value, CustomerSearchType searchType = CustomerSearchType.None)
        {
            if (string.IsNullOrWhiteSpace(value) || searchType == CustomerSearchType.None)
            {
                return Enumerable.Empty<object>();
            }

            return Search(value, searchType);
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
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                            from ad in add.DefaultIfEmpty()


                            join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                            from Emp in Emplyee.DefaultIfEmpty()

                            join Empe in _appContext.Employee on Convert.ToInt32(t.SecondarySalesPersonId) equals Empe.EmployeeId into Empl
                            from Empe in Empl.DefaultIfEmpty()
                            join Employeecsr in _appContext.Employee on t.CsrId equals Employeecsr.EmployeeId into Employeecsrname
                            from Employeecsr in Employeecsrname.DefaultIfEmpty()

                            join Employeesald in _appContext.Employee on t.SaId equals Employeesald.EmployeeId into Employeesaldname
                            from Employeesald in Employeesaldname.DefaultIfEmpty()

                            join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                            from cont in country.DefaultIfEmpty()

                            join vt in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals vt.CustomerAffiliationId into vtt
                            from vt in vtt.DefaultIfEmpty()

                            join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                            from currency in curr.DefaultIfEmpty()
                            join creditTerms in _appContext.CreditTerms on t.CreditTermsId equals creditTerms.CreditTermsId into cre
                            from creditTerms in cre.DefaultIfEmpty()
                            join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId

                            join mup in _appContext.Percent on Convert.ToInt32(t.MarkUpPercentageId) equals mup.PercentId
                            into tmup

                            from mup in tmup.DefaultIfEmpty()

                            join inte in _appContext.CustomerIntegrationPortal on t.CustomerId equals inte.CustomerId into integra
                            from inte in integra.DefaultIfEmpty()
                            join intepo in _appContext.IntegrationPortal on inte.IntegrationPortalId equals intepo.IntegrationPortalId into integrapo
                            from intepo in integrapo.DefaultIfEmpty()
                            join v in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals v.CustomerAffiliationId

                            join taxTyp in _appContext.CustomerTaxTypeRateMapping on t.CustomerId equals taxTyp.CustomerId into taxtypee
                            from taxTyp in taxtypee.DefaultIfEmpty()

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
                                CountryName = cont.countries_name,
                                currency = currency.DisplayName,


                                customerCode = t.CustomerCode,
                                doingBuinessAsName = t.DoingBuinessAsName,
                                parent = t.Parent,


                                customerParentName = t.CustomerParentName,
                                customerURL = t.CustomerURL,
                                generalCurrencyId = t.CurrencyId,
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
                                primarySalesPersonFirstName = Emp.FirstName,


                                csrId = t.CsrId,
                                saId = t.SaId,
                                secondarySalesPersonId = t.SecondarySalesPersonId,
                                secondarySalesPersonName = Empe.FirstName,

                                annualQuota = t.AnnualQuota,
                                annualRevenuePotential = t.AnnualRevenuePotential,
                                AgentName = Employeesald.FirstName,
                                t.CustomerPhoneExt,
                                ClassificationName = cc.Description,
                                IntegrationWith = intepo.Description,

                                CreditTermsName = creditTerms.Name,
                                MarkUpPercentage = mup == null ? 0 : mup.PercentValue,
                                //MarkUpPercentage = mup.PercentValue,
                                TaxTypeDescription = t.TaxTypeId,
                                CsrName = Employeecsr.FirstName,

                                AccountType = v.description,
                                TaxTypeName = taxTyp.TaxType,
                                TaxRateName = taxTyp.TaxRate


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

                var data = (from ca in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on ca.CustomerContactId equals cont.ContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()

                            where ca.CustomerId == customerId && ca.IsDeleted == false
                            select new
                            {
                                ca.CustomerContactATAMappingId,
                                ca.CustomerId,
                                ca.ATAChapterId,
                                ca.ATAChapterCode,
                                ca.ATAChapterName,

                                ca.ATASubChapterId,
                                ca.ATASubChapterDescription,
                                contt.FirstName,
                                contt.ContactId


                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> GetATAContactMapped(long contactId)
        {
            {

                var data = (from ca in _appContext.CustomerContactATAMapping
                            where ca.CustomerContactId == contactId && ca.IsDeleted == false
                            select new
                            {
                                ca.CustomerContactATAMappingId,
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

        public IEnumerable<object> GetTaxTypeRateMapped(long customerId)
        {
            {

                var data = (from c in _appContext.CustomerTaxTypeRateMapping
                            where c.CustomerId == customerId && c.IsDeleted == false
                            select new
                            {
                                c.CustomerTaxTypeRateMappingId,
                                c.CustomerId,
                                c.TaxType,
                                c.TaxRate,
                                c.CreatedBy,
                                c.MasterCompanyId
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
            return _appContext.Customer.Where(x => x.IsActive == true && x.IsDeleted == false)
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
            return _appContext.Customer.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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
                 .Where(p => p.IsDeleted == false && p.CustomerId == model.CustomerId)
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public GetData<CustomerInternationalShipping> GetCustomerInternationalShippingDetails(long customerId, int pageNumber, int pageSize)
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
            catch (Exception ex)
            {
                throw ex;
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
                 .Where(p => p.cis1.cis.InternationalShippingId == id)
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreateDocumentDetails(CustomerDocumentDetail customerDocument)
        {
            try
            {
                customerDocument.CreatedDate = DateTime.Now;
                customerDocument.IsActive = true;
                customerDocument.IsDeleted = false;
                _appContext.CustomerDocumentDetails.Add(customerDocument);
                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateDocumentDetails(CustomerDocumentDetail customerDocument)
        {
            try
            {
                customerDocument.CreatedDate = DateTime.Now;
                customerDocument.IsActive = true;
                customerDocument.IsDeleted = false;
                _appContext.CustomerDocumentDetails.Update(customerDocument);
                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public CustomerDocumentDetail GetCustomerDocumentDetailById(long id)
        {
            try
            {
                CustomerDocumentDetail CustomerDocumentDetails = new CustomerDocumentDetail();
                CustomerDocumentDetails = _appContext.CustomerDocumentDetails
                    .Where(p => p.IsDeleted == false && p.CustomerDocumentDetailId == id)
                    .OrderByDescending(p => p.UpdatedDate)
                    .FirstOrDefault();
                return CustomerDocumentDetails;
            }
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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

                getData.TotalRecordsCount = _appContext.ShippingViaDetails.Where(p => p.IsDeleted == false)
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
            catch (Exception ex)
            {
                throw ex;
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
                 .Where(p => p.IsDeleted == false && p.InternationalShippingId == internationalShippingId)
                 .OrderByDescending(p => p.UpdatedDate)
                 .Skip(skip)
                 .Take(take)
                 .ToList();

                return getData;
            }
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int? ToNullableInt(string s)
        {
            int i;
            if (int.TryParse(s, out i)) return i;
            return null;
        }


        public IEnumerable<object> searchCustomerAircraftMappingDataByMultiTypeIdModelIDDashID(long CustomerId, string AircraftTypeId, string AircraftModelId, string DashNumberId, string memo)
        {
            long[] myAircraftTypeId = null;
            long?[] myAircraftModelId = null;
            long?[] myDashNumberId = null;

            if (AircraftTypeId != null && AircraftTypeId != "")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId != "")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => (long?)Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")

                myDashNumberId = DashNumberId.Split(',').Select(x => (long?)Convert.ToInt64(x)).ToArray();


            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myAircraftModelId.Contains(cam.AircraftModelId) && myDashNumberId.Contains(cam.DashNumberId) && memo.Contains(cam.Memo) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null)
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
            else if (AircraftTypeId == null && myAircraftModelId == null && myDashNumberId == null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && memo.Contains(cam.Memo) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftModelId != null && myDashNumberId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && memo.Contains(cam.Memo) && myAircraftModelId.Contains(cam.AircraftModelId) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftModelId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && memo.Contains(cam.Memo) && myAircraftModelId.Contains(cam.AircraftModelId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }

            else if (myDashNumberId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && memo.Contains(cam.Memo) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
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
        public IEnumerable<object> searchgetCustomerATAMappingDataByMultiTypeIdATAIDATASUBID(long customerId, string contactId, string ATAChapterId, string ATASubChapterID)
        {
            long[] myATAChapterId = null;
            long[] myATASubChapterID = null;
            long[] mycontactID = null;
            if (ATAChapterId != null && ATAChapterId != "")
                myATAChapterId = ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (ATASubChapterID != null && ATASubChapterID != "")
                myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (contactId != null && contactId != "")
                mycontactID = contactId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();

            if (ATAChapterId != null && ATASubChapterID != null && contactId != null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && myATASubChapterID.Contains(cATA.ATASubChapterId) && mycontactID.Contains(cATA.CustomerContactId) && cATA.IsDeleted != true
                            select new { cATA.CustomerContactATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (ATAChapterId != null && ATASubChapterID == null && contactId != null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && mycontactID.Contains(cATA.CustomerContactId) && cATA.IsDeleted != true
                            select new { cATA.CustomerContactATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else if (ATAChapterId == null && ATASubChapterID != null && contactId != null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            where cATA.CustomerId == customerId && myATASubChapterID.Contains(cATA.ATASubChapterId) && mycontactID.Contains(cATA.CustomerContactId) && cATA.IsDeleted != true
                            select new { cATA.CustomerContactATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else if (ATAChapterId == null && ATASubChapterID != null && contactId == null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            where cATA.CustomerId == customerId && myATASubChapterID.Contains(cATA.ATASubChapterId) && cATA.IsDeleted != true
                            select new { cATA.CustomerContactATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else if (ATAChapterId != null && ATASubChapterID != null && contactId == null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && myATASubChapterID.Contains(cATA.ATASubChapterId) && cATA.IsDeleted != true
                            select new { cATA.CustomerContactATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            where cATA.CustomerContactId == customerId && cATA.IsDeleted != true
                            select new { cATA.CustomerContactATAMappingId, cATA.CustomerId, cATA.ATAChapterId, cATA.ATAChapterCode, cATA.ATAChapterName, cATA.ATASubChapterId, cATA.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
        }

        public IEnumerable<object> GetCustomerShipviaDetails(long customerId, long addressId)
        {
            try
            {
                var list = (from csv in _appContext.CustomerShipping
                            where csv.CustomerId == customerId && csv.CustomerShippingAddressId == addressId
                            select new
                            {
                                csv.CustomerShippingId,
                                csv.IsActive,
                                csv.Memo,
                                csv.ShippingAccountinfo,
                                csv.ShippingId,
                                csv.ShippingURL,
                                csv.ShipVia,
                            }).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetCustomerNameAndCodes(string value)
        {
            try
            {
                var list = (from cust in _appContext.Customer

                            join cc in _appContext.CustomerContact.Where(p=>p.IsDefaultContact==true) on cust.CustomerId equals cc.CustomerId into custcc
                            from cc in custcc.DefaultIfEmpty()
                            join con in _appContext.Contact on cc.ContactId equals con.ContactId into custcon
                            from con in custcon.DefaultIfEmpty()
                            join emp in _appContext.Employee on cust.CsrId equals emp.EmployeeId into custemp
                            from emp in custemp.DefaultIfEmpty()
                            where cust.IsActive == true && cust.IsDeleted == false
                                  && (cust.Name.ToLower().Contains(value.ToLower()) || cust.CustomerCode.ToLower().Contains(value.ToLower()))
                            select new
                            {
                                CustomerId = cust.CustomerId,
                                CustomerName = cust.Name + " - " + cust.CustomerCode,
                                cust.CreditLimit,
                                cust.CreditTermsId,
                                CustomerContact = con == null ? " " : con.FirstName,
                                CustomerRef = cust.ContractReference == null ? "" : cust.ContractReference,
                                CSRName = emp.FirstName,
                                CustomerEmail = cust.Email,
                                CustomerPhoneNo = con == null ? "" : con.WorkPhone
                            }
                            ).Distinct().ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetCustomerNameAndCodesByCustomerId(long customerId)
        {
            try
            {
                var list = (from cust in _appContext.Customer

                            join cc in _appContext.CustomerContact on cust.CustomerId equals cc.CustomerId into custcc
                            from cc in custcc.DefaultIfEmpty()
                            join con in _appContext.Contact on cc.ContactId equals con.ContactId into custcon
                            from con in custcon.DefaultIfEmpty()
                            join emp in _appContext.Employee on cust.CsrId equals emp.EmployeeId into custemp
                            from emp in custemp.DefaultIfEmpty()
                            where cust.CustomerId == customerId && cust.IsActive == true && cust.IsDeleted == false
                            select new
                            {
                                CustomerId = cust.CustomerId,
                                CustomerName = cust.Name + " - " + cust.CustomerCode,
                                cust.CreditLimit,
                                cust.CreditTermsId,
                                CustomerContact = con == null ? " " : con.FirstName,
                                CustomerRef = cust.ContractReference == null ? "" : cust.ContractReference,
                                CSRName = emp.FirstName
                            }
                            ).Distinct().ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        #region Customer ShippingAddress 

        /// <summary>
        /// This method is implemented for CustomerShippingAddress Insert and Update
        ///  Added By vijay on 12/11/2019
        /// </summary>
        /// <param name="objCustomer"></param>
        public void AddCustomerShippingAddress(Customer objCustomer)
        {
            // CustomerShippingAddress objCustomerShippingAddress = new CustomerShippingAddress();
            // var shippingaddress = _appContext.CustomerShippingAddress.GetSingleOrDefault(a => a.AddressId == objCustomer.AddressId && a.CustomerId == objCustomer.CustomerId);
            //var shipping = _appContext.CustomerShippingAddress
            //         .Where(p => p.AddressId == objCustomer.AddressId && p.CustomerId == objCustomer.CustomerId).FirstOrDefault();





            //if (objCustomerShippingAddress.CustomerShippingAddressId > 0)
            //{
            //_appContext.CustomerShippingAddress.detch
            CustomerShippingAddress data = _appContext.CustomerShippingAddress.AsNoTracking().Where(p => p.AddressId == objCustomer.AddressId && p.CustomerId == objCustomer.CustomerId).FirstOrDefault();
            //_appContext.CustomerShippingAddress.detach(objCustomerShippingAddress);
            if (data != null)
            {
                if (data.CustomerShippingAddressId > 0)
                {
                    data.CustomerId = objCustomer.CustomerId;
                    data.AddressId = objCustomer.AddressId;
                    data.MasterCompanyId = objCustomer.MasterCompanyId;
                    data.SiteName = objCustomer.CustomerCode;
                    data.CreatedDate = DateTime.Now;
                    data.UpdatedDate = DateTime.Now;
                    data.CreatedBy = objCustomer.CreatedBy;
                    data.UpdatedBy = objCustomer.UpdatedBy;
                    data.IsActive = objCustomer.IsActive;
                    data.IsPrimary = true;
                    data.IsDelete = false;
                    _appContext.CustomerShippingAddress.Update(data);
                }
            }
            else
            {
                CustomerShippingAddress objCustomerShippingAddress = new CustomerShippingAddress();

                objCustomerShippingAddress.CustomerId = objCustomer.CustomerId;
                objCustomerShippingAddress.AddressId = objCustomer.AddressId;
                objCustomerShippingAddress.MasterCompanyId = objCustomer.MasterCompanyId;
                objCustomerShippingAddress.SiteName = objCustomer.CustomerCode;
                objCustomerShippingAddress.CreatedDate = DateTime.Now;
                objCustomerShippingAddress.UpdatedDate = DateTime.Now;
                objCustomerShippingAddress.CreatedBy = objCustomer.CreatedBy;
                objCustomerShippingAddress.UpdatedBy = objCustomer.UpdatedBy;
                objCustomerShippingAddress.IsActive = objCustomer.IsActive;
                objCustomerShippingAddress.IsPrimary = true;
                objCustomerShippingAddress.IsDelete = false;

                _appContext.CustomerShippingAddress.Add(objCustomerShippingAddress);
            }

            _appContext.SaveChanges();

            // return objCustomerShippingAddress;
        }


        #endregion

        #region CustomerBillingAddress

        /// <summary>
        /// This method is implemented for CustomerBillingAddress Insert and Update
        /// Added By vijay on 12/11/2019
        /// </summary>
        /// <param name="objCustomer"></param>
        public void AddCustomerBillinggAddress(Customer objCustomer)
        {
            CustomerBillingAddress data = _appContext.CustomerBillingAddress.AsNoTracking().Where(p => p.AddressId == objCustomer.AddressId && p.CustomerId == objCustomer.CustomerId).FirstOrDefault();

            if (data != null)
            {
                if (data.CustomerBillingAddressId > 0)
                {
                    data.CustomerId = objCustomer.CustomerId;
                    data.MasterCompanyId = objCustomer.MasterCompanyId;
                    data.AddressId = objCustomer.AddressId;
                    data.SiteName = objCustomer.CustomerCode;
                    data.CreatedDate = DateTime.Now;
                    data.UpdatedDate = DateTime.Now;
                    data.CreatedBy = objCustomer.CreatedBy;
                    data.UpdatedBy = objCustomer.UpdatedBy;
                    data.IsPrimary = true;
                    data.IsActive = true;
                    data.IsDelete = false;
                    _appContext.CustomerBillingAddress.Update(data);
                }
            }
            else
            {
                CustomerBillingAddress objCustomerBillingAddress = new CustomerBillingAddress();

                objCustomerBillingAddress.CustomerId = objCustomer.CustomerId;
                objCustomerBillingAddress.MasterCompanyId = objCustomer.MasterCompanyId;
                objCustomerBillingAddress.AddressId = objCustomer.AddressId;
                objCustomerBillingAddress.SiteName = objCustomer.CustomerCode;
                objCustomerBillingAddress.CreatedDate = DateTime.Now;
                objCustomerBillingAddress.UpdatedDate = DateTime.Now;
                objCustomerBillingAddress.CreatedBy = objCustomer.CreatedBy;
                objCustomerBillingAddress.UpdatedBy = objCustomer.UpdatedBy;
                objCustomerBillingAddress.IsPrimary = true;
                objCustomerBillingAddress.IsActive = true;
                objCustomerBillingAddress.IsDelete = false;

                _appContext.CustomerBillingAddress.Add(objCustomerBillingAddress);
            }

            _appContext.SaveChanges();

            // CustomerBillingAddress objCustomerBillingAddress = new CustomerBillingAddress();

            //objCustomerBillingAddress.CustomerId = objCustomer.CustomerId;
            //objCustomerBillingAddress.MasterCompanyId = objCustomer.MasterCompanyId;
            //objCustomerBillingAddress.AddressId = objCustomer.AddressId;
            //objCustomerBillingAddress.SiteName = objCustomer.CustomerCode;              
            //objCustomerBillingAddress.CreatedDate = DateTime.Now;
            //objCustomerBillingAddress.UpdatedDate = DateTime.Now;
            //objCustomerBillingAddress.CreatedBy = objCustomer.CreatedBy;
            //objCustomerBillingAddress.UpdatedBy = objCustomer.UpdatedBy;
            //objCustomerBillingAddress.IsPrimary = true;
            //objCustomerBillingAddress.IsActive = true;
            //objCustomerBillingAddress.IsDelete = false;

            //if (objCustomerBillingAddress.CustomerBillingAddressId > 0)
            //{
            //    _appContext.CustomerBillingAddress.Update(objCustomerBillingAddress);
            //}
            //else
            //{
            //    _appContext.CustomerBillingAddress.Add(objCustomerBillingAddress);
            //}

            //_appContext.SaveChanges();
            //return objCustomerBillingAddress;
        }


        #endregion
        public void AddCustomecontact(Customer objCustomer)
        {
            CustomerContact data = _appContext.CustomerContact.AsNoTracking().Where(p => p.CustomerId == objCustomer.CustomerId).FirstOrDefault();
            if (data == null)
            {

                Contact contactObj = new Contact();
                objCustomer.MasterCompanyId = 1;

                //contactObj.ContactTitle = objCustomer.ContactTitle;
                //contactObj.AlternatePhone = objCustomer.AlternatePhone;
                contactObj.Email = objCustomer.Email;
                //contactObj.Fax = objCustomer.Fax;
                //contactObj.Tag = objCustomer.Tag;
                contactObj.FirstName = objCustomer.Name;
                contactObj.LastName = "NA";
                contactObj.Tag = "NA";

                //contactObj.MiddleName = objCustomer.MiddleName;
                //contactObj.ContactTitle = objCustomer.ContactTitle;
                //contactObj.MobilePhone = objCustomer.MobilePhone;
                //contactObj.Notes = objCustomer.Notes;
                contactObj.WorkPhone = objCustomer.CustomerPhone;
                //contactObj.WebsiteURL = objCustomer.WebsiteURL;
                contactObj.MasterCompanyId = 1;
                contactObj.WorkPhoneExtn = objCustomer.CustomerPhoneExt;
                contactObj.IsActive = true;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = objCustomer.CreatedBy;
                contactObj.UpdatedBy = objCustomer.UpdatedBy;
                contactObj.WorkPhoneExtn = contactObj.WorkPhoneExtn;
                _appContext.Contact.Add(contactObj);

                _appContext.SaveChanges();
                long? contactId = contactObj.ContactId;

                if (contactId != null)
                {
                    CustomerContact customercontactObj = new CustomerContact();

                    customercontactObj.ContactId = contactId;
                    customercontactObj.CustomerId = objCustomer.CustomerId;
                    customercontactObj.IsDefaultContact = true;
                    customercontactObj.MasterCompanyId = 1;
                    customercontactObj.IsActive = objCustomer.IsActive;
                    customercontactObj.CreatedDate = DateTime.Now;
                    customercontactObj.UpdatedDate = DateTime.Now;
                    customercontactObj.CreatedBy = objCustomer.CreatedBy;
                    customercontactObj.UpdatedBy = objCustomer.UpdatedBy;


                    _appContext.CustomerContact.Add(customercontactObj);


                    _appContext.SaveChanges();
                }
                // return objCustomerShippingAddress;
            }
        }

        public void DeleteRestrictedParts(long id, string updatedBy)
        {
            try
            {
                RestrictedParts model = new RestrictedParts();
                model.RestrictedPartId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.RestrictedParts.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<object> Search(string value, CustomerSearchType searchType)
        {
            var data = from t in _appContext.Customer
                       join ad in _appContext.Address on t.AddressId equals ad.AddressId
                       join vt in _appContext.CustomerType on t.CustomerTypeId equals vt.CustomerTypeId
                       join v in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals v.CustomerAffiliationId
                       join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
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

                       };


            switch (searchType)
            {
                case CustomerSearchType.ExactName:
                    data = data.Where(t => t.IsActive == true && t.Name.ToLowerInvariant() == value.ToLowerInvariant());
                    break;
                case CustomerSearchType.ContainsName:
                    data = data.Where(t => t.IsActive == true && t.Name.ToLowerInvariant().Contains(value.ToLowerInvariant()));
                    break;

                case CustomerSearchType.ExactCode:
                    data = data.Where(t => t.IsActive == true && t.CustomerCode.ToLowerInvariant() == value.ToLowerInvariant());
                    break;

                case CustomerSearchType.ContainsCode:
                    data = data.Where(t => t.IsActive == true && t.CustomerCode.ToLowerInvariant().Contains(value.ToLowerInvariant()));

                    break;

            }


            return data.ToList(); ;
        }

        public void CustomerShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            try
            {
                CustomerShippingAddress model = new CustomerShippingAddress();
                model.CustomerShippingAddressId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;
                model.UpdatedBy = updatedBy;

                _appContext.CustomerShippingAddress.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void CustomerBillingStatus(long id, bool status, string updatedBy)
        {
            try
            {
                CustomerBillingAddress model = new CustomerBillingAddress();
                model.CustomerBillingAddressId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;

                _appContext.CustomerBillingAddress.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void DeleteShipViaDetails(long id, string updatedBy)
        {
            try
            {
                CustomerShipping model = new CustomerShipping();
                model.CustomerShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.CustomerShipping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void CustomerShippingDetailsViaStatus(long id, bool status, string updatedBy)
        {
            try
            {
                CustomerShipping model = new CustomerShipping();
                model.CustomerShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;

                _appContext.CustomerShipping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetCustomerFinanceDocumentDetailById(long id, int moduleId)
        {
            var result = (from at in _appContext.Attachment
                          join atd in _appContext.AttachmentDetails on at.AttachmentId equals atd.AttachmentId
                          where at.ReferenceId == id && at.ModuleId == moduleId && atd.IsActive == true && atd.IsDeleted == false
                          select atd).ToList();

            return result;

        }
        public IEnumerable<object> GetCustomerContacts(long id)
        {
            try
            {
                var result = (from c in _appContext.Contact
                              join cc in _appContext.CustomerContact on c.ContactId equals cc.ContactId
                              where cc.CustomerId == id
                              select new
                              {
                                  c.ContactId,
                                  c.FirstName
                              }).ToList();

                return result;
            }
            catch (Exception)
            {
                throw;
            }


        }

        public bool GetCustomerFinanceDocumentDelete(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                AttachmentDetails attachmentDetails = new AttachmentDetails();
                attachmentDetails.AttachmentDetailId = id;
                attachmentDetails.UpdatedDate = DateTime.Now;
                attachmentDetails.UpdatedBy = updatedBy;
                attachmentDetails.IsDeleted = true;

                _appContext.AttachmentDetails.Attach(attachmentDetails);
                _appContext.Entry(attachmentDetails).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }
        public IEnumerable<object> GetCustomerAuditHistoryByid(long customerId)
        {

            {
                var data = (from t in _appContext.CustomerAudit
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                            from ad in add.DefaultIfEmpty()
                            join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                            from cont in country.DefaultIfEmpty()

                            join vt in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals vt.CustomerAffiliationId into vtt
                            from vt in vtt.DefaultIfEmpty()

                              join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId

                            join mup in _appContext.Percent on Convert.ToInt32(t.MarkUpPercentageId) equals mup.PercentId
                            into tmup

                            from mup in tmup.DefaultIfEmpty()

                            join inte in _appContext.CustomerIntegrationPortal on t.CustomerId equals inte.CustomerId into integra
                            from inte in integra.DefaultIfEmpty()
                            join intepo in _appContext.IntegrationPortal on inte.IntegrationPortalId equals intepo.IntegrationPortalId into integrapo
                            from intepo in integrapo.DefaultIfEmpty()
                            join v in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals v.CustomerAffiliationId

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
                                CountryName = cont.countries_name,
                                customerCode = t.CustomerCode,
                                doingBuinessAsName = t.DoingBuinessAsName,
                                parent = t.Parent,
                                customerParentName = t.CustomerParentName,
                                customerURL = t.CustomerURL,
                                generalCurrencyId = t.CurrencyId,
                                customerClassificationId = t.CustomerClassificationId,
                                contractReference = t.ContractReference,
                                isPBHCustomer = t.IsPBHCustomer,
                                pbhCustomerMemo = t.PBHCustomerMemo,
                                restrictPMA = t.RestrictPMA,
                                restrictPMAMemo = t.RestrictPMAMemo,
                                restrictBER = t.RestrictBER,
                                restrictBERMemo = t.RestrictBERMemo,
                                 isCustomerAlsoVendor = t.IsCustomerAlsoVendor,
                                ediDescription = t.EDIDescription,
                                createdBy = t.CreatedBy,
                                updatedBy = t.UpdatedBy,
                                UpdatedDate = t.UpdatedDate,
                                CreatedDate = t.CreatedDate,
                                masterCompanyId = t.MasterCompanyId,
                                isActive = t.IsActive,
                               customerId = t.CustomerId,
                               ClassificationName = cc.Description,
                                IntegrationWith = intepo.Description,
                                AccountType = v.description,
                            }).OrderByDescending(a => a.UpdatedDate).ToList();
                return data;

            }

        }
        public IEnumerable<object> GetAircraftMappedAudit(long customerAircraftMappingId)
        {
            {

                var data = (from c in _appContext.CustomerAircraftMappingAudit
                            where c.CustomerAircraftMappingId == customerAircraftMappingId 
                            select new
                            {
                                c.CustomerAircraftMappingId,
                                c.AuditCustomerAircraftMappingId,
                                c.CustomerId,
                                c.AircraftTypeId,
                                c.AircraftType,
                                c.AircraftModelId,
                                c.DashNumberId,
                                c.CreatedBy,
                                c.UpdatedBy,
                                c.UpdatedDate,
                                c.CreatedDate,
                                c.DashNumber,
                                c.AircraftModel,
                                c.Memo,
                                c.Inventory,
                                c.MasterCompanyId
                            }).OrderByDescending(c => c.UpdatedDate).ToList();
                return data;
            }
        }
        public IEnumerable<object> GetCustomerInternationalShippingAuditHistoryByid(long customerId, long internationalShippingId)
        {
            {

                var data = (from c in _appContext.CustomerInternationalShippingAudit
                            where c.CustomerId == customerId && c.InternationalShippingId== internationalShippingId
                            select new
                            {
                                c.InternationalShippingId,
                                c.AuditInternationalShippingId,
                                c.CustomerId,
                                c.ExportLicense,
                                c.StartDate,
                                c.ExpirationDate,
                                c.Amount,
                                c.Description,
                                c.IsPrimary,
                                c.CreatedBy,
                                c.UpdatedBy,
                                c.UpdatedDate,
                                c.CreatedDate,
                               
                                c.MasterCompanyId
                            }).OrderByDescending(c => c.UpdatedDate).ToList();
                return data;
            }
        }
        public IEnumerable<object> GetAuditShippingViaDetailsById(long customerId, long internationalShippingId,long ShippingViaDetailsId)
        {
            var data = (from c in _appContext.ShippingViaDetailsAudit
                        where c.CustomerId == customerId && c.ShippingViaDetailsId ==c.ShippingViaDetailsId && c.InternationalShippingId==internationalShippingId
                        select new
                        {
                            c.AuditShippingViaDetailsId,
                            c.ShippingViaDetailsId,
                            c.CustomerId,
                            
                            c.CreatedBy,
                            c.UpdatedBy,
                            c.UpdatedDate,
                            c.CreatedDate,
                           
                            c.Memo,
                           c.ShipVia,
                           c.ShippingAccountInfo,
                            c.ShippingURL,
                            c.MasterCompanyId
                        }).OrderByDescending(c => c.UpdatedDate).ToList();
            return data;
        }
        public List<CustomerDocumentDetailAudit> GetCustomerDocumentDetailsAudit(long id)
        {
            try
            {
                return _appContext.CustomerDocumentDetailsAudit.Where(p => p.IsActive == true && p.CustomerDocumentDetailId == id).OrderByDescending(p => p.UpdatedDate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
