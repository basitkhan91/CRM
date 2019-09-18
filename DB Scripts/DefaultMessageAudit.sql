USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[DefaultMessageAudit]    Script Date: 9/17/2019 5:25:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DefaultMessageAudit](
	[DefaultMessageAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[DefaultMessageId] [bigint] NOT NULL,
	[DefaultMessageCode] [varchar](50) NULL,
	[Description] [varchar](500) NULL,
	[Message] [varchar](max) NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_DefaultMessageAudit] PRIMARY KEY CLUSTERED 
(
	[DefaultMessageAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[DefaultMessageAudit]  WITH CHECK ADD  CONSTRAINT [FK_DefaultMessageAudit_DefaultMessage] FOREIGN KEY([DefaultMessageId])
REFERENCES [dbo].[DefaultMessage] ([DefaultMessageId])
GO

ALTER TABLE [dbo].[DefaultMessageAudit] CHECK CONSTRAINT [FK_DefaultMessageAudit_DefaultMessage]
GO

