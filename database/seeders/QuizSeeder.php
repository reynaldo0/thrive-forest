<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('quizzes')->insert([

            // TOMAT
            [
                'item_id' => 'tomato',
                'item_name' => 'Tomat',
                'img' => '/gamesicon/tomatt.png',
                'question' => 'Tomat kaya akan zat apa yang baik untuk kesehatan mata?',
                'options' => json_encode(['Vitamin A', 'Vitamin D', 'Protein', 'Zat Besi']),
                'answer' => 'Vitamin A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'tomato',
                'item_name' => 'Tomat',
                'img' => '/gamesicon/tomatt.png',
                'question' => 'Tomat adalah sumber utama dari zat apa yang memberi warna merah?',
                'options' => json_encode(['Likopen', 'Kalsium', 'Zat Besi', 'Vitamin B12']),
                'answer' => 'Likopen',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'tomato',
                'item_name' => 'Tomat',
                'img' => '/gamesicon/tomatt.png',
                'question' => 'Manfaat lain tomat bagi tubuh adalah ...',
                'options' => json_encode([
                    'Menurunkan risiko kanker',
                    'Meningkatkan kolesterol jahat',
                    'Meningkatkan gula darah',
                    'Menyebabkan dehidrasi'
                ]),
                'answer' => 'Menurunkan risiko kanker',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // KEDELAI
            [
                'item_id' => 'kedelai',
                'item_name' => 'Kedelai',
                'img' => '/gamesicon/ubi.png',
                'question' => 'Kedelai merupakan sumber utama dari zat gizi apa?',
                'options' => json_encode(['Protein Nabati', 'Karbohidrat', 'Vitamin C', 'Air']),
                'answer' => 'Protein Nabati',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'kedelai',
                'item_name' => 'Kedelai',
                'img' => '/gamesicon/ubi.png',
                'question' => 'Salah satu manfaat kedelai ialah ...',
                'options' => json_encode([
                    'Membantu pembentukan otot',
                    'Menambah gula darah cepat',
                    'Mengurangi serat',
                    'Meningkatkan lemak jahat'
                ]),
                'answer' => 'Membantu pembentukan otot',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'kedelai',
                'item_name' => 'Kedelai',
                'img' => '/gamesicon/ubi.png',
                'question' => 'Produk olahan dari kedelai adalah ...',
                'options' => json_encode(['Tahu & Tempe', 'Roti & Keju', 'Susu Sapi', 'Minyak Zaitun']),
                'answer' => 'Tahu & Tempe',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // KACANG PANJANG
            [
                'item_id' => 'kacang_panjang',
                'item_name' => 'Kacang Panjang',
                'img' => '/gamesicon/buncis.png',
                'question' => 'Kacang panjang kaya akan serat, bermanfaat untuk apa?',
                'options' => json_encode([
                    'Melancarkan pencernaan',
                    'Membentuk otot',
                    'Meningkatkan penglihatan',
                    'Menambah energi'
                ]),
                'answer' => 'Melancarkan pencernaan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'kacang_panjang',
                'item_name' => 'Kacang Panjang',
                'img' => '/gamesicon/buncis.png',
                'question' => 'Vitamin apa yang banyak terdapat pada kacang panjang?',
                'options' => json_encode(['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Vitamin K']),
                'answer' => 'Vitamin C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'kacang_panjang',
                'item_name' => 'Kacang Panjang',
                'img' => '/gamesicon/buncis.png',
                'question' => 'Kacang panjang sering dikonsumsi sebagai ...',
                'options' => json_encode(['Sayur lalapan', 'Minuman energi', 'Buah segar', 'Makanan instan']),
                'answer' => 'Sayur lalapan',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // JAGUNG
            [
                'item_id' => 'corn',
                'item_name' => 'Jagung',
                'img' => '/gamesicon/jagung.png',
                'question' => 'Zat apa yang ada pada jagung yang membantu menjaga rasa kenyang lebih lama?',
                'options' => json_encode(['Karbohidrat', 'Vitamin C', 'Protein', 'Serat']),
                'answer' => 'Karbohidrat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'corn',
                'item_name' => 'Jagung',
                'img' => '/gamesicon/jagung.png',
                'question' => 'Jagung sering jadi sumber energi karena ...',
                'options' => json_encode([
                    'Kandungan karbohidratnya',
                    'Kandungan vitamin D',
                    'Kandungan protein tinggi',
                    'Kaya kalsium'
                ]),
                'answer' => 'Kandungan karbohidratnya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'corn',
                'item_name' => 'Jagung',
                'img' => '/gamesicon/jagung.png',
                'question' => 'Vitamin yang ada di jagung adalah ...',
                'options' => json_encode(['Vitamin B kompleks', 'Vitamin K', 'Vitamin D', 'Vitamin A']),
                'answer' => 'Vitamin B kompleks',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // PISANG
            [
                'item_id' => 'banana',
                'item_name' => 'Pisang',
                'img' => '/gamesicon/pisang.png',
                'question' => 'Zat apa yang ada pada pisang yang membuatnya kaya energi?',
                'options' => json_encode(['Karbohidrat', 'Protein', 'Lemak', 'Vitamin D']),
                'answer' => 'Karbohidrat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'banana',
                'item_name' => 'Pisang',
                'img' => '/gamesicon/pisang.png',
                'question' => 'Pisang juga kaya mineral apa yang membantu fungsi otot?',
                'options' => json_encode(['Kalium', 'Zat Besi', 'Selenium', 'Yodium']),
                'answer' => 'Kalium',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'banana',
                'item_name' => 'Pisang',
                'img' => '/gamesicon/pisang.png',
                'question' => 'Pisang dapat membantu pencernaan karena mengandung ...',
                'options' => json_encode(['Serat', 'Protein', 'Vitamin D', 'Lemak']),
                'answer' => 'Serat',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // SEMANGKA
            [
                'item_id' => 'watermelon',
                'item_name' => 'Semangka',
                'img' => '/gamesicon/semangka.png',
                'question' => 'Apa kandungan utama dalam semangka yang membuatnya menyegarkan?',
                'options' => json_encode(['Air', 'Protein', 'Vitamin B12', 'Lemak']),
                'answer' => 'Air',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'watermelon',
                'item_name' => 'Semangka',
                'img' => '/gamesicon/semangka.png',
                'question' => 'Vitamin apa yang ada dalam semangka?',
                'options' => json_encode(['Vitamin C', 'Vitamin D', 'Vitamin K2', 'Vitamin B12']),
                'answer' => 'Vitamin C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'watermelon',
                'item_name' => 'Semangka',
                'img' => '/gamesicon/semangka.png',
                'question' => 'Semangka baik dikonsumsi di musim ...',
                'options' => json_encode(['Panas', 'Dingin', 'Hujan', 'Gugur']),
                'answer' => 'Panas',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // SAWI
            [
                'item_id' => 'broccoli',
                'item_name' => 'Sawi',
                'img' => '/gamesicon/sawi.png',
                'question' => 'Zat apa yang membuat sawi baik untuk sistem imun?',
                'options' => json_encode(['Vitamin C', 'Zat Besi', 'Karbohidrat', 'Protein']),
                'answer' => 'Vitamin C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'broccoli',
                'item_name' => 'Sawi',
                'img' => '/gamesicon/sawi.png',
                'question' => 'Sawi termasuk kelompok sayur ...',
                'options' => json_encode(['Cruciferous', 'Umbi-umbian', 'Buah', 'Legum']),
                'answer' => 'Cruciferous',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'broccoli',
                'item_name' => 'Sawi',
                'img' => '/gamesicon/sawi.png',
                'question' => 'Sawi juga mengandung ...',
                'options' => json_encode(['Antioksidan', 'Kolesterol tinggi', 'Asam urat', 'Lemak trans']),
                'answer' => 'Antioksidan',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // JERUK
            [
                'item_id' => 'jeruk',
                'item_name' => 'Jeruk',
                'img' => '/gamesicon/jerukk.png',
                'question' => 'Buah jeruk dikenal kaya akan vitamin apa?',
                'options' => json_encode(['Vitamin C', 'Vitamin A', 'Vitamin D', 'Vitamin K']),
                'answer' => 'Vitamin C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'jeruk',
                'item_name' => 'Jeruk',
                'img' => '/gamesicon/jerukk.png',
                'question' => 'Selain vitamin C, jeruk memiliki antioksidan bernama ...',
                'options' => json_encode(['Flavonoid', 'Lemak jenuh', 'Kolesterol', 'Asam urat']),
                'answer' => 'Flavonoid',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'item_id' => 'jeruk',
                'item_name' => 'Jeruk',
                'img' => '/gamesicon/jerukk.png',
                'question' => 'Jeruk biasanya dikonsumsi dalam bentuk ...',
                'options' => json_encode(['Jus', 'Gorengan', 'Roti', 'Bubur']),
                'answer' => 'Jus',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
