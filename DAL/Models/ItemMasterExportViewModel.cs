using System;

namespace DAL.Models
{
	public partial class ItemMasterExportViewModel
    {
		public long ItemMasterId { get; set; }
		public long? unitOfMeasureId { get; set; }
		public Int16? ExportCountryId { get; set; }
		public string ITARNumber { get; set; }

		public decimal? ExportSizeHeight { get; set; }

		public decimal? ExportSizeLength { get; set; }
		//public string ExportSizeUnit { get; set; }
		public decimal? ExportSizeWidth { get; set; }
		public long? ExportUomId { get; set; }
		public decimal? ExportValue { get; set; }
		public string ExportECCN { get; set; }
		public decimal? ExportWeight { get; set; }
		public string ExportWeightUnit { get; set; }
		public int? ExportCurrencyId { get; set; }
		//public Byte? ExportClassificationId { get; set; }
		public bool? IsExportUnspecified { get; set; }
		public bool? IsExportNONMilitary { get; set; }
		public bool? IsExportMilitary { get; set; }
		public bool? IsExportDual { get; set; }
		//public string UpdatedBy { get; set; }		

		//public DateTime? UpdatedDate { get; set; }

	}
}
