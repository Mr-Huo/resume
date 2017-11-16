
board = new Array();//保存格子上的数字
hasConflicted = new Array();//保存是否出冲突

$(document).ready(function(){//入口
    $('button').click(function(){
        window.location.reload();//刷新当前页面
    });
    $('#gridGontainer').remove('numberCell');//清除所有数字格
    newgame();
});

function getPosTop( i , j ){//获取单元格top像素
    return i*100+i*20+10;
}

function getPosLeft( i , j ){//获取单元格left像素
    return j*100+j*20+10;
}

function arrBackGrid(){//排列背景格
    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
            var gridCell = $('#gridCell-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }
    }
}

function newgame(){//游戏开始
    arrBackGrid();//排列背景格
    arrNumGrid();//排列数字格
    choiceNumGird();//随机一个数字格
}

function arrNumGrid(){//排列数字格
    $(".numberCell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#gridGontainer").append( '<div class="numberCell" id="numberCell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#numberCell-'+i+'-'+j);
            if( board[i][j] == 0 ){//空数字格不显示
                theNumberCell.css({'width':'0px','height':'0px'});
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css({'width':'100px','height':'100px','margin':'10px'});
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }
            hasConflicted[i][j] = false;
        }
}

function choiceNumGird(){//随机生成一个数字格
    if( nospace( board ))
        return false;
    var randx,randy;
    var times = 0;
    while( times < 50 ){//随机一个位置
        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
        if( board[randx][randy] == 0 ) break;
        times ++;
    }
    if( times == 50 ){//循环50次循环不到
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    applyNumToGird( randx , randy , randNumber );
    return true;
}

function nospace(board){//判断是否有空位
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;
    return true;
}

function applyNumToGird(i , j , randNumber ){//数字添加进数字格
    var numberCell = $('#numberCell-' + i + "-" + j );
    numberCell.css({'width':'100px','height':'100px','margin':'10px'});
    numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
    numberCell.css('color',getNumberColor( randNumber ) );
    numberCell.text( randNumber );
    numberCell.animate({//动画显示
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },200);
}

function getNumberBackgroundColor( number ){//获得相应数字的背景颜色
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
    }
    return "black";
}

function getNumberColor( number ){//获取相应数字的背景颜色
    if( number <= 4 )
        return "#776e99";
    return "white";
}

$(document).keydown( function( event ){//键盘操作
    event.preventDefault();
    switch( event.keyCode ){
        case 37: //left
            if( moveLeft() ){
                setTimeout("choiceNumGird()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //top
            if( moveTop() ){
                setTimeout("choiceNumGird()",210);
                setTimeout("isgameover()",1000);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("choiceNumGird()",210);
                setTimeout("isgameover()",1000);
            }
            break;
        case 40: //bottom
            if( moveBottom() ){
                setTimeout("choiceNumGird()",210);
                setTimeout("isgameover()",1000);
            }
            break;
        default: //default
            break;
    }
});

function moveLeft(){//左移
    if( !canMove('left', board ) )
        return false;
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && BlockHorizontal( i , k , j , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[i][k] == board[i][j] && BlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("arrNumGrid()",200);
    return true;
}
    
function moveRight(){//右移
    if( !canMove('right', board ) )
        return false;
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){
                    if( board[i][k] == 0 && BlockHorizontal( i , j , k , board ) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[i][k] == board[i][j] && BlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        showMoveAnimation( i , j , i , k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("arrNumGrid()",200);
    return true;
}
    
function moveTop(){//上移
    if( !canMove('top', board ) )
        return false;
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){
                    if( board[k][j] == 0 && BlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[k][j] == board[i][j] && BlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("arrNumGrid()",200);
    return true;
}
    
function moveBottom(){//下移
    if( !canMove('bottom', board ) )
        return false;
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){
                    if( board[k][j] == 0 && BlockVertical( j , i , k , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if( board[k][j] == board[i][j] && BlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("arrNumGrid()",200);
    return true;
}

function showMoveAnimation( fromx , fromy , tox, toy ){//移动动画
    var numberCell = $('#numberCell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function BlockHorizontal( row , col1 , col2 , board ){//检查水平空块
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}

function BlockVertical( col , row1 , row2 , board ){//检查垂直空块
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

function canMove(direction, board){//判断是否可以左右上下移动
    if(direction=='left'){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 1; j < 4 ; j ++ )
                if( board[i][j] != 0 )
                    if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                        return true;
        return false;
    }else if(direction=='right'){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 2; j >= 0 ; j -- )
                if( board[i][j] != 0 )
                    if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                        return true;
        return false;
    }else if(direction=='top'){
        for( var j = 0 ; j < 4 ; j ++ )
            for( var i = 1 ; i < 4 ; i ++ )
                if( board[i][j] != 0 )
                    if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                        return true;
        return false;
    }else if(direction=='bottom'){
        for( var j = 0 ; j < 4 ; j ++ )
            for( var i = 2 ; i >= 0 ; i -- )
                if(board[i][j] != 0)
                    if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                        return true;
        return false;
    }else return false;
}

function isgameover(){//是否结束游戏
    if( nospace( board ) && !canMove('left', board)&&!canMove('right', board)&&!canMove('top', board)&&!canMove('bottom', board) ){
        alert('GAME OVER!');
    }
}
