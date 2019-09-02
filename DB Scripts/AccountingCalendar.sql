USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AccountingCalendar]    Script Date: 8/29/2019 6:00:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AccountingCalendar](
	[AccountingCalendarId] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NULL,
	[Description] [varchar](200) NULL,
	[FiscalName] [varchar](30) NOT NULL,
	[FiscalYear] [int] NULL,
	[Quater] [tinyint] NOT NULL,
	[Period] [tinyint] NOT NULL,
	[FromDate] [date] NULL,
	[ToDate] [date] NULL,
	[PeriodName] [varchar](30) NULL,
	[Notes] [varchar](200) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[Status] [varchar](256) NULL,
	[LegalEntityId] [bigint] NULL,
	[isUpdate] [bit] NOT NULL,
	[IsAdjustPeriod] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_AccountingCalendar] PRIMARY KEY CLUSTERED 
(
	[AccountingCalendarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AccountingCalendar]  WITH CHECK ADD  CONSTRAINT [FK_AccountingCalendar_LegalEntity] FOREIGN KEY([LegalEntityId])
REFERENCES [dbo].[LegalEntity] ([LegalEntityId])
GO

ALTER TABLE [dbo].[AccountingCalendar] CHECK CONSTRAINT [FK_AccountingCalendar_LegalEntity]
GO

ALTER TABLE [dbo].[AccountingCalendar]  WITH CHECK ADD  CONSTRAINT [FK_AccountingCalendar_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AccountingCalendar] CHECK CONSTRAINT [FK_AccountingCalendar_MasterCompany]
GO

