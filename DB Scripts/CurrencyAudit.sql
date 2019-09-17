USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CurrencyAudit]    Script Date: 9/17/2019 5:22:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CurrencyAudit](
	[CurrencyAuditId] [int] IDENTITY(1,1) NOT NULL,
	[CurrencyId] [int] NOT NULL,
	[Code] [varchar](10) NULL,
	[Symbol] [varchar](10) NULL,
	[DisplayName] [varchar](20) NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CurrencyAudit] PRIMARY KEY CLUSTERED 
(
	[CurrencyAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[CurrencyAudit]  WITH CHECK ADD  CONSTRAINT [FK_CurrencyAudit_Currency] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[CurrencyAudit] CHECK CONSTRAINT [FK_CurrencyAudit_Currency]
GO

