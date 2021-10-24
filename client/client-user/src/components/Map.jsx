import React from 'react';
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../pages/Pages.scss'


function Map() {
    
    const linkGMap = "https://www.google.com/maps?q="
    const locations = [
        {
            longitude: [-6.1751577307355126, 106.82719571194093],
            name: "Central Jakarta, Gambir, Central Jakarta City, Jakarta"
        },
        {
            longitude: [-6.2930931643497505, 106.81908271253377],
            name: "Jl. Jati Baru Raya No.28, RT.5/RW.1, Petojo Sel., Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10160"
        },
        {
            longitude: [-6.18107396627464, 106.81508716835624],
            name: "Klinik Mediku"  
        },
        {
            longitude: [-6.218830079923572, 106.83308881863816],
            name: "Jatibaru2"
        }
    ]

    const LocationClinics = () => {
        return(
            locations.map( e => {
                return(
                    <Marker position={e.longitude}>
                        <Popup>
                            <a href={ linkGMap+e.longitude[0]+","+e.longitude[1]} target="_blank">{e.name}</a>
                        </Popup>
                    </Marker>
                )
            })
        )
    }

    return (
        <div>
            <MapContainer center={[-6.1751577307355126, 106.82719571194093]} zoom={10} scrollWheelZoom={false} id="mapid">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationClinics />
            </MapContainer>
        </div>
    )
}

export default Map;
