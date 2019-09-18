USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CapabilityTypeAudit]    Script Date: 9/17/2019 5:20:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CapabilityTypeAudit](
	[CapabilityTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[CapabilityTypeId] [int] NOT NULL,
	[Description] [varchar](50) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CapabilityTypeAudit] PRIMARY KEY CLUSTERED 
(
	[CapabilityTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CapabilityTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_CapabilityTypeAudit_CapabilityType] FOREIGN KEY([CapabilityTypeId])
REFERENCES [dbo].[CapabilityType] ([CapabilityTypeId])
GO

ALTER TABLE [dbo].[CapabilityTypeAudit] CHECK CONSTRAINT [FK_CapabilityTypeAudit_CapabilityType]
GO

