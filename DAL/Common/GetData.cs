using System.Collections.Generic;

namespace DAL.Common
{
    public class GetData<T> where T : class
    {
        public int TotalRecordsCount { get; set; }
        public List<T> ItemClassificationList { get; set; }
        public List<T> CustomerList { get; set; }

        public List<T> PaginationList { get; set; }
    }
}
