using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class PartStockLineMapper
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("PurchaseOrderPartRecordId")]
        public string PurchaseOrderPartRecordId { get; set; }

        public string StockLineId { get; set; }
    }
} 
