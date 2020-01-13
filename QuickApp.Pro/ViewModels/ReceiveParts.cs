using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ReceiveParts
    {
        public long PurchaseOrderPartRecordId { get; set; }
        public long RepairOrderPartRecordId { get; set; }
        public short? QuantityRejected { get; set; }
        public List<StockLineDraft> StockLines { get; set; }
        public List<TimeLifeDraft> TimeLife { get; set; }
    }
}
