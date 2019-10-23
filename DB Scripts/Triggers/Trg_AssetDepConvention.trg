
/****** Object:  Trigger [dbo].[Trg_AssetDepConventionAudit]    Script Date: 10/22/2019 3:52:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetDepConventionAudit] ON [dbo].[AssetDepConvention]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  

 INSERT INTO [dbo].[AssetDepConventionAudit]  
 SELECT * FROM INSERTED  

 SET NOCOUNT ON;  

END
GO

ALTER TABLE [dbo].[AssetDepConvention] ENABLE TRIGGER [Trg_AssetDepConventionAudit]
GO

