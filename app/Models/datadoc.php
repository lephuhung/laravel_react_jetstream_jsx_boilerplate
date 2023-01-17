<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class datadoc extends Model
{
    use HasFactory;
    protected $connection='pgsql';
    protected $table='datadoc';
    protected $fillable=['article_id', 'topic', 'href', 'publish_date' ,
        'newspapper', 'created_date', 'language', 'sapo', 'content', 'feature_iamge'
];
}
