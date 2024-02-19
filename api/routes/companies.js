const router = require("express").Router();
const Company = require("../model/Company");

router.get('/companies', async (req, res) => {
    const companies = await Company.find();
    res.status(200).json(companies);
});

router.post('/companies', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.status(200).json(company);
        // console.log("====req.params.id====:>>>"+JSON.stringify(req.params.id))
        // console.log("====req.body====:>>>"+JSON.stringify(req.body))
        // console.log("====company====:>>>"+JSON.stringify(company))
    } catch (err) {
        res.status(500).json(err)
        // console.log("=====error====>" + err)
    }
});

router.delete('/companies/:id', async (req, res) => {
    try {
        await Company.deleteOne({ id: req.params.id });
        res.status(200).send('Company deleted');
    } catch (err) {
        res.status(500).json(err)
        // console.log("=====error====>" + err)
    }
});

module.exports = router;