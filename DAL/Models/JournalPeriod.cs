using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class JournalPeriod : BaseEntity
    {
        [Key]
        public long ID { get; set; }
        public string Description { get; set; }
        public Int32 MasterCompanyId { get; set; }
    }
}
