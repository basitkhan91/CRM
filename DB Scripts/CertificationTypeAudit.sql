USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CertificationTypeAudit]    Script Date: 9/17/2019 5:20:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CertificationTypeAudit](
	[CertificationTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[CertificationTypeId] [bigint] NOT NULL,
	[CertificationName] [varchar](256) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[isActive] [bit] NULL,
	[isDeleted] [bit] NULL,
 CONSTRAINT [PK_CertificationTypeAudit] PRIMARY KEY CLUSTERED 
(
	[CertificationTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CertificationTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_CertificationTypeAudit_CertificationType] FOREIGN KEY([CertificationTypeId])
REFERENCES [dbo].[CertificationType] ([CertificationTypeId])
GO

ALTER TABLE [dbo].[CertificationTypeAudit] CHECK CONSTRAINT [FK_CertificationTypeAudit_CertificationType]
GO

