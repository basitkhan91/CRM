using DAL.Models;
namespace DAL.Repositories.Interfaces
{
    public interface IPartStockLineMapper : IRepository<PartStockLineMapperRepository>
    {
        PurchaseOrder GetReceivingPurchaseOrderList(long id);
        object GetReceivingPurchaseOrderEdit(long id);
        object GetReceivingPurchaseOrderView(long id);
        //RepairOrder GetReceivingRepairOrderList(long id);
        RepairOrderDto GetReceivingRepairOrderList(long id);
    }
}
