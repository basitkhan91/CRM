USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetStatus]    Script Date: 9/17/2019 5:17:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetStatus](
	[AssetStatusId] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](100) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Memo] [varchar](256) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](30) NOT NULL,
	[UpdatedBy] [varchar](30) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK__AssetSta__3214EC077E893104] PRIMARY KEY CLUSTERED 
(
	[AssetStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetStatus] ADD  CONSTRAINT [DF_AssetStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetStatus] ADD  CONSTRAINT [DF_AssetStatus_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetStatus]  WITH CHECK ADD  CONSTRAINT [FK_AssetStatus_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetStatus] CHECK CONSTRAINT [FK_AssetStatus_MasterCompany]
GO

