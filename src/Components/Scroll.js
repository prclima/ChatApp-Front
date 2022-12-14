import { ChatState } from "../Context/ChatProvider.js"
import { margin } from "../../src/NameChat.js"

function Scroll({ messages }){

const {user} = ChatState(); 

    return (
        <>    
        {messages.map((m, i)=>(
            
            
            <div style={{ display: "flex"}}>
            {console.log(user.data._id)}
            {console.log(m.sender)}
                
                <span style={{ borderRadius: "10px", 
                backgroundColor: `${m.sender._id === user.data._id ? "#BEE3F8" : "#B9F5D0"}`, 
                marginLeft: `${m.sender._id === user.data._id ? "0px" : "85%"}`  ,
                marginTop: "2px",
                padding: "5px 15px",
                
                }}>
             
                {m.content}
                </span>
        </div>
            ))
    }
        </>
)
}       

// margin(messages, m, i, user.data._id)
export default Scroll;


