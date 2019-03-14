using System;

namespace DAL.Models
{
    public class MainCategory: AuditableEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

    }
}

