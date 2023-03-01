import React, { useState } from "react";
// import Tab1 from "./Tab1";
// import Tab2 from "./Tab2";
// import Tab3 from "./Tab3";
// import Tab4 from "./Tab4";


//!@#$ boilerplate- fill out later
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const Tab1 = () => {
        return "Hello from tab1"
    }
    const Tab2 = () => {
        return "Hello from tab2"
    }
    const Tab3 = () => {
        return "Hello from tab3"
    }
    const Tab4 = () => {
        return "Hello from tab4"
    }

    const handleClick = tab => {
        setActiveTab(tab);
    };

    return (
        <div className="dashboard">
            <ul className="tabs">
                <li className={activeTab === 1 ? "active" : ""} onClick={() => handleClick(1)}>
                    Tab1
                </li>
                <li className={activeTab === 2 ? "active" : ""} onClick={() => handleClick(2)}>
                    Tab2
                </li>
                <li className={activeTab === 3 ? "active" : ""} onClick={() => handleClick(3)}>
                    Tab3
                </li>
                <li className={activeTab === 4 ? "active" : ""} onClick={() => handleClick(4)}>
                    Tab4
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === 1 && <Tab1 />}
                {activeTab === 2 && <Tab2 />}
                {activeTab === 3 && <Tab3 />}
                {activeTab === 4 && <Tab4 />}
            </div>
        </div>
    );
};

export default Dashboard;
