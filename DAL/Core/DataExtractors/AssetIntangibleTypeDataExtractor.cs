using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class AssetIntangibleTypeDataExtractor : DataExtractorBase<AssetIntangibleType>
    {

        public AssetIntangibleTypeDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override AssetIntangibleType MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new AssetIntangibleType
            {
                AssetIntangibleName = excelDataReader.ExtractString(0),
                AssetIntangibleMemo = excelDataReader.ExtractString(1),
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
