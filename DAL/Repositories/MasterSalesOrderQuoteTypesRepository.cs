


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
    public class MasterSalesOrderQuoteTypesRepository : Repository<MasterSalesOrderQuoteTypes>, IMasterSalesOrderQuoteTypesRepository
    {
        private ApplicationDbContext ApplicationDbContext => (ApplicationDbContext)_context;


        public MasterSalesOrderQuoteTypesRepository(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
