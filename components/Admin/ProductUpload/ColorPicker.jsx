import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/ProductUpload/ColorPicker.module.css'
import { colors as c } from '@/utility/const'
import { useDispatch, useSelector } from 'react-redux'
import { setVariant } from '@/redux/productCreateSlice'

const ColorPicker = () => {
    const [colors, setColors] = useState(c)
    const variant = useSelector(state => state.productCreate.variant)
    const dispatch = useDispatch()





    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                {variant?.color && <div className={styles.color} onClick={() => dispatch(setVariant({ color: "" }))}>
                    {variant.color}
                    <div className={styles.close}>X</div>
                </div>}
                <div className={styles.searchbox}>
                    <input type={"text"} placeholder='Type Color by Name ...' onChange={e => setColors(c.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase())))} />
                </div>

            </div>
            <div className={styles.colors}>
                {colors.map((c, i) => <div className={styles.color} onClick={() => dispatch(setVariant({ color: c.name }))
                } style={variant?.color == c.name ? { border: "2px solid black" } : {}}>
                    <div className={styles.square} style={{ background: `${c.code}` }}></div>
                    <div className={styles.name}>
                        {c.name}
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default ColorPicker