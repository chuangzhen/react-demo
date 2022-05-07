import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import styles from './index.scss'
const { isMobile } = window

const NavIndex: React.FC<any> = (props) => {
    const scrollInstanceRef = useRef<number>(0)
    const [showNav, setShowNav] = useState<boolean>(false)
    useEffect(() => {
        let docEle = document.body || document.documentElement
        let clentHeight = docEle.clientHeight
        console.log("🚀 ~ file: index.tsx ~ line 12 ~ useEffect ~ clentHeight", clentHeight)

        docEle.addEventListener('scroll', () => {
            let scrollTopDis = docEle.scrollTop
            let refDis = scrollInstanceRef.current
            if (scrollTopDis > clentHeight && refDis - scrollTopDis < 0) {
                setShowNav(true)
            } else {
                setShowNav(false)
            }
            scrollInstanceRef.current = docEle.scrollTop
        })
    }, [])


    return <div className={classnames(styles.nav, showNav ? styles.show_nav : styles.hide_nav)}>
        <div className={styles.nav_btn}>Sunshine的博客</div>
        <div className={styles.nav_btn}>笔记</div>
        <div className={styles.nav_btn}>日记</div>
        <div className={styles.nav_btn}>关于我</div>
        <div style={{ flex: 1 }}></div>
        <div className={styles.nav_btn}>xxxx</div>
    </div>
}

export default NavIndex