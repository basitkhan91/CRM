using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class AssetIntangibleAttributeTypeDataExtractor : DataExtractorBase<AssetIntangibleAttributeType>
    {

        public AssetIntangibleAttributeTypeDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override AssetIntangibleAttributeType MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new AssetIntangibleAttributeType
            {
				AssetIntangibleTypeId = long.Parse(excelDataReader.ExtractString(0)),
                AssetDepreciationMethodId = long.Parse(excelDataReader.ExtractString(1)),
                IntangibleLifeYears = int.Parse(excelDataReader.ExtractString(2)),
                AssetAmortizationIntervalId = long.Parse(excelDataReader.ExtractString(3)),
                IntangibleGLAccountId = long.Parse(excelDataReader.ExtractString(4)),
                AmortExpenseGLAccountId = long.Parse(excelDataReader.ExtractString(5)),
                AccAmortDeprGLAccountId = long.Parse(excelDataReader.ExtractString(6)),
                IntangibleWriteDownGLAccountId = long.Parse(excelDataReader.ExtractString(7)),
                IntangibleWriteOffGLAccountId = long.Parse(excelDataReader.ExtractString(8)),
                ManagementStructureId = long.Parse(excelDataReader.ExtractString(9)),
                MasterCompanyId = 1,
                IsActive = true,
                IsDeleted = false,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime
            };

            return item;
        }
    }
}
