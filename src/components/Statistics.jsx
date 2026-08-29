import { BarChart3, Scale, Target, Users } from "lucide-react";

export default function Statistics({ groups }) {
  if (!groups?.length) return null;
  const total = groups.reduce((s, g) => s + g.members.length, 0);
  const avg = (total / groups.length).toFixed(2);
  const sizes = groups.map(g => g.members.length);
  const diff = Math.max(...sizes) - Math.min(...sizes);

  const stats = [
    [<Users size={19}/>, "Total Siswa", total],
    [<Target size={19}/>, "Total Kelompok", groups.length],
    [<BarChart3 size={19}/>, "Rata-rata Anggota", avg],
    [<Scale size={19}/>, "Selisih Terbesar", `${diff} orang`]
  ];

  return <div className="stats-grid">{stats.map(([icon, label, value]) =>
    <div className="stat" key={label}><div className="stat-icon">{icon}</div><div><small>{label}</small><strong>{value}</strong></div></div>
  )}</div>;
}