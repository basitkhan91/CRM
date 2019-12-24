using DAL.Repositories.Interfaces;
using System;
using DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DAL.Core;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using DAL.Common;
using System.IO;
using ExcelDataReader;
using Microsoft.Extensions.Options;

namespace DAL.Repositories
{
    public class EmployeeExpertiseRepository : Repository<DAL.Models.EmployeeExpertise>, IEmployeeExpertiseRepository
    {

        private AppSettings AppSettings { get; set; }
        public EmployeeExpertiseRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<DAL.Models.EmployeeExpertise> getAllEmployeeExpertiseInfo()
        {
            return _appContext.EmployeeExpertise.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.EmployeeExpertiseId).ToList();
            //  return _appContext.EmployeeExpertise.Include("MasterCompany").Where(c => (c.IsActive == true && c.IsDelete != null) || (c.IsActive == true && c.IsDelete != true)).OrderByDescending(c => c.EmployeeExpertiseId).ToList();
            
        }


        public IEnumerable<DAL.Models.EmployeeExpertise> UploadEmployeeExpertiseCustomData(IFormFile file)
        {
            string description = string.Empty;
            string employeeexpertise = string.Empty;
            string memo = string.Empty;
            List<DAL.Models.EmployeeExpertise> EmloyeeExpertises = new List<DAL.Models.EmployeeExpertise>();
            int count = 0;
            try
            {
                DAL.Models.EmployeeExpertise employeeExpertise;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.Employee), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                        var flag = _appContext.EmployeeExpertise.Any(p => p.IsDelete == false && (p.Description == Convert.ToString(reader.GetValue(0)).Trim()));
                                        if (!flag)
                                        {
                                            employeeExpertise = new DAL.Models.EmployeeExpertise();
                                            if (reader.GetValue(0) != null)
                                                description = employeeExpertise.Description = Convert.ToString(reader.GetValue(0));                                           
                                           
                                            if (reader.GetValue(1) != null)
                                                memo = employeeExpertise.Memo = Convert.ToString(reader.GetValue(1));
                                            employeeExpertise.MasterCompanyId = 1;
                                            employeeExpertise.IsActive = true;
                                            employeeExpertise.IsDelete = false;
                                            employeeExpertise.CreatedBy = employeeExpertise.UpdatedBy = "System";
                                            employeeExpertise.UpdatedDate = employeeExpertise.CreatedDate = DateTime.Now;

                                            _appContext.EmployeeExpertise.Add(employeeExpertise);
                                            _appContext.SaveChanges();
                                            employeeExpertise.UploadStatus = "Success";
                                            EmloyeeExpertises.Add(employeeExpertise);
                                        }
                                        else
                                        {
                                            employeeExpertise = new DAL.Models.EmployeeExpertise();
                                            if (reader.GetValue(0) != null)
                                                employeeExpertise.Description = Convert.ToString(reader.GetValue(0));                                          
                                           
                                            if (reader.GetValue(1) != null)
                                                employeeExpertise.Memo = Convert.ToString(reader.GetValue(1));
                                            employeeExpertise.UploadStatus = "Duplicate";
                                            EmloyeeExpertises.Add(employeeExpertise);
                                        }
                                    }
                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
            }
            catch (Exception)
            {
                DAL.Models.EmployeeExpertise employeeExpertise = new DAL.Models.EmployeeExpertise();
                employeeExpertise.Description = description;              
                employeeExpertise.Memo = memo;
                employeeExpertise.UploadStatus = "Failed";
                EmloyeeExpertises.Add(employeeExpertise);
            }
            return EmloyeeExpertises;
        }



        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
