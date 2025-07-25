import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    // function to fetch jobs data

    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        // Fetch jobs data when the component mounts
        fetchJobs()
    }, []);

    const value = {
        setSearchFilter, searchFilter, isSearched, setIsSearched, jobs, setJobs
        
    }
    return (<AppContext.Provider value = {value}>
        {props.children}
    </AppContext.Provider>)
}