﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DAL.Models
{
  public class AssetDepreciationIntervalType : PasBase,IAudit
    {
        public long AssetDepreciationIntervalTypeId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDepreciationIntervalId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDepreciationIntervalName { get; set; }
        public string AssetDepreciationIntervalMemo { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
