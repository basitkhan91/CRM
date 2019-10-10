using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class CreditTermsRepository : Repository<CreditTerms>, ICreditTermsRepository
    {
        public CreditTermsRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<CreditTerms> GetAllCreditTermsData()
        {
            try
            {
                var result = _appContext.CreditTerms.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.CreditTermsId).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<CreditTermsAudit> GetAuditDetails(long id)
        {
            return _appContext.CreditTermsAudit.Where(c=> c.CreditTermsId== id).ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
    