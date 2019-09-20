USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ACH]    Script Date: 9/17/2019 4:03:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ACH](
	[ACHId] [bigint] IDENTITY(1,1) NOT NULL,
	[ABA] [varchar](50) NOT NULL,
	[AccountNumber] [varchar](50) NOT NULL,
	[BankName] [varchar](100) NOT NULL,
	[BeneficiaryBankName] [varchar](100) NOT NULL,
	[IntermediateBankName] [varchar](100) NOT NULL,
	[SwiftCode] [varchar](100) NOT NULL,
	[BankAddressId] [bigint] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ACHId] PRIMARY KEY CLUSTERED 
(
	[ACHId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ACH] ADD  CONSTRAINT [DF_ACH_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[ACH] ADD  CONSTRAINT [DF_ACH_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[ACH]  WITH CHECK ADD  CONSTRAINT [FK_ACHId_Address] FOREIGN KEY([BankAddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[ACH] CHECK CONSTRAINT [FK_ACHId_Address]
GO

ALTER TABLE [dbo].[ACH]  WITH CHECK ADD  CONSTRAINT [FK_ACHId_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[ACH] CHECK CONSTRAINT [FK_ACHId_MasterCompany]
GO

