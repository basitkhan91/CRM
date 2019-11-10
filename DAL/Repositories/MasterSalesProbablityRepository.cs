
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class MasterSalesProbablityRepository : Repository<MasterSalesProbablity>, IMasterSalesProbablityRepository
    {
        private ApplicationDbContext ApplicationDbContext => (ApplicationDbContext)_context;


        public MasterSalesProbablityRepository(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
