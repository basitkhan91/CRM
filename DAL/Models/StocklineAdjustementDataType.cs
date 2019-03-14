using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class StocklineAdjustmentDataType : PasBase
    {
        [Key]
        public Int32? StocklineAdjustmentDataTypeId { get; set; }
        public string Description { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
    }
}
