using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace DAL.Models
{
    public class MaterialUOM : BaseClass
    {

        [MaxLength(50)]
        public string Name { get; set; }
    }
}
