## USERS

| Column Name | Data Type | Constraints | Relationships |
|-------------|-----------|-------------|---------------|
| id | INTEGER | Primary Key, Unique | - |
| username | STRING(30) | Not Null, Unique | - |
| defaultNotebookId | INTEGER | Nullable | - |
| defaultImageNotebookId | INTEGER | Nullable | - |
| email | STRING(256) | Not Null, Unique | - |
| hashedPassword | STRING.BINARY | Not Null | - |
| createdAt | DATE | Not Null, Default Value: CURRENT_TIMESTAMP | - |
| updatedAt | DATE | Not Null, Default Value: CURRENT_TIMESTAMP | - |




## NOTEBOOKS

| Column Name | Data Type | Nullable? | Default Value | Constraints |
|-------------|-----------|-----------|---------------|-------------|
| id | INTEGER | No | auto-increment | Primary key, unique |
| authorId | INTEGER | No | - | - |
| name | STRING | No | - | - |
| createdAt | DATE | No | CURRENT_TIMESTAMP | - |
| updatedAt | DATE | No | CURRENT_TIMESTAMP | - |




## IMAGENOTES

| Column    | Type       | Allow Null | Default            |
|-----------|------------|-----------|--------------------|
| id        | INTEGER    | no        | autoincrement, primary key |
| authorId  | INTEGER    | yes       |                    |
| name      | STRING     | yes       |                    |
| createdAt | DATE       | no        | CURRENT_TIMESTAMP  |
| updatedAt | DATE       | no        | CURRENT_TIMESTAMP  |




## TEXTNOTES

| Column      | Type          | Attributes       |
| ----------- | -------------| ---------------- |
| id          | INTEGER      | Primary Key, Not Null, Auto Increment, Unique |
| authorId    | INTEGER      | Not Null         |
| notebookId  | INTEGER      |                  |
| name        | STRING       | Not Null         |
| note        | STRING       | Not Null         |
| createdAt   | DATE         | Not Null, Default: CURRENT_TIMESTAMP |
| updatedAt   | DATE         | Not Null, Default: CURRENT_TIMESTAMP |




## IMAGENOTES

| Column | Type | Attributes |
| ------ | ---- | ---------- |
| id | INTEGER | Primary key, auto-increment |
| authorId | INTEGER | Not null |
| notebookId | INTEGER | |
| name | STRING | Not null |
| url | STRING | Not null |
| createdAt | DATE | Not null, default value: CURRENT_TIMESTAMP |
| updatedAt | DATE | Not null, default value: CURRENT_TIMESTAMP |




## PALS
| Column | Type | Attributes |
| --- | --- | --- |
| id | INTEGER | Primary key, auto-increment |
| palOne | INTEGER | Not null, foreign key (references Users.id) |
| palTwo | INTEGER | Not null, foreign key (references Users.id) |
| createdAt | DATE | Not null, default value is the current timestamp |
| updatedAt | DATE | Not null, default value is the current timestamp |




## COLLABORATIONS

| Column Name | Data Type | Attributes |
|-------------|-----------|------------|
| id          | INTEGER   | PRIMARY KEY, AUTOINCREMENT, NOT NULL |
| authorId    | INTEGER   | NOT NULL, REFERENCES Users(id), ON UPDATE CASCADE, ON DELETE CASCADE |
| collaboratorId | INTEGER | NOT NULL, REFERENCES Users(id), ON UPDATE CASCADE, ON DELETE CASCADE |
| noteId      | INTEGER   | NOT NULL, REFERENCES TextNotes(id), ON UPDATE CASCADE, ON DELETE CASCADE |
| textNote    | BOOLEAN   | NOT NULL |
| createdAt   | DATE      | NOT NULL, DEFAULT: CURRENT_TIMESTAMP |
| updatedAt   | DATE      | NOT NULL, DEFAULT: CURRENT_TIMESTAMP |




## POSTS
| Column Name | Data Type | Attributes | Description |
|-------------|-----------|------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Unique identifier for the post |
| authorId | INTEGER | REFERENCES Users(id), ON UPDATE CASCADE, ON DELETE CASCADE, NOT NULL | The ID of the user who created the post |
| noteId | INTEGER | REFERENCES TextNotes(id), ON UPDATE CASCADE, ON DELETE CASCADE, NOT NULL | The ID of the text note associated with the post |
| textNote | BOOLEAN | NOT NULL, DEFAULT: false | A flag indicating if the post is a text note |
| caption | STRING | NOT NULL | The caption for the post |
| createdAt | DATE | NOT NULL, DEFAULT: CURRENT_TIMESTAMP | The date and time when the post was created |
| updatedAt | DATE | NOT NULL, DEFAULT: CURRENT_TIMESTAMP | The date and time when the post was last updated |





## REACTIONS
| Column Name | Data Type | Constraints |
|-------------|----------|-------------|
| id          | INTEGER  | PRIMARY KEY, auto increment, NOT NULL |
| userId      | INTEGER  | REFERENCES Users(id), NOT NULL, onUpdate: CASCADE, onDelete: CASCADE |
| authorId    | INTEGER  | REFERENCES Users(id), NOT NULL, onUpdate: CASCADE, onDelete: CASCADE |
| postId      | INTEGER  | REFERENCES Posts(id), NOT NULL, onUpdate: CASCADE, onDelete: CASCADE |
| reactionType| STRING   | NOT NULL |
| createdAt   | DATE     | NOT NULL, default: CURRENT_TIMESTAMP |
| updatedAt   | DATE     | NOT NULL, default: CURRENT_TIMESTAMP |




## COMMENTS

| Column Name       | Data Type  | Nullable | Primary Key | Foreign Key | References | Description               |
|-------------------|------------|----------|-------------|-------------|------------|---------------------------|
| id                | INTEGER    | NO       | YES         |             |            | Comment ID (auto-increment)|
| authorId          | INTEGER    | NO       |             | Users.id    |            | ID of the user who wrote the comment |
| postId            | INTEGER    | NO       |             | Posts.id    |            | ID of the post the comment is on |
| parentCommentId   | INTEGER    | YES      |             | Comments.id | id         | ID of the parent comment, if this comment is a reply to another comment |
| content           | STRING     | NO       |             |             |            | Content of the comment     |
| createdAt         | DATE       | NO       |             |             |            | Timestamp of when the comment was created |
| updatedAt         | DATE       | NO       |             |             |            | Timestamp of when the comment was last updated |
