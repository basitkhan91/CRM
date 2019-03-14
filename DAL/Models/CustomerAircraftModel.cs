using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class CustomerAircraftModel :PasBase
    {

        public long CustomerAircraftModelId { get; set; }

        public long CustomerId { get; set; }

        public long AircraftModelId { get; set; }

        public int? Priority { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }
    }
}
