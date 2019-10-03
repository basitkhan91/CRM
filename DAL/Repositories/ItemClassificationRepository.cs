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
    public class ItemClassificationRepository : Repository<DAL.Models.ItemClassfication>, IItemClassification
    {
        private AppSettings AppSettings { get; set; }
        public ItemClassificationRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<DAL.Models.ItemClassfication> getItemClassification()
        {
            return _appContext.ItemClassification.Include("MasterCompany").Where(c => c.IsDeleted == false).OrderByDescending(c => c.ItemClassificationId).ToList();
        }

        override
       public IQueryable<DAL.Models.ItemClassfication> GetPaginationData()
        {
            return _appContext.ItemClassification.Where(c => c.IsDeleted == false)
                .OrderByDescending(c => c.ItemClassificationId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);


        public IEnumerable<ItemClassfication> UploadCustomData(IFormFile file)
        {
            string itemClassificationCode = string.Empty;
            string description = string.Empty;
            string itemType = string.Empty;
            string memo = string.Empty;

            List<ItemClassfication> itemClassfications = new List<ItemClassfication>();
            int count = 0;
            try
            {
                ItemClassfication itemClassfication;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.ItemClassfication), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                        var flag = _appContext.ItemClassification.Any(p => p.ItemClassificationCode == reader.GetString(0).Trim() && p.IsDeleted == false);
                                        if (!flag)
                                        {
                                            itemClassfication = new ItemClassfication();
                                            itemClassificationCode = itemClassfication.ItemClassificationCode = reader.GetString(0).Trim();
                                            description = itemClassfication.Description = reader.GetString(1).Trim();
                                            itemType = itemClassfication.ItemType = reader.GetString(2).Trim();
                                            memo = itemClassfication.Memo = reader.GetString(3).Trim();

                                            itemClassfication.MasterCompanyId = 1;
                                            itemClassfication.IsActive = true;
                                            itemClassfication.IsDeleted = false;
                                            itemClassfication.CreatedBy = itemClassfication.UpdatedBy = "System";
                                            itemClassfication.UpdatedDate = itemClassfication.CreatedDate = DateTime.Now;

                                            _appContext.ItemClassification.Add(itemClassfication);
                                            _appContext.SaveChanges();
                                            itemClassfication.UploadStatus = "Success";
                                            itemClassfications.Add(itemClassfication);
                                        }
                                        else
                                        {
                                            itemClassfication = new ItemClassfication();
                                            itemClassificationCode = itemClassfication.ItemClassificationCode = reader.GetString(0).Trim();
                                            description = itemClassfication.Description = reader.GetString(1).Trim();
                                            itemType = itemClassfication.ItemType = reader.GetString(2).Trim();
                                            memo = itemClassfication.Memo = reader.GetString(3).Trim();

                                            itemClassfication.MasterCompanyId = 1;
                                            itemClassfication.IsActive = true;
                                            itemClassfication.IsDeleted = false;
                                            itemClassfication.CreatedBy = itemClassfication.UpdatedBy = "System";
                                            itemClassfication.UpdatedDate = itemClassfication.CreatedDate = DateTime.Now;

                                            itemClassfication.UploadStatus = "Duplicate";
                                            itemClassfications.Add(itemClassfication);
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
                ItemClassfication itemClassfication = new ItemClassfication();
                itemClassfication.ItemClassificationCode = itemClassificationCode;
                itemClassfication.Description = description;
                itemClassfication.ItemType = itemType;
                itemClassfication.Memo = memo;

                itemClassfication.MasterCompanyId = 1;
                itemClassfication.IsActive = true;
                itemClassfication.IsDeleted = false;
                itemClassfication.CreatedBy = itemClassfication.UpdatedBy = "System";
                itemClassfication.UpdatedDate = itemClassfication.CreatedDate = DateTime.Now;


                itemClassfication.UploadStatus = "Failed";
                itemClassfications.Add(itemClassfication);
            }
            return itemClassfications;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
