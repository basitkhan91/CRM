using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class ExpenditureCategoryDataExtractor : DataExtractorBase<ExpenditureCategory>
    {

        public ExpenditureCategoryDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override ExpenditureCategory MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new ExpenditureCategory
            {
                Description = excelDataReader.ExtractString(0),
                Memo = excelDataReader.ExtractString(1),
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
