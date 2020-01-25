using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class TagType
    {
        [Key]
		public long TagTypeId { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }        
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
