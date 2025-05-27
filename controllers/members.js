const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Members']
    const result = await mongodb.getDatabase().db('project2').collection('members').find();
    result.toArray().then((members) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(members);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Members']
    const itemId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('members').find({ _id:itemId });
    result.toArray().then((members) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(members[0]);
    });
}

const createMember = async(req, res) => {
    //#swagger.tags=['Members']
    const member = {
        email: req.body.email,
        birthday: req.body.birthday,
        ward: req.body.ward,        
        stake: req.body.stake,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        memberNum: req.body.memberNum
    };

    const response = await mongodb.getDatabase().db('project2').collection('members').insertOne(member);

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while creating the member.')
    };
}

const updateMember = async(req, res) => {
    //#swagger.tags=['Members']
    const memberId = new ObjectId(req.params.id);
    const member = {
        email: req.body.email,
        birthday: req.body.birthday,
        ward: req.body.ward,        
        stake: req.body.stake,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        memberNum: req.body.memberNum
    };

    const response = await mongodb.getDatabase().db('project2').collection('members').replaceOne({_id: memberId}, member);

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while updating the member.')
    };
}

const deleteMember = async(req, res) => {
    //#swagger.tags=['Members']
    const memberId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('members').deleteOne({_id: memberId});

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some Error occurred while deleting the member.')
    };
}

module.exports = {
    getAll,
    getSingle,
    createMember,
    updateMember,
    deleteMember
};