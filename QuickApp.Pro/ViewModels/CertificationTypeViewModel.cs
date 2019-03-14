using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CertificationTypeViewModel
    {
        public long? CertificationTypeId { get; set; }
        

        public string CertificationName { get; set; }

       // [ForeignKey("MasterCompanyId")]
        public long? MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

    }
}
