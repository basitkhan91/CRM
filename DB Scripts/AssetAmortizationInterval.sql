USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetAmortizationInterval]    Script Date: 9/17/2019 5:14:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAmortizationInterval](
	[AssetAmortizationIntervalId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetAmortizationIntervalCode] [varchar](30) NOT NULL,
	[AssetAmortizationIntervalName] [varchar](50) NOT NULL,
	[AssetAmortizationIntervalMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetAmortizationIntervalType] PRIMARY KEY CLUSTERED 
(
	[AssetAmortizationIntervalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAmortizationInterval] ADD  CONSTRAINT [DF_AssetAmortizationInterval_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetAmortizationInterval] ADD  CONSTRAINT [DF_AssetAmortizationInterval_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetAmortizationInterval]  WITH CHECK ADD  CONSTRAINT [FK_AssetAmortizationInterval_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetAmortizationInterval] CHECK CONSTRAINT [FK_AssetAmortizationInterval_MasterCompany]
GO

