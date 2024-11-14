import React from "react";
import { AiOutlineSearch } from "react-icons/ai";


const DealsHeader = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "7rem" }}>
            <div style={{ fontWeight: "700", fontSize: "62px" }}>Deals</div>
            <p style={{ color: "#686868", fontSize: "24px", fontWeight: '400' }}>
                Find the best companies in this category!
            </p>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #E4E5E8",
                    borderRadius: "8px",
                    padding: "5px",
                    backgroundColor: "#FFFFFF",
                    position: "relative",
                    marginTop: "2rem",
                    width: "983px", // Adjusted to maxWidth for responsiveness
                }}
            >
                <AiOutlineSearch
                    style={{
                        position: "absolute",
                        left: "15px",
                        color: "#0066FF",
                        backgroundColor: "#FFFFFF",
                    }}
                />
                <input
                    type="text"
                    placeholder="Search"
                    style={{
                        border: "none",
                        outline: "none",
                        padding: "10px 15px",
                        flex: 1,
                        backgroundColor: "transparent",
                        marginLeft: "30px",
                    }}
                />
                <button className="cate-search-button">Search</button>
            </div>
        </div>
    )
}

export default DealsHeader