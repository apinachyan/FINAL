module.exports = class Water {
    constructor(length,height){
        this.height = height;
        this.length = length;
        this.start = 0;
        this.end = 0;
    }
    flow(){
        for (var i = 0;i < this.length;i++){
            matrix[this.start][i] = 7;
        }
        this.start++;
    }
    end(){
        for (var i = 0;i < this.length;i++){
            matrix[this.start][i] = 0;
        }
        this.end++;
    }
    starting(){
        setInterval(this.flow(),5);
        setInterval(this.end(),5);
    }
}