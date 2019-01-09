// <?php echo $_SERVER['SERVER_ADDR'] ?>
ws =new WebSocket("ws://127.0.0.1:8123");
// ws =new WebSocket("ws://"+server_addr+":8123");
var hall={};
//客户端接收的status:0,进入大厅
ws.onopen=function(){
    hall.status=0;
    ws.send(JSON.stringify(hall));
}
ws.onmessage=function(data){
    var resp=JSON.parse(data.data);
    var room=resp.info;
    if(resp.status==0){
        var html='';
        var ulobj=document.querySelector('.hall ul');

        //假数据用户
        var uid=Math.floor(Math.random()*10);//模拟id
        var namearr=['依咕比咕','玛卡巴卡','汤布哩布','唔希比希','小点点','小豆豆','叮叮车','飞飞鱼','海绵宝宝','派大星'];
        var username=namearr[uid];
        localStorage.setItem('username',username);
        
        for(var i=0;i<room.length;i++){
            var status=null;
            var disable=' ';
            if(room[i].length==0){
                status='空桌';
            }else if(room[i].length==1){
                status='缺两人';
            }else if(room[i].length==2){
                status='缺一人';
            }else if(room[i].length==3){
                status='已满座';
                disable=' style="pointer-events: none;"';
            }
            html+=`<li><a href="room.php?rid=${i}&uid=${uid}&uname='${username}'" ${disable}><img src="./images/small_desk.jpg" alt=""></a><span>${i+1}号桌<i>(${status})</i></span></li>`
        }
        ulobj.innerHTML=html;
    }
    
}