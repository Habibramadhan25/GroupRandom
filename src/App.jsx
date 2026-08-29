import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StudentInput from "./components/StudentInput";
import GroupSettings from "./components/GroupSettings";
import GroupResults from "./components/GroupResults";
import Statistics from "./components/Statistics";
import History from "./components/History";
import About from "./components/About";
import Toast from "./components/Toast";
import { loadHistory, saveHistory, deleteHistory, clearHistory, loadTheme, saveTheme } from "./utils/storage";
import { splitIntoGroups, splitByMemberCount } from "./utils/randomize";

const examples = ["Andi","Budi","Citra","Dimas","Eka","Fajar","Gilang","Hana"];

export default function App() {
  const [theme, setTheme] = useState(loadTheme());
  const [namesText, setNamesText] = useState("");
  const [mode, setMode] = useState("groups");
  const [amount, setAmount] = useState(3);
  const [balanced, setBalanced] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [avoidPrevious, setAvoidPrevious] = useState(false);
  const [groups, setGroups] = useState([]);
  const [history, setHistory] = useState(loadHistory());
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);
  const generatorRef = useRef(null);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [mustTogether, setMustTogether] = useState("");
  const [mustSeparate, setMustSeparate] = useState("");
  const [wheelResult, setWheelResult] = useState("");
  const [smartInfo, setSmartInfo] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const names = useMemo(() => {
    const raw = namesText.split(/\n|,/).map(n => n.trim()).filter(Boolean);
    return [...new Set(raw)];
  }, [namesText]);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const generate = (force = false) => {
    if (names.length < 2) return notify("Masukkan minimal 2 nama siswa.");
    if (mode === "groups" && amount > names.length) return notify("Jumlah kelompok tidak boleh lebih banyak dari jumlah siswa.");
    if (mode === "members" && amount > names.length) return notify("Anggota per kelompok tidak boleh melebihi jumlah siswa.");

    const run = () => {
      let result;
      if (mode === "groups") result = splitIntoGroups(names, amount);
      else result = splitByMemberCount(names, amount);

      if (avoidPrevious && history[0]?.groups) {
        const previous = JSON.stringify(history[0].groups.map(g => [...g.members].sort()));
        let tries = 0;
        while (JSON.stringify(result.map(g => [...g.members].sort())) === previous && tries < 10) {
          result = mode === "groups" ? splitIntoGroups(names, amount) : splitByMemberCount(names, amount);
          tries++;
        }
      }

      setGroups(result);
      const item = { id: crypto.randomUUID(), createdAt: Date.now(), total: names.length, groups: result };
      setHistory(saveHistory(item));
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      notify(force ? "Berhasil diacak ulang!" : "Kelompok berhasil dibuat!");
    };

    if (animate) {
      setBusy(true);
      setTimeout(() => { run(); setBusy(false); }, 900);
    } else run();
  };

  const addExample = () => setNamesText(examples.join("\n"));
  const clear = () => { setNamesText(""); setGroups([]); notify("Daftar nama dihapus."); };
  const reset = () => { setGroups([]); setNamesText(""); notify("Generator direset."); };

  const formatAll = () => groups.map(g => `KELOMPOK ${g.id}\n${g.members.map((n,i) => `${i+1}. ${n}`).join("\n")}`).join("\n\n");

  const copyAll = async () => { await navigator.clipboard.writeText(formatAll()); notify("Hasil berhasil disalin!"); };
  const download = () => {
    const blob = new Blob([formatAll()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "hasil-grouprandom.txt"; a.click(); URL.revokeObjectURL(url); notify("File TXT berhasil dibuat!");
  };

  const viewHistory = (item) => { setGroups(item.groups); document.getElementById("results")?.scrollIntoView({behavior:"smooth"}); notify("Riwayat dimuat."); };
  const removeHistory = (id) => { setHistory(deleteHistory(id)); notify("Riwayat dihapus."); };
  const wipeHistory = () => { if (confirm("Hapus semua riwayat?")) { setHistory(clearHistory()); notify("Semua riwayat dihapus."); } };


  const parsePairs = text => text.split("\n").map(x => x.trim()).filter(Boolean)
    .map(x => x.split(/,|\+|&/).map(y => y.trim()).filter(Boolean)).filter(x => x.length >= 2);

  const recommended = names.length < 2 ? [] : Array.from({length: Math.min(8, names.length - 1)}, (_, i) => {
    const g = i + 2, base = Math.floor(names.length / g), extra = names.length % g;
    return { g, members: base + (extra ? 1 : 0), diff: extra ? 1 : 0 };
  }).sort((a,b) => a.diff-b.diff || Math.abs(a.g-5)-Math.abs(b.g-5)).slice(0,3);

  const smartRecommend = () => {
    if (!names.length) return notify("Masukkan nama siswa terlebih dahulu.");
    const r = recommended[0];
    setMode("groups"); setAmount(r.g);
    setSmartInfo(`${r.g} kelompok × sekitar ${r.members} siswa. Pembagian paling merata untuk ${names.length} siswa.`);
    notify("Rekomendasi diterapkan!");
  };

  const spinStudent = () => {
    if (names.length < 1) return notify("Masukkan nama siswa terlebih dahulu.");
    setWheelResult(names[Math.floor(Math.random() * names.length)]);
    notify("🎉 Siswa terpilih!");
  };

  const exportCSV = () => {
    if (!groups.length) return notify("Buat kelompok terlebih dahulu.");
    const rows = [["Kelompok","No","Nama"], ...groups.flatMap(g => g.members.map((n,i)=>[`Kelompok ${g.id}`,i+1,n]))];
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv"}));
    a.download="hasil-grouprandom.csv"; a.click(); notify("CSV berhasil dibuat!");
  };

  const exportJSON = () => {
    if (!groups.length) return notify("Buat kelompok terlebih dahulu.");
    const data={className,subject,teacher,groups};
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
    a.download="hasil-grouprandom.json"; a.click(); notify("JSON berhasil dibuat!");
  };

  return <div className="app">
    <Navbar theme={theme} setTheme={setTheme}/>
    <Hero onStart={() => generatorRef.current?.scrollIntoView({behavior:"smooth"})}/>

    <main ref={generatorRef} id="generator" className="generator">
      <div className="generator-heading">
        <div><div className="mini-label">GENERATOR</div><h2>Siapkan kelompokmu.</h2><p>Isi nama siswa dan pilih cara pembagiannya.</p></div>
        <div className="secure"><span>●</span> Data lokal</div>
      </div>

      <div className="generator-grid">
        <StudentInput value={namesText} setValue={setNamesText} count={names.length} addExample={addExample} clear={clear}/>
        <GroupSettings mode={mode} setMode={setMode} amount={amount} setAmount={setAmount} balanced={balanced}
          setBalanced={setBalanced} animate={animate} setAnimate={setAnimate} avoidPrevious={avoidPrevious}
          setAvoidPrevious={setAvoidPrevious} onGenerate={() => generate(false)} disabled={busy}/>
      </div>

      <section className="advanced-panel">
        <div className="advanced-heading">
          <div><div className="mini-label">FITUR TAMBAHAN</div><h2>Kontrol lebih lengkap.</h2>
          <p>Atur data kelas, aturan pasangan, rekomendasi, import, dan random wheel.</p></div>
          <span className="feature-badge">✨ PRO TOOLS</span>
        </div>

        <div className="meta-grid">
          <label>Nama kelas<input value={className} onChange={e=>setClassName(e.target.value)} placeholder="XI RPL 1"/></label>
          <label>Mata pelajaran<input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Informatika"/></label>
          <label>Nama guru<input value={teacher} onChange={e=>setTeacher(e.target.value)} placeholder="Nama guru"/></label>
        </div>

        <div className="rules-grid">
          <label><b>🤝 Harus satu kelompok</b><textarea value={mustTogether} onChange={e=>setMustTogether(e.target.value)} placeholder={"Andi, Budi\nCitra + Dimas"}/><small>Satu pasangan per baris.</small></label>
          <label><b>🚫 Tidak boleh satu kelompok</b><textarea value={mustSeparate} onChange={e=>setMustSeparate(e.target.value)} placeholder={"Andi, Citra\nBudi + Dimas"}/><small>Disimpan sebagai aturan untuk sesi ini.</small></label>
        </div>

        <div className="smart-row">
          <div className="smart-card"><span className="smart-icon">🧠</span>
            <div><strong>Smart Recommendation</strong><p>{smartInfo || (names.length ? `Untuk ${names.length} siswa, lihat rekomendasi jumlah kelompok.` : "Masukkan nama untuk melihat rekomendasi.")}</p></div>
            <button className="tool-btn" onClick={smartRecommend}>✨ Terapkan</button>
          </div>
          <div className="recommend-list">{recommended.map(r=><button className="recommend-chip" key={r.g} onClick={()=>{setMode("groups");setAmount(r.g);notify(`${r.g} kelompok dipilih.`)}}><strong>{r.g} kelompok</strong><span>≈ {r.members} orang</span></button>)}</div>
        </div>

        <div className="import-row">
          <label className="file-btn">📊 Import TXT/CSV<input type="file" accept=".txt,.csv" onChange={e=>{
            const f=e.target.files?.[0]; if(!f)return;
            const rd=new FileReader(); rd.onload=()=>{setNamesText(String(rd.result).replaceAll(",","\n"));notify("Daftar nama berhasil diimport!")}; rd.readAsText(f);
          }}/></label>
          <span>Nama dapat dipisahkan dengan baris baru atau koma.</span>
        </div>
      </section>

      <section className="wheel-section">
        <div><div className="mini-label">RANDOM WHEEL</div><h2>🎡 Pilih satu siswa secara acak.</h2>
          <p>Cocok untuk menentukan ketua, presenter, atau penanggung jawab.</p>
          <button className="primary-btn" onClick={spinStudent}>🏆 SPIN RANDOM</button></div>
        <div className="wheel-result"><small>SISWA TERPILIH</small><strong>{wheelResult || "?"}</strong></div>
      </section>

      {groups.length > 0 && <div className="export-bar">
        <div><strong>Export hasil</strong><span>TXT, CSV, JSON, atau Print/PDF.</span></div>
        <div className="export-actions">
          <button className="tool-btn" onClick={exportCSV}>📊 CSV</button>
          <button className="tool-btn" onClick={exportJSON}>🧩 JSON</button>
          <button className="tool-btn" onClick={()=>window.print()}>📄 PDF / Print</button>
        </div>
      </div>}

      {busy && <div className="loading"><div className="spinner"/><strong>Mengacak anggota...</strong><span>Menyiapkan kelompok yang seimbang</span></div>}
      <Statistics groups={groups}/>
      <GroupResults groups={groups} onShuffle={() => generate(true)} onReset={reset} onCopy={copyAll} onDownload={download}/>
    </main>

    <History history={history} onView={viewHistory} onDelete={removeHistory} onClear={wipeHistory}/>
    <About/>
    <footer className="footer">© 2026 GroupRandom • Dibuat untuk belajar & kolaborasi.</footer>
    <Toast message={toast}/>
  </div>;
}