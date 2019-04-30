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
                                  .Include("StockLine")
                                   .Where(x => x.PurchaseOrderId == id).FirstOrDefault();

            //purchaseOrder.StockLine = _appContext.StockLine
            //                      .Include("Stockline")
            //                      .Where(x => x.PurchaseOrderId == id).ToList();

            purchaseOrder.PurchaseOderPart = _appContext.PurchaseOrderPart
                                   .Include("ItemMaster")
                                   //.Include("StockLine")
                                   .Where(x => x.PurchaseOrderId == id).ToList();

            purchaseOrder.StockLine = _appContext.StockLine
                                    .Include("TimeLifeObject")
                                    .Where(x => x.PurchaseOrderId == id).ToList();



            foreach (var part in purchaseOrder.PurchaseOderPart)
            {
                part.ItemMaster.Manufacturer = _appContext.Manufacturer.Where(x => x.ManufacturerId == part.ItemMaster.ManufacturerId).FirstOrDefault();
            }

            //foreach (var stocklineMapper in purchaseOrder.PurchaseOderPart)
            //{
            //    stocklineMapper.PartStockLineMapper = _appContext.PartStockLineMapper.Where(x => x.pur == part.ItemMaster.ManufacturerId).FirstOrDefault();
            //}


            return purchaseOrder;

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
