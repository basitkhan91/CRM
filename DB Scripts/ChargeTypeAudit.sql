USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ChargeTypeAudit]    Script Date: 9/17/2019 5:20:36 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ChargeTypeAudit](
	[ChargeTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ChargeTypeId] [int] NOT NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](256) NULL,
	[Memo] [varchar](256) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](50) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_ChargeTypeAudit] PRIMARY KEY CLUSTERED 
(
	[ChargeTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ChargeTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_ChargeTypeAudit_ChargeTypeAudit] FOREIGN KEY([ChargeTypeId])
REFERENCES [dbo].[ChargeType] ([ChargeTypeId])
GO

ALTER TABLE [dbo].[ChargeTypeAudit] CHECK CONSTRAINT [FK_ChargeTypeAudit_ChargeTypeAudit]
GO

