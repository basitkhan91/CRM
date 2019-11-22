using System.Collections.Generic;

namespace DAL.Common
{
    public class GetSearchData<T> where T : class
    {
        public int TotalRecordsCount { get; set; }

        public List<T> Data { get; set; }

        public List<T> PaginationList { get; set; }
    }
}
