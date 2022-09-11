import { v4 as uuidv4 } from "uuid";

export const updatePortStatus = (nodes, nodeData, status) => {
  const updateNodes = [...nodes];
  if(nodeData.data.type !== "MENU") {
    const nodeIndex = nodes.findIndex(node => node.id === nodeData.id);
    const portIndex = updateNodes[nodeIndex].ports.findIndex(port => port.side === "WEST");
    updateNodes[nodeIndex].ports[portIndex].disabled =  status === "DISABLE" ? true : false;
    updateNodes[nodeIndex].ports[portIndex].className =  status === "DISABLE" ? "" : "active-port";
    updateNodes[nodeIndex].ports[portIndex].width =  status === "DISABLE" ? 8 : 20;
    updateNodes[nodeIndex].ports[portIndex].height =  status === "DISABLE" ? 8 : 20;
  }
  return updateNodes
}
export const updatePorts = (nodes) => {
  const updateNodes = nodes.map(item => {
    let updatePorts = [...item.ports];
    if(item.data.choices && item.data.choices.length > 0) {
      const newPort = item.data.choices.map(choice => {
        return {
          id: choice.value,
          width: 1,
          height: 1,
          side: "NORTH",
          disabled: true,
          className: "hidden-port",
          hidden: true,
        }
      })
      updatePorts= updatePorts.concat(newPort);
    }
    if(item.data.quickReplies && item.data.quickReplies.length > 0) {
      const newPort = item.data.quickReplies.map(quickReply => {
        return {
          id: quickReply.value,
          width: 1,
          height: 1,
          side: "NORTH",
          className: "hidden-port",
          disabled: true,
          hidden: true,
        }
      })
      updatePorts = updatePorts.concat(newPort);
    }

    return {
      ...item,
      ports: updatePorts
    }
  })

  return updateNodes

}

export const updateNodeData = (value, nodeData, nodes ) => {

  const updateNodes = nodes.map((item) => {
    if (item.id === nodeData.id) {
      return {
        ...item,
        data: value,
      };
    } else {
      return {
        ...item,
      };
    }
  });
  return updateNodes
}

export const createStartNodeData = () => {
  const node = {
    id: uuidv4(),
    text: "start",
    width: 90,
    height: 90,
    data: {
      type: "START",
    },
    ports: [
      {
        id: uuidv4(),
        width: 20,
        height: 20,
        side: "WEST",
        className: "active-port"
      },
    ],
  };

  return node;
};

export const createDefaultMenuNodeData = (numberOfMenuNode) => {
  const node = {
    id: uuidv4(),
    text: "menu" + numberOfMenuNode,
    width: 90,
    height: 90,
    data: {
      type: "MENU",
      question: "",
      choices: [],
      quickReplies: [],
    },
    ports: [
      {
        id: uuidv4(),
        width: 8,
        height: 8,
        side: "EAST",
        disabled: true
      },
      {
        id: uuidv4(),
        width: 8,
        height: 8,
        side: "WEST",
        disabled: true
      },
    ],
    hasDeleteAction: true,
    hasEditAction: true,
  };

  return node;
};

export const createDefaultTextNodeData = (numberOfTextNode) => {
  const node = {
    id: uuidv4(),
    text: "text" + numberOfTextNode,
    width: 90,
    height: 90,
    data: {
      type: "TEXT",
      value: "",
      quickReplies: [],
    },
    ports: [
      {
        id: uuidv4(),
        width: 8,
        height: 8,
        side: "EAST",
        disabled: true
      },
      {
        id: uuidv4(),
        width: 20,
        height: 20,
        side: "WEST",
        className: "active-port"
      },
    ],
    hasDeleteAction: true,
    hasEditAction: true,
  };

  return node;
};

export const translateXYToCanvasPosition = (
  x: number,
  y: number,
): [x: number, y: number] => {
  return [window.innerWidth - x - 60 , y - 35];
};


export const convertApiDataToNodes = (data) => {
  const nodes = data.nodes.map(item => {
    const newObj = { ...item };
    if(newObj.has_delete_action !== undefined) {
        newObj.hasDeleteAction = newObj.has_delete_action
    }
    if(newObj.has_edit_action !== undefined) {
      newObj.hasEditAction = newObj.has_edit_action
    }
   return {
      ...newObj
   }
  });
  return nodes
}

export const convertNodesToApiData = (nodes) => {
  const newNodes = nodes.map(item => {
    const newObj = {...item}

    if(newObj.hasDeleteAction !== undefined) {
      newObj.has_delete_action = newObj.hasDeleteAction
     delete newObj.hasDeleteAction
    }
    if(newObj.hasEditAction !== undefined) {
      newObj.has_edit_action = newObj.hasEditAction
      delete newObj.hasEditAction;
    }
    return {
      ...newObj
    }
  });
  return newNodes
}

export const checkNodeStatus = (nodeData, edges) => {
  const eastPort = nodeData.ports.find(port => port.side === "EAST");
  const findEastEdgeStatus = edges.findIndex(edge => edge.toPort === eastPort?.id );
  return findEastEdgeStatus === -1 ? "ERROR" : "NORMAL";
}

export const checkPortStatus = (nodeData, edges) => {
  if(nodeData.data.type !== "MENU") {
    const westPort = nodeData.ports.find(port => port.side === "WEST");
    const WestPortEdges = edges.filter(edge => edge.fromPort === westPort?.id );
    if(WestPortEdges.length === 0) {
      return "NORMAL" ;
    } else  {
      const existEdge = WestPortEdges.filter(edge => edge.fromWidget === edge.from);
      if(existEdge.length > 0) {
        return "DISABLE"
      }

    }
  }
  return "NORMAL"

}

/*export const convertApiDataToNodes = (data) => {
  const nodes = data.map(item => {
    if(item.widget.widget_type === "MESSAGE") {
      const ports =[];
      return {
        id: item.id,
        text: item.title,
        width: 90,
        height: 90,
        data: {
          type: "text",
          value: item.widget.message,
        },
        ports: ports,
        hasDeleteAction: true,
        hasEditAction: true,
      }
    }

    if(item.widget.widget_type === "MENU") {
      const ports =[];
      const choices = item.widget.choices.map(choice => {
        return {
          // action: {
          //   data: "",
          //   type: "GOTO"
          // },
          label: choice.text,
          value: choice.id
        }
      });
      console.log("choices", choices)
      return {
        id: item.id,
        text: item.title,
        width: 90,
        height: 90,
        data: {
          type: "menu",
          question: item.widget.title,
          choices: choices,
        },
        ports: [],
        hasDeleteAction: true,
        hasEditAction: true,
      }
    }

    return null
  }).filter(item => item);
  return nodes
}*/
