using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class StageCodeDataExtractor : DataExtractorBase<StageCode>
    {

        public StageCodeDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override StageCode MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new StageCode
            {
                GateCode = excelDataReader.ExtractString(0),
                Description = excelDataReader.ExtractString(1),
                Sequence = excelDataReader.ExtractString(2),
                Memo = excelDataReader.ExtractString(3),
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
