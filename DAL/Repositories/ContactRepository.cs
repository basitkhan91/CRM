using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class ContactRepository : Repository<Contact>, IContactRepository
    {
        public ContactRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetCompleteContacts()
        {
            return _appContext.Contact.Include("MasterCompany").OrderByDescending(c => c.ContactId).ToList();
        }


        public IEnumerable<object> GetContacts(long id)
        {
            var data = (from c in _appContext.Contact
                        join vc in _appContext.VendorContact on c.ContactId equals vc.ContactId
                        where vc.VendorId== id && vc.IsDeleted != true
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                           c.ContactId,
                           c.ContactTitle,
                           c.AlternatePhone,
                           c.CreatedBy,
                           c.UpdatedBy,
                           c.Email,
                           c.Tag,
                           c.Fax,
                           c.FirstName,
                           c.LastName,
                           c.MiddleName,
                           c.MobilePhone,
                           c.Notes,
                           c.Prefix,
                           c.Suffix,
                           c.WebsiteURL,
                           c.WorkPhone,
                           c.IsActive,
                           vc.VendorContactId,
                           vc.VendorId,
                           c.CreatedDate,
                           c.UpdatedDate,
                           c.WorkPhoneExtn,
                           vc.IsDefaultContact,
                           FullContactNo = string.Concat(c.WorkPhone, " - ", c.WorkPhoneExtn),
                        }).ToList();
            return data;
            //return _appContext.Contact.Include("MasterCompany").OrderByDescending(c => c.ContactId).ToList();
        }

        public IEnumerable<object> GetCustomerContacts(long id)
        {
            var data = (from c in _appContext.Contact
                        join vc in _appContext.CustomerContact on c.ContactId equals vc.ContactId
                        where vc.CustomerId == id && vc.IsDeleted !=true
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            c.ContactId,
                            c.ContactTitle,
                            c.AlternatePhone,
                            c.CreatedBy,
                            c.UpdatedBy,
                            c.Email,
                            c.Tag,
                            c.Fax,
                            c.FirstName,
                            c.LastName,
                            c.MiddleName,
                            c.MobilePhone,
                            c.Notes,
                            c.Prefix,
                            c.Suffix,
                            c.WebsiteURL,
                            c.WorkPhone,
                            c.IsActive,
                            vc.CustomerContactId,
                            vc.IsDefaultContact,
                            vc.CustomerId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.WorkPhoneExtn,
                            FullContactNo = string.Concat(c.WorkPhone, " - ", c.WorkPhoneExtn),
                        }).ToList();
            return data;
            //return _appContext.Contact.Include("MasterCompany").OrderByDescending(c => c.ContactId).ToList();
        }

        public IEnumerable<object> GetLegalEntityContacts(long id)
        {
            var data = (from c in _appContext.Contact
                        join vc in _appContext.LegalEntityContact on c.ContactId equals vc.ContactId
                        where vc.LegalEntityId == id && vc.IsDeleted != true
                        select new
                        {
                            c.ContactId,
                            c.ContactTitle,
                            c.AlternatePhone,
                            c.CreatedBy,
                            c.UpdatedBy,
                            c.Email,
                            c.Tag,
                            c.Fax,
                            c.FirstName,
                            c.LastName,
                            c.MiddleName,
                            c.MobilePhone,
                            c.Notes,
                            c.Prefix,
                            c.Suffix,
                            c.WebsiteURL,
                            c.WorkPhone,
                            c.IsActive,
                            vc.LegalEntityContactId,
                            vc.IsDefaultContact,
                            vc.LegalEntityId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.WorkPhoneExtn,
                            FullContactNo = string.Concat(c.WorkPhone, " - ", c.WorkPhoneExtn),
                        }).ToList();
            return data;
        }

        public IEnumerable<object> GetVendorContactsAudit(long vendorId, long vendorContactId)
        {
            var data = (from c in _appContext.Contact
                        join vc in _appContext.VendorContactAudit on c.ContactId equals vc.ContactId
                        where vc.VendorId == vendorId && vc.ContactId== vendorContactId
                        select new
                        {
                            c.ContactId,
                            c.ContactTitle,
                            c.AlternatePhone,
                            c.CreatedBy,
                            c.UpdatedBy,
                            c.Email,
                            c.Tag,
                            c.Fax,
                            c.FirstName,
                            c.LastName,
                            c.MiddleName,
                            c.MobilePhone,
                            c.Notes,
                            c.Prefix,
                            c.Suffix,
                            c.WebsiteURL,
                            c.WorkPhone,
                            c.IsActive,
                            vc.AuditVendorContactId,
                            vc.VendorContactId,
                            vc.VendorId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.WorkPhoneExtn,
                            vc.IsDefaultContact
                        }).OrderByDescending(c=>c.AuditVendorContactId).ToList();
            return data;
        }
        public IEnumerable<object> GetContactsById(long id)
        {
            var data = (from c in _appContext.Contact
                       
                        where c.ContactId == id
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            ContactId=    c.ContactId,
                            ContactTitle=     c.ContactTitle,
                            AlternatePhone=    c.AlternatePhone,
                            CreatedBy=    c.CreatedBy,
                            UpdatedBy=    c.UpdatedBy,
                            Email= c.Email,
                            Tag=  c.Tag,
                            Fax=   c.Fax,
                            FirstName=   c.FirstName,
                            LastName=   c.LastName,
                            MiddleName=  c.MiddleName,
                            MobilePhone=    c.MobilePhone,
                            Notes=   c.Notes,
                            Prefix=   c.Prefix,
                            Suffix=   c.Suffix,
                             WebsiteURL =   c.WebsiteURL,
                            WorkPhone =   c.WorkPhone,
                            IsActive=    c.IsActive,

                            CreatedDate=   c.CreatedDate,
                            UpdatedDate=    c.UpdatedDate,
                            WorkPhoneExtn=  c.WorkPhoneExtn

                                             }).ToList();
            return data;
            //return _appContext.Contact.Include("MasterCompany").OrderByDescending(c => c.ContactId).ToList();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
