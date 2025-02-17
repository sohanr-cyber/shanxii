import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Upload from '@/components/Utility/Upload'
import axios from 'axios'
import BASE_URL from '@/config'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { showSnackBar } from '@/redux/notistackSlice'
import { buttonC, themeBg } from '@/utility/const'
// Order Craetion Form
const Create = ({ brand: data }) => {
    const [brand, setBrand] = useState(data)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const [newBrand, setNewBrand] = useState(false)
    useEffect(() => {
        setBrand(data)
    }, [router.query])
    const userInfo = useSelector(state => state.user.userInfo)
    const headers = { Authorization: `Bearer ${userInfo?.token}` }

    const saveBrand = async () => {
        if (!brand.name) {
            dispatch(
                showSnackBar({
                    message: 'Please fill all the necessaary field',
                    option: {
                        variant: 'error'
                    }
                })
            )
            return
        }
        try {
            dispatch(startLoading())
            const { data } = await axios.post(
                '/api/brand',
                {
                    ...brand
                },
                {
                    headers
                }
            )
            if (data.error) {
                dispatch(
                    showSnackBar({
                        message: data.error,
                        option: {
                            variant: 'error'
                        }
                    })
                )
                dispatch(finishLoading())
                return
            }
            setBrand({
                name: '',
                image: ''
            })
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'New Brand Created ',
                    option: {
                        variant: 'success'
                    }
                })
            )
        } catch (error) {
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'Error While Creating Brand !',
                    option: {
                        variant: 'error'
                    }
                })
            )
        }
    }

    const updateBrand = async () => {
        if (!brand.name) {
            setError('Pleas fill all the necessaary field')
            dispatch(
                showSnackBar({
                    message: 'Please fill all the necessaary field',
                    option: {
                        variant: 'error'
                    }
                })
            )
            return
        }
        try {
            dispatch(startLoading())
            const { data } = await axios.put(
                `/api/brand/${router.query.id}`,
                {
                    ...brand
                },
                { headers }
            )
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'Brand Updated',
                    option: {
                        variant: 'default'
                    }
                })
            )
        } catch (error) {
            dispatch(finishLoading())
            dispatch(
                showSnackBar({
                    message: 'Error While Updating Brand !',
                    option: {
                        variant: 'error'
                    }
                })
            )
            setError('Error While Updating Brand !')
        }
    }
    return (
        <div className={styles.wrapper}>
            <h2>{router.query.id ? 'Update' : 'Add'} Brand</h2>
            <form className={styles.forms}>
                <div className={styles.left}>
                    <div className={styles.field}>
                        <label>Brand Name</label>
                        <input
                            type='text'
                            placeholder='Enter Brand Name'
                            value={brand.name}
                            onChange={e => setBrand({ ...brand, name: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Brand Icon</label>
                        <Upload
                            handle={files => {
                                setBrand(prev => ({ ...prev, image: files.url }))
                            }}
                        />
                    </div>
                    <div className={styles.images}>
                        {brand.image ? (
                            <div className={styles.image__container}>
                                <Image src={brand.image} alt='' width='180' height={180} />
                            </div>
                        ) : (
                            <div
                                className={styles.image__container}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                No Photo Uploaded
                            </div>
                        )}
                    </div>

                    {newBrand && (
                        <div className={styles.field}>
                            <AddBrand brands={brands} />
                        </div>
                    )}

                    <div
                        className={styles.field}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <span
                            onClick={() =>
                                setBrand({ ...brand, isFeatured: !brand.isFeatured })
                            }
                        >
                            {brand.isFeatured ? (
                                <CheckBoxIcon />
                            ) : (
                                <CheckBoxOutlineBlankIcon />
                            )}
                        </span>
                        <span> This Brand will be shown in home page</span>{' '}
                    </div>
                    <div
                        className={styles.field}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start'
                        }}
                    >
                        {/* <span
              onClick={() =>
                setBrand({ ...brand, isShown: !brand.isShown })
              }
            >
              {brand.isShown ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
            </span>
            <span>
              {' '}
              This brand name will be shown in product details page
            </span>{' '} */}
                    </div>
                </div>
                {/* <div className={styles.right}></div> */}
            </form>
            {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
            <button
                onClick={() => (router.query.id ? updateBrand() : saveBrand())}
            >
                Save Brand
            </button>
        </div>
    )
}

export default Create

export async function getServerSideProps({ query }) {
    const { id } = query

    const fetchBrand = async () => {
        const { data } = await axios.get(`${BASE_URL}/api/brand/${id}`)
        return data
    }

    const fetchCategories = async () => {
        const { data } = await axios.get(`${BASE_URL}/api/brand`)
        return data.brands
    }

    // const brands = await fetchCategories()

    if (id) {
        const brand = await fetchBrand()
        return {
            props: {
                brand
                // brands
            }
        }
    }

    return {
        props: {
            brand: {
                name: '',
                image: '',
                children: []
            }
            // brands: brands
        }
    }
}
