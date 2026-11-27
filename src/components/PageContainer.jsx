import React from "react";
import '../styles/PageContainer.scss';

const PageContainer = ({ children }) => {
    return (
        <main className="page-container">
            <div className="page-container__card">
                {children}
            </div>
        </main>
    );
};

export default PageContainer;