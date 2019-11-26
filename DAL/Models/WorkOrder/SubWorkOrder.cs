using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class SubWorkOrder
    {
        [Key]
        public long SubWorkOrderId { get; set; }
        public long WorkOrderId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
