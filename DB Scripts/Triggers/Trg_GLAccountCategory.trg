USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_GLAccountCategory]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_GLAccountCategory] ON [dbo].[GLAccountCategory] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[GLAccountCategoryAudit] ([GLAccountCategoryId]
           ,[GLCID]
           ,[GLAccountCategoryName]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete])
SELECT
   I.[GLAccountCategoryId],
   I.[GLCID],
   I.[GLAccountCategoryName],
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
   D.[GLAccountCategoryId],
   D.[GLCID],
   D.[GLAccountCategoryName],
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

ALTER TABLE [dbo].[GLAccountCategory] ENABLE TRIGGER [Trg_GLAccountCategory]
GO


