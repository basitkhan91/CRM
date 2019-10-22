using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Shelf:PasBase,IAudit
    {
        [Key]
        public long ShelfId { get; set; }
        [ForeignKey("LocationId")]
        public long? LocationId { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

        [NotMapped]
        public Site Site { get; set; }

        [NotMapped]
        public Warehouse Warehouse { get; set; }


        [NotMapped]
        public Location Location { get; set; }

        [NotMapped]
        public string UploadStatus { get; set; }
    }
}
