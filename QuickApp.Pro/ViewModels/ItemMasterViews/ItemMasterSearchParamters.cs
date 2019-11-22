﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PartSearchParamters
    {
        public string partNumber { get; set; }

        public string partDescription { get; set; }

        public int? conditionId { get; set; }

        public int? quantityRequired { get; set; }

        public int? quantityToQuote { get; set;  }

    }
}
