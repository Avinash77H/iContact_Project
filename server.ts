import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const port: string | number | undefined = process.env.PORT || 9900;
const hostName: string = "127.0.0.1";
const app: Application = express();

const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;

// configure the routers
// import groupRouter from './router/groupRouter';
// app.use("/groups",groupRouter);

if(port){
  app.listen(Number(port),()=>{
    if(dbUrl && dbName){
      mongoose.connect(dbUrl, {
    dbName: dbName,
  }).then((dbResponse) => {
    console.log("Database connected");
  }).catch((err) => {
    console.log("Database not connected:", err);
    process.exit(0); // Force Stop express server
  });
    }

    console.log(`Express server is started at ${port}`)
  })
}



// app.get("/", (request: Request, response: Response) => {
//   response.status(200);
//   response.json({
//     msg: "Welcome to Express Server",
//   });
// });



// app.listen(Number(port), hostName, () => {
//   console.log(`Express Server is started at http://${hostName}:${port}`);
// });

