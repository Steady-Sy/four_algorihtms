/**
 * 生成题目，已经除去了负数情况
 * @param total 生成题目数量
 * @returns {Array}
 */
function create(total){
    var question = new Array(),
        answer = new Array(),
        param = /(\-\d+)|(\-\d+\/\d+)|(\d+\/\-\d+)/;//匹配-6,-3/7,11/-3这种负数的情况
    while(question.length !=Number(total)){
        var str = crateExpression();
//        document.write(str+"=");
        var Rpn =getRPN(str);
        var result = calculate(Rpn);
        if(param.test(result)){
            continue;
        }else{
            question.push(str);
            answer.push(result);
        }
    }
    var ret = new Array();
    ret[0] = question;
    ret[1] = answer;
    return ret;
}