using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class VendorPaymentRepository : Repository<CheckPayment>, IVendorPaymentRepository
    {
        public VendorPaymentRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<CheckPayment> GetVendorPayments()
        {
            try
            {
                return _appContext.CheckPayment.Include("MasterCompany").Where(c=> c.IsDelete == false || c.IsDelete == null).OrderBy(c => c.CheckPaymentId).ToList();
                 
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public IEnumerable<VendorPaymentMethod> GetVendorDefaults()
        {
            try
            {
                return _appContext.VendorPaymentMethod.Include("MasterCompany")./*Where(c=> c.IsDelete == true || c.IsDelete == null).*/OrderBy(c => c.VendorPaymentMethodId).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }



        public IEnumerable<object> GetDomesticWithVendor(long vendorId)
        {

            {
                var data = (from t in _appContext.DomesticWirePayment
                            join ad in _appContext.VendorDomesticWirePayment on t.DomesticWirePaymentId equals ad.DomesticWirePaymentId
                            join add in _appContext.Address on t.BankAddressId equals add.AddressId
                            where ad.VendorId==vendorId

                           
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                               
                                t,
                                Address1 = add.Line1,
                                Address2 = add.Line2,
                                Address3 = add.Line3,
                                t.ABA,
                                t.BankName,
                                t.AccountNumber,
                                add.City,
                                add.StateOrProvince,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                add.AddressId,
                                add.Country,
                                add.PostalCode,
                                ad.VendorDomesticWirePaymentId,
                                t.DomesticWirePaymentId,
                                t.IsActive
                            }).ToList();
                return data;

            }

        }



        public IEnumerable<object> GetInterWithVedor(long vendorId)
        {

            {
                var data = (from t in _appContext.InternationalWirePayment
                            join ad in _appContext.VendorInternationlWirePayment on t.InternationalWirePaymentId equals ad.InternationalWirePaymentId
                            join add in _appContext.Address on t.BankAddressId equals add.AddressId
                            where ad.VendorId == vendorId


                            // select new { t, ad, vt }).ToList();
                            select new
                            {

                                t,
                                Address1 = add.Line1,
                                Address2 = add.Line2,
                                Address3 = add.Line3,
                                t.SwiftCode,
                                t.BeneficiaryBankAccount,
                                t.BeneficiaryBank,
                                t.BeneficiaryCustomer,
                                add.City,
                                add.StateOrProvince,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                add.AddressId,
                                add.Country,
                                add.PostalCode,
                                ad.VendorInternationalWirePaymentId,
                                t.InternationalWirePaymentId
                            }).ToList();
                return data;

            }

        }

        public void Add(VendorPayment defaultPaymentObj)
        {
           
        }

        public IEnumerable<object> GetDefaultVendor(long vendorid)
        {
            throw new NotImplementedException();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
