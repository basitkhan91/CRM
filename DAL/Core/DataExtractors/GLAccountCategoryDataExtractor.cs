using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class GLAccountCategoryDataExtractor : DataExtractorBase<GLAccountCategory>
    {

        public GLAccountCategoryDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override GLAccountCategory MapDataToModel(IExcelDataReader excelDataReader)
        {
            var currentDateTime = DateTime.Now;
            var item = new GLAccountCategory
            {
                GLAccountCategoryName = excelDataReader.ExtractString(1),
                MasterCompanyId = 1,
                IsActive = true,
                IsDelete = false,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime
            };

            int.TryParse(excelDataReader.ExtractString(0), out int GLCID);
            item.GLCID = GLCID;

            return item;
        }
    }
}
