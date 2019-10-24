using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class ShelfDataExtractor : DataExtractorBase<Shelf>
    {
        
        public ShelfDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override Shelf MapDataToModel(IExcelDataReader reader)
        {
            var currentDateTime = DateTime.Now;


            var shelf = new Shelf
            {
                Site = new Site
                {
                    Name = reader.ExtractString(0)
                },

                Warehouse = new Warehouse
                {
                    Name = reader.ExtractString(1)
                },  

                Location  = new Location
                {
                    Name = reader.ExtractString(2)
                },

                Name = reader.ExtractString(3),
                Memo = reader.ExtractString(4),
                IsActive = true,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime,
                MasterCompanyId = 1
            };

            return shelf;
        }
    }
}
