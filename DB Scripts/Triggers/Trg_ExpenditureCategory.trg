USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_ExpenditureCategory]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_ExpenditureCategory] ON [dbo].[ExpenditureCategory] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[ExpenditureCategoryAudit] ([ExpenditureCategoryId]
           ,[Description]
           ,[Memo]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete])
SELECT
   I.[ExpenditureCategoryId],
   I.[Description],
   I.[Memo],
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
   D.[ExpenditureCategoryId],
   D.[Description],
   D.[Memo],
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

ALTER TABLE [dbo].[ExpenditureCategory] ENABLE TRIGGER [Trg_ExpenditureCategory]
GO


