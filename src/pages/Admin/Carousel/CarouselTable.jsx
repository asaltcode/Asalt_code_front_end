import {useEffect, useState} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import CarouselTableList from '../Helper/CarouselTableList';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';

const CarouselTable = () => {
    const dateModle = (dateString) =>{
        const dateConvert = new Date(dateString);
        let d = dateConvert.toDateString().split(" ")
        return `${d[2]} ${d[1]} ${d[3]}`
        }

    const [carousel, setCarousel] = useState([]);
    const getCarouse = async () =>{
       try {
        const res = await AxiosService.get(ApiRoutes.GET_CAROUSEL.path, {authenticate: ApiRoutes.GET_CAROUSEL.authenticate})
        setCarousel(res.data.image)
       } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)  
       }
    }
    useEffect(()=>{
        getCarouse()
    },[])
  return (
    <>
    <div className="row">
    <div className="col grid-margin">
        <div className="card" style={{background : "#212529"}}>
            <div className="card-body">
                <h4 className="card-title">All User List</h4>
                <div className="table-responsive">
                    <ScrollContainer horizontal className="scroll-container">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="form-check form-check-muted m-0">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </th>
                                    <th>Image</th>                                    
                                    <th>Created At</th>
                                    <th>Action</th>
                                    <th>ImageUrl</th>                                  
                                </tr>
                            </thead>
                            <tbody>                           
                                {
                                    carousel.map((data, i)=>{
                                      return  <CarouselTableList key={i} carousel={carousel} setCarousel={setCarousel} imgUrl={data.imageUrl} id={data._id} imgCreate={dateModle(data.createdAt)} />
                                    })
                                }
                            </tbody>
                        </table>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default CarouselTable