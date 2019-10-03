using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace DAL.Repositories
{
   public class ManufacturerRepository : Repository<DAL.Models.Manufacturer>, IManufacturerRepository
    {
        private AppSettings AppSettings { get; set; }
        public ManufacturerRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<Models.Manufacturer> GetAllManufacturerData()
        {
            return _appContext.Manufacturer.Include("MasterCompany").Where(a => a.IsDeleted == false).OrderByDescending(a => a.ManufacturerId).ToList();

        }
        override
       public IQueryable<DAL.Models.Manufacturer> GetPaginationData()
        {
            return _appContext.Manufacturer.Where(c => c.IsDeleted == false)
                .OrderByDescending(c => c.ManufacturerId).ToList().AsQueryable();
        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        public IEnumerable<ManufacturerAudit> GetManufacturerHistory(long manufacturerId)
        {
            try
            {
                return _appContext.ManufacturerAudit.Where(p => p.ManufacturerId == manufacturerId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public IEnumerable<Manufacturer> UploadCustomData(IFormFile file)
        {
            string name = string.Empty;
            string comments = string.Empty;
            string memo = string.Empty;

            List<Manufacturer> manufacturers = new List<Manufacturer>();
            int count = 0;
            try
            {
                Manufacturer manufacturer;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.Manufacturer), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0)
                                    {
                                        var flag = _appContext.Manufacturer.Any(p => p.Name == reader.GetString(0).Trim());
                                        if (!flag)
                                        {
                                            manufacturer = new Manufacturer();
                                            name = manufacturer.Name = reader.GetString(0).Trim();
                                            comments = manufacturer.Comments = reader.GetString(1).Trim();
                                            manufacturer.MasterCompanyId = 1;
                                            manufacturer.IsActive = true;
                                            manufacturer.IsDeleted = false;
                                            manufacturer.CreatedBy = manufacturer.UpdatedBy = "System";
                                            manufacturer.UpdatedDate = manufacturer.CreatedDate = DateTime.Now;

                                            _appContext.Manufacturer.Add(manufacturer);
                                            _appContext.SaveChanges();
                                            manufacturer.UploadStatus = "Success";
                                            manufacturers.Add(manufacturer);
                                        }
                                        else
                                        {
                                            manufacturer = new Manufacturer();
                                            name = manufacturer.Name = reader.GetString(0).Trim();
                                            comments = manufacturer.Comments = reader.GetString(1).Trim();
                                            manufacturer.MasterCompanyId = 1;
                                            manufacturer.IsActive = true;
                                            manufacturer.IsDeleted = false;
                                            manufacturer.CreatedBy = manufacturer.UpdatedBy = "System";
                                            manufacturer.UpdatedDate = manufacturer.CreatedDate = DateTime.Now;

                                            manufacturer.UploadStatus = "Duplicate";
                                            manufacturers.Add(manufacturer);
                                        }
                                    }
                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Manufacturer manufacturer = new Manufacturer();
                manufacturer.Name = name;
                manufacturer.Comments = comments;
                manufacturer.MasterCompanyId = 1;
                manufacturer.IsActive = true;
                manufacturer.IsDeleted = false;
                manufacturer.CreatedBy = manufacturer.UpdatedBy = "System";
                manufacturer.UpdatedDate = manufacturer.CreatedDate = DateTime.Now;

                manufacturer.UploadStatus = "Failed";
                manufacturers.Add(manufacturer);
            }
            return manufacturers;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

