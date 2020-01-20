using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    // Branching sample test.
    public class AssetAcquisitionType : PasBase,IAudit
    {
        [Key]
        public byte AssetAcquisitionTypeId { get; set; }

        [Required(ErrorMessage= "Code Is Required.")]
        public string Code { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string Name { get; set; }
        public string Memo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
