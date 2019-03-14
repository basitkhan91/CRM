using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class StocklineAdjustment : PasBase
    {
        [Key] 
        public long StocklineAdjustmentId { get; set; }
        [ForeignKey("StockLineId")]
        public long StockLineId { get; set; }
        [ForeignKey("StocklineAdjustmentDataTypeId")]
        public Int32? StocklineAdjustmentDataTypeId { get; set; }
       
        public string ChangedFrom { get; set; }
        public string ChangedTo { get; set; }
        public string AdjustmentMemo { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
    }
}
