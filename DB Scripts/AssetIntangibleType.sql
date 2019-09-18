USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetIntangibleType]    Script Date: 9/17/2019 5:17:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetIntangibleType](
	[AssetIntangibleTypeId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetIntangibleName] [varchar](30) NOT NULL,
	[AssetIntangibleMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetIntangibleTypeSingleScreen] PRIMARY KEY CLUSTERED 
(
	[AssetIntangibleTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetIntangibleType] ADD  CONSTRAINT [DF_AssetIntangibleType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetIntangibleType] ADD  CONSTRAINT [DF_AssetIntangibleType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetIntangibleType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetIntangibleType] CHECK CONSTRAINT [FK_AssetIntangibleType_MasterCompany]
GO

