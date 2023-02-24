npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo:all


User Model:
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

NoteBook Model
npx sequelize model:generate --name Notebook --attributes authorId:integer,name:string

TextNote
npx sequelize model:generate --name TextNote --attributes authorId:integer,name:string,note:string

ImageNote
npx sequelize model:generate --name ImageNote --attributes authorId:integer,name:string,url:string


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
