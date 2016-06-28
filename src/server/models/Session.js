const mongoose = require('mongoose')

const Session = {
    _id: { type: String, required: true, unique: true, select: true },
    data: { type: Object }
}

export default new mongoose.Schema(Session)

