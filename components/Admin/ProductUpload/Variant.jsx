import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Admin/ProductUpload/Variant.module.css';
import Upload from '@/components/Utility/Upload';
import { colors } from '@/utility/const';
import Image from 'next/image';
import { addNewVariant, removeVariant, setVariants, updateVariants } from '@/redux/productCreateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { generateUniqueID } from '@/utility/helper';
import axios from 'axios';
import { findRGB } from '@/utility/dict';


const Variant = ({ vuid }) => {
    const variants = useSelector(state => state.productCreate.variants)
    const [vDetails, setVDetails] = useState(variants?.find(v => v?.uid == vuid));
    const dispatch = useDispatch()
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])

    const fetchSizeAndColor = async () => {
        try {
            const { data: colors } = await axios.get('/api/misc/color?pageSize=1000')
            const { data: sizes } = await axios.get("/api/misc/size?pageSize=1000")
            setSizes(sizes.size)
            setColors(colors.colors)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSizeAndColor()
    }, [])
    const handleFile = (file) => {
        dispatch(updateVariants({ uid: vuid, image: file.url }))
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateVariants({ uid: vuid, [name]: value }))

    };

    useEffect(() => {
        setVDetails(variants?.find(v => v?.uid == vuid))
    }, [variants])

    return (
        <div className={styles.wrapper}>
            <div className={styles.flex}>
                <div className={styles.field}>
                    <div className={styles.lbl}>Size/Weight</div>
                    <select name="size" value={vDetails?.size} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        {sizes.map((s, i) => (
                            <option key={i} value={s.name}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <div className={styles.lbl}>Color</div>
                    <select
                        name="color"
                        value={vDetails?.color}
                        onChange={
                            handleChange

                        }
                    >
                        <option value="" disabled>Select</option>
                        {colors.map((c, i) => (
                            <option key={i} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <div className={styles.lbl}>Purchase Price</div>
                    <input
                        type="number"
                        name="purchasePrice"
                        value={vDetails?.purchasePrice}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.lbl}>Price</div>
                    <input
                        type="number"
                        name="price"
                        value={vDetails?.price}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.lbl}>Discounted Price</div>
                    <input
                        type="number"
                        name="priceWithDiscount"
                        value={vDetails?.priceWithDiscount}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.lbl}>Stock</div>
                    <input
                        type="number"
                        name="quantity"
                        value={vDetails?.quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.lbl}>Image</div>
                    <Upload handle={handleFile} />
                </div>

                <div className={styles.field}>
                    {/* <div className={styles.lbl}>Preview</div> */}
                    {vDetails.image && <div className={styles.box} style={{ backgroundColor: vDetails?.color || '#eee' }}>
                        {vDetails?.image && <Image src={vDetails.image} height={50} width={50} />}
                    </div>}

                </div>
                <div className={styles.field}>
                    <div className={styles.box} style={{ backgroundColor: findRGB(vDetails?.color) || '#eee', display: "flex", alignItems: 'center', justifyContent: "center" }} onClick={() => dispatch(removeVariant({
                        uid: vuid,
                    }))}>
                        -

                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Variant;
