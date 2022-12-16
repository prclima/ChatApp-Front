export const getSender = (logUser, users) => {
     
      if (logUser.data._id === users[0]._id) {
        return users[1].name 
      } else {
        return users[0].name 
      }
    
}

export const sameSender = (messages, m, i, userId) => {
   
    return (
        messages[i+1].sender._id !== m.sender._id || messages[i].sender._id !== userId
    )
}

export const lastMessage = (messages, i, userId) => {
    return (
        messages[messages.length - 1 ].sender._id !==userId
    )
}



