using DAL.Models;
using System;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IPurchaseOrder : IRepository<DAL.Models.PurchaseOrder>
    {
        IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderlist();

        int GetLastIdNumber(long puchaseOrderId, long purchaseOrderPartId);
        long CreatePOApprovers(PurchaseOrderApprover poApprover);
        void UpdatePOApprovers(PurchaseOrderApprover poApprover);
        void UpdatePOApproversStatus(long poApproverListId, int statusId, string updatedBy);
        IEnumerable<object> GetPoApproversList(long purchaseOrderId);
    }
}
