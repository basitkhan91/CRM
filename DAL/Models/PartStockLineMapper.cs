using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class PartStockLineMapper
    {
        [Key]
        public long Id { get; set; }

        public string PurchaseOrderPartId { get; set; }

        public string StockLineId { get; set; }
    }
}
