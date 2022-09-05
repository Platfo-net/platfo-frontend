import {v4 as uuidv4} from "uuid";

export const convertApiDataToEdges = (data) => {
    const newEdges = data.edges.map(edge => {
        return {
            id: edge.id,
            from: edge.from_id,
            to: edge.to_id,
            fromPort: edge.from_port,
            toPort: edge.to_port,
        }
    });
    return newEdges;
}

export const convertEdgestoApiData = (edges) => {
    const newEdges = edges.map(edge => {
        return {
            id: edge.id,
            from_id: edge.from,
            to_id: edge.to,
            from_port: edge.fromPort,
            to_port: edge.toPort,
        }
    });
    return newEdges;
}


export const getEdgesOfWidgets = async (nodeData, nodes, edges) => {
    let newEdges =  [...edges];
    const currentNode = await nodes.find(item => item.id === nodeData.id);
    if(currentNode.data.quickReplies?.length > 0) {
        for( let x in currentNode.data.quickReplies) {
            const targetNode = await nodes.find(item => item.id === currentNode.data.quickReplies[x].action.data);
            const toPort = await targetNode.ports.find((item) => item.side === "EAST");
            const fromPort = await currentNode.ports.find((item) => item.side === "WEST");
            const findDuplicateEdges = await edges.find(edge => edge.fromPort === fromPort.id && edge.toPort === toPort.id)
            if(!findDuplicateEdges) {
                const id = uuidv4();
                newEdges.push( {
                    id,
                    from: currentNode.id,
                    to: targetNode.id,
                    fromPort: fromPort.id,
                    toPort: toPort.id,
                })
            }

        }

    }
    if(currentNode.data.choices?.length > 0) {
        for( let x in currentNode.data.choices) {
            const targetNode = await nodes.find(item => item.id === currentNode.data.choices[x].action.data);
            const toPort = await targetNode.ports.find((item) => item.side === "EAST");
            const fromPort = await currentNode.ports.find((item) => item.side === "WEST");
            const findDuplicateEdges = await edges.find(edge => edge.fromPort === fromPort.id && edge.toPort === toPort.id)
            if(!findDuplicateEdges) {
                const id = uuidv4();
                newEdges.push( {
                    id,
                    from: currentNode.id,
                    to: targetNode.id,
                    fromPort: fromPort.id,
                    toPort: toPort.id,
                })
            }

        }
    }

    return newEdges
}