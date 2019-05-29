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
                        where legal.IsDelete == true || legal.IsDelete == null
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
                            legal.IsDelete,
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

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

}
