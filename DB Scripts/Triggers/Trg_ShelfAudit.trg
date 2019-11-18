/*
	Following trigger creates an audit entry in ShelfAudit table 
	when ever insert, delete or update happens in Shelf table  
*/

IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_ShelfAudit'
)
	DROP TRIGGER Trg_ShelfAudit
GO

CREATE TRIGGER Trg_ShelfAudit ON [dbo].[Shelf]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[ShelfAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END

