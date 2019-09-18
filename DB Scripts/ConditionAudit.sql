USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ConditionAudit]    Script Date: 9/17/2019 5:21:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ConditionAudit](
	[ConditionAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ConditionId] [bigint] NOT NULL,
	[Code] [varchar](50) NULL,
	[Description] [varchar](100) NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_ConditionAudit] PRIMARY KEY CLUSTERED 
(
	[ConditionAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ConditionAudit]  WITH CHECK ADD  CONSTRAINT [FK_ConditionAudit_Condition] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])
GO

ALTER TABLE [dbo].[ConditionAudit] CHECK CONSTRAINT [FK_ConditionAudit_Condition]
GO

