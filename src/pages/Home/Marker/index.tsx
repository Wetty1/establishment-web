import React from 'react';
import { Container, Content } from './styles';

import imgMarker from '../../../assets/images/marker.webp';

interface IMarkerProps {
    children?: React.ReactNode,
    type?: string;
    lat: number,
    lng: number,
}

const MapMarker: React.FC<IMarkerProps> = (props) => {


    return (
        <Container>
            <span>{props.type}</span>
            <img src={imgMarker} alt=""/>
        </Container>
    );
}
export default MapMarker;