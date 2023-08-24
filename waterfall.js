window.onload = function () {
    waterFall('main', "pin");
}
var dataInt = {
    'data': [
        {'src': '1.jpg'},
        {'src': '2.jpg'},
        {'src': '3.jpg'},
        {'src': '4.jpg'},
        {'src': '5.jpg'},
    ]
};

function waterFall(parent, pin) {
    var oParent = document.getElementById(parent);
    var aPin = getClassObj(oParent, pin);
    // documentElement获取文档根结点
    var num = Math.floor(document.documentElement.clientWidth / aPin[0].offsetWidth);//Math.floor向下取整 计算单行最多容纳块框个数
    oParent.style.cssText = "width:" + aPin[0].offsetWidth * num + "px; margin:0 auto";//设置容器宽度为 num*pin
    var pinHArr = [];
    console.log(aPin.length)
    for (var i = 0; i < aPin.length; i++) {
        var pinHeight = aPin[i].offsetHeight;
        //先将第一行num个元素的高度压入数组
        if (i < num) {
            pinHArr[i] = pinHeight;
        } else {
            var minH = Math.min.apply(null, pinHArr);//获取数组中的元素的最小值
            var minHIndex = getminHIndex(pinHArr, minH);//获取最小值对应的索引
            //alert(minHIndex)
            aPin[i].style.position = 'absolute';//设置绝对定位
            //console.log("i="+ i + " index="+ minHIndex + " minH="+ minH + " pinHarr[min]=" + pinHArr[minHIndex])
            //console.log(pinHArr)
            aPin[i].style.top = minH + 'px';//设置上方偏移量
            aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';//设置左侧偏移量
            pinHArr[minHIndex] += aPin[i].offsetHeight;//更新数组中的高度
        }
    }

}

/**
 *  用于获取父级元素内所有类名相符的元素集合
 *  @method getClassObj
 *  @param parent 父元素 className 进行比对的类名
 *  @return elements[]
 */
function getClassObj(parent, className) {
    var obj = parent.getElementsByTagName("*");//获取父级元素的所有子集
    var pinS = [];//存储 class = className 的元素
    //判断 class = className 装填数组
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].className == className) {
            pinS.push(obj[i]);
        }
    }
    return pinS;
}

/**
 *  获取数组中最小值的索引
 *  @method getminHIndex
 *  @param arr minH
 *  @return i
 */
function getminHIndex(arr, minH) {
    for (var i in arr) {
        if (arr[i] == minH)
            return i;
    }
}

function checkScrollSide() {
    var oParent = document.getElementById('main');
    var aPin = getClassObj(oParent, 'pin');
    var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2);
    //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //注意兼容性
    var documentH = document.documentElement.clientHeight; //窗口高度
    return (lastPinH < scrollTop + documentH) ? true : false; //到达指定高度后 返回true，触发waterfall()函数
}


