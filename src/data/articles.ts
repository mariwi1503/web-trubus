export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const articleCategories = [
  { name: 'Pertanian', slug: 'pertanian' },
  { name: 'Perkebunan', slug: 'perkebunan' },
  { name: 'Peternakan', slug: 'peternakan' },
  { name: 'Teknologi', slug: 'teknologi' },
  { name: 'Bisnis Agri', slug: 'bisnis-agri' },
  { name: 'Tips & Trik', slug: 'tips-trik' },
];

export const articles: Article[] = [
  {
    id: '1',
    slug: 'revolusi-pertanian-organik-indonesia',
    title: 'Revolusi Pertanian Organik di Indonesia: Peluang dan Tantangan di Era Modern',
    excerpt: 'Indonesia tengah mengalami pergeseran besar menuju pertanian organik. Bagaimana petani lokal beradaptasi dengan tren global ini?',
    content: `<p>Pertanian organik di Indonesia mengalami pertumbuhan signifikan dalam beberapa tahun terakhir. Dengan meningkatnya kesadaran konsumen terhadap kesehatan dan lingkungan, permintaan produk organik terus melonjak.</p>
<p>Menurut data Kementerian Pertanian, luas lahan pertanian organik di Indonesia telah mencapai lebih dari 200.000 hektar pada tahun 2025. Angka ini meningkat 30% dibandingkan tahun sebelumnya.</p>
<h3>Peluang Besar di Pasar Global</h3>
<p>Pasar produk organik global diperkirakan mencapai USD 500 miliar pada tahun 2027. Indonesia, dengan kekayaan sumber daya alamnya, memiliki posisi strategis untuk menjadi pemain utama di pasar ini.</p>
<p>"Petani Indonesia memiliki keunggulan alami karena banyak lahan yang belum terpapar bahan kimia berat," ujar Dr. Siti Rahayu, pakar pertanian organik dari IPB University.</p>
<h3>Tantangan yang Harus Dihadapi</h3>
<p>Meski peluangnya besar, transisi ke pertanian organik tidak mudah. Petani harus menghadapi masa konversi 2-3 tahun, di mana produktivitas bisa menurun sementara biaya produksi meningkat.</p>
<p>Selain itu, sertifikasi organik membutuhkan biaya dan proses yang tidak sederhana. Namun, berbagai program pemerintah dan LSM kini hadir untuk membantu petani dalam proses transisi ini.</p>`,
    category: 'Pertanian',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006371910_5fb97e6b.png',
    author: 'Redaksi Trubus',
    date: '31 Mar 2026',
    readTime: '5 menit',
    featured: true,
  },
  {
    id: '2',
    slug: 'teknik-budidaya-durian-musang-king',
    title: 'Teknik Budidaya Durian Musang King yang Menguntungkan',
    excerpt: 'Panduan lengkap budidaya durian Musang King dari pembibitan hingga panen pertama.',
    content: `<p>Durian Musang King menjadi primadona di pasar buah premium Indonesia. Dengan harga jual yang tinggi, budidaya durian ini menjanjikan keuntungan besar bagi petani.</p>
<p>Kunci keberhasilan budidaya Musang King terletak pada pemilihan bibit berkualitas, teknik penanaman yang tepat, dan perawatan yang konsisten.</p>`,
    category: 'Perkebunan',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006382627_4e284d99.png',
    author: 'Ahmad Fauzi',
    date: '30 Mar 2026',
    readTime: '7 menit',
    featured: true,
  },
  {
    id: '3',
    slug: 'smart-farming-iot-pertanian',
    title: 'Smart Farming: Bagaimana IoT Mengubah Wajah Pertanian Indonesia',
    excerpt: 'Teknologi Internet of Things kini merambah sektor pertanian, membantu petani meningkatkan efisiensi dan produktivitas.',
    content: `<p>Era digital telah membawa perubahan besar di sektor pertanian Indonesia. Teknologi Internet of Things (IoT) kini memungkinkan petani memantau kondisi lahan secara real-time melalui sensor dan perangkat pintar.</p>`,
    category: 'Teknologi',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006370484_037416d6.png',
    author: 'Budi Santoso',
    date: '29 Mar 2026',
    readTime: '6 menit',
  },
  {
    id: '4',
    slug: 'peluang-bisnis-hidroponik-perkotaan',
    title: 'Peluang Bisnis Hidroponik di Perkotaan: Modal Kecil, Untung Besar',
    excerpt: 'Hidroponik menjadi solusi pertanian urban yang menjanjikan. Simak analisis bisnis dan tips memulainya.',
    content: `<p>Pertanian hidroponik di perkotaan semakin diminati, terutama oleh generasi muda yang ingin terjun ke dunia agribisnis tanpa memerlukan lahan luas.</p>`,
    category: 'Bisnis Agri',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006373453_1c129a0a.png',
    author: 'Dewi Lestari',
    date: '28 Mar 2026',
    readTime: '4 menit',
  },
  {
    id: '5',
    slug: 'cara-membuat-pupuk-kompos-rumahan',
    title: '5 Cara Mudah Membuat Pupuk Kompos dari Limbah Dapur',
    excerpt: 'Panduan praktis mengolah limbah dapur menjadi pupuk kompos berkualitas untuk kebun rumah Anda.',
    content: `<p>Membuat pupuk kompos dari limbah dapur adalah cara sederhana namun efektif untuk mengurangi sampah sekaligus menyuburkan tanaman.</p>`,
    category: 'Tips & Trik',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006432298_8e3aff67.png',
    author: 'Sari Wulandari',
    date: '27 Mar 2026',
    readTime: '3 menit',
  },
  {
    id: '6',
    slug: 'ternak-ayam-kampung-organik',
    title: 'Panduan Lengkap Beternak Ayam Kampung Organik',
    excerpt: 'Ayam kampung organik semakin diminati pasar. Pelajari teknik beternak yang benar untuk hasil optimal.',
    content: `<p>Permintaan ayam kampung organik terus meningkat seiring kesadaran masyarakat akan pentingnya pangan sehat dan alami.</p>`,
    category: 'Peternakan',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006376339_ae1b0bee.jpg',
    author: 'Hendra Wijaya',
    date: '26 Mar 2026',
    readTime: '8 menit',
  },
  {
    id: '7',
    slug: 'padi-tahan-kekeringan-varietas-baru',
    title: 'Varietas Padi Baru Tahan Kekeringan Siap Diluncurkan',
    excerpt: 'Badan Litbang Pertanian mengembangkan varietas padi baru yang mampu bertahan di kondisi kekeringan ekstrem.',
    content: `<p>Perubahan iklim menjadi tantangan serius bagi petani padi di Indonesia. Merespons hal ini, para peneliti berhasil mengembangkan varietas padi baru yang tahan kekeringan.</p>`,
    category: 'Pertanian',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006371910_5fb97e6b.png',
    author: 'Redaksi Trubus',
    date: '25 Mar 2026',
    readTime: '5 menit',
  },
  {
    id: '8',
    slug: 'ekspor-kopi-indonesia-melonjak',
    title: 'Ekspor Kopi Specialty Indonesia Melonjak 40% di Kuartal Pertama 2026',
    excerpt: 'Kopi specialty Indonesia semakin diminati pasar internasional dengan peningkatan ekspor yang signifikan.',
    content: `<p>Indonesia mencatat peningkatan ekspor kopi specialty sebesar 40% pada kuartal pertama 2026 dibandingkan periode yang sama tahun lalu.</p>`,
    category: 'Bisnis Agri',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006382627_4e284d99.png',
    author: 'Ahmad Fauzi',
    date: '24 Mar 2026',
    readTime: '4 menit',
  },
  {
    id: '9',
    slug: 'drone-pertanian-presisi',
    title: 'Drone untuk Pertanian Presisi: Investasi Masa Depan Petani Modern',
    excerpt: 'Penggunaan drone dalam pertanian semakin meluas. Simak manfaat dan cara memanfaatkannya secara optimal.',
    content: `<p>Teknologi drone telah merevolusi cara petani mengelola lahan pertanian mereka. Dari pemetaan lahan hingga penyemprotan pestisida, drone menawarkan efisiensi yang luar biasa.</p>`,
    category: 'Teknologi',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006370484_037416d6.png',
    author: 'Budi Santoso',
    date: '23 Mar 2026',
    readTime: '6 menit',
  },
  {
    id: '10',
    slug: 'tips-memilih-pupuk-yang-tepat',
    title: 'Tips Memilih Pupuk yang Tepat Sesuai Jenis Tanaman Anda',
    excerpt: 'Pemilihan pupuk yang tepat sangat menentukan keberhasilan pertanian. Kenali jenis pupuk dan fungsinya.',
    content: `<p>Setiap tanaman memiliki kebutuhan nutrisi yang berbeda. Memilih pupuk yang tepat adalah langkah krusial untuk memastikan pertumbuhan optimal.</p>`,
    category: 'Tips & Trik',
    image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006432298_8e3aff67.png',
    author: 'Sari Wulandari',
    date: '22 Mar 2026',
    readTime: '4 menit',
  },
];
