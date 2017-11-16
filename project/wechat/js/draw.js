function smear(context,x,y){//修改标头
    context.beginPath();
    context.moveTo(x,y);
    context.rect(x,y,100,40);//画出矩形
    context.fillStyle = "#2C2727";   //选择油漆桶的颜色
    context.fill();                //确定填充
    context.stroke();
}

function drawName(context,x,y){//写对方名字
    context.beginPath();
    context.moveTo(x,y);
    //1. 使用`font`设置字体。
    context.font = "25px serif";
    //2. 使用`fillStyle`设置字体颜色。
    context.fillStyle = "#ffffff";
    //3. 使用`fillText()`方法显示字体。
    context.fillText(Name,x,y);
    context.stroke();
}
/************************************************************************************************************ */




//画圆角矩形
function getRectangle(context,x, y, w, h, r){//x,y是矩形的起点;w,h是矩形的宽高;r是圆角矩形的半径.
    
    if (w < 2 * r) {r = w / 2;}
    if (h < 2 * r){ r = h / 2;}
    context.beginPath();
    context.moveTo(x+r, y);
    context.arcTo(x+w, y, x+w, y+h, r);
    context.arcTo(x+w, y+h, x, y+h, r);
    context.arcTo(x, y+h, x, y, r);
    context.arcTo(x, y, x+w, y, r);
    context.lineWidth = 1;
    context.strokeStyle = "#ebebe0";
    context.stroke();
    return context;
}

function drawTime(context,val){//画时间
    var x = 264;
    var y = 164.5+chatNum*132+timeNum*73;
    var cont = getRectangle(context,x,y,79,28,5);
    cont.fillText(val,5,5);
}

function drawChat1(context,val){//画对方聊天
    var len = val.length;
    var w = len*28+5;//长度
    var x = 460-w-120;
    var y = 164.5+chatNum*132+timeNum*73;
    var cont = getRectangle(context,x,y,w,87,5);
    cont.fillText(val);
}

function drawAvater1(context,val){//画对方头像
    var x = 16;
    var y = 164.5+n*132+m*73;
    context.drawImage(path1,x,y,87,87);
}

function drawChat2(context,val){//画己方聊天
    var len = val.length;
    var w = len*28+5;
    var x = 120;
    var y = 164.5+chatNum*132+timeNum*73;
    var cont = getRectangle(context,x,y,w,87,5);
    cont.fillText(val);
}

function drawAvater2(context,val){//画己方头像,t头像宽度为87
    var x = 357;
    var y = 164.5+n*132+m*73;
    context.drawImage(path2,x,y,87,87);
}