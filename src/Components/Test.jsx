import { useEffect, useState } from "react";
import Card from "./Card";
import { Zoom } from "react-awesome-reveal";

const Test = () => {
    const [state, setstate] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let response = await fetch('https://tech-spring-server.vercel.app/addCampaigns?filterByDate=true&limitToSix=true');
                let data = await response.json();
                
                // If filterByDate returns empty array (because sample database deadlines are in the past),
                // fall back to fetching available campaigns so data displays on homepage
                if (!Array.isArray(data) || data.length === 0) {
                    response = await fetch('https://tech-spring-server.vercel.app/addCampaigns?limitToSix=true');
                    data = await response.json();
                }

                setstate(data || []);
            } catch (err) {
                console.error("Error fetching campaigns:", err);
            }
        }
        fetchdata();
    }, []);  

    return (
        <div className="my-7 ">
            <Zoom>
               <h2 className="mb-8 text-3xl font-bold text-center">Running Campaign..</h2>
           </Zoom>
           
        <div className="grid grid-cols-1 gap-3 text-black md:grid-cols-3 ">
        {state &&
          state.map((item) => (
              <Card key={item._id} item={item} />
            ))}
        </div>
        </div>
    );
};

export default Test;