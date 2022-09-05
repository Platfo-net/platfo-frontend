import { v4 as uuidv4 } from "uuid";

export const createStartNodeData = () => {
  const node = {
    id: uuidv4(),
    text: "start",
    width: 90,
    height: 90,
    data: {
      type: "start",
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
      type: "menu",
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

export const createDefaultTextNodeData = (numberOfTextNode) => {
  const node = {
    id: uuidv4(),
    text: "text" + numberOfTextNode,
    width: 90,
    height: 90,
    data: {
      type: "text",
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
