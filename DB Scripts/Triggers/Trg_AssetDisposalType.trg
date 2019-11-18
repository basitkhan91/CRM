
/****** Object:  Trigger [dbo].[Trg_AssetDisposalTypeAudit]    Script Date: 10/22/2019 3:52:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_AssetDisposalTypeAudit] ON [dbo].[AssetDisposalType]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  

 INSERT INTO [dbo].[AssetDisposalTypeAudit]  
 SELECT * FROM INSERTED  

 SET NOCOUNT ON;  

END
GO

ALTER TABLE [dbo].[AssetDisposalType] ENABLE TRIGGER [Trg_AssetDisposalTypeAudit]
GO
