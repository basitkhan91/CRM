using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ReceivingCustomerWorkFilter
    {
        [Key]
        public long ReceivingCustomerWorkId { get; set; }
        public string partNumber { get; set; }
        public string receivingNumber { get; set; }
        public string changePartNumber { get; set; }
        public string employeeName { get; set; }
        public string customerName { get; set; }
        public string customerReference { get; set; }
        public string workOrderNum { get; set; }
        public string partDescription { get; set; }

        public int rows { get; set; }
        public int first { get; set; }
        public bool? isActive { get; set; }
        public bool? isDeleted { get; set; }

        public DateTime? createdDate { get; set; }

        public int totalRecords { get; set; }





    }
}