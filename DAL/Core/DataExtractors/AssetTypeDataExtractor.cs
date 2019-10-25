using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class AssetTypeDataExtractor : DataExtractorBase<AssetType>
    {

        public AssetTypeDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override AssetType MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new AssetType
            {
                AssetTypeName = excelDataReader.ExtractString(0),
                AssetTypeMemo = excelDataReader.ExtractString(1),
                MasterCompanyId = 1,
                IsActive = true,
                IsDelete = false,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime
            };

            return item;
        }
    }
}
