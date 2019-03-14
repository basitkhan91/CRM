using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class EmployeeLeaveTypeViewModel
    {

        public Byte? EmployeeLeaveTypeId { get; set; }

        public string Description { get; set; }

        public bool? IsActive { get; set; }
      
    }
}