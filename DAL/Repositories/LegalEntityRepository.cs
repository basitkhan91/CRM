using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    class LegalEntityRepository : Repository<DAL.Models.LegalEntity>, ILegalEntity
    {
        public LegalEntityRepository(ApplicationDbContext context) : base(context)
        { }

        //public IEnumerable<DAL.Models.LegalEntity> GetAllLegalEntityData()
        //{
        //    return _appContext.LegalEntity.Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.LegalEntityId).ToList();

        //}


        public IEnumerable<object> GetAllLegalEntityData()
        {
            var data = (from legal in _appContext.LegalEntity
                        join adress in _appContext.Address on legal.AddressId equals adress.AddressId
                        join lockbox in _appContext.Address on legal.LockBoxAddressId equals lockbox.AddressId into loc
                        from lockbox in loc.DefaultIfEmpty()
                        join domestic in _appContext.DomesticWirePayment on legal.DomesticWirePaymentId equals domestic.DomesticWirePaymentId into domes
                        from domestic in domes.DefaultIfEmpty()
                        join international in _appContext.InternationalWirePayment on legal.InternationalWirePaymentId equals international.InternationalWirePaymentId into inter
                        from international in inter.DefaultIfEmpty()
                        join ach in _appContext.ACH on legal.ACHId equals ach.ACHId into ac
                        from ach in ac.DefaultIfEmpty()
                        where legal.IsDeleted == true || legal.IsDeleted == null
                        select new
                        {
                            legal.LegalEntityId,
                            legal.Name,
                            legal.Description,
                            legal.DoingLegalAs,
                            phoneNumber1 = legal.PhoneNumber1,
                            faxNumber = legal.FaxNumber,
                            legal.IsBalancingEntity,
                            legal.CageCode,
                            legal.FAALicense,
                            legal.TaxId,
                            legal.IsLastLevel,
                            legal.MasterCompanyId,
                            legal.IsActive,
                            legal.IsDeleted,
                            legal.FunctionalCurrencyId,
                            legal.ReportingCurrencyId,
                            legal.IsBankingInfo,

                            address1 = adress.Line1,
                            address2 = adress.Line2,
                            city = adress.City,
                            stateOrProvince = adress.StateOrProvince,
                            postalCode = adress.PostalCode,
                            country = adress.Country,

                            poBox = lockbox.PoBox,
                            bankStreetaddress1 = lockbox.Line1,
                            bankStreetaddress2 = lockbox.Line2,
                            bankCity= lockbox.City,
                            bankProvince= lockbox.StateOrProvince,
                            bankcountry= lockbox.Country,
                            bankpostalCode= lockbox.PostalCode,

                            domesticBankName = domestic.BankName,
                            domesticIntermediateBank = domestic.IntermediaryBankName, 
                            domesticBenficiaryBankName = domestic.BenificiaryBankName,
                            domesticBankAccountNumber = domestic.AccountNumber,
                            domesticABANumber = domestic.ABA,

                            internationalBankName = international.BankName,
                            internationalIntermediateBank = international.IntermediaryBank,
                            internationalBenficiaryBankName = international.BeneficiaryBank,
                            internationalBankAccountNumber = international.BeneficiaryBankAccount,
                            internationalSWIFTID = international.SwiftCode,

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

                        }).ToList();
            return data;
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
                address.UpdatedDate = address.CreatedDate = DateTime.Now;
                address.CreatedBy = billingAddress.CreatedBy;
                address.UpdatedBy = billingAddress.UpdatedBy;

                _appContext.Address.Add(address);
                _appContext.SaveChanges();


                billingAddress.AddressId = Convert.ToInt64(address.AddressId);

                billingAddress.CreatedDate = billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.IsActive = true;
                billingAddress.IsDeleted = false;
                billingAddress.IsPrimary = false;


                _appContext.LegalEntityBillingAddress.Add(billingAddress);
                _appContext.SaveChanges();
                return billingAddress.LegalEntityBillingAddressId;
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
                address.UpdatedDate = address.CreatedDate = DateTime.Now;
                address.CreatedBy = shippingAddress.CreatedBy;
                address.UpdatedBy = shippingAddress.UpdatedBy;

                _appContext.Address.Add(address);
                _appContext.SaveChanges();


                shippingAddress.AddressId = Convert.ToInt64(address.AddressId);

                shippingAddress.CreatedDate = shippingAddress.UpdatedDate = DateTime.Now;
                shippingAddress.IsActive = true;
                shippingAddress.IsDeleted = false;

                _appContext.LegalEntityShippingAddress.Add(shippingAddress);
                _appContext.SaveChanges();
                return shippingAddress.LegalEntityShippingAddressId;
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetLegalEntitySiteNames(long legalEntityId)
        {
            try
            {
                var list = (from le in _appContext.LegalEntityContact
                            join lba in _appContext.LegalEntityBillingAddress on le.LegalEntityId equals lba.LegalEntityId
                            where le.IsDeleted == false && le.LegalEntityId == legalEntityId
                            select new
                            {
                                lba.LegalEntityBillingAddressId,
                                lba.SiteName
                            }).OrderBy(p => p.SiteName).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetLegalEntityAddress(long addressId)
        {
            try
            {
                var data = (from lba in _appContext.LegalEntityBillingAddress
                            join ad in _appContext.Address on lba.AddressId equals ad.AddressId
                            where lba.AddressId == addressId
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

}
