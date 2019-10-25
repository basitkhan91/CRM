using DAL.Common;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;

namespace DAL.Core.DataExtractors
{
    public abstract class DataExtractorBase<TOutputType> : IDataExtractor<TOutputType>
    {
        protected const string SYSTEM_USER = "System";  
        private AppSettings AppSettings { get; set; }
        public DataExtractorBase(AppSettings appSettings)
        {
            AppSettings = appSettings;
        }
        public IEnumerable<TOutputType> Extract(IFormFile file, ModuleEnum module)
        {
            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

            string directory = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(module), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

            IList<TOutputType> items = new List<TOutputType>();

            var currentRecordPosition = 0;
            try
            {

                CreateDirectory(directory);

                string absolutePath = Path.Combine(directory, fileName);

                using (var stream = File.Open(absolutePath, FileMode.Create))
                {
                    file.CopyTo(stream);

                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                       while(reader.Read())
                        { 
                            if (currentRecordPosition > 0)
                            {
                                TOutputType model = MapDataToModel(reader);

                                if (model != null)
                                {
                                    items.Add(model);
                                }
                            }

                            currentRecordPosition++;
                        }
                    }
                }
            }

            catch (Exception e)
            {
                throw e;
            }

            return items;
        }

        private void CreateDirectory(string directory)
        {
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }

        public abstract TOutputType MapDataToModel(IExcelDataReader excelDataReader);
    }
}
