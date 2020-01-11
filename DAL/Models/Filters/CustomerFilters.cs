using DAL.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
	public class CustomerFilters
	{
		[Key]
		public long CustomerId { get; set; }
		public string name { get; set; }
		public string customerCode { get; set; }
		public string email { get; set; }
		public string customerType { get; set; }
		public string customerClassification { get; set; }
		public string city { get; set; }
		public string stateOrProvince { get; set; }
		public string contact { get; set; }
        public string accountType { get; set; }

        public string salesPersonPrimary { get; set; }
		public int rows { get; set; }
		public int first { get; set; }
        public bool? isActive { get; set; }
        public bool? isDeleted { get; set; }

        public DateTime createdDate { get; set; }

        public int totalRecords { get; set; }


    }
}