interface MessageWindowRulesProps {}

const MessageWindowRules: React.FC<MessageWindowRulesProps> = () => {
  return (
    <div className="message-window-wrapper max-width-mid">
      <div className="rules-wrapper">
        <p>Thank you for visiting shawn81.com!</p>
        <p>This website displays up to 81 messages at a time.</p>
        <p>Currently, accounts can only post one message.</p>
        <p>
          I reserve the right to delete any messages I wish at any time, so
          don't say anything too ridiculous.
        </p>
      </div>
    </div>
  );
};

export default MessageWindowRules;
