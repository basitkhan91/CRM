using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ShelfAudit: PasBase
    {
        [Key]
        public long ShelfAuditId { get; set; }
        public long ShelfId { get; set; }
        public long? LocationId { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
