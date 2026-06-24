import { ArrowDownUp, MapPin, Navigation, Route } from "lucide-react";

function JourneyPlanner({
  stations,
  sourceStation,
  destinationStation,
  setSourceStation,
  setDestinationStation,
  handleFindRoute,
  loading,
  error,
}) {
  const swapStations = () => {
    setSourceStation(destinationStation);
    setDestinationStation(sourceStation);
  };

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Route size={21} />
        </div>

        <div>
          <h3 className="font-bold text-slate-950">Journey planner</h3>
          <p className="text-sm text-slate-500">Choose your stations</p>
        </div>
      </div>

      <form onSubmit={handleFindRoute} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            From station
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
            />

            <select
              value={sourceStation}
              onChange={(event) => setSourceStation(event.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select source</option>

              {stations.map((station) => (
                <option key={station._id} value={station._id}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={swapStations}
            title="Swap stations"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
          >
            <ArrowDownUp size={17} />
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            To station
          </label>

          <div className="relative">
            <Navigation
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600"
            />

            <select
              value={destinationStation}
              onChange={(event) => setDestinationStation(event.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select destination</option>

              {stations.map((station) => (
                <option key={station._id} value={station._id}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <Route size={18} />
          {loading ? "Finding route..." : "Find shortest route"}
        </button>
      </form>
    </aside>
  );
}

export default JourneyPlanner;









































