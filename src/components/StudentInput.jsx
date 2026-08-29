import { ClipboardList, Trash2, Users } from "lucide-react";

export default function StudentInput({ value, setValue, count, addExample, clear }) {
  return (
    <div className="input-card">
      <div className="section-title-row">
        <div>
          <div className="mini-label">01 • DATA SISWA</div>
          <h3>Daftar Nama</h3>
        </div>
        <div className="count-pill"><Users size={14}/>{count} siswa</div>
      </div>

      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={"Masukkan nama siswa, satu nama setiap baris...\n\nContoh:\nAndi\nBudi\nCitra\nDimas"}
        aria-label="Daftar nama siswa"
      />

      <div className="input-actions">
        <button className="ghost-btn" onClick={addExample}><ClipboardList size={15}/> Tambah contoh nama</button>
        <button className="danger-btn" onClick={clear}><Trash2 size={15}/> Hapus semua</button>
      </div>
    </div>
  );
}