using DAL.Models;
using System;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IPurchaseOrder : IRepository<DAL.Models.PurchaseOrder>
    {
        IEnumerable<PurchaseOrder> GetPurchaseOrderlist();
        IEnumerable<PurchaseOrder> GetPurchaseOrderListLite();
        int GetLastIdNumber(long puchaseOrderId, long purchaseOrderPartId);
    }
}
