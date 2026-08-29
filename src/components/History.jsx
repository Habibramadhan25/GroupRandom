import { Clock3, Eye, Trash2 } from "lucide-react";

export default function History({ history, onView, onDelete, onClear }) {
  return <section id="history" className="content-section">
    <div className="section-heading"><div><div className="mini-label">RIWAYAT</div><h2>Hasil Sebelumnya</h2><p>Data disimpan lokal di browser kamu.</p></div>
      {history.length > 0 && <button className="danger-btn" onClick={onClear}><Trash2 size={15}/> Hapus semua</button>}
    </div>
    {!history.length ? <div className="empty"><Clock3 size={30}/><strong>Belum ada riwayat</strong><span>Hasil pembagian yang dibuat akan muncul di sini.</span></div> :
      <div className="history-list">{history.map(item => <div className="history-row" key={item.id}>
        <div className="history-icon"><Clock3 size={18}/></div>
        <div className="history-info"><strong>{item.total} siswa • {item.groups.length} kelompok</strong><span>{new Date(item.createdAt).toLocaleString("id-ID")}</span></div>
        <div className="history-actions"><button className="tool-btn" onClick={() => onView(item)}><Eye size={15}/> Lihat</button><button className="icon-danger" onClick={() => onDelete(item.id)}><Trash2 size={16}/></button></div>
      </div>)}</div>}
  </section>;
}