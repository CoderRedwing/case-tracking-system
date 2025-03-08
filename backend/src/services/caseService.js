const axios = require("axios");
require("dotenv").config();
const fetchApiData = require('../config/db')

const buildFilters = (query, data) => {
    if (Object.keys(query).length === 0) return data; 

    return data.filter((item) => {
        for (let key in query) {
            let value = query[key].toLowerCase();

            if (
                (key === "state" &&
                (!item.category || (item.category !== "State" && item.category !== "Union Territory")) &&
                !item.state_ut_city && !item.states_ut_city && !item.state_ut && !item.state_ut__col__2_
                ) || (key === "union_territory" && 
                (!item.category || item.category !== "Union Territory") &&
                !item.state_ut_city && !item.states_ut_city && !item.state_ut && !item.state_ut__col__2_
                ) || (key === "city" && 
                (!item.category || item.category !== "City") &&
                !item.state_ut_city && !item.states_ut_city && !item.state_ut && !item.state_ut__col__2_)
            ) {
                return false;
            };


            if (["state", "union_territory", "city"].includes(key)) {
                if (item.state_uts_cities?.toLowerCase() !== value &&
                    item.state_ut_city?.toLowerCase() !== value.toLowerCase() &&
                    item.states__uts__cities?.toLowerCase() !== value.toLowerCase() &&
                    item.states_ut_city?.toLowerCase() !== value.toLowerCase() &&
                    item.states_uts_cities?.toLowerCase() !== value.toLowerCase() &&
                    item.state_ut?.toLowerCase() !== value.toLowerCase() &&
                    item.state_ut__col__2_?.toLowerCase() !== value.toLowerCase()) {
                    return false;
                }
            }

            if (key.includes("cases")) {
                let field = item[key.replace(/_/g, "__")];
                if (!field || field < Number(query[key])) {
                    return false;
                }
            }

            if (key.startsWith("incest_")) {
                let fieldName = `incest__rape__no__of_victims___${key.replace("incest_", "").replace(/years_|_years/g, "")}`;
                let fieldValue = item[fieldName] || 0;
                if (fieldValue < Number(query[key])) return false;
            }

            if (key.startsWith("other_")) {
                let fieldName = `other__rape__no__of_victims___${key.replace("other_", "").replace(/years_|_years/g, "")}`;
                let fieldValue = item[fieldName] || 0;
                if (fieldValue < Number(query[key])) return false;
            }

            if (key.startsWith("total_")) {
                let fieldName = `rape_cases__total____no__of_victims___${key.replace("total_", "").replace(/years_|_years/g, "")}`;
                let fieldValue = item[fieldName] || 0;
                if (fieldValue < Number(query[key])) return false;
            }
        }
        return true;
    });
};

const getFilteredCases = async (query) => {
    try {
        const { year, sortBy = "year", sortOrder = "asc", limit = 100 } = query;

        if (!year) {
            throw new Error("Year parameter is required.");
        }

        const apiResponse = await fetchApiData(Number(year));

        if (!apiResponse) {
            throw new Error("Failed to fetch data from the API.");
        }
        if (!apiResponse.records) {
            throw new Error("No records found in API response.");
        }

        const data = apiResponse.records;

        const filteredData = buildFilters ? buildFilters(query, data) : data;

        const order = sortOrder === "asc" ? 1 : -1;
        if (filteredData.length > 0 && sortBy in filteredData[0]) {
            filteredData.sort((a, b) =>
                a[sortBy] < b[sortBy] ? -order : a[sortBy] > b[sortBy] ? order : 0
            );
        } else {
            console.warn(`Sort field '${sortBy}' not found in data.`);
        }

        return {
            index_name: "public_api_data",
            title: "Crime Data Across Multiple Years",
            desc: "Filtered crime records from multiple years",
            source: "data.gov.in",
            version: "2.2.0",
            status: "ok",
            total: filteredData.length,
            limit,
            data: filteredData.slice(0, Number(limit))
        };

    } catch (error) {
        console.error("Error in fetching cases:", error.message);
        return null; 
    }
};

module.exports = getFilteredCases;
