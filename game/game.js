var i = 0;
let game = function() {
    //初始化
    let top = document.getElementsByClassName('top')[0];
    let main = document.getElementsByClassName('main')[0];
    let foot = document.getElementsByClassName('foot')[0];
    let con = main.getElementsByClassName('container')[0];
    let speed = 500;
    let score = 0;
    let i = 0;
    //检测用的数组
    let blockArr = [];

    //用setInterval操作循环
    let timer = setInterval(function() {
        //移动
        con.style.bottom = parseInt(con.style.bottom) - 1 + 'px';
        i++;
        //插入一行新元素
        if(i % 100 == 0 && i != 0) {
            insertBlocks(blockArr);
            //死亡判断，把i传入
            if(isDeath(i, blockArr)) {
                clearInterval(timer);
                con.innerHTML = '';
                alert('游戏结束\n您的得分为: ' + score);
                score = 0;
                chgScore(top ,score);
                //注销事件
                main.onclick = null;
                //容器复位
                con.style.bottom = '500px';
                blockArr = []
            }   
        }
            
    }, speed/100);

    main.onclick = function(ev) {
        let el = ev.target;
        //非白块
        if(el.classList.contains('block') && !el.classList.contains('block-wt')) {
            //变白
            el.classList.add('block-wt');
            el.classList.remove('block-rd');
            el.classList.remove('block-gr');
            el.classList.remove('block-bl');
            //加分
            score += 10;
            chgScore(top, score);
            //加速，每200分加速一次
            if(score % 200 == 0 && speed >= 500) {
                speed -= 100;
            }
        }
        //白块和没有方块的位置
        else {
            clearInterval(timer);
            con.innerHTML = '';
            alert('游戏结束\n您的得分为: ' + score);
            score = 0;
            chgScore(top ,score);
            //注销事件
            main.onclick = null;
            //容器复位
            con.style.bottom = '500px';
            blockArr = [];
        }
    }   
}

let chgScore = function(el, n) {
    el.innerHTML = '当前积分: ' + n;
}

let insertBlocks = function(blockArr) {
    let con = document.getElementsByClassName('container')[0];
    for(let i = 0; i < 4; i++) {
        let block = buildBlock();
        //顶部插入
        blockArr.push(block);
        con.insertBefore(block, con.firstChild);
    }
}

let buildBlock = function() {
    //创建基础方块
    let block = document.createElement('li');
    block.classList.add('block');
    //用随机数决定方块颜色
    var rm = Math.random();
    //白块
    if(rm < 0.7) {
        block.classList.add('block-wt');
    }
    //红块
    else if(rm >= 0.7 && rm < 0.8) {
        block.classList.add('block-rd');
    }
    //绿块
    else if(rm >= 0.8 && rm < 0.9) {
        block.classList.add('block-gr');
    }
    //蓝块
    else  {
        block.classList.add('block-bl');
    }
    return block
}

//把计数值i传入函数进行判断,根据帧数选取ul中li进行判断
//如选取色块有非白色就死了
let isDeath = function(time, blockArr) {
    //不到500ms必然不死
    if(time < 500) {
        return false;
    }
    if(time % 100 == 0) {
        for(let i = 0; i < 4; i++) {
            let el = blockArr.shift();
            let death = !el.classList.contains('block-wt');
            if(death) {
                return true;
            }
        }
        return false;
    }
    return false;
}