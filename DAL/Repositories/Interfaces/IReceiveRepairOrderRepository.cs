﻿using System;
namespace DAL.Repositories.Interfaces
{
    public interface IReceiveRepairOrderRepository : IRepository<ReceiveRepairOrderRepository>
    {
        object GetRepairOrderHeader(long repairOrderId);
        object GetRepairOrderPartsByRepairOrderId(long repairOrderId);
        int GetLastIdNumber(long repairOrderId, long repairOrderPartId);
        object GetReceivingRepairOrderForView(long repairOrderId);
        object GetReceivingRepairOrderForEdit(long repairOrderId);
        void CreateStockLine(long repaireOrderId);
    }
}
