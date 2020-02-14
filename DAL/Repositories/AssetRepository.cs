using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class AssetRepository : Repository<DAL.Models.Asset>, IAssetRepository
    {
        public AssetRepository(ApplicationDbContext context) : base(context)
        { }

        IEnumerable<object> IAssetRepository.getAllAssetList()
        {
            var data = _appContext.Asset.Where(c => (c.IsDelete == false || c.IsDelete == null) && (c.IsActive == true));
            var temp = data.Include("Manufacturer");
            var temp1 = temp.Include("GLAccount");
            var temp2 = temp1.Include("Currency");
            var temp3 = temp2.Include("UnitOfMeasure");
            var temp4 = temp3.Include("AssetType");
            var temp5 = temp4.OrderByDescending(c => c.AssetRecordId).ToList();
            return data;
        }

        public IEnumerable<Asset> getAllAsset()
        {
            var asset = _appContext.Asset.Where(c => (c.IsDelete == false || c.IsDelete == null) && (c.IsActive == true));
            return asset.Include("AssetType").ToList();
        }

        public IEnumerable<object> getCapabilityData(long id)
        {
            {
                var data = (from capability in _appContext.AssetCapes
                            join im
                            in _appContext.ItemMaster on capability.ItemMasterId equals im.ItemMasterId
                            //join cap in _appContext.Capability on ac.CapabilityId equals cap.CapabilityId
                            join captype in _appContext.capabilityType on capability.CapabilityId equals captype.CapabilityTypeId
                            join act in _appContext.AircraftType on capability.AircraftTypeId equals act.AircraftTypeId
                            join acm in _appContext.AircraftModel on capability.AircraftModelId equals acm.AircraftModelId into airmodel
                            from acm in airmodel.DefaultIfEmpty()
                            join dn in _appContext.AircraftDashNumber on capability.AircraftDashNumberId equals dn.DashNumberId into dashnum
                            from dn in dashnum.DefaultIfEmpty()
                            where capability.AssetRecordId == id

                            select new
                            {
                                assetCapesId = capability.AssetCapesId,
                                itemMasterId = capability.ItemMasterId,
                                aircraftModelId = capability.AircraftModelId,
                                capability.AircraftDashNumberId,
                                partNumber = im.PartNumber,
                                im.PartDescription,
                                captypedescription = captype.Description,
                                manufacturer = act.Description,
                                modelname = acm.ModelName,
                                dashNumber = dn.DashNumber,
                                capability.IsActive,
                                aircraftTypeId = capability.AircraftTypeId

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getAssetCapabilityData(long id)
        {
            {
                var data = (from capability in _appContext.AssetCapes
                            join im
                            in _appContext.ItemMaster on capability.ItemMasterId equals im.ItemMasterId
                            //join cap in _appContext.Capability on ac.CapabilityId equals cap.CapabilityId
                            join captype in _appContext.capabilityType on capability.CapabilityId equals captype.CapabilityTypeId
                            join act in _appContext.AircraftType on capability.AircraftTypeId equals act.AircraftTypeId
                            join acm in _appContext.AircraftModel on capability.AircraftModelId equals acm.AircraftModelId into airmodel
                            from acm in airmodel.DefaultIfEmpty()
                            join dn in _appContext.AircraftDashNumber on capability.AircraftDashNumberId equals dn.DashNumberId into dashnum
                            from dn in dashnum.DefaultIfEmpty()
                            where capability.AssetCapesId == id

                            select new
                            {
                                assetCapesId = capability.AssetCapesId,
                                itemMasterId = capability.ItemMasterId,
                                aircraftModelId = capability.AircraftModelId,
                                capability.AircraftDashNumberId,
                                partNumber = im.PartNumber,
                                im.PartDescription,
                                captypedescription = captype.Description,
                                manufacturer = act.Description,
                                modelname = acm.ModelName,
                                dashNumber = dn.DashNumber,
                                capability.IsActive,
                                aircraftTypeId = capability.AircraftTypeId

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> GetAsset(string id)
        {
            {
                var data = (from asset in _appContext.Asset
                            where asset.AssetId == id

                            select new
                            {
                                asset.AssetId,
                                asset.AssetRecordId,
                                asset.AlternateAssetId,
                                asset.AssetAcquisitionTypeId,
                                asset.AssetCalibrationExpected,
                                asset.AssetCalibrationExpectedTolerance,
                                asset.AssetCalibrationMaxTolerance,
                                asset.AssetCalibrationMemo,
                                asset.AssetCalibrationMin,
                                asset.AssetCalibratonMax,
                                asset.AssetIntangibleTypeId,
                                asset.AssetIsMaintenanceReqd,
                                asset.AssetMaintenanceContractFile,
                                asset.AssetMaintenanceContractFileExt,
                                asset.AssetMaintenanceIsContract,
                                asset.AssetParentId,
                                asset.AssetType,
                                asset.AssetTypeId,
                                asset.Asset_Location,
                                asset.CalibrationCurrencyId,
                                asset.CalibrationDefaultCost,
                                asset.CalibrationDefaultVendorId,
                                asset.CalibrationFrequencyDays,
                                asset.CalibrationFrequencyMonths,
                                asset.CalibrationGlAccountId,
                                asset.CalibrationMemo,
                                asset.CalibrationRequired,
                                asset.CertificationCurrencyId,
                                asset.CertificationFrequencyDays,
                                asset.CertificationDefaultVendorId,
                                asset.CertificationGlAccountId,
                                asset.CertificationMemo,
                                asset.CertificationRequired,
                                asset.CreatedBy,
                                asset.CreatedDate,
                                asset.Currency,
                                asset.CurrencyId,
                                asset.DefaultVendorId,
                                asset.Description,
                                asset.EntryDate,
                                asset.ExpirationDate,
                                asset.GLAccount,
                                asset.GLAccountId,
                                asset.InspectionCurrencyId,
                                asset.InspectionDefaultCost,
                                asset.InspectionDefaultVendorId,
                                asset.InspectionFrequencyDays,
                                asset.InspectionFrequencyMonths,
                                asset.InspectionGlaAccountId,
                                asset.InspectionMemo,
                                asset.InspectionRequired,
                                asset.IsActive,
                                asset.IsDelete,
                                asset.IsDepreciable,
                                asset.IsIntangible,
                                asset.IsSerialized,
                                asset.IsWarrantyRequired,
                                asset.MaintenanceFrequencyDays,
                                asset.MaintenanceFrequencyMonths,
                                asset.MaintenanceMemo,
                                asset.ManagementStructureId,
                                asset.ManufacturedDate,
                                asset.ManufacturerId,
                                asset.Manufacturer,
                                asset.MasterCompanyId,
                                asset.MasterPartId,
                                asset.Memo,
                                asset.Model,
                                asset.Name,
                                asset.UnexpiredTime,
                                asset.UnitCost,
                                asset.UnitOfMeasureId,
                                asset.UpdatedBy,
                                asset.UpdatedDate,
                                asset.VerificationCurrencyId,
                                asset.VerificationDefaultCost,
                                asset.VerificationDefaultVendorId,
                                asset.VerificationFrequencyDays,
                                asset.VerificationFrequencyMonths,
                                asset.VerificationGlAccountId,
                                asset.VerificationMemo,
                                asset.VerificationRequired,
                                asset.Warranty,
                                asset.WarrantyCompany,
                                asset.WarrantyEndDate,
                                asset.WarrantyFile,
                                asset.WarrantyFileExt,
                                asset.WarrantyStartDate,
                                asset.WarrantyStatus

                            }).ToList();
                return data;
            }
        }
        public IEnumerable<object> getCapesList(long id)
        {
            {
                //var data = _appContext.AssetCapes.Where(a => a.AssetRecordId == id).ToList();

                var data = (from ac in _appContext.AssetCapes
                            join im
in _appContext.ItemMaster on ac.ItemMasterId equals im.ItemMasterId
                            //join cap in _appContext.Capability on ac.CapabilityId equals cap.CapabilityId
                            join captype in _appContext.capabilityType on ac.CapabilityId equals captype.CapabilityTypeId
                            join act in _appContext.AircraftType on ac.AircraftTypeId equals act.AircraftTypeId
                            join acm in _appContext.AircraftModel on ac.AircraftModelId equals acm.AircraftModelId into airmodel
                            from acm in airmodel.DefaultIfEmpty()
                            join dn in _appContext.AircraftDashNumber on ac.AircraftDashNumberId equals dn.DashNumberId into dashnum
                            from dn in dashnum.DefaultIfEmpty()
                            where ac.AssetRecordId == id && (ac.IsDelete == false || ac.IsDelete == null)

                            select new
                            {
                                ac.AssetCapesId,
                                ac.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                captypedescription = captype.Description,
                                manufacturer = act.Description,
                                modelname = acm.ModelName,
                                dashnumber = acm.ModelName + "-" + dn.DashNumber,
                                ac.IsActive,
                                ac.AircraftTypeId

                            }).ToList();
                return data;
            }
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

}
