using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace QuickApp.Pro.ViewModels
{
    public class TimeLifeViewModel
    {
        
        public long TimeLifeCyclesId { get; set; }
        public Int32? CyclesRemaining { get; set; }
        public Int32? CyclesSinceNew { get; set; }
        public Int32? CyclesSinceOVH { get; set; }
        public Int32? CyclesSinceInspection { get; set; }
        public Int32? CyclesSinceRepair { get; set; }
        public Int32? TimeRemaining { get; set; }
        public Int32? TimeSinceNew { get; set; }
        public Int32? TimeSinceOVH { get; set; }
        public Int32? TimeSinceInspection { get; set; }
        public Int32? TimeSinceRepair { get; set; }
        public Int32? LastSinceNew { get; set; }
        public Int32? LastSinceOVH { get; set; }
        public Int32? LastSinceInspection { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
    }
}
