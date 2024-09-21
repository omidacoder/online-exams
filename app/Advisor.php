<?php

namespace App;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use SMartins\PassportMultiauth\HasMultiAuthApiTokens;

class Advisor extends Authenticatable
{
    use Notifiable, HasMultiAuthApiTokens;
    protected $table = 'advisors';
    protected $fillable = ['username' , 'name' , 'phone_number','national_code' , 'email'];
}
