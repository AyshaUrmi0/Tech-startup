import { useEffect, useState } from "react";
import Card from "./Card";


const Test = () => {

    const [state, setstate] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('https://tech-spring-server.vercel.app/addCampaigns?filterByDate=true&limitToSix=true')
            const data = await response.json()
            // console.log(data)
            setstate(data)
        }
        fetchdata()


    }, [])  
    return (
        <div className="my-7 ">
        <div className="grid grid-cols-1 gap-3 text-black md:grid-cols-3 ">
           
        {state &&
          state
           
            .map((item) => (
              <Card key={item._id} item={item} />
            ))}
        </div>
        </div>
    );
};

export default Test;