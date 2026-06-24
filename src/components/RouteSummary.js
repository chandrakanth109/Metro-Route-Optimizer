import { MapPin, Route, Signpost } from "lucide-react";

const RouteSummary = ({ routeResult }) => {
  if (!routeResult) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-center">
        <div>
          <Route className="mx-auto mb-3 text-slate-300" size={42} />

          <h3 className="font-semibold text-slate-700">
            No route selected
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Select two stations to find the shortest route.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold text-emerald-600">
          Best route found
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Journey summary
        </h2>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Signpost size={18} />
            <span className="text-sm font-semibold">Distance</span>
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {routeResult.distance} km
          </p>
        </div>

        <div className="rounded-lg bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <MapPin size={18} />
            <span className="text-sm font-semibold">Stops</span>
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {routeResult.stops}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-bold uppercase text-slate-500">
          Route
        </h3>

        <div>
          {routeResult.path.map((station, index) => (
            <div key={station._id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`h-4 w-4 rounded-full border-4 ${
                    index === 0
                      ? "border-blue-600 bg-white"
                      : index === routeResult.path.length - 1
                        ? "border-emerald-600 bg-white"
                        : "border-slate-400 bg-white"
                  }`}
                />

                {index < routeResult.path.length - 1 && (
                  <div className="h-12 w-0.5 bg-slate-300" />
                )}
              </div>

              <div className="pb-7">
                <p className="font-semibold text-slate-900">
                  {station.name}
                </p>

                <p className="text-sm text-slate-500">
                  {station.code} · {station.line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RouteSummary;