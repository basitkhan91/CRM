using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class MasterCompany:AuditableEntity
    {
        public int MasterCompanyId { get; set; }

        public string CompanyName { get; set; }

        public string TaxId { get; set; }

        public string EmailAddress { get; set; }

        public string Address { get; set; }

        public bool? IsActive { get; set; }


    }
}
