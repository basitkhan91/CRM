using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

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

                        where vc.VendorId== id
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
                           vc.IsDefaultContact
                           
                        }).ToList();
            return data;
            //return _appContext.Contact.Include("MasterCompany").OrderByDescending(c => c.ContactId).ToList();
        }

        public IEnumerable<object> GetCustomerContacts(long id)
        {
            var data = (from c in _appContext.Contact
                        join vc in _appContext.CustomerContact on c.ContactId equals vc.ContactId

                        where vc.CustomerId == id
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

                        }).ToList();
            return data;
            //return _appContext.Contact.Include("MasterCompany").OrderByDescending(c => c.ContactId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
