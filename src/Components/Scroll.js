import { ChatState } from "../Context/ChatProvider.js"


function Scroll({ messages }){

const {user} = ChatState(); 

    return (
        <>    
        {messages.map((m, i)=>(
            <div style={{ display: "flex"}}>
            
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


export default Scroll;


