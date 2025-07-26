import Notes from "../module/scema.js"
//getAllRoutes
export async function getRoutes(req, res) {
    try {
        const data = await Notes.find().sort({ createdAt: 1 })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'No routes found' })
    }
}
//getsingleRoutes
export async function getSingleRoutes(req, res) {
    try {
        const data = await Notes.findById(req.params.id)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' })
    }
}
// routes/notesRouter.js or wherever


//put/addRoutes
export async function addRoutes(req, res) {
    try {
        const { title, content } = req.body;
        const newNotes = new Notes({ title, content });
        await newNotes.save();
        res.status(201).json(newNotes, { message: 'Note added successfully' });
    } catch (error) {
        console.error('❌ Error adding note:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}
//updatedRoutes
export async function updatedRoutes(req, res) {
    try {
        const updated = await Notes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        return res.status(200).json(updated, "Note updated successfully")
    } catch (error) {
        console.error('❌ Error updating note:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}
//deltedRoutes
export async function deleteRoutes(req, res) {
    try {
        const deleted = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).json(deleted, "Note deleted successfully")
    } catch (error) {
        console.error('❌ Error deleting note:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}
