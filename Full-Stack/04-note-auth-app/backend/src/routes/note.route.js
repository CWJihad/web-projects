import express from "express"
import {createNote, deleteNote, getNotes, updateNote} from "../controllers/note.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const noteRouter = express.Router()

// all note routes are project - must be logged in
noteRouter.use(authMiddleware) // this the middleware of all note routes

noteRouter.post('/', createNote)
noteRouter.get('/', getNotes)
noteRouter.put('/:id', updateNote)
noteRouter.delete('/:id', deleteNote)

export default noteRouter