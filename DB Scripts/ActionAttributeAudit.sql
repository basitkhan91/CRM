USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ActionAttributeAudit]    Script Date: 8/29/2019 6:05:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ActionAttributeAudit](
	[ActionAttributeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ActionAttributeId] [bigint] NOT NULL,
	[Description] [varchar](100) NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK__ActionAt__5B77CFBD270ECE92] PRIMARY KEY CLUSTERED 
(
	[ActionAttributeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ActionAttributeAudit]  WITH CHECK ADD  CONSTRAINT [FK_ActionAttributeAudit_ActionAttribute] FOREIGN KEY([ActionAttributeId])
REFERENCES [dbo].[ActionAttribute] ([ActionAttributeId])
GO

ALTER TABLE [dbo].[ActionAttributeAudit] CHECK CONSTRAINT [FK_ActionAttributeAudit_ActionAttribute]
GO

