SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
CREATE TRIGGER [dbo].[Trg_AircraftModel]
   ON  [dbo].[AircraftModel]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO AircraftModelAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END
GO

ALTER TABLE [dbo].[AircraftModel] ENABLE TRIGGER [Trg_AircraftModel]
GO
