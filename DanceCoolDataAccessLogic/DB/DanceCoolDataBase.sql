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
IF OBJECT_ID('[dbo].[Abonements]', 'U') IS NOT NULL
DROP TABLE [dbo].[Abonements]
GO
IF OBJECT_ID('[dbo].[Lessons]', 'U') IS NOT NULL
DROP TABLE [dbo].[Lessons]
GO
IF OBJECT_ID('[dbo].[LessonTypes]', 'U') IS NOT NULL
DROP TABLE [dbo].[LessonTypes]
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
IF OBJECT_ID('[dbo].[UserRoles]', 'U') IS NOT NULL
DROP TABLE [dbo].[UserRoles]
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
    [FirstName] NVARCHAR(512) NOT NULL,
    [LastName] NVARCHAR(512) NOT NULL,
    [PhoneNumber] VARCHAR(17) NULL
);
GO

-- Insert mentors into table 'Users' in schema '[dbo]'
INSERT INTO [dbo].[Users]
    ( [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( N'Оксана', N'Андрущенко', '+380104995985' ), --1
    ( N'Мар''ян', N'Пелюх', '+380994543613' ), --2
    ( N'Мар''яна', N'Луцишин', '+380816285545' ), --3
    ( N'Олександр', N'Січкар', '+380813655545' ), --4
    ( N'Роман', N'Пахолків', '+380760155782' ),--5
    ( N'Мар''яна', N'Штокало', '+380774155782' ),--6
    ( N'Ігор', N'Коваль', '+380837451111' ),--7
    ( N'Анна', N'Данчук', '+380792884834' ),--8
    ( N'Ольга', N'Коробчук', '+380792884834' )--9
GO

-- Insert Students into table 'User' in schema '[dbo]'
INSERT INTO [dbo].[Users]
    ( [FirstName], [LastName], [PhoneNumber] )
VALUES
    ( N'Каріна', N'Кравченко', '+380635595952' ),--10
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
    ( N'Лисичка', N'Сестричка', '+380634119407' )--31
GO

-- Create a new table called '[UserCredentials]' in schema '[dbo]'
CREATE TABLE [dbo].[UserCredentials]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [Email] NVARCHAR(254) NOT NULL,
    [Password] TEXT NOT NULL,
    CONSTRAINT FK_User_UserCredentials FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id])
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

-- Create a new table called '[UserRoles]' in schema '[dbo]'
CREATE TABLE [dbo].[UserRoles]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [UserId] INT NOT NULL,
    [RoleId] INT NOT NULL,
    CONSTRAINT FK_User_UserRole FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_Role_UserRole FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id])
);
GO

-- Insert rows into table 'UserRoles' in schema '[dbo]'
declare @mentorCount INT = 1;

WHILE @mentorCount <= 9
BEGIN
    INSERT INTO [dbo].[UserRoles]
        ( UserId, RoleId )
    VALUES
        ( @mentorCount, 2 );
    SET @mentorCount = @mentorCount + 1;
END;
GO

declare @studentCount INT = 10;

WHILE @studentCount <= 31
BEGIN
    INSERT INTO [dbo].[UserRoles]
        ( UserId, RoleId )
    VALUES
        ( @studentCount, 1 )
    SET @studentCount = @studentCount + 1;
END;
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

-- Create a new table called '[LessonTypes]' in schema '[dbo]'
CREATE TABLE [dbo].[LessonTypes]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [LessonTypeName] NVARCHAR(50) NOT NULL
);
GO

-- Insert rows into table 'LessonTypes' in schema '[dbo]'
INSERT INTO [dbo].[LessonTypes]
    ( LessonTypeName )
VALUES
    ( N'Індивідуальне' ),
    ( N'Парне'),
    ( N'Групове' )
GO

-- Create a new table called '[Lessons]' in schema '[dbo]'
CREATE TABLE [dbo].[Lessons]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [Date] DATETIME NOT NULL,
    [Room] INT NOT NULL,
    [LessonTypeId] INT NULL,
    [GroupId] INT NULL,
    CONSTRAINT FK_LessonType_Lesson FOREIGN KEY ([LessonTypeId]) REFERENCES [dbo].[LessonTypes]([Id]),
    CONSTRAINT FK_Group_Lesson FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups]([Id])
);
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

-- Create a new table called '[Abonements]' in schema '[dbo]'
CREATE TABLE [dbo].[Abonements]
(
    [Id] INT NOT NULL PRIMARY KEY,
    [AbonementName] NVARCHAR(50) NOT NULL
);
GO

-- Create a new table called '[Payments]' in schema '[dbo]'
CREATE TABLE [dbo].[Payments]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    [Date] DATETIME NOT NULL,
    [TotalSum] MONEY NOT NULL,
    [UserSenderId] INT NOT NULL,
    [UserReceiverId] INT NOT NULL,
    [AbonementId] INT NOT NULL,
    CONSTRAINT FK_UserSender_Payment FOREIGN KEY ([UserSenderId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_UserReceiver_Payment FOREIGN KEY ([UserReceiverId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT FK_Abonement_Payment FOREIGN KEY ([AbonementId]) REFERENCES [dbo].[Abonements]([Id])
);
GO
