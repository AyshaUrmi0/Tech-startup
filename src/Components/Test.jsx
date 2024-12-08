import { useEffect, useState } from "react";
import Card from "./Card";


const Test = () => {

    const [state, setstate] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('http://localhost:4000/addCampaigns')
            const data = await response.json()
            // console.log(data)
            setstate(data)
        }
        fetchdata()


    }, [])  
    return (
        <div className="my-7 ">
        <div className="flex flex-wrap items-center justify-center gap-3 text-black ">
           
        {state &&
          state
            .filter((item) => item.isActive) // Filter only active campaigns
            .slice(0, 6) // Limit to the first 6 active campaigns
            .map((item) => (
              <Card key={item._id} item={item} />
            ))}
        </div>
        </div>
    );
};

export default Test;