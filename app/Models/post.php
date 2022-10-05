<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    use HasFactory;
    protected $table='facebook_post';
    protected $primaryKey='id_post';
    protected $fillable=['id_fb_post','publish_time', 'content'];
    public $timestamps = false;
}