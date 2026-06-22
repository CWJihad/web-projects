import noteModel from "../models/note.model.js";

const createNote = async (req, res) => {
    try {

        const {title, content} = req.body
        
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required!"
            })
        }

        const note = await noteModel.create({
            title,
            content,
            user: req.user.id // from authMiddleware
        })
        
        return res.status(201).json({
            success: true,
            message: "Note create successfully",
            note
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getNotes = async (req, res) => {
    try {
        
        const notes = await noteModel.find({ user: req.user.id }).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            notes
        })
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const updateNote = async (req, res) => {
    try {

        const { id } = req.params
        const { title, content } = req.body

        const note = await noteModel.findOne({ _id: id, user: req.user.id })

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found!"
            })
        }

        note.title = title || note.title
        note.content = content || note.content
        await note.save()

        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        })
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        
        const {id} = req.params

        const note = await noteModel.findOne({_id: id, user: req.user.id})

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found!"
            })
        }
        
        await note.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        })
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}