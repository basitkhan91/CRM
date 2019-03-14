using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{

    public class WorkFlowTable
    {
        public WorkFlowTable(){
            Charges = new List<ChargesTable>();
            Directions = new List<Direction>();
            Equipments = new List<EquipmentList>();
            Exclusions = new List<Exclusion>();
            Expertise = new List<Expertise>();
            MaterialList = new List<MaterialList>();
            Measurements = new List<Measurement>();
            Publication = new List<Publications>();

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual List<ChargesTable> Charges { get; set; }
        public virtual List<Direction> Directions { get; set; }
        public virtual List<EquipmentList> Equipments { get; set; }
        public virtual List<Exclusion> Exclusions { get; set; }
        public virtual List<Expertise> Expertise { get; set; }
        public virtual List<MaterialList> MaterialList { get; set; }
        public virtual List<Measurement> Measurements { get; set; }
        public virtual List<Publications> Publication { get; set; }

    }
}
