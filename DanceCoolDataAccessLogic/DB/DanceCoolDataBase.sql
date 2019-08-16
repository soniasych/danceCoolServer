USE master
GO
IF NOT EXISTS (
    SELECT [name]
FROM sys.databases
WHERE [name] = N'DanceCool'
)
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
9. Abonement
10. Payment

ToDelete order
1. Payment
2. Abonement
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
    [Id] INT NOT NULL IDENTITY(1,1),
    [FirstName] NVARCHAR(512) NOT NULL,
    [LastName] NVARCHAR(512) NOT NULL,
    [PhoneNumber] VARCHAR(17) NULL UNIQUE,
	[RoleId] INT NOT NULL DEFAULT(1),
	[PayedLessons] INT NOT NULL DEFAULT(0),
	CONSTRAINT FK_User_Role FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id]),
	CONSTRAINT PK_UserId PRIMARY KEY ([Id])
);
GO

-- Insert mentors into table 'Users' in schema '[dbo]'
INSERT INTO [dbo].[Users]
    ( [FirstName], [LastName], [PhoneNumber], [RoleId] )
VALUES
    ( N'Оксана', N'Андрущенко', '+380104995985', 3 ), --1
    ( N'Мар''ян', N'Пелюх', '+380994543613', 2 ), --2
    ( N'Мар''яна', N'Луцишин', '+380816285545', 3 ), --3
    ( N'Олександр', N'Січкар', '+380813655545', 2 ), --4
    ( N'Роман', N'Пахолків', '+380760155782', 2 ),--5
    ( N'Мар''яна', N'Штокало', '+380774155782', 2 ),--6
    ( N'Ігор', N'Коваль', '+380837451111', 2 ),--7
    ( N'Анна', N'Данчук', '+380792884834', 2 ),--8
    ( N'Ольга', N'Коробчук', '+380792784834', 2 )--9
GO

-- Insert Students into table 'User' in schema '[dbo]'
INSERT INTO [dbo].[Users]
    ( [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( N'Каріна', N'Кравченко', '+380635595952' ),--10
    ( N'Юрій', N'Чабаренко', '+380730401631' ),--11
    ( N'Андрій', N'Панчишин', '+380730041631' ),--12
    ( N'Любов', N'Горбова', '+380671793382' ),--13
    ( N'Оксана', N'Котик', '+380979071237' ),--14
    ( N'Уляна', N'Коваль', '+380988737362' ),--15
    ( N'Дзвонемира', N'Довгалюк', '+380680356776' ),--16
    ( N'Артем', N'Монастирев', '+380934627446' ),--17
    ( N'Анна-Тереза', N'Бенко', '+380504627446' ),--18
    ( N'Оксана', N'Кость', '+380550933568' ),--19
    ( N'Володимир', N'Бережанський', '+380950427186' ),
    ( N'Юлія', N'Рубаха', '+380445930404' ),
    ( N'Діана', N'Срібна', '+380324972238' ),
    ( N'Юрій', N'Трофімов', '+380632167853' ),
    ( N'Олександр', N'Сущий', '+380679560426' ),
    ( N'Ірена', N'Одинець', '+380681005145' ),
    ( N'Івасик', N'Телесик', '+380964276559' ),
    ( N'Микита', N'Лис', '+380987666295' ),
    ( N'Котигорошко', N'Булавоносець', '+380975110480' ),
    ( N'Петрик', N'П''яточкін', '+380739110666' ),
    ( N'Капітошка', N'Малий', '+380559475073' ),
    ( N'Вовчик', N'Братик', '+380934946898' ),
    ( N'Кривенька', N'Качечка', '+380634019407' )--32
GO

-- Create a new table called '[UserCredentials]' in schema '[dbo]'
CREATE TABLE [dbo].[UserCredentials]
(
    [Id] INT NOT NULL IDENTITY(1,1),
    [UserId] INT NOT NULL UNIQUE,
    [Email] NVARCHAR(254) NOT NULL UNIQUE,
    [PasswordHash] VARBINARY(MAX) NOT NULL,
    [PasswordSalt] VARBINARY(MAX) NOT NULL,
    CONSTRAINT FK_User_UserCredentials FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]),
	CONSTRAINT PK_UserCredentialsId PRIMARY KEY ([Id])
);
GO

-- Insert rows into table 'UserCredentials' in schema '[dbo]'
INSERT INTO [dbo].[UserCredentials]
    ([UserId], [Email], [PasswordHash], [PasswordSalt])
VALUES
    (1, 'andrushchenko@mail.com', CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (2, 'peliukh@mail.com', CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (3, 'lutsshyn@mail.com', CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (4, 'pakholkiv@mail.com',  CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (5, 'koval@mail.com', CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (6, 'danchuk@mail.com',  CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (7, 'kravchenko@mail.com',  CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (8, 'chabarenko@mail.com',  CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (9, 'gorbova@mail.com', CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1)),
    (10, 'kotyk@mail.com', CONVERT(VARBINARY(MAX), '0x801EAC0A3E9EDA42FD8BA68F3E110593CDB73B1A19F704222AEDD0EB1A231D96E981128528A8E7EA411AF8F0F9E84B422716136EBCB8959F5DA0FD72D279C064',1), CONVERT(VARBINARY(MAX), '0x25BF0E070435974639A9E4C89458A2FF4628BEAA429D27330651A0484BD197D68F01EEF4A8A7E8074CEF2383BA7FD178B799C6C55339278B925878AC3CAEA17ADBF2CDC0D3685AD5CEDC6DED650F2CE8425B6A1AC36B234D47AAF336505F9B1A00DFF90CDDE8BFEDBB2625125CA86D497027A8F1DB2586A8570911F6A51C7FDD',1))
GO

-- Create a new table called '[DanceDirections]' in schema '[dbo]'
CREATE TABLE [dbo].[DanceDirections]
(
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_DanceDirectionId PRIMARY KEY([Id])
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
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(1024) NOT NULL,
	CONSTRAINT PK_SkillLevelId PRIMARY KEY([Id])
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
    [Id] INT NOT NULL IDENTITY(1,1),
    [PrimaryMentorId] INT NOT NULL,
    [SecondaryMentorId] INT NULL,
    [DirectionId] INT NOT NULL,
    [LevelId] INT NULL,
	[GroupName] VARCHAR(256) NULL,
	CONSTRAINT PK_GroupId PRIMARY KEY([Id]),
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
    [Id] INT NOT NULL IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [GroupId] INT NOT NULL,
	CONSTRAINT PK_UserGroupId PRIMARY KEY([Id]),
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

DECLARE @salsaLaCount INT = 25;

WHILE @salsaLaCount <= 32
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
    [Id] INT NOT NULL IDENTITY(1,1),
    [Date] DATETIME NOT NULL,
    [Room] NVARCHAR(1024) NOT NULL,
    [GroupId] INT NULL,
	CONSTRAINT PK_LessonId PRIMARY KEY([Id]),
    CONSTRAINT FK_Group_Lesson FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups]([Id])
);
GO

-- Insert rows into table '[Lessons]' in schema '[dbo]'
INSERT INTO [dbo].[Lessons]
    ([Date], [Room], [GroupId])
VALUES
------------------------------------------Квітень
	( '2019-04-2 19:00', N'Малий зал', 1),--1
	( '2019-04-2 20:30', N'Малий зал', 2),--2
	( '2019-04-4 19:00', N'Малий зал', 1),--3
	( '2019-04-4 20:30', N'Малий зал', 2),--4
	( '2019-04-9 19:00', N'Малий зал', 1),--5
	( '2019-04-9 20:30', N'Малий зал', 2),--6
	( '2019-04-11 19:00', N'Малий зал', 1),--7
	( '2019-04-11 20:30', N'Малий зал', 2),--8
	( '2019-04-16 19:00', N'Малий зал', 1),--9
	( '2019-04-16 20:30', N'Малий зал', 2),--10
	( '2019-04-18 19:00', N'Малий зал', 1),--11
	( '2019-04-18 20:30', N'Малий зал', 2),--12
	( '2019-04-23 19:00', N'Малий зал', 1),--13
	( '2019-04-23 20:30', N'Малий зал', 2),--14
	( '2019-04-25 19:00', N'Малий зал', 1),--15
	( '2019-04-25 20:30', N'Малий зал', 2),--16
	( '2019-04-30 19:00', N'Малий зал', 1),--17
	( '2019-04-30 20:30', N'Малий зал', 2),--18
	------------------------------------------Травень
	( '2019-05-2 19:00', N'Малий зал', 1),--19
	( '2019-05-2 20:30', N'Малий зал', 2),--20
	( '2019-05-7 19:00', N'Малий зал', 1),--21
	( '2019-05-7 20:30', N'Малий зал', 2),--22
	( '2019-05-9 19:00', N'Малий зал', 1),--23
	( '2019-05-9 20:30', N'Малий зал', 2),--24
	( '2019-05-14 19:00', N'Малий зал', 1),--25
	( '2019-05-14 20:30', N'Малий зал', 2),--26
	( '2019-05-16 19:00', N'Малий зал', 1),--27
	( '2019-05-16 20:30', N'Малий зал', 2),--28
	( '2019-05-21 19:00', N'Малий зал', 1),--29
	( '2019-05-21 20:30', N'Малий зал', 2),--30
	( '2019-05-23 19:00', N'Малий зал', 1),--31
	( '2019-05-23 20:30', N'Малий зал', 2),--32
	( '2019-05-28 19:00', N'Малий зал', 1),--33
	( '2019-05-28 20:30', N'Малий зал', 2),--34
	( '2019-05-30 19:00', N'Малий зал', 1),--35
	( '2019-05-30 20:30', N'Малий зал', 2),--36
	------------------------------------------Червень
    ( '2019-06-4 19:00', N'Малий зал', 1),--37
    ( '2019-06-4 20:30', N'Малий зал', 2),--38
    ( '2019-06-6 19:00', N'Малий зал', 1),--39
    ( '2019-06-6 20:30', N'Малий зал', 2),--40
    ( '2019-06-11 19:00', N'Малий зал', 1),--41
    ( '2019-06-13 20:30', N'Малий зал', 2)--42
GO

-- Create the table in the specified schema
CREATE TABLE [dbo].[Attendances]
(
    [Id] INT NOT NULL IDENTITY(1,1), 
	[LessonId] INT NOT NULL,
    [PresentStudentId] INT NOT NULL,
	CONSTRAINT PK_AttendanceId PRIMARY KEY([Id]),
    CONSTRAINT FK_Lesson_Attendances FOREIGN KEY ([LessonId]) REFERENCES [dbo].[Lessons]([Id]),
    CONSTRAINT FK_User_Attendances FOREIGN KEY ([PresentStudentId]) REFERENCES [dbo].[Users]([Id])
);
GO

DECLARE @BeginnersLessonsCount INT = 1;
WHILE @BeginnersLessonsCount <= 9
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @BeginnersLessonsCount,  10),
  ( @BeginnersLessonsCount,  12),
  ( @BeginnersLessonsCount,  14),
  ( @BeginnersLessonsCount,  16),
  ( @BeginnersLessonsCount,  17);
  SET @BeginnersLessonsCount = @BeginnersLessonsCount + 2;
END;
GO

DECLARE @BeginnersLessonsCount INT = 11;
WHILE @BeginnersLessonsCount <= 17
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @BeginnersLessonsCount,  11),
  ( @BeginnersLessonsCount,  13),
  ( @BeginnersLessonsCount,  15),
  ( @BeginnersLessonsCount,  16),
  ( @BeginnersLessonsCount,  17);
  SET @BeginnersLessonsCount = @BeginnersLessonsCount + 2;
END;
GO

DECLARE @BeginnersLessonsCount INT = 19;
WHILE @BeginnersLessonsCount <= 27
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @BeginnersLessonsCount,  11),
  ( @BeginnersLessonsCount,  13),
  ( @BeginnersLessonsCount,  15),
  ( @BeginnersLessonsCount,  16),
  ( @BeginnersLessonsCount,  17);
  SET @BeginnersLessonsCount = @BeginnersLessonsCount + 2;
END;
GO

DECLARE @BeginnersLessonsCount INT = 29;
WHILE @BeginnersLessonsCount <= 35
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @BeginnersLessonsCount,  10),
  ( @BeginnersLessonsCount,  12),
  ( @BeginnersLessonsCount,  14),
  ( @BeginnersLessonsCount,  16),
  ( @BeginnersLessonsCount,  17);
  SET @BeginnersLessonsCount = @BeginnersLessonsCount + 2;
END;
GO

DECLARE @BeginnersLessonsCount INT = 37;
WHILE @BeginnersLessonsCount <= 41
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @BeginnersLessonsCount,  10),
  ( @BeginnersLessonsCount,  12),
  ( @BeginnersLessonsCount,  14),
  ( @BeginnersLessonsCount,  16),
  ( @BeginnersLessonsCount,  17);
  SET @BeginnersLessonsCount = @BeginnersLessonsCount + 2;
END;
GO

DECLARE @ImproversLessonsCount INT = 2;
WHILE @ImproversLessonsCount <= 10
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @ImproversLessonsCount,  18),
  ( @ImproversLessonsCount,  20),
  ( @ImproversLessonsCount,  22),
  ( @ImproversLessonsCount,  24),
  ( @ImproversLessonsCount,  25);
  SET @ImproversLessonsCount = @ImproversLessonsCount + 2;
END;
GO

DECLARE @ImproversLessonsCount INT = 12;
WHILE @ImproversLessonsCount <= 18
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @ImproversLessonsCount,  19),
  ( @ImproversLessonsCount,  21),
  ( @ImproversLessonsCount,  23),
  ( @ImproversLessonsCount,  24),
  ( @ImproversLessonsCount,  25);
  SET @ImproversLessonsCount = @ImproversLessonsCount + 2;
END;
GO

DECLARE @ImproversLessonsCount INT = 20;
WHILE @ImproversLessonsCount <= 28
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @ImproversLessonsCount,  19),
  ( @ImproversLessonsCount,  21),
  ( @ImproversLessonsCount,  23),
  ( @ImproversLessonsCount,  24),
  ( @ImproversLessonsCount,  25);
  SET @ImproversLessonsCount = @ImproversLessonsCount + 2;
END;
GO

DECLARE @ImproversLessonsCount INT = 30;
WHILE @ImproversLessonsCount <= 36
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @ImproversLessonsCount,  18),
  ( @ImproversLessonsCount,  20),
  ( @ImproversLessonsCount,  22),
  ( @ImproversLessonsCount,  24),
  ( @ImproversLessonsCount,  25);
  SET @ImproversLessonsCount = @ImproversLessonsCount + 2;
END;
GO

DECLARE @ImproversLessonsCount INT = 38;
WHILE @ImproversLessonsCount <= 42
BEGIN
	INSERT INTO [dbo].[Attendances]
    ([LessonId], [PresentStudentId])
VALUES  
  ( @ImproversLessonsCount,  18),
  ( @ImproversLessonsCount,  20),
  ( @ImproversLessonsCount,  22),
  ( @ImproversLessonsCount,  24),
  ( @ImproversLessonsCount,  25);
  SET @ImproversLessonsCount = @ImproversLessonsCount + 2;
END;
GO

-- Create a new table called '[Abonnements]' in schema '[dbo]'
CREATE TABLE [dbo].[Abonnements]
(
    [Id] INT NOT NULL IDENTITY(1,1),
    [AbonnementName] NVARCHAR(50) NOT NULL,
	[Price] DECIMAL NOT NULL,
	CONSTRAINT PK_AbonnementId PRIMARY KEY([Id])
);
GO

-- Insert rows into table 'Abonnements' in schema '[dbo]'
INSERT INTO [dbo].[Abonnements]
    ( [AbonnementName], [Price])
VALUES
  ( N'разовий одинарний', 60),
  ( N'разовий парний', 50),
  ( N'4-разовий одинарний', 200),
  ( N'4-разовий парний', 150),
  ( N'8-разовий одинарний', 300),
  ( N'8-разовий парний', 250),
  ( N'індивідуальний одинарний', 250),
  ( N'індивідуальний парний', 175)
GO

-- Create a new table called '[Payments]' in schema '[dbo]'
CREATE TABLE [dbo].[Payments]
(
    [Id] INT NOT NULL IDENTITY(1,1),
    [Date] DATETIME NOT NULL,
    [TotalSum] DECIMAL NOT NULL,
    [UserSenderId] INT NOT NULL,
    [UserReceiverId] INT NOT NULL,
    [AbonnementId] INT NOT NULL,
	CONSTRAINT PK_PaymentId PRIMARY KEY([Id]),
    CONSTRAINT FK_UserSender_Payment FOREIGN KEY ([UserSenderId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_UserReceiver_Payment FOREIGN KEY ([UserReceiverId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_Abonement_Payment FOREIGN KEY ([AbonnementId]) REFERENCES [dbo].[Abonnements]([Id])
);
GO

-- Insert rows into table 'Payments' in schema '[dbo]'
INSERT INTO [dbo].[Payments]
    ( [Date], [TotalSum], [UserSenderId], [UserReceiverId], [AbonnementId])
VALUES
  --2/04/19
  ( '2019-04-2 20:05', 50, 11, 1, 2),
  ( '2019-04-2 20:06', 60, 15, 1, 1),
  ( '2019-04-2 20:09', 60, 17, 1, 1),
  ( '2019-04-2 22:05', 50, 22, 1, 2),
  ( '2019-04-2 22:06', 60, 21, 1, 1),
  ( '2019-04-2 22:09', 60, 19, 1, 1),
  ( '2019-04-2 22:11', 200, 18, 1, 3),
  ( '2019-04-2 22:12', 200, 20, 1, 3),
  --4/04/19
  ( '2019-04-4 20:02', 200, 12, 1, 3),
  ( '2019-04-4 20:03', 150, 14, 1, 4),
  ( '2019-04-4 20:05', 200, 15, 1, 3),
  ( '2019-04-4 20:08', 300, 16, 1, 5),
  ( '2019-04-4 20:10', 200, 17, 1, 3),
  ( '2019-04-4 22:12', 300, 18, 1, 5),
  ( '2019-04-4 22:14', 200, 19, 1, 3),
  ( '2019-04-4 22:17', 150, 21, 1, 4),
  --9/04/19
  ( '2019-04-9 20:10', 200, 10, 1, 3),
  ( '2019-04-9 20:12', 150, 13, 1, 4),
  ( '2019-04-9 20:08', 300, 16, 1, 5),
  ( '2019-04-9 22:03', 250, 22, 1, 6)
GO
