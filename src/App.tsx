import { useMemo, useState } from "react";
import { CONNECTIONS_PUZZLE, ConnectionsPuzzle } from "./puzzle";

export default function App() {
  const connections = useConnections(CONNECTIONS_PUZZLE);

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 flex flex-col gap-4 max-w-[600px] w-full">
        <h1 className="text-xl text-center text-gray-600">
          Create four groups of four!
        </h1>

        <div className="">
          <div className="grid grid-cols-4 grid-rows-4 gap-2">
            {connections
              .getWords()
              .correctGuesses.flat()
              .map((word) => (
                <GridSquareGuessed key={word.word} wordOption={word} />
              ))}

            {connections.getWords().remainingWords.map((word) => (
              <GridSquare
                key={word.word}
                word={word.word}
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

type GridSquareGuessedProps = {
  wordOption: WordOption;
};

function GridSquareGuessed({ wordOption }: GridSquareGuessedProps) {
  const backgroundColour = GUESSED_WORD_BACKGROUND_COLOURS[wordOption.colour];

  return (
    <div className="relative w-[100%] pt-[100%]">
      <div
        className={`flex items-center justify-center rounded-md absolute inset-0 font-semibold text-sm ${backgroundColour}`}
      >
        <div>{wordOption.word}</div>
      </div>
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
  getWords: () => Words;
  isWordSelected: (word: WordOption) => boolean;
  toggleWordSelection: (word: WordOption) => void;
  deselectAll: () => void;
  submitGuess: () => void;
};

type Words = {
  correctGuesses: WordOption[][];
  remainingWords: WordOption[];
};

type WordOption = {
  word: string;
  colour: Colour;
};

enum Colour {
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
  PURPLE = "PURPLE",
}

const GUESSED_WORD_BACKGROUND_COLOURS = {
  [Colour.YELLOW]: "bg-yellow-400",
  [Colour.GREEN]: "bg-green-400",
  [Colour.BLUE]: "bg-blue-400",
  [Colour.PURPLE]: "bg-purple-400",
};

function useConnections(puzzle: ConnectionsPuzzle): Connections {
  const wordOptions = useMemo(() => getWordOptions(puzzle), [puzzle]);

  const [selectedWords, setSelectedWords] = useState<WordOption[]>([]);

  const [remainingWords, setRemainingWords] =
    useState<WordOption[]>(wordOptions);
  const [correctGuesses, setCorrectGuesses] = useState<WordOption[][]>([]);

  const getWords = (): Words => {
    return { correctGuesses, remainingWords };
  };

  const isWordSelected = (word: WordOption) => {
    for (const selectedWord of selectedWords) {
      if (selectedWord === word) {
        return true;
      }
    }
    return false;
  };

  const toggleWordSelection = (word: WordOption) => {
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

    // store the guess
    if (areAllWordsTheSameColour(selectedWords)) {
      setCorrectGuesses((prev) => [...prev, selectedWords]);
      setRemainingWords((prev) =>
        prev.filter((word) => !selectedWords.includes(word))
      );
      deselectAll();
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

function getWordOptions(puzzle: ConnectionsPuzzle): WordOption[] {
  const wordLookup: Record<string, WordOption> = {};
  puzzle.yellow.forEach(
    (word) => (wordLookup[word] = { word, colour: Colour.YELLOW })
  );
  puzzle.green.forEach(
    (word) => (wordLookup[word] = { word, colour: Colour.GREEN })
  );
  puzzle.blue.forEach(
    (word) => (wordLookup[word] = { word, colour: Colour.BLUE })
  );
  puzzle.purple.forEach(
    (word) => (wordLookup[word] = { word, colour: Colour.PURPLE })
  );

  const words = puzzle.initialLayout.map((word) => wordLookup[word]);

  return words;
}

function areAllWordsTheSameColour(words: WordOption[]): boolean {
  return words.every((word) => word.colour === words[0].colour);
}
