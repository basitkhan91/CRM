using System;


namespace DAL.Models
{
    public class MasterSalesOrderQuoteTypes
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int MasterCompanyId { get; set; }

        public string Description { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

    }
}
