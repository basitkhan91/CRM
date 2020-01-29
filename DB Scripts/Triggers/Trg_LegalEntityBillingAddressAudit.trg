SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[Trg_LegalEntityBillingAddressAudit]
   ON  [dbo].[LegalEntityBillingAddress]
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN
	INSERT INTO [dbo].[LegalEntityBillingAddressAudit]
	SELECT * FROM INSERTED
	SET NOCOUNT ON;
END

GO


