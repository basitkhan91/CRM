using DAL.Models;
using DAL.Repositories.Interfaces;
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


        public GlobalSettings CreateGlobalSettings(GlobalSettings globalSetting)
        {
            try
            {
                globalSetting.IsActive = true;
                globalSetting.IsDeleted = false;

                if (globalSetting.GlobalSettingId>0)
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
                            where gs.IsActive == true && gs.IsDeleted == false && gs.MasterCompanyId == masterCompanyId
                            select new
                            {
                                gs.GlobalSettingId,
                                gs.CultureId,
                                gs.CurrencyFormat,
                                gs.DateFormat,
                                gs.NumberFormat,
                                gs.PercentFormat,
                                gs.CreditLimtFormat,
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

            var cinfo = CultureInfo.GetCultures(CultureTypes.AllCultures & ~CultureTypes.NeutralCultures).Where(p=>p.Name==culture).FirstOrDefault();

            try
            {
                var decimalDigits = cinfo.NumberFormat.NumberDecimalDigits;
                globalSettingsInfo.CurrencyFormat = value.ToString("C"+ decimalDigits.ToString(), new CultureInfo(culture));
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



    }
}
