import React, { Children, useCallback, useEffect, useRef, useState } from 'react';
import { Container, Content, Header,InputSearch, Button, Perfil, SideBar } from './styles';
import { MdSearch, MdAddLocation } from "react-icons/md";
import { Link, useHistory } from 'react-router-dom';

import GoogleMapReact from 'google-map-react'
import MapMarker from './Marker';
import { useEstablishment, IEstablishment, IFilters } from '../../hooks/establishment';
import { useAuth } from '../../hooks/auth';
import CheckBox from '../../components/CheckBox';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


interface ObjectBoolean {
    [key: string]: boolean;
}

const HomePage: React.FC = () => {
    const { getAllEstablishment,getAllFilters, filters } = useEstablishment() 
    const formRef = useRef<FormHandles>(null);
    const [locations, setLocations] = useState<IEstablishment[]>([])
    // const [filters, setFilters] = useState<IFilters>();
    const { user, signOut } = useAuth();
    const history = useHistory()

    const [search, setSearch] = useState('')
    
    

    useEffect(() => {
        const fetchData = async () => {
            if(!user) {
                history.push('/')
            }
    
            const resFilter = await getAllFilters()
            // setFilters(resFilter);
            console.log(resFilter);
    
            const queryParam = history.location.search;
            console.log(queryParam)
            const establishments = await getAllEstablishment(queryParam);
            setLocations(establishments);
    
        }

        fetchData();
    }, [getAllEstablishment, history, window.location.href])

    const handleLogOut = useCallback(
        () => {
            signOut();

            history.push('/')
        },
        [signOut],
    )

    const handleOnChangeSearch = useCallback((e) => {
        console.log(e.target);
        setSearch(e.target.value);
    }, [])

    const handleOnSubmitSearch = useCallback((data) => {
        console.log(data)

        history.push(`?search=${search}`)
        
    }, [history, search])

    const handleOnSubmit = useCallback((data) => {
        console.log(data)

        function getStringToQuery(obj: ObjectBoolean): string {
            const objKeys = Object.keys(obj)
            const arrStr = objKeys.map(key => {
                console.log(obj[key])
                if (obj[key] === true){
                    console.log(key)
                    return key;
                }
            })
            let finalStr = '';
            arrStr.forEach(value => {
                if (value === undefined) return;
                finalStr += `${value},`;
            })
            
            return finalStr.slice(0, finalStr.length - 1);
        }

        const queryCity = `city=${getStringToQuery(data.city)}`
        const queryNeighborhood = `neighborhood=${getStringToQuery(data.neighborhood)}`
        const queryType = `type=${getStringToQuery(data.type)}`

        console.log(`?${queryCity}&&${queryNeighborhood}&&${queryType}`)

        history.push(`?${queryCity}&&${queryNeighborhood}&&${queryType}`);
        
    }, [history])
    
    return (
    <Container> 
        <Header>
            <InputSearch>
                <MdSearch size={26} onClick={handleOnSubmitSearch} />
                <input type="text" value={search} onChange={handleOnChangeSearch} />
            </InputSearch>
            {user.level === 1 && (
                <Link to="/new-establishment">
                    <Button type="button" ><MdAddLocation size={18} /> <span>Novo Estabelecimento</span></Button>
                </Link>
            )}
            <Perfil>
                <p>{user.name}</p>
                <span>{user.level === 1 ? 'parceiro' : 'cliente'}</span>
                <div>
                    <span onClick={handleLogOut}>
                        sair
                    </span>
                </div>
            </Perfil>
        </Header>
        <Content>
            <SideBar>
                <Form ref={formRef} onSubmit={handleOnSubmit}>

                    <div>
                        <h3>Tipos</h3>
                        {filters?.type?.map(filter => (
                            <CheckBox name={`type.${filter}`} label={filter} />
                        ))}
                    </div>
                    <div>
                        <h3>Bairros</h3>
                        {filters?.neighborhood?.map(filter => (
                            <CheckBox name={`neighborhood.${filter}`} label={filter} />
                        ))}
                    </div>
                    <div>
                        <h3>Cidades</h3>
                        {filters?.city?.map(filter => (
                            <CheckBox name={`city.${filter}`} label={filter} />
                        ))}
                    </div>
                    <Button type="submit" >Filtrar</Button>
                </Form>
            </SideBar>
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