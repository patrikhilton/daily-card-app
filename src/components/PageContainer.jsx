import React from "react";
import '../style/PageContainer.scss';

const PageContainer = ({ Children }) => {
    return (
        <main className="page-container">
            <div className="page-container__card">
                {Children}
            </div>
        </main>
    );
};

export default PageContainer;