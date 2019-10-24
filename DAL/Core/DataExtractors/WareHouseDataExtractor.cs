using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class WareHouseDataExtractor : DataExtractorBase<Warehouse>
    {
        
        public WareHouseDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override Warehouse MapDataToModel(IExcelDataReader reader)
        {
            var currentDateTime = DateTime.Now;


            var wareHouse = new Warehouse
            {
                Site = new Site
                {
                    Name = reader.ExtractString(0)
                },

                Name = reader.ExtractString(1),
                Memo = reader.ExtractString(2),
                IsActive = true,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime,
                MasterCompanyId = 1
            };

            return wareHouse;
        }
    }
}
