console.log('webpack第一步');
require('./index.less');
require('./one.css')


//用babel处理js语法

setTimeout(() => {
    console.log('setTimeout');
}, 1000);
class Student{
    say(){
        console.log('say');
    }
}
let a = new Student()
a.say()

//mock数据
import axios from 'axios';
window.onload = function(){

    const baseUrl='https://www.fastmock.site/mock/1afe89e63776c6cc74ae56fb9d081d8d/api'
    axios.get(`${baseUrl}/test`)
        .then(({data}) => {
            console.log('data',data);
        })
}


