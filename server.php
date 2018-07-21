<?php
    require_once 'Workerman/Autoloader.php';
    use Workerman\Worker;
    // use Workerman\Protocols\Http;
    $room=[[],[],[],[]];
    $clients=[];
    $btn_num=0;//用于判断几人已经点击过按钮(准备，抢地主)
    $play_poker=[];//用于保存刚打出的牌
    $first_qiangid=null;
    $first_qiang_status=null;
    $last_qiangid=null;
    $pokers=[
        'a2','a3','a4','a5','a6','a7','a8','a9','a10','aJ','aQ','aK','aA',
        'b2','b3','b4','b5','b6','b7','b8','b9','b10','bJ','bQ','bK','bA',
        'c2','c3','c4','c5','c6','c7','c8','c9','c10','cJ','cQ','cK','cA',
        'd2','d3','d4','d5','d6','d7','d8','d9','d10','dJ','dQ','dK','dA',
        'e1','e2'
    ];

    $worker=new Worker("websocket://0.0.0.0:8123");
    $worker->onConnect=function($connection){
       
    };

    $worker->onMessage=function($connection,$data){
        global $worker,$room,$clients,$pokers,$btn_num,$play__poker,$first_qiangid,$first_qiang_status,$last_qiangid;
        $req=json_decode($data);
//(处理业务)服务器接收的status:0进入大厅，1进入房间，2正在准备，3开始抢地主，4确定地主，5出牌
        if($req->status==0){ //进入大厅
            $resp->status=0; //返回一个状态值，客户端根据状态值判断要怎么做
            $resp->info=$room;
            $connection->send(json_encode($resp));
        }else if($req->status==1){ //进入房间

            foreach($worker->connections as $c){    //给所有客户端推送消息
                if($c->seatid==$connection->seatid){
                    $resp->roomid=$connection->roomid;
                    $resp->seatid=$c->seatid;
                    $c->send(json_encode($resp));
                }
                
            };

            $rid=$req->info->roomid; //进入房间id索引值
            $count=count($room[$rid]); //刚进去时的房间人数 
            //保存每个客户端信息，状态
            $connection->linestatus=1;
            $connection->seatid=$count;
            $connection->roomid=$req->info->roomid;
            $connection->username=$req->info->username;     
            $clients[$req->roomid][]=$connection->username;    
            $room[$rid][]=$req->info->userid;//把自己保存到room里，填充人数,用于大厅显示人数
            $resp->seatid=$count;
            $resp->username=$clients[$req->roomid];  
            if($count==2){
                $resp->status=2;
            }else if($count<2){
                $resp->status=1;
                
            }
        }else if($req->status==2){ //正在准备
            $btn_num++;
            if($btn_num==3){
                $btn_num=0;
                $resp->status=4;   
                $resp->info=$clients;
                $resp->prep=$connection->seatid;
                //洗牌
                for($i=0;$i<54;$i++){
                    $a=rand(0,53);
                    $b=rand(0,53);
                    $temp=$pokers[$a];
                    $pokers[$a]=$pokers[$b];
                    $pokers[$b]=$temp;
                };
                $resp->sort_pokers=$pokers; //保存洗后的牌
                $fq_id=rand(0,2);   //随机生成第一个开始抢地主的人
                $first_qiangid=$fq_id;   //保存第一个开始抢地主的人
                $resp->first_qiang=$first_qiangid;
            }else{
                $resp->status=3;
                $resp->info=$clients;
                $resp->prep=$connection->seatid;
            }
        }else if($req->status==3){ //抢地主
                $btn_num++;
                $resp->status=5;
                $resp->info=$clients;
                $resp->qiangid=$connection->seatid; //保存刚点击过按钮的用户
                if($req->qiangstatus){
                    $resp->qiangstatus=true;
                    $last_qiangid=$connection->seatid; //保存最后一次抢地主的人id
                }else{
                    $resp->qiangstatus=false;
                };
                if($btn_num==1){
                    if($req->qiangstatus){      //地主第一次抢时，判断是否抢，若是，返回true,让第一个人可以再抢一次
                        $first_qiang_status=true;  
                    }else{
                        $first_qiang_status=false;
                    }
                }else if($btn_num==3){
                    $resp->first_qiangid=$first_qiangid;
                    if(!$first_qiang_status){
                        $btn_num=0;
                        $resp->status=6;
                    };
                }else if($btn_num==4){
                    $btn_num=0;
                    $resp->first_qiangid=$first_qiangid;
                    $resp->last_qiangid=$last_qiangid;
                    $resp->status=6;
                };     
        }else if($req->status==4){  //出牌中
            $resp->status=7;
            if($connection->seatid==0){
                $resp->next_play=1;
            }else if($connection->seatid==1){
                $resp->next_play=2;
            }else if($connection->seatid==2){
                $resp->next_play=0;
            };
            if($req->playstatus){ //出牌
                $resp->playstatus=true;
                $resp->prevPokerInfo=$req->prevPokerInfo;
                $resp->just_poker_arr=$req->just_poker_arr;
                if(count($req->mypokers)==0){  //游戏结束，判断是地主胜利，还是农民胜利
                    $resp->status=8;
                    if($connection->seatid==$last_qiangid){
                        $resp->wininfo='地主:'.$connection->username."-胜！";
                    }else{
                        $resp->wininfo="农民:".$connection->username."-胜！";
                    }
                }else if(count($req->mypokers)==2){
                    $req->prevPokerInfo->prompt="我就剩两张啦!";
                };
            }else{  //不出牌
                $resp->playstatus=false;
            };
            
            $resp->play_seatid=$connection->seatid;
            
        }else if($req->status==10){
            $resp->status=10;
        }

        foreach($worker->connections as $c){    //给所有客户端推送消息
            $resp->roomid=$connection->roomid;
            $resp->seatid=$c->seatid;
            $c->send(json_encode($resp));
        };

    };

//(处理业务)服务器接收的status:0进入大厅，1进入房间，2正在准备，3开始抢地主，4出牌，

    $worker->onClose=function(){
        
        
    };
    Worker::runAll();
