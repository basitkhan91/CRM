
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
using System.IO;
using DAL.Common;
using Microsoft.Extensions.Options;
using ExcelDataReader;

namespace DAL.Repositories
{
    public class CurrencyRepository : Repository<Currency>,ICurrencyRepository
    {
        private AppSettings AppSettings { get; set; }
        public CurrencyRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }


        public IEnumerable<Currency> GetAllCurrencyData()
        {
           
            try
            {
                var result=_appContext.Currency.Where(c => ((c.IsDeleted == null || c.IsDeleted==false) && (c.IsActive==true))).OrderBy(c => c.Code).ToList();
                //var result = _appContext.Currency.Include("MasterCompany").Where(c => c.IsDelete == null).ToList();
                //var result = _appContext.Currency.Include("MasterCompany").ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        override
       public IQueryable<DAL.Models.Currency> GetPaginationData()
        {
            return _appContext.Currency.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.CurrencyId).ToList().AsQueryable();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;


        public IEnumerable<DAL.Models.Currency> UploadCurrencyCustomData(IFormFile file)
        {
            string code = string.Empty;
            string symbol = string.Empty;
            string memo = string.Empty;
            string DisplayName = string.Empty;
            List<DAL.Models.Currency> Currencys = new List<DAL.Models.Currency>();
            int count = 0;
            try
            {
                DAL.Models.Currency currency;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.Customer), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                        var flag = _appContext.Currency.Any(p => p.IsDeleted == false && (p.Code == Convert.ToString(reader.GetValue(0)).Trim()) &&
                                        (p.Symbol == Convert.ToString(reader.GetValue(1)).Trim()));
                                        if (!flag)
                                        {
                                            currency = new DAL.Models.Currency();
                                            if (reader.GetValue(0) != null)
                                                code = currency.Code = Convert.ToString(reader.GetValue(0));
                                            
                                            if (reader.GetValue(1) != null)
                                                symbol = currency.Symbol = Convert.ToString(reader.GetValue(1));
                                            if (reader.GetValue(2) != null)
                                                DisplayName = currency.DisplayName = Convert.ToString(reader.GetValue(2));
                                            if (reader.GetValue(3) != null)
                                                memo = currency.Memo = Convert.ToString(reader.GetValue(3));
                                            currency.MasterCompanyId = 1;
                                            currency.IsActive = true;
                                            currency.IsDeleted = false;
                                            currency.CreatedBy = currency.UpdatedBy = "System";
                                            currency.UpdatedDate = currency.CreatedDate = DateTime.Now;

                                            _appContext.Currency.Add(currency);
                                            _appContext.SaveChanges();
                                            currency.UploadStatus = "Success";
                                            Currencys.Add(currency);
                                        }
                                        else
                                        {
                                            currency = new DAL.Models.Currency();
                                            if (reader.GetValue(0) != null)
                                                currency.Code = Convert.ToString(reader.GetValue(0));

                                            if (reader.GetValue(1) != null)
                                                currency.Symbol = Convert.ToString(reader.GetValue(1));

                                            if (reader.GetValue(2) != null)
                                                currency.DisplayName = Convert.ToString(reader.GetValue(2));

                                            if (reader.GetValue(3) != null)
                                                currency.Memo = Convert.ToString(reader.GetValue(3));
                                            currency.UploadStatus = "Duplicate";
                                            Currencys.Add(currency);
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
                DAL.Models.Currency currency = new DAL.Models.Currency();
                currency.Code = code;
                currency.Symbol = symbol;
                currency.DisplayName = DisplayName;
                currency.Memo = memo;
                currency.UploadStatus = "Failed";
                Currencys.Add(currency);
            }
            return Currencys;
        }
        public Object GetCurrencyAuditDetails(long id)
        {
            return (from asc in _appContext.CurrencyAudit
                     where asc.CurrencyId == id
                    select new
                    {
                     asc.DisplayName,
                     asc.CurrencyId,
                     asc.Code,
                     asc.Symbol,
                     asc.Memo,
                     asc.MasterCompanyId,
                     asc.IsActive,
                     asc.UpdatedDate,
                    
                        asc.CreatedBy,
                        asc.CreatedDate,
                        asc.UpdatedBy
                    }).OrderByDescending(p => p.UpdatedDate).ToList();
        }


    }
}
