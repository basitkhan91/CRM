SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[JournalManual](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[IsManual] [BIT] NOT NULL DEFAULT 1,
	[BatchNumber] [varchar](30) NOT NULL,
	[BatchName] [varchar](50) NOT NULL,
	[BatchDescription] [varchar](50) NOT NULL,
	[GLAccountId] [bigint] NOT NULL,
	[BalanceTypeId] [bigint] NOT NULL,
	[JournalCategoryId] [bigint] NOT NULL,
	[JournalTypeId] [bigint] NOT NULL,
	[EntryDate] [DATETIME] NOT NULL,
	[EffectiveDate] [DATETIME] NOT NULL,
	[AccountingCalendarId] [bigint] NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[LocalCurrencyId] [int] NOT NULL,
	[ReportingCurrencyId] [int] NOT NULL,
	[CurrencyDate] [DATE] NULL,
	[JournalCurrencyTypeId] [BIGINT] NOT NULL,
	[CurrencyRate] [DATE] NULL,
	[IsReversing] [bit] NOT NULL,
	[ReversingDate] DATETIME NULL,
	[ReversingAccountingCalendarId] [BIGINT] NULL,
	[IsRecurring] [bit] NOT NULL,
	[RecurringDate] [DATETIME] NULL,
 	[MasterCompanyId] [int] NULL,
	[LocalDebitCurrency] [numeric](18, 2) NULL,
	[LocalCreditCurrency] [numeric](18, 2) NULL,
	[ReportingDebitCurrency] [numeric](18, 2) NULL,
	[ReportingCreditCurrency] [numeric](18, 2) NULL,
	[Description] [VARCHAR](50) NULL,
	[ManagementStructureEntityId] [BIGINT] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL DEFAULT 1,
	[IsDeleted] [bit] NULL DEFAULT 0
	
 CONSTRAINT [PK_JournalManual] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_GLAccount] FOREIGN KEY([GLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_GLAccount]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_BalanceType] FOREIGN KEY([BalanceTypeId])
REFERENCES [dbo].[BalanceType] ([ID])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_BalanceType]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_JournalCategory] FOREIGN KEY([JournalCategoryId])
REFERENCES [dbo].[JournalCategory] ([ID])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_JournalCategory]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_JournalType] FOREIGN KEY([JournalTypeId])
REFERENCES [dbo].[JournalType] ([ID])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_JournalType]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_JournalCurrencyType] FOREIGN KEY([JournalCurrencyTypeId])
REFERENCES [dbo].[JournalCurrencyType] ([ID])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_JournalCurrencyType]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_AccountingCalendar] FOREIGN KEY([AccountingCalendarId])
REFERENCES [dbo].[AccountingCalendar] ([AccountingCalendarId])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_AccountingCalendar]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_Employee]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_LocalCurrency] FOREIGN KEY([LocalCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_LocalCurrency]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_MasterCompany]
GO

ALTER TABLE [dbo].[JournalManual]  WITH CHECK ADD  CONSTRAINT [FK_JournalManual_ReportingCurrency] FOREIGN KEY([ReportingCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[JournalManual] CHECK CONSTRAINT [FK_JournalManual_ReportingCurrency]
GO

SET ANSI_PADDING OFF
GO


