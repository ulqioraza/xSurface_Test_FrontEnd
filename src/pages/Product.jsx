import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProduct, fetchProductImg, getProductError, getProductImgError, getProductImgStatus, getProductStatus, selectAllProduct, selectAllProductIMG } from '../libs/productSlice';
import reactLogo from '../assets/human_logo.png';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

export function Product() {
  const dispatch = useDispatch()
  const product = useSelector(selectAllProduct);
  const productStatus = useSelector(getProductStatus);
  const error = useSelector(getProductError);
  const product_img = useSelector(selectAllProductIMG);
  const productINGStatus = useSelector(getProductImgStatus);
  const error_img = useSelector(getProductImgError);
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const date = Date.now()
  const [index_select, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(fetchProduct(search));
    dispatch(fetchProductImg())
  }, [search]);

  return (
    
    <body className="page-top">
        <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid">
                        {/* <!-- Main Content --> */}
                        <h1 className="mt-4">Product List</h1>
                        <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Product List</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div className="form-group row">
                                        <label className="col-lg-1 col-form-label"><b>SEARCH : </b></label>
                                        <div className="col-lg-6">
                                            <input type="text" 
                                                className="form-control" 
                                                name="search" 
                                                defaultValue={search}
                                                onChange={e => setSearch(e.target.value)}
                                                autoFocus/>
                                        </div>
                                        <div className="col-lg-2">
                                        <Link className='btn btn-info' to="/add_product" state={{id:0}}>ADD PRODUCT
                                        </Link>
                                        </div>
                                    </div> 
                                </div>
                                {/* <!-- Content Row --> */}
                                <div className="col-lg-12 form-group">
                                    {productStatus === 'loading' ?
                                        <h2>Loading...</h2>
                                    :productStatus === 'succeeded' ?
                                    <div className="col-lg-12 form-group">
                                        <div className="form-group row">
                                        {product.map((pd,index) =>
                                        <div className="col-lg-3">
                                            <div class="card">
                                                <div class="card-body">
                                                <Carousel>     
                                                    {product_img.map((pi,index) =>
                                                        pd._id == pi.product ?
                                                        <Carousel.Item>
                                                           <img src={pi.image}></img>
                                                        </Carousel.Item>
                                                        :null 
                                                    )} 
                                                </Carousel> 
                                                    Product Name: <b>{pd.name} {pd._id}</b><hr></hr>
                                                    Product Code: <b>{pd.code}</b><hr></hr>
                                                    Product Price: <b>{pd.price}</b>
                                                </div>
                                            </div>     
                                        </div>
                                        )}
                                        </div>
                                    </div>
                                    
                                    :
                                    <p>{error}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
  )
}