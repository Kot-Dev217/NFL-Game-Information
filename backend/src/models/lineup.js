import mongoose from 'mongoose';

const lineupSchema = new mongoose.Schema({
    team: { type: String },
    name: { type: String },
    id: { type: String },
    position: { type: String },
    salaryCaptain: { type: Number },
    salaryFlex: { type: Number },
    totalSalary: { type: Number },
});

const Lineup = mongoose.model('Lineup', lineupSchema);

export default Lineup;
