
//a方块,b梅花,c红桃,d黑桃,e1小王，e2大王
//生成新牌的方法
function newpokerArr(){
    return [
                // 第一维每个元素代表一张牌的编号
                [//级13  1    2    3    4    5    6    7    8     9    10   11    12
                    'a2','a3','a4','a5','a6','a7','a8','a9','a10','aJ','aQ','aK','aA',
                    'b2','b3','b4','b5','b6','b7','b8','b9','b10','bJ','bQ','bK','bA',
                    'c2','c3','c4','c5','c6','c7','c8','c9','c10','cJ','cQ','cK','cA',
                    'd2','d3','d4','d5','d6','d7','d8','d9','d10','dJ','dQ','dK','dA',
                    'e1','e2'
                ],
                //第二维每一个元素代表第一维对应元素的属性
                [
                    // 第一个属性值为牌的大小级别,第二个为牌的名称,第三个为牌在雪碧图中的x坐标,第四为y坐标
                    //方块
                    [13,'2',0,0],[1,'3',68.5,0],[2,'4',68.5*2,0],[3,'5',68.5*3,0],[4,'6',68.5*4,0],[5,'7',68.5*5,0],[6,'8',68.5*6,0],
                    [7,'9',68.5*7,0],[8,'10',68.5*8,0],[9,'J',68.5*9,0],[10,'Q',68.5*10,0],[11,'K',68.5*11,0],[12,'A',68.5*12,0],
                    //梅花
                    [13,'2',0,94],[1,'3',68.5,94],[2,'4',68.5*2,94],[3,'5',68.5*3,94],[4,'6',68.5*4,94],[5,'7',68.5*5,94],[6,'8',68.5*6,94],
                    [7,'9',68.5*7,94],[8,'10',68.5*8,94],[9,'J',68.5*9,94],[10,'Q',68.5*10,94],[11,'K',68.5*11,94],[12,'A',68.5*12,94],
                    //红桃
                    [13,'2',0,188],[1,'3',68.5,188],[2,'4',68.5*2,188],[3,'5',68.5*3,188],[4,'6',68.5*4,188],[5,'7',68.5*5,188],[6,'8',68.5*6,188],
                    [7,'9',68.5*7,188],[8,'10',68.5*8,188],[9,'J',68.5*9,188],[10,'Q',68.5*10,188],[11,'K',68.5*11,188],[12,'A',68.5*12,188],
                    //黑桃
                    [13,'2',0,282],[1,'3',68.5,282],[2,'4',68.5*2,282],[3,'5',68.5*3,282],[4,'6',68.5*4,282],[5,'7',68.5*5,282],[6,'8',68.5*6,282],
                    [7,'9',68.5*7,282],[8,'10',68.5*8,282],[9,'J',68.5*9,282],[10,'Q',68.5*10,282],[11,'K',68.5*11,282],[12,'A',68.5*12,282],
                    //大小王
                    [14,'小王',68.5*13,0],[15,'大王',68.5*13,94],
                ]
            ];
}


//判断牌型
    
    //牌型函数
    function poker_type(arr){
        //生成变量=============================
        for(var i=0;i<arr.length;i++){
            eval("var p"+(i+1)+"="+mypokers[arr[i]][0]+";");
        }
        //====================================
        if(arr.length==1){
            outInfo(my.seat,'p',1,p1,'一个'+mypokers[arr[0]][1]);
        }else if(arr.length==2){
            if((p1==14&&p2==15)||(p1==15&&p2==14)){
                outInfo(my.seat,'ww',1,100,'王炸');
            }else if(p1==p2){
                outInfo(my.seat,'pp',1,p1,'对'+mypokers[arr[0]][1]);
            }else{
                outInfo(my.seat,0,0,0,0);
            }
        }else if(arr.length==3){
            if(p1==p2&&p2==p3){
                outInfo(my.seat,'ppp',1,p1,'三个'+mypokers[arr[0]][1]);
            }else{
                outInfo(my.seat,0,0,0,0);
            }
            
        }else if(arr.length==4){
            if(p1==p2&&p2==p3&&p3==p4){
                outInfo(my.seat,'pppp',1,p1,'炸弹');
            }else if(p1==p2&&p2==p3){
                outInfo(my.seat,'ppp1',1,p1,'三带一');
            }else if(p2==p3&&p3==p4){
                outInfo(my.seat,'ppp1',1,p4,'三带一');
            }else{
                outInfo(my.seat,0,0,0,0);
            }
        }else if(arr.length==5){
            if((p1==p2&&p2==p3)&&(p4==p5)){
                outInfo(my.seat,'ppp2',1,p1,'三带一对');
            }else if((p3==p4&&p4==p5)&&(p1==p2)){
                outInfo(my.seat,'ppp2',1,p5,'三带一对');
            }else if(p1<13){
                for(j=0;j<arr.length-1;j++){
                    if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                        outInfo(my.seat,0,0,0,0);
                        return;
                    }
                }
                outInfo(my.seat,'pn',5,p1,'顺子');
            }
        }else if(arr.length==6){
            if((p1==p2&&p2==p3&&p3==p4)){
                outInfo(my.seat,'pppp2',1,p1,'四带二');
            }else if((p3==p4&&p4==p5&&p5==p6)){
                outInfo(my.seat,'pppp2',1,p6,'四带二');
            }else if((p1==p2&&p2==p3&&p4==p5&&p5==p6)&&(p1==p6+1)&&(p1<13)){
                outInfo(my.seat,'pppn',2,p1,'飞机');
            }else if((p1==p2&&p3==p4&&p5==p6)&&(p1==p3+1)&&(p3==p5+1)&&(p1<13)){
                outInfo(my.seat,'ppn',3,p1,'连对');
            }else if(p1<13){
                for(j=0;j<arr.length-1;j++){
                    if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                        outInfo(my.seat,0,0,0,0);
                        return;
                    }
                }
                outInfo(my.seat,'pn',6,p1,'顺子');
            }
        }else if((p1<13)&&arr.length==7){
            for(j=0;j<arr.length-1;j++){
                if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                    outInfo(my.seat,0,0,0,0);
                    return;
                }
            }
            outInfo(my.seat,'pn',7,p1,'顺子');
        }else if((p1<13)&&arr.length==8){
            if((p1==p2&&p3==p4&&p5==p6&&p7==p8)&&(p1==p3+1)&&(p3==p5+1)&&(p5==p7+1)){
                outInfo(my.seat,'ppn',4,p1,'连对');
            }else{
                for(j=0;j<arr.length-1;j++){
                    if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                        outInfo(my.seat,0,0,0,0);
                        return;
                    }
                }
                outInfo(my.seat,'pn',7,p1,'顺子');
            }
        }else if((p1<13)&&arr.length==9){
            if((p1==p2&&p2==p3&&p4==p5&&p5==p6&&p7==p8&&p8==p9)&&(p1==p4+1)&&(p4==p7+1)){
                outInfo(my.seat,'pppn',3,p1,'飞机');
            }else{
                for(j=0;j<arr.length-1;j++){
                    if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                        outInfo(my.seat,0,0,0,0);
                        return;
                    }
                }
                outInfo(my.seat,'pn',9,p1,'顺子');
            }
        }else if((p1<13)&&arr.length==10){
            if((p1==p2&&p3==p4&&p5==p6&&p7==p8&&p9==p10)&&(p1==p3+1)&&(p3==p5+1)&&(p5==p7+1)&&(p7==p9+1)){
                outInfo(my.seat,'ppn',5,p1,'连对');
            }else{
                for(j=0;j<arr.length-1;j++){
                    if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                        outInfo(my.seat,0,0,0,0);
                        return;
                    }
                }
                outInfo(my.seat,'pn',10,p1,'顺子');
            }

        }else if((p1<13)&&(arr.length==11)){
            for(j=0;j<arr.length-1;j++){
                if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                    outInfo(my.seat,0,0,0,0);
                    return;
                }
            }
            outInfo(my.seat,'pn',11,p1,'顺子');
        }else if(arr.length==12&&(p1<13)){
            if((p1==p2&&p2==p3&&p4==p5&&p5==p6&&p7==p8&&p8==p9&&p10==p11&&p11==p12)&&(p1==p4+1)&&(p4==p7+1)&&(p7==p10+1)){
                outInfo(my.seat,'pppn',4,p1,'飞机');
            }else if((p1==p2&&p3==p4&&p5==p6&&p7==p8&&p9==p10&&p11==p12)&&(p1==p3+1)&&(p3==p5+1)&&(p5==p7+1)&&(p7==p9+1)&&(p9==p11+1)){
                outInfo(my.seat,'ppn',6,p1,'连对');
            }else{
                for(j=0;j<arr.length-1;j++){
                    if(mypokers[arr[j]][0] != mypokers[arr[j+1]][0] + 1){
                        outInfo(my.seat,0,0,0,0);
                        return;
                    }
                }
                outInfo(my.seat,'pn',12,p1,'顺子');
            }
        }else if(arr.length==13){
            outInfo(my.seat,0,0,0,0);
            return;
        }else if((p1<13)&&arr.length==14){
            if((p1==p2&&p3==p4&&p5==p6&&p7==p8&&p9==p10&&p11==p12&&p13==p14)&&(p1==p3+1)&&(p3==p5+1)&&(p5==p7+1)&&(p7==p9+1)&&(p9==p11+1)&&(p11==p13+1)){
                outInfo(my.seat,'ppn',7,p1,'连对');
            }else{
                outInfo(my.seat,0,0,0,0);
                return;
            }
        }else if((p1<13)&&arr.length==15){
            if((p1==p2&&p2==p3&&p4==p5&&p5==p6&&p7==p8&&p8==p9&&p10==p11&&p11==p12&&p13==p14&&p14==p15)&&(p1==p4+1)&&(p4==p7+1)&&(p7==p10+1)&&(p10==p13+1)){
                outInfo(my.seat,'pppn',5,p1,'飞机');
            }else{
                outInfo(my.seat,0,0,0,0);
                return;
            }
        }else if((p1<13)&&arr.length==16){
            if((p1==p2&&p3==p4&&p5==p6&&p7==p8&&p9==p10&&p11==p12&&p13==p14&&p15==p16)&&(p1==p3+1)&&(p3==p5+1)&&(p5==p7+1)&&(p7==p9+1)&&(p9==p11+1)&&(p11==p13+1)&(p13==p15+1)){
                outInfo(my.seat,'ppn',8,p1,'连对');
            }
        }else{
            outInfo(my.seat,0,0,0,0);
            return;
        }

    }



//比较与上家出牌的大小vs(前者出牌,当前出牌)
function vs(prev,out){
    if(out.pokerModel==0){
        return false;
    }else if(Object.keys(prev).length==0){
            prevPokerInfo.seatId=out.seatId;
            prevPokerInfo.pokerModel=out.pokerModel;
            prevPokerInfo.pokerMax=out.pokerMax;
            prevPokerInfo.prompt=out.prompt;
            prevPokerInfo.pokerLen=out.pokerLen;
            play_poker();
    }else if(out.pokerModel===prev.pokerModel){
        if(out.pokerModel==='pn'||out.pokerModel==='ppn'||out.pokerModel==='pppn'){
            if(out.pokerLen==prev.pokerLen){
                if(out.pokerMax>pre.pokerMax){
                    prevPokerInfo.seatId=out.seatId;
                    prevPokerInfo.pokerModel=out.pokerModel;
                    prevPokerInfo.pokerMax=out.pokerMax;
                    prevPokerInfo.prompt=out.prompt;
                    prevPokerInfo.pokerLen=out.pokerLen;
                    play_poker();
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            if(out.pokerMax>prev.pokerMax){
                prevPokerInfo.seatId=out.seatId;
                prevPokerInfo.pokerModel=out.pokerModel;
                prevPokerInfo.pokerMax=out.pokerMax;
                prevPokerInfo.prompt=out.prompt;
                prevPokerInfo.pokerLen=out.pokerLen;
                play_poker();
            }else{
                return false;
            }
        }
    }else if(out.pokerModel==='ww'){
            prevPokerInfo.seatId=out.seatId;
            prevPokerInfo.pokerModel=out.pokerModel;
            prevPokerInfo.pokerMax=out.pokerMax;
            prevPokerInfo.prompt=out.prompt;
            prevPokerInfo.pokerLen=out.pokerLen;
            play_poker();
    }else if(out.pokerModel==='pppp'){
        if(prev.pokerModel==='ww'){
            return false;
        }else{
            prevPokerInfo.seatId=out.seatId;
            prevPokerInfo.pokerModel=out.pokerModel;
            prevPokerInfo.pokerMax=out.pokerMax;
            prevPokerInfo.prompt=out.prompt;
            prevPokerInfo.pokerLen=out.pokerLen;
            play_poker();
        }
    }else{
        return false;
    }
}


//我在此房间的信息，，，，，userid用户id，seat座位号，pokers手里的牌编号，outstatus出牌状态（1出牌，2跟牌，3刚出过牌）standing身份（1农民，2地主）,linestatus在线状态


// 全幅扑克牌信息
    var pokerArr=newpokerArr();
    var sort_pokerArr=[];
    var deal_pokerArr=[];
    var mypokers;
    var just_poker_arr;
    var landlord3;
    var select_pokers=[];
// ============================================

//发牌，不同牌保存不同数组====================
    // var deal_pokerArr=[];
    function deal_pokers(arr){
        deal_pokerArr[0]=arr.slice(0,17);
        deal_pokerArr[1]=arr.slice(17,34);
        deal_pokerArr[2]=arr.slice(34,51);
        deal_pokerArr[3]=arr.slice(51);  //地主三张牌
    }   
// ================================================================================

//我手里的牌===================================   
    var newpokerArr=newpokerArr();//需要从新初始化整副牌数据，之前打乱过排序，手里的乱牌无法对比排序
    // var mypokers;
    function mypokersfun(arr,n){   //arr 分好的三分牌  n 三份牌中自己对应的牌的索引 window.mypokers = functon
        var pokers=[];
        var sort_before=arr[n]; //我手里混乱的牌
        for(var i=0;i<sort_before.length;i++){
            var index=newpokerArr[0].indexOf(sort_before[i]);
            var poker_info=newpokerArr[1][index];
            pokers.push(poker_info);
        }
        //重新排序
        pokers.sort(function(a,b){
                a = a[0];
                b = b[0];
                if(a < b){
                    return 1;
                }
                if(a > b){
                    return -1;
                }
        });
        mypokers=pokers;
    }
//=======================================================================
//刚刚打出去的牌===================================   
// var just_poker_arr;
function just_pokerfun(mypokers,select_pokers){  
    var pokers=[];
    for(var i=0;i<select_pokers.length;i++){
        var poker_info=mypokers[select_pokers[i]];
        pokers.push(poker_info);
    }
    //重新排序
    pokers.sort(function(a,b){
            a = a[0];
            b = b[0];
            if(a < b){
                return 1;
            }
            if(a > b){
                return -1;
            }
    });
    just_poker_arr=pokers;
}
//=======================================================================

//显示手中牌到屏幕============================
    function show_pokers(arr){
        var html='';
        for(var i=0;i<arr.length;i++){
            if(i==0){
                html+="<li style='background-position:-"+arr[i][2]+"px -"+arr[i][3]+"px'title='"+arr[i][1]+"'></li>";
            }else{
                html+="<li style='margin-left:-38px;background-position:-"+arr[i][2]+"px -"+arr[i][3]+"px' title='"+arr[i][1]+"'></li>";
            }
        }
        $('.poker ul').html(html);
        play_poker();
    }
// ===========================================================================

//显示刚打出去的牌
    function show_just_play(arr){
        var html="";
        for(var i=0;i<arr.length;i++){
            if(i==0){
                html+="<li style='background-position:-"+arr[i][2]+"px -"+arr[i][3]+"px'title='"+arr[i][1]+"'></li>";
            }else{
                html+="<li style='margin-left:-38px;background-position:-"+arr[i][2]+"px -"+arr[i][3]+"px'title='"+arr[i][1]+"'></li>";
            }
        }
        $('.just_play ul').html(html);
        play_poker();
    }

//显示三张地主牌===================
    // var landlord3;
    function landlord3fun(arr){
        var pokers=[];
        for(var i=0;i<arr.length;i++){
            var index=newpokerArr[0].indexOf(arr[i]);
            var poker_info=newpokerArr[1][index];
            pokers.push(poker_info);
        }
        var html="";
        for(var i=0;i<pokers.length;i++){
            if(i==0){
                html+="<li style='background-position:-"+pokers[i][2]+"px -"+pokers[i][3]+"px'></li>";
            }else{
                html+="<li style='margin-left:-38px;background-position:-"+pokers[i][2]+"px -"+pokers[i][3]+"px'></li>";
            }
        }
        $('.landlord3 ul').html(html);

    }
// ========================================================================================

// 选中的牌================================
    // var select_pokers=[];
    function select(thisobj){
        var val=thisobj.index();
        var k=$.inArray(val,select_pokers);
        if(k<0){
            select_pokers.push(val); 
            thisobj.css('margin-top',"-30px");
        }else{
            select_pokers.splice(k,1);
            thisobj.css('margin-top',"0px");
        }
        select_pokers.sort(function(a,b){
            return a-b;
        });        
        poker_type(select_pokers);
    } 
// =================================================================================



//刚才出牌信息{几号座位'seatId':2,牌型pokerModel:（0:牌型不符合,p:单张,pn:顺子,pp:对,ppn:连对,ppp:三个,ppp1:三带一,ppp2:三带2,pppn:飞机,pppp:炸弹,pppp2四带二,ww王炸......),
            // 长度pokerLen:1,牌型中最大牌级别pokerMax:1,提示信息prompt:'三带一'};
// var prevPokerInfo={'seatId':2,'pokerModel':'pp','pokerLen':1,'pokerMax':5,'prompt':'对7'};
var prevPokerInfo={};
//此时出牌信息;
var outPokerInfo={};
//保存此时出牌信息
function outInfo(seatId,pokerModel,pokerLen,pokerMax,prompt){
    outPokerInfo.seatId=seatId;
    outPokerInfo.pokerModel=pokerModel;
    outPokerInfo.pokerLen=pokerLen;
    outPokerInfo.pokerMax=pokerMax;
    outPokerInfo.prompt=prompt;
}


//长连接请求(推送信息)================================================================================

// ws =new WebSocket("ws://192.168.13.191:8123");
ws =new WebSocket("ws://"+server_addr+":8123");

var data_json={};//保存请求数据
data_json.info=my;
ws.onopen=function(){
    data_json.status=1; //返回一个状态值，服务器根据状态值判断要怎么做
    ws.send(JSON.stringify(data_json));
}
ws.onmessage=function(dataArr){
    var data=JSON.parse(dataArr.data);
    var myname,nextname,prevname;
    var myinfo,nextinfo,previnfo;
    console.log(my.roomid);
        console.log(data.roomid);
    if(my.roomid==data.roomid){
        
        if(data.status==1){  //人数不足可以进入房间
            if(data.username.length==2){
                if(data.seatid==0){
                    myname=data.username[0];
                    nextname=data.username[1];
                    prevname='位置空缺';
                }else{
                    myname=data.username[1];
                    prevname=data.username[0];
                    nextname='位置空缺';
                }
            }else{
                myname=data.username[0];
                nextname='位置空缺';
                prevname='位置空缺';
            };
            my.seat=data.seatid;
        }else if(data.status==2){   //此人进入房间后人数刚好
            my.seat=data.seatid;
            if(data.seatid==0){
                myname=data.username[0];
                nextname=data.username[1];
                prevname=data.username[2];
            }else if(data.seatid==1){
                myname=data.username[1];
                prevname=data.username[0];
                nextname=data.username[2];
            }else{
                myname=data.username[2];
                prevname=data.username[1];
                nextname=data.username[0];
            }
            $(".prep").css("display",'block');
            $(".person i").html('未准备');
            $("#my i").html('');

        }else if(data.status==3){   //人齐后每个玩家开始准备
            if((data.seatid==0&&data.prep==1)||(data.seatid==1&&data.prep==2)||(data.seatid==2&&data.prep==0)){
                nextinfo="已准备";
            }else if((data.seatid==0&&data.prep==2)||(data.seatid==1&&data.prep==0)||(data.seatid==2&&data.prep==1)){
                previnfo="已准备";
            }
            
        }else if(data.status==4){   //都已准备好后，开始发牌
            $(".person i").html('');
            if((data.seatid==0&&data.first_qiang==1)||(data.seatid==1&&data.first_qiang==2)||(data.seatid==2&&data.first_qiang==0)){
                nextinfo="开始抢地主......";
            }else if((data.seatid==0&&data.first_qiang==2)||(data.seatid==1&&data.first_qiang==0)||(data.seatid==2&&data.first_qiang==1)){
                previnfo="开始抢地主......";
            };
            sort_pokerArr=data.sort_pokers;
            deal_pokers(sort_pokerArr);     //牌分组
            mypokersfun(deal_pokerArr,data.seatid); //根据座位id发牌
            show_pokers(mypokers);
            if(data.first_qiang==data.seatid){
                $(".qianglandlord").css('display','block');
            }
        }else if(data.status==5){  //抢地主中
            if((data.seatid==0&&data.qiangid==1)||(data.seatid==1&&data.qiangid==2)||(data.seatid==2&&data.qiangid==0)){
                if(data.qiangstatus){
                    nextinfo="抢地主";
                }else{
                    nextinfo="不抢";
                }
            }else if((data.seatid==0&&data.qiangid==2)||(data.seatid==1&&data.qiangid==0)||(data.seatid==2&&data.qiangid==1)){
                $(".qianglandlord").css('display','block');
                if(data.qiangstatus){
                    previnfo="抢地主";
                }else{
                    previnfo="不抢";
                }
            }
            if("first_qiangid" in data){
                if(data.seatid==data.first_qiangid){
                    $(".qianglandlord").css('display','block');

                }
            }
        }else if(data.status==6){ //确定地主,可以出牌
            $(".person i").html('');
            if((data.seatid==0&&data.last_qiangid==1)||(data.seatid==1&&data.last_qiangid==2)||(data.seatid==2&&data.last_qiangid==0)){
            $("#next img").attr("src","./images/landlord.png");
            }else if((data.seatid==0&&data.last_qiangid==2)||(data.seatid==1&&data.last_qiangid==0)||(data.seatid==2&&data.last_qiangid==1)){
                $("#prev img").attr("src","./images/landlord.png");
            }else if(data.seatid==data.last_qiangid){
                deal_pokerArr[data.seatid]=deal_pokerArr[data.seatid].concat(deal_pokerArr[3]);
                mypokersfun(deal_pokerArr,data.seatid); 
                show_pokers(mypokers);
                $("#my img").attr("src","./images/landlord.png");
                $(".play-poker").css('display','block');
                $(".play-poker .no").css('display','none');
            }
            landlord3fun(deal_pokerArr[3]);
        }else if(data.status==7){  //出牌中
            if(data.seatid==data.next_play){
                $(".play-poker").css('display','block');
                $(".play-poker button").css('display','block');
            }
            if(data.playstatus){
                prevPokerInfo=data.prevPokerInfo;
                show_just_play(data.just_poker_arr);
                var clientinfo=data.prevPokerInfo.prompt;
            }else{
                var clientinfo="要不起";
                if(data.next_play==prevPokerInfo.seatId){
                    
                    prevPokerInfo={};
                    $(".play-poker .no").css('display','none');
                }
            }
            if((data.seatid==0&&data.play_seatid==1)||(data.seatid==1&&data.play_seatid==2)||(data.seatid==2&&data.play_seatid==0)){
                nextinfo=clientinfo;
            }else if((data.seatid==0&&data.play_seatid==2)||(data.seatid==1&&data.play_seatid==0)||(data.seatid==2&&data.play_seatid==1)){
                previnfo=clientinfo;
            }
            
        }else if(data.status==8){  //游戏结束，
            alert(data.wininfo);
            $(".poker").html('');
            $(".landlord3").html('');
            $(".just_play").html('');
            $("#my img,#prev img,#next img").attr("src","./images/peasant_1.jpg");
            data_json.status=10;
            ws.send(JSON.stringify(data_json));
        }else if(data.status==10){  //重新开始
            alert('游戏结束');
            pokerArr=newpokerArr();
            sort_pokerArr=[];
            deal_pokerArr=[];
            select_pokers=[];
            window.location.reload(); 
        }
    //页面实时显示的信息=========================
        //用户名称展示
        $("#my .name").html(myname);
        $("#next .name").html(nextname);
        $("#prev .name").html(prevname);
        //用户此时行为信息展示
        $("#my i").html(myinfo);
        $("#next i").html(nextinfo);
        $("#prev i").html(previnfo);
    };
};
ws.onclose=function(){  //客户端断开连接
    my={};
    alert('已断开连接');
    location.href="hall.php";
};

//各种点击事件===========================================================
$(".prep").click(function(){    //点击准备按钮
    $(this).css('display','none');
    $("#my i").html('已准备');
    data_json.status=2;
    ws.send(JSON.stringify(data_json));
});
$(".qianglandlord .qiang").click(function(){     //点击抢地主按钮
    $(".qianglandlord").css("display",'none');
    $("#my i").html("抢地主");
    data_json.status=3;
    data_json.qiangstatus=true;
    ws.send(JSON.stringify(data_json));
});
$(".qianglandlord .buqiang").click(function(){     //点击不抢地主按钮
    $(".qianglandlord").css("display",'none');
    $("#my i").html("不抢");
    data_json.status=3;
    data_json.qiangstatus=false;
    ws.send(JSON.stringify(data_json));
});
$(".poker").on('click','li',function(){  //点击牌,选择要出的牌
    var thisobj=$(this);
    select(thisobj);
});
//每次重新整理牌后为出牌按钮添加点击事件===================
$('.play-poker .yes').click(function(){
    if(vs(prevPokerInfo,outPokerInfo)!=false){
        data_json.status=4;
        data_json.playstatus=true;
        data_json.prevPokerInfo=prevPokerInfo;
        just_pokerfun(mypokers,select_pokers); //保存刚刚出的牌
        data_json.just_poker_arr=just_poker_arr;
        
        for(var i=select_pokers.length-1;i>=0;i--){
            mypokers.splice(select_pokers[i],1);
        }
        data_json.mypokers=mypokers;
        show_pokers(mypokers);
        show_just_play(just_poker_arr);
        select_pokers=[];
        ws.send(JSON.stringify(data_json));
        $('.play-poker').css('display','none');
    }else{
        alert('不符合出牌规则，请重新出牌');
    }
});
$('.play-poker .no').click(function(){
        data_json.status=4;
        data_json.playstatus=false;
        ws.send(JSON.stringify(data_json));
        $('.play-poker').css('display','none');
        $("#my i").html("不要");
});
//客户端接收的status:-1人已满不允许再进入，1,人数不足可以进入房间，2人数刚好可以准备，3，正在准备，4已准备好可以发牌，5开始抢地主，6确定地主,7出牌
 
