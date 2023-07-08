import Carousel from 'react-bootstrap/Carousel' 
import 'bootstrap/dist/css/bootstrap.min.css';   

function HomeSlider() {
    return (
        <Carousel>
            <Carousel.Item>
                <img style={{height:"600px",width:"100%"}}  src="./Assets/img/slider/5.jpg" alt="First slide"/>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{height:"600px",width:"100%"}}  src="./Assets/img/slider/3.avif" alt="Second slide"/>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{height:"600px", width:"100%"}}  src="./Assets/img/slider/6.jpg" alt="Third slide"/>
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeSlider