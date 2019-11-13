SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
CREATE TRIGGER [dbo].[Trg_AircraftDashNumberAudit]
   ON  [dbo].[AircraftDashNumber]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO ATAChapterAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END

GO

ALTER TABLE [dbo].[AircraftDashNumber] ENABLE TRIGGER [Trg_AircraftDashNumberAudit]
GO
