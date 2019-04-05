using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    class GLAccountMiscCategory : PasBase
    {
        public long GLAccountMiscCategoryId { get; set; }
        public string Name { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
    }
}
