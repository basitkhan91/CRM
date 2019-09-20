USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetType]    Script Date: 9/17/2019 5:18:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetType](
	[AssetTypeId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetTypeCode] [varchar](30) NOT NULL,
	[AssetTypeName] [varchar](30) NOT NULL,
	[AssetTypeMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetTypeSingleScreen] PRIMARY KEY CLUSTERED 
(
	[AssetTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetType] ADD  CONSTRAINT [DF_AssetType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetType] ADD  CONSTRAINT [DF_AssetType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetType]  WITH CHECK ADD  CONSTRAINT [FK_AssetType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetType] CHECK CONSTRAINT [FK_AssetType_MasterCompany]
GO

