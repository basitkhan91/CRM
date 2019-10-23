using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IPurchaseOrder : IRepository<DAL.Models.PurchaseOrder>
    {
        IEnumerable<object> GetPurchaseOrderlist(Filters<PurchaseOrderFilters> poFilters);
        IEnumerable<PurchaseOrder> GetPurchaseOrderListLite();
        int GetLastIdNumber(long puchaseOrderId, long purchaseOrderPartId);
        long CreatePOApprovers(PurchaseOrderApprover poApprover);
        void UpdatePOApprovers(PurchaseOrderApprover poApprover);
        void UpdatePOApproversStatus(long poApproverListId, int statusId, string updatedBy);
        IEnumerable<object> GetPoApproversList(long purchaseOrderId);
        long CreatePurchaseOrderAddress(PurchaseOrderAddress poAddress);
        void UpdatePurchaseOrderAddress(PurchaseOrderAddress poAddress);
        object GetPurchaseOrderAddress(long purchaseOrderId, int userType, int addressType);
        long CreatePurchaseOrderShipvia(PurchaseOrderShipVia poShipvia);
        void UpdatePurchaseOrderShipvia(PurchaseOrderShipVia poShipvia);
        object GetPurchaseOrderShipvia(long purchaseOrderId, int userType);
        IEnumerable<object> GetVendorCapabilities(long vendorId);

        object PurchaseOrderById(long purchaseOrderId);
        List<PurchaseOrderPart> GetPurchaseOrderParts(long purchaseOrderId);
    }
}
