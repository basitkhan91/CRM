using System;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IPurchaseOrder : IRepository<DAL.Models.PurchaseOrder>
    {
        IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderlist();

        int GetLastIdNumber(long puchaseOrderId, long purchaseOrderPartId);
    }
}
