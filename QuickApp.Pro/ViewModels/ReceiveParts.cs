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
        public List<StockLine> StockLines { get; set; }
        public List<TimeLife> TimeLife { get; set; }
    }
}
