using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   public interface  IVendorCapabilitiesRepository : IRepository<DAL.Models.VendorCapabiliy>
    {
        IEnumerable<DAL.Models.VendorCapabiliy> GetVendorCapabilitiesData();
        IEnumerable<object> GetvendorCapabilityListByVendorId(long vendorId);

    }
    
}
