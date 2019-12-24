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
                //AssetAttributeTypeId = excelDataReader.GetInt32(0),
                AssetTypeId = long.Parse(excelDataReader.ExtractString(0)),
                Description = excelDataReader.ExtractString(1),
                AssetAttributeTypeName = excelDataReader.ExtractString(2),
                ConventionType = long.Parse(excelDataReader.ExtractString(3)),
                DepreciationMethod = long.Parse(excelDataReader.ExtractString(4)),
                ResidualPercentage = byte.Parse(excelDataReader.ExtractString(5)),
                //ResidualValue = excelDataReader.ExtractString(7),
                AssetLife = int.Parse(excelDataReader.ExtractString(6)),
                DepreciationFrequencyId = long.Parse(excelDataReader.ExtractString(7)),
                AcquiredGLAccountId = long.Parse(excelDataReader.ExtractString(8)),
                DeprExpenseGLAccountId = long.Parse(excelDataReader.ExtractString(9)),
                AdDepsGLAccountId = long.Parse(excelDataReader.ExtractString(10)),
                AssetSale = long.Parse(excelDataReader.ExtractString(11)),
                AssetWriteOff = long.Parse(excelDataReader.ExtractString(12)),
                AssetWriteDown = long.Parse(excelDataReader.ExtractString(13)),
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
