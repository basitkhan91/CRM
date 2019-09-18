USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CheckPaymentAudit]    Script Date: 9/17/2019 5:20:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CheckPaymentAudit](
	[CheckPaymentAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[CheckPaymentId] [bigint] NOT NULL,
	[RoutingNumber] [varchar](30) NULL,
	[AccountNumber] [varchar](30) NULL,
	[SiteName] [varchar](100) NULL,
	[IsPrimayPayment] [bit] NULL,
	[AddressId] [bigint] NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CheckPaymentAudit] PRIMARY KEY CLUSTERED 
(
	[CheckPaymentAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CheckPaymentAudit]  WITH CHECK ADD  CONSTRAINT [FK_CheckPaymentAudit_CheckPayment] FOREIGN KEY([CheckPaymentId])
REFERENCES [dbo].[CheckPayment] ([CheckPaymentId])
GO

ALTER TABLE [dbo].[CheckPaymentAudit] CHECK CONSTRAINT [FK_CheckPaymentAudit_CheckPayment]
GO

