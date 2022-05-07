import React, { useState, useEffect } from "react";
import classnames from "classnames";
import styles from './index.scss'

interface IProps {
    isHalf?: boolean
}

const NavIndex: React.FC<IProps> = (props) => {
    const { isHalf = false } = props

    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight)

    const [imgWidth, setImgWidth] = useState<number>(screen.availWidth)
    const [imgHeight, setImgHeight] = useState<number>(screen.availHeight)

    const [imgTop, setTop] = useState<number>(0)
    const [imgLeft, setLeft] = useState<number>(0)

    useEffect(() => {
        setImgWidth(screen.availWidth)
        setImgHeight(screen.availHeight)
        setStyleFnc()
        window.addEventListener('resize', () => {
            setStyleFnc()
        })
    }, [])

    function setStyleFnc() {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
        let top = document.body.clientHeight - screen.availHeight
        let left = document.body.clientWidth - screen.availWidth
        if (top < 0) {
            setTop(top / 2)
        } else {
            setTop(0)
        }

        if (left < 0) {
            setLeft(left / 2)
        } else {
            setLeft(0)
        }
    }
    return <div className={styles.back_stetch} style={{ width: innerWidth, height: innerHeight }}>
        <div className={styles.back_stetch_item}>
            <img src="https://cdn.jsdelivr.net/gh/sakurasep/wallpaper_one@1.0/wallpaper/043.jpg" alt="" style={{ inset: `${imgTop}px auto auto ${imgLeft}px`, width: imgWidth, height: imgHeight }} />
        </div>
    </div>
}

export default NavIndex