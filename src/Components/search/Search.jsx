import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, goeApiOptions } from "../../api";
import './search.css'

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState("");

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
                goeApiOptions
            );
            const data = await response.json();

            const options = data.data.map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name},${city.country}`,
            }));

            return { options };
        } catch (error) {
            console.error(error);
            return { options: [] }; // Return an empty array if there's an error or no data
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <div  className="search-box">
            <AsyncPaginate
                placeholder="Search for city.."
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            
            />
        </div>
    );
};

export default Search;
