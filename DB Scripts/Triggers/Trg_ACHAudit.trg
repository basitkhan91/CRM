

/****** Object:  Trigger [dbo].[Trg_ShelfAudit]    Script Date: 11/7/2019 3:55:46 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE TRIGGER [dbo].[Trg_ACHAudit] ON [dbo].[ACH]
   AFTER INSERT,DELETE,UPDATE  
AS   
BEGIN  

 INSERT INTO [dbo].[ACHAudit]  
 SELECT * FROM INSERTED  

 SET NOCOUNT ON;  

END
GO

ALTER TABLE [dbo].[ACH] ENABLE TRIGGER [Trg_ACHAudit]
GO


