const router = require("express").Router();
const Demand = require("../model/Demand");

router.get('/demands', async (req, res) => {
    const demands = await Demand.find();
    res.status(200).json(demands);
});

router.post('/demands', async (req, res) => {
    try {
        const demand = new Demand(req.body);
        await demand.save();
        res.status(200).json(demand);
    } catch (err) {
        console.error("Error creating company:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/demands/:id', async (req, res) => {
    try {
        const demand = await Demand.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.status(200).json(demand);
        // console.log("====req.params.id====:>>>"+JSON.stringify(req.params.id))
        // console.log("====req.body====:>>>"+JSON.stringify(req.body))
        // console.log("====demand====:>>>"+JSON.stringify(demand))
    } catch (err) {
        console.error("Error updating company:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/demands/:id', async (req, res) => {
    try {
        await Demand.deleteOne({ id: req.params.id });
        res.status(200).send('Demand deleted');
    } catch (err) {
        console.error("Error deleting company:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
