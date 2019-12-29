using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models.Sales
{
    public class MasterSalesOrderQuoteStatus
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool DisplayInDropdown { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
