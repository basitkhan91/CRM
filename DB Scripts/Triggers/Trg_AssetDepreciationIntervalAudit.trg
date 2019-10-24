
/****** Object:  Trigger [dbo].[Trg_AssetDepreciationIntervalAudit]    Script Date: 10/22/2019 3:52:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetDepreciationIntervalAudit] ON [dbo].[AssetDepreciationInterval]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  

 INSERT INTO [dbo].[AssetDepreciationIntervalAudit]  
 SELECT * FROM INSERTED  

 SET NOCOUNT ON;  

END
GO

ALTER TABLE [dbo].[AssetDepreciationInterval] ENABLE TRIGGER [Trg_AssetDepreciationIntervalAudit]
GO

