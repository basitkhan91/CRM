using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DAL.Models
{
    public class ItemClassificationList
    {
        [Key]
        public long ItemClassificationId { get; set; }
        public string ItemClassificationCode { get; set; }
        public string Description { get; set; }
        public string ItemType { get; set; }
        public string Memo { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public bool? IsActive { get; set; }
        public int TotalCount { get; set; }

    }
}
