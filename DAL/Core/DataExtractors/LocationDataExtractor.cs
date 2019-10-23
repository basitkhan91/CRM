using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class LocationDataExtractor : DataExtractorBase<Location>
    {
        
        public LocationDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override Location MapDataToModel(IExcelDataReader reader)
        {
            var currentDateTime = DateTime.Now;


            var location = new Location
            {
                Site = new Site
                {
                    Name = reader.ExtractString(0)
                },

                Warehouse = new Warehouse
                {
                    Name = reader.ExtractString(1)
                },  

                Name = reader.ExtractString(2),
                Memo = reader.ExtractString(3),
                IsActive = true,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime,
                MasterCompanyId = 1
            };

            return location;
        }
    }
}
