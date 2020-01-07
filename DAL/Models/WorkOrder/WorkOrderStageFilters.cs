namespace DAL.Models
{
    public class WorkOrderStageFilters
    {
        public long WorkOrderStageId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public long? ManagementStructureId { get; set; }
        public string Memo { get; set; }
        public int? Sequence { get; set; }
        public string Stage { get; set; }
        public string Status { get; set; }
    }
}
