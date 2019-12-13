using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
  public class AssetAudit
    {
        [Key]
        public long? AssetAuditId { get; set; }

        public long? AssetRecordId { get; set; }
        public string AssetId { get; set; }
        public string AlternateAssetId { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
        public long? ManagementStructureId { get; set; }
        public Nullable<bool> CalibrationRequired { get; set; }
        public Nullable<bool> CertificationRequired { get; set; }
        public Nullable<bool> InspectionRequired { get; set; }
        public Nullable<bool> VerificationRequired { get; set; }
        public Nullable<bool> IsDepreciable { get; set; }
        public Nullable<bool> IsIntangible { get; set; }
        public Nullable<byte> AssetAcquisitionTypeId { get; set; }
        public Nullable<long> ManufacturerId { get; set; }
        public Nullable<System.DateTime> ManufacturedDate { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public string Model { get; set; }
        public Nullable<bool> IsSerialized { get; set; }
        public Nullable<long> UnitOfMeasureId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<int> CalibrationCurrencyId { get; set; }
        public Nullable<int> CertificationCurrencyId { get; set; }
        public Nullable<int> InspectionCurrencyId { get; set; }
        public Nullable<int> VerificationCurrencyId { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public Nullable<System.DateTime> ExpirationDate { get; set; }
        public string Asset_Location { get; set; }
        public string Memo { get; set; }
        public string AssetParentId { get; set; }
        public Nullable<long> AssetTypeId { get; set; }
        public Nullable<long> AssetIntangibleTypeId { get; set; }
        public string AssetCalibrationMin { get; set; }
        public string AssetCalibrationMinTolerance { get; set; }
        public string AssetCalibratonMax { get; set; }
        public string AssetCalibrationMaxTolerance { get; set; }
        public string AssetCalibrationExpected { get; set; }
        public string AssetCalibrationExpectedTolerance { get; set; }
        public string AssetCalibrationMemo { get; set; }
        public Nullable<bool> AssetIsMaintenanceReqd { get; set; }
        public Nullable<bool> AssetMaintenanceIsContract { get; set; }
        public string AssetMaintenanceContractFile { get; set; }
        public Nullable<byte> MaintenanceFrequencyMonths { get; set; }
        public Nullable<byte> MaintenanceFrequencyDays { get; set; }
        public Nullable<long> DefaultVendorId { get; set; }
        public Nullable<long> GLAccountId { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public string MaintenanceMemo { get; set; }
        public Nullable<bool> IsWarrantyRequired { get; set; }
        public Nullable<bool> Warranty { get; set; }
        public string WarrantyCompany { get; set; }
        public Nullable<System.DateTime> WarrantyStartDate { get; set; }
        public Nullable<System.DateTime> WarrantyEndDate { get; set; }
        public string WarrantyStatus { get; set; }
        //public string WarrantyFile { get; set; }
        //public string WarrantyFileExt { get; set; }
        public Nullable<byte> UnexpiredTime { get; set; }
        public Nullable<Int32> MasterCompanyId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<long> CalibrationDefaultVendorId { get; set; }
        public Nullable<long> CertificationDefaultVendorId { get; set; }
        public Nullable<long> InspectionDefaultVendorId { get; set; }
        public Nullable<long> VerificationDefaultVendorId { get; set; }
        public Nullable<byte> CalibrationFrequencyMonths { get; set; }
        public Nullable<byte> CalibrationFrequencyDays { get; set; }
        public Nullable<decimal> CalibrationDefaultCost { get; set; }
        public Nullable<long> CalibrationGlAccountId { get; set; }
        public string CalibrationMemo { get; set; }
        public Nullable<byte> CertificationFrequencyMonths { get; set; }
        public Nullable<byte> CertificationFrequencyDays { get; set; }
        public Nullable<decimal> CertificationDefaultCost { get; set; }
        public Nullable<long> CertificationGlAccountId { get; set; }
        public string CertificationMemo { get; set; }
        public Nullable<byte> InspectionFrequencyMonths { get; set; }
        public Nullable<byte> InspectionFrequencyDays { get; set; }
        public Nullable<decimal> InspectionDefaultCost { get; set; }
        public Nullable<long> InspectionGlaAccountId { get; set; }
        public string InspectionMemo { get; set; }
        public Nullable<byte> VerificationFrequencyMonths { get; set; }
        public Nullable<byte> VerificationFrequencyDays { get; set; }
        public Nullable<decimal> VerificationDefaultCost { get; set; }
        public string VerificationMemo { get; set; }
        public Nullable<long> VerificationGlAccountId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}
