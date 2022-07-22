<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table='comment';
    public $timestamps=false ;
    protected $primaryKey='id_comment';
    protected $fillable=['id_post','id_user','content', 'publish_time' ];
}
