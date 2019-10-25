using DAL.Models;
using System;

namespace QuickApp.Pro.ViewModels
{
    public class DocumentViewModel : IAudit
    {
       
        public long DocumentId { get; set; }
        public string Memo { get; set; }
        public string Link { get; set; }
        public string DocumentCode { get; set; }
        public string Description { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
