using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  
    public interface IPurchaseOrder : IRepository<DAL.Models.PurchaseOrder>
    {
        IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderlist();


       

    }
}
