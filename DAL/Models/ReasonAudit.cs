﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ReasonAudit : PasBase
    {
        public long ReasonAuditId { get; set; }
        public long ReasonId { get; set; }
        public string ReasonCode { get; set; }
        public string ReasonForRemoval { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
