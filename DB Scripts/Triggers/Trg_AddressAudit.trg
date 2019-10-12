/*
	Following trigger creates an audit entry in AddressAudit table 
	when ever insert, delete or update happens in Address table  
*/

IF EXISTS(
  SELECT *
    FROM sys.triggers
   WHERE name = N'Trg_AddressAudit'
)
	DROP TRIGGER Trg_AddressAudit
GO

CREATE TRIGGER Trg_AddressAudit ON [dbo].[Address]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[AddressAudit] (
	AddressId
	,Line1
	,Line2
	,Line3
	,City
	,StateOrProvince
	,PostalCode
	,Country
	,Latitude
	,Longitude
	,MasterCompanyId
	,RecordCreateDate
	,RecordModifiedDate
	,LastModifiedBy
	,CreatedBy
	,UpdatedBy
	,CreatedDate
	,UpdatedDate
	,IsActive)
 SELECT 
	 AddressId
	,Line1
	,Line2
	,Line3
	,City
	,StateOrProvince
	,PostalCode
	,Country
	,Latitude
	,Longitude
	,MasterCompanyId
	,RecordCreateDate
	,RecordModifiedDate
	,LastModifiedBy
	,CreatedBy
	,UpdatedBy
	,CreatedDate
	,UpdatedDate
	,ISNULL(IsActive,0)
 FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END  


