import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { MapPin, Clock, Briefcase, ChevronRight, Search, ArrowRight, Users, TrendingUp, Heart } from 'lucide-react';

const jobListings = [
  {
    id: 1,
    title: 'Agronomist / Ahli Pertanian',
    department: 'Riset & Pengembangan',
    location: 'Jakarta Pusat',
    type: 'Full-time',
    level: 'Mid-level',
    description: 'Bertanggung jawab dalam pengembangan dan penelitian varietas tanaman, serta memberikan rekomendasi teknis untuk petani mitra kami.',
    requirements: ['S1 Pertanian / Agroteknologi', 'Pengalaman min. 2 tahun', 'Familiar dengan sistem pertanian modern', 'Kemampuan komunikasi yang baik'],
    deadline: '30 April 2026',
  },
  {
    id: 2,
    title: 'Content Writer – Pertanian',
    department: 'Redaksi & Media',
    location: 'Jakarta Pusat / Remote',
    type: 'Full-time',
    level: 'Junior',
    description: 'Menulis konten artikel, tips berkebun, dan berita pertanian yang informatif dan menarik untuk portal digital Trubus.',
    requirements: ['S1 Komunikasi / Pertanian / Jurnalistik', 'Portofolio penulisan artikel', 'Memahami SEO dasar', 'Minat di bidang pertanian'],
    deadline: '15 Mei 2026',
  },
  {
    id: 3,
    title: 'Frontend Developer (React)',
    department: 'Teknologi & Digital',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    level: 'Mid-level',
    description: 'Membangun dan memelihara antarmuka web portal Trubus yang modern, responsif, dan berkinerja tinggi.',
    requirements: ['Pengalaman min. 2 tahun React/TypeScript', 'Familiar dengan Tailwind CSS', 'Pemahaman REST API', 'Portofolio proyek web'],
    deadline: '10 Mei 2026',
  },
  {
    id: 4,
    title: 'Marketing & Partnership Executive',
    department: 'Pemasaran',
    location: 'Jakarta Pusat',
    type: 'Full-time',
    level: 'Junior',
    description: 'Mengelola hubungan kemitraan dengan petani, distributor, dan komunitas pertanian untuk memperluas jaringan Trubus.',
    requirements: ['S1 Manajemen / Pemasaran', 'Kemampuan negosiasi & presentasi', 'Mobilitas tinggi', 'Pengalaman di agribisnis menjadi nilai plus'],
    deadline: '20 Mei 2026',
  },
  {
    id: 5,
    title: 'Customer Service Representative',
    department: 'Layanan Pelanggan',
    location: 'Jakarta Pusat',
    type: 'Part-time',
    level: 'Junior',
    description: 'Menangani pertanyaan, keluhan, dan kebutuhan pelanggan portal e-commerce Trubus dengan cepat dan profesional.',
    requirements: ['Pendidikan min. D3', 'Pengalaman CS min. 1 tahun', 'Komunikatif dan sabar', 'Familiar dengan alat CRM'],
    deadline: '1 Mei 2026',
  },
  {
    id: 6,
    title: 'Social Media Specialist',
    department: 'Redaksi & Media',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    level: 'Junior',
    description: 'Mengelola dan mengembangkan akun media sosial Trubus (Instagram, TikTok, YouTube) dengan strategi konten yang kreatif dan terukur.',
    requirements: ['Portofolio konten media sosial', 'Pemahaman analitik media sosial', 'Kemampuan desain grafis dasar', 'Kreativitas tinggi'],
    deadline: '25 April 2026',
  },
];

const typeColors: Record<string, string> = {
  'Full-time': 'bg-green-50 text-green-700 border-green-200',
  'Part-time': 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function KarirPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">


        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
            <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
            Bergabung Bersama Kami
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            Karir di Trubus
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Jadilah bagian dari tim yang berdedikasi memajukan agrikultur Indonesia. Kami mencari talenta terbaik yang bersemangat membawa perubahan positif.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: <TrendingUp className="w-6 h-6" />, title: 'Tumbuh Bersama', desc: 'Kesempatan pengembangan karir yang terstruktur dan jelas di industri agrikultur yang terus berkembang.' },
            { icon: <Users className="w-6 h-6" />, title: 'Tim yang Solid', desc: 'Lingkungan kerja kolaboratif, inovatif, dan saling mendukung untuk menghasilkan yang terbaik.' },
            { icon: <Heart className="w-6 h-6" />, title: 'Dampak Nyata', desc: 'Pekerjaan Anda berkontribusi langsung pada pemberdayaan petani dan ketahanan pangan Indonesia.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings Header */}
        <div className="flex items-center justify-between mt-12 mb-6">
           <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-green-500 pl-3">Posisi Terbuka</h2>
           <p className="text-sm font-bold tracking-wide px-4 py-1.5 bg-green-50 text-green-700 rounded-full">{jobListings.length} Posisi</p>
        </div>

        {/* Job Listings */}
        {jobListings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium">Belum ada lowongan saat ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobListings.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Job Card Header */}
                <button
                  className="w-full text-left p-6 md:p-8"
                  onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${typeColors[job.type] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {job.type}
                        </span>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                          {job.level}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1">{job.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Deadline: {job.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <div className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${expandedId === job.id ? 'rotate-90' : ''}`}>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Detail */}
                {expandedId === job.id && (
                  <div className="border-t border-gray-100 px-6 md:px-8 py-6 bg-gray-50/50">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">{job.description}</p>
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Kualifikasi</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={`mailto:karir@trubus.id?subject=Lamaran: ${job.title}`}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Lamar Sekarang <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Open Application Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
            <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
            Tidak ada yang cocok?
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Kirim Lamaran Terbuka</h2>
          <p className="text-gray-500 mb-7 max-w-xl mx-auto">
            Kami selalu terbuka untuk talenta luar biasa. Kirimkan CV dan portofolio Anda ke email kami, dan kami akan menghubungi jika ada posisi yang sesuai.
          </p>
          <a
            href="mailto:karir@trubus.id?subject=Lamaran Terbuka"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            karir@trubus.id <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
