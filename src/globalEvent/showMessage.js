import { Message } from 'element-ui'
let isMessaging = false
/**
 * @param MESSAGE_PROXY_LIST {Array} 用于存放消息的数组，每次取下标0的消息进行提示，提示完清除同样的消息，并播放下一条
 */
const MESSAGE_PROXY_LIST = []
/**
 * @function 外部调用方法，使用这个方法触发添加消息
 * @param {String} message 消息文本
 * @param {String} type 消息类型
 */
const pushMessage = (message, type = 'success') => {
  if (message.toString().length > 0) {
    let messageValueList = MESSAGE_PROXY_LIST.map(item => item.message)
    // 判断这条消息在不在队列里面,不在队列则添加，在队列则不添加
    if (!messageValueList.includes(message)) {
      const MESSAGE_INFO = {
        message,
        type
      }
      MESSAGE_PROXY_LIST.push(MESSAGE_INFO)
      if (!isMessaging) {
        showMessage()
      }
    }
  }
}
/**
 * @function 内部调用，从队列取最早一条进行显示
 */
const showMessage = () => {
  if (MESSAGE_PROXY_LIST.length > 0) {
    const MESSAGE_INFO = MESSAGE_PROXY_LIST[0]
    isMessaging = true
    Message({
      ...MESSAGE_INFO,
      onClose() {
        setTimeout(() => {
          isMessaging = false
          MESSAGE_PROXY_LIST.splice(0, 1)
          showMessage()
        }, 300)
      }
    })
  }
}
export default pushMessage
