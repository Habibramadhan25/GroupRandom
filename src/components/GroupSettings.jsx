import { Minus, Plus, Scale, Shuffle } from "lucide-react";

export default function GroupSettings({
  mode, setMode, amount, setAmount, balanced, setBalanced,
  animate, setAnimate, avoidPrevious, setAvoidPrevious, onGenerate, disabled
}) {
  const dec = () => setAmount(Math.max(1, amount - 1));
  const inc = () => setAmount(amount + 1);

  return (
    <div className="settings-card">
      <div className="mini-label">02 • PENGATURAN</div>
      <h3>Atur Pembagian</h3>

      <div className="mode-grid">
        <button className={mode === "groups" ? "mode-card active" : "mode-card"} onClick={() => setMode("groups")}>
          <UsersIcon/><strong>Jumlah kelompok</strong><small>Contoh: 4 kelompok</small>
        </button>
        <button className={mode === "members" ? "mode-card active" : "mode-card"} onClick={() => setMode("members")}>
          <Scale size={20}/><strong>Jumlah anggota</strong><small>Contoh: 4 orang/kelompok</small>
        </button>
      </div>

      <div className="number-setting">
        <div><span>{mode === "groups" ? "Jumlah kelompok" : "Anggota per kelompok"}</span><small>Gunakan + / −</small></div>
        <div className="stepper">
          <button onClick={dec}><Minus size={16}/></button>
          <strong>{amount}</strong>
          <button onClick={inc}><Plus size={16}/></button>
        </div>
      </div>

      <div className="checks">
        <label><input type="checkbox" checked={balanced} onChange={e => setBalanced(e.target.checked)}/><span>⚖️ Pembagian harus seimbang</span></label>
        <label><input type="checkbox" checked={animate} onChange={e => setAnimate(e.target.checked)}/><span>✨ Animasi pengacakan</span></label>
        <label><input type="checkbox" checked={avoidPrevious} onChange={e => setAvoidPrevious(e.target.checked)}/><span>🔄 Hindari hasil sebelumnya</span></label>
      </div>

      <button className="primary-btn generate-btn" disabled={disabled} onClick={onGenerate}>
        <Shuffle size={18}/> ACAK KELOMPOK
      </button>
    </div>
  );
}

function UsersIcon() {
  return <span className="mode-icon"><Shuffle size={20}/></span>;
}