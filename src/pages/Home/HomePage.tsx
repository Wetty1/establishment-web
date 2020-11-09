import React, { Children, useEffect, useState } from 'react';
import { Container, Content, Header,InputSearch, Button, Perfil, SideBar } from './styles';
import { MdSearch, MdAddLocation } from "react-icons/md";
import { Link } from 'react-router-dom';

import GoogleMapReact from 'google-map-react'
import MapMarker from './Marker';
import { useEstablishment, IEstablishment } from '../../hooks/establishment';
import { number } from 'yup';

const HomePage: React.FC = () => {
    const { getAllEstablishment, } = useEstablishment() 
    const [locations, setLocations] = useState<IEstablishment[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const establishments = await getAllEstablishment();
            setLocations(establishments);
        }

        fetchData();
    }, [getAllEstablishment])
    
    return (
    <Container>
        <Header>
            <InputSearch>
                <MdSearch size={26} />
                <input type="text"/>
            </InputSearch>
            <Link to="/new-establishment">
                <Button type="button" ><MdAddLocation size={18} /> <span>Novo Estabelecimento</span></Button>
            </Link>
            <Perfil></Perfil>
        </Header>
        <Content>
            <SideBar>a</SideBar>
            <div>
                <GoogleMapReact 
                    bootstrapURLKeys={{ key: "AIzaSyAbqm7cbdyzBOiIPyD5FSZJNosBp-i4940"}}  
                    defaultCenter={{lat: -3.7548719, lng: -38.6005319}}
                    defaultZoom={10}
                > 
                    {locations.map(
                        location => {
                            const [lat, lng] = location.coordinates.split(',')
                        return (
                            <MapMarker
                            type={location.type}
                        lat={Number(lat)}
                        lng={Number(lng)}
                    />
                        )}
                    )}
                    {/* <MapMarker
                        lat={-3.7553112}
                        lng={-38.592613}
                    /> */}
                </GoogleMapReact>
            </div>
        </Content>
    </Container>
);}

export default HomePage;