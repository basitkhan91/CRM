﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Common
{
    public class Pagination
    {
        [NotMapped]
        public int first { get; set; }
        [NotMapped]
        public int page { get; set; }
        [NotMapped]
        public int pageCount { get; set; }
        [NotMapped]
        public int rows { get; set; }
        [NotMapped]
        public int limit { get; set; }
        
    }

	public class Filters<T> where T : class
	{
		public int first { get; set; }
		public int rows { get; set; }
		public string sortColumn { get; set; }
		public string sortOrder { get; set; }
		public T filters { get; set; }
	}
}
