/*
	Following trigger creates an audit entry in SiteAudit table 
	when ever insert, delete or update happens in Site table  
*/

IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_SiteAudit'
)
	DROP TRIGGER Trg_SiteAudit
GO

CREATE TRIGGER Trg_SiteAudit ON [dbo].[Site]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[SiteAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END  


