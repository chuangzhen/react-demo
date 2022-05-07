import React, { useEffect, useState } from "react";
import styles from "./index.scss";
import NavBar from "components/NavBar";
import CoverPage from "components/CoverPage";
import FullBG from "components/FullBG";


const CommonIndex: React.FC<Object> = ({ children }) => {
    const { } = location
    console.log("🚀 ~ file: index.tsx ~ line 9 ~ location", location)
    
    
    useEffect(() => {
        window.addEventListener('scroll' , ( ) => {
            console.log();

        })
    }, [])


    return <>
        <div className={styles.container_layout}>
            <CoverPage isHalf={false}></CoverPage>
            <div className={styles.layout_child_content}>
                <NavBar></NavBar>
                {children}
            </div>
        </div>
        <FullBG></FullBG>
    </>
}

export default CommonIndex