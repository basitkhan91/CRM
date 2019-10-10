
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
            return _appContext.UnitOfMeasure.Where(c => (c.IsDeleted == false))
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
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(1) != null)
                                    {
                                        var flag = _appContext.UnitOfMeasure.Any(p => p.IsDeleted == false && (p.Description == Convert.ToString(reader.GetValue(0)).Trim() || p.ShortName == Convert.ToString(reader.GetValue(1)).Trim()));
                                        if (!flag)
                                        {
                                            unitOfMeasure = new UnitOfMeasure();
                                            if (reader.GetValue(0)!=null)
                                                description = unitOfMeasure.Description =Convert.ToString(reader.GetValue(0));
                                            if (reader.GetValue(1) != null)
                                                shortName = unitOfMeasure.ShortName = Convert.ToString(reader.GetValue(1));
                                            if (reader.GetValue(2) != null)
                                                standard = unitOfMeasure.Standard = Convert.ToString(reader.GetValue(2));
                                            if (reader.GetValue(3) != null)
                                                memo = unitOfMeasure.Memo = Convert.ToString(reader.GetValue(3));
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
                                            if (reader.GetValue(0) != null)
                                                unitOfMeasure.Description = Convert.ToString(reader.GetValue(0));
                                            if (reader.GetValue(1) != null)
                                                unitOfMeasure.ShortName = Convert.ToString(reader.GetValue(1));
                                            if (reader.GetValue(2) != null)
                                                unitOfMeasure.Standard = Convert.ToString(reader.GetValue(2));
                                            if (reader.GetValue(3) != null)
                                                unitOfMeasure.Memo = Convert.ToString(reader.GetValue(3));
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
