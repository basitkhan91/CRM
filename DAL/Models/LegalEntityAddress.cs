using System;

namespace DAL.Models
{
    public class LegalEntityAddress
    {

        public long? LegalEntityAddressId { get; set; }

        public long? LegalEntityId { get; set; }

        public long AddressId { get; set; }

        public int? MasterCompanyId { get; set; }

      
        public string CreatedBy { get; set; }

      
        public string UpdatedBy { get; set; }

       
        public DateTime CreatedDate { get; set; }

       
        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

       // public virtual Customer Customer { get; set; }
    }
}
