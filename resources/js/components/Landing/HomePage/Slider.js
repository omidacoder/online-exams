import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/scale-out-animation/scale-out-animation.scss';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import {baseUrl} from './../../../Constants';
export default class Slider extends React.Component{
    render(){
        const AutoplaySlider = withAutoplay(AwesomeSlider);
        return(
            <div style={{display : 'flex' , flexDirection : 'column' , justifyContent : 'center'}}>
            <AutoplaySlider animation="scaleOutAnimation" cssModule={[AwesomeSliderStyles , CoreStyles]} infinite={true}
            play={true}
            cancelOnInteraction={false} 
            interval={6000} >
                    <div  data-src={baseUrl+"/images/slider1.jpg"} />
                    <div  data-src={baseUrl+"/images/slider2.jpg"} />
                    <div  data-src={baseUrl+"/images/slider3.jpg"} />
                    <div  data-src={baseUrl+"/images/slider4.jpg"} />
                </AutoplaySlider>
                </div>
        );
    }
}