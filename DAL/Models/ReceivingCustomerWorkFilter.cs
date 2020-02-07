using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ReceivingCustomerWorkFilter
    {
        [Key]
        public long ReceivingCustomerWorkId { get; set; }
        public DateTime? receivedDate { get; set; }
        public string receivingNumber { get; set; }
        public string woNumber { get; set; }
        public string woOpenDate { get; set; }
        public string partNumber { get; set; }
        public string partDescription { get; set; }
        public string customerName { get; set; }
        public string stageCode { get; set; }
        public string status { get; set; }
        public long? ManagementStructureId { get; set; }
        public int? woFilter { get; set; }

        public long LevelId1 { get; set; }
        public long LevelId2 { get; set; }
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
        public bool? isDeleted { get; set; }
        public DateTime? createdDate { get; set; }
        public int totalRecords { get; set; }





    }
}