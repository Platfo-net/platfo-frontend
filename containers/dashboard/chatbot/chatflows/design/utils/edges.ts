import { v4 as uuidv4 } from "uuid";

export const createEdge = (fromNode, toNode) => {
  const id = uuidv4();

  return {
    id,
    from: fromNode.id,
    to: toNode.id,
    fromPort: fromNode.portId,
    toPort: toNode.portId,
    fromWidget: fromNode.id,
    text:" "
  };
};

export const createNewEdge =  (fromNode, toNode) => {
  const id = uuidv4();
  const toPort =  toNode.ports.find((item) => item.side === "EAST");
  const fromPort =  fromNode.ports.find((item) => item.side === "WEST");
  return {
    id,
    from: fromNode.id,
    to: toNode.id,
    fromPort: fromPort.id,
    toPort: toPort.id,
    fromWidget: fromNode.id,
    text:" "
  };
};

export const convertApiDataToEdges = (data) => {
  const newEdges = data.edges.map((edge) => {
    return {
      id: edge.id,
      from: edge.from_id,
      to: edge.to_id,
      fromPort: edge.from_port,
      toPort: edge.to_port,
      fromWidget: edge.from_widget,
      text: edge.text,
    };
  });
  return newEdges;
};

export const convertEdgesToApiData = (edges) => {
  const newEdges = edges.map((edge) => {
    return {
      id: edge.id,
      from_id: edge.from,
      to_id: edge.to,
      from_port: edge.fromPort,
      to_port: edge.toPort,
      from_widget: edge.fromWidget,
      text: edge.text,
    };
  });
  return newEdges;
};

export const getEdgesOfWidgets = async (nodeData, nodes, edges) => {
  let newEdges = [...edges];
  const currentNode = await nodes.find((item) => item.id === nodeData.id);
  if (currentNode.data.quickReplies?.length > 0) {
    for (let x in currentNode.data.quickReplies) {
      if (currentNode.data.quickReplies[x].action.type === "GOTO") {
        const targetNode = await nodes.find(
          (item) => item.id === currentNode.data.quickReplies[x].action.data
        );
        const toPort = await targetNode.ports.find(
          (item) => item.side === "EAST"
        );
        const fromPort = await nodeData.ports.find((item) => item.side === "WEST" );
        const edgeLabel = currentNode.data.quickReplies[x].label
         const fromWidget = currentNode.data.quickReplies[x].value;

        const id = uuidv4();
        const createdEdge = {
          id,
          from: currentNode.id,
          to: targetNode.id,
          fromPort: fromPort.id,
          toPort: toPort.id,
          fromWidget: fromWidget,
          text: edgeLabel
        }
        const index = await findIndexDuplicateEdges(edges, createdEdge);
        if(index === -1) {
          newEdges.push(createdEdge);
        } else if(index !== -1 && index !== -2) {
          newEdges[index].fromWidget = createdEdge.fromWidget
          newEdges[index].text = createdEdge.text
        }
      }
    }
  }
  if (currentNode.data.choices?.length > 0) {
    for (let x in currentNode.data.choices) {
      if (currentNode.data.choices[x].action.type === "GOTO") {
        const targetNode = await nodes.find(
          (item) => item.id === currentNode.data.choices[x].action.data
        );
        const toPort = await targetNode.ports.find(
          (item) => item.side === "EAST"
        );
        const fromPort = await nodeData.ports.find((item) => item.side === "WEST");
        const edgeLabel = currentNode.data.choices[x].label
        const fromWidget = currentNode.data.choices[x].value;

        const id = uuidv4();
        const createdEdge = {
          id,
          from: currentNode.id,
          to: targetNode.id,
          fromPort: fromPort.id,
          toPort: toPort.id,
          fromWidget: fromWidget,
          text: edgeLabel
        }
        const index = await findIndexDuplicateEdges(edges, createdEdge);
        if(index === -1) {
          newEdges.push(createdEdge);
        } else if(index !== -1 && index !== -2) {
          newEdges[index].fromWidget = createdEdge.fromWidget
          newEdges[index].text = createdEdge.text
        }
      }
    }
  }

  return newEdges;
};

export const findIndexDuplicateEdges = async (currentEdges , newEdge) => {
  const indexDuplicateEdges = await currentEdges.findIndex(
      (edge) => edge.fromWidget === newEdge.fromWidget && edge.to === newEdge.to
  );
  const indexDuplicateWithNodesLink = await currentEdges.findIndex(
      (edge) => edge.fromPort === newEdge.fromPort && edge.to === newEdge.to
  );
  if(indexDuplicateEdges === -1 && indexDuplicateWithNodesLink === -1) {
    return -1
  }
  if(indexDuplicateWithNodesLink !== -1) {
    return indexDuplicateWithNodesLink
  }
  return -2
}

export const updateEdgesData = async (currentEdges , newEdge) => {
  let allEdges = [...currentEdges]
  const duplicateEdges = await allEdges.find(
      (edge) => edge.fromWidget === newEdge.fromWidget && edge.to === newEdge.to
  );
  const indexDuplicateWithNodesLink = allEdges.findIndex(
      (edge) => edge.fromPort === newEdge.fromPort && edge.to === newEdge.to
  );
  console.log(!duplicateEdges && indexDuplicateWithNodesLink === -1)
  if(!duplicateEdges && indexDuplicateWithNodesLink === -1) {
    allEdges.push(newEdge);
    console.log("allEdges")
    console.log(allEdges)
  }

  if(indexDuplicateWithNodesLink !== -1) {
    allEdges[indexDuplicateWithNodesLink].fromWidget = newEdge.fromWidget;
    allEdges[indexDuplicateWithNodesLink].text = newEdge.text;
  }
  console.log("findIndexDuplicateWithNodesLink" , indexDuplicateWithNodesLink)
  console.log("findDuplicateEdges" , duplicateEdges)
  return allEdges
}
