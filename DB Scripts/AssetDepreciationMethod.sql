USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDepreciationMethod]    Script Date: 9/17/2019 5:16:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDepreciationMethod](
	[AssetDepreciationMethodId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDepreciationMethodCode] [varchar](30) NOT NULL,
	[AssetDepreciationMethodName] [varchar](30) NOT NULL,
	[AssetDepreciationMethodBasis] [varchar](20) NOT NULL,
	[AssetDepreciationMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetDepreciationMethod] PRIMARY KEY CLUSTERED 
(
	[AssetDepreciationMethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDepreciationMethod] ADD  CONSTRAINT [DF_AssetDepreciationMethod_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetDepreciationMethod] ADD  CONSTRAINT [DF_AssetDepreciationMethod_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetDepreciationMethod]  WITH CHECK ADD  CONSTRAINT [FK_AssetDepreciationMethod_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetDepreciationMethod] CHECK CONSTRAINT [FK_AssetDepreciationMethod_MasterCompany]
GO

