var dom=document.getElementById('clock');
var ctx=dom.getContext('2d');
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/200;//圆与外面框的比例


//画背景
function drawBackgroung(){
    ctx.save();//保存画之前的环境状态
    ctx.translate(r,r);//设置原点位置
    ctx.beginPath();//重置当前路径，重新起头划线
    ctx.lineWidth = 8*rem;//线宽度为8
    ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);//画圆（x,y,半径，起点坐标，终点坐标，顺时针false,逆时针true）   
    ctx.stroke();//绘制路径

    //填充数字
    var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font=14*rem+"px 黑体";
    ctx.textAlign="center";//垂直居中
    ctx.textBaseline='middle';//水平居中
    hourNumbers.forEach(function(number,i){//遍历hourNumbers
        var rad=2*Math.PI/12*i;//一个弧度=总弧度/12*索引
        var x=Math.cos(rad)*(r-22*rem);//x=cos*斜边
        var y=Math.sin(rad)*(r-22*rem);//y=sin*斜边
        ctx.fillText(number,x,y);//填充文本
    });

    //填充点
    for(i = 0; i < 60; i++){
        var rad=2*Math.PI/60*i;
        var x=Math.cos(rad)*(r-12*rem);
        var y=Math.sin(rad)*(r-12*rem);
        ctx.beginPath();
        //判断是否是数字对应点
        if(i % 5 === 0){
            ctx.fillStyle="#000";
            ctx.arc(x,y,2,0,2*Math.PI,false);            
        }else{
            ctx.fillStyle="#999";
            ctx.arc(x,y,1,0,2*Math.PI,false);
        }
        ctx.fill();//填充
    }
}

//绘制时针
function drawHour(hour,minute){
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/12*hour;
    var mrad=2*Math.PI/12/60*minute;
    //分针和时针关联起来
    ctx.rotate(rad+mrad);//旋转
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2);
    ctx.lineWidth=6;
    ctx.lineCap="round";
    ctx.stroke();
    ctx.restore();//返回之前保存过的路径状态和属性
}
//绘制分针
function drawMinute(minute){
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*minute;
    ctx.rotate(rad);
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r+26*rem);
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.stroke();
    ctx.restore();
}
//绘制秒针
function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*second;
    ctx.rotate(rad);
    ctx.moveTo(-2*rem,20*rem);
    ctx.lineTo(2*rem,20*rem);
    ctx.lineTo(1,-r+16*rem);
    ctx.lineTo(-1,-r+16*rem);
    ctx.fillStyle="#f00"
    ctx.fill();
    ctx.restore();
}
//绘制中心圆点
function drawDot(){
    ctx.beginPath();
    ctx.arc(0,0,3*rem,0,2*Math.PI,false);
    ctx.fillStyle="#fff";
    ctx.fill();
}
//动态时钟
function draw(){
    ctx.clearRect(0,0,width,height);//清空针原来走过的痕迹
    var now=new Date();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    drawBackgroung();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}

draw();
//每一秒执行
setInterval(draw,1000);
