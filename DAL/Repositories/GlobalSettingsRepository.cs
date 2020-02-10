using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
namespace DAL.Repositories
{
    public class GlobalSettingsRepository : Repository<GlobalSettings>, IGlobalSettingsRepository
    {
        public GlobalSettingsRepository(ApplicationDbContext context) : base(context)
        {
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        #region Global Settings

        public GlobalSettings CreateGlobalSettings(GlobalSettings globalSetting)
        {
            try
            {
                globalSetting.IsActive = true;
                globalSetting.IsDeleted = false;

                if (globalSetting.GlobalSettingId > 0)
                {
                    globalSetting.UpdatedDate = DateTime.Now;
                    _appContext.GlobalSettings.Update(globalSetting);
                }
                else
                {
                    globalSetting.CreatedDate = globalSetting.UpdatedDate = DateTime.Now;
                    _appContext.GlobalSettings.Add(globalSetting);
                }

                _appContext.SaveChanges();
                return globalSetting;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetGlobalSettings(int masterCompanyId)
        {
            try
            {
                var data = (from gs in _appContext.GlobalSettings
                            where gs.IsActive == true && gs.IsDeleted == false && gs.CompanyId == masterCompanyId
                            select new
                            {
                                gs.GlobalSettingId,
                                gs.CultureId,
                                gs.CurrencyFormat,
                                gs.DateFormat,
                                gs.NumberFormat,
                                gs.PercentFormat,
                                gs.CreditLimtFormat,
                                gs.CultureName
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetCultureInfos()
        {
            try
            {
                int count = 1;
                List<GlobalSettingsInfo> globalSettings = new List<GlobalSettingsInfo>();
                GlobalSettingsInfo settingsInfo;
                CultureInfo[] cinfo = CultureInfo.GetCultures(CultureTypes.AllCultures & ~CultureTypes.NeutralCultures);

                Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();

                foreach (CultureInfo cul in cinfo)
                {
                    if (!keyValuePairs.ContainsKey(cul.DisplayName) && !string.IsNullOrEmpty(cul.Name))
                    {
                        settingsInfo = new GlobalSettingsInfo();
                        settingsInfo.CultureId = count;
                        settingsInfo.DiscplayName = cul.DisplayName;
                        settingsInfo.CultureName = cul.Name;
                        globalSettings.Add(settingsInfo);
                        keyValuePairs.Add(cul.DisplayName, cul.Name);
                        count++;
                    }
                }

                return globalSettings;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetGlobalSettingsInfo(string culture)
        {
            decimal value = 12345.589674M;
            GlobalSettingsInfo globalSettingsInfo = new GlobalSettingsInfo();

            var cinfo = CultureInfo.GetCultures(CultureTypes.AllCultures & ~CultureTypes.NeutralCultures).Where(p => p.Name == culture).FirstOrDefault();

            try
            {
                var decimalDigits = cinfo.NumberFormat.NumberDecimalDigits;
                globalSettingsInfo.CurrencyFormat = value.ToString("C" + decimalDigits.ToString(), new CultureInfo(culture));
                globalSettingsInfo.NumberFormat = value.ToString("F" + decimalDigits.ToString(), new CultureInfo(culture));
                globalSettingsInfo.DateFormat = cinfo.DateTimeFormat.ShortDatePattern;
                globalSettingsInfo.PercentFormat = value.ToString("P" + decimalDigits.ToString(), new CultureInfo(culture));
                globalSettingsInfo.CreditLimtFormat = value.ToString("F" + decimalDigits.ToString(), new CultureInfo(culture));

                return globalSettingsInfo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion


        #region Code Prefix

        public CodePrefixes CreateCodePrefixes(CodePrefixes codePrefixes)
        {
            try
            {
                codePrefixes.IsActive = true;
                codePrefixes.IsDeleted = false;

                if (codePrefixes.CodePrefixId > 0)
                {
                    codePrefixes.UpdatedDate = DateTime.Now;
                    _appContext.CodePrefixes.Update(codePrefixes);
                }
                else
                {
                    codePrefixes.CreatedDate = codePrefixes.UpdatedDate = DateTime.Now;
                    _appContext.CodePrefixes.Add(codePrefixes);
                }

                _appContext.SaveChanges();
                return codePrefixes;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object CodePrefixeById(long codePrefixeId)
        {
            try
            {
                return _appContext.CodePrefixes.Where(p => p.CodePrefixId == codePrefixeId).FirstOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCodePrefix(long codePrefixeId, string updatedBy)
        {
            CodePrefixes codePrefix = new CodePrefixes();

            try
            {
                codePrefix.CodePrefixId = codePrefixeId;
                codePrefix.IsDeleted = true;
                codePrefix.UpdatedDate = DateTime.Now;
                codePrefix.UpdatedBy = updatedBy;

                _appContext.CodePrefixes.Attach(codePrefix);
                _appContext.Entry(codePrefix).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(codePrefix).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(codePrefix).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void CodePrefixStatus(long codePrefixeId, bool status, string updatedBy)
        {
            CodePrefixes codePrefix = new CodePrefixes();

            try
            {
                codePrefix.CodePrefixId = codePrefixeId;
                codePrefix.IsActive = status;
                codePrefix.UpdatedDate = DateTime.Now;
                codePrefix.UpdatedBy = updatedBy;

                _appContext.CodePrefixes.Attach(codePrefix);
                _appContext.Entry(codePrefix).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(codePrefix).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(codePrefix).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetCodePrefixList(Common.Filters<CodePrefixFilters> cpFilters)
        {
            if (cpFilters.filters == null)
                cpFilters.filters = new CodePrefixFilters();
            var pageNumber = cpFilters.first + 1;
            var pageSize = cpFilters.rows;

            long codeTypeId = 0;
            string sortColumn = string.Empty;

            if (!string.IsNullOrEmpty(cpFilters.filters.codeType))
            {
                var codeType = _appContext.CodeTypes.Where(p => p.CodeType.ToLower().Contains(cpFilters.filters.codeType.ToLower())).FirstOrDefault();
                if (codeType != null)
                {
                    codeTypeId = codeType.CodeTypeId;
                }
                else
                {
                    codeTypeId = 100000;
                }
            }

            try
            {
                var sorts = new Sorts<CodePrefixFilters>();
                var filters = new EntityFrameworkPaginate.Filters<CodePrefixFilters>();

                if (string.IsNullOrEmpty(cpFilters.SortField))
                {
                    sortColumn = "createdDate";
                    cpFilters.SortOrder = -1;
                    sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
                }
                else
                {
                    sortColumn = cpFilters.SortField;
                }

                var propertyInfo = typeof(CodePrefixFilters).GetProperty(sortColumn);

                if (cpFilters.SortOrder == -1)
                {
                    sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
                }
                else
                {
                    sorts.Add(true, x => propertyInfo.GetValue(x, null));
                }

                filters.Add(codeTypeId > 0, x => x.codeTypeId == codeTypeId);
                filters.Add(!string.IsNullOrEmpty(cpFilters.filters.prefix), x => x.prefix.ToLower().Contains(cpFilters.filters.prefix.ToLower()));
                filters.Add(!string.IsNullOrEmpty(cpFilters.filters.sufix), x => x.sufix.ToLower().Contains(cpFilters.filters.sufix.ToLower()));
                filters.Add(!string.IsNullOrEmpty(cpFilters.filters.startsFrom), x => x.startsFrom.ToLower().Contains(cpFilters.filters.startsFrom.ToLower()));

                var totalRecords = (from cp in _appContext.CodePrefixes
                                    where cp.IsDeleted == false
                                    select new CodePrefixFilters()
                                    {
                                        CodePrefixId = cp.CodePrefixId,
                                        codeType = "",
                                        prefix = cp.CodePrefix,
                                        sufix = cp.CodeSufix,
                                        startsFrom = cp.StartsFrom,
                                        createdDate = cp.CreatedDate,
                                        isActive = cp.IsActive

                                    }
                           ).Distinct()
                           .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

                var list = (from cp in _appContext.CodePrefixes
                            where cp.IsDeleted == false
                            select new CodePrefixFilters()
                            {
                                CodePrefixId = cp.CodePrefixId,
                                codeType = "",
                                prefix = cp.CodePrefix,
                                sufix = cp.CodeSufix,
                                startsFrom = cp.StartsFrom,
                                createdDate = cp.CreatedDate,
                                isActive = cp.IsActive,
                                totalRecords = totalRecords
                            }
                            ).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).Results;
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion


    }
}
