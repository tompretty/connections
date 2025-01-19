import { useState } from "react";

type Connection = [string, string, string, string];
type Connections = [Connection, Connection, Connection, Connection];

const CONNECTIONS: Connections = [
  ["NOTTINGHAM", "RAIN", "NEW", "BLACK"],
  ["MALVERN", "FINCHLEY", "OXFORD", "WALTHAMSTOW"],
  ["BLUE", "RARE", "MEDIUM", "WELL-DONE"],
  ["OLD", "ANTIQUE", "VINTAGE", "CLASSIC"],
];

export default function App() {
  const selection = useSelection();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl text-center text-gray-600">
        Create four groups of four!
      </h1>

      <div className="">
        <div className="grid grid-cols-4 grid-rows-4 gap-2">
          {CONNECTIONS.flat().map((word, index) => (
            <GridSquare
              key={word}
              word={word}
              isSelected={selection.isSelected(index)}
              onClick={() => selection.toggleSelection(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <ActionButton onClick={selection.deselectAll} text="Deselect all" />

        <ActionButton onClick={selection.submit} text="Submit" />
      </div>
    </div>
  );
}

type GridSquareProps = {
  word: string;
  onClick: () => void;
  isSelected: boolean;
};

function GridSquare({ word, onClick, isSelected }: GridSquareProps) {
  const backgroundColour = isSelected ? "bg-gray-700" : "bg-gray-100";
  const textColour = isSelected ? "text-white" : "text-gray-800";

  return (
    <div className="relative w-[100%] pt-[100%]">
      <button
        className={`flex items-center justify-center rounded-md absolute inset-0 font-semibold text-sm ${backgroundColour} ${textColour}`}
        onClick={onClick}
      >
        <div key={word}>{word}</div>
      </button>
    </div>
  );
}

type ActionButtonProps = {
  onClick: () => void;
  text: string;
};

function ActionButton({ onClick, text }: ActionButtonProps) {
  return (
    <button
      className="p-4 rounded-full text-center border border-gray-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

type Selection = {
  isSelected: (index: number) => boolean;
  toggleSelection: (index: number) => void;
  deselectAll: () => void;
  submit: () => void;
};

function useSelection(): Selection {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isSelected = (index: number) => selectedIds.includes(index);

  const toggleSelection = (index: number) => {
    const isAlreadySelected = isSelected(index);

    // If already selected, remove from the selection
    if (isAlreadySelected) {
      setSelectedIds((prev) => prev.filter((id) => id !== index));
      return;
    }

    // If there are fewer than 4 selected, add to the selection
    if (selectedIds.length < 4) {
      setSelectedIds((prev) => [...prev, index]);
      return;
    }

    // TODO: add log?
  };

  const deselectAll = () => setSelectedIds([]);

  const submit = () => {
    // If less than 4 selected, return early
    if (selectedIds.length < 4) {
      // TODO: log error
      return;
    }
  };

  return { isSelected, toggleSelection, deselectAll, submit };
}
