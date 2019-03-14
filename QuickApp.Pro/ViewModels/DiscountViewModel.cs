using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class DiscountViewModel
    {
        public long DiscountId { get; set; }

        public string DiscontValue { get; set; }

       

    }
}
