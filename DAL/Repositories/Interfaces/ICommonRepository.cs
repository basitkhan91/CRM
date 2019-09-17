﻿using DAL.Common;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICommonRepository
    {
        IEnumerable<VendorContactList> GetVendorContactsList(long vendorId);

        IEnumerable<CustomerContactList> GetCustomerContactsList(long customerId);
    }
}
