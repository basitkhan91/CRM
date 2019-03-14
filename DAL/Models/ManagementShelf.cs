using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ManagementShelf : PasBase
    {
        public long ManagementShelfId { get; set; }
        [ForeignKey("ManagementStructureId")]
        public long ManagementStructureId { get; set; }
        [ForeignKey("ShelfId")]
        public long ShelfId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
