import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../pages/Pages.scss'


function Map() {
    const locations = [-6.1751577307355126, 106.82719571194093]
    return (
        <div class="w-full">
            <MapContainer center={[-6.1751577307355126, 106.82719571194093]} zoom={13} scrollWheelZoom={false} id="mapid">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-6.1751577307355126, 106.82719571194093]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map;
