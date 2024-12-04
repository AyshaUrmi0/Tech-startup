import { useEffect, useState } from "react";
import Card from "./Card";


const Test = () => {

    const [state, setstate] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('http://localhost:4000/activeCampaigns')
            const data = await response.json()
            console.log(data)
            setstate(data)
        }
        fetchdata()


    }, [])  
    return (
        <div className="my-7 ">
        <div className="flex flex-wrap items-center justify-center gap-3 ">
           
           {
                state && state.map((item) => {
                    return <Card key={item._id} item={item} />   
                })
            } 
        </div>
        </div>
    );
};

export default Test;