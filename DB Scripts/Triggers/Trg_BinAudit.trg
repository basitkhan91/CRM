/*
	Following trigger creates an audit entry in BinAudit table 
	when ever insert, delete or update happens in Bin table  
*/

IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_BinAudit'
)
	DROP TRIGGER Trg_BinAudit
GO

CREATE TRIGGER Trg_BinAudit ON [dbo].[Bin]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[BinAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END

