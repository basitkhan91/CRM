using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IReceiveRepairOrderRepository : IRepository<ReceiveRepairOrderRepository>
    {
        object GetRepairOrderHeader(long repairOrderId);
    }
}
