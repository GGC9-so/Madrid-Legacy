export default function GameIntro({ rules, onStart }: { rules: string; onStart: () => void }) {
  return (
    <div className="card p-8">
      <p className="text-lg leading-relaxed text-night/80">{rules}</p>
      <button type="button" onClick={onStart} className="btn-gold mt-8">Jugar</button>
    </div>
  );
}
