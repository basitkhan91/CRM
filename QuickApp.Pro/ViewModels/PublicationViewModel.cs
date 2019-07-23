﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PublicationViewModel
    {

        public long PublicationRecordId { get; set; }
        public string PublicationId { get; set; }

        public string PartNumber { get; set; }
        public string Memo { get; set; }

        public string Description { get; set; }

        public string Platform { get; set; }

        public string Model { get; set; }

        public string ATAMain { get; set; }

        public string ATASubChapter { get; set; }

        public string ATAPositionZone { get; set; }

       
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsDelete { get; set; }
    }
}
