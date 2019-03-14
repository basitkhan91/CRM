﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ChargesCurrency : BaseClass
    {

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(10)]
        public string Symbol { get; set; }
    }
}
