<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/room.css">
</head>
<body>
    <div class="box">
        <!-- 桌子,人物 ,位置-->
        <div class="desk">
            <button class="prep">请 准 备</button>
            <!-- <button class="deal_poker">发 牌</button> -->
            <div class="qianglandlord">
                <button class="qiang">抢地主</button>
                <button class="buqiang">不抢</button>
            </div>
            <div class="play-poker">
                <button class="no">不要</button>
                <button class="yes">出牌</button>
            </div>
            <a href="javascript:;"><img src="./images/big_desk.jpg" alt=""></a>
        </div>
        <div class="peasant1 person" id='next'>
            <span class='name'></span><a href="javascript:;"><img src="./images/peasant_1.jpg" alt=""></a><i></i>
        </div>
        <div class="peasant2 person" id="prev">
            <span class='name'></span><a href="javascript:;"><img src="./images/peasant_1.jpg" alt=""></a><i></i>
        </div>
        <div class="peasant3 person" id="my">
            <span class='name'></span><a href="javascript:;"><img src="./images/peasant_1.jpg" alt=""></a><i></i>
        </div>
        <!-- 三张地主牌 -->
        <div class="landlord3">
            <ul>
                
            </ul>
        </div>
        <!-- 手里扑克牌 -->
        <div class="poker">
            <ul>
                <!-- 出牌提示 -->
                <!-- <i class="prompt">大你</i> -->
                <!-- <i class="prompt">不要</i> -->
            </ul>
        </div>
        <!-- 刚打出的牌 -->
        <div class="just_play">
            <ul>
                
            </ul>
        </div>

    </div>
    <script src="./js/jquery.min.js"></script>
    <script>
        var my={};
        my.roomid= <?php echo $_GET['rid']; ?>;
        my.userid= <?php echo $_GET['uid']; ?>;
        my.username= <?php echo $_GET['uname']; ?>;
        var server_addr="120.77.200.21";
    </script>
    
    <script src="./js/room.js"></script>
</body>
</html>