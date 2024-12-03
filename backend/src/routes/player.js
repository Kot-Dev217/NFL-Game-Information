import { Router } from 'express';
import axios from 'axios';

import Lineup from '../models/lineup';
import Player from '../models/player';

const router = Router();

router.get('/', async (req, res) => {
    return res.send({ state: "success" });
});

router.post('/test_save', async (req, res) => {
    for(let i = 0; i < req.body.players.length; i++) {
        await Player.create(req.body.players[i]);
    }
    return res.send({ players: "success" });
});

router.post('/create_player', async (req, res) => {
    await Player.create(req.body.player);
    return res.send({ players: "success" });
});

router.delete('/remove_player', async (req, res) => {
    await Player.deleteOne({ id: req.body.id });
    return res.send({ state: "success" });
});

router.delete('/delete_optimize', async (req, res) => {
    await Lineup.deleteMany({ team: 'Team A' });
    await Lineup.deleteMany({ team: 'Team B' });
    return res.send({ state: "success" });
});


router.post('/create_lineup', async (req, res) => {
    for (let i = 0; i< 6; i++) {
        await Lineup.create(req.body.lineup);
    }
    return res.send({ state: "success" });
});

router.post('/create_optimize', async (req, res) => {
    let data = req.body.lineups.lineup;
    for(let j = 0; j < data.length; j ++) {
        await Lineup.create({
            team: data[j].team,
            name: data[j].name,
            id: data[j].id,
            position: data[j].position,
            salaryCaptain: data[j].salaryCaptain,
            salaryFlex: data[j].salaryFlex,
            totalSalary: req.body.lineups.totalSalary,
        });
    }
    return res.send({ state: "success" });
});


router.post('/update_lineup', async (req, res) => {
    let data = req.body.lineup.lineup;
    for(let j = 0; j < data.length; j ++) {
        const filter = { _id: data[j]._id };
        const update = { $set: { 
            team: data[j].team,
            name: data[j].name,
            id: data[j].id,
            position: data[j].position,
            salaryCaptain: data[j].salaryCaptain,
            salaryFlex: data[j].salaryFlex,
            totalSalary: req.body.lineup.totalSalary,
        } };
        await Lineup.updateOne(filter, update);
    }
    return res.send({ state: "success" });
});

router.post('/update_optimize', async (req, res) => {
    let data = req.body.lineups.lineup;
    for(let j = 0; j < data.length; j ++) {
        const filter = { _id: data[j]._id };
        const update = { $set: { 
            team: data[j].team,
            name: data[j].name,
            id: data[j].id,
            position: data[j].position,
            salaryCaptain: data[j].salaryCaptain,
            salaryFlex: data[j].salaryFlex,
            totalSalary: req.body.lineups.totalSalary,
        } };
        await Lineup.updateMany(filter, update);
    }
    return res.send({ state: "success" });
});

router.delete('/remove_lineup', async (req, res) => {
    for (let i = 0; i < req.body.lineup.length; i ++) {
        await Lineup.deleteOne({ _id: req.body.lineup[i]._id });
    }
    return res.send({ state: "success" });
});

router.get('/get_players', async (req, res) => {
    let players = await Player.find();
    let lineups = await Lineup.find();
    let temp = [];
    let temp_lineups = [];
    for (let i = 0; i < lineups.length; i ++) {
        temp.push(lineups[i])
        if ((i+1)%6 === 0) {
            temp_lineups.push({
                lineup: temp,
                totalSalary: lineups[i].totalSalary,
            })
            temp = [];
        }
    }
    return res.send({ players: players, lineups: temp_lineups });
});

export default router;
