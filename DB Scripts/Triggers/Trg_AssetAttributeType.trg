USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_AssetAttributeType]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetAttributeType] ON [dbo].[AssetAttributeType] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[AssetAttributeTypeAudit] ([AssetAttributeTypeId]
           ,[AssetAttributeTypeName]
           ,[Description]
           ,[ConventionType]
           ,[DepreciationMethod]
           ,[ResidualPercentage]
           ,[ResidualValue]
           ,[AssetLife]
           ,[DepreciationFrequencyId]
           ,[AcquiredGLAccountId]
           ,[DeprExpenseGLAccountId]
           ,[AdDepsGLAccountId]
           ,[AssetSale]
           ,[AssetWriteOff]
           ,[AssetWriteDown]
           ,[ManagementStructureId]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete]
           ,[AssetTypeId])
SELECT
		I.[AssetAttributeTypeId],
           I.[AssetAttributeTypeName],
           I.[Description],
           I.[ConventionType],
           I.[DepreciationMethod],
           I.[ResidualPercentage],
           I.[ResidualValue],
           I.[AssetLife],
           I.[DepreciationFrequencyId],
           I.[AcquiredGLAccountId],
           I.[DeprExpenseGLAccountId],
           I.[AdDepsGLAccountId],
           I.[AssetSale],
           I.[AssetWriteOff],
           I.[AssetWriteDown],
           I.[ManagementStructureId],
           I.[MasterCompanyId],
           I.[CreatedBy],
           I.[UpdatedBy],
           I.[CreatedDate],
           I.[UpdatedDate],
           I.[IsActive],
           I.[IsDelete],
           I.[AssetTypeId]
FROM Inserted I
UNION ALL
SELECT
		D.[AssetAttributeTypeId],
           D.[AssetAttributeTypeName],
           D.[Description],
           D.[ConventionType],
           D.[DepreciationMethod],
           D.[ResidualPercentage],
           D.[ResidualValue],
           D.[AssetLife],
           D.[DepreciationFrequencyId],
           D.[AcquiredGLAccountId],
           D.[DeprExpenseGLAccountId],
           D.[AdDepsGLAccountId],
           D.[AssetSale],
           D.[AssetWriteOff],
           D.[AssetWriteDown],
           D.[ManagementStructureId],
           D.[MasterCompanyId],
           D.[CreatedBy],
           D.[UpdatedBy],
           D.[CreatedDate],
           D.[UpdatedDate],
           D.[IsActive],
           D.[IsDelete],
           D.[AssetTypeId]
FROM Deleted D
WHERE NOT EXISTS (
   SELECT * FROM Inserted
);
GO

ALTER TABLE [dbo].[AssetAttributeType] ENABLE TRIGGER [Trg_AssetAttributeType]
GO


