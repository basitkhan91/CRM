USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CheckPayment]    Script Date: 9/17/2019 5:20:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CheckPayment](
	[CheckPaymentId] [bigint] IDENTITY(1,1) NOT NULL,
	[RoutingNumber] [varchar](30) NULL,
	[AccountNumber] [varchar](30) NULL,
	[SiteName] [varchar](100) NOT NULL,
	[IsPrimayPayment] [bit] NOT NULL,
	[AddressId] [bigint] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CheckPayment] PRIMARY KEY CLUSTERED 
(
	[CheckPaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CheckPayment] ADD  CONSTRAINT [DF_CheckPayment_IsPrimayPayment]  DEFAULT ((0)) FOR [IsPrimayPayment]
GO

ALTER TABLE [dbo].[CheckPayment] ADD  CONSTRAINT [DF_CheckPayment_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[CheckPayment] ADD  CONSTRAINT [DF_CheckPayment_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[CheckPayment]  WITH CHECK ADD  CONSTRAINT [FK_CheckPayment_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[CheckPayment] CHECK CONSTRAINT [FK_CheckPayment_Address]
GO

ALTER TABLE [dbo].[CheckPayment]  WITH CHECK ADD  CONSTRAINT [FK_CheckPayment_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CheckPayment] CHECK CONSTRAINT [FK_CheckPayment_MasterCompany]
GO

