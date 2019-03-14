﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class LaborOverloadCost
    {
        [Key]
        public long? LaborOverloadCostId { get; set; }

        public bool UseIndTechLaborRate { get; set; }
        
        public bool UseAvgRateTechByAction { get; set; }

        public bool UseAvgRateOfAllTech { get; set; }

        public bool AssignHoursBySpecificAction { get; set; }

        public bool AssignTotalHoursToWO { get; set; }
        [ForeignKey("FunctionalCurrencyId")]
        public int? FunctionalCurrencyId { get; set; }
        [ForeignKey("TransactionalCurrencyId")]
        public int? TransactionalCurrencyId { get; set; }

        public Byte AsPercentOfTechHourlyRate { get; set; }

        public bool FlatAmtPerHour { get; set; }

        public bool FlatAmtPerWO { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string FLATAMOUNTPERWORKORDER { get; set; }

        public string FLATAMOUNTPERHOUR { get; set; }

        public string AsPercentOFTECHNICIANMECHANICHOURLYRATE { get; set; }

        public string AVERAGERATEOFALLTECHNICIANMECHANIC { get; set; }
    }
}
