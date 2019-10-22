using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class LegalEntityContact
    {
        public long LegalEntityContactId { get; set; }
        public long LegalEntityId { get; set; }
        public long ContactId { get; set; }
        public bool? IsDefaultContact { get; set; }
        public string Tag { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
