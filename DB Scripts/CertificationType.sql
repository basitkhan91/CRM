USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CertificationType]    Script Date: 9/17/2019 5:20:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CertificationType](
	[CertificationTypeId] [bigint] IDENTITY(1,1) NOT NULL,
	[CertificationName] [varchar](256) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[isActive] [bit] NOT NULL,
	[isDeleted] [bit] NOT NULL,
 CONSTRAINT [PK__Certific__D1A09641A5FBF39B] PRIMARY KEY CLUSTERED 
(
	[CertificationTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CertificationType] ADD  CONSTRAINT [DF_CertificationType_isActive]  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [dbo].[CertificationType] ADD  CONSTRAINT [DF_CertificationType_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO

ALTER TABLE [dbo].[CertificationType]  WITH CHECK ADD  CONSTRAINT [FK_CertificationType_CertificationType] FOREIGN KEY([CertificationTypeId])
REFERENCES [dbo].[CertificationType] ([CertificationTypeId])
GO

ALTER TABLE [dbo].[CertificationType] CHECK CONSTRAINT [FK_CertificationType_CertificationType]
GO

ALTER TABLE [dbo].[CertificationType]  WITH CHECK ADD  CONSTRAINT [FK_CertificationType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CertificationType] CHECK CONSTRAINT [FK_CertificationType_MasterCompany]
GO

