// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Core
{
    public static class ClaimConstants
    {
        ///<summary>A claim that specifies the subject of an entity</summary>
        public const string Subject = "sub";

        ///<summary>A claim that specifies the permission of an entity</summary>
        public const string Permission = "permission";
    }



    public static class PropertyConstants
    {

        ///<summary>A property that specifies the full name of an entity</summary>
        public const string FullName = "fullname";

        ///<summary>A property that specifies the job title of an entity</summary>
        public const string JobTitle = "jobtitle";

        ///<summary>A property that specifies the configuration/customizations of an entity</summary>
        public const string Configuration = "configuration";

        public const string EmployeeId = "employeeId";
        public const string EntityName = "entityName";
        public const string DivEntityName = "divEntityName";
        public const string BiEntityName = "biEntityName";
        public const string CoEntityName = "coEntityName";
        public const string ManagementStructureId = "managementStructureId";
    }



    public static class ScopeConstants
    {
        ///<summary>A scope that specifies the roles of an entity</summary>
        public const string Roles = "roles";
    }
}
