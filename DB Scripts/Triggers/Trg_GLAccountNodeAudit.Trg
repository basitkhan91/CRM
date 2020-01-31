SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
CREATE TRIGGER [dbo].[Trg_GLAccountNodeAudit]
   ON  [dbo].[GLAccountNode]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO GLAccountNodeAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END
GO

ALTER TABLE [dbo].[GLAccountNode] ENABLE TRIGGER [Trg_GLAccountNodeAudit]
GO
