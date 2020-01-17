using DAL.Models;
namespace DAL.Repositories.Interfaces
{
    public interface IPartStockLineMapper : IRepository<PartStockLineMapperRepository>
    {
        object GetReceivingPurchaseOrderList(long id);
        object GetReceivingPurchaseOrderEdit(long id);
        object GetReceivingPurchaseOrderView(long id);
        //RepairOrder GetReceivingRepairOrderList(long id);
        RepairOrderDto GetReceivingRepairOrderList(long id);
        object GetPurchaseOrderHeader(long purchaseOrderId);
        object GetPurchaseOrderPartsForSummary(long purchaseOrderId);
        void CreateStockLine(long purchaseOrderId);
    }
}
