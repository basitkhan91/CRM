﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AssetAcquisitionTypeAudit : PasBaseAudit
    {
        [Key]
        public long AssetAcquisitionTypeAuditId { get; set; }
        public byte AssetAcquisitionTypeId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }

    }
}
