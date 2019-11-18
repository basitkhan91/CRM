using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderLaborList
    {
        public List<Receive> Receive { get; set; }
        public List<Inspect> Inspect { get; set; }
        public List<Evaluate> Evaluate { get; set; }
        public List<TearDown> TearDown { get; set; }
        public List<Disassemble> Disassemble { get; set; }
        public List<Assemble> Assemble { get; set; }
        public List<Testing> Testing { get; set; }
        public List<QualityControl> QualityControl { get; set; }
        public List<Ship> Ship { get; set; }
        public List<Clean> Clean { get; set; }
    }

    public class Receive:WorkOrderLabor{}
    public class Inspect : WorkOrderLabor { }
    public class Evaluate : WorkOrderLabor { }
    public class TearDown : WorkOrderLabor { }
    public class Disassemble : WorkOrderLabor { }
    public class Assemble : WorkOrderLabor { }
    public class Testing : WorkOrderLabor { }
    public class QualityControl : WorkOrderLabor { }
    public class Ship : WorkOrderLabor { }
    public class Clean : WorkOrderLabor { }




}
