
/****** Object:  Table [dbo].[ACHAudit]    Script Date: 9/17/2019 4:03:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ACHAudit](
	[ACHAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ACHId] [bigint] NOT NULL,
	[ABA] [varchar](50) NULL,
	[AccountNumber] [varchar](50) NULL,
	[BankName] [varchar](100) NULL,
	[BeneficiaryBankName] [varchar](100) NULL,
	[IntermediateBankName] [varchar](100) NULL,
	[SwiftCode] [varchar](100) NULL,
	[BankAddressId] [bigint] NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__ACHAudit__854679C88159CD0F] PRIMARY KEY CLUSTERED 
(
	[ACHAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ACHAudit]  WITH CHECK ADD  CONSTRAINT [FK_ACHAudit_ACH] FOREIGN KEY([ACHId])
REFERENCES [dbo].[ACH] ([ACHId])
GO

ALTER TABLE [dbo].[ACHAudit] CHECK CONSTRAINT [FK_ACHAudit_ACH]
GO

