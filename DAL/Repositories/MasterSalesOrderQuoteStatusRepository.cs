
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class MasterSalesOrderQuoteStatusRepository : Repository<Models.Sales.MasterSalesOrderQuoteStatus>, IMasterSalesOrderQuoteStatusRepository
    {
        private ApplicationDbContext ApplicationDbContext => (ApplicationDbContext)_context;


        public MasterSalesOrderQuoteStatusRepository(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
