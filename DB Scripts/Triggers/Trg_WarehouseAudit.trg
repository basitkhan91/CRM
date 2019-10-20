/*
	Following trigger creates an audit entry in WarehouseAudit table 
	when ever insert, delete or update happens in Warehouse table  
*/

IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_WarehouseAudit'
)
	DROP TRIGGER Trg_WarehouseAudit
GO

CREATE TRIGGER Trg_WarehouseAudit ON [dbo].[Warehouse]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[WarehouseAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END

