﻿using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class BalanceType : BaseEntity
    {
        [Key]
        public long ID { get; set; }
        public string Description { get; set; }
        public Int32 MasterCompanyId { get; set; }
    }
}