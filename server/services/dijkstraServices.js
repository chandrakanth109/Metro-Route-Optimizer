

const findShortestPath = (stations, connections, sourceStation, destinationStation) => {
    const graph = {};

    stations.forEach((station) => {
        graph[station._id.toString()] = [];
    })

    connections.forEach((connection) => {
        const fromId = connection.fromStation._id.toString();
        const toId = connection.toStation._id.toString();

        graph[fromId].push({
            station: toId,
            distance:connection.distance,
        });

        graph[toId].push({
            station: fromId,
            distance: connection.distance,
        })
    })

    const distance={};
    const previous={};
    const visited= new Set();

    Object.keys(graph).forEach((statinId) => {
        distance[statinId]=Infinity;
        previous[statinId]=null;
    });

    distance[sourceStation] = 0;

    while(visited.size < Object.keys(graph).length) {
        let currentStation = null;
        let shortestDistance = Infinity;

        Object.keys(distance).forEach((statinId) => {
            if(!visited.has(statinId) && distance[statinId] < shortestDistance){
                shortestDistance=distance[statinId];
                currentStation=statinId;
            }
        });

        if(currentStation==null){
            break;
        }

        if(currentStation===destinationStation){
            break;
        }

        visited.add(currentStation);

        graph[currentStation].forEach((neighbour) => {
            const newDistance = distance[currentStation] + neighbour.distance;

            if(newDistance < distance[neighbour.station]){
                distance[neighbour.station]=newDistance;
                previous[neighbour.station]=currentStation;
            }
        })
    }

    if(distance[destinationStation]===Infinity){
        return {
            distance:null,
            path:[],
        }
    }

    const path=[];
    let current=destinationStation;

    while(current){
        path.unshift(current);
        current=previous[current];
    }

    return {
        distance: distance[destinationStation],
        path,
    }

}

module.exports = findShortestPath;