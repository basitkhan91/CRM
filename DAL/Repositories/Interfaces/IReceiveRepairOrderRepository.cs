using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IReceiveRepairOrderRepository : IRepository<ReceiveRepairOrderRepository>
    {
        object GetRepairOrderHeader(long repairOrderId);
        object GetRepairOrderPartsByRepairOrderId(long repairOrderId);
        int GetLastIdNumber(long repairOrderId, long repairOrderPartId);

        object GetReceivingRepairOrderForView(long repairOrderId);
    }
}
