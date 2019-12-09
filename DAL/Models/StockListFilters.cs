using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class StockListFilters
    {

		[Key]
		public long StocklineId { get; set; }
		public string PartNumber { get; set; }
		public string Category { get; set; }
		public string StocklineNumber { get; set; }
		public string SerialNumber { get; set; }
		public long ConditionId { get; set; }
		public int Rows { get; set; }
		public int First { get; set; }

	}
}
