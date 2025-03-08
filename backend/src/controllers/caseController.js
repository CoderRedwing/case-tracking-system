const getFilteredCases = require('../services/caseService');

const getCases = async (req, res) => { 
    try {
        const cases = await getFilteredCases(req.query);

        if (!cases) {
            return res.status(500).json({ success: false, message: "Error fetching cases" });
        }
        
        res.status(200).json({ success: true, data: cases });
    } catch (error) {
        console.error("server error ", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


module.exports = getCases;