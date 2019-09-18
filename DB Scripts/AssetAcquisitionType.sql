USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetAcquisitionType]    Script Date: 9/17/2019 5:13:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAcquisitionType](
	[AssetAcquisitionTypeId] [tinyint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK__AssetAcq__1FCF1ABE0F921C31] PRIMARY KEY CLUSTERED 
(
	[AssetAcquisitionTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAcquisitionType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAcquisitionType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetAcquisitionType] CHECK CONSTRAINT [FK_AssetAcquisitionType_MasterCompany]
GO

