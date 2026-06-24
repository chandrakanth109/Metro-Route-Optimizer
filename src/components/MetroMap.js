const MetroMap = ({ stations, connections, routeResult }) => {
  const routeIds =
    routeResult?.path?.map((station) => station._id.toString()) || [];

  const sourceId = routeIds[0];
  const destinationId = routeIds[routeIds.length - 1];

  const isRouteConnection = (connection) => {
    const fromId = connection.fromStation._id.toString();
    const toId = connection.toStation._id.toString();

    for (let index = 0; index < routeIds.length - 1; index++) {
      const currentId = routeIds[index];
      const nextId = routeIds[index + 1];

      if (
        (fromId === currentId && toId === nextId) ||
        (fromId === nextId && toId === currentId)
      ) {
        return true;
      }
    }

    return false;
  };

  const getStationColors = (stationId) => {
    if (stationId === sourceId) {
      return {
        fill: "#2563eb",
        stroke: "#1d4ed8",
      };
    }

    if (stationId === destinationId) {
      return {
        fill: "#10b981",
        stroke: "#047857",
      };
    }

    if (routeIds.includes(stationId)) {
      return {
        fill: "#f59e0b",
        stroke: "#b45309",
      };
    }

    return {
      fill: "#ffffff",
      stroke: "#64748b",
    };
  };

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Metro network
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Explore the network and your shortest route
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            Source
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            Route
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            Destination
          </div>
        </div>
      </div>

      <div className="overflow-auto bg-slate-50 p-4">
        <svg
          viewBox="0 0 700 450"
          className="min-h-[500px] min-w-[700px] w-full"
        >
          {connections.map((connection) => {
            const highlighted = isRouteConnection(connection);

            const middleX =
              (connection.fromStation.x + connection.toStation.x) / 2;

            const middleY =
              (connection.fromStation.y + connection.toStation.y) / 2;

            return (
              <g key={connection._id}>
                <line
                  x1={connection.fromStation.x}
                  y1={connection.fromStation.y}
                  x2={connection.toStation.x}
                  y2={connection.toStation.y}
                  stroke={highlighted ? "#2563eb" : "#cbd5e1"}
                  strokeWidth={highlighted ? "8" : "5"}
                  strokeLinecap="round"
                />

                <rect
                  x={middleX - 20}
                  y={middleY - 12}
                  width="40"
                  height="22"
                  rx="5"
                  fill="white"
                  stroke="#e2e8f0"
                />

                <text
                  x={middleX}
                  y={middleY + 3}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="11"
                  fontWeight="600"
                >
                  {connection.distance} km
                </text>
              </g>
            );
          })}

          {stations.map((station) => {
            const stationId = station._id.toString();
            const colors = getStationColors(stationId);
            const isSelected = routeIds.includes(stationId);

            return (
              <g key={station._id}>
                <circle
                  cx={station.x}
                  cy={station.y}
                  r={isSelected ? "11" : "8"}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth="4"
                />

                <text
                  x={station.x}
                  y={station.y - 20}
                  textAnchor="middle"
                  fill="#1e293b"
                  fontSize="13"
                  fontWeight="600"
                >
                  {station.name}
                </text>

                <text
                  x={station.x}
                  y={station.y + 27}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="10"
                >
                  {station.code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default MetroMap;