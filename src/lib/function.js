
// 判断图片是横图还是竖图
export function JudgeHorizontal(height, width) {
    if (width > height) {
        return true;
    }
    else {
        return false;
    }
}

// 截取字符串长度
export function splitString(info, len) {
    if (info == null) {
        info = "...";
    }
    if (info && info.length >= len) {
        info = info.slice(0, len);
        info = info + "...";
    }
    return info;
}

//获取当前时间
export function getDate() {
    var today = new Date();
    var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate() +
        ' ' +
        today.getHours() +
        ':' +
        today.getMinutes() +
        ':' +
        today.getSeconds();
    return date;
}