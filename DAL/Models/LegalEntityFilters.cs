using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class LegalEntityFilters
    {
		[Key]
		public long LegalEntityId { get; set; }
		public string EntityName { get; set; }
		public string EntityCode { get; set; }
		public string Email { get; set; }
		public string City { get; set; }
		public string StateOrProvince { get; set; }
		public string Contact { get; set; }
		public string AccountType { get; set; }
		public int rows { get; set; }
		public int first { get; set; }
		public bool? isActive { get; set; }
		public bool? isDeleted { get; set; }

		public DateTime createdDate { get; set; }

		public int totalRecords { get; set; }

	}
}
