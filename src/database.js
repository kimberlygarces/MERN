const mongoose = require('mongoose');
 //mongoose.connect('mongodb+srv://adminkim:OSFvQfVJOr2fBg10@cluster0.clwur.mongodb.net/aprendiendo-db',
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false/tareas',

 {useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false

})
.then(db => console.log('DB is conected'))
.catch(err => console.error(err));

