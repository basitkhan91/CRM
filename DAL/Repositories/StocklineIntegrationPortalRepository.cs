using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class StocklineIntegrationPortalRepository : Repository<StocklineIntegrationPortal>, IStocklineIntegrationPortalRepository
    {
        public StocklineIntegrationPortalRepository(ApplicationDbContext context) : base(context)
        { }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    
    }
}
 