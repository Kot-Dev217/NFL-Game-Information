import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    team: { type: String },
    name: { type: String },
    id: { type: String },
    position: { type: String },
    salaryCaptain: { type: Number },
    salaryFlex: { type: Number },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
