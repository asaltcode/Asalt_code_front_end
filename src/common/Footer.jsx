import React from 'react'
import '../assets/style/footer.css'

const Footer = () => {
  return (
    <>
    <footer>
            <div className="footer-content">
                <div className="fbox">
                    <h5 className='footerTitle'>Contact</h5>
                    <div className='footer-ul'>
                        {/* <!-- <div className='footer-li'>9940744513,</div>
                            <div className='footer-li'>8098389395</div> --> */}
                    </div>
                </div>
                <div className="fbox">
                    <h5 className='footerTitle'>Copyright</h5>
                    <div className='footer-ul'>
                        <div className='footer-li text-light'>
                            <i className="fa-regular fa-copyright"></i>
                            Asalt code {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
                <div className="fbox">
                    <h5 className='footerTitle'>Social media</h5>
                    <div className='footer-ul'>
                        <div className='footer-li'>
                            <a href="https://github.com/asaltcode" target="_blank">
                                <i className="fa-brands fa-github" style={{ color: "#000000" }}></i>
                            </a>
                        </div>
                        <div className='footer-li'>
                            <a href="https://www.linkedin.com/in/asaltcode/" target="_blank">
                                <i className="fa-brands fa-linkedin" style={{ color: "#003ca3" }}></i>
                            </a>
                        </div>
                        <div className='footer-li'>
                            <a href="https://instagram.com/asalt_code?igshid=OGY3MTU3OGY1Mw==" target="_blank">
                                <i className="fa-brands fa-instagram" style={{ color: "#ff1f8b" }}></i>
                            </a>
                        </div>
                        <div className='footer-li'>
                            <a href="https://www.facebook.com/profile.php?id=100022222542177" target="_blank">
                                <i className="fa-brands fa-facebook" style={{ color: "#337eff" }}></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer