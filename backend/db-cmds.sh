npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo:all


User Model:
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

NoteBook Model
npx sequelize model:generate --name Notebook --attributes authorId:integer,name:string

TextNote
npx sequelize model:generate --name TextNote --attributes authorId:integer,name:string,note:string
