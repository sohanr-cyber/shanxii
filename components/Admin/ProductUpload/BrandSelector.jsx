import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Brands/BrandSelector.module.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';

const BrandSelector = ({ selected = {}, handleSelect }) => {
    const [brands, setBrands] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const fetchBrands = async (searchQuery) => {
        try {
            const { data } = await axios.get(`/api/brand?name=${searchQuery}`)
            setBrands(data.brands)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBrands(searchQuery)
    }, [searchQuery])

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                {selected?.title}
                <div className={styles.input}>
                    <input type="text" placeholder='Search By Brand Name ...' onChange={(e) => fetchBrands(e.target.value)} />
                    <div className={styles.searchIcon}>
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className={styles.brands}>
                {brands.map((b, i) => (
                    <span onClick={() => handleSelect(b)} style={selected._id == b._id ? { background: "black", color: "white" } : {}} >{b.name}</span>
                ))}

            </div>
        </div>
    )
}

export default BrandSelector