using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class AssetAttributeTypeDataExtractor : DataExtractorBase<AssetAttributeType>
    {

        public AssetAttributeTypeDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override AssetAttributeType MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new AssetAttributeType
            {
                AssetAttributeTypeId = excelDataReader.GetInt32(0),
                AssetTypeId = excelDataReader.GetInt32(1),
                AssetAttributeTypeName = excelDataReader.ExtractString(2),
                Description = excelDataReader.ExtractString(3),
                ConventionType = excelDataReader.GetInt32(4),
                DepreciationMethod = excelDataReader.GetInt32(5),
                ResidualPercentage = excelDataReader.GetByte(6),
                ResidualValue = excelDataReader.GetInt32(7),
                AssetLife = excelDataReader.GetInt32(8),
                DepreciationFrequencyId = excelDataReader.GetInt32(9),
                AcquiredGLAccountId = excelDataReader.GetInt32(10),
                DeprExpenseGLAccountId = excelDataReader.GetInt32(11),
                AdDepsGLAccountId = excelDataReader.GetInt32(12),
                AssetSale = excelDataReader.GetInt32(13),
                AssetWriteOff = excelDataReader.GetInt32(14),
                AssetWriteDown = excelDataReader.GetInt32(15),
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
