namespace DAL.Models.Enums
{
    public enum CustomerSearchType : int
    {
        None = 0,
        ExactName = 1,  
        ContainsName = 2, 
        ExactCode = 3,  
        ContainsCode = 4, 
    }
}
