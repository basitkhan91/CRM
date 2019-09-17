USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AuditHistory]    Script Date: 9/17/2019 5:19:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AuditHistory](
	[AuditHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[TableRecordId] [bigint] NULL,
	[TableName] [varchar](100) NOT NULL,
	[ColumnName] [varchar](100) NOT NULL,
	[PreviousValue] [varchar](500) NULL,
	[NewValue] [varchar](500) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[UpdatedBy] [varchar](256) NULL,
	[MasterCompanyId] [int] NOT NULL,
 CONSTRAINT [PK_AuditHistory] PRIMARY KEY CLUSTERED 
(
	[AuditHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

