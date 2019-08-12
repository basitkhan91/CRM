using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class PartStockLineMapperRepository : Repository<PartStockLineMapperRepository>, IPartStockLineMapper
    {
        public PartStockLineMapperRepository(ApplicationDbContext context) : base(context)
        {
        }

        public PurchaseOrder GetReceivingPurchaseOrderList(long id)
        {

            var purchaseOrder = _appContext.PurchaseOrder
                                   .Include("Vendor")
                                   .Where(x => x.PurchaseOrderId == id).FirstOrDefault();

            purchaseOrder.PurchaseOderPart = _appContext.PurchaseOrderPart
                                   .Include("ItemMaster")
                                   .Include("StockLine")
                                   .Include("TimeLife")
                                   .Where(x => x.PurchaseOrderId == id).ToList();

            purchaseOrder.PurchaseOderPart.ToList().ForEach(part =>
            {
                if (!part.isParent)
                {
                    part.POPartSplitAddress = _appContext.Address.Where(x => x.AddressId == part.POPartSplitAddressId).FirstOrDefault();
                }
            });
            
            foreach (var part in purchaseOrder.PurchaseOderPart)
            {
                part.ItemMaster.Manufacturer = _appContext.Manufacturer.Where(x => x.ManufacturerId == part.ItemMaster.ManufacturerId).FirstOrDefault();
            }
            
            return purchaseOrder;

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
