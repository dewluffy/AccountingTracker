import express from 'express';
import morgan from 'morgan';
import cors  from 'cors';

const app = express()
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
