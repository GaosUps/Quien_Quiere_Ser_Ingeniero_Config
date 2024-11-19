import React from "react";

const MessageCard = ({ message, type }) => (
    <div className={`p-4 rounded-lg mb-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {message}
    </div>
  );

export default MessageCard