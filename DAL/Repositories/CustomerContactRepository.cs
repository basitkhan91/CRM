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



		public IEnumerable<object> GetCustomerContactAuditDetails(long customercontactId)
		{
			return _appContext.CustomerContactAudit.Where(c => c.CustomerContactId == customercontactId).OrderByDescending(p => p.UpdatedDate).ToList();

		}

		//Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

		private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}


   