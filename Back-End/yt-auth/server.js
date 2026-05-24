// two major work will be in here 
// first connect database and second start or run server
import app from './src/app.js'
import connectDB from './src/config/database.js'

connectDB()

app.listen(3000, () => {
    console.log('server is running on: http://localhost:3000 ');
})