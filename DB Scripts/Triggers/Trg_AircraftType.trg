SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
CREATE TRIGGER [dbo].[Trg_AircraftType]
   ON  [dbo].[AircraftType]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO AircraftTypeAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END
GO

ALTER TABLE [dbo].[AircraftType] ENABLE TRIGGER [Trg_AircraftType]
GO
