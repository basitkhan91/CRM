using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class CustomerAircraftType:PasBase
    {
        public long CustomerAircraftTypeId { get; set; }

        public long CustomerId { get; set; }

        public int AircraftTypeId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }
    }
}

