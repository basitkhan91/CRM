using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
	public class TempAddress
	{
		[NotMapped]
		public string Address1 { get; set; }
		[NotMapped]
		public string Address2 { get; set; }
		[NotMapped]
		public string Address3 { get; set; }
		[NotMapped]
		public string City { get; set; }
		[NotMapped]
		public string StateOrProvince { get; set; }
		[NotMapped]
		public string PostalCode { get; set; }
		[NotMapped]
		public string Country { get; set; }
		
	}
}
