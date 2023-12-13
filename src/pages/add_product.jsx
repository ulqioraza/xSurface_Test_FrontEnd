import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export function Add_Product() {
    const [image, setImage] = useState()
    const [product_name, setProductName] = useState('')
    const [code, setCode] = useState('')
    const [price, setPrice] = useState(null)
    const [image_list, setImageList] = useState([])
    const [img_count, setImgCount] = useState(0)
    const location = useLocation();
    const history = useNavigate();
    /*constructor(props) {
      super(props);
  
      this.onFileChange = this.onFileChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
          image: ''
      }
    }*/
    //alert(location.state.id)
    const onFileChange =(e)=> {
        setImage(e.target.files[0])
    }
  
    const onSubmit = (e) => {
        if(img_count > 6){
            alert('ไม่สามารถเพิ่มรูป มากกว่า 6 รูป ได้')
        }else{
             e.preventDefault()
            const formData = new FormData()
            formData.append('image', image)
            image_list.push(formData)
            setImgCount(img_count+1)
        }
    }
    const saveProduct = async e =>{
        const postOption = {name: product_name, code: code, price: price}
            
        await axios.post("http://localhost:9000/save_product", postOption, {
            }).then(res => {
               
                for(var i = 0; i< image_list.length; i++){
                    //alert(JSON.stringify(res.data))
                    image_list[i].append('product_id', res.data)
                    axios.post("http://localhost:9000/api/prod_img_upload", image_list[i], {
                        }).then(resd => {
                            console.log(resd)
                        })
                }
        
            }).then(rev =>{
                window.location.replace('/')
            })
       
        
    }
      return (
        <div className="container-fluid">
          <h3>UPLOAD PRODUCT</h3>
          <hr/>
          <div className="row" style={{marginTop:'40px'}}>
          <div className="col-md-4 offset-md-4">
            <div class="form-group files color">
                <label>Upload IMAGE </label>
                <input type="file" class="form-control" multiple="" onChange={onFileChange} />
            </div>
            
            <div className="form-group">
               image upload : {img_count}/6 
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={onSubmit}>ADD</button>
            </div><hr></hr>
            <div className="col-lg-12 form-group">
                 <div className="form-group row">
                    <label className="col-lg-4 col-form-label"><b>PRODUCT NAME : </b></label>
                       <div className="col-lg-6">
                          <input type="text" 
                                 className="form-control" 
                                 name="search" 
                                 defaultValue={product_name}
                                 onChange={e => setProductName(e.target.value)}
                                 autoFocus/>
                        </div>
                        <div className="col-lg-2">
                        </div>
                </div>
                <div className="form-group row">
                    <label className="col-lg-4 col-form-label"><b>CODE : </b></label>
                       <div className="col-lg-6">
                          <input type="text" 
                                 className="form-control" 
                                 name="search" 
                                 defaultValue={code}
                                 onChange={e => setCode(e.target.value)}
                                 autoFocus/>
                        </div>
                        <div className="col-lg-2">
                        </div>
                </div> 
                <div className="form-group row">
                    <label className="col-lg-4 col-form-label"><b>PRICE : </b></label>
                       <div className="col-lg-6">
                          <input type="number" 
                                 className="form-control" 
                                 name="search" 
                                 defaultValue={price}
                                 onChange={e => setPrice(e.target.value)}
                                 autoFocus/>
                        </div>
                        <div className="col-lg-2">
                        </div>
                </div> 
                <div className="form-group row">
                    <label className="col-lg-4 col-form-label"><b> </b></label>
                        <div className="col-lg-2">
                            <button className="btn btn-secondary">ยกเลิก</button>
                        </div>
                        <div className="col-lg-2">
                        <div className="form-group">
                            <button className="btn btn-danger" onClick={saveProduct}>ยืนยัน</button>
                        </div>
                        </div>
                        
                </div>   
              </div>
          </div>
          </div>
        </div>
      )
    }