
/****** Object:  Trigger [dbo].[Trg_StocklineAdjustmentReasonAudit]    Script Date: 11/7/2019 4:04:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
CREATE TRIGGER [dbo].[Trg_StocklineAdjustmentReasonAudit]
   ON  [dbo].[StocklineAdjustmentReason]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN

	INSERT INTO StocklineAdjustmentReasonAudit
	SELECT * FROM INSERTED

	SET NOCOUNT ON;

END
GO

ALTER TABLE [dbo].[StocklineAdjustmentReason] ENABLE TRIGGER [Trg_StocklineAdjustmentReasonAudit]
GO
