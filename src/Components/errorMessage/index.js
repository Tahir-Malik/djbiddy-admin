import React, { Fragment } from 'react';

const ErrorMessage = ({ error, message, field }) => {
    return (
        <>
            {error ? (
                <>
                    {field in message ? (
                        <div className="error-msg" >
                            {message[field]}
                        </div>
                    ) : <></>}
                </>
            ) : <></>}

        </>
    );
};

export default ErrorMessage;