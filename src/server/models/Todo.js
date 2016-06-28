const mongoose = require('mongoose')

const Movie = {
    text: String,
    image: String
}

export default new mongoose.Schema(Movie)
