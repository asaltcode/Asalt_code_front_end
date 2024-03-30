import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import CarouselTableList from '../Helper/CarouselTableList';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarousels } from '../../../Redux/Actions/CarouselActions';
import Loading from '../../../animation/Loading';

const CarouselTable = () => {
    const  dispatch = useDispatch()
    const {adminCarousels, loading} = useSelector(state => state.carouselsState)
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const dateModle = (dateString) => {
        const dateConvert = new Date(dateString);
        let d = dateConvert.toDateString().split(" ");
        return `${d[2]} ${d[1]} ${d[3]}`;
    }
    useEffect(() => {
        dispatch(getAllCarousels)
    }, [location.pathname === "/admin/carousel"]);

    // Pagenation Functions

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = adminCarousels && adminCarousels.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(adminCarousels.length / itemsPerPage)) {
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
        <> {loading && <Loading/>}
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
                                              adminCarousels &&  currentItems.map((data, i) => {
                                                    return <CarouselTableList key={i} visibility={data.visibility} imgUrl={data.imageUrl} id={data._id} imgCreate={dateModle(data.createdAt)} />
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
                                        {Array.from({ length: Math.ceil(adminCarousels && adminCarousels.length / itemsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === Math.ceil( adminCarousels && adminCarousels.length / itemsPerPage) ? 'disabled' : ''}`}>
                                            <button onClick={nextPage} className={`page-link`}><i className={`mdi mdi-arrow-right-bold-circle-outline ${currentPage === Math.ceil(adminCarousels && adminCarousels.length / itemsPerPage) ? 'text-dark' : ''}`}></i></button>
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
