using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Dropdowns
    {
        [Key]
        public string Label { get; set; }
        public long Value { get; set; }
    }
}
