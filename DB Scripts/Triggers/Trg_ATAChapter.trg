
/****** Object:  Trigger [dbo].[Trg_ATAChapter]    Script Date: 11/7/2019 3:58:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
CREATE TRIGGER [dbo].[Trg_ATAChapter]
   ON  [dbo].[ATAChapter]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO ATAChapterAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END
GO

ALTER TABLE [dbo].[ATAChapter] ENABLE TRIGGER [Trg_ATAChapter]
GO
