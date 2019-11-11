
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class MasterSalesLeadSourcesRepository : Repository<MasterSalesLeadSources>, IMasterSalesLeadSourcesRepository
    {
        private ApplicationDbContext ApplicationDbContext => (ApplicationDbContext)_context;


        public MasterSalesLeadSourcesRepository(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
