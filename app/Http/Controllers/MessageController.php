<?php

namespace App\Http\Controllers;

use App\Chat;
use Hekmatinasser\Verta\Verta;
use App\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    // method for sending message
    public function userSend(Request $request){
        try {
            $student = Auth::user();
            //now sending for admin only
            $chat = DB::table('chats')->where('receiver' , '=' , $student->username)->first();
            if($chat ==null) {
                $chat = new Chat(['sender' => 'admin', 'receiver' => $student->username]);
                $chat->save();
            }

            $message = new Message([ 'content' => $request->messageContent, 'time' => Verta::now(), 'seen' => 'false' , 'is_sent' => 'false']);
            $message->save();
            $chat->messages()->save($message);
            return \response()->json(['status' => 's' , 'data' => [] , 'message' => 'پیام با موفقیت ارسال شد']  , 201);
        }
        catch(\Exception $exception){
            return response()->json(['status' => 'e', 'data' => [] , 'message' => $exception->getMessage() ] , 500);
        }
    }
    public function adminSend(Request $request){
        try {
            //now sending for receiver
            $chat = DB::table('chats')->where('receiver' , '=' , $request->receiverUsername)->first();
            if($chat ==null) {
                $chat = new Chat(['sender' => 'admin', 'receiver' => $request->receiverUsername]);
                $chat->save();
            }
            $message = new Message([ 'content' => $request->messageContent, 'time' => Verta::now(), 'seen' => 'false' , 'is_sent' => true]);
            $message->save();
            return \response()->json(['status' => 's' , 'data' => [] , 'message' => 'پیام با موفقیت ارسال شد']  , 201);
        }
        catch(\Exception $exception){
            return response()->json(['status' => 'e', 'data' => [] , 'message' => $exception->getMessage() ] , 500);

        }

    }
    public function getUserMessages(Request $request){
        //only get messages from admin for this user
        $studentUsername = Auth::user()->username;
        $messages = DB::table('messages')->where('sender' ,'=' ,'admin')->where('receiver' , '=' ,$studentUsername)->get();
        return \response()->json(['status' => 's' , 'data' => ['messages' => $messages] , 'message' => ''] , 200);

    }
    public function getAdminMessages(Request $request){
        //need to get contact username
        $messages = DB::table('messages')->where('sender' ,'=' ,$request->senderUsername)->where('receiver' , '=' ,'admin')->get();
        return \response()->json(['status' => 's' , 'data' => ['messages' => $messages] , 'message' => ''] , 200);

    }
    public function update(Request $request , $id){
        //implement in future
    }
    public function getAdminChatList(Request $request){
        $chats = DB::table('chats')->where('sender' , '=' , 'admin')->orWhere('receiver' , '=' ,'admin')->get();
        $usernames = [];
        foreach ($chats as $chat){
            $username = $chat->sender == 'admin' ? $chat->receiver : $chat->sender;
            if(!array_search($username , $usernames,false)){
                $usernames[] = $username;
            }
        }
        return response()->json(['status' => 's' , 'data' => ['usernames' => $usernames] , 'message' => ''] , 200);

    }
    public function delete($id){
        \App\Message::all()->find($id)->delete();
        return \response()->json(['status' => 's' , 'data' => [] , 'message' => 'پیام با موفقیت حذف شد']  , 201);

    }
}
