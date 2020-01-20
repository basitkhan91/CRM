using System;

namespace DAL.Models
{
    public class WOStageFilters
    {
        public long WorkOrderStageId { get; set; }
        public string Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public long ManagementStrId { get; set; }
        public string Memo { get; set; }
        public int Sequence { get; set; }
        public string Stage { get; set; }
        public long StatusId { get; set; }
        public string Status { get; set; }
        public long LevelId1 { get; set; }
        public long LevelId2{ get; set; }
        public long LevelId3 { get; set; }
        public long LevelId4 { get; set; }
        public string Level1 { get; set; }
        public string Level2 { get; set; }
        public string Level3 { get; set; }
        public string Level4 { get; set; }
        public string LevelCode1 { get; set; }
        public string LevelCode2 { get; set; }
        public string LevelCode3 { get; set; }
        public string LevelCode4 { get; set; }
        public string UpdatedBy { get; set; }
        public int TotalRecords { get; set; }

    }
}
