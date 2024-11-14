import React from "react";

const AuthorizedLayout = ({ children }) => {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default AuthorizedLayout;
