
IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_JobTitleAudit'
)
	DROP TRIGGER Trg_JobTitleAudit
GO

CREATE TRIGGER Trg_JobTitleAudit ON [dbo].[JobTitle]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[JobTitleAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END
