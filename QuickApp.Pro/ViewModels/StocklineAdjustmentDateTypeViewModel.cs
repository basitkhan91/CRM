using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class StocklineAdjustmentDateTypeViewModel
    {
        public long StocklineAdjustmentDataTypeId { get; set; }
        public string Description { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }
    }
}
