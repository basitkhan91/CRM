using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models.Sales
{
    public class SalesOrderQuoteApproverList
    {
        [Key]
        public long? SalesOrderQuoteApproverListId { get; set; }
        public long SalesOrderQuoteId { get; set; }
        public long EmployeeId { get; set; }
        public int Level { get; set; }
        public int StatusId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
