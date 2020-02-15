using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;

namespace DAL.Repositories
{
   public  class LegalEntityRepository : Repository<DAL.Models.LegalEntity>, ILegalEntity
    {
        public LegalEntityRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<object> GetList(Common.Filters<LegalEntityFilters> entityFilters)
        {
            if (entityFilters.filters == null)
                entityFilters.filters = new LegalEntityFilters();
            var pageNumber = entityFilters.first + 1;
            var pageSize = entityFilters.rows;

            string sortColumn = string.Empty;

            var sorts = new Sorts<LegalEntityFilters>();

            if (string.IsNullOrEmpty(entityFilters.SortField))
            {
                sortColumn = "createdDate";
                entityFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = entityFilters.SortField;
            }

            var propertyInfo = typeof(LegalEntityFilters).GetProperty(sortColumn);

            if (entityFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }
            var totalRecords = (from t in _appContext.LegalEntity
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                                from ad in add.DefaultIfEmpty()
                                join cc in _appContext.LegalEntityContact.Where(p => p.IsDefaultContact == true) on t.LegalEntityId equals cc.LegalEntityId into custinfo
                                from custContacts in custinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                from contacts in contactInfo.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)
                                //&& t.Name.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.name) ? LegalEntityFilters.filters.name : t.Name))
                                //&& t.LegalEntityCode.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.LegalEntityCode) ? LegalEntityFilters.filters.LegalEntityCode : t.LegalEntityCode))
                                //&& t.Email.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.email) ? LegalEntityFilters.filters.email : t.Email))
                                //&& type.Description.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.accountType) ? LegalEntityFilters.filters.accountType : type.Description))
                                //&& AccountTyp.description.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.LegalEntityType) ? LegalEntityFilters.filters.LegalEntityType : AccountTyp.description))

                                //&& ct.Description.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.LegalEntityClassification) ? LegalEntityFilters.filters.LegalEntityClassification : ct.Description))
                                //&& ad.City.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.city) ? LegalEntityFilters.filters.city : ad.City))
                                //&& ad.StateOrProvince.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.stateOrProvince) ? LegalEntityFilters.filters.stateOrProvince : ad.StateOrProvince))
                                //  && t.LegalEntityPhone.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.contact) ? LegalEntityFilters.filters.contact : t.LegalEntityPhone))
                                //&& LegalEntityFilters.filters.salesPersonPrimary == null ? string.IsNullOrEmpty(t.PrimarySalesPersonFirstName) || t.PrimarySalesPersonFirstName != null :
                                //         t.PrimarySalesPersonFirstName.Contains(LegalEntityFilters.filters.salesPersonPrimary)
                                select new
                                {
                                    t.LegalEntityId,
                                   // Contact = t.LegalEntityPhone == null ? "-" : t.LegalEntityPhone,

                                }).Distinct().Count();

            var data = (from t in _appContext.LegalEntity
                        join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                        from ad in add.DefaultIfEmpty()
                        join cc in _appContext.LegalEntityContact.Where(p => p.IsDefaultContact == true) on t.LegalEntityId equals cc.LegalEntityId into custinfo
                        from custContacts in custinfo.DefaultIfEmpty()
                        join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                        from contacts in contactInfo.DefaultIfEmpty()
                        where (t.IsDeleted == false || t.IsDeleted == null)
                        //&& t.Name.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.name) ? LegalEntityFilters.filters.name : t.Name))
                        //&& t.LegalEntityCode.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.LegalEntityCode) ? LegalEntityFilters.filters.LegalEntityCode : t.LegalEntityCode))
                        //&& t.Email.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.email) ? LegalEntityFilters.filters.email : t.Email))
                        //&& type.Description.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.accountType) ? LegalEntityFilters.filters.accountType : type.Description))
                        //&& AccountTyp.description.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.LegalEntityType) ? LegalEntityFilters.filters.LegalEntityType : AccountTyp.description))

                        //&& ct.Description.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.LegalEntityClassification) ? LegalEntityFilters.filters.LegalEntityClassification : ct.Description))
                        //&& ad.City.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.city) ? LegalEntityFilters.filters.city : ad.City))
                        //&& ad.StateOrProvince.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.stateOrProvince) ? LegalEntityFilters.filters.stateOrProvince : ad.StateOrProvince))
                        //  && t.LegalEntityPhone.Contains((!String.IsNullOrEmpty(LegalEntityFilters.filters.contact) ? LegalEntityFilters.filters.contact : t.LegalEntityPhone))
                        //&& LegalEntityFilters.filters.salesPersonPrimary == null ? string.IsNullOrEmpty(t.PrimarySalesPersonFirstName) || t.PrimarySalesPersonFirstName != null :
                        //         t.PrimarySalesPersonFirstName.Contains(LegalEntityFilters.filters.salesPersonPrimary)
                        select new LegalEntityFilters()
                        {
                            LegalEntityId = t.LegalEntityId,
                            createdDate = t.CreatedDate,
                            isActive = t.IsActive,
                            isDeleted = t.IsDeleted,
                            totalRecords = totalRecords
                        }).Distinct()
                        .Paginate(pageNumber, pageSize, sorts).Results;
            return (data);
        }

        public IEnumerable<object> GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {

            var pageNumbers = pageNumber + 1;
            var take = pageSize;
            var skip = take * (pageNumbers - 1);

            if (!string.IsNullOrEmpty(value))
            {
                var totalRecords = (from t in _appContext.LegalEntity
                                    join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                    join cc in _appContext.LegalEntityContact.Where(p => p.IsDefaultContact == true) on t.LegalEntityId equals cc.LegalEntityId into custinfo
                                    from custContacts in custinfo.DefaultIfEmpty()
                                    join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                    from contacts in contactInfo.DefaultIfEmpty()
                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    //&& t.Name.Contains(value) || t.LegalEntityCode.Contains(value) || t.Email.Contains(value)
                                    //|| type.Description.Contains(value) || ct.Description.Contains(value)
                                    //|| ad.City.Contains(value) || ad.StateOrProvince.Contains(value)
                                    //|| contacts.WorkPhone.Contains(value) || t.PrimarySalesPersonFirstName.Contains(value)
                                    select new
                                    {
                                        t.LegalEntityId,

                                    }).Count();

                var data = (from t in _appContext.LegalEntity
                           
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cc in _appContext.LegalEntityContact.Where(p => p.IsDefaultContact == true) on t.LegalEntityId equals cc.LegalEntityId into custinfo
                            from custContacts in custinfo.DefaultIfEmpty()
                            join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                            from contacts in contactInfo.DefaultIfEmpty()
                            //where (t.IsDeleted == false || t.IsDeleted == null)
                            //       && t.Name.Contains(value) || t.LegalEntityCode.Contains(value) || t.Email.Contains(value)
                            //       || type.Description.Contains(value) || ct.Description.Contains(value)
                            //       || ad.City.Contains(value) || ad.StateOrProvince.Contains(value)
                            //       || contacts.WorkPhone.Contains(value) || t.PrimarySalesPersonFirstName.Contains(value)
                            select new
                            {
                                t.LegalEntityId,
                                t.Name,
                                ad.City,
                                ad.StateOrProvince,
                                Contact = contacts.WorkPhone == null ? "-" : contacts.WorkPhone,
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
                var totalRecords = (from t in _appContext.LegalEntity
                                    join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                    join cc in _appContext.LegalEntityContact.Where(p => p.IsDefaultContact == true) on t.LegalEntityId equals cc.LegalEntityId into custinfo
                                    from custContacts in custinfo.DefaultIfEmpty()
                                    join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                                    from contacts in contactInfo.DefaultIfEmpty()
                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    select new
                                    {
                                        t.LegalEntityId,

                                    }).Count();

                var data = (from t in _appContext.LegalEntity
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cc in _appContext.LegalEntityContact.Where(p => p.IsDefaultContact == true) on t.LegalEntityId equals cc.LegalEntityId into custinfo
                            from custContacts in custinfo.DefaultIfEmpty()
                            join con in _appContext.Contact on custContacts.ContactId equals con.ContactId into contactInfo
                            from contacts in contactInfo.DefaultIfEmpty()
                            where (t.IsDeleted == false || t.IsDeleted == null)
                            select new
                            {
                                t.LegalEntityId,
                                t.Name,
                                ad.City,
                                ad.StateOrProvince,
                                Contact = contacts.WorkPhone == null ? "-" : contacts.WorkPhone,
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

        public IEnumerable<object> GetParentEntities()
        {
            var data = (from legal in _appContext.LegalEntity
                        where legal.ParentId == null
                        select new
                        {
                            parentId = legal.LegalEntityId,
                            legal.Name,
                            legal.Description,
                            legal.LedgerName,

                        }).OrderByDescending(p => p.Name).ToList();
            return data;
        }

        public IEnumerable<object> GetAllLegalEntityData()
        {
            var data = (from legal in _appContext.LegalEntity
                        join adress in _appContext.Address on legal.AddressId equals adress.AddressId into addd
                        from adress in addd.DefaultIfEmpty()
                        //join lockbox in _appContext.Address on legal.LockBoxAddressId equals lockbox.AddressId into loc
                        //from lockbox in loc.DefaultIfEmpty()
                        //join domestic in _appContext.DomesticWirePayment on legal.DomesticWirePaymentId equals domestic.DomesticWirePaymentId into domes
                        //from domestic in domes.DefaultIfEmpty()
                        //join international in _appContext.InternationalWirePayment on legal.InternationalWirePaymentId equals international.InternationalWirePaymentId into inter
                        //from international in inter.DefaultIfEmpty()
                        join ach in _appContext.ACH on legal.ACHId equals ach.ACHId into ac
                        from ach in ac.DefaultIfEmpty()
                        join curr in _appContext.Currency on legal.FunctionalCurrencyId equals curr.CurrencyId into currCode
                        from curr in currCode.DefaultIfEmpty()
                            //where legal.IsDeleted == true || legal.IsDeleted == null
                        where legal.IsActive == true
                        select new
                        {
                            legal.LegalEntityId,
                            legal.Name,
                            legal.Description,
                            legal.DoingLegalAs,
                            legal.ParentId,
                            phoneNumber1 = legal.PhoneNumber1,
                            faxNumber = legal.FaxNumber,
                            legal.IsBalancingEntity,
                            legal.CageCode,
                            legal.FAALicense,
                            legal.TaxId,
                           // legal.IsLastLevel,
                            legal.MasterCompanyId,
                            legal.IsActive,
                            legal.IsDeleted,
                            legal.FunctionalCurrencyId,
                            legal.ReportingCurrencyId,
                           // legal.IsBankingInfo,
                            legal.LedgerName,

                            CurrencyCode = curr.DisplayName,

                            address1 = adress.Line1,
                            address2 = adress.Line2,
                            city = adress.City,
                            stateOrProvince = adress.StateOrProvince,
                            postalCode = adress.PostalCode,
                            country = adress.Country,

                            //poBox = lockbox.PoBox,
                            //bankStreetaddress1 = lockbox.Line1,
                            //bankStreetaddress2 = lockbox.Line2,
                            //bankCity = lockbox.City,
                            //bankProvince = lockbox.StateOrProvince,
                            //bankcountry = lockbox.Country,
                            //bankpostalCode = lockbox.PostalCode,

                            //domesticBankName = domestic.BankName,
                            //domesticIntermediateBank = domestic.IntermediaryBankName,
                            //domesticBenficiaryBankName = domestic.BenificiaryBankName,
                            //domesticBankAccountNumber = domestic.AccountNumber,
                            //domesticABANumber = domestic.ABA,

                            //internationalBankName = international.BankName,
                            //internationalIntermediateBank = international.IntermediaryBank,
                            //internationalBenficiaryBankName = international.BeneficiaryBank,
                            //internationalBankAccountNumber = international.BeneficiaryBankAccount,
                            //internationalSWIFTID = international.SwiftCode,

                            achBankName = ach.BankName,
                            achIntermediateBank = ach.IntermediateBankName,
                            achBenficiaryBankName = ach.BeneficiaryBankName,
                            achBankAccountNumber = ach.AccountNumber,
                            achABANumber = ach.ABA,
                            achSWIFTID = ach.SwiftCode,

                            legal.CreatedBy,
                            legal.CreatedDate,
                            legal.UpdatedBy,
                            legal.UpdatedDate

                        }).OrderByDescending(p=>p.UpdatedDate).ToList();
            return data;
        }

        public object GetEntityDataById(long entityId)
        {
            var result = (from t in _appContext.LegalEntity
                          join ad in _appContext.Address on t.AddressId equals ad.AddressId
                          join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                          from cont in country.DefaultIfEmpty()
                          join cu in _appContext.Currency on t.ReportingCurrencyId equals cu.CurrencyId into cuu
                          from cu in cuu.DefaultIfEmpty()
                          join funcCur in _appContext.Currency on t.FunctionalCurrencyId equals funcCur.CurrencyId into repCur
                          from cfuncCur in repCur.DefaultIfEmpty()
                          where (t.IsDeleted == false || t.IsDeleted == null) && t.LegalEntityId == entityId
                          select new
                          {
                              t,
                              Address1 = ad.Line1,
                              Address2 = ad.Line2,
                              ad.City,
                              ad.StateOrProvince,
                              ad.PostalCode,
                              Country = cont.countries_name,
                              CountryId = cont.countries_id,
                              currency = cu.Symbol,
                          }).FirstOrDefault();
            return result;
        }

        public long CreateLegalEntityBillingAddress(LegalEntityBillingAddress billingAddress)
        {
            try
            {

                Address address = new Address();

                address.City = billingAddress.City;
                address.Country = billingAddress.Country;
                address.Line1 = billingAddress.Address1;
                address.Line2 = billingAddress.Address2;
                address.Line3 = billingAddress.Address3;
                address.MasterCompanyId = billingAddress.MasterCompanyId;
                address.PostalCode = billingAddress.PostalCode;
                address.StateOrProvince = billingAddress.StateOrProvince;
                address.IsActive = true;
                address.UpdatedDate = DateTime.Now;
                address.CreatedBy = billingAddress.CreatedBy;
                address.UpdatedBy = billingAddress.UpdatedBy;

                if (billingAddress.AddressId > 0)
                {
                    address.CreatedDate = billingAddress.CreatedDate;
                    address.AddressId = billingAddress.AddressId;
                    _appContext.Address.Update(address);
                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _appContext.Address.Add(address);
                }

                _appContext.SaveChanges();


                billingAddress.AddressId = Convert.ToInt64(address.AddressId);

                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.IsActive = true;
                billingAddress.IsDeleted = false;
                billingAddress.IsPrimary = false;

                if (billingAddress.LegalEntityBillingAddressId > 0)
                {
                    _appContext.LegalEntityBillingAddress.Update(billingAddress);
                }
                else
                {
                    billingAddress.CreatedDate = DateTime.Now;
                    _appContext.LegalEntityBillingAddress.Add(billingAddress);
                }

                _appContext.SaveChanges();
                return billingAddress.LegalEntityBillingAddressId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateLegalEntityBillingAddress(LegalEntityBillingAddress billingAddress)
        {
            try
            {
                billingAddress.UpdatedDate = DateTime.Now;
                _appContext.LegalEntityBillingAddress.Update(billingAddress);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteLegalEntityBillingAddress(long billingAddressId, string updatedBy)
        {
            try
            {
                LegalEntityBillingAddress billingAddress = new LegalEntityBillingAddress();
                billingAddress.LegalEntityBillingAddressId = billingAddressId;
                billingAddress.IsDeleted = true;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.LegalEntityBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void LegalEntityBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            try
            {
                LegalEntityBillingAddress billingAddress = new LegalEntityBillingAddress();
                billingAddress.LegalEntityBillingAddressId = billingAddressId;
                billingAddress.IsActive = status;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.LegalEntityBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetLegalEntityBillingAddress()
        {
            try
            {
                var list = (from vba in _appContext.LegalEntityBillingAddress
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object LegalEntityBillingAddressById(long billingAddressId)
        {
            try
            {
                var data = (from vba in _appContext.LegalEntityBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.LegalEntityBillingAddressId == billingAddressId
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long CreateLegalEntityShippingAddress(LegalEntityShippingAddress shippingAddress)
        {
            try
            {

                Address address = new Address();

                address.City = shippingAddress.City;
                address.Country = shippingAddress.Country;
                address.Line1 = shippingAddress.Address1;
                address.Line2 = shippingAddress.Address2;
                address.Line3 = shippingAddress.Address3;
                address.MasterCompanyId = shippingAddress.MasterCompanyId;
                address.PostalCode = shippingAddress.PostalCode;
                address.StateOrProvince = shippingAddress.StateOrProvince;
                address.IsActive = true;
                address.UpdatedDate = DateTime.Now;
                address.CreatedBy = shippingAddress.CreatedBy;
                address.UpdatedBy = shippingAddress.UpdatedBy;


                if (shippingAddress.AddressId > 0)
                {
                    address.CreatedDate = shippingAddress.CreatedDate;
                    address.AddressId = shippingAddress.AddressId;
                    _appContext.Address.Update(address);
                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _appContext.Address.Add(address);
                }

                _appContext.SaveChanges();


                shippingAddress.AddressId = Convert.ToInt64(address.AddressId);

                shippingAddress.UpdatedDate = DateTime.Now;
                shippingAddress.IsActive = true;
                shippingAddress.IsDeleted = false;
                shippingAddress.IsPrimary = false;

                if (shippingAddress.LegalEntityShippingAddressId > 0)
                {
                    _appContext.LegalEntityShippingAddress.Update(shippingAddress);
                }
                else
                {
                    shippingAddress.CreatedDate = DateTime.Now;
                    _appContext.LegalEntityShippingAddress.Add(shippingAddress);
                }

                _appContext.SaveChanges();


                return shippingAddress.LegalEntityShippingAddressId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateLegalEntityShippingAddress(LegalEntityShippingAddress ShippingAddress)
        {
            try
            {
                ShippingAddress.UpdatedDate = DateTime.Now;
                _appContext.LegalEntityShippingAddress.Update(ShippingAddress);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteLegalEntityShippingAddress(long shippingAddressId, string updatedBy)
        {
            try
            {
                LegalEntityShippingAddress ShippingAddress = new LegalEntityShippingAddress();
                ShippingAddress.LegalEntityShippingAddressId = shippingAddressId;
                ShippingAddress.IsDeleted = true;
                ShippingAddress.UpdatedDate = DateTime.Now;
                ShippingAddress.UpdatedBy = updatedBy;

                _appContext.LegalEntityShippingAddress.Attach(ShippingAddress);

                _appContext.Entry(ShippingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void LegalEntityShippingAddressStatus(long shippingAddressId, bool status, string updatedBy)
        {
            try
            {
                LegalEntityShippingAddress ShippingAddress = new LegalEntityShippingAddress();
                ShippingAddress.LegalEntityShippingAddressId = shippingAddressId;
                ShippingAddress.IsActive = status;
                ShippingAddress.UpdatedDate = DateTime.Now;
                ShippingAddress.UpdatedBy = updatedBy;

                _appContext.LegalEntityShippingAddress.Attach(ShippingAddress);

                _appContext.Entry(ShippingAddress).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(ShippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetLegalEntityShippingAddress()
        {
            try
            {
                var list = (from vba in _appContext.LegalEntityShippingAddress
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object LegalEntityShippingAddressById(long shippingAddressId)
        {
            try
            {
                var data = (from vba in _appContext.LegalEntityShippingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.LegalEntityShippingAddressId == shippingAddressId
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetLegalEntitySiteNames(long legalEntityId)
        {
            try
            {
                var list = (from lba in _appContext.LegalEntityBillingAddress
                            where lba.IsDeleted == false && lba.LegalEntityId == legalEntityId
                            select new
                            {
                                lba.LegalEntityBillingAddressId,
                                lba.SiteName
                            }).OrderBy(p => p.SiteName).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetChildEntitiesByParentId(long parentId)
        {
            try
            {
                var list = (from lba in _appContext.LegalEntity
                            where (lba.IsDeleted == false || lba.IsDeleted == null) && (lba.ParentId == parentId)
                            select new
                            {
                                lba.LegalEntityId,
                                lba.Description,
                                lba.Name,
                            }).OrderBy(p => p.LegalEntityId).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object GetLegalEntityAddress(long addressId)
        {
            try
            {
                var data = (from lba in _appContext.LegalEntityBillingAddress
                            join ad in _appContext.Address on lba.AddressId equals ad.AddressId
                            where lba.LegalEntityBillingAddressId == addressId
                            select new
                            {
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetLegalEntityContacts(long legalEntityId)
        {
            try
            {
                var list = (from le in _appContext.LegalEntityContact
                            join con in _appContext.Contact on le.ContactId equals con.ContactId
                            where le.IsDeleted == false && le.LegalEntityId == legalEntityId
                            select new
                            {
                                con.ContactId,
                                con.FirstName,
                                con.LastName,
                                con.MiddleName,
                                con.WorkPhone
                            }).OrderBy(p => p.FirstName).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<object> GetLegalEntityShippingSiteNames(long legalEntityId)
        {
            try
            {
                var list = (from lsa in _appContext.LegalEntityShippingAddress
                            where lsa.IsDeleted == false && lsa.LegalEntityId == legalEntityId
                            select new
                            {
                                lsa.LegalEntityShippingAddressId,
                                lsa.SiteName
                            }).OrderBy(p => p.SiteName).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object GetLegalEntityShippingAddress(long addressId)
        {
            try
            {
                var data = (from lsa in _appContext.LegalEntityShippingAddress
                            join ad in _appContext.Address on lsa.AddressId equals ad.AddressId
                            where lsa.LegalEntityShippingAddressId == addressId
                            select new
                            {
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetLegalEntityAddressById(long legalEntityId)
        {
            try
            {
                var data = (from lsa in _appContext.LegalEntityShippingAddress
                            join ad in _appContext.Address on lsa.AddressId equals ad.AddressId
                            where lsa.LegalEntityId == legalEntityId
                            select new
                            {
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                ad.AddressId
                            }).Distinct().ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private AppSettings AppSettings { get; set; }

        public IEnumerable<object> GetLegalEntityShipviaDetails(long entityId, long addressId)
        {
            try
            {
                var list = (from csv in _appContext.LegalEntityShipping
                            where csv.LegalEntityId == entityId && csv.LegalEntityShippingAddressId == addressId
                            select new
                            {
                                csv.LegalEntityShippingId,
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

        public void LegalEntityShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            try
            {
                LegalEntityShippingAddress model = new LegalEntityShippingAddress();
                model.LegalEntityShippingAddressId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;
                model.UpdatedBy = updatedBy;
                _appContext.LegalEntityShippingAddress.Attach(model);
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
                LegalEntityShipping model = new LegalEntityShipping();
                model.LegalEntityShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.LegalEntityShipping.Attach(model);

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

        public void LegalEntityShippingDetailsViaStatus(long id, bool status, string updatedBy)
        {
            try
            {
                LegalEntityShipping model = new LegalEntityShipping();
                model.LegalEntityShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;

                _appContext.LegalEntityShipping.Attach(model);

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

        public IEnumerable<object> GetLegalEntityAuditHistoryByid(long entityId)
        {

            {
                var data = (from t in _appContext.LegalEntityAudit
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId into add
                            from ad in add.DefaultIfEmpty()
                            join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                            from cont in country.DefaultIfEmpty()
                            where t.LegalEntityId == entityId 
                            select new
                            {
                                t,
                                t.UpdatedDate
                            }).OrderByDescending(a => a.UpdatedDate).ToList();
                return data;
            }

        }

        public IEnumerable<object> GetLegalEntityInternationalShippingAuditHistoryByid(long legalEntityId, long internationalShippingId)
        {
            {

                var data = (from c in _appContext.LegalEntityInternationalShippingAudit
                            where c.LegalEntityId == legalEntityId && c.InternationalShippingId == internationalShippingId
                            select new
                            {
                                c.InternationalShippingId,
                                c.AuditInternationalShippingId,
                                c.LegalEntityId,
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
        public IEnumerable<object> UploadLegalEntityBillingAddressCustomData(IFormFile file, long legalEntityId)
        {
            string legalEntityName = string.Empty;
            List<object> obj = new List<object>();

            int count = 0;
            try
            {
                Address addr;
                LegalEntityBillingAddress bill;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.LegalEntityBillingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                        bill = new LegalEntityBillingAddress();
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
                                            legalEntityName = Convert.ToString(reader.GetValue(5));
                                        var country = _appContext.Countries.Where(p => p.countries_name == legalEntityName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            addr.Country = country.countries_id.ToString();
                                        }
                                        addr.MasterCompanyId = 1;
                                        addr.IsActive = true;
                                        addr.CreatedBy = addr.UpdatedBy = "System";
                                        addr.UpdatedDate = addr.CreatedDate = DateTime.Now;
                                        _appContext.Address.Add(addr);
                                        _appContext.SaveChanges();

                                        if (reader.GetValue(6) != null)
                                            bill.SiteName = Convert.ToString(reader.GetValue(6));

                                        bill.MasterCompanyId = 1;
                                        bill.LegalEntityId = legalEntityId;
                                        bill.IsActive = true;
                                        bill.IsDeleted = false;
                                        bill.IsPrimary = false;
                                        bill.AddressId = addr.AddressId;
                                        bill.CreatedBy = bill.UpdatedBy = "System";
                                        bill.UpdatedDate = bill.CreatedDate = DateTime.Now;
                                        _appContext.LegalEntityBillingAddress.Add(bill);
                                        _appContext.SaveChanges();
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
        public IEnumerable<object> UploadLegalEntityShippingAddressCustomData(IFormFile file, long legalEntityId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();

            int count = 0;
            try
            {
                Address addr;
                LegalEntityShippingAddress ship;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.LegalEntityShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                        ship = new LegalEntityShippingAddress();
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
                                        }
                                        addr.MasterCompanyId = 1;
                                        addr.IsActive = true;
                                        addr.CreatedBy = addr.UpdatedBy = "System";
                                        addr.UpdatedDate = addr.CreatedDate = DateTime.Now;

                                        _appContext.Address.Add(addr);
                                        _appContext.SaveChanges();
                                        if (reader.GetValue(6) != null)
                                            ship.SiteName = Convert.ToString(reader.GetValue(6));
                                        ship.MasterCompanyId = 1;
                                        ship.LegalEntityId = legalEntityId;
                                        ship.IsActive = true;
                                        ship.IsDeleted = false;
                                        ship.IsPrimary = false;
                                        ship.AddressId = addr.AddressId;
                                        ship.CreatedBy = ship.UpdatedBy = "System";
                                        ship.UpdatedDate = ship.CreatedDate = DateTime.Now;
                                        _appContext.LegalEntityShippingAddress.Add(ship);
                                        _appContext.SaveChanges();
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
        public void UploadLegalEntityInternationalCustomData(IFormFile file, long legalEntityId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();

            int count = 0;
            try
            {
                LegalEntityInternationalShipping ship;
                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.LegalEntityInternationalShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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

                                        ship = new LegalEntityInternationalShipping();
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
                                            ship.MasterCompanyId = 1;
                                            ship.IsActive = true;
                                            ship.IsDeleted = false;
                                            ship.IsPrimary = false;
                                            ship.LegalEntityId = legalEntityId;
                                            ship.CreatedBy = ship.UpdatedBy = "System";
                                            ship.UpdatedDate = ship.CreatedDate = DateTime.Now;
                                            _appContext.LegalEntityInternationalShipping.Add(ship);
                                            _appContext.SaveChanges();
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
        public void UploadLegalEntityContactsCustomData(IFormFile file, long legalEntityId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();
            int count = 0;

            try
            {
                Contact cont;
                LegalEntityContact legalCont;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(Common.ModuleEnum.LegalEntity), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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

                                        cont = new Contact();
                                        legalCont = new LegalEntityContact();
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
                                            cont.ContactTitle = Convert.ToString(reader.GetValue(5));

                                        if (reader.GetValue(6) != null)
                                            cont.Email = Convert.ToString(reader.GetValue(6));
                                        if (reader.GetValue(7) != null)
                                            cont.WorkPhone = Convert.ToString(reader.GetValue(7));
                                        if (reader.GetValue(8) != null)
                                            cont.WorkPhoneExtn = Convert.ToString(reader.GetValue(8));
                                        if (reader.GetValue(9) != null)
                                            cont.MobilePhone = Convert.ToString(reader.GetValue(9));
                                        if (reader.GetValue(10) != null)
                                            cont.AlternatePhone = Convert.ToString(reader.GetValue(10));
                                        if (reader.GetValue(11) != null)
                                            cont.Fax = Convert.ToString(reader.GetValue(11));
                                        if (reader.GetValue(12) != null)
                                            cont.Notes = Convert.ToString(reader.GetValue(12));

                                        cont.IsActive = true;
                                        cont.MasterCompanyId = 1;
                                        cont.CreatedBy = cont.UpdatedBy = "System";
                                        cont.UpdatedDate = cont.CreatedDate = DateTime.Now;
                                        _appContext.Contact.Add(cont);
                                        _appContext.SaveChanges();
                                        legalCont.MasterCompanyId = 1;
                                        legalCont.LegalEntityId = legalEntityId;
                                        legalCont.IsActive = true;
                                        legalCont.IsDeleted = false;
                                        legalCont.IsDefaultContact = false;
                                        legalCont.ContactId = legalCont.ContactId;
                                        legalCont.CreatedBy = legalCont.UpdatedBy = "System";
                                        legalCont.UpdatedDate = legalCont.CreatedDate = DateTime.Now;
                                        _appContext.LegalEntityContact.Add(legalCont);
                                        _appContext.SaveChanges();
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
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

}
