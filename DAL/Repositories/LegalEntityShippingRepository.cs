using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class LegalEntityShippingRepository : Repository<DAL.Models.LegalEntityShipping>, ILegalEntityShipping
    {
        public LegalEntityShippingRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<LegalEntityShipping> GetAllLegalEntityShipping()
        {
            return _appContext.LegalEntityShipping.OrderByDescending(c => c.LegalEntityShippingId).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
