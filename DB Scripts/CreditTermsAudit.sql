USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CreditTermsAudit]    Script Date: 9/17/2019 5:22:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CreditTermsAudit](
	[CreditTermsAuditId] [smallint] IDENTITY(1,1) NOT NULL,
	[CreditTermsId] [smallint] NULL,
	[Name] [varchar](30) NULL,
	[Percentage] [decimal](18, 2) NULL,
	[Days] [tinyint] NULL,
	[NetDays] [tinyint] NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CreditTermsAudit] PRIMARY KEY CLUSTERED 
(
	[CreditTermsAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[CreditTermsAudit]  WITH CHECK ADD  CONSTRAINT [FK_CreditTermsAudit_CreditTerms] FOREIGN KEY([CreditTermsId])
REFERENCES [dbo].[CreditTerms] ([CreditTermsId])
GO

ALTER TABLE [dbo].[CreditTermsAudit] CHECK CONSTRAINT [FK_CreditTermsAudit_CreditTerms]
GO

