USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AccountingCalendarAudit]    Script Date: 8/29/2019 6:01:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AccountingCalendarAudit](
	[AccountingCalendarAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AccountingCalendarId] [bigint] NOT NULL,
	[Name] [varchar](30) NULL,
	[Description] [varchar](200) NULL,
	[FiscalName] [varchar](30) NULL,
	[FiscalYear] [int] NULL,
	[Quater] [tinyint] NULL,
	[Period] [tinyint] NULL,
	[FromDate] [date] NULL,
	[ToDate] [date] NULL,
	[PeriodName] [varchar](30) NULL,
	[Notes] [varchar](200) NULL,
	[MasterCompanyId] [int] NULL,
	[Status] [varchar](256) NULL,
	[LegalEntityId] [bigint] NULL,
	[isUpdate] [bit] NULL,
	[IsAdjustPeriod] [bit] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NULL,
 CONSTRAINT [PK__Accounti__4985CDB8311C6D47] PRIMARY KEY CLUSTERED 
(
	[AccountingCalendarAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AccountingCalendarAudit]  WITH CHECK ADD  CONSTRAINT [FK_AccountingCalendarAudit_AccountingCalendar] FOREIGN KEY([AccountingCalendarId])
REFERENCES [dbo].[AccountingCalendar] ([AccountingCalendarId])
GO

ALTER TABLE [dbo].[AccountingCalendarAudit] CHECK CONSTRAINT [FK_AccountingCalendarAudit_AccountingCalendar]
GO

