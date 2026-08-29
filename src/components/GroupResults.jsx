import { Copy, Download, Printer, RefreshCcw, RotateCcw } from "lucide-react";
import GroupCard from "./GroupCard";

export default function GroupResults({ groups, onShuffle, onReset, onCopy, onDownload }) {
  if (!groups?.length) return null;
  return <section className="results-section" id="results">
    <div className="results-head">
      <div><div className="mini-label">03 • HASIL</div><h2>🎉 Hasil Pembagian Kelompok</h2><p>Kelompok telah dibuat secara acak dan merata.</p></div>
      <div className="result-tools">
        <button className="tool-btn" onClick={onShuffle}><RefreshCcw size={15}/> Acak ulang</button>
        <button className="tool-btn" onClick={onCopy}><Copy size={15}/> Copy semua</button>
        <button className="tool-btn" onClick={() => window.print()}><Printer size={15}/> Print</button>
        <button className="tool-btn" onClick={onDownload}><Download size={15}/> TXT</button>
        <button className="tool-btn danger-outline" onClick={onReset}><RotateCcw size={15}/> Reset</button>
      </div>
    </div>
    <div className="groups-grid">{groups.map(group => <GroupCard key={group.id} group={group}/>)}</div>
  </section>;
}