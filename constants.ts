import type { Level, Problem, Upgrade } from './types';
import { ProblemType } from './types';
import { CakeIcon, SparklesIcon, TruckIcon, BuildingStorefrontIcon } from './components/Icons';

export const LEVELS: Level[] = [
  { level: 1, shopName: "Warung Kancil", xpToNextLevel: 100, problemTypes: [ProblemType.ADDITION], customersPerDay: 3 },
  { level: 2, shopName: "Kios Kelinci", xpToNextLevel: 250, problemTypes: [ProblemType.ADDITION, ProblemType.SUBTRACTION], customersPerDay: 4 },
  { level: 3, shopName: "Toko Beruang", xpToNextLevel: 500, problemTypes: [ProblemType.MULTIPLICATION], customersPerDay: 4 },
  { level: 4, shopName: "Minimarket Gajah", xpToNextLevel: 1000, problemTypes: [ProblemType.MULTIPLICATION, ProblemType.DIVISION], customersPerDay: 5 },
  { level: 5, shopName: "Supermarket Harimau", xpToNextLevel: Infinity, problemTypes: [ProblemType.ADDITION, ProblemType.SUBTRACTION, ProblemType.MULTIPLICATION, ProblemType.DIVISION], customersPerDay: 5 },
];

export const PROBLEMS: Problem[] = [
  // Level 1: Addition (REVISED FOR CLARITY)
  { question: "Aku mau 2 permen, harga satu permen Rp250. Aku juga mau 1 cokelat seharga Rp1.000. Berapa total belanjaku?", answer: 1500, type: ProblemType.ADDITION },
  { question: "Aku beli 3 apel, harga satu apel Rp2.000. Aku juga beli 2 jeruk, harga satu jeruk Rp1.500. Berapa totalnya?", answer: 9000, type: ProblemType.ADDITION },
  { question: "Satu pensil harganya Rp1.000 dan satu buku harganya Rp3.500. Jadi berapa totalnya?", answer: 4500, type: ProblemType.ADDITION },
  { question: "Aku mau 5 roti, harga satu rotinya Rp2.000. Aku juga mau 1 kotak susu seharga Rp4.000. Berapa semuanya?", answer: 14000, type: ProblemType.ADDITION },

  // Level 2: Subtraction
  { question: "Total belanjaku Rp7.000. Aku bayar pakai uang Rp10.000. Berapa kembaliannya?", answer: 3000, type: ProblemType.SUBTRACTION },
  { question: "Belanjaanku Rp12.000. Uangku Rp20.000. Berapa kembaliannya?", answer: 8000, type: ProblemType.SUBTRACTION },
  { question: "Harganya Rp2.500. Aku kasih uang Rp5.000. Kembali berapa?", answer: 2500, type: ProblemType.SUBTRACTION },
  { question: "Totalnya Rp16.000. Aku bayar dengan uang Rp20.000. Berapa sisa uangku?", answer: 4000, type: ProblemType.SUBTRACTION },

  // Level 3: Multiplication
  { question: "Aku beli 3 pak pensil. Setiap pak isinya 5 pensil. Berapa total pensilku?", answer: 15, type: ProblemType.MULTIPLICATION },
  { question: "Ibu beli 4 kotak donat. Satu kotak isi 6 donat. Berapa jumlah semua donat?", answer: 24, type: ProblemType.MULTIPLICATION },
  { question: "Ada 5 kantong kelereng. Masing-masing kantong berisi 10 kelereng. Berapa semua kelereng?", answer: 50, type: ProblemType.MULTIPLICATION },
  { question: "Beli 2 ikat balon. Satu ikat ada 8 balon. Total balonnya berapa?", answer: 16, type: ProblemType.MULTIPLICATION },

  // Level 4: Division
  { question: "Aku punya 20 permen, mau dibagi rata untuk 4 teman. Masing-masing dapat berapa?", answer: 5, type: ProblemType.DIVISION },
  { question: "Tolong bagi 18 kue ini sama rata ke dalam 3 kotak. Setiap kotak isinya berapa?", answer: 6, type: ProblemType.DIVISION },
  { question: "Ayah punya 30 bibit tanaman untuk ditanam di 5 pot. Berapa bibit untuk setiap pot?", answer: 6, type: ProblemType.DIVISION },
  { question: "Bagikan 12 potong pizza untuk 4 orang sama rata. Setiap orang dapat berapa potong?", answer: 3, type: ProblemType.DIVISION },
];

export const CUSTOMER_AVATARS: string[] = [
  'https://picsum.photos/seed/kancil/150/150',
  'https://picsum.photos/seed/kucing/150/150',
  'https://picsum.photos/seed/robot/150/150',
  'https://picsum.photos/seed/gajah/150/150',
  'https://picsum.photos/seed/beruang/150/150',
];

export const UPGRADES: Upgrade[] = [
  { id: 'item_kue', name: "Jual Kue Enak", description: "Menambah variasi kue di tokomu!", cost: 100, icon: CakeIcon, type: 'ITEM' },
  { id: 'item_mainan', name: "Jual Mainan Seru", description: "Anak-anak pasti suka mainan baru!", cost: 150, icon: SparklesIcon, type: 'ITEM' },
  { id: 'decor_cat', name: "Cat Toko Baru", description: "Biar tokomu makin cerah dan menarik!", cost: 200, icon: BuildingStorefrontIcon, type: 'DECORATION' },
  { id: 'decor_rak', name: "Rak Display Modern", description: "Tata barang jualanmu di rak baru yang keren!", cost: 300, icon: TruckIcon, type: 'DECORATION' },
];

export const XP_PER_CORRECT_ANSWER = 20;
export const COINS_PER_CORRECT_ANSWER = 10;