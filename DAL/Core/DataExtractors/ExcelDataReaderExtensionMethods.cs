using ExcelDataReader; 

namespace DAL.Core.DataExtractors
{
    public static class ExcelDataReaderExtensionMethods
    {
        public static string ExtractString(this IExcelDataReader reader, int columnIndex)
        {
            var value = string.Empty;

            object data = reader.GetValue(columnIndex);

            if (data != null)
            {
                value = data.ToString().Trim();
            }

            return value;
        }
    }
}
