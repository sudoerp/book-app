const mongodb = require('mongodb')

const command = process.argv[2]
const bookName = process.argv[3]
const authorName = process.argv[4]

const {MongoClient, ObjectID} = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'book-app'

MongoClient.connect(connectionURL, { useNewUrlParser : true }, (error, client) => {
  if(error){
    console.log(error);
  }
  else{
    const db = client.db(databaseName)
    if(command == 'add'){
      db.collection('book').insertOne({
        _bookName : bookName,
        _authorName : authorName
      },(error, books) => {
        if(error){
          console.log(error);
        }
        else{
          console.log(books.ops);
        }
      })
    }
    
    else if(command == 'remove'){
      db.collection('book').deleteOne({ 
        _bookName : bookName
      }).then((data) => {
        if(data.deletedCount > 0){
        console.log(`Removed the book with name ${bookName}`)
        }
        else if(data.deletedCount == 0){
        console.log('Found nothing to delete')
        }
      }).catch((error) => {
        console.log(error);
      })
    }

    else if(command == 'read'){
      db.collection('book').findOne({
        _bookName : bookName
      }, (error, data) => {
        if(error){
          console.log(error);
        }
        else{
          if(data == null){
            console.log('Found nothing to show');
          }
          else{
          console.log(data);
          }
        }
      })
    }
  }
})