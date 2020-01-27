SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[Trg_LegalEntityInternationalShippingAudit]
   ON  [dbo].[LegalEntityInternationalShipping]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN
	INSERT INTO [dbo].[LegalEntityInternationalShippingAudit]
	SELECT * FROM INSERTED
	SET NOCOUNT ON;
END

GO


