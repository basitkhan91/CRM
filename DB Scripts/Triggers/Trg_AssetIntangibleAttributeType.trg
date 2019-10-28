USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_AssetIntangibleAttributeType]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetIntangibleAttributeType] ON [dbo].[AssetIntangibleAttributeType] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[AssetIntangibleAttributeTypeAudit] ([AssetIntangibleAttributeTypeId]
           ,[IntangibleAttributeTypeName]
           ,[AmortizationMethod]
           ,[IntangibleLife]
           ,[AmortizationFrequency]
           ,[IntangibleGLAccountId]
           ,[AmortExpenseGLAccountId]
           ,[AccAmortDeprGLAccountId]
           ,[IntangibleWriteDownGLAccountId]
           ,[IntangibleWriteOffGLAccountId]
           ,[ManagementStructureId]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete]
           ,[AssetIntangibleTypeId])
SELECT
		I.[AssetIntangibleAttributeTypeId],
           I.[IntangibleAttributeTypeName],
           I.[AmortizationMethod],
           I.[IntangibleLife],
           I.[AmortizationFrequency],
           I.[IntangibleGLAccountId],
           I.[AmortExpenseGLAccountId],
           I.[AccAmortDeprGLAccountId],
           I.[IntangibleWriteDownGLAccountId],
           I.[IntangibleWriteOffGLAccountId],
           I.[ManagementStructureId],
           I.[MasterCompanyId],
           I.[CreatedBy],
           I.[UpdatedBy],
           I.[CreatedDate],
           I.[UpdatedDate],
           I.[IsActive],
           I.[IsDelete],
           I.[AssetIntangibleTypeId]
FROM
   Inserted I
UNION ALL
SELECT
		D.[AssetIntangibleAttributeTypeId],
           D.[IntangibleAttributeTypeName],
           D.[AmortizationMethod],
           D.[IntangibleLife],
           D.[AmortizationFrequency],
           D.[IntangibleGLAccountId],
           D.[AmortExpenseGLAccountId],
           D.[AccAmortDeprGLAccountId],
           D.[IntangibleWriteDownGLAccountId],
           D.[IntangibleWriteOffGLAccountId],
           D.[ManagementStructureId],
           D.[MasterCompanyId],
           D.[CreatedBy],
           D.[UpdatedBy],
           D.[CreatedDate],
           D.[UpdatedDate],
           D.[IsActive],
           D.[IsDelete],
           D.[AssetIntangibleTypeId]
FROM Deleted D
WHERE NOT EXISTS (
   SELECT * FROM Inserted
);
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] ENABLE TRIGGER [Trg_AssetIntangibleAttributeType]
GO


