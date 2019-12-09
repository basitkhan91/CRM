using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
	public class WorkOrderPublicationList
	{
		public long WorkOrderPublicationId { get; set; }
		public long WorkOrderId { get; set; }
		public long WorkFlowWorkOrderId { get; set; }
		public long PublicationId { get; set; }
		public long? AircraftManufacturerId { get; set; }
		public long? ModelId { get; set; }
		public string PublicationDescription { get; set; }
		public string PublicationType { get; set; }
		public DateTime? RevisionDate { get; set; }
		public int? Sequence { get; set; }
		public string Source { get; set; }
		public string AirCraftManufacturer { get; set; }
		public string Model { get; set; }
		public string Location { get; set; }
		public string VerifiedBy { get; set; }
		public DateTime? VerifiedDate { get; set; }
		public string Status { get; set; }
		public string Image { get; set; }

		public string PublicationName {get; set;}
        public List<WorkOrderPublicationDashNumber> WorkOrderPublicationDashNumber { get; set; }
    }
}
