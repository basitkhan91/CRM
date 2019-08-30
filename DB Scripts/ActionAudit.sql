USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ActionAudit]    Script Date: 8/29/2019 6:06:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ActionAudit](
	[ActionAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ActionId] [bigint] NOT NULL,
	[Description] [varchar](200) NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK__ActionAu__31C48C37A0AE5962] PRIMARY KEY CLUSTERED 
(
	[ActionAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ActionAudit]  WITH CHECK ADD  CONSTRAINT [FK_ActionAudit_Action] FOREIGN KEY([ActionId])
REFERENCES [dbo].[Action] ([ActionId])
GO

ALTER TABLE [dbo].[ActionAudit] CHECK CONSTRAINT [FK_ActionAudit_Action]
GO

