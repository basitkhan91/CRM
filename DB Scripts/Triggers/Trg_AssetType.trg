USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_AssetType]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetType] ON [dbo].[AssetType] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[AssetTypeAudit] ([AssetTypeId]
           ,[AssetTypeName]
           ,[AssetTypeMemo]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete])
SELECT
   I.[AssetTypeId],
   I.[AssetTypeName],
   I.[AssetTypeMemo],
   I.[MasterCompanyId],
    I.[CreatedBy],
    I.[UpdatedBy],
    I.[CreatedDate],
    I.[UpdatedDate],
    I.[IsActive],
    I.[IsDelete]
FROM
   Inserted I
UNION ALL
SELECT
   D.[AssetTypeId],
   D.[AssetTypeName],
   D.[AssetTypeMemo],
   D.[MasterCompanyId],
    D.[CreatedBy],
    D.[UpdatedBy],
    D.[CreatedDate],
    D.[UpdatedDate],
    D.[IsActive],
    D.[IsDelete]
FROM Deleted D
WHERE NOT EXISTS (
   SELECT * FROM Inserted
);
GO

ALTER TABLE [dbo].[AssetType] ENABLE TRIGGER [Trg_AssetType]
GO


