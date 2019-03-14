using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class CapabilityTypeRepository : Repository<DAL.Models.CapabilityType>, ICapabilityTypeRepository
    {
        public CapabilityTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.CapabilityType> GetAllCapabilityListData()
        {
            var data = _appContext.capabilityType.OrderByDescending(a => a.CapabilityTypeId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
