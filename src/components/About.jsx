import { Dice5, Heart, ShieldCheck, Zap } from "lucide-react";

export default function About() {
  return <section id="about" className="about-section">
    <div className="mini-label">TENTANG</div><h2>Dibuat untuk kelas yang lebih seru.</h2>
    <p>GroupRandom membantu siswa, guru, dan organisasi membuat pembagian kelompok secara cepat, acak, dan adil tanpa perlu login.</p>
    <div className="about-grid">
      <div><Dice5/><strong>Acak pintar</strong><span>Menggunakan Fisher-Yates Shuffle.</span></div>
      <div><ScaleIcon/><strong>Seimbang</strong><span>Jumlah anggota dibuat semerata mungkin.</span></div>
      <div><Zap/><strong>Instan</strong><span>Ringan dan berjalan langsung di browser.</span></div>
      <div><ShieldCheck/><strong>Privat</strong><span>Nama siswa tersimpan lokal di perangkat.</span></div>
    </div>
  </section>;
}
function ScaleIcon() { return <span className="fake-scale">⚖️</span>; }