import express from "express";
import { create, deleteUser, getAllData, getOne, update } from "../Controller/userController.js";



const route=express.Router()


route.post("/create",create)
route.get("/data",getAllData)
route.get("/data/:id",getOne)
route.put("/update/:id",update)
route.delete("/delete/:id",deleteUser)

export default route;