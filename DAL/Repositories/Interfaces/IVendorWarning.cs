using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IVendorWarning :IRepository<VendorWarnings>
    {
        IEnumerable<VendorWarnings> GetVendorWarnings();
        IEnumerable<object> GetVendorwarningWithid(long vendorId);
    }
}
