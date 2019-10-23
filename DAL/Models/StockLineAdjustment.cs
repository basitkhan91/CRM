using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ManagementStructure : PasBase
    {
        public long ManagementStructureId { get; set; }
        public string Code { get; set; }
        
        //public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public string Alias { get; set; }
        //FK
        public long? ParentId { get; set; }
        
        public bool? IsLastChild { get; set; }
        
        public string TagName { get; set; }
        public long? LegalEntityId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }



    }
}
