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


        CodePrefixes CreateCodePrefixes(CodePrefixes codePrefixes);
        object CodePrefixeById(long codePrefixeId);
        void DeleteCodePrefix(long codePrefixeId, string updatedBy);
        void CodePrefixStatus(long codePrefixeId, bool status, string updatedBy);
        IEnumerable<object> GetCodePrefixList(Common.Filters<CodePrefixFilters> cpFilters);
    }
}
