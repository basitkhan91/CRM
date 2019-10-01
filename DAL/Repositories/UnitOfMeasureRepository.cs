
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
    public class UnitOfMeasureRepository : Repository<DAL.Models.UnitOfMeasure>, IUnitOfMeasureRepository
    {
        private AppSettings AppSettings { get; set; }
        public UnitOfMeasureRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<DAL.Models.UnitOfMeasure> getUnitOfMeasureData()
        {
            return _appContext.UnitOfMeasure.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.UnitOfMeasureId).ToList();
        }

        public IQueryable<DAL.Models.UnitOfMeasure> GetPaginationData()
        {
            return _appContext.UnitOfMeasure.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.UnitOfMeasureId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);


        public IEnumerable<DAL.Models.UnitOfMeasureAudit> GetUnitOfMeasureAuditDetails(long unitOfMeasureId)
        {
            return _appContext.UnitOfMeasureAudit.Where(c => c.UnitOfMeasureId == unitOfMeasureId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        public IEnumerable<UnitOfMeasure> UploadUOMCustomData(IFormFile file)
        {
            string description = string.Empty;
            string shortName = string.Empty;
            string standard = string.Empty;
            string memo = string.Empty;
            List<UnitOfMeasure> unitOfMeasures = new List<UnitOfMeasure>();
            int count = 0;
            try
            {
                UnitOfMeasure unitOfMeasure;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.UnitOfMeasure), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);
                

                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if(count>0)
                                    {
                                        var flag = _appContext.UnitOfMeasure.Any(p => p.Description == reader.GetString(0).Trim() || p.ShortName == reader.GetString(1).Trim());
                                        if (!flag)
                                        {
                                            unitOfMeasure = new UnitOfMeasure();
                                            description = unitOfMeasure.Description = reader.GetString(0).Trim();
                                            shortName = unitOfMeasure.ShortName = reader.GetString(1).Trim();
                                            standard = unitOfMeasure.Standard = reader.GetString(2).Trim().Trim();
                                            memo = unitOfMeasure.Memo = reader.GetString(3).Trim().Trim();
                                            unitOfMeasure.MasterCompanyId = 1;
                                            unitOfMeasure.IsActive = true;
                                            unitOfMeasure.IsDeleted = false;
                                            unitOfMeasure.CreatedBy = unitOfMeasure.UpdatedBy = "System";
                                            unitOfMeasure.UpdatedDate = unitOfMeasure.CreatedDate = DateTime.Now;

                                            _appContext.UnitOfMeasure.Add(unitOfMeasure);
                                            _appContext.SaveChanges();
                                            unitOfMeasure.UploadStatus = "Success";
                                            unitOfMeasures.Add(unitOfMeasure);
                                        }
                                        else
                                        {
                                            unitOfMeasure = new UnitOfMeasure();
                                            unitOfMeasure.Description = reader.GetString(0).Trim();
                                            unitOfMeasure.ShortName = reader.GetString(1).Trim();
                                            unitOfMeasure.Standard = reader.GetString(2).Trim().Trim();
                                            unitOfMeasure.Memo = reader.GetString(3).Trim().Trim();
                                            unitOfMeasure.UploadStatus = "Duplicate";
                                            unitOfMeasures.Add(unitOfMeasure);
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
                UnitOfMeasure unitOfMeasure = new UnitOfMeasure();
                unitOfMeasure.Description = description;
                unitOfMeasure.ShortName = shortName;
                unitOfMeasure.Standard = standard;
                unitOfMeasure.Memo = memo;

                unitOfMeasure.UploadStatus = "Failed";
                unitOfMeasures.Add(unitOfMeasure);
            }
            return unitOfMeasures;
        }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
