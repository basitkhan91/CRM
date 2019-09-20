USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Address]    Script Date: 9/17/2019 4:05:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Address](
	[AddressId] [bigint] IDENTITY(1,1) NOT NULL,
	[POBox] [varchar](30) NULL,
	[Line1] [varchar](50) NOT NULL,
	[Line2] [varchar](50) NULL,
	[Line3] [varchar](50) NULL,
	[City] [varchar](50) NOT NULL,
	[StateOrProvince] [varchar](50) NOT NULL,
	[PostalCode] [varchar](20) NOT NULL,
	[CountryId] [smallint] NOT NULL,
	[Country] [varchar](30) NOT NULL,
	[Latitude] [decimal](12, 9) NULL,
	[Longitude] [decimal](12, 9) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_Countries] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Country] ([CountyId])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_Countries]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_MasterCompany]
GO

