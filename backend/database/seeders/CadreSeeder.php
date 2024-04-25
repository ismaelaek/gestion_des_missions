<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CadreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'cadreLibelle_ar' => 'كاتب الضبط',
                'created_at' => '2024-04-19 12:40:22',
                'updated_at' => '2024-04-19 12:40:22',
            ],
            [
                'cadreLibelle_ar' => 'محرر قضائي',
                'created_at' => '2024-04-19 12:40:22',
                'updated_at' => '2024-04-19 12:40:22',
            ],
            [
                'cadreLibelle_ar' => 'منتدب قضائي',
                'created_at' => '2024-04-19 12:40:22',
                'updated_at' => '2024-04-19 12:40:22',
            ],
        ];

        DB::table('cadres')->insert($data);
    }
}
