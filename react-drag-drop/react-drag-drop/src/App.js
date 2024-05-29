import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const func = [
  { id: "gary", name: "gary" },
  { id: "cato", name: "cato" },
  { id: "kvn", name: "kvn" },
];

function App() {
  const [state, setState] = useState(func);

  const handleEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(func);

    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);

    setState(items);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>wow</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="unique">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {state.map(({ id, name }, idx) => {
                  return (
                    <Draggable key={id} draggableId={id} index={idx}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
