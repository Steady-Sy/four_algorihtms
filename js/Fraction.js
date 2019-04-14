/**
 * 定义了一个分数类
 * @param numerator 分子
 * @param denominator 分母
 * @constructor
 */
function Fraction(numerator,denominator) {
    this.numerator = Number(numerator) || 0;
    this.denominator = Number(denominator) || 1;
}
Fraction.prototype = {
    constructor:Fraction,
    shink:function(){
        var maxCommonDivisor = this.getMaxCommonDivisor(this.denominator, this.numerator);
        this.numerator /= maxCommonDivisor;
        this.denominator /= maxCommonDivisor;
    },
    getMaxCommonDivisor:function(a,b){
        if(b == 0){//如果是辗转相除法出现b等于0的情况直接返回1
            return 1;
        }
        var mod = a % b;
        if (mod == 0) {
            return b;
        } else {
            return this.getMaxCommonDivisor(b, mod);
        }
    },
    add:function(that){
       return new Fraction(this.numerator * that.denominator + this.denominator * that.numerator,
            this.denominator * that.denominator);
    },
    sub:function(that){
       return new Fraction(this.numerator * that.denominator - this.denominator * that.numerator,
            this.denominator * that.denominator);
    },
    mul:function(that){
        return new Fraction(this.numerator * that.numerator,
            this.denominator * that.denominator);
    },
    div:function(that){
        return new Fraction(this.numerator * that.denominator,
            this.denominator * that.numerator);
    },
    getResult: function () {
        var numerator = this.numerator;
        var denominator = this.denominator;
        if(numerator % denominator == 0){//整数
            return numerator / denominator;
        }else if(numerator / denominator >= 1){//假分数
            var num =Math.floor(numerator / denominator);
            var left = numerator % denominator;
            return num+"'"+left+"/"+denominator;
        }else{//真分数
            return numerator+"/"+denominator;
        }
    }

};
