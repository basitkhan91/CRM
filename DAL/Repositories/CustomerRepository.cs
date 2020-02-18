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
using EntityFrameworkPaginate;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using System.IO;
using ExcelDataReader;
using Microsoft.Extensions.Options;

namespace DAL.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private AppSettings AppSettings { get; set; }
        public CustomerRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }



       

        public IEnumerable<object> GetList(Common.Filters<CustomerFilters> customerFilters)
        {
            if (customerFilters.filters == null)
                customerFilters.filters = new CustomerFilters();
            var pageNumber = customerFilters.first + 1;
            var pageSize = customerFilters.rows;

            string sortColumn = string.Empty;

            var sorts = new Sorts<CustomerFilters>();
            var filters = new EntityFrameworkPaginate.Filters<CustomerFilters>();

            if (string.IsNullOrEmpty(customerFilters.SortField))
            {
                sortColumn = "createdDate";
                customerFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = customerFilters.SortField;
            }

            var propertyInfo = typeof(CustomerFilters).GetProperty(sortColumn);

            if (customerFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }


            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.name), x => x.name.ToLower().Contains(customerFilters.filters.name.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.customerCode), x => x.customerCode.ToLower().Contains(customerFilters.filters.customerCode.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.email), x => x.email.ToLower().Contains(customerFilters.filters.email.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.city), x => x.city.ToLower().Contains(customerFilters.filters.city.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.stateOrProvince), x => x.stateOrProvince.ToLower().Contains(customerFilters.filters.stateOrProvince.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.accountType), x => x.accountType.ToLower().Contains(customerFilters.filters.accountType.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.customerType), x => x.customerType.ToLower().Contains(customerFilters.filters.customerType.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.customerClassification), x => x.customerClassification.Contains(customerFilters.filters.customerClassification));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.contact), x => x.contact.Contains(customerFilters.filters.contact));

            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.salesPersonPrimary), x => x.salesPersonPrimary.ToLower().Contains(customerFilters.filters.salesPersonPrimary.ToLower()));

            var totalRecords = (from t in _appContext.Customer
                                join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                                join AccountTyp in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals AccountTyp.CustomerAffiliationId

                                join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                                from Emp in Emplyee.DefaultIfEmpty()

                               
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                                from ad in add.DefaultIfEmpty()
                                join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                                from custContacts in custinfo.DefaultIfEmpty()
                                   join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                from con in contactInfo.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)
                                select new CustomerFilters()
                                {
                                    CustomerId = t.CustomerId,
                                    name = t.Name,
                                    customerCode = t.CustomerCode,
                                    email = t.Email,
                                    accountType = type.Description,
                                   

                                    customerClassification= string.Join(",", _appContext.Customer
                                .Join(_appContext.ClassificationMapping,
                                v => v.CustomerId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.CustomerClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.CustomerClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.CustomerId == t.CustomerId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Customer))
                                .Select(p => p.vc.Description)),
                                    city = ad.City,
                                    stateOrProvince = ad.StateOrProvince,
                                  
                                    contact = con.FirstName + " " + con.LastName,
                                    salesPersonPrimary = Emp.FirstName == null ? "-" : Emp.FirstName,
                                    createdDate = t.CreatedDate,
                                    isActive = t.IsActive,
                                    isDeleted = t.IsDeleted,
                                     customerType = AccountTyp.description,
                                }).Distinct().Paginate(pageNumber, pageSize, sorts, filters).RecordCount;
            var data = (from t in _appContext.Customer
                                join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                                join AccountTyp in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals AccountTyp.CustomerAffiliationId

                                join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                                from Emp in Emplyee.DefaultIfEmpty()

                                join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                                from ad in add.DefaultIfEmpty()
                        join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                        from custContacts in custinfo.DefaultIfEmpty()
                        join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                        from con in contactInfo.DefaultIfEmpty()
                        where (t.IsDeleted == false || t.IsDeleted == null)
                                select new CustomerFilters()
                                {
                                    CustomerId = t.CustomerId,
                                    name = t.Name,
                                    customerCode = t.CustomerCode,
                                    email = t.Email,
                                    accountType = type.Description,
                                   

                                    customerClassification = string.Join(",", _appContext.Customer
                                .Join(_appContext.ClassificationMapping,
                                v => v.CustomerId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.CustomerClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.CustomerClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.CustomerId == t.CustomerId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Customer))
                                .Select(p => p.vc.Description)),
                                    city = ad.City,
                                    stateOrProvince = ad.StateOrProvince,
                                   
                                    contact=con.FirstName+" "+con.LastName,
                                    salesPersonPrimary = Emp.FirstName == null ? "-" : Emp.FirstName,
                                    createdDate = t.CreatedDate,
                                    isActive = t.IsActive,
                                    isDeleted = t.IsDeleted,
                                    customerType = AccountTyp.description,
                                    totalRecords = totalRecords,
                                }).Distinct()
                           .Paginate(pageNumber, pageSize, sorts, filters).Results;

            return (data);
        }

        public IEnumerable<object> GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {

            var pageNumbers = pageNumber + 1;
            var take = pageSize;
            var skip = take * (pageNumbers - 1);

            if (!string.IsNullOrEmpty(value))
            {
                value = value.ToLower();
                var totalRecords = (from t in _appContext.Customer
                                    join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                                    join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                                    join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                    join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                                    from custContacts in custinfo.DefaultIfEmpty()
                                    join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                    from con in contactInfo.DefaultIfEmpty()
                                    join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                                    from Emp in Emplyee.DefaultIfEmpty()

                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    && t.Name.ToLower().Contains(value) || t.CustomerCode.ToLower().Contains(value) || t.Email.ToLower().Contains(value)
                                    || type.Description.ToLower().Contains(value)// || ct.Description.ToLower().Contains(value)
                                    || ad.City.ToLower().Contains(value) || ad.StateOrProvince.ToLower().Contains(value)
                                    || (con.FirstName + " " + con.LastName).ToLower().Contains(value) || Emp.FirstName.ToLower().Contains(value)
                                       || string.Join(",", _appContext.Customer
                                .Join(_appContext.ClassificationMapping,
                                v => v.CustomerId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.CustomerClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.CustomerClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.CustomerId == t.CustomerId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Customer))
                                .Select(p => p.vc.Description)).ToLower().Contains(value)
                                    select new
                                    {
                                        t.CustomerId,

                                    }).Count();

                var data = (from t in _appContext.Customer
                            join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                            join ct in _appContext.CustomerClassification on t.CustomerClassificationId equals ct.CustomerClassificationId
                            join ctype in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals ctype.CustomerAffiliationId

                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                            from custContacts in custinfo.DefaultIfEmpty()
                            join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                            from con in contactInfo.DefaultIfEmpty()
                            join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                            from Emp in Emplyee.DefaultIfEmpty()

                            where (t.IsDeleted == false || t.IsDeleted == null)
                                   && t.Name.ToLower().Contains(value) || t.CustomerCode.ToLower().Contains(value) || t.Email.ToLower().Contains(value)
                                   || type.Description.ToLower().Contains(value) //|| ct.Description.ToLower().Contains(value)
                                   || ad.City.ToLower().Contains(value) || ad.StateOrProvince.ToLower().Contains(value)
                                   || (con.FirstName + " " + con.LastName).ToLower().Contains(value) || Emp.FirstName.ToLower().Contains(value)
                                    || string.Join(",", _appContext.Customer
                                .Join(_appContext.ClassificationMapping,
                                v => v.CustomerId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.CustomerClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.CustomerClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.CustomerId == t.CustomerId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Customer))
                                .Select(p => p.vc.Description)).ToLower().Contains(value)
                            select new
                            {
                                t.CustomerId,
                                t.Name,
                                t.CustomerCode,
                                t.Email,
                                AccountType = type.Description,
                                CustomerType = ctype.description,

                               // CustomerClassification = ct.Description,
                                customerClassification = string.Join(",", _appContext.Customer
                                .Join(_appContext.ClassificationMapping,
                                v => v.CustomerId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.CustomerClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.CustomerClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.CustomerId == t.CustomerId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Customer))
                                .Select(p => p.vc.Description)),
                                City = ad.City,
                                StateOrProvince = ad.StateOrProvince,
                             
                                contact = con.FirstName + " " + con.LastName,
                                SalesPersonPrimary = Emp.FirstName == null ? "-" :Emp.FirstName,
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
                                    from con in contactInfo.DefaultIfEmpty()
                                    join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                                    from Emp in Emplyee.DefaultIfEmpty()

                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    select new
                                    {
                                        t.CustomerId,

                                    }).Count();

                var data = (from t in _appContext.Customer
                            join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId
                             join ctype in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals ctype.CustomerAffiliationId

                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on t.CustomerId equals cc.CustomerId into custinfo
                            from custContacts in custinfo.DefaultIfEmpty()
                            join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                            from con in contactInfo.DefaultIfEmpty()
                            join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                            from Emp in Emplyee.DefaultIfEmpty()

                            where (t.IsDeleted == false || t.IsDeleted == null)
                            select new
                            {
                                t.CustomerId,
                                t.Name,
                                t.CustomerCode,
                                t.Email,
                                AccountType = type.Description,
                                CustomerType = ctype.description,
                                  customerClassification = string.Join(",", _appContext.Customer
                                .Join(_appContext.ClassificationMapping,
                                v => v.CustomerId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.CustomerClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.CustomerClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.CustomerId == t.CustomerId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Customer))
                                .Select(p => p.vc.Description)),
                                City = ad.City,
                                StateOrProvince = ad.StateOrProvince,
                                 contact = con.FirstName + " " + con.LastName,
                                SalesPersonPrimary = Emp.FirstName == null ? "-" : Emp.FirstName,
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

                        join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                        from Emp in Emplyee.DefaultIfEmpty()

                        where t.IsDeleted == false || t.IsDeleted == null
                      
                        select new
                        {
                            t.CreditTermsId,
                            t.CurrencyId,
                            ad,
                            PrimarySalesPersonFirstName=Emp.FirstName,
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
                            t.IsParent,
                            
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
                           
                        }).Where(t => t.IsActive == true).OrderByDescending(a => a.UpdatedDate).ToList();
            return data;
        }

        public IEnumerable<object> GetCustomersData()
        {
            var data = (from t in _appContext.Customer
                        join custType in _appContext.CustomerType on t.CustomerTypeId equals custType.CustomerTypeId into cust
                        from custType in cust.DefaultIfEmpty()

                        join custo in _appContext.Customer on t.ParentId equals custo.CustomerId
                         into cus
                        from custo in cus.DefaultIfEmpty()
                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                        join vt in _appContext.CustomerAffiliation on t.CustomerAffiliationId equals vt.CustomerAffiliationId
                        join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                        from currency in curr.DefaultIfEmpty()
                        join creditTerms in _appContext.CreditTerms on t.CreditTermsId equals creditTerms.CreditTermsId into cre
                        from creditTerms in cre.DefaultIfEmpty()

                        join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                        from Emp in Emplyee.DefaultIfEmpty()


                        join cc in _appContext.CustomerClassification on t.CustomerClassificationId equals cc.CustomerClassificationId
                        where t.IsDeleted == false || t.IsDeleted == null
                      
                        select new
                        {
                            t.CreditTermsId,
                            t.CurrencyId,
                            ad,
                            PrimarySalesPersonFirstName= Emp.FirstName,
                            t.CustomerId,
                            t,
                            
                            creditTerms,
                            currency,
                            currency.Symbol,
                            
                            t.Email,
                            t.IsActive,
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            t.CustomerCode,
                            t.DoingBuinessAsName,
                            t.IsParent,
                         
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
                            join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                            from Emp in Emplyee.DefaultIfEmpty()




                            where t.IsActive == true && t.Name == name

                            select new
                            {
                                ad,
                               PrimarySalesPersonFirstName=Emp.FirstName,
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
                           
                            where t.IsActive == true
                          
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
                               
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,
                                

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
                           
                            select new
                            {
                                t.CustomerId,
                                t,
                               
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.CustomerCode,
                                t.Name,
                                t.Email,
                                t.CustomerPhone,
                                ad.City,
                                ad.StateOrProvince,
                                
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

                            join type in _appContext.CustomerType on t.CustomerTypeId equals type.CustomerTypeId into typ
                            from type in typ.DefaultIfEmpty()

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

                            join cust in _appContext.Customer on t.ParentId equals cust.CustomerId
                           into cus
                            from cust in cus.DefaultIfEmpty()
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
                                Type = type.Description,
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
                                parentId = t.ParentId,

                                isParent=t.IsParent,
                              customerParentName = cust.Name,
                                customerURL = t.CustomerURL,
                                generalCurrencyId = t.CurrencyId,
                                customerClassificationId = t.CustomerClassificationId,
                                contractReference = t.ContractReference,
                                isPBHCustomer = t.IsPBHCustomer,
                                pbhCustomerMemo = t.PBHCustomerMemo,
                                restrictPMA = t.RestrictPMA,
                                restrictBER = t.RestrictBER,
                                isCustomerAlsoVendor = t.IsCustomerAlsoVendor,
                              
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
                               
                                CsrName = Employeecsr.FirstName,

                                AccountType = v.description,
                                TaxTypeName = taxTyp.TaxType,
                                TaxRateName = taxTyp.TaxRate


                               
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

            var data = (from ca in _appContext.CustomerContactATAMapping
                        join cont in _appContext.CustomerContact on ca.CustomerContactId equals cont.CustomerContactId
                        join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                        from contt in conttt.DefaultIfEmpty()

                        join atasub in _appContext.ATASubChapter on ca.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                        from atasub in atasubchapter.DefaultIfEmpty()

                        where ca.CustomerId == customerId && ca.IsDeleted == false && cont.IsDeleted != true
                        select new
                        {
                            ca.CustomerContactATAMappingId,
                            ca.CustomerId,
                            ca.ATAChapterId,
                            ca.ATAChapterCode,
                           
                            ATAChapterName = ca.ATAChapterCode + " - " + ca.ATAChapterName,
                            ATASubChapterDescription = atasub.ATASubChapterCode + " - " + ca.ATASubChapterDescription,

                            ca.ATASubChapterId,
                            
                            contt.FirstName,
                            contt.ContactId


                        }).ToList();
            return data;
        }

        public IEnumerable<object> GetATAMappedAudit(long CustomerContactATAMappingId)
        {
            var data = (from ca in _appContext.CustomerContactATAMappingAudit
                        join cont in _appContext.CustomerContact on ca.CustomerContactId equals cont.CustomerContactId
                        join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                        from contt in conttt.DefaultIfEmpty()

                        join atasub in _appContext.ATASubChapter on ca.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                        from atasub in atasubchapter.DefaultIfEmpty()

                        where ca.CustomerContactATAMappingId == CustomerContactATAMappingId
                        select new
                        {
                            ca.AuditCustomerContactATAMappingId,
                            ca.CustomerContactATAMappingId,
                            ca.CustomerId,
                            ca.ATAChapterId,
                            ca.ATAChapterCode,
                            ca.ATAChapterName,
                            ca.ATASubChapterId,
                            ca.ATASubChapterDescription,
                            contt.FirstName,
                            contt.ContactId,
                            ca.UpdatedBy,
                            ca.UpdatedDate,
                            ca.CreatedBy,
                            ca.CreatedDate,
                            atasub.ATASubChapterCode

                        }).OrderByDescending(p => p.UpdatedDate).ToList();
            return data;
        }


        public IEnumerable<object> GetATAContactMapped(long contactId)
        {
            {

                var data = (from ca in _appContext.CustomerContactATAMapping
                            join atasub in _appContext.ATASubChapter on ca.ATASubChapterId equals atasub.ATASubChapterId into atasubg
                            from atasub in atasubg.DefaultIfEmpty()
                            where ca.CustomerContactId == contactId && ca.IsDeleted == false
                            select new
                            {
                                ca.CustomerContactATAMappingId,
                                ca.CustomerId,
                                ca.ATAChapterId,
                                ca.ATAChapterCode,
                                ca.ATAChapterName,
                                atasub.ATASubChapterCode,
                                ca.ATASubChapterId,
                                ca.ATASubChapterDescription


                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> GetTaxTypeRateMapped(long customerId)
        {


            var data = (from c in _appContext.CustomerTaxTypeRateMapping
                        join ty in _appContext.TaxType on c.TaxTypeId equals ty.TaxTypeId into tyy
                        from ty in tyy.DefaultIfEmpty()
                        join tr in _appContext.TaxRate on c.TaxRateId equals tr.TaxRateId into trr
                        from tr in trr.DefaultIfEmpty()
                        where c.CustomerId == customerId && c.IsDeleted == false
                        select new
                        {
                            c.CustomerTaxTypeRateMappingId,
                            c.CustomerId,
                            TaxType = ty.Description,
                            tr.TaxRate,
                            c.CreatedBy,
                            c.TaxRateId,
                            c.TaxTypeId,
                            c.MasterCompanyId
                        }).ToList();
            return data;

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
                if (model.IsPrimary == true)
                {
                    var customershipping = _appContext.CustomerInternationalShipping.Where(p => p.CustomerId == model.CustomerId && p.IsPrimary == true).ToList();

                    if (customershipping != null)
                    {
                        foreach (var item in customershipping)
                        {
                            item.IsPrimary = false;
                            item.UpdatedDate = DateTime.Now;
                            _appContext.CustomerInternationalShipping.Update(item);
                            _appContext.SaveChanges();
                        }
                    }
                }
                model.IsPrimary = model.IsPrimary;

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
                      var customershipping = _appContext.CustomerInternationalShipping.AsNoTracking().Where(p => p.CustomerId == model.CustomerId).ToList();

                if (model.IsPrimary == true)
                {

                    CustomerInternationalShipping ship = customershipping.Where(p => p.IsPrimary == true).FirstOrDefault();

                    if (ship != null && model.InternationalShippingId != ship.InternationalShippingId)
                    {

                        ship.IsPrimary = false;
                        ship.UpdatedDate = DateTime.Now;
                        _appContext.CustomerInternationalShipping.Update(ship);
                        _appContext.SaveChanges();

                    }
                }

                var shipping = customershipping.Where(p => p.InternationalShippingId == model.InternationalShippingId).FirstOrDefault();

                shipping.IsPrimary = model.IsPrimary;
                shipping.ExpirationDate = model.ExpirationDate;
                shipping.ExportLicense = model.ExportLicense;
                shipping.IsActive = model.IsActive;
                shipping.IsDeleted = model.IsDeleted;
                shipping.MasterCompanyId = model.MasterCompanyId;
                shipping.UpdatedBy = model.UpdatedBy;
                shipping.UpdatedDate = DateTime.Now;
                shipping.ShipToCountryId = model.ShipToCountryId;
                shipping.StartDate = model.StartDate;
                shipping.Amount = model.Amount;
                shipping.Description = model.Description;
                shipping.CustomerId = model.CustomerId;
                _appContext.CustomerInternationalShipping.Update(shipping);
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

        public IEnumerable<object> GetCustomerInternationalShippingDetails(long customerId)
        {
            var data = (from c in _appContext.CustomerInternationalShipping

                        join co in _appContext.Countries on c.ShipToCountryId equals co.countries_id into adc
                        from co in adc.DefaultIfEmpty()
                        where (c.IsDeleted != true && c.CustomerId == customerId)
                        select new
                        {

                            c.InternationalShippingId,
                            c.Amount,
                            c.StartDate,
                            c.ExpirationDate,
                            c.Description,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.CustomerId,
                            c.IsActive,
                            c.IsPrimary,
                            c.ExportLicense,
                            ShipToCountry = co.countries_name,
                            ShipToCountryId = co.countries_id,
                            c.CreatedBy,
                            c.UpdatedBy                            

                        }).OrderByDescending(c => c.CreatedDate).ToList();
            return data;
           
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
                if (model.IsPrimary == true)
                {
                    var customerContact = _appContext.ShippingViaDetails.Where(p => p.InternationalShippingId == model.InternationalShippingId && p.IsPrimary == true).FirstOrDefault();

                    if (customerContact != null)
                    {

                        customerContact.IsPrimary = false;
                        customerContact.UpdatedDate = DateTime.Now;
                        customerContact.UpdatedBy = model.UpdatedBy;
                        _appContext.ShippingViaDetails.Update(customerContact);
                        _appContext.SaveChanges();

                    }



                }


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


                if (model.IsPrimary == true)
                {
                    var customerContact = _appContext.ShippingViaDetails.AsNoTracking().Where(p => p.InternationalShippingId == model.InternationalShippingId && p.IsPrimary == true).FirstOrDefault();

                    if (customerContact != null && customerContact.ShippingViaDetailsId != model.ShippingViaDetailsId)
                    {

                        customerContact.IsPrimary = false;
                        customerContact.UpdatedDate = DateTime.Now;
                        customerContact.UpdatedBy = model.UpdatedBy;
                        _appContext.ShippingViaDetails.Update(customerContact);
                        _appContext.SaveChanges();

                    }



                }
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
                model.UpdatedBy = updatedBy;

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
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myAircraftModelId.Contains(cam.AircraftModelId) && myDashNumberId.Contains(cam.DashNumberId) && cam.Memo.Contains(memo) && cam.IsDeleted != true
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
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null && memo == null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myAircraftModelId.Contains(cam.AircraftModelId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && myAircraftModelId.Contains(cam.AircraftModelId) && cam.Memo.Contains(memo) && cam.IsDeleted != true
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
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && myAircraftTypeId.Contains(cam.AircraftTypeId) && cam.Memo.Contains(memo) && cam.IsDeleted != true
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
                            where cam.CustomerId == CustomerId && cam.Memo.Contains(memo) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftModelId != null && myDashNumberId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && cam.Memo.Contains(memo) && myAircraftModelId.Contains(cam.AircraftModelId) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftModelId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && cam.Memo.Contains(memo) && myAircraftModelId.Contains(cam.AircraftModelId) && cam.IsDeleted != true
                            select new { cam.CustomerAircraftMappingId, cam.CustomerId, cam.AircraftTypeId, cam.AircraftModelId, cam.DashNumberId, cam.DashNumber, cam.AircraftType, cam.AircraftModel, cam.Memo, cam.Inventory, cam.MasterCompanyId }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }

            else if (myDashNumberId != null && memo != null)
            {
                var data = (from cam in _appContext.CustomerAircraftMapping
                            where cam.CustomerId == CustomerId && cam.Memo.Contains(memo) && myDashNumberId.Contains(cam.DashNumberId) && cam.IsDeleted != true
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
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && myATASubChapterID.Contains(cATA.ATASubChapterId) && mycontactID.Contains(Convert.ToInt64(cont.ContactId)) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,
                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,

                                cATA.ATASubChapterId,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,
                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;
            }
            else if (ATAChapterId != null && ATASubChapterID == null && contactId == null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,
                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                cATA.ATASubChapterId,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;

            }
            else if (ATAChapterId != null && ATASubChapterID == null && contactId != null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && mycontactID.Contains(Convert.ToInt64(cont.ContactId)) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,
                                //cATA.ATAChapterName,
                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                cATA.ATASubChapterId,
                                // cATA.ATASubChapterDescription,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;

            }
            else if (ATAChapterId == null && ATASubChapterID != null && contactId != null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && myATASubChapterID.Contains(cATA.ATASubChapterId) && mycontactID.Contains(Convert.ToInt64(cont.ContactId)) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,

                                cATA.ATASubChapterId,

                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;

            }
            else if (ATAChapterId == null && ATASubChapterID != null && contactId == null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && myATASubChapterID.Contains(cATA.ATASubChapterId) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,

                                cATA.ATASubChapterId,

                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;

            }
            else if (ATAChapterId != null && ATASubChapterID != null && contactId == null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && myATAChapterId.Contains(cATA.ATAChapterId) && myATASubChapterID.Contains(cATA.ATASubChapterId) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,

                                cATA.ATASubChapterId,


                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;

            }
            else if (ATAChapterId == null && ATASubChapterID == null && contactId != null)
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && mycontactID.Contains(Convert.ToInt64(cont.ContactId)) && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,

                                cATA.ATASubChapterId,

                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                //var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return data;

            }
            else
            {
                var data = (from cATA in _appContext.CustomerContactATAMapping
                            join cont in _appContext.CustomerContact on cATA.CustomerContactId equals cont.CustomerContactId
                            join contt in _appContext.Contact on cont.ContactId equals contt.ContactId into conttt
                            from contt in conttt.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on cATA.ATASubChapterId equals atasub.ATASubChapterId into atasubchapter
                            from atasub in atasubchapter.DefaultIfEmpty()

                            where cATA.CustomerId == customerId && cATA.IsDeleted != true
                            select new
                            {
                                cATA.CustomerContactATAMappingId,
                                cATA.CustomerId,
                                cATA.ATAChapterId,
                                cATA.ATAChapterCode,

                                cATA.ATASubChapterId,

                                ATAChapterName = cATA.ATAChapterCode + " - " + cATA.ATAChapterName,
                                ATASubChapterDescription = atasub.ATASubChapterCode + " - " + cATA.ATASubChapterDescription,

                                contt.FirstName,
                                contt.ContactId
                            }).ToList();
                  return data;

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
                if (value == null)
                    value = "";
                var list = (from cust in _appContext.Customer

                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on cust.CustomerId equals cc.CustomerId into custcc
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
        public long AddCustomerShippingAddress(Customer objCustomer, bool flag = true)
        {

            long shippingAddressId = 0;
            if (flag == true)
            {
                CommonRepository commonRepository = new CommonRepository(_appContext);


                var custShipping = _appContext.CustomerShippingAddress.Where(p => p.CustomerId == objCustomer.CustomerId && p.IsPrimary == true).AsNoTracking().FirstOrDefault();
                CustomerShippingAddress data = _appContext.CustomerShippingAddress.Where(p => p.AddressId == objCustomer.AddressId && p.CustomerId == objCustomer.CustomerId).AsNoTracking().FirstOrDefault();

                if (data != null)
                {
                    if (custShipping != null && data.CustomerShippingAddressId != custShipping.CustomerShippingAddressId)
                    {
                        CustomerShippingAddress ba = new CustomerShippingAddress();

                        ba.CustomerShippingAddressId = custShipping.CustomerShippingAddressId;
                        ba.UpdatedDate = DateTime.Now;
                        ba.UpdatedBy = objCustomer.UpdatedBy;
                        ba.IsPrimary = false;

                        _appContext.CustomerShippingAddress.Attach(ba);
                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                        _appContext.SaveChanges();
                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custShipping.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), objCustomer.UpdatedBy);
                    }
                }
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
                        _appContext.SaveChanges();

                        shippingAddressId = Convert.ToInt64(data.CustomerShippingAddressId);
                    }
                }
                else
                {

                    if (custShipping != null)
                    {
                        CustomerShippingAddress ba = new CustomerShippingAddress();

                        ba.CustomerShippingAddressId = custShipping.CustomerShippingAddressId;
                        ba.UpdatedDate = DateTime.Now;
                        ba.UpdatedBy = objCustomer.UpdatedBy;
                        ba.IsPrimary = false;

                        _appContext.CustomerShippingAddress.Attach(ba);
                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                        _appContext.SaveChanges();
                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custShipping.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), objCustomer.UpdatedBy);
                    }
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
                    _appContext.SaveChanges();
                    shippingAddressId = Convert.ToInt64(objCustomerShippingAddress.CustomerShippingAddressId);


                }


                commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(shippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), objCustomer.UpdatedBy);
            }
            return shippingAddressId;
        }


        #endregion

        #region CustomerBillingAddress

        /// <summary>
        /// This method is implemented for CustomerBillingAddress Insert and Update
        /// Added By vijay on 12/11/2019
        /// </summary>
        /// <param name="objCustomer"></param>
        public long AddCustomerBillinggAddress(Customer objCustomer, bool flag = true)
        {
            long billingAddressId = 0;
            if (flag == true)
            {
                CommonRepository commonRepository = new CommonRepository(_appContext);

                var shippingList = _appContext.CustomerBillingAddress.AsNoTracking().Where(p => p.CustomerId == objCustomer.CustomerId).ToList();
                var custShipping = shippingList.Where(p => p.IsPrimary == true).FirstOrDefault();
                CustomerBillingAddress data = shippingList.Where(p => p.AddressId == objCustomer.AddressId).FirstOrDefault();
                if (data != null)
                {
                    if (custShipping != null && data != null && custShipping.CustomerBillingAddressId != data.CustomerBillingAddressId)
                    {
                        custShipping.IsPrimary = false;

                        CustomerBillingAddress ba = new CustomerBillingAddress();

                        ba.CustomerBillingAddressId = custShipping.CustomerBillingAddressId;
                        ba.UpdatedDate = DateTime.Now;
                        ba.UpdatedBy = objCustomer.UpdatedBy;
                        ba.IsPrimary = false;

                        _appContext.CustomerBillingAddress.Attach(ba);
                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                        _appContext.SaveChanges();

                        // _appContext.CustomerBillingAddress.Update(custShipping);
                        //  _appContext.SaveChanges();

                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custShipping.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), objCustomer.UpdatedBy);
                    }
                }



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
                        data.IsDeleted = false;
                        _appContext.CustomerBillingAddress.Update(data);
                        _appContext.SaveChanges();

                        billingAddressId = Convert.ToInt64(data.CustomerBillingAddressId);

                    }
                }
                else
                {
                    if (custShipping != null)
                    {
                        CustomerBillingAddress ba = new CustomerBillingAddress();

                        ba.CustomerBillingAddressId = custShipping.CustomerBillingAddressId;
                        ba.UpdatedDate = DateTime.Now;
                        ba.UpdatedBy = objCustomer.UpdatedBy;
                        ba.IsPrimary = false;

                        _appContext.CustomerBillingAddress.Attach(ba);
                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                        _appContext.SaveChanges();
                       
                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custShipping.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), objCustomer.UpdatedBy);
                    }

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
                    objCustomerBillingAddress.IsDeleted = false;

                    _appContext.CustomerBillingAddress.Add(objCustomerBillingAddress);
                    _appContext.SaveChanges();

                    billingAddressId = Convert.ToInt64(objCustomerBillingAddress.CustomerBillingAddressId);

                }
                commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(billingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), objCustomer.UpdatedBy);
            }
            return billingAddressId;


        }


        #endregion
        public void AddCustomecontact(Customer objCustomer)
        {
            CustomerContact data = _appContext.CustomerContact.AsNoTracking().Where(p => p.CustomerId == objCustomer.CustomerId).FirstOrDefault();
            if (data == null)
            {

                Contact contactObj = new Contact();
                objCustomer.MasterCompanyId = 1;

                    contactObj.Email = objCustomer.Email;
                  contactObj.FirstName = objCustomer.Name;
                contactObj.LastName = "NA";
                contactObj.Tag = "NA";

              
                contactObj.WorkPhone = objCustomer.CustomerPhone;
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

                    customercontactObj.IsDeleted = false;
                    _appContext.CustomerContact.Add(customercontactObj);


                    _appContext.SaveChanges();



                    CommonRepository commonRepository = new CommonRepository(_appContext);

                    commonRepository.ContactsHistory(Convert.ToInt64(objCustomer.CustomerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(customercontactObj.CustomerContactId), objCustomer.UpdatedBy);


                }
                // return objCustomerShippingAddress;
            }
        }
        public void AddVendorShippingAddress(Customer objCustomer, long vendorId, long addressId)
        {
            CommonRepository commonRepository = new CommonRepository(_appContext);

            VendorShippingAddress data = _appContext.VendorShippingAddress.AsNoTracking().Where(p => p.AddressId == addressId && p.VendorId == vendorId).FirstOrDefault();
            if (data != null)
            {
                if (data.VendorShippingAddressId > 0)
                {
                    data.VendorId = vendorId;
                    data.AddressId = addressId;
                    data.MasterCompanyId = objCustomer.MasterCompanyId;
                    data.SiteName = objCustomer.CustomerCode;
                    data.CreatedDate = DateTime.Now;
                    data.UpdatedDate = DateTime.Now;
                    data.CreatedBy = objCustomer.CreatedBy;
                    data.UpdatedBy = objCustomer.UpdatedBy;
                    data.IsActive = objCustomer.IsActive;
                    data.IsPrimary = true;
                    data.IsDeleted = false;
                    _appContext.VendorShippingAddress.Update(data);
                    _appContext.SaveChanges();
                    commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(data.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), data.UpdatedBy);

                }
            }
            else
            {
                VendorShippingAddress objCustomerShippingAddress = new VendorShippingAddress();

                objCustomerShippingAddress.VendorId = vendorId;
                objCustomerShippingAddress.AddressId = addressId;
                objCustomerShippingAddress.MasterCompanyId = objCustomer.MasterCompanyId;
                objCustomerShippingAddress.SiteName = objCustomer.CustomerCode;
                objCustomerShippingAddress.CreatedDate = DateTime.Now;
                objCustomerShippingAddress.UpdatedDate = DateTime.Now;
                objCustomerShippingAddress.CreatedBy = objCustomer.CreatedBy;
                objCustomerShippingAddress.UpdatedBy = objCustomer.UpdatedBy;
                objCustomerShippingAddress.IsActive = objCustomer.IsActive;
                objCustomerShippingAddress.IsPrimary = true;
                objCustomerShippingAddress.IsDeleted = false;

                _appContext.VendorShippingAddress.Add(objCustomerShippingAddress);
                _appContext.SaveChanges();
                commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomerShippingAddress.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objCustomerShippingAddress.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), objCustomerShippingAddress.UpdatedBy);

            }

            _appContext.SaveChanges();

            // return objCustomerShippingAddress;
        }
        public void AddVendorBillingAddress(Customer objCustomer, long vendorId, long addressId)
        {
            CommonRepository commonRepository = new CommonRepository(_appContext);

            VendorBillingAddress data = _appContext.VendorBillingAddress.AsNoTracking().Where(p => p.AddressId == addressId && p.VendorId == vendorId).FirstOrDefault();

            if (data != null)
            {
                if (data.VendorBillingAddressId > 0)
                {
                    data.VendorId = vendorId;
                    data.MasterCompanyId = Convert.ToInt32(objCustomer.MasterCompanyId);
                    data.AddressId = addressId;
                    data.SiteName = objCustomer.CustomerCode;
                    data.CreatedDate = DateTime.Now;
                    data.UpdatedDate = DateTime.Now;
                    data.CreatedBy = objCustomer.CreatedBy;
                    data.UpdatedBy = objCustomer.UpdatedBy;
                    data.IsPrimary = true;
                    data.IsActive = true;
                    data.IsDeleted = false;
                    _appContext.VendorBillingAddress.Update(data);
                    _appContext.SaveChanges();
                    commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(data.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), data.UpdatedBy);

                }
            }
            else
            {
                VendorBillingAddress objCustomerBillingAddress = new VendorBillingAddress();

                objCustomerBillingAddress.VendorId = vendorId;
                objCustomerBillingAddress.MasterCompanyId = Convert.ToInt32(objCustomer.MasterCompanyId);
                objCustomerBillingAddress.AddressId = addressId;
                objCustomerBillingAddress.SiteName = objCustomer.CustomerCode;
                objCustomerBillingAddress.CreatedDate = DateTime.Now;
                objCustomerBillingAddress.UpdatedDate = DateTime.Now;
                objCustomerBillingAddress.CreatedBy = objCustomer.CreatedBy;
                objCustomerBillingAddress.UpdatedBy = objCustomer.UpdatedBy;
                objCustomerBillingAddress.IsPrimary = true;
                objCustomerBillingAddress.IsActive = true;
                objCustomerBillingAddress.IsDeleted = false;

                _appContext.VendorBillingAddress.Add(objCustomerBillingAddress);
                _appContext.SaveChanges();
                commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objCustomerBillingAddress.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objCustomerBillingAddress.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), objCustomerBillingAddress.UpdatedBy);

            }

            _appContext.SaveChanges();


        }
        public void AddVendorContact(Customer objCustomer, long vendorId)
        {
            VendorContact data = _appContext.VendorContact.AsNoTracking().Where(p => p.VendorId == vendorId).FirstOrDefault();
            if (data == null)
            {

                Contact contactObj = new Contact();
                objCustomer.MasterCompanyId = 1;

                   contactObj.Email = objCustomer.Email;
                  contactObj.FirstName = objCustomer.Name;
                contactObj.LastName = "NA";
                contactObj.Tag = "NA";

               
                contactObj.WorkPhone = objCustomer.CustomerPhone;
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
                    VendorContact customercontactObj = new VendorContact();

                    customercontactObj.ContactId = contactId;
                    customercontactObj.VendorId = vendorId;
                    customercontactObj.IsDefaultContact = true;
                    customercontactObj.MasterCompanyId = 1;
                    customercontactObj.IsActive = objCustomer.IsActive;
                    customercontactObj.CreatedDate = DateTime.Now;
                    customercontactObj.UpdatedDate = DateTime.Now;
                    customercontactObj.CreatedBy = objCustomer.CreatedBy;
                    customercontactObj.UpdatedBy = objCustomer.UpdatedBy;


                    _appContext.VendorContact.Add(customercontactObj);


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
                       join Emp in _appContext.Employee on Convert.ToInt32(t.PrimarySalesPersonId) equals Emp.EmployeeId into Emplyee
                       from Emp in Emplyee.DefaultIfEmpty()


                       select new
                       {
                           ad,
                          PrimarySalesPersonFirstName=Emp.FirstName,
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
                model.UpdatedBy = updatedBy;
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
                model.UpdatedBy = updatedBy;

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
                              where cc.CustomerId == id && cc.IsDeleted != true
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
                                parentId=t.ParentId,
                                isParent=t.IsParent,
                                customerURL = t.CustomerURL,
                                generalCurrencyId = t.CurrencyId,
                                customerClassificationId = t.CustomerClassificationId,
                                contractReference = t.ContractReference,
                                isPBHCustomer = t.IsPBHCustomer,
                                pbhCustomerMemo = t.PBHCustomerMemo,
                                restrictPMA = t.RestrictPMA,
                                restrictBER = t.RestrictBER,
                                isCustomerAlsoVendor = t.IsCustomerAlsoVendor,
                               
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
                            join cont in _appContext.Countries on c.ShipToCountryId equals cont.countries_id into country
                            from cont in country.DefaultIfEmpty()

                            where c.CustomerId == customerId && c.InternationalShippingId == internationalShippingId
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
                                c.IsActive,
                                countryName = cont.countries_name,

                                c.MasterCompanyId
                            }).OrderByDescending(c => c.UpdatedDate).ToList();
                return data;
            }
        }
        public IEnumerable<object> GetAuditShippingViaDetailsById(long customerId, long internationalShippingId, long ShippingViaDetailsId)
        {
            var data = (from c in _appContext.ShippingViaDetailsAudit
                        where c.CustomerId == customerId && c.ShippingViaDetailsId == ShippingViaDetailsId && c.InternationalShippingId == internationalShippingId
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
                            c.MasterCompanyId,
                            c.IsActive,
                            c.IsPrimary,
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

        public IEnumerable<object> UploadCustomerBillingAddressCustomData(IFormFile file, long customerId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Address addr;
                CustomerBillingAddress bill;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.CustomerBillingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(3) != null && reader.GetValue(2) != null && reader.GetValue(4) != null && reader.GetValue(5) != null && reader.GetValue(6) != null)
                                    {

                                        addr = new Address();
                                        bill = new CustomerBillingAddress();
                                        if (reader.GetValue(0) != null)
                                            addr.Line1 = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null)
                                            addr.Line2 = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            addr.City = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            addr.StateOrProvince = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            addr.PostalCode = Convert.ToString(reader.GetValue(4));

                                        if (reader.GetValue(5) != null)
                                            countryName = Convert.ToString(reader.GetValue(5));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            addr.Country = country.countries_id.ToString();



                                            addr.MasterCompanyId = 1;
                                            addr.IsActive = true;

                                            addr.CreatedBy = addr.UpdatedBy = "System";
                                            addr.UpdatedDate = addr.CreatedDate = DateTime.Now;

                                            _appContext.Address.Add(addr);
                                            _appContext.SaveChanges();


                                            if (reader.GetValue(6) != null)
                                                bill.SiteName = Convert.ToString(reader.GetValue(6));
                                            var custShipping = _appContext.CustomerBillingAddress.AsNoTracking().Where(p => p.IsPrimary == true && p.CustomerId == customerId).FirstOrDefault();


                                            if (custShipping != null)
                                            {
                                                if (reader.GetValue(7) != null)
                                                {
                                                    if (reader.GetValue(7).ToString().ToLower() == "yes")
                                                    {
                                                        bill.IsPrimary = true;

                                                        custShipping.IsPrimary = false;

                                                        CustomerBillingAddress ba = new CustomerBillingAddress();

                                                        ba.CustomerBillingAddressId = custShipping.CustomerBillingAddressId;
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimary = false;


                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.CustomerBillingAddress.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                        //_appContext.CustomerBillingAddress.Update(custShipping);
                                                        _appContext.SaveChanges();

                                                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custShipping.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), "System");
                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        bill.IsPrimary = false;
                                                    }
                                                }
                                                else
                                                {
                                                    bill.IsPrimary = false;
                                                }

                                            }
                                            else
                                            {
                                                bill.IsPrimary = true;
                                            }
                                            bill.MasterCompanyId = 1;
                                            bill.CustomerId = customerId;
                                            bill.IsActive = true;
                                            bill.IsDeleted = false;

                                            bill.AddressId = addr.AddressId;
                                            bill.CreatedBy = bill.UpdatedBy = "System";
                                            bill.UpdatedDate = bill.CreatedDate = DateTime.Now;

                                            _appContext.Entry(bill).State = EntityState.Detached;

                                            _appContext.CustomerBillingAddress.Add(bill);
                                            _appContext.SaveChanges();
                                            commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(bill.CustomerBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), "System");
                                            _appContext.Entry(bill).State = EntityState.Detached;
                                        }


                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
                return obj;
            }
            catch (Exception ex)
            {

            }
            return obj;
        }


        public IEnumerable<object> UploadCustomerShippingAddressCustomData(IFormFile file, long customerId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Address addr;
                CustomerShippingAddress ship;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.CustomerShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(3) != null && reader.GetValue(2) != null && reader.GetValue(4) != null && reader.GetValue(5) != null && reader.GetValue(6) != null)
                                    {

                                        addr = new Address();
                                        ship = new CustomerShippingAddress();
                                        if (reader.GetValue(0) != null)
                                            addr.Line1 = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null)
                                            addr.Line2 = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            addr.City = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            addr.StateOrProvince = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            addr.PostalCode = Convert.ToString(reader.GetValue(4));

                                        if (reader.GetValue(5) != null)
                                            countryName = Convert.ToString(reader.GetValue(5));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            addr.Country = country.countries_id.ToString();



                                            addr.MasterCompanyId = 1;
                                            addr.IsActive = true;

                                            addr.CreatedBy = addr.UpdatedBy = "System";
                                            addr.UpdatedDate = addr.CreatedDate = DateTime.Now;

                                            _appContext.Address.Add(addr);
                                            _appContext.SaveChanges();


                                            if (reader.GetValue(6) != null)
                                                ship.SiteName = Convert.ToString(reader.GetValue(6));
                                            var custShipping = _appContext.CustomerShippingAddress.AsNoTracking().Where(p => p.IsPrimary == true && p.CustomerId == customerId).FirstOrDefault();


                                            if (custShipping != null)
                                            {
                                                if (reader.GetValue(7) != null)
                                                {
                                                    if (reader.GetValue(7).ToString().ToLower() == "yes")
                                                    {
                                                        ship.IsPrimary = true;

                                                        custShipping.IsPrimary = false;

                                                        CustomerShippingAddress ba = new CustomerShippingAddress();

                                                        ba.CustomerShippingAddressId = custShipping.CustomerShippingAddressId;
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimary = false;


                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.CustomerShippingAddress.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                        //_appContext.CustomerBillingAddress.Update(custShipping);
                                                        _appContext.SaveChanges();

                                                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custShipping.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), "System");
                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        ship.IsPrimary = false;
                                                    }
                                                }
                                                else
                                                {
                                                    ship.IsPrimary = false;
                                                }

                                            }
                                            else
                                            {
                                                ship.IsPrimary = true;
                                            }
                                            ship.MasterCompanyId = 1;
                                            ship.CustomerId = customerId;
                                            ship.IsActive = true;
                                            ship.IsDelete = false;

                                            ship.AddressId = addr.AddressId;
                                            ship.CreatedBy = ship.UpdatedBy = "System";
                                            ship.UpdatedDate = ship.CreatedDate = DateTime.Now;
                                            _appContext.Entry(ship).State = EntityState.Detached;

                                            _appContext.CustomerShippingAddress.Add(ship);
                                            _appContext.SaveChanges();

                                            commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(customerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(ship.CustomerShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), "System");
                                            _appContext.Entry(ship).State = EntityState.Detached;

                                        }

                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
                return obj;
            }
            catch (Exception ex)
            {

            }
            return obj;
        }
        public void UploadCustomerInternationalCustomData(IFormFile file, long customerId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();

            int count = 0;
            try
            {

                CustomerInternationalShipping ship;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.CustomerInternationalShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(4) != null)
                                    {

                                        ship = new CustomerInternationalShipping();
                                        if (reader.GetValue(0) != null)
                                            ship.ExportLicense = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null && reader.GetValue(1).GetType().Name == "DateTime")
                                            ship.StartDate = Convert.ToDateTime(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            ship.Description = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null && reader.GetValue(3).GetType().Name == "DateTime")
                                            ship.ExpirationDate = Convert.ToDateTime(reader.GetValue(3));
                                        if (reader.GetValue(5) != null && reader.GetValue(5).GetType().Name == "Double")
                                            ship.Amount = Convert.ToDecimal(reader.GetValue(5));

                                        if (reader.GetValue(4) != null)
                                            countryName = Convert.ToString(reader.GetValue(4));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            ship.ShipToCountryId = country.countries_id;

                                            var custShipping = _appContext.CustomerInternationalShipping.AsNoTracking().Where(p => p.IsPrimary == true && p.CustomerId == customerId).FirstOrDefault();


                                            if (custShipping != null)
                                            {
                                                if (reader.GetValue(6) != null)
                                                {
                                                    if (reader.GetValue(6).ToString().ToLower() == "yes")
                                                    {
                                                        ship.IsPrimary = true;

                                                        custShipping.IsPrimary = false;

                                                        CustomerInternationalShipping ba = new CustomerInternationalShipping();

                                                        ba.InternationalShippingId = custShipping.InternationalShippingId;
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimary = false;


                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.CustomerInternationalShipping.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                        //_appContext.CustomerBillingAddress.Update(custShipping);
                                                        _appContext.SaveChanges();

                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        ship.IsPrimary = false;
                                                    }
                                                }
                                                else
                                                {
                                                    ship.IsPrimary = false;
                                                }

                                            }
                                            else
                                            {
                                                ship.IsPrimary = true;
                                            }

                                            ship.MasterCompanyId = 1;
                                            ship.IsActive = true;
                                            ship.IsDeleted = false;
                                            //ship.IsPrimary = false;
                                            ship.CustomerId = customerId;
                                            ship.CreatedBy = ship.UpdatedBy = "System";
                                            ship.UpdatedDate = ship.CreatedDate = DateTime.Now;
                                            _appContext.Entry(ship).State = EntityState.Detached;
                                            _appContext.CustomerInternationalShipping.Add(ship);
                                            _appContext.SaveChanges();
                                            _appContext.Entry(ship).State = EntityState.Detached;

                                        }



                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }

        }

        public void UploadCustomerContactsCustomData(IFormFile file, long customerId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Contact cont;
                CustomerContact cCont;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.CustomerContact), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(2) != null && reader.GetValue(4) != null && reader.GetValue(7) != null && reader.GetValue(8) != null)
                                    {

                                        cont = new Contact();
                                        cCont = new CustomerContact();
                                        if (reader.GetValue(0) != null)
                                            cont.Tag = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null)
                                            cont.Prefix = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            cont.FirstName = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            cont.MiddleName = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            cont.LastName = Convert.ToString(reader.GetValue(4));
                                        if (reader.GetValue(5) != null)
                                            cont.Suffix = Convert.ToString(reader.GetValue(5));

                                        if (reader.GetValue(6) != null)
                                            cont.ContactTitle = Convert.ToString(reader.GetValue(6));

                                        if (reader.GetValue(7) != null)
                                            cont.Email = Convert.ToString(reader.GetValue(7));
                                        if (reader.GetValue(8) != null)
                                            cont.WorkPhone = Convert.ToString(reader.GetValue(8));
                                        if (reader.GetValue(9) != null)
                                            cont.WorkPhoneExtn = Convert.ToString(reader.GetValue(9));
                                        if (reader.GetValue(10) != null)
                                            cont.MobilePhone = Convert.ToString(reader.GetValue(10));
                                        if (reader.GetValue(11) != null)
                                            cont.AlternatePhone = Convert.ToString(reader.GetValue(11));
                                        if (reader.GetValue(12) != null)
                                            cont.Fax = Convert.ToString(reader.GetValue(12));
                                        if (reader.GetValue(13) != null)
                                            cont.Notes = Convert.ToString(reader.GetValue(13));
                                        if (reader.GetValue(14) != null)
                                            cont.WebsiteURL = Convert.ToString(reader.GetValue(14));


                                        cont.IsActive = true;
                                        cont.MasterCompanyId = 1;
                                        cont.CreatedBy = cont.UpdatedBy = "System";
                                        cont.UpdatedDate = cont.CreatedDate = DateTime.Now;

                                        _appContext.Contact.Add(cont);
                                        _appContext.SaveChanges();
                                        var custContact = _appContext.CustomerContact.AsNoTracking().Where(p => p.IsDefaultContact == true && p.CustomerId == customerId).FirstOrDefault();


                                        if (custContact != null)
                                        {
                                            if (reader.GetValue(15) != null)
                                            {
                                                if (reader.GetValue(15).ToString().ToLower() == "yes")
                                                {
                                                    cCont.IsDefaultContact = true;

                                                    custContact.IsDefaultContact = false;

                                                    CustomerContact ba = new CustomerContact();

                                                    ba.CustomerContactId = custContact.CustomerContactId;
                                                    ba.UpdatedDate = DateTime.Now;
                                                    ba.UpdatedBy = "System";
                                                    ba.IsDefaultContact = false;


                                                    _appContext.Entry(ba).State = EntityState.Detached;
                                                    _appContext.CustomerContact.Attach(ba);
                                                    _appContext.Entry(ba).Property(x => x.IsDefaultContact).IsModified = true;
                                                    _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                    _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                    //_appContext.CustomerBillingAddress.Update(custShipping);
                                                    _appContext.SaveChanges();
                                                    commonRepository.ContactsHistory(Convert.ToInt64(customerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(custContact.CustomerContactId), "System");

                                                    _appContext.Entry(ba).State = EntityState.Detached;

                                                }
                                                else
                                                {
                                                    cCont.IsDefaultContact = false;
                                                }
                                            }
                                            else
                                            {
                                                cCont.IsDefaultContact = false;
                                            }

                                        }
                                        else
                                        {
                                            cCont.IsDefaultContact = true;
                                        }


                                        cCont.MasterCompanyId = 1;
                                        cCont.CustomerId = customerId;
                                        cCont.IsActive = true;
                                        cCont.IsDeleted = false;
                                        //cCont.IsDefaultContact = false;
                                        cCont.ContactId = cont.ContactId;
                                        cCont.CreatedBy = cCont.UpdatedBy = "System";
                                        cCont.UpdatedDate = cCont.CreatedDate = DateTime.Now;
                                        _appContext.Entry(cCont).State = EntityState.Detached;
                                        _appContext.CustomerContact.Add(cCont);
                                        _appContext.SaveChanges();
                                        commonRepository.ContactsHistory(Convert.ToInt64(customerId), Convert.ToInt32(ModuleEnum.Customer), Convert.ToInt64(cCont.CustomerContactId), "System");

                                        _appContext.Entry(cCont).State = EntityState.Detached;
                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }

        }

        public IEnumerable<Object> GetInterShippingViaDetails(long internationalShippingId)
        {

            var data = (from cs in _appContext.ShippingViaDetails
                        join csa in _appContext.CustomerInternationalShipping on cs.InternationalShippingId equals csa.InternationalShippingId
                        where ((cs.InternationalShippingId == internationalShippingId) && (cs.IsDeleted == false || cs.IsDeleted == null))

                        // select new { t, ad, vt }).ToList();
                        select new
                        {

                            cs.ShippingViaDetailsId,
                            cs.Memo,
                            cs.ShipVia,
                            ShippingAccountInfo = cs.ShippingAccountInfo,
                            cs.ShippingURL,
                            cs.ShippingId,
                            cs.IsActive,
                            cs.CustomerId,
                            cs.InternationalShippingId,
                            cs.CreatedDate,
                            cs.UpdatedDate,
                            cs.IsPrimary,
                           


                        }).ToList();
            return data;




        }

        public IEnumerable<object> CustomerTaxTypeRateInfoAudit(long CustomerTaxTypeRateMappingId)
        {
            var data = (from c in _appContext.CustomerTaxTypeRateMappingAudit
                        join ty in _appContext.TaxType on c.TaxTypeId equals ty.TaxTypeId into tyy
                        from ty in tyy.DefaultIfEmpty()
                        join tr in _appContext.TaxRate on c.TaxRateId equals tr.TaxRateId into trr
                        from tr in trr.DefaultIfEmpty()
                        where c.CustomerTaxTypeRateMappingId == CustomerTaxTypeRateMappingId
                        select new
                        {
                            c.AuditCustomerTaxTypeRateMappingId,
                            c.CustomerTaxTypeRateMappingId,
                            c.CustomerId,
                            TaxType = ty.Description,
                            tr.TaxRate,
                            c.CreatedBy,
                            c.TaxRateId,
                            c.TaxTypeId,
                            c.MasterCompanyId,
                            c.UpdatedBy,
                            c.UpdatedDate
                        }).OrderByDescending(p => p.AuditCustomerTaxTypeRateMappingId).ToList();
            return data;
        }


    }
}
