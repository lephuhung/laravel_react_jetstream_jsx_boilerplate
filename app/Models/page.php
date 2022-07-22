<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class page extends Model
{
    use HasFactory;
    protected $table='page';
    protected $fillale=['id_fb_page', 'name_page', 'link_page'];
}
