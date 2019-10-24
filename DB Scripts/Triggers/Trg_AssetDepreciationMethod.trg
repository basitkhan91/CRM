

/****** Object:  Trigger [dbo].[Trg_AssetDepreciationMethodAudit]    Script Date: 10/22/2019 2:46:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetDepreciationMethodAudit] ON [dbo].[AssetDepreciationMethod]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  
  
 INSERT INTO [dbo].[AssetDepreciationMethodAudit]  
 SELECT * FROM INSERTED  
  
 SET NOCOUNT ON;  
  
END
GO

ALTER TABLE [dbo].[AssetDepreciationMethod] ENABLE TRIGGER [Trg_AssetDepreciationMethodAudit]
GO

