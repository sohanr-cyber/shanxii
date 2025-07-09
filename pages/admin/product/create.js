import React, { useEffect, useInsertionEffect, useState } from 'react'
import styles from '../../../styles/Admin/ProductCreate.module.css'
import Image from 'next/image'
import Upload from '@/components/Utility/Upload'
import UploadMany from '@/components/Utility/UploadMany'
import axios from 'axios'
import BASE_URL from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useRouter } from 'next/router'
import TextEditor from '@/components/Utility/TextEditor'
import { showSnackBar } from '@/redux/notistackSlice'
import Colors from '@/components/Shop/Colors'
import SelectCategory from '@/components/Categories/SelectCategory'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { SubtitlesOutlined } from '@mui/icons-material'
import { calculateDiscount, generateUniqueID } from '@/utility/helper'
import BrandSelector from '@/components/Admin/ProductUpload/BrandSelector'
import Variant from '@/components/Admin/ProductUpload/Variant'
import VariantTable from '@/components/Admin/ProductUpload/VariantTable'
import { addNewVariant, setVariants, setVariantTable } from '@/redux/productCreateSlice'
import { setDuplicateProduct } from '@/redux/productSlice'

const Create = ({ product: data, brands }) => {
  const [images, setImages] = useState([])
  const [product, setProduct] = useState(data)
  const router = useRouter()
  const [error, setError] = useState('')
  const [description, setDescription] = useState(product.description)
  const variants = useSelector(state => state.productCreate.variants)
  const dispatch = useDispatch()
  const duplicateProduct = useSelector(state => state.product.duplicateProduct)
  const groupVariants = (variants) => {
    const grouped = {};

    variants.forEach(({ color, size, quantity }) => {
      if (!grouped[color]) {
        grouped[color] = { color, size: [], quantity };
      }
      grouped[color].size.push(size);
    });

    return Object.values(grouped);
  };
  

  useEffect(() => {
    if (duplicateProduct) {
      const { _id, ...others } = duplicateProduct
      setProduct(others)
      setSelected(duplicateProduct.categories.map(i => i._id))
      setDescription(duplicateProduct.description)

    }
  }, [])


  const genVariant = () => {
    const uid = Date.now()
    if (variants.length > 0) {
      return { ...variants[variants.length - 1], uid, }
    } else {
      return {
        image: product.thumbnail, price: product.price,
        purchasePrice: product.purchasePrice,
        priceWithDiscount: product.priceWithDiscount,
        quantity: product.stockQuantity,
        uid,
      }
    }

  }
  useEffect(() => {
    // dispatch(setVariantTable(product.variants))
    // dispatch(setVariants(groupVariants(product.variants)))
    dispatch(setVariants(product.variants || []))
  }, [router.query.id])

  const handleImages = files => {
    setProduct(prev => ({
      ...prev, images: files.map(i => ({
        image: i,
        uid: generateUniqueID(product.images.map(e => e.uid)),
        colors: ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"],
      }))
    }))
  }
  console.log(product.images)
  const userInfo = useSelector(state => state.user.userInfo)
  const headers = { Authorization: 'Bearer ' + userInfo?.token }
  const [selected, setSelected] = useState(product.categories.map(i => i._id))

  const refreshPage = () => {
    // Get the current route's pathname and query parameters
    const { pathname, query } = router

    // Use router.push to navigate to the same URL
    router.push({
      pathname: pathname, // Same as current pathname
      query: query // Same as current query parameters
    })
  }
  const categories = useSelector(state => state.category.categories)

  const saveProduct = async () => {
    setError('')
    if (
      !product.name ||
      !product.thumbnail ||
      !product.priceWithDiscount ||
      !product.purchasePrice
    ) {
      setError('Pleas fill all the necessaary field')
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.post(
        '/api/product',
        {
          ...product,
          variants,
          description,
          categories: selected,

        },
        { headers }
      )
      setProduct({
        name: '',
        description: '',
        price: 0,
        categories: [],
        attributes: [],

        images: [],
        thumbnail: '',
        metaTitle: '',
        metaDescription: '',
        stockQuantity: 0,
        sold: 0
      })
      dispatch(setDuplicateProduct(null))

      setSelected([])
      setDescription('')
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'New Product Created',
          option: {
            variant: 'success'
          }
        })
      )
    } catch (error) {
      console.log(error)
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error While Creating Product ! ',
          option: {
            variant: 'error'
          }
        })
      )

      setError('Error While Creating Product ! ')
    }
  }

  const updateProduct = async () => {
    if (
      !product.name ||
      !product.thumbnail ||
      !product.priceWithDiscount ||
      !product.purchasePrice

    ) {

      dispatch(
        showSnackBar({
          message: 'Please Fill All The Field !',
          option: {
            variant: 'info'
          }
        })
      )

      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/product/${router.query.id}`,
        {
          ...product,
          variants: variants,
          categories: selected,
          description,

        },
        { headers }
      )
      setProduct(data)
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Product Updated !',
          option: {
            variant: 'success'
          }
        })
      )
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Error Updating Product !',
          option: {
            variant: 'error'
          }
        })
      )
      setError('Something Went Wrong !')
    }
  }



  return (
    <div className={styles.wrapper}>
      <h2>Add Product</h2>
      <form className={styles.forms}>
        <div className={styles.left}>
          <div className={styles.field}>
            <label>Product Name</label>
            <input
              type='text'
              placeholder='Enter Product Name'
              value={product.name}
              onChange={e =>
                setProduct(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Purchase Price</label>
              <input
                type='number'
                placeholder='Enter Product Purchase Price'
                value={product.purchasePrice}
                onChange={e =>
                  setProduct(prev => ({ ...prev, purchasePrice: e.target.value }))
                }
                min='0'
              />
            </div>
            <div className={styles.field}>
              <label>Old Price</label>
              <input
                type='number'
                placeholder='Enter Product Price'
                value={product.price}
                onChange={e =>
                  setProduct(prev => ({ ...prev, price: e.target.value }))
                }
                min='0'
              />
            </div>
            <div className={styles.field}>
              <label>New Price (-{calculateDiscount(product.price, product.priceWithDiscount)}%)</label>
              <input
                type='number'
                placeholder='Enter Salling Price'
                value={product.priceWithDiscount}
                onChange={e =>
                  setProduct(prev => ({ ...prev, priceWithDiscount: e.target.value }))
                }

              />
            </div>

          </div>


          <div className={styles.flex}>
            <div className={styles.field}>
              <label>Stock Quantity </label>
              <input
                type='Number'
                placeholder=''
                value={product.stockQuantity}
                onChange={e =>
                  setProduct(prev => ({
                    ...prev,
                    stockQuantity: e.target.value
                  }))
                }
                min='0'
              />
            </div>
            <div className={styles.field}>
              <label>Category</label>
              <div className={styles.options}>
                <SelectCategory
                  currentCategories={product.categories}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>

            </div>
          </div>

          <div className={styles.field}>
            <label>Charecteristics</label>
            {product.attributes?.map((i, indx) => (
              <div className={styles.flex} style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.field}>
                  <label>name </label>
                  <input type="text" value={i.name}
                    onChange={e => {
                      const updatedAttributes = product.attributes.map(attr =>
                        attr.uid === i.uid ? { ...attr, name: e.target.value } : attr
                      );
                      setProduct({ ...product, attributes: updatedAttributes });
                    }} />
                </div>
                <div className={styles.field}>
                  <label>Value</label>
                  <input type="text" value={i.value}
                    onChange={e => {
                      const updatedAttributes = product.attributes.map(attr =>
                        attr.uid === i.uid ? { ...attr, value: e.target.value } : attr
                      );
                      setProduct({ ...product, attributes: updatedAttributes });
                    }} />
                </div>
              </div>
            ))}
            <div className={styles.flex} style={{ display: "flex", alignItems: "center", justifyContent: "flext-start", flexDirection: "row", gap: "10px" }}>
              {product.attributes.map((e, indx) => <div className={styles.minus}
                onClick={() => setProduct({ ...product, attributes: product.attributes.filter(i => i.uid != e.uid) })}>-</div>)}
              <div className={styles.plus} onClick={() => setProduct({
                ...product, attributes: [...product.attributes, {
                  name: "", value: "", uid: generateUniqueID(product.attributes.map(e => e.uid))
                }]
              })}>+</div>
            </div>

          </div>
          <div className={styles.field}>
            <label>Description</label>
            {/* <textarea
              value={product.description}
              onChange={e =>
                setProduct(prev => ({
                  ...prev,
                  description: e.target.value
                }))
              }
            ></textarea> */}
            <TextEditor
              setDescription={setDescription}
              description={description}
            />
          </div>
          <div className={styles.field}>
            <label>Meta Title(optional)</label>
            <input
              type='text'
              placeholder='Enter Product Meta Title'
              value={product.metaTitle || product.name}
              onChange={e =>
                setProduct(prev => ({
                  ...prev,
                  metaTitle: e.target.value
                }))
              }
            />
          </div>
          <div className={styles.field}>
            <label>Meta Description(optional)</label>
            <textarea
              value={product.metaDescription}
              onChange={e =>
                setProduct(prev => ({
                  ...prev,
                  metaDescription: e.target.value
                }))
              }
            ></textarea>
          </div>

          <div className={styles.field}>
            <label>Brand(optional)</label>
            {/* <div className={`${styles.options} ${styles.flexWrap}`} >
              {brands.map((i, index) => (<span style={product.brand == i._id ? {
                background: "black", color: "white"
              } : {}} onClick={() => product.brand == i._id ? setProduct({ ...product, brand: null }) : setProduct({ ...product, brand: i._id })}>{i.name}</span>))}
            </div> */}
            <BrandSelector selected={{ _id: product.brand }} handleSelect={(b) => { product.brand == b._id ? setProduct({ ...product, brand: null }) : setProduct({ ...product, brand: b._id }) }} />
          </div>

          <div
            className={styles.field}
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <span
              onClick={() =>
                setProduct({ ...product, featured: !product.featured })
              }
            >
              {product.featured ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </span>
            <span> This Prdouct will be Recommended</span>{' '}
          </div>
        </div>
        <div className={`${styles.left} ${styles.right}`}>


          <div className={styles.field}>
            <label>Product Thumbnail</label>
            <Upload type={".png, .jpg, .jpeg , .webp"}
              handle={files => {
                setProduct(prev => ({ ...prev, thumbnail: files.url }))
              }}
            />
            <div className={styles.images}>
              {product.thumbnail ? (
                <div className={styles.image__container}>
                  <Image
                    src={product.thumbnail}
                    alt=''
                    width='180'
                    height={180}
                  />
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
          </div>
          <div className={styles.field}>
            <label>Product Images </label>
            <UploadMany handle={files => handleImages(files)} />

            <div className={styles.images}>
              {product.images.length > 0
                ? product.images.map((image, index) => (
                  <div className={styles.image__container} name={index}>
                    <Image src={image.image} alt='' width='180' height={180} />
                  </div>
                ))
                : [1, 2, 3].map((_, index) => (
                  <div
                    className={styles.image__container}
                    name={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    No Photo Uploaded{' '}
                  </div>
                ))}
            </div>

          </div>
          <div className={`${styles.field} ${styles.variants}`}>
            <div
              className={styles.field}
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <span
                onClick={() =>
                  setProduct({ ...product, productType: product.productType == "normal" ? "variable" : "normal" })
                }
              >
                {product.productType == "variable" ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </span>
              <span> This Product Has Variation </span>{' '}
            </div>

            {product.productType == "variable" && <>
              <div className={styles.variants__flex}>
                {variants?.map((v, i) => <div className={styles.variants__item}>
                  <Variant vuid={v?.uid} />
                </div>
                )}
              </div>
              <div className={styles.plus} style={{ margin: 0 }} onClick={() =>
                dispatch(addNewVariant(genVariant()))}>+</div></>}
          </div>
        </div>
      </form >
      {error && <p style={{ color: 'red', margin: '10px' }}>{error}</p>}
      <button
        onClick={() => (router.query.id ? updateProduct() : saveProduct())}
      >
        Save Prdouct
      </button>
    </div >
  )
}

export default Create

export async function getServerSideProps({ query }) {
  const { id } = query

  const fetchProduct = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/product/${id}`)
    return data
  }

  const fetchCategory = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/category`)
    return data
  }


  const fetchBrand = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/brand`)
    return data
  }


  const { categories } = await fetchCategory()
  const { brands } = await fetchBrand()

  if (id) {
    const product = await fetchProduct()
    return {
      props: {
        product,
        categories,
        brands
      }
    }
  }

  return {
    props: {
      product: {
        name: '',
        description: '',
        price: 0,
        categories: [],
        attributes: [],
        colors: [],
        images: [],
        thumbnail: '',
        metaTitle: '',
        metaDescription: '',
        stockQuantity: 0,
        sold: 0,
        brand: null,
      },
      categories,
      brands
    }
  }
}
