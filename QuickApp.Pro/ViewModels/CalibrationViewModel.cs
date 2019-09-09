using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CalibrationViewModel
    {
        public long? AssetRecordId { get; set; }
        public Nullable<long> CalibrationDefaultVendorId { get; set; }
        public Nullable<byte> CalibrationFrequencyMonths { get; set; }
        public Nullable<byte> CalibrationFrequencyDays { get; set; }
        public Nullable<decimal> CalibrationDefaultCost { get; set; }
        public Nullable<long> CalibrationGlAccountId { get; set; }
        public string CalibrationMemo { get; set; }
        public Nullable<byte> CertificationFrequencyMonths { get; set; }
        public Nullable<byte> CertificationFrequencyDays { get; set; }
        public Nullable<decimal> CertificationDefaultCost { get; set; }
        public Nullable<long> CertificationGlAccountId { get; set; }
        public Nullable<long> CertificationDefaultVendorId { get; set; }
        public string CertificationMemo { get; set; }
        public string AssetCalibrationMin { get; set; }
        public string AssetCalibrationMinTolerance { get; set; }
        public string AssetCalibratonMax { get; set; }
        public string AssetCalibrationMaxTolerance { get; set; }
        public string AssetCalibrationExpected { get; set; }
        public string AssetCalibrationExpectedTolerance { get; set; }
        public string UpdatedBy { get; set; }
    }
}
