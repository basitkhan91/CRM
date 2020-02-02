using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class LegalEntityContactRepository : Repository<LegalEntityContact>, ILegalEntityContactRepository
    {
        public LegalEntityContactRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<LegalEntityContact> GetLegalEntityContact()
        {
            return _appContext.LegalEntityContact.Include("MasterCompany").OrderByDescending(c => c.LegalEntityContactId).ToList();
        }

        public IEnumerable<object> GetLegalEntityContactAuditDetails(long LegalEntitycontactId, long LegalEntityId)
        {
            var data = (from c in _appContext.Contact
                        join vc in _appContext.LegalEntityContactAudit on c.ContactId equals vc.ContactId
                        where vc.LegalEntityId == LegalEntityId && vc.LegalEntityContactId == LegalEntitycontactId
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
                            vc.LegalEntityContactAuditId,
                            vc.LegalEntityContactId,
                            vc.LegalEntityId,
                            c.CreatedDate,
                            c.UpdatedDate,
                            c.WorkPhoneExtn,
                            vc.IsDefaultContact
                        }).OrderByDescending(c => c.LegalEntityContactAuditId).ToList();
            return data;
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
