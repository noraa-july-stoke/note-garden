npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo:all

User
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

UserData
npx sequelize model:generate --name UserData --attributes userId:integer,username:string,email:string,firstName:string,lastName:string,avatarUrl:string,bgColor:string,bgImgUrl:string,defaultCollection:integer,defaultAlbum:integer

Notebook
npx sequelize model:generate --name Notebook --attributes authorId:integer,name:string

Collection
npx sequelize model:generate --name Collection --attributes authorId:integer,name:string

PhotoAlbum
npx sequelize model:generate --name PhotoAlbum --attributes authorId:integer,name:string

AudioAlbum
npx sequelize model:generate --name AudioAlbum --attributes authorId:integer,name:string,artist:string

TextNote
npx sequelize model:generate --name TextNote --attributes authorId:integer,caption:string,note:string

Photo
npx sequelize model:generate --name Photo --attributes authorId:integer,caption:string,url:string

Link
npx sequelize model:generate --name Link --attributes authorId:integer,caption:string,url:string

Audio
npx sequelize model:generate --name Audio --attributes authorId:integer,name:string,artist:string,url:string

Pal
npx sequelize model:generate --name Pal --attributes palOne:integer,palTwo:integer

Collaboration
npx sequelize model:generate --name Collaboration --attributes authorId:integer,collaboratorId:integer,noteId:integer,textNote:boolean

Post
npx sequelize model:generate --name Post --attributes authorId:integer, title:string

PostContent
npx sequelize model:generate --name PostContent --attributes postId:integer,contentType:string,content:string

CollectionContent
npx sequelize model:generate --name CollectionContent --attributes collectionId:integer,contentType:string

Reaction
npx sequelize model:generate --name Reaction --attributes userId:integer,authorId:integer,postId:integer,reactionType:string

Comment
npx sequelize model:generate --name Comment --attributes userId:integer,authorId:integer,postId:integer,comment:string

defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

References
npx sequelize-cli db:migrate | Run pending migrations
npx sequelize-cli db:migrate:schema:timestamps:add | Update migration table to have timestamps
npx sequelize-cli db:migrate:status | List the status of all migrations
npx sequelize-cli db:migrate:undo | Reverts a migration
npx sequelize-cli db:migrate:undo:all | Revert all migrations ran
npx sequelize-cli db:seed | Run specified seeder
npx sequelize-cli db:seed:undo | Deletes data from the database
npx sequelize-cli db:seed:all | Run every seeder
npx sequelize-cli db:seed:undo:all | Deletes data from the database
npx sequelize-cli db:create | Create database specified by configuration
npx sequelize-cli db:drop | Drop database specified by configuration
npx sequelize-cli init | Initializes project
npx sequelize-cli init:config | Initializes configuration
npx sequelize-cli init:migrations | Initializes migrations
npx sequelize-cli init:models | Initializes models
npx sequelize-cli init:seeders | Initializes seeders
npx sequelize-cli migration:generate | Generates a new migration file
npx sequelize-cli migration:create | Generates a new migration file
npx sequelize-cli model:generate | Generates a model and its migration
npx sequelize-cli model:create | Generates a model and its migration
npx sequelize-cli seed:generate | Generates a new seed file
npx sequelize-cli seed:create | Generates a new seed file
