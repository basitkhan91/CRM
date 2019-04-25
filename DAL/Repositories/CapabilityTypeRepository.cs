using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;


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

        public IEnumerable<object> getAllCapesList()
        {
            var data = _appContext.Capability.Where(a => a.AssetRecordId > 0).OrderByDescending(a => a.AssetRecordId).ToList();
           
            return data;
        }

        public IEnumerable<object> getAllCapesList(long id)
        {
            throw new System.NotImplementedException();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
