-- Connect to the 'master' database to run this snippet

USE master
GO
IF NOT EXISTS ( SELECT [name] FROM sys.databases WHERE [name] = N'DanceCool')
CREATE DATABASE DanceCool
GO

USE DanceCool
GO

/*
Creation Order
1. Role
1. User
2. UserRole
3. UserCredentials
4. SkillLevel
4. Direction
5. Group
6. UserGroup
7. LessonType
8. Lesson
9. Abonnement
10. Payment

ToDelete order
1. Payment
2. Abonnement
3. Lesson
4. LessonType
5. UserGroup
6. Group
7. DanceDirection
7. SkillLevel
8. UserCredentials
9. UserRole
10. User
10. Role
*/

IF OBJECT_ID('[dbo].[Attendances]', 'U') IS NOT NULL
DROP TABLE [dbo].[Attendances]
GO
IF OBJECT_ID('[dbo].[Payments]', 'U') IS NOT NULL
DROP TABLE [dbo].[Payments]
GO
IF OBJECT_ID('[dbo].[Abonnements]', 'U') IS NOT NULL
DROP TABLE [dbo].[Abonnements]
GO
IF OBJECT_ID('[dbo].[Lessons]', 'U') IS NOT NULL
DROP TABLE [dbo].[Lessons]
GO
IF OBJECT_ID('[dbo].[UserGroups]', 'U') IS NOT NULL
DROP TABLE [dbo].[UserGroups]
GO
IF OBJECT_ID('[dbo].[Groups]', 'U') IS NOT NULL
DROP TABLE [dbo].[Groups]
GO
IF OBJECT_ID('[dbo].[DanceDirections]', 'U') IS NOT NULL
DROP TABLE [dbo].[DanceDirections]
GO
IF OBJECT_ID('[dbo].[SkillLevels]', 'U') IS NOT NULL
DROP TABLE [dbo].[SkillLevels]
GO
IF OBJECT_ID('[dbo].[UserCredentials]', 'U') IS NOT NULL
DROP TABLE [dbo].[UserCredentials]
GO
IF OBJECT_ID('[dbo].[Users]', 'U') IS NOT NULL
DROP TABLE [dbo].[Users]
GO
IF OBJECT_ID('[dbo].[Roles]', 'U') IS NOT NULL
DROP TABLE [dbo].[Roles]
GO

-- Create a new table called '[Role]' in schema '[dbo]'
CREATE TABLE [dbo].[Roles]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [RoleName] NVARCHAR(50) NOT NULL
);
GO

-- Insert rows into table 'Role' in schema '[dbo]'
INSERT INTO [dbo].[Roles]
    ( [RoleName] )
VALUES
    ('Student'),
    ('Mentor'),
    ('Admin') 
GO

-- Create a new table called '[Users]' in schema '[dbo]'
CREATE TABLE [dbo].[Users]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[RoleId] INT NOT NULL,
    [FirstName] NVARCHAR(512) NOT NULL,
    [LastName] NVARCHAR(512) NOT NULL,
    [PhoneNumber] VARCHAR(17) NULL UNIQUE
	CONSTRAINT FK_User_UserCredentials FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id])
);
GO

-- Insert mentors into table 'Users' in schema '[dbo]'
INSERT INTO [dbo].[Users]
    ([RoleId], [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( 2, N'Оксана', N'Андрущенко', '+380104995985' ), --1
    ( 2, N'Мар''ян', N'Пелюх', '+380994543613' ), --2
    ( 2, N'Мар''яна', N'Луцишин', '+380816285545' ), --3
    ( 2, N'Олександр', N'Січкар', '+380813655545' ), --4
    ( 2, N'Роман', N'Пахолків', '+380760155782' ),--5
    ( 2, N'Мар''яна', N'Штокало', '+380774155782' ),--6
    ( 2, N'Ігор', N'Коваль', '+380837451111' ),--7
    ( 2, N'Анна', N'Данчук', '+380792884834' ),--8
    ( 2, N'Ольга', N'Коробчук', '+380792784834' )--9
GO

-- Insert Students into table 'User' in schema '[dbo]'
INSERT INTO [dbo].[Users]
    ( [RoleId], [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( 1, N'Каріна', N'Кравченко', '+380635595952' ),--10
    ( 1, N'Юрій', N'Чабаренко', '+380730401631' ),
    ( 1, N'Любов', N'Горбова', '+380671793382' ),
    ( 1, N'Оксана', N'Котик', '+380979071237' ),
    ( 1, N'Уляна', N'Коваль', '+380988737362' ),
    ( 1, N'Дзвонемира', N'Довгалюк', '+380680356776' ),
    ( 1, N'Артем', N'Монастирев', '+380934627446' ),
    ( 1, N'Анна-Тереза', N'Бенко', '+380504627446' ),
    ( 1, N'Оксана', N'Кость', '+380550933568' ),
    ( 1, N'Володимир', N'Бережанський', '+380950427186' ),
    ( 1, N'Юлія', N'Рубаха', '+380445930404' ),
    ( 1, N'Діана', N'Срібна', '+380324972238' ),
    ( 1, N'Юрій', N'Трофімов', '+380632167853' ),
    ( 1, N'Олександр', N'Сущий', '+380679560426' ),
    ( 1, N'Ірена', N'Одинець', '+380681005145' ),
    ( 1, N'Івасик', N'Телесик', '+380964276559' ),
    ( 1, N'Микита', N'Лис', '+380987666295' ),
    ( 1, N'Котигорошко', N'Булавоносець', '+380975110480' ),
    ( 1, N'Петрик', N'П''яточкін', '+380739110666' ),
    ( 1, N'Капітошка', N'Малий', '+380559475073' ),
    ( 1, N'Вовчик', N'Братик', '+380934946898' ),
    ( 1, N'Лисичка', N'Сестричка', '+380634119407' ),--31
	( 1, N'Раян', N'Гослінг', '+380978458025' ),
	( 1, N'Емма', N'Стоун', '+380978458026' )
GO

-- Create a new table called '[UserCredentials]' in schema '[dbo]'
CREATE TABLE [dbo].[UserCredentials]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [UserId] INT NOT NULL UNIQUE,
    [Email] NVARCHAR(254) NOT NULL UNIQUE,
    [Password] TEXT NOT NULL,
    CONSTRAINT FK_User_Roles FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id])
);
GO

-- Insert rows into table 'UserCredentials' in schema '[dbo]'
INSERT INTO [dbo].[UserCredentials]
    ([UserId], [Email], [Password])
VALUES
    (1, 'andrushchenko@mail.com', 'MamaMylaRamu'),
    (2, 'peliukh@mail.com', 'MamaMylaRamu'),
    (3, 'lutsshyn@mail.com', 'MamaMylaRamu'),
    (4, 'pakholkiv@mail.com', 'MamaMylaRamu'),
    (5, 'koval@mail.com', 'MamaMylaRamu'),
    (6, 'danchuk@mail.com', 'MamaMylaRamu'),
    (7, 'kravchenko@mail.com', 'MamaMylaRamu'),
    (8, 'chabarenko@mail.com', 'MamaMylaRamu'),
    (9, 'gorbova@mail.com', 'MamaMylaRamu'),
    (10, 'kotyk@mail.com', 'MamaMylaRamu')
GO

-- Create a new table called '[DanceDirections]' in schema '[dbo]'
CREATE TABLE [dbo].[DanceDirections]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
    [Name] NVARCHAR(50) NOT NULL
);
GO

-- Insert rows into table 'DanceDirections' in schema '[dbo]'
INSERT INTO [dbo].[DanceDirections]
    ( Name)
VALUES
    ( 'Salsa LA' ),
    ( 'Salsa Casino' ),
    ( 'Bachata'),
    ( 'Latina Lady Solo')
GO

-- Create a new table called '[SkillLevels]' in schema '[dbo]'
CREATE TABLE [dbo].[SkillLevels]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
    [Name] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(1024) NOT NULL
);
GO

-- Insert rows into table 'SkillLevels' in schema '[dbo]'
INSERT INTO [dbo].[SkillLevels]
    ([Name], [Description])
VALUES
    ( 'New Group', N'Групи з "нуля", для тих, хто робить перші кроки в танці.'),
    ( 'Beginners', N'Група займається до 6-ти місяців.'),
    ( 'Improvers', N'Група займається від 6-ти місяців до року.'),
    ( 'Intermediate', N'Група займається від року до півтора.'),
    ( 'Advanced', N'Група займається від півтора року і довше.')
GO

-- Create a new table called '[Groups]' in schema '[dbo]'
CREATE TABLE [dbo].[Groups]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [PrimaryMentorId] INT NOT NULL,
    [SecondaryMentorId] INT NULL,
    [DirectionId] INT NOT NULL,
    [LevelId] INT NULL,
    CONSTRAINT FK_Direction_Group FOREIGN KEY ([DirectionId]) REFERENCES [dbo].[DanceDirections]([Id]),
    CONSTRAINT FK_Level_Group FOREIGN KEY ([LevelId]) REFERENCES [dbo].[SkillLevels]([Id]),
    CONSTRAINT FK_PrimMentor_Group FOREIGN KEY ([PrimaryMentorId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_SecMentor_Group FOREIGN KEY ([SecondaryMentorId]) REFERENCES [dbo].[Users]([Id])
);
GO

-- Insert rows into table 'Groups' in schema '[dbo]'
INSERT INTO [dbo].[Groups]
    (PrimaryMentorId, SecondaryMentorId, DirectionId, LevelId )
VALUES
    (/*prima*/1, /*sec*/2, /*dir*/1, /*level*/2),
    (/*prima*/1, /*sec*/2, /*dir*/1, /*level*/4),
    (/*prima*/5, /*sec*/6, /*dir*/2, /*level*/2),
    (/*prima*/5, /*sec*/6, /*dir*/2, /*level*/4),
    (/*prima*/3, /*sec*/4, /*dir*/3, /*level*/1),
    (/*prima*/3, /*sec*/4, /*dir*/3, /*level*/2),
    (/*prima*/3, /*sec*/4, /*dir*/3, /*level*/3),
    (/*prima*/9, /*sec*/null, /*dir*/4,/*level*/null)
GO

-- Create a new table called '[UserGroups]' in schema '[dbo]'
CREATE TABLE [dbo].[UserGroups]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [GroupId] INT NOT NULL,
    CONSTRAINT FK_User_UserGroup FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_Group_UserGroup FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups]([Id])
);
GO

DECLARE @salsaLaCount INT = 10;

WHILE @salsaLaCount <= 17
BEGIN
    INSERT INTO [dbo].[UserGroups]
        ( UserId, GroupId )
    VALUES
        ( @salsaLaCount, 1 );
    SET @salsaLaCount = @salsaLaCount + 1;
END;
GO

DECLARE @salsaLaCount INT = 18;

WHILE @salsaLaCount <= 25
BEGIN
    INSERT INTO [dbo].[UserGroups]
        ( UserId, GroupId )
    VALUES
        ( @salsaLaCount, 2 );
    SET @salsaLaCount = @salsaLaCount + 1;
END;
GO

DECLARE @salsaLaCount INT = 23;

WHILE @salsaLaCount <= 31
BEGIN
    INSERT INTO [dbo].[UserGroups]
        ( UserId, GroupId )
    VALUES
        ( @salsaLaCount, 3 );
    SET @salsaLaCount = @salsaLaCount + 1;
END;
GO

-- Create a new table called '[Lessons]' in schema '[dbo]'
CREATE TABLE [dbo].[Lessons]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [Date] DATETIME NOT NULL,
    [Room] NVARCHAR(50) NOT NULL,
    [GroupId] INT NULL,
    CONSTRAINT FK_Group_Lesson FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups]([Id])
);
GO

-- Insert rows into table '[Lessons]' in schema '[dbo]'
INSERT INTO [dbo].[Lessons]
    ([Date], [Room], [GroupId])
VALUES
    ( '2019-05-27 19:00', N'Малий зал', 1),
    ( '2019-05-24 21:00', N'Великий зал', 3),
    ( '2019-05-23 21:00', N'Великий зал', 7),
	( '2019-05-22 19:30', N'Малий зал', 4),
	( '2019-05-21 20:30', N'Малий зал', 2),
	( '2019-05-20 20:00', N'Малий зал', 5),
	( '2019-05-18 19:00', N'Великий зал', 8),
    ( '2019-05-17 21:00', N'Великий зал', 3),
    ( '2019-05-16 21:00', N'Малий зал', 4),
	( '2019-05-15 19:30', N'Малий зал', 6),
	( '2019-05-14 20:30', N'Великий зал', 7),
	( '2019-05-13 20:00', N'Малий зал', 2),
	( '2019-05-12 20:00', N'Малий зал', 6)
GO

-- Create the table in the specified schema
CREATE TABLE [dbo].[Attendances]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), -- Primary Key column
    [LessonId] INT NOT NULL,
    [PresentStudentId] INT NOT NULL,
    CONSTRAINT FK_Lesson_Attendances FOREIGN KEY ([LessonId]) REFERENCES [dbo].[Lessons]([Id]),
    CONSTRAINT FK_User_Attendances FOREIGN KEY ([PresentStudentId]) REFERENCES [dbo].[Users]([Id])
);
GO

-- Insert rows into table '[Attendances]' in schema '[dbo]'
INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES
	--1
	( 1,  10),
	( 1,  13),
	( 1,  16),
	( 1,  18),
	( 1,  19),
	( 1,  22),
	( 1,  24),
	( 1,  25),
	( 1,  28),
	( 1,  29),
	( 1,  31),
	--2
	( 2,  11),
	( 2,  12),
	( 2,  14),
	( 2,  15),
	( 2,  17),
	( 2,  19),
	( 2,  20),
	( 2,  23),
	( 2,  26),
	( 2,  29),
	( 2,  30),
	( 2,  31),
	--3
	( 3,  10),
	( 3,  14),
	( 3,  16),
	( 3,  18),
	( 3,  20),
	( 3,  21),
	( 3,  22),
	( 3,  23),
	( 3,  24),
	( 3,  25),
	( 3,  27),
	( 3,  28),
	( 3,  29),
	( 3,  30),
	--4
	( 4,  10),
	( 4,  11),
	( 4,  12),
	( 4,  13),
	( 4,  17),
	( 4,  21),
	( 4,  22),
	( 4,  24),
	( 4,  26),
	( 4,  28),
	( 4,  29),
	( 4,  30),
	--5
	( 5,  10),
	( 5,  12),
	( 5,  13),
	( 5,  14),
	( 5,  16),
	( 5,  17),
	( 5,  24),
	( 5,  25),
	( 5,  26),
	( 5,  28),
	( 5,  29),
	( 5,  30),
	( 5,  31),
	--6
	( 6,  10),
	( 6,  11),
	( 6,  12),
	( 6,  13),
	( 6,  14),
	( 6,  15),
	( 6,  16),
	( 6,  17),
	( 6,  18),
	( 6,  19),
	( 6,  20),
	( 6,  22),
	( 6,  25),
	( 6,  26),
	( 6,  28),
	( 6,  31),
	--7
	( 7, 10),
	( 7, 13),
	( 7, 14),
	( 7, 15),
	( 7, 18),
	( 7, 20),
	( 7, 21),
	( 7, 25),
	( 7, 26),
	( 7, 27),
	( 7, 28),
	( 7, 29),
	( 7, 30),
	--8
	( 8, 12),
	( 8,  13),
	( 8,  16),
	( 8,  17),
	( 8,  18),
	( 8,  19),
	( 8,  20),
	( 8,  22),
	( 8,  23),
	( 8,  24),
	( 8,  25),
	( 8,  28),
	( 8,  29),
	( 8,  31),
	--9
	( 9, 11),
	( 9, 14),
	( 9, 15),
	( 9, 18),
	( 9, 21),
	( 9, 22),
	( 9, 23),
	( 9, 25),
	( 9, 28),
	( 9, 29),
	( 9, 30),
	--10
	( 10, 10),
	( 10, 12),
	( 10, 13),
	( 10, 15),
	( 10, 16),
	( 10, 17),
	( 10, 20),
	( 10, 22),
	( 10, 24),
	( 10, 25),
	( 10, 26),
	( 10, 27),
	( 10, 30),
	( 10, 31),
	--11
	( 11, 10),
	( 11, 11),
	( 11, 12),
	( 11, 13),
	( 11, 14),
	( 11, 15),
	( 11, 16),
	( 11, 17),
	( 11, 18),
	( 11, 19),
	( 11, 20),
	( 11, 21),
	( 11, 22),
	( 11, 23),
	( 11, 24),
	( 11, 25),
	( 11, 26),
	( 11, 27),
	( 11, 28),
	( 11, 29),
	( 11, 30),
	( 11, 31),
	--12
	( 12, 10),
	( 12, 11),
	( 12, 12),
	( 12, 13),
	( 12, 15),
	( 12, 17),
	( 12, 19),
	( 12, 20),
	( 12, 21),
	( 12, 23),
	( 12, 26),
	( 12, 27),
	( 12, 30),
	( 12, 31),
	--13
	( 13, 10),
	( 13, 11),
	( 13, 12),
	( 13, 14),
	( 13, 16),
	( 13, 18),
	( 13, 21),
	( 13, 22),
	( 13, 24),
	( 13, 27),
	( 13, 29),
	( 13, 30),
	( 13, 31)
	GO

-- Create a new table called '[Abonnements]' in schema '[dbo]'
CREATE TABLE [dbo].[Abonnements]
(
    [Id] INT NOT NULL PRIMARY KEY  IDENTITY(1,1),
    [AbonnementName] NVARCHAR(50) NOT NULL,
	[Price] DECIMAL NOT NULL
);
GO

-- Insert rows into table 'Abonnements' in schema '[dbo]'
INSERT INTO [dbo].[Abonnements]
    ( [AbonnementName], [Price])
VALUES
	( N'разовий одинарний', 60),
	( N'разовий парий', 50),
    ( N'4-разовий одинарний', 200),
	( N'4-разовий парий', 150),
    ( N'8-разовий одинарний', 300),
	( N'8-разовий парний', 250),
    ( N'індивідуальний одинарний', 250),
    ( N'індивідуальний парний', 175)
GO

-- Create a new table called '[Payments]' in schema '[dbo]'
CREATE TABLE [dbo].[Payments]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [Date] DATETIME NOT NULL,
    [TotalSum] DECIMAL NOT NULL,
    [UserSenderId] INT NOT NULL,
    [UserReceiverId] INT NOT NULL,
    [AbonnementId] INT NOT NULL,
    CONSTRAINT FK_UserSender_Payment FOREIGN KEY ([UserSenderId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_UserReceiver_Payment FOREIGN KEY ([UserReceiverId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_Abonement_Payment FOREIGN KEY ([AbonnementId]) REFERENCES [dbo].[Abonnements]([Id])
);
GO
