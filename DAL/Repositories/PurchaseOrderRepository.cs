using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class PurchaseOrderRepository : Repository<DAL.Models.PurchaseOrder>, IPurchaseOrder
    {
        public PurchaseOrderRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderlist()
        {
            var purchaseOrderList = _appContext.PurchaseOrder.Include("PurchaseOderPart").Include("Vendor").OrderByDescending(c => c.PurchaseOrderId).ToList();
            purchaseOrderList.ForEach(x => {
                if (x.Vendor != null)
                {
                    x.Vendor.VendorContact = _appContext.VendorContact.Include("Contact").Where(vendorContact => vendorContact.VendorId == x.VendorId).ToList();
                }
            });

            return purchaseOrderList;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

