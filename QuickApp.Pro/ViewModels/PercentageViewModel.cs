using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PercentageViewModel
    {
        public string Name { get; set; }
        public decimal Value { get; set; }
        public string Memo { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
