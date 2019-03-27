using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AssetStatus : BaseEntity
    {

        [Required(ErrorMessage= "Id Is Required.")]
        public string Identification { get; set; }

        [Required(ErrorMessage = "Id Is Required.")]
        public string Name { get; set; }

        public string Memo { get; set; }
    }
}
