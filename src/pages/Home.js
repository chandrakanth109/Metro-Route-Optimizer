
import { useEffect, useState } from "react";
import Header from "../components/Header";
import JourneyPlanner from "../components/JourneyPlanner";
import api from "../services/api";
import RouteSummary from "../components/RouteSummary";
import MetroMap from "../components/MetroMap"
function Home() {

    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);
    const [sourceStation, setSourceStation] = useState("");
    const [destinationStation, setDestinationStation] = useState("");
    const [routeResult, setRouteResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const [stationResponse, connectResponse] = await Promise.all([
                    api.get("/getStations"),
                    api.get("/getConnections"),
                ])
                console.log(stationResponse);
                setStations(stationResponse.data.data);
                setConnections(connectResponse.data.data);
            } catch(error){
                setError("unable to load stations");
            }
        }
        fetchStations();
    },[]);



    const handleFindRoute = async (event) => {
        event.preventDefault();
        setError("");
        setRouteResult(null);

        if(!sourceStation || !destinationStation){
            setError("Please select both stations");
            return;
        }

        if(sourceStation===destinationStation) {
            setError("Source and destination cannot be same");
            return;
        }

        try{
            setLoading(true);

            const response = await api.post("/getShortestRoute", {
                sourceStation,
                destinationStation,            
            })

            setRouteResult(response.data.data);
        } catch(error) {
            setError(
                error.response?.data?.message || "Uanle to find the shortest route"
            );
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <Header />

            <main className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-950">
                        Plan your journey
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Find the shorted route across the metro Network
                    </p>
                </div>
                <div>
                    <JourneyPlanner 
                        stations={stations}
                        sourceStation={sourceStation}
                        destinationStation={destinationStation}
                        setSourceStation={setSourceStation}
                        setDestinationStation={setDestinationStation}
                        handleFindRoute={handleFindRoute}
                        loading={loading}
                        error={error}
                    />
                </div>

                <section className="min-h-[650px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <RouteSummary routeResult={routeResult}/>
                </section>

                <MetroMap 
                    stations={stations}
                    connections={connections}
                    routeResult={routeResult}
                />
            </main>
        </div>
    )
}

export default Home;