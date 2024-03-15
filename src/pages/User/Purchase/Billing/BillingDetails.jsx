import { jwtDecode } from 'jwt-decode'
import React, {useEffect, useState} from 'react'
import AxiosService from '../../../../utils/AxiosService'
import ApiRoutes from '../../../../utils/ApiRoutes'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { endLoading, onLoading } from '../../../../Redux/loaderSlicer'

const BillingDetails = () => {
    const dispatch = useDispatch()
    const cap = text => text.trim()[0].toUpperCase() + text.slice(1).toLowerCase()
    
const [initialValues, setInitialValues] =  useState({
    name: "",
    email: ""
})

    let formik = useFormik({ //Formik Validations
        initialValues: initialValues,
        validationSchema: Yup.object({
          name:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
          email: Yup.string().email('Invalid email address').matches(/^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
          'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail').required('Email is required'),        
        }),        
        enableReinitialize: true,
      },
      )

    const getUser = async () =>{
        try {
            dispatch(onLoading())
            const res = await AxiosService.get(`${ApiRoutes.GET_USER.path}`, {authenticate: ApiRoutes.GET_USER.authenticate})
            if(res.status === 200){
                setInitialValues({
                    name: cap(res.data.user.name),
                    email: res.data.user.email
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)   
        }finally{
            dispatch(endLoading())
        }
    }

    useEffect(()=>{
       getUser()
    },[])
  return (
    <div className="mt-5">
        <form action="">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-light">Email<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                            <input type="text"  name='email' className="form-control text-light" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />    
                            {formik.touched.email && formik.errors.email ? (<div className="errorMes">{formik.errors.email}</div>) : null}                                                        
                        </div>
                    </div>
                </div>                               
                <div className="col-md-6">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-light">Name<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                            <input type="text" name='name' className="form-control text-light" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />     
                            {formik.touched.name && formik.errors.name ? (<div className="errorMes">{formik.errors.name}</div>) : null}                                                       
                        </div>
                    </div>
                </div>                               
            </div>
        </form>
    </div>
  )
}

export default BillingDetails