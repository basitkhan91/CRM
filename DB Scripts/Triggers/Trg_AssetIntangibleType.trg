USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_AssetIntangibleType]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetIntangibleType] ON [dbo].[AssetIntangibleType] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[AssetIntangibleTypeAudit] ([AssetIntangibleTypeId]
           ,[AssetIntangibleName]
           ,[AssetIntangibleMemo]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete])
SELECT
   I.[AssetIntangibleTypeId],
   I.[AssetIntangibleTypeName],
   I.[AssetIntangibleTypeMemo],
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
   D.[AssetIntangibleTypeId],
   D.[AssetIntangibleTypeName],
   D.[AssetIntangibleTypeMemo],
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

ALTER TABLE [dbo].[AssetIntangibleType] ENABLE TRIGGER [Trg_AssetIntangibleType]
GO


