
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class MasterSalesCreditTermsRepository : Repository<MasterSalesCreditTerms>, IMasterSalesCreditTermsRepository
    {
        private ApplicationDbContext ApplicationDbContext => (ApplicationDbContext)_context;


        public MasterSalesCreditTermsRepository(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
