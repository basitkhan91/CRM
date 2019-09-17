using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class CommonRepository : Repository<Contact>, ICommonRepository
    {
        public CommonRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<VendorContactList> GetVendorContactsList(long vendorId)
        {
            try
            {
                List<VendorContactList> vendorContacts = new List<VendorContactList>();
                VendorContactList objContact;
                var contacts = _appContext.Vendor
                     .Join(_appContext.VendorContact,
                           v => v.VendorId,
                           vc => vc.VendorId,
                           (v, vc) => new { v, vc })
                     .Join(_appContext.Contact,
                           vc1 => vc1.vc.ContactId,
                           con => con.ContactId,
                           (vc1, con) => new { vc1, con })
                     .Where(z => z.vc1.v.VendorId == vendorId)
                     .Select(z => new
                     {
                         ContactId = z.con.ContactId,
                         WorkPhone = z.con.WorkPhone,
                         CustomerCode = z.vc1.v.VendorCode,
                         ContractReference = z.vc1.v.VendorContractReference,
                         Reference = string.Empty,
                         CreditLimt = z.vc1.v.CreditLimit,
                         CreditTermId = z.vc1.v.CreditTermsId,
                         CSR = z.con.FirstName + " " +z.con.LastName,
                         Email = z.vc1.v.VendorEmail
                     }).ToList();

                if (contacts != null && contacts.Count > 0)
                {
                    foreach (var item in contacts)
                    {
                        objContact = new VendorContactList();
                        objContact.ContactId = item.ContactId;
                        objContact.ContractReference = item.ContractReference;
                        objContact.CreditLimt = item.CreditLimt;
                        objContact.CreditTermId = item.CreditTermId;
                        objContact.CSR = item.CSR;
                        objContact.VendorCode = item.CustomerCode;
                        objContact.VendorReference = item.Reference;
                        objContact.WorkPhone = item.WorkPhone;
                        objContact.Email = item.Email;
                        vendorContacts.Add(objContact);
                    }
                }
                //     .Select(z => new
                //     {
                //         ContactId = z.con.ContactId,
                //         WorkPhone = z.con.WorkPhone,
                //     }).ToList();

                //if (contacts != null && contacts.Count > 0)
                //{
                //    foreach (var item in contacts)
                //    {
                //        objContact = new ContactList();
                //        objContact.Contact = item.WorkPhone;
                //        objContact.ContactId = item.ContactId;
                //        vendorContacts.Add(objContact);
                //    }
                //}
                return vendorContacts;
            }
            catch (System.Exception)
            {
                throw;
            }
                        
        }

        public IEnumerable<CustomerContactList> GetCustomerContactsList(long customerId)
        {
            try
            {
                List<CustomerContactList> customerContacts = new List<CustomerContactList>();
                CustomerContactList objContact;
                var contacts = _appContext.Customer
                     .Join(_appContext.CustomerContact,
                           cust => cust.CustomerId,
                           cc => cc.CustomerId,
                           (cust, cc) => new { cust, cc })
                     .Join(_appContext.Contact,
                           cc1 => cc1.cc.ContactId,
                           con => con.ContactId,
                           (cc1, con) => new { cc1, con })
                     .Where(z => z.cc1.cust.CustomerId == customerId)
                     .Select(z => new
                     {
                         ContactId = z.con.ContactId,
                         WorkPhone = z.con.WorkPhone,
                         CustomerCode = z.cc1.cust.CustomerCode,
                         ContractReference=z.cc1.cust.ContractReference,
                         Reference = string.Empty,
                         CreditLimt = z.cc1.cust.CreditLimit,
                         CreditTermId = z.cc1.cust.CreditTermsId,
                         CSR = z.cc1.cust.CSRName,
						 Email = z.cc1.cust.Email
                     }).ToList();

                if (contacts != null && contacts.Count > 0)
                {
                    foreach (var item in contacts)
                    {
                        objContact = new CustomerContactList();
                        objContact.ContactId = item.ContactId;
                        objContact.ContractReference = item.ContractReference;
                        objContact.CreditLimt = item.CreditLimt;
                        objContact.CreditTermId = item.CreditTermId;
                        objContact.CSR = item.CSR;
                        objContact.CustomerCode = item.CustomerCode;
                        objContact.CustomerReference = item.Reference;
                        objContact.WorkPhone = item.WorkPhone;
						objContact.Email = item.Email;
                        customerContacts.Add(objContact);
                    }
                }
                return customerContacts;
            }
            catch (System.Exception)
            {
                throw;
            }

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
