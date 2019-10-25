

/****** Object:  Trigger [dbo].[Trg_AssetStatusAudit]    Script Date: 10/22/2019 2:46:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetStatusAudit] ON [dbo].[AssetStatus]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[AssetStatusAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END
GO

ALTER TABLE [dbo].[AssetStatus] ENABLE TRIGGER [Trg_AssetStatusAudit]
GO

