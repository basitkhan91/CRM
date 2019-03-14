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
            return _appContext.PurchaseOrder.OrderByDescending(c => c.PurchaseOrderId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

