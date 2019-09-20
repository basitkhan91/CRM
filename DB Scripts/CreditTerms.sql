USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CreditTerms]    Script Date: 9/17/2019 5:22:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CreditTerms](
	[CreditTermsId] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NOT NULL,
	[Percentage] [decimal](18, 2) NOT NULL,
	[Days] [tinyint] NOT NULL,
	[NetDays] [tinyint] NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CreditTerm] PRIMARY KEY CLUSTERED 
(
	[CreditTermsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[CreditTerms] ADD  CONSTRAINT [DF_CreditTerms_Percentage]  DEFAULT ((0)) FOR [Percentage]
GO

ALTER TABLE [dbo].[CreditTerms] ADD  CONSTRAINT [DF_CreditTerms_Days]  DEFAULT ((0)) FOR [Days]
GO

ALTER TABLE [dbo].[CreditTerms] ADD  CONSTRAINT [DF_CreditTerms_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[CreditTerms] ADD  CONSTRAINT [DF_CreditTerms_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[CreditTerms]  WITH CHECK ADD  CONSTRAINT [FK_CreditTerms_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CreditTerms] CHECK CONSTRAINT [FK_CreditTerms_MasterCompany]
GO

