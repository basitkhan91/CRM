using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class CustomerContactRepository : Repository<CustomerContact>, ICustomerContactRepository
    {
        public CustomerContactRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<CustomerContact> GetCustomerContact()
        {
            return _appContext.CustomerContact.Include("MasterCompany").OrderByDescending(c => c.CustomerContactId).ToList();
        }



		public IEnumerable<object> GetCustomerContactAuditDetails(long customercontactId, long customerId)
		{
            //return _appContext.CustomerContactAudit.Where(c => c.CustomerContactId == customercontactId).OrderByDescending(p => p.UpdatedDate).ToList();
            var data = (from c in _appContext.Contact
                        join vc in _appContext.AuditCustomerContact on c.ContactId equals vc.ContactId
                        where vc.CustomerId == customerId && vc.CustomerContactId == customercontactId
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
                            vc.AuditCustomerContactId,
                            vc.CustomerContactId,
                            vc.CustomerId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.WorkPhoneExtn,
                            vc.IsDefaultContact
                        }).OrderByDescending(c => c.AuditCustomerContactId).ToList();
            return data;
        }

		//Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

		private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}


   