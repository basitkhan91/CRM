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
                //AssetIntangibleTypeId = excelDataReader.ExtractString(0),
                //AssetIntangibleMemo = excelDataReader.ExtractString(1),
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
