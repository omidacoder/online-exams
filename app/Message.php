<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';
    protected $fillable = ['sender' , 'receiver' , 'content' , 'time' , 'seen' , 'is_sent'];
    public function chat(){
        return $this->belongsTo(Chat::class);
    }

}
