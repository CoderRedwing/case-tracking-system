require("dotenv").config();
const axios = require("axios");


const resourceIds = {
    1999: "94c8096e-6996-4b5d-9a00-11a80812822f",
    2000: "8f632458-cc50-43d6-ab4e-81a04c42ad37",
    2002: "e97b5d89-fe06-44d2-b507-89d56fb530b3",
    2006: "61d7fa90-6ac0-40b2-a99d-c5b9bd404252",
    2011: "fb451fb0-e191-4fd0-83eb-1b0a96b51fd6",
    2013: "af65a0c2-16c9-4b69-b753-f555c74b5629",
    2014: "74570e5d-f0a5-429a-b4d2-c9918764947e",
    2015: "e8804546-aa1a-4a64-895c-719f577f60c2",
    2016: "df0cdd2d-36c7-46ff-bc87-5efdc9a39ddf",
    2017: "a385dbe5-b2dd-4f58-8ce7-437e7ff3a92b",
    2018: "64c77e18-f2c9-4e57-a3e8-c7d68a7580ab",
    2019: "61b8834f-3c88-4b84-9c25-a458d3b61501",
    2020: "8fd1d30b-a511-47d9-b0c8-0eb17972a0da",
    2021: "809039d0-00c0-4898-ad59-a10f334e979d",
    2022: "289749b0-bf6b-49f8-bea5-dacd007d7b26",
    2024: "1ef6fac8-8d4a-4747-bd14-5a3f8ab6d176",
};

const API_KEY = process.env.API_KEY; 
const BASE_URL = "https://api.data.gov.in/resource/";
const COMMON_PARAMS = `?api-key=${API_KEY}&format=json&limit=101`;

const fetchApiData = async (year) => {
    try {

        if (!year) {
            throw new Error("Year parameter is required but was undefined.");
        }
        
        if (!resourceIds[year]) {
            throw new Error(`No resource ID found for the year ${year}`);
        }
        
        const resourceId = resourceIds[year];

        const apiUrl = `${BASE_URL}${resourceId}${COMMON_PARAMS}`;
       
        const response = await axios.get(apiUrl);
        if (response.data) {
            return response.data;
        } else {
            throw new Error("No data found");
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw new Error("Failed to fetch data");
    }
};

module.exports = fetchApiData;


