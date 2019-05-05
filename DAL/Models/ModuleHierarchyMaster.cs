using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ModuleHierarchyMaster 
    {
        [Key]
       public int Id { get; set; }
       public string Name { get; set; }
       public int? ParentId { get; set; }
       public bool? IsPage { get; set; }
       public int? DisplayOrder { get; set; }
       public int? ModuleCode { get; set; }
    }
}
