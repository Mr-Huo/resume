
Name = 'me';//保存对方id
Chat = new Array();//保存聊天记录
Time = new Array();//保存时间
chatNum = 0;//保存聊天数
timeNum = 0;//保存时间数

/***********************************************************************************************************/
$(document).ready(function(){
    var canvas = document.getElementById("canvas");
    canvas.width = 460;
    canvas.height = 816;
    var context = canvas.getContext("2d");

    smear(context,75,40);//清除名字
    //制作按钮
    $('#make').click(function(){
        getinformation();//获取信息
        drawcanvas(context);//画图
        $('#make').attr("disabled",true);
    });
    //刷新按钮
    $('#new').click(function(){
        window.location.reload();
    });
    //更多框框按钮
    $('#more').click(function(){//更多按钮
        alert('稍后实现');
    });
});



//获取信息函数
function getinformation(){
    //获取聊天
    $('.chat input').each(function(){
        Chat.push($(this).val());
    });
    //获取时间
    $('.time input').each(function(){
        Time.push($(this).val());
    });
    Name = $('#id input').val();//获取对方名字
}



//画图入口
function drawcanvas(context){
    drawName(context,80,67);
    for(var i=0;i<Chat.length;i++){        
        if(Time[i]){timeNum++; drawTime(context,Time[i]);}//计算时间个数并画时间
        if(Chat[i]) chatNum ++;//计算聊天个数
        if(!(i%2)&&Chat[i]){//己方信息 
            drawAvater2(context);
            drawChat2(context,Chat[i]);
        }else if((i%2)&&Chat[i]){//对方信息
            drawAvater1(context);            
            drawChat1(context,Chat[i]);
        }
    }
}


//修改标头
function smear(context,x,y){
    context.lineWidth = 1;
    context.strokeStyle = "#333333";
    var cont = context.roundRect(x,y,100,40,3);
    cont.fillStyle = "#333333";
    cont.fill();
    context.stroke();
}



//写对方名字
function drawName(context,x,y){
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


//画圆角矩形
//x,y是矩形的起点;w,h是矩形的宽高;r是圆角矩形的半径.
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.fillStyle="rgba(255,0,0,1)";
    this.closePath();
    return this;
}

/*************************************************************************************************************/


//画时间
function drawTime(context,val){//时间矩形120*15
    var x = 180;
    var y = 160+(chatNum-1)*70+timeNum*20;
    context.lineWidth = 1;
    context.strokeStyle = "#d6d6c2";
    var cont = context.roundRect(x,y,80,15,3);
    cont.fillStyle = "#d6d6c2";
    cont.fill();
    //1. 使用`font`设置字体。
    cont.font = "12px serif";
    //2. 使用`fillStyle`设置字体颜色。
    context.fillStyle = "#fff";
    cont.fillText(val,x+20,y+13);
    cont.stroke();
}



//画对方聊天
function drawChat1(context,val){
    var len = val.length*18+50;
    var x=80;
    var y = 107+(chatNum-1)*50+timeNum*35;
    context.lineWidth = 1;
    context.strokeStyle = "#d6d6c2";
    var cont = context.roundRect(x,y,len,46,5);
    cont.fillStyle = "#FFFFFF";
    cont.fill();
    //1. 使用`font`设置字体。
    cont.font = "20px serif";
    //2. 使用`fillStyle`设置字体颜色。
    cont.fillStyle = "#000";
    cont.fillText(val,x+20,y+30);
    cont.stroke();
}



//画己方聊天
function drawChat2(context,val){
    var len = val.length*18+50;
    var x=395-len-16;
    var y = 107+(chatNum-1)*50+timeNum*35;
    context.lineWidth = 1;
    context.strokeStyle = "#00b300";
    var cont = context.roundRect(x,y,len,46,5);
    cont.fillStyle = "#00e600";
    cont.fill();
     //1. 使用`font`设置字体。
     cont.font = "20px serif";
     //2. 使用`fillStyle`设置字体颜色。
     cont.fillStyle = "#000";
     cont.fillText(val,x+20,y+30);
     cont.stroke();
}


//计算聊天框长度
function calen(str){
    for(var i in str){

    }
}
/*************************************************************************************************************/



function drawAvater1(context){//画对方头像
    var x=16;
    var y = 105+(chatNum-1)*50+timeNum*35;
    var img=document.getElementById("herimg");
    context.drawImage(img,x,y,50,50); 
}

function drawAvater2(context){//画己方头像
    var x=395;
    var y = 105+(chatNum-1)*50+timeNum*35;
    var img=document.getElementById("myimg");
    context.drawImage(img,x,y,50,50);
}


/*************************************************************************************************** */
function previewFile1() {
    var preview = document.querySelector('#one');
    var file    = document.querySelector('input[type=file]').files[0];
    
    var reader  = new FileReader();
    reader.onloadend = function (evt) {
        $('#myimg').attr('src',evt.target.result);
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
            preview.src = "";
        }
}

function previewFile2() {
    var preview = document.querySelector('#two');
    var file    = document.querySelectorAll('input[type=file]')[1].files[0];
    
    var reader  = new FileReader();
    reader.onloadend = function (evt) {
        $('#herimg').attr('src',evt.target.result);
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
            preview.src = "";
        }
}
