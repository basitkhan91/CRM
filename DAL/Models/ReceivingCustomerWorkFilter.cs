using DAL.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ReceivingCustomerWorkFilter
    {
        [Key]
        public long CustomerId { get; set; }
        public string PartNumber { get; set; }
        public string ReceivingCustomerNumber { get; set; }
        public string ChangePartNumber { get; set; }
        public string FirstName { get; set; }
        public string Name { get; set; }
        public string CustomerReference { get; set; }
        public string WorkOrderNum { get; set; }
        public string PartDescription { get; set; }

        public int Rows { get; set; }
        public int First { get; set; }




    }
}