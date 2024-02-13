USE [master]
GO

DROP DATABASE IF EXISTS [Houzez]
GO

CREATE DATABASE [Houzez]
GO

USE [Houzez]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[booking](
	[BOOKING_ID] [int] IDENTITY(1,1) NOT NULL,
	[BUYER_ID] [int] NOT NULL,
	[SELLER_ID] [int] NOT NULL,
	[PROPERTY_ID] [int] NOT NULL,
	[BOOKING_TIME] [datetime] NULL,
	[CREATED_AT] [datetime] NULL,
 CONSTRAINT [PK_booking_BOOKING_ID] PRIMARY KEY CLUSTERED 
(
	[BOOKING_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[USER_ID] [int] IDENTITY(1,1) NOT NULL,
	[FIRST_NAME] [nvarchar](255) NOT NULL,
	[LAST_NAME] [nvarchar](255) NOT NULL,
	[EMAIL] [nvarchar](255) NOT NULL,
	[PASSWORD] [nvarchar](255) NOT NULL,
	[ACCOUNT_TYPE] [nvarchar](255) NOT NULL,
	[ADDRESS] [nvarchar](255) NOT NULL,
	[POSTCODE] [nvarchar](255) NOT NULL,
	[PHONE] [nvarchar](20) NOT NULL,
	[CREATED_AT] [datetime] NULL,
 CONSTRAINT [PK_user_USER_ID] PRIMARY KEY CLUSTERED 
(
	[USER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[property](
	[PROPERTY_ID] [int] IDENTITY(1,1) NOT NULL,
	[ADDRESS] [nvarchar](255) NOT NULL,
	[POSTCODE] [nvarchar](255) NOT NULL,
	[IMAGE] [nvarchar](255) NOT NULL,
	[DESCRIPTION] [nvarchar](255) NOT NULL,
	[TYPE] [nvarchar](9) NOT NULL,
	[BEDROOMS] [int] NOT NULL,
	[BATHROOMS] [int] NOT NULL,
	[GARDENS] [int] NOT NULL,
	[PRICE] [int] NOT NULL,
	[STATUS] [nvarchar](9) NOT NULL,
	[SELLER_ID] [int] NOT NULL,
	[BUYER_ID] [int] NULL,
	[CREATED_AT] [datetime] NULL,
 CONSTRAINT [PK_property_PROPERTY_ID] PRIMARY KEY CLUSTERED 
(
	[PROPERTY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

GO
ALTER TABLE [dbo].[booking] ADD  DEFAULT (NULL) FOR [BOOKING_TIME]
GO
ALTER TABLE [dbo].[property] ADD  DEFAULT (NULL) FOR [PRICE]
GO
ALTER TABLE [dbo].[property] ADD  DEFAULT (NULL) FOR [BUYER_ID]
GO
ALTER TABLE [dbo].[booking]  WITH NOCHECK ADD  CONSTRAINT [booking$booking_ibfk_1] FOREIGN KEY([BUYER_ID])
REFERENCES [dbo].[user] ([USER_ID])
GO
ALTER TABLE [dbo].[booking] CHECK CONSTRAINT [booking$booking_ibfk_1]
GO
ALTER TABLE [dbo].[booking]  WITH NOCHECK ADD  CONSTRAINT [booking$booking_ibfk_2] FOREIGN KEY([PROPERTY_ID])
REFERENCES [dbo].[property] ([PROPERTY_ID])
GO
ALTER TABLE [dbo].[booking] CHECK CONSTRAINT [booking$booking_ibfk_2]
GO
ALTER TABLE [dbo].[property]  WITH NOCHECK ADD  CONSTRAINT [property$property_ibfk_1] FOREIGN KEY([SELLER_ID])
REFERENCES [dbo].[user] ([USER_ID])
GO
ALTER TABLE [dbo].[property] CHECK CONSTRAINT [property$property_ibfk_1]
GO
ALTER TABLE [dbo].[property]  WITH NOCHECK ADD  CONSTRAINT [property$property_ibfk_2] FOREIGN KEY([BUYER_ID])
REFERENCES [dbo].[user] ([USER_ID])
GO
ALTER TABLE [dbo].[property] CHECK CONSTRAINT [property$property_ibfk_2]
GO

Insert into [dbo].[user] values('Alice', 'Johnson', 'test1@gmail.com', '12345', 'seller', '42 Pen-y-lan Road, Cardiff', 'CA1 8RR', '01234567890', NULL)
Insert into [dbo].[user] values('David', 'Williams', 'test2@gmail.com', '12345', 'seller', '100 Magnor Road, Newport', 'NP1 2LL 8RR', '01234567891', NULL)
Insert into [dbo].[user] values('Sophie', 'Clark', 'test3@gmail.com', '12345', 'buyer', 'Very Rich Street, London', 'W1', '01234567892', NULL)
Insert into [dbo].[user] values('Oliver', 'Smith', 'test4@gmail.com', '12345', 'buyer', '24 Meadow Lane, Bristol', 'BS1	3AB', '01234567893', NULL)
Insert into [dbo].[user] values('Emily', 'Taylor', 'test5@gmail.com', '12345', 'buyer', '5 Woodland Way, Manchester', 'M1 4XY', '01234567894', NULL)
Insert into [dbo].[user] values('Charlotte', 'Brown', 'test6@gmail.com', '12345', 'seller', '8 Coral Street, Brighton', 'BN1 7ZZ', '01234567895', NULL)
Insert into [dbo].[user] values('Jack', 'Miller', 'test7@gmail.com', '12345', 'buyer', '10 Park Lane, Edinburgh', 'EH1 9FG', '01234567896', NULL)
GO

Insert into dbo.property values('34 OK Place, OK Town','OK1 OK', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'DETACHED', 3,1,0,100000,'FOR SALE', 1, NULL, NULL)
Insert into dbo.property values('22 Maple Street, Maple City','MC1 1MC', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'SEMI',4,2,0,150000,'FOR SALE',2,NULL, NULL)
Insert into dbo.property values('8 Rose Street, Roseville','RV1 2RV', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'APARTMENT',2,1,0,120000,'WITHDRAWN',1, NULL, NULL)
Insert into dbo.property values('15 Elm Street, Elmville','EV1 1EV', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'DETACHED',4,2,1,180000,'FOR SALE',2, NULL, NULL)
Insert into dbo.property values('3 Oak Street, Oakton','OT1 1OT', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'DETACHED',3,1,1,160000,'WITHDRAWN', 2, NULL, NULL)
Insert into dbo.property values('10 Pine Street, Pinewood','PW1 1PW', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'APARTMENT',2,1,0,130000,'FOR SALE', 2, NULL, NULL)
Insert into dbo.property values('7 Birch Street, Birchville','BV1 1BV', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'APARTMENT',3,2,1,170000,'SOLD', 2, 3, NULL)
Insert into dbo.property values('29 Cedar Street, Cedartown','CT1 1CT', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'DETACHED',5,3,1,200000,'FOR SALE', 2, NULL, NULL)
Insert into dbo.property values('12 Willow Street, Willowvale','WV1 1WV', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'APARTMENT',2,1,0,140000,'SOLD', 1,4, NULL)
Insert into dbo.property values('18 Fir Street, Firfield','FF1 1FF', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'SEMI',4,2,1,180000,'FOR SALE',  2, NULL, NULL)
Insert into dbo.property values('5 Redwood Street, Redwood City','RC1 1RC', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'DETACHED',5,3,1,220000,'SOLD', 1, 3, NULL)
Insert into dbo.property values('18 Fir Street, Firfield','FF1 1FF', 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beautiful house in Dundee, United Kindgom, with a decorative style and high technology devices embedded into it.  offers Village Water, Sanitary Sewer, Gas, Electric, Storm Drainage, Private Roadway, Communications, and Entrance.', 'SEMI',4,2,1,150000,'SOLD', 2, 3, NULL)
GO

Insert into dbo.booking values(3, 1, 1,'2023-03-03T15:45:00', NULL) 
Insert into dbo.booking values(4, 2, 2,'2023-03-05T15:45:00', NULL) 
Insert into dbo.booking values(5, 2, 4,'2023-03-03T14:30:00', NULL) 
Insert into dbo.booking values(3, 1, 1,'2023-03-04T09:00:00', NULL) 
Insert into dbo.booking values(5, 1, 2,'2023-03-05T11:30:00', NULL) 
Insert into dbo.booking values(4, 2, 4,'2023-03-06T14:45:00', NULL) 
Insert into dbo.booking values(3, 1, 1,'2023-03-07T16:30:00', NULL) 
Insert into dbo.booking values(4, 1, 2,'2023-03-08T12:00:00', NULL) 
Insert into dbo.booking values(5, 2, 4,'2023-03-09T09:15:00', NULL) 
Insert into dbo.booking values(3, 1, 1,'2023-03-10T17:00:00', NULL) 
Insert into dbo.booking values(4 ,2, 1,'2023-03-11T08:45:00', NULL) 
Insert into dbo.booking values(5, 2, 2,'2023-03-12T10:00:00', NULL)
Insert into dbo.booking values(3, 2, 4,'2023-03-13T14:30:00', NULL)
Insert into dbo.booking values(5, 1, 4,'2023-03-14T16:15:00', NULL)
Insert into dbo.booking values(3, 2, 4,'2023-12-31T00:00:00', NULL)
GO
