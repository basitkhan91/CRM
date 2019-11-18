using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class StockLineListFilters
    {
        [Key]
        public long StockLineId { get; set; }
        public string PartNumber { get; set; }
        public string StockLineNumber { get; set; }
        public string PartDescription { get; set; }
        public string ItemCategory { get; set; }
        public string ItemGroup { get; set; }
        public string SerialNumber { get; set; }
        public string Condition { get; set; }
        public int? QuantityOnHand { get; set; }
        public int? QuantityAvailable { get; set; }
        public string GLAccountNumber { get; set; }
        public int Rows { get; set; }
        public int First { get; set; }
    }
}
