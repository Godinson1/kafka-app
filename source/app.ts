import express from "express";
import { router as PostRouter } from "./producer/routes";
import { produce } from "./producer";

const app = express();
app.use(express.json());

app.use("/posts", PostRouter);

const PORT = process.env.PORT || 7000;

//For Test - Run current producer message at defined interval.
produce().catch(console.error);

app.listen(PORT, () => console.log(`Server running at Port: ${PORT}`));
