/*
	Following trigger creates an audit entry in LocationAudit table 
	when ever insert, delete or update happens in Location table  
*/

IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_LocationAudit'
)
	DROP TRIGGER Trg_LocationAudit
GO

CREATE TRIGGER Trg_LocationAudit ON [dbo].[Location]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[LocationAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END

