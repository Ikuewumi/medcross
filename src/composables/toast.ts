import { writable } from "svelte/store";

type MessageType = 'success' | 'failure' | 'warning' | 'info'

export const message = writable({
    msg: '',
    type: 'success' as MessageType
})


export const enterMsg = (msg:string, type:MessageType = 'info') => {
    let timeOutId:number;
    message.set({ msg, type })    
    
    timeOutId = setTimeout(() => {
        message.set({ msg: '', type })
        clearTimeout(timeOutId)
    }, 3000)

}