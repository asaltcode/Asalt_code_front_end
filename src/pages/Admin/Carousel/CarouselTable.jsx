import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import CarouselTableList from '../Helper/CarouselTableList';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const CarouselTable = () => {
    const location = useLocation();
    const [carousel, setCarousel] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const dateModle = (dateString) => {
        const dateConvert = new Date(dateString);
        let d = dateConvert.toDateString().split(" ");
        return `${d[2]} ${d[1]} ${d[3]}`;
    }

    const getCarouse = async () => {
        try {
            const res = await AxiosService.post(ApiRoutes.GET_ALL_CAROUSEL.path, { authenticate: ApiRoutes.GET_ALL_CAROUSEL.authenticate });
            setCarousel(res.data.image);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);
        }
    }

    useEffect(() => {
        getCarouse();
    }, [location.pathname === "/admin/carousel"]);

    // Pagenation Functions

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = carousel.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(carousel.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    }

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    }

    return (
        <>
            <div className="row">
                <div className="col grid-margin">
                    <div className="card" style={{ background: "#212529" }}>
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
                                                <th>Approval</th>
                                                <th>Visibility</th>
                                                <th>Created At</th>
                                                <th>Action</th>
                                                <th>ImageUrl</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentItems.map((data, i) => {
                                                    return <CarouselTableList key={i} carousel={carousel} visibility={data.visibility} setCarousel={setCarousel} imgUrl={data.imageUrl} id={data._id} imgCreate={dateModle(data.createdAt)} />
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </ScrollContainer>
                            </div>
                           <div className="d-flex justify-content-center mt-3">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button onClick={prevPage} className="page-link"><i className={`mdi mdi-arrow-left-bold-circle-outline  ${currentPage === 1 ? 'text-dark' : ''}`}></i></button>
                                        </li>
                                        {Array.from({ length: Math.ceil(carousel.length / itemsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === Math.ceil(carousel.length / itemsPerPage) ? 'disabled' : ''}`}>
                                            <button onClick={nextPage} className={`page-link`}><i className={`mdi mdi-arrow-right-bold-circle-outline ${currentPage === Math.ceil(carousel.length / itemsPerPage) ? 'text-dark' : ''}`}></i></button>
                                        </li>
                                    </ul>
                                </nav>
                           </div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default CarouselTable;
