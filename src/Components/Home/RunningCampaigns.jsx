import React, { useEffect, useState } from "react";
import Card from "../Card";
import { Zoom } from "react-awesome-reveal";
import { getRunningCampaigns } from "../../services/api";

const RunningCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true);
            const data = await getRunningCampaigns();
            setCampaigns(data);
            setLoading(false);
        };
        fetchdata();
    }, []);  

    return (
        <section className="my-12 px-4 max-w-7xl mx-auto">
            <Zoom>
               <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">Running Campaigns</h2>
            </Zoom>
           
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((item) => (
                    <Card key={item._id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default RunningCampaigns;
