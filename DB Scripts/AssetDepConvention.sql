USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDepConvention]    Script Date: 9/17/2019 5:15:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDepConvention](
	[AssetDepConventionId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDepConventionCode] [varchar](30) NOT NULL,
	[AssetDepConventionName] [varchar](50) NOT NULL,
	[AssetDepConventionMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetDepConvention] PRIMARY KEY CLUSTERED 
(
	[AssetDepConventionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDepConvention] ADD  CONSTRAINT [DF_AssetDepConvention_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetDepConvention] ADD  CONSTRAINT [DF_AssetDepConvention_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetDepConvention]  WITH CHECK ADD  CONSTRAINT [FK_AssetDepConvention_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetDepConvention] CHECK CONSTRAINT [FK_AssetDepConvention_MasterCompany]
GO

