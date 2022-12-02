import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import Guess from "../components/Guess";
import Qwerty from "../components/Qwerty";
import PuzzleStore from "../stores/PuzzleStore";

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore);
  useEffect(() => {
    store.init();
    window.addEventListener("keyup", store.handleKeyup);

    return () => {
      window.removeEventListener("keyup", store.handleKeyup);
    };
  }, []);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-600">
      <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-6xl font-bold uppercase text-transparent">
        Swadoli
      </h1>
      <h2 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-2xl font-bold text-transparent">
        The Swahili Wordle
      </h2>
      {store.guesses.map((_, i) => (
        <Guess
          key={i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {store.won && <h1>Umeshinda!</h1>}
      {store.lost && (
        <h1>
          Umeanguka!
          <br />
        </h1>
      )}
      {store.lost && <h1>Jibu ni {store.word}</h1>}
      {(store.won || store.lost) && (
        <button
          onClick={store.init}
          className="my-2 rounded-full border border-purple-200 bg-white px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Cheza Tena
        </button>
      )}
      <Qwerty store={store} />
      {/* word: {store.word} <br/> */}
      {/* guesses: {JSON.stringify(store.guesses)} */}
    </div>
  );
});
