
/****** Object:  Trigger [dbo].[Trg_ATAChapter]    Script Date: 11/7/2019 3:58:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
CREATE TRIGGER [dbo].[Trg_ATASubChapterAudit]
   ON  [dbo].[ATASubChapter]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO ATAChapterAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END
GO

ALTER TABLE [dbo].[ATASubChapter] ENABLE TRIGGER [ATASubChapterAudit]
GO
