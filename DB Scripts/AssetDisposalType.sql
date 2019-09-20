USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDisposalType]    Script Date: 9/17/2019 5:16:45 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDisposalType](
	[AssetDisposalTypeId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDisposalCode] [varchar](30) NOT NULL,
	[AssetDisposalName] [varchar](50) NOT NULL,
	[AssetDisposalMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetDisposalType] PRIMARY KEY CLUSTERED 
(
	[AssetDisposalTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDisposalType] ADD  CONSTRAINT [DF_AssetDisposalType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetDisposalType] ADD  CONSTRAINT [DF_AssetDisposalType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetDisposalType]  WITH CHECK ADD  CONSTRAINT [FK_AssetDisposalType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetDisposalType] CHECK CONSTRAINT [FK_AssetDisposalType_MasterCompany]
GO

