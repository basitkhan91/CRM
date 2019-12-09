using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   public  class VendorCapabilitiesRepository : Repository<DAL.Models.VendorCapabiliy>, IVendorCapabilitiesRepository
    {
        public VendorCapabilitiesRepository(ApplicationDbContext context) : base(context)
    { }

    public IEnumerable<Models.VendorCapabiliy> GetVendorCapabilitiesData()
    {
        return _appContext.VendorCapabiliy.Include("MasterCompany").Where(a => a.IsDeleted == false || a.IsDeleted == null).OrderByDescending(a => a.VendorCapabilityId).ToList();

    }
    //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

    private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

}
    
}
