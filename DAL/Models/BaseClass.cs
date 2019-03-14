using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class BaseClass
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50)]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        [MaxLength(50)]
        public string UpdatedBy { get; set; }

        [MaxLength(50)]
        public DateTime? UpdatedDate { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
