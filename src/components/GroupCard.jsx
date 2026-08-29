import { Check, Copy, Users } from "lucide-react";
import { useState } from "react";

const accents = ["violet", "blue", "pink", "cyan", "orange", "green"];

export default function GroupCard({ group }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = `KELOMPOK ${group.id}\n${group.members.map((n,i) => `${i+1}. ${n}`).join("\n")}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return <article className={`group-card ${accents[(group.id - 1) % accents.length]}`}>
    <div className="group-head">
      <div><span className="group-number">0{group.id}</span><h3>Kelompok {group.id}</h3></div>
      <button className="copy-btn" onClick={copy}>{copied ? <Check size={16}/> : <Copy size={16}/>}</button>
    </div>
    <div className="member-count"><Users size={14}/>{group.members.length} Anggota</div>
    <ol>{group.members.map((name, i) => <li key={`${name}-${i}`}><span>{name}</span></li>)}</ol>
  </article>;
}