export default function Guess({ isGuessed, guess, word}){
    return <div className="mb-2 grid grid-cols-5 gap-2">
        {new Array(5).fill(0).map((_, i) => (
            <div className="h-16 w-16 border border-gray-400 bg-black font-bold uppercase text-white flex items-center justify-center">{guess[i]}
            </div>
        ))}
    </div>
}