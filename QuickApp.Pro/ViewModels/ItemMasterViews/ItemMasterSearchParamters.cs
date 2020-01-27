using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PartSearchParamters
    {
        public PartSearchParamters()
        {
            this.itemSearchType = ItemSearchType.ItemMaster;
        }

        public long? partId { get; set; }

        public string partNumber { get; set; }

        public string partDescription { get; set; }

        public int? conditionId { get; set; }

        public int? quantityRequired { get; set; }

        public int? quantityToQuote { get; set;  }

        public bool includeAlternatePartNumber { get; set; }

        public ItemSearchType itemSearchType { get; set; }

        public bool? restrictPMA { get;set;}
        public bool? restrictDER { get;set;}

        public long? customerId { get;set;}

    }
}
