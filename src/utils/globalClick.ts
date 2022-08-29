/**
 * 点击注册 DOM 的外部时，执行传入的函数
 */
interface Clients {
    [key: string]: {
        DOM: HTMLElement
        callbacks: Function[]
    }
};
// 闭包实现
// 解开注释会导致错误，因为 register 是自执行函数
// const register = (function() {
//     let clients: Clients = {}
//     return function(name: string, DOM: HTMLElement, callback: Function) {
//         if(!clients[name]) {
//             clients[name] = { DOM, callbacks: [callback] }
//         }
//         document.documentElement.addEventListener('click', function() {
//             clients[name].callbacks.forEach(callback => callback())
//         })
//     }
// })();

// 面向对象实现
class Observer {
    readonly clients: Clients = {}
    watch(name: string, DOM: HTMLElement, callback: Function) {
        if(!this.clients[name]) {
            this.clients[name] = { DOM, callbacks: [callback] }
        }
        document.documentElement.addEventListener('click', (event: Event) => {  // 箭头函数 this 指向外层
            if(event.target instanceof Element && !this.clients[name].DOM.contains(event.target)) {
                this.clients[name].callbacks.forEach(callback => callback())
            }
        })
    }
}

export const observer = new Observer()
