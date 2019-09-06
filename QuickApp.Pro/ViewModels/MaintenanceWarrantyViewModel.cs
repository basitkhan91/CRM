using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class MaintenanceWarrantyViewModel
    {
        public long? AssetRecordId { get; set; }
        public Nullable<bool> AssetIsMaintenanceReqd { get; set; }
        public Nullable<bool> AssetMaintenanceIsContract { get; set; }
        public string AssetMaintenanceContractFile { get; set; }
        public Nullable<byte> MaintenanceFrequencyMonths { get; set; }
        public Nullable<byte> MaintenanceFrequencyDays { get; set; }
        public Nullable<long> DefaultVendorId { get; set; }
        public Nullable<long> GLAccountId { get; set; }
        public string MaintenanceMemo { get; set; }
        public Nullable<bool> IsWarrantyRequired { get; set; }
        public Nullable<bool> Warranty { get; set; }
        public string WarrantyCompany { get; set; }
        public Nullable<System.DateTime> WarrantyStartDate { get; set; }
        public Nullable<System.DateTime> WarrantyEndDate { get; set; }
        public string WarrantyStatus { get; set; }
        public Nullable<byte> UnexpiredTime { get; set; }
        public string UpdatedBy { get; set; }

        public IFormFile MaintenanceFile { get; set; }
        public IFormFile WarantyFile { get; set; }
    }
}
