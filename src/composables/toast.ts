import { writable } from "svelte/store";

type MessageType = 'success' | 'failure' | 'warning' | 'info'

export const message = writable({
    msg: '',
    type: 'success' as MessageType
})


export const enterMsg = (msg:string, type:MessageType = 'info', time=3000, sticks=false) => {
    let timeOutId:NodeJS.Timeout;
    message.set({ msg, type })    
    
    if (!sticks) {
        timeOutId = setTimeout(() => {
            message.set({ msg: '', type })
            clearTimeout(timeOutId)
        }, time)
    }

}