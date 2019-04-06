-- Sonia's server DESKTOP-MSSKMVD\SQLEXPRESS
-- Create a new database called 'DanceCool'
-- Connect to the 'master' database to run this snippet


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
4. Level
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

IF OBJECT_ID('[dbo].[Payment]', 'U') IS NOT NULL
DROP TABLE [dbo].[Payment]
GO
IF OBJECT_ID('[dbo].[Abonement]', 'U') IS NOT NULL
DROP TABLE [dbo].[Abonement]
GO
IF OBJECT_ID('[dbo].[Lesson]', 'U') IS NOT NULL
DROP TABLE [dbo].[Lesson]
GO
IF OBJECT_ID('[dbo].[LessonType]', 'U') IS NOT NULL
DROP TABLE [dbo].[LessonType]
GO
IF OBJECT_ID('[dbo].[UserGroup]', 'U') IS NOT NULL
DROP TABLE [dbo].[UserGroup]
GO
IF OBJECT_ID('[dbo].[Group]', 'U') IS NOT NULL
DROP TABLE [dbo].[Group]
GO
IF OBJECT_ID('[dbo].[DanceDirection]', 'U') IS NOT NULL
DROP TABLE [dbo].[DanceDirection]
GO
IF OBJECT_ID('[dbo].[SkillLevel]', 'U') IS NOT NULL
DROP TABLE [dbo].[SkillLevel]
GO
IF OBJECT_ID('[dbo].[UserCredentials]', 'U') IS NOT NULL
DROP TABLE [dbo].[UserCredentials]
GO
IF OBJECT_ID('[dbo].[UserRole]', 'U') IS NOT NULL
DROP TABLE [dbo].[UserRole]
GO
IF OBJECT_ID('[dbo].[User]', 'U') IS NOT NULL
DROP TABLE [dbo].[User]
GO
IF OBJECT_ID('[dbo].[Role]', 'U') IS NOT NULL
DROP TABLE [dbo].[Role]
GO

-- Create a new table called '[Role]' in schema '[dbo]'
CREATE TABLE [dbo].[Role]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    -- Primary Key column
    [RoleName] NVARCHAR(50) NOT NULL
);
GO

-- Insert rows into table 'Role' in schema '[dbo]'
INSERT INTO [dbo].[Role]
    ( [RoleName] )
VALUES
    ('Student'),
    ('Mentor'),
    ('Admin') 
GO

-- Create a new table called '[Users]' in schema '[dbo]'
CREATE TABLE [dbo].[User]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
    -- Primary Key column
    [FirstName] NVARCHAR(512) NOT NULL,
    [LastName] NVARCHAR(512) NOT NULL,
    [PhoneNumber] VARCHAR(17) NULL
);
GO

-- Insert mentors into table 'User' in schema '[dbo]'
INSERT INTO [dbo].[User]
    ( [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( N'Оксана', N'Андрущенко', '+380104995985' ),
    ( N'Мар''ян', N'Пелюх', '+380994543613' ),
    ( N'Мар''яна', N'Луцишин', '+380816285545' ),
    ( N'Роман', N'Пахолків', '+380760155782' ),
    ( N'Ігор', N'Коваль', '+380837451111' ),
    ( N'Анна', N'Данчук', '+380792884834' )
GO

-- Insert Students into table 'User' in schema '[dbo]'
INSERT INTO [dbo].[User]
    ( [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( N'Каріна', N'Кравченко', '+380635595952' ),--7
    ( N'Юрій', N'Чабаренко', '+380730401631' ),
    ( N'Любов', N'Горбова', '+380671793382' ),
    ( N'Оксана', N'Котик', '+380979071237' ),
    ( N'Уляна', N'Коваль', '+380988737362' ),
    ( N'Дзвонемира', N'Довгалюк', '+380680356776' ),
    ( N'Артем', N'Монастирев', '+380934627446' ),
    ( N'Анна-Тереза', N'Бенко', '+380504627446' ),
    ( N'Оксана', N'Кость', '+380550933568' ),
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
    ( N'Лисичка', N'Сестричка', '+380634119407' )--28
GO

-- Create a new table called '[UserCredentials]' in schema '[dbo]'
CREATE TABLE [dbo].[UserCredentials]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [Email] NVARCHAR(254) NOT NULL,
    [Password] TEXT NOT NULL,
    CONSTRAINT FK_User_UserCredentials FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([Id])
);
GO

-- Create a new table called '[UserRole]' in schema '[dbo]'
CREATE TABLE [dbo].[UserRole]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    -- Primary Key column
    [UserId] INT NOT NULL,
    [RoleId] INT NOT NULL,
    CONSTRAINT FK_User_UserRole FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([Id]),
    CONSTRAINT FK_Role_UserRole FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role]([Id])
);
GO

-- Insert rows into table 'UserRole' in schema '[dbo]'
declare @mentorCount INT = 1;

WHILE @mentorCount <= 6
BEGIN
    INSERT INTO [dbo].[UserRole]
        ( UserId, RoleId )
    VALUES
        ( @mentorCount, 2 );
    SET @mentorCount = @mentorCount + 1;
END;
GO

declare @studentCount INT = 7;

WHILE @studentCount <= 28
BEGIN
    INSERT INTO [dbo].[UserRole]
        ( UserId, RoleId )
    VALUES
        ( @studentCount, 1 )
    SET @studentCount = @studentCount + 1;
END;
GO

-- Create a new table called '[DanceDirection]' in schema '[dbo]'
CREATE TABLE [dbo].[DanceDirection]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
    [Name] NVARCHAR(50) NOT NULL
);
GO

-- Insert rows into table 'DanceDirection' in schema '[dbo]'
INSERT INTO [dbo].[DanceDirection]
    ( Name)
VALUES
    ( 'Salsa LA' ),
    ( 'Salsa Casino' ),
    ( 'Bachata'),
    ( 'Latina Lady Solo')
GO

-- Create a new table called '[SkillLevel]' in schema '[dbo]'
CREATE TABLE [dbo].[SkillLevel]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
    -- Primary Key column
    [Name] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(1024) NOT NULL
);
GO

-- Insert rows into table 'SkillLevel' in schema '[dbo]'
INSERT INTO [dbo].[SkillLevel]
    ([Name], [Description])
VALUES
    ( 'New Group', N'Групи з "нуля", для тих, хто робить перші кроки в танці.'),
    ( 'Beginners', N'Група займається до 6-ти місяців.'),
    ( 'Improvers', N'Група займається від 6-ти місяців до року.'),
    ( 'Intermediate', N'Група займається від року до півтора.'),
    ( 'Advanced', N'Група займається від півтора року і довше.')
GO

-- Create a new table called '[Group]' in schema '[dbo]'
CREATE TABLE [dbo].[Group]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [DirectionId] INT NOT NULL,
    [LevelId] INT NOT NULL,
    CONSTRAINT FK_Direction_Group FOREIGN KEY ([DirectionId]) REFERENCES [dbo].[DanceDirection]([Id]),
    CONSTRAINT FK_Level_Group FOREIGN KEY ([LevelId]) REFERENCES [dbo].[SkillLevel]([Id])
);
GO

-- Insert rows into table 'Group' in schema '[dbo]'
INSERT INTO [dbo].[Group]
(DirectionId, LevelId )
VALUES
(1,2),
(2,1),
(3,3)
GO

-- Create a new table called '[UserGroup]' in schema '[dbo]'
CREATE TABLE [dbo].[UserGroup]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [GroupId] INT NOT NULL,
    CONSTRAINT FK_User_UserGroup FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([Id]),
    CONSTRAINT FK_Group_UserGroup FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Group]([Id])
);
GO

INSERT INTO [dbo].[UserGroup]
(UserId, GroupId)
VALUES (1,1),(2,1)
GO

DECLARE @salsaLaCount INT = 7;

WHILE @salsaLaCount <= 14
BEGIN
    INSERT INTO [dbo].[UserGroup]
        ( UserId, GroupId )
    VALUES
        ( @salsaLaCount, 1 );
    SET @salsaLaCount = @salsaLaCount + 1;
END;
GO


INSERT INTO [dbo].[UserGroup]
(UserId, GroupId)
VALUES (3,2),(4,2)
GO

DECLARE @salsaLaCount INT = 15;

WHILE @salsaLaCount <= 21
BEGIN
    INSERT INTO [dbo].[UserGroup]
        ( UserId, GroupId )
    VALUES
        ( @salsaLaCount, 2 );
    SET @salsaLaCount = @salsaLaCount + 1;
END;
GO

INSERT INTO [dbo].[UserGroup]
(UserId, GroupId)
VALUES (5,3),(6,3)
GO

DECLARE @salsaLaCount INT = 22;

WHILE @salsaLaCount <= 28
BEGIN
    INSERT INTO [dbo].[UserGroup]
        ( UserId, GroupId )
    VALUES
        ( @salsaLaCount, 3 );
    SET @salsaLaCount = @salsaLaCount + 1;
END;
GO

-- Create a new table called '[LessonType]' in schema '[dbo]'
CREATE TABLE [dbo].[LessonType]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [LessonTypeName] NVARCHAR(50) NOT NULL
);
GO

-- Create a new table called '[Lesson]' in schema '[dbo]'
CREATE TABLE [dbo].[Lesson]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [Date] DATETIME NOT NULL,
    [Room] INT NOT NULL,
    [LessonTypeId] INT NOT NULL,
    [GroupId] INT NULL,
    CONSTRAINT FK_LessonType_Lesson FOREIGN KEY ([LessonTypeId]) REFERENCES [dbo].[Lesson]([Id]),
    CONSTRAINT FK_Group_Lesson FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Lesson]([Id])
);
GO

-- Create a new table called '[Abonement]' in schema '[dbo]'
CREATE TABLE [dbo].[Abonement]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [AbonementName] NVARCHAR(50) NOT NULL
);
GO

-- Create a new table called '[Payment]' in schema '[dbo]'
CREATE TABLE [dbo].[Payment]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [Date] DATETIME NOT NULL,
    [TotalSum] MONEY NOT NULL,
    [UserSenderId] INT NOT NULL,
    [UserReceiverId] INT NOT NULL,
    [AbonementId] INT NOT NULL,
    CONSTRAINT FK_UserSender_Payment FOREIGN KEY ([UserSenderId]) REFERENCES [dbo].[Payment]([Id]),
    CONSTRAINT FK_UserReceiver_Payment FOREIGN KEY ([UserReceiverId]) REFERENCES [dbo].[Payment]([Id])
);
GO
