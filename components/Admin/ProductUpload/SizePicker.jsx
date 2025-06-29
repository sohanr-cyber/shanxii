import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/ProductUpload/SizePicker.module.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch } from 'react-redux'
import { setVariant } from '@/redux/productCreateSlice'

const sizes = [
    {
        sizeType: "US",
        availableSizes: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    {
        sizeType: "EU",
        availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    },
    {
        sizeType: "INT",
        availableSizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    }
];

const SizePicker = () => {
    const [sizeType, setSizeType] = useState(sizes[0].sizeType)
    const [selected, setSelected] = useState([])

    const dispatch = useDispatch()


    console.log(sizes);

    useEffect(() => {
        dispatch(setVariant({ sizes: selected }))
    }, [selected])

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.lebel}>Size:</div>
                <div className={styles.flex}>
                    {sizes.map((s, i) => (<div className={styles.size} onClick={() => setSizeType(s.sizeType)}>
                        {sizeType == s.sizeType ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}  {s.sizeType}
                    </div>))}
                </div>
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.selected}>
                    {selected?.map((s, i) => <span>{s}</span>)}
                </div>
                <input type="text" placeholder='search size ...' />
            </div>
            <div className={styles.sizes}>
                {sizes.find(s => s.sizeType == sizeType).availableSizes.map((s, i) => (
                    <div className={styles.size} onClick={() => selected.find(e => e == s) ? setSelected(selected.filter(e => e != s)) : setSelected([...selected, s])}
                        style={selected.find(e => e == s) ? {
                            background: "black",
                            color: "white"
                        } : {}}
                    >{s}</div>
                ))}
            </div>
        </div >
    )
}

export default SizePicker