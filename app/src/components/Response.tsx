interface ResponseProps {
  response: string;
}

function Response({ response }: ResponseProps) {
  return (
    <div className="response">
      <h2>Response</h2>

      {response ? (
        <p>{response}</p>
      ) : (
        <p className="placeholder">
          The LLM response will appear here.
        </p>
      )}
    </div>
  );
}

export default Response;