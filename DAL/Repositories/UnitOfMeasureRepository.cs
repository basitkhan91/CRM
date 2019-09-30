
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using System.Net.Http.Headers;
using Spire.Xls;
using OfficeOpenXml;
using System.IO;
using DAL.Common;
using Microsoft.Extensions.Options;

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
            return _appContext.UnitOfMeasure.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.UnitOfMeasureId).ToList();
        }

        public IQueryable<DAL.Models.UnitOfMeasure> GetPaginationData()
        {
            return _appContext.UnitOfMeasure.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.UnitOfMeasureId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);


        public IEnumerable<DAL.Models.UnitOfMeasureAudit> GetUnitOfMeasureAuditDetails(long unitOfMeasureId)
        {
            return _appContext.UnitOfMeasureAudit.Where(c => c.UnitOfMeasureId == unitOfMeasureId).ToList();
        }

        public IEnumerable<UnitOfMeasure> UploadUOMCustomData(IFormFile file) 
        {
            try
            {

                List<UnitOfMeasure> unitOfMeasures = new List<UnitOfMeasure>();
                UnitOfMeasure unitOfMeasure;
                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.UnitOfMeasure),DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);

                if (Path.GetExtension(fileName).Equals(".xlsx"))
                {
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        {
                            using (var package = new ExcelPackage(stream))
                            {
                                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                                var rowCount = worksheet.Dimension.Rows;

                                for (int row = 2; row <= rowCount; row++)
                                {

                                    var flag = _appContext.UnitOfMeasure.Any(p => p.Description == worksheet.Cells[row, 1].Value.ToString().Trim() || p.ShortName == worksheet.Cells[row, 2].Value.ToString().Trim());

                                    if (!flag)
                                    {
                                        unitOfMeasure = new UnitOfMeasure();
                                        unitOfMeasure.Description = worksheet.Cells[row, 1].Value.ToString().Trim();
                                        unitOfMeasure.ShortName = worksheet.Cells[row, 2].Value.ToString().Trim();
                                        unitOfMeasure.Standard = worksheet.Cells[row, 3].Value.ToString().Trim();
                                        unitOfMeasure.Memo = worksheet.Cells[row, 4].Value.ToString().Trim();
                                        unitOfMeasure.MasterCompanyId = 1;
                                        unitOfMeasure.IsActive = true;
                                        unitOfMeasure.IsDelete = false;
                                        unitOfMeasure.CreatedBy = unitOfMeasure.UpdatedBy = "System";
                                        unitOfMeasure.UpdatedDate = unitOfMeasure.CreatedDate = DateTime.Now;


                                        _appContext.UnitOfMeasure.Add(unitOfMeasure);
                                        _appContext.SaveChanges();
                                    }
                                    else
                                    {
                                        unitOfMeasure = new UnitOfMeasure();
                                        unitOfMeasure.Description = worksheet.Cells[row, 1].Value.ToString().Trim();
                                        unitOfMeasure.ShortName = worksheet.Cells[row, 2].Value.ToString().Trim();
                                        unitOfMeasure.Standard = worksheet.Cells[row, 3].Value.ToString().Trim();
                                        unitOfMeasure.Memo = worksheet.Cells[row, 4].Value.ToString().Trim();

                                        unitOfMeasures.Add(unitOfMeasure);
                                    }


                                }
                            }
                        }
                    }
                }

                

                return unitOfMeasures;
            }
            catch (Exception)
            {
                throw;
            }
        }

        


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
