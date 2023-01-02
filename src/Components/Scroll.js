import { ChatState } from "../Context/ChatProvider.js";

function Scroll({ messages }) {
  const { user } = ChatState();

  return (
    <>
      {messages.map((m, i) => (
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "1rem",
              borderRadius: "10px",
              backgroundColor: `${
                m.sender._id === user.data._id ? "#B9F5D0" : "#BEE3F8"
              }`,
              marginLeft: `${m.sender._id === user.data._id ? "auto" : "33"}`,
              justifyItems: "flex-end",
              marginTop: "2px",
              padding: "5px",
              marginBottom: "0.2rem",
            }}
          >
            {m.content}
          </span>
        </div>
      ))}
    </>
  );
}

export default Scroll;
