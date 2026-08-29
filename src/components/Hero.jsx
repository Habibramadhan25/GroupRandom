import { ArrowRight, Dice5, Sparkles } from "lucide-react";

export default function Hero({ onStart }) {
  return (
    <section id="home" className="hero">
      <div className="hero-badge"><Sparkles size={14}/> RANDOM • ADIL • CEPAT</div>
      <h1>Bagi Kelompok<br/><span>Jadi Lebih Mudah.</span></h1>
      <p>Masukkan nama teman sekelas, tentukan jumlah kelompok, lalu biarkan GroupRandom membaginya secara acak dan merata.</p>
      <button className="primary-btn hero-btn" onClick={onStart}>
        Mulai Membuat Kelompok <ArrowRight size={18}/>
      </button>
      <div className="hero-orb"><Dice5 size={64}/></div>
    </section>
  );
}