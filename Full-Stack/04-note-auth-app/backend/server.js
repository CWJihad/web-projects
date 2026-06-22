import app from './src/app.js'
import connectDB from './src/config/database.js'
import {PORT} from './src/config/config.js'

connectDB()

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
    
})