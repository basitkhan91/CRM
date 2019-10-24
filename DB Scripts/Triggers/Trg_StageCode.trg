USE [PAS_DEV]
GO

/****** Object:  Trigger [dbo].[Trg_StageCode]    Script Date: 10/24/2019 3:13:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_StageCode] ON [dbo].[StageCode] FOR INSERT, UPDATE, DELETE
AS
SET NOCOUNT ON;
INSERT [dbo].[StageCodeAudit] ([StageCodeId]
           ,[GateCode]
           ,[Description]
           ,[Sequence]
           ,[Memo]
           ,[MasterCompanyId]
           ,[CreatedBy]
           ,[UpdatedBy]
           ,[CreatedDate]
           ,[UpdatedDate]
           ,[IsActive]
           ,[IsDelete])
SELECT
   I.[StageCodeId],
   I.[GateCode],
   I.[Description],
   I.[Sequence],
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
   D.[StageCodeId],   
   D.[GateCode],
   D.[Description],
   D.[Sequence],
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

ALTER TABLE [dbo].[StageCode] ENABLE TRIGGER [Trg_StageCode]
GO


