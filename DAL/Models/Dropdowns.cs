using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Dropdowns
    {
        [Key]
        public long Value { get; set; }
        public string Label { get; set; }
    }
}
