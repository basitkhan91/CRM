﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
	public class LegalEntityContactAudit
	{
		[Key]
		public long LegalEntityContactAuditId { get; set; }
		public long? LegalEntityContactId { get; set; }

		public long? LegalEntityId { get; set; }

		public long? ContactId { get; set; }

		public bool? IsDefaultContact { get; set; }

		public int MasterCompanyId { get; set; }


		public string CreatedBy { get; set; }


		public string UpdatedBy { get; set; }


		public DateTime CreatedDate { get; set; }


		public DateTime UpdatedDate { get; set; }

		public bool? IsActive { get; set; }
	}
}
