using DAL.Common;
using DAL.Models;
using ExcelDataReader;
using System;

namespace DAL.Core.DataExtractors
{
    public class SiteDataExtractor : DataExtractorBase<Site>
    {
        
        public SiteDataExtractor(AppSettings appSettings) : base(appSettings)
        {

        }

        public override Site MapDataToModel(IExcelDataReader reader)
        {
            var currentDateTime = DateTime.Now;

            var site = new Site
            {
                Name = reader.ExtractString(0),
                IsActive = true,
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,  
                UpdatedBy = SYSTEM_USER,  
                UpdatedDate = currentDateTime,
                MasterCompanyId = 1
            };


            site.Address = new Address
            {
                IsActive = true,
                MasterCompanyId = 1,
                Line1 = reader.ExtractString(1),
                Line2 = reader.ExtractString(2),
                Line3 = reader.ExtractString(3),
                City = reader.ExtractString(4),
                StateOrProvince = reader.ExtractString(5),
                Country = reader.ExtractString(6),
                PostalCode = reader.ExtractString(7),
                CreatedBy = SYSTEM_USER,
                CreatedDate = currentDateTime,
                UpdatedBy = SYSTEM_USER,
                UpdatedDate = currentDateTime
            };

            site.Memo = reader.ExtractString(8);

            return site; 
        }
    }
}
