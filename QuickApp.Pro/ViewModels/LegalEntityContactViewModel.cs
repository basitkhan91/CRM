using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class LegalEntityContactViewModel
    {
        public long? LegalEntityContactId { get; set; }

        public long? LegalEntityId { get; set; }

        public long? ContactId { get; set; }

        public bool? IsDefaultContact { get; set; }

        public int MasterCompanyId { get; set; }


        public string CreatedBy { get; set; }


        public string UpdatedBy { get; set; }


        public DateTime CreatedDate { get; set; }


        public DateTime UpdatedDate { get; set; }

        public bool IsActive { get; set; }
    }
}
