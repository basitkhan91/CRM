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
		public string Name { get; set; }
		public string CustomerCode { get; set; }
		public string Email { get; set; }
		public string CustomerType { get; set; }
		public string CustomerClassification { get; set; }
		public string City { get; set; }
		public string StateOrProvince { get; set; }
		public string Contact { get; set; }
		public string SalesPersonPrimary { get; set; }
		public int Rows { get; set; }
		public int First { get; set; }




	}
}