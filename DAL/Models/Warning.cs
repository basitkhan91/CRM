using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Warning : PasBase
    {
        public long WarningId { get; set; }

        public string Description { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
    }
}
