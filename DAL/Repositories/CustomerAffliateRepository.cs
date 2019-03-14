using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Repositories.Interfaces;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories
{
  
        public class CustomerAffliateRepository : Repository<CustomerAffiliation>, ICustomerAffliationRepository
        {
            public CustomerAffliateRepository(ApplicationDbContext context) : base(context)
            { }

            public IEnumerable<CustomerAffiliation> GetCustomerAffiliations()
            {

            var data= _appContext.CustomerAffiliation.OrderByDescending(c => c.ToString());
             return data;
        }


            //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

            private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        }
    }

