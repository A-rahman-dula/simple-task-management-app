import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import taskRouter from './routes/TaskRoute.js';
import cors from 'cors';

const app = express();

//Middlewear
app.use((req, res, next) => {
  console.log('path ' + req.path + ' method ' + req.method);
  next();
});

app.use(express.json());

app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

//DB connector
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        'DB connected successfully and listening to ' + process.env.PORT,
      );
    });
  })
  .catch((error) => console.error(error));

app.use('/api/tasks', taskRouter);
