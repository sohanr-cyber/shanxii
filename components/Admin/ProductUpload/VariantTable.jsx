import React from "react";
import styles from '../../../styles/Admin/ProductUpload/VariantTable.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Variant from "./Variant";
import { useSelector, useDispatch } from "react-redux";
import { removeVariant, setVariant, updateVariantTable } from "@/redux/productCreateSlice";
import { VerticalAlignTopSharp } from "@mui/icons-material";
const VariantTable = () => {
    const products = [
        { id: 1, availability: "In Stock", color: "Red", size: "M" },
        { id: 2, availability: "Out of Stock", color: "Blue", size: "L" },
        { id: 3, availability: "Limited Stock", color: "Green", size: "S" },
    ];
    const variants = useSelector(state => state.productCreate.variants)
    const variantTable = useSelector(state => state.productCreate.variantTable)
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper} >
            <table >
                <thead>
                    <tr >
                        <th>Color Family</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {variantTable?.map((v) => (
                        <tr key={v._id} >

                            <td>
                                {v.color}
                            </td>
                            <td>
                                {v.size}
                            </td>
                            <td style={{ maxWidth: "20px", }}>
                                <input type="number" style={{ maxWidth: "40px", margin: "0", height: "100%" }} value={v.quantity || 0} min="0" onChange={e => dispatch(updateVariantTable({
                                    ...v, quantity: e.target.value
                                }))} />
                            </td>
                            <td style={{ display: "flex", gap: "15px", justifyContent: "space-evenly" }}>
                                <BorderColorIcon style={{ color: "green" }} onClick={() => dispatch(setVariant(variants?.find(e => e.color == v.color)))} />
                                <DeleteIcon style={{ color: "red" }} onClick={() => dispatch(removeVariant(v))} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VariantTable;
