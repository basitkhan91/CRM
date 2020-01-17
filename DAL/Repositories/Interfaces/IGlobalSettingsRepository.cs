using DAL.Models;
using System.Collections.Generic;
namespace DAL.Repositories.Interfaces
{
    public interface IGlobalSettingsRepository : IRepository<GlobalSettings>
    {
        GlobalSettings CreateGlobalSettings(GlobalSettings globalSetting);
        object GetGlobalSettings(int masterCompanyId);
        IEnumerable<object> GetCultureInfos();
        object GetGlobalSettingsInfo(string culture);
    }
}
