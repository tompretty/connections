import { useState } from "react";
import { CONNECTIONS_PUZZLE, ConnectionsPuzzle } from "./puzzle";

export default function App() {
  const connections = useConnections(CONNECTIONS_PUZZLE);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl text-center text-gray-600">
        Create four groups of four!
      </h1>

      <div className="">
        <div className="grid grid-cols-4 grid-rows-4 gap-2">
          {connections.getWords().map((word) => (
            <GridSquare
              key={word}
              word={word}
              isSelected={connections.isWordSelected(word)}
              onClick={() => connections.toggleWordSelection(word)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <ActionButton onClick={connections.deselectAll} text="Deselect all" />

        <ActionButton onClick={connections.submitGuess} text="Submit" />
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

type Connections = {
  getWords: () => string[];
  isWordSelected: (word: string) => boolean;
  toggleWordSelection: (word: string) => void;
  deselectAll: () => void;
  submitGuess: () => void;
};

function useConnections(puzzle: ConnectionsPuzzle): Connections {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const getWords = () => {
    return [
      ...puzzle.yellow,
      ...puzzle.green,
      ...puzzle.blue,
      ...puzzle.purple,
    ];
  };

  const isWordSelected = (word: string) => selectedWords.includes(word);

  const toggleWordSelection = (word: string) => {
    const isAlreadySelected = isWordSelected(word);

    // If already selected, remove from the selection
    if (isAlreadySelected) {
      setSelectedWords((prev) =>
        prev.filter((selectedWord) => selectedWord !== word)
      );
      return;
    }

    // If there are fewer than 4 selected, add to the selection
    if (selectedWords.length < 4) {
      setSelectedWords((prev) => [...prev, word]);
      return;
    }

    // TODO: add log?
  };

  const deselectAll = () => setSelectedWords([]);

  const submitGuess = () => {
    // If less than 4 selected, return early
    if (selectedWords.length < 4) {
      // TODO: log error
      return;
    }
  };

  return {
    getWords,
    isWordSelected,
    toggleWordSelection,
    deselectAll,
    submitGuess,
  };
}
