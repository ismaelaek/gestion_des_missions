<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DirectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $directions = [
            [
                'DirLibelle_ar' => 'مديرية الشؤون المدنية والمهن القانونية والقضائية',
                'DirLibelle_fr' => 'Direction des Affaires Civiles et des Professions Juridiques et Judiciaires',
            ],
            [
                'DirLibelle_ar' => 'مديرية الشؤون الجنائية والعفو ورصد الجريمة',
                'DirLibelle_fr' => 'Direction des Affaires Criminelles, de la Grâce et de la Surveillance Criminelle',
            ],
            [
                'DirLibelle_ar' => 'مديرية التحديث ونظم المعلومات',
                'DirLibelle_fr' => "Direction de la Modernisation et des Systèmes d''Information",
            ],
            [
                'DirLibelle_ar' => 'مديرية التشريع والدراسات',
                'DirLibelle_fr' => 'Direction de la Législation et des Études',
            ],
            [
                'DirLibelle_ar' => 'مديرية الموارد البشرية',
                'DirLibelle_fr' => 'Direction des Ressources Humaines',
            ],
            [
                'DirLibelle_ar' => 'مديرية الميزانية',
                'DirLibelle_fr' => 'Direction du Budget',
            ],
            [
                'DirLibelle_ar' => 'مديرية التجهيز وتدبير الممتلكات',
                'DirLibelle_fr' => "Direction de l'Équipement et de la Gestion des Biens",
            ],
            [
                'DirLibelle_ar' => 'مديرية التعاون والتواصل',
                'DirLibelle_fr' => 'Direction de la Coopération et de la Communication',
            ],
        ];

        foreach ($directions as $direction) {
            DB::table('directions')->insert([
                'DirLibelle_ar' => $direction['DirLibelle_ar'],
                'DirLibelle_fr' => $direction['DirLibelle_fr'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
