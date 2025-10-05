<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Tomat', 'img_path' => '/gamesicon/tomatt.png'],
            ['name' => 'Kedelai', 'img_path' => '/gamesicon/ubi.png'],
            ['name' => 'Kacang Panjang', 'img_path' => '/gamesicon/buncis.png'],
            ['name' => 'Jagung', 'img_path' => '/gamesicon/jagung.png'],
            ['name' => 'Pisang', 'img_path' => '/gamesicon/pisang.png'],
            ['name' => 'Semangka', 'img_path' => '/gamesicon/semangka.png'],
            ['name' => 'Sawi', 'img_path' => '/gamesicon/sawi.png'],
            ['name' => 'Jeruk', 'img_path' => '/gamesicon/jerukk.png'],
        ];

        foreach ($items as $item) {
            $itemId = DB::table('item_games')->insertGetId(array_merge($item, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));

            $questions = [];

            switch ($item['name']) {
                case 'Tomat':
                    $questions = [
                        [
                            'question' => 'Tomat kaya akan zat apa yang baik untuk kesehatan mata?',
                            'options' => json_encode(['Vitamin A', 'Vitamin D', 'Protein', 'Zat Besi']),
                            'answer' => 'Vitamin A'
                        ],
                        [
                            'question' => 'Tomat adalah sumber utama dari zat apa yang memberi warna merah?',
                            'options' => json_encode(['Likopen', 'Kalsium', 'Zat Besi', 'Vitamin B12']),
                            'answer' => 'Likopen'
                        ],
                        [
                            'question' => 'Manfaat lain tomat bagi tubuh adalah ...',
                            'options' => json_encode(['Menurunkan risiko kanker', 'Meningkatkan kolesterol jahat', 'Meningkatkan gula darah', 'Menyebabkan dehidrasi']),
                            'answer' => 'Menurunkan risiko kanker'
                        ],
                    ];
                    break;

                case 'Kedelai':
                    $questions = [
                        [
                            'question' => 'Kedelai merupakan sumber utama dari zat gizi apa?',
                            'options' => json_encode(['Protein Nabati', 'Karbohidrat', 'Vitamin C', 'Air']),
                            'answer' => 'Protein Nabati'
                        ],
                        [
                            'question' => 'Salah satu manfaat kedelai ialah ...',
                            'options' => json_encode(['Membantu pembentukan otot', 'Menambah gula darah cepat', 'Mengurangi serat', 'Meningkatkan lemak jahat']),
                            'answer' => 'Membantu pembentukan otot'
                        ],
                        [
                            'question' => 'Produk olahan dari kedelai adalah ...',
                            'options' => json_encode(['Tahu & Tempe', 'Roti & Keju', 'Susu Sapi', 'Minyak Zaitun']),
                            'answer' => 'Tahu & Tempe'
                        ],
                    ];
                    break;

                case 'Kacang Panjang':
                    $questions = [
                        [
                            'question' => 'Kacang panjang kaya akan serat, bermanfaat untuk apa?',
                            'options' => json_encode(['Melancarkan pencernaan', 'Membentuk otot', 'Meningkatkan penglihatan', 'Menambah energi']),
                            'answer' => 'Melancarkan pencernaan'
                        ],
                        [
                            'question' => 'Vitamin apa yang banyak terdapat pada kacang panjang?',
                            'options' => json_encode(['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Vitamin K']),
                            'answer' => 'Vitamin C'
                        ],
                        [
                            'question' => 'Kacang panjang sering dikonsumsi sebagai ...',
                            'options' => json_encode(['Sayur lalapan', 'Minuman energi', 'Buah segar', 'Makanan instan']),
                            'answer' => 'Sayur lalapan'
                        ],
                    ];
                    break;

                case 'Jagung':
                    $questions = [
                        [
                            'question' => 'Zat apa yang ada pada jagung yang membantu menjaga rasa kenyang lebih lama?',
                            'options' => json_encode(['Karbohidrat', 'Vitamin C', 'Protein', 'Serat']),
                            'answer' => 'Karbohidrat'
                        ],
                        [
                            'question' => 'Jagung sering jadi sumber energi karena ...',
                            'options' => json_encode(['Kandungan karbohidratnya', 'Kandungan vitamin D', 'Kandungan protein tinggi', 'Kaya kalsium']),
                            'answer' => 'Kandungan karbohidratnya'
                        ],
                        [
                            'question' => 'Vitamin yang ada di jagung adalah ...',
                            'options' => json_encode(['Vitamin B kompleks', 'Vitamin K', 'Vitamin D', 'Vitamin A']),
                            'answer' => 'Vitamin B kompleks'
                        ],
                    ];
                    break;

                case 'Pisang':
                    $questions = [
                        [
                            'question' => 'Zat apa yang ada pada pisang yang membuatnya kaya energi?',
                            'options' => json_encode(['Karbohidrat', 'Protein', 'Lemak', 'Vitamin D']),
                            'answer' => 'Karbohidrat'
                        ],
                        [
                            'question' => 'Pisang juga kaya mineral apa yang membantu fungsi otot?',
                            'options' => json_encode(['Kalium', 'Zat Besi', 'Selenium', 'Yodium']),
                            'answer' => 'Kalium'
                        ],
                        [
                            'question' => 'Pisang dapat membantu pencernaan karena mengandung ...',
                            'options' => json_encode(['Serat', 'Protein', 'Vitamin D', 'Lemak']),
                            'answer' => 'Serat'
                        ],
                    ];
                    break;

                case 'Semangka':
                    $questions = [
                        [
                            'question' => 'Apa kandungan utama dalam semangka yang membuatnya menyegarkan?',
                            'options' => json_encode(['Air', 'Protein', 'Vitamin B12', 'Lemak']),
                            'answer' => 'Air'
                        ],
                        [
                            'question' => 'Vitamin apa yang ada dalam semangka?',
                            'options' => json_encode(['Vitamin C', 'Vitamin D', 'Vitamin K2', 'Vitamin B12']),
                            'answer' => 'Vitamin C'
                        ],
                        [
                            'question' => 'Semangka baik dikonsumsi di musim ...',
                            'options' => json_encode(['Panas', 'Dingin', 'Hujan', 'Gugur']),
                            'answer' => 'Panas'
                        ],
                    ];
                    break;

                case 'Sawi':
                    $questions = [
                        [
                            'question' => 'Zat apa yang membuat sawi baik untuk sistem imun?',
                            'options' => json_encode(['Vitamin C', 'Zat Besi', 'Karbohidrat', 'Protein']),
                            'answer' => 'Vitamin C'
                        ],
                        [
                            'question' => 'Sawi termasuk kelompok sayur ...',
                            'options' => json_encode(['Cruciferous', 'Umbi-umbian', 'Buah', 'Legum']),
                            'answer' => 'Cruciferous'
                        ],
                        [
                            'question' => 'Sawi juga mengandung ...',
                            'options' => json_encode(['Antioksidan', 'Kolesterol tinggi', 'Asam urat', 'Lemak trans']),
                            'answer' => 'Antioksidan'
                        ],
                    ];
                    break;

                case 'Jeruk':
                    $questions = [
                        [
                            'question' => 'Buah jeruk dikenal kaya akan vitamin apa?',
                            'options' => json_encode(['Vitamin C', 'Vitamin A', 'Vitamin D', 'Vitamin K']),
                            'answer' => 'Vitamin C'
                        ],
                        [
                            'question' => 'Selain vitamin C, jeruk memiliki antioksidan bernama ...',
                            'options' => json_encode(['Flavonoid', 'Lemak jenuh', 'Kolesterol', 'Asam urat']),
                            'answer' => 'Flavonoid'
                        ],
                        [
                            'question' => 'Jeruk biasanya dikonsumsi dalam bentuk ...',
                            'options' => json_encode(['Jus', 'Gorengan', 'Roti', 'Bubur']),
                            'answer' => 'Jus'
                        ],
                    ];
                    break;
            }

            foreach ($questions as $q) {
                DB::table('questations')->insert(array_merge($q, [
                    'item_game_id' => $itemId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]));
            }
        }
    }
}
